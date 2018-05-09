import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Image,
  ListView,
  TouchableOpacity,
} from 'react-native'
import Menu from 'teaset/components/Menu/Menu'
import Toast from 'teaset/components/Toast/Toast'
import { common } from '../../constants/common'
import TransactionsSlider from './TransactionsSlider'
import TextInputTransactions from './TextInputTransactions'
import ShelvesListView from './ShelvesListView'
import actions from '../../actions/index'
import ws from '../../websocket/ws'

class DelegateShelves extends Component {
  constructor() {
    super()

    this.shelvesBuyDS = data => new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(data)
    this.shelvesSellDS = data => new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(data)
  }

  onChange(event, tag) {
    const { text } = event.nativeEvent
    const { dispatch, price, quantity } = this.props

    if (tag === 'price') {
      const { p, q, a } = this.getAmount(text, quantity)
      dispatch(actions.textInputDelegateUpdate({ price: p, quantity: q, amount: a }))
    } else if (tag === 'quantity') {
      const { p, q, a } = this.getAmount(price, text)
      dispatch(actions.textInputDelegateUpdate({ price: p, quantity: q, amount: a }))
    }
  }

  // 币币对小数规则
  getAmount(price, quantity, amount) {
    const { homeRoseSelected } = this.props
    let p = isNaN(Number(price)) ? 0 : Number(price)
    let q = isNaN(Number(quantity)) ? 0 : Number(quantity)
    let a = isNaN(Number(amount)) ? 0 : Number(amount)

    if (
      ((homeRoseSelected && homeRoseSelected.goods.name === common.token.BTC
        && homeRoseSelected.currency.name === common.token.CNYT))
      || ((homeRoseSelected && homeRoseSelected.goods.name === common.token.ETH
        && homeRoseSelected.currency.name === common.token.CNYT))
      || ((homeRoseSelected && homeRoseSelected.goods.name === common.token.ETH
        && homeRoseSelected.currency.name === common.token.TK))
    ) {
      // p:2 q:4 a:6
      p = `${price}`
      p = isNaN(Number(p)) ? 0 : Number(p)
      p = common.toFix2(p)
      p = isNaN(Number(p)) ? 0 : Number(p)
      if (amount) {
        a = Number(common.toFix6(amount))
        q = common.bigNumber.dividedBy(a, p)
        q = Number(common.toFix4(q))
      } else {
        q = `${quantity}`
        q = isNaN(Number(q)) ? 0 : Number(q)
        q = common.toFix4(q)
        q = isNaN(Number(q)) ? 0 : Number(q)
        a = common.bigNumber.multipliedBy(p, q)
        a = Number(common.toFix6(a))
      }
    } else if (homeRoseSelected && homeRoseSelected.goods.name === common.token.TK
      && homeRoseSelected.currency.name === common.token.CNYT) {
      // p:4 q:0 a:4
      p = `${price}`
      p = isNaN(Number(p)) ? 0 : Number(p)
      p = common.toFix4(p)
      p = isNaN(Number(p)) ? 0 : Number(p)
      if (amount) {
        a = Number(common.toFix4(amount))
        q = common.bigNumber.dividedBy(a, p)
        q = Number(Number(q).toFixed(0))
      } else {
        q = `${quantity}`
        q = isNaN(Number(q)) ? 0 : Number(Number(q).toFixed(0))
        a = common.bigNumber.multipliedBy(p, q)
        a = Number(common.toFix4(a))
      }
    } else if (homeRoseSelected && homeRoseSelected.goods.name === common.token.TK
      && homeRoseSelected.currency.name === common.token.BTC) {
      // p:8 q:4 a:8
      p = `${price}`
      p = isNaN(Number(p)) ? 0 : Number(p)
      p = common.toFix8(p)
      p = isNaN(Number(p)) ? 0 : Number(p)
      if (amount) {
        a = Number(common.toFix8(amount))
        q = common.bigNumber.dividedBy(a, p)
        q = Number(common.toFix4(q))
      } else {
        q = `${quantity}`
        q = isNaN(Number(q)) ? 0 : Number(q)
        q = common.toFix4(q)
        q = isNaN(Number(q)) ? 0 : Number(q)
        a = common.bigNumber.multipliedBy(p, q)
        a = Number(common.toFix8(a))
      }
    } else if (homeRoseSelected && homeRoseSelected.goods.name === common.token.ETH
      && homeRoseSelected.currency.name === common.token.BTC) {
      // p:6 q:4 a:6
      p = `${price}`
      p = isNaN(Number(p)) ? 0 : Number(p)
      p = common.toFix6(p)
      p = isNaN(Number(p)) ? 0 : Number(p)
      if (amount) {
        a = Number(common.toFix6(amount))
        q = common.bigNumber.dividedBy(a, p)
        q = Number(common.toFix4(q))
      } else {
        q = `${quantity}`
        q = isNaN(Number(q)) ? 0 : Number(q)
        q = common.toFix4(q)
        q = isNaN(Number(q)) ? 0 : Number(q)
        a = common.bigNumber.multipliedBy(p, q)
        a = Number(common.toFix6(a))
      }
    }

    return { p, q, a }
  }

  getUIData(goodsId, currencyId) {
    const { dispatch } = this.props
    dispatch(actions.getShelves({ goods_id: goodsId, currency_id: currencyId }))
    dispatch(actions.latestDeals({ goods_id: goodsId, currency_id: currencyId }))
    dispatch(actions.getDepthMap({ goods_id: goodsId, currency_id: currencyId }))
  }

  menuPress() {
    const { dispatch, homeRose } = this.props
    const items = []
    homeRose.forEach((element) => {
      items.push({
        title: `${element.goods.name}/${element.currency.name}`,
        onPress: () => {
          const { homeRoseSelected } = this.props
          ws.onclose(homeRoseSelected.goods.id, homeRoseSelected.currency.id)
          dispatch(actions.homeRoseSelectedUpdate(element))
          ws.onopen(element.goods.id, element.currency.id, this.props.user)
          this.getUIData(element.goods.id, element.currency.id)
        },
      })
    })
    Menu.show({ x: 50, y: 126 }, items)
  }

  buyOrSellPress() {
    const { dispatch, navigation, user, buyOrSell, price, quantity, homeRoseSelected } = this.props
    if (!user) {
      navigation.navigate('LoginStack')
      return
    }
    if (price === 0) {
      Toast.message(`请输入正确的${buyOrSell ? '买入' : '卖出'}价格`)
      return
    }
    if (quantity === 0) {
      Toast.message(`请输入正确的${buyOrSell ? '买入' : '卖出'}数量`)
      return
    }

    if (homeRoseSelected) {
      if (homeRoseSelected.goods.name === common.token.TK
        && common.bigNumber.lt(quantity, common.minQuantityTK)) {
        Toast.message(`TK${buyOrSell ? '买入' : '卖出'}数量至少为${common.minQuantityTK}`)
        return
      }
      if (homeRoseSelected.goods.name === common.token.BTC
        && common.bigNumber.lt(quantity, common.minQuantityBTC)) {
        Toast.message(`BTC${buyOrSell ? '买入' : '卖出'}数量至少为${common.minQuantityBTC}`)
        return
      }
      dispatch(actions.create({
        goods_id: homeRoseSelected.goods.id,
        currency_id: homeRoseSelected.currency.id,
        direct: buyOrSell ? 'buy' : 'sell',
        price,
        quantity,
      }))
    }
  }

  render() {
    const { dispatch, buyOrSell, delegateCreateVisible, homeRoseSelected,
      price, quantity, amount, shelvesBuy, shelvesSell, amountVisible,
    } = this.props
    let goodsName = ''
    let currencyName = ''
    let amountVisibleTitle = ''
    let maximumValueSlider = 0
    let currentVisible = 0
    let percentSlider = 0
    if (homeRoseSelected) {
      goodsName = homeRoseSelected.goods.name
      currencyName = homeRoseSelected.currency.name
      if (amountVisible) {
        if (buyOrSell) {
          currentVisible = amountVisible[currencyName] ? amountVisible[currencyName] : 0
          maximumValueSlider = price === 0 ? 0 : 1
          amountVisibleTitle = `${currentVisible} ${currencyName}`
        } else {
          currentVisible = amountVisible[goodsName] ? amountVisible[goodsName] : 0
          maximumValueSlider = currentVisible === 0 ? 0 : 1
          amountVisibleTitle = `${currentVisible} ${goodsName}`
        }
      }
    }
    if (currentVisible === 0) {
      percentSlider = 0
    } else if (buyOrSell) {
      let temp = amount / currentVisible
      if (common.bigNumber.lt(temp, 0.01) && common.bigNumber.gt(temp, 0)) {
        temp = 0.01
      }
      if (common.bigNumber.lt(temp, 1) && common.bigNumber.gt(temp, 0.99)) {
        temp = 0.99
      }
      percentSlider = temp
    } else {
      let temp = quantity / currentVisible
      if (common.bigNumber.lt(temp, 0.01) && common.bigNumber.gt(temp, 0)) {
        temp = 0.01
      }
      if (common.bigNumber.lt(temp, 1) && common.bigNumber.gt(temp, 0.99)) {
        temp = 0.99
      }
      percentSlider = temp
    }

    return (
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <View
          style={{
            width: common.sw / 2,
          }}
        >
          <TouchableOpacity
            style={{
              marginLeft: common.margin10,
              marginTop: common.margin10,
              width: '45%',
              flexDirection: 'row',
              paddingBottom: 8,
              borderBottomWidth: 1,
              borderBottomColor: common.placeholderColor,
            }}
            activeOpacity={common.activeOpacity}
            onPress={() => this.menuPress()}
          >
            <Text style={{
              color: common.textColor,
              fontSize: common.font16,
            }}
            >{`${goodsName}/${currencyName}`}</Text>
            <Image
              style={{
                marginLeft: common.margin5,
                width: common.w10,
                height: common.h5,
                alignSelf: 'center',
              }}
              source={require('../../assets/下拉.png')}
            />
          </TouchableOpacity>

          <TextInputTransactions
            textInputStyle={{
              marginTop: common.margin10,
            }}
            placeholder={`价格（${currencyName}）`}
            value={price === 0 ? '' : `${price}`}
            onChange={e => this.onChange(e, 'price')}
          />

          <Text style={{
            marginLeft: common.margin10,
            color: common.textColor,
            fontSize: common.font10,
          }}
          >= ¥4.43</Text>

          <TextInputTransactions
            placeholder={`数量（${goodsName}）`}
            value={quantity === 0 ? '' : `${quantity}`}
            onChange={e => this.onChange(e, 'quantity')}
          />

          <TransactionsSlider
            viewStyle={{
              marginTop: common.margin10 / 2,
              marginLeft: common.margin10,
              marginRight: common.margin10 / 2,
            }}
            minimumValue={0}
            maximumValue={maximumValueSlider}
            percentSlider={percentSlider}
            onValueChange={(percent) => {
              const temp = currentVisible * percent
              if (buyOrSell) {
                const { p, q, a } = this.getAmount(price, quantity, temp)
                dispatch(actions.textInputDelegateUpdate({ price: p, quantity: q, amount: a }))
              } else {
                const { p, q, a } = this.getAmount(price, temp)
                dispatch(actions.textInputDelegateUpdate({ price: p, quantity: q, amount: a }))
              }
            }}
          />

          <TextInputTransactions
            placeholder={`成交金额（${currencyName}）`}
            value={amount === 0 ? '' : `${amount}`}
            editable={false}
          />

          <View style={{
            marginLeft: common.margin10,
            marginRight: common.margin10 / 2,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          >
            <Text style={{
              alignSelf: 'center',
              color: common.textColor,
              fontSize: common.font10,
            }}
            >可用</Text>
            <Text style={{
              alignSelf: 'center',
              color: common.textColor,
              fontSize: common.font10,
            }}
            >{amountVisibleTitle}</Text>
          </View>

          <TouchableOpacity
            activeOpacity={common.activeOpacity}
            onPress={() => this.buyOrSellPress()}
            disabled={delegateCreateVisible}
          >
            <View style={{
              marginTop: common.margin10,
              marginLeft: common.margin10,
              marginRight: common.margin10 / 2,
              height: common.h35,
              backgroundColor: buyOrSell ? common.redColor : common.greenColor,
              justifyContent: 'center',
            }}
            >
              <Text style={{
                fontSize: common.font14,
                color: 'white',
                alignSelf: 'center',
              }}
              >{buyOrSell ? '买入' : '卖出'}</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: common.sw / 2,
            flexDirection: 'column',
          }}
        >
          <View
            style={{
              height: common.margin8 * 5 + common.h14_5 * 5 + common.margin10 * 3,
            }}
          >
            <ShelvesListView
              goodsName={goodsName}
              currencyName={currencyName}
              type={common.sell}
              dataSource={this.shelvesSellDS(shelvesSell)}
              rowPress={(rd) => {
                const { p, q, a } = this.getAmount(rd.price, quantity)
                dispatch(actions.textInputDelegateUpdate({ price: p, quantity: q, amount: a }))
              }}
            />
          </View>
          <View
            style={{
              height: common.margin8 * 5 + common.h14_5 * 5,
            }}
          >
            <ShelvesListView
              type={common.buy}
              dataSource={this.shelvesBuyDS(shelvesBuy)}
              rowPress={(rd) => {
                const { p, q, a } = this.getAmount(rd.price, quantity)
                dispatch(actions.textInputDelegateUpdate({ price: p, quantity: q, amount: a }))
              }}
            />
          </View>
        </View>
      </View>
    )
  }
}

function mapStateToProps(store) {
  return {
    buyOrSell: store.deal.buyOrSell,

    user: store.user.user,

    amountVisible: store.asset.amountVisible,

    homeRose: store.dealstat.homeRose,
    homeRoseSelected: store.dealstat.homeRoseSelected,

    price: store.delegate.price,
    quantity: store.delegate.quantity,
    amount: store.delegate.amount,
    shelvesBuy: store.delegate.shelvesBuy,
    shelvesSell: store.delegate.shelvesSell,
    getShelvesVisible: store.delegate.getShelvesVisible,
    delegateCreateVisible: store.delegate.delegateCreateVisible,
  }
}

export default connect(
  mapStateToProps,
)(DelegateShelves)
