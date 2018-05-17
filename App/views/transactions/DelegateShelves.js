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
import { BigNumber } from 'bignumber.js'
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

  onChange(text, tag) {
    const { price, quantity } = this.props

    if (tag === 'price') {
      this.textInputUpdate(text, quantity)
    } else if (tag === 'quantity') {
      this.textInputUpdate(price, text)
    }
  }

  getUIData(goodsId, currencyId) {
    const { dispatch } = this.props
    dispatch(actions.getShelves({ goods_id: goodsId, currency_id: currencyId }))
    dispatch(actions.latestDeals({ goods_id: goodsId, currency_id: currencyId }))
    dispatch(actions.getDepthMap({ goods_id: goodsId, currency_id: currencyId }))
  }

  // 币币对小数规则
  precision(price, quantity, amount, precisionPrice, precisionQuantity, precisionAmount) {
    const { dispatch } = this.props
    let p
    let q
    let a

    if (!`${price}`.length) {
      dispatch(actions.textInputDelegateUpdate({ price: 0, quantity, amount: 0 }))
      return undefined // 1.清空时置0
    }
    if (!`${quantity}`.length) {
      dispatch(actions.textInputDelegateUpdate({ price, quantity: 0, amount: 0 }))
      return undefined // 2.清空时置0
    }
    p = new BigNumber(price).multipliedBy(1).dp(precisionPrice, 1)
    if (p.isNaN()) return undefined // 3.限制只能输入数字、小数点
    if (`${price}`.endsWith('.')) {
      a = new BigNumber(p).multipliedBy(quantity).dp(precisionAmount, 1).toNumber()
      dispatch(actions.textInputDelegateUpdate({ price, quantity, amount: a }))
      return undefined // 4.保留小数点
    }
    const pArr = `${price}`.split('.')
    if (pArr[0].length > common.maxLenDelegate) return undefined // 5.整数长度限制
    if (pArr.length > 1 && pArr[1].length > precisionPrice) return undefined // 6.小数长度限制

    if (amount || amount === 0) {
      q = new BigNumber(amount).dividedBy(p).dp(precisionQuantity, 1)
      if (q.isNaN()) return undefined // 7.分子不能为0，非数字
    } else {
      q = new BigNumber(quantity)
      if (q.isNaN()) return undefined // 8.限制只能输入数字、小数点
      const qArr = `${quantity}`.split('.')
      if (qArr[0].length > common.maxLenDelegate) return undefined // 9.整数长度限制
      if (precisionQuantity === 0) {
        if (qArr.length > 1) return undefined // 10.限制只能输入整数
      } else {
        if (`${quantity}`.endsWith('.')) {
          dispatch(actions.textInputDelegateUpdate({ price, quantity, amount: a }))
          return undefined // 11.保留小数点
        }
        if (qArr.length > 1 && qArr[1].length > precisionQuantity) return undefined // 12.小数长度限制
      }
    }

    p = p.toNumber()
    q = q.toNumber()
    a = new BigNumber(q).multipliedBy(p).dp(precisionAmount, 1).toNumber()

    return { p, q, a }
  }

  textInputUpdate(price, quantity, amount) {
    const { homeRoseSelected, dispatch } = this.props
    let temp

    if (homeRoseSelected && homeRoseSelected.goods.name === common.token.ETH
      && homeRoseSelected.currency.name === common.token.BTC) {
      // p:6 q:4 a:6
      const t = this.precision(price, quantity, amount, 6, 4, 6)
      if (t) temp = t
      else return
    } else if (homeRoseSelected && homeRoseSelected.goods.name === common.token.TK
      && homeRoseSelected.currency.name === common.token.CNYT) {
      // p:4 q:0 a:4
      const t = this.precision(price, quantity, amount, 4, 0, 4)
      if (t) temp = t
      else return
    } else if (homeRoseSelected && homeRoseSelected.goods.name === common.token.TK
      && homeRoseSelected.currency.name === common.token.BTC) {
      // p:8 q:0 a:8
      const t = this.precision(price, quantity, amount, 8, 0, 8)
      if (t) temp = t
      else return
    // } else if (
    //   ((homeRoseSelected && homeRoseSelected.goods.name === common.token.BTC
    //     && homeRoseSelected.currency.name === common.token.CNYT))
    //   || ((homeRoseSelected && homeRoseSelected.goods.name === common.token.ETH
    //     && homeRoseSelected.currency.name === common.token.CNYT))
    //   || ((homeRoseSelected && homeRoseSelected.goods.name === common.token.ETH
    //     && homeRoseSelected.currency.name === common.token.TK))
    // ) {
    } else {
      // p:2 q:4 a:6
      const t = this.precision(price, quantity, amount, 2, 4, 6)
      if (t) temp = t
      else return
    }

    dispatch(actions.textInputDelegateUpdate({ price: temp.p, quantity: temp.q, amount: temp.a }))
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
          dispatch(actions.textInputDelegateUpdate({ price: 0, quantity: 0, amount: 0 }))
          ws.onopen(element.goods.id, element.currency.id, this.props.user)
          this.getUIData(element.goods.id, element.currency.id)
        },
      })
    })
    Menu.show({ x: 50, y: 126 }, items)
  }

  buyOrSellPress() {
    const { dispatch, navigation, user, buyOrSell, price, quantity, amount, homeRoseSelected,
    } = this.props
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
        total_money: amount,
      }))
    }
  }

  render() {
    const { buyOrSell, delegateCreateVisible, homeRoseSelected,
      price, quantity, amount, shelvesBuy, shelvesSell, amountVisible, valuation,
    } = this.props
    let goodsName = ''
    let currencyName = ''
    let amountVisibleTitle = ''
    let maximumValueSlider = 0
    let currentVisible = 0
    let percentSlider = 0
    let rmb = ''
    if (homeRoseSelected) {
      goodsName = homeRoseSelected.goods.name
      currencyName = homeRoseSelected.currency.name
      if (amountVisible) {
        if (buyOrSell) {
          currentVisible = amountVisible[currencyName] ? amountVisible[currencyName] : 0
          maximumValueSlider = price === 0 || quantity === 0 ? 0 : 1
          amountVisibleTitle = `${currentVisible} ${currencyName}`
        } else {
          currentVisible = amountVisible[goodsName] ? amountVisible[goodsName] : 0
          maximumValueSlider = currentVisible === 0 ? 0 : 1
          amountVisibleTitle = `${currentVisible} ${goodsName}`
        }
      }
      if (valuation && valuation.rates) {
        rmb = valuation.rates[currencyName][goodsName]
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

          <Text
            style={{
              marginLeft: common.margin10,
              color: common.textColor,
              fontSize: common.font10,
            }}
          >{`= ¥${rmb}`}</Text>

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
                this.textInputUpdate(price, quantity, temp)
              } else {
                this.textInputUpdate(price, temp)
              }
            }}
          />

          <TextInputTransactions
            placeholder={`成交金额（${currencyName}）`}
            value={amount === 0 ? '' : `${amount}`}
            editable={false}
          />

          <View
            style={{
              marginTop: 1,
              marginLeft: common.margin10,
              marginRight: common.margin10 / 2,
              flexDirection: 'row',
            }}
          >
            <Text
              style={{
                color: common.textColor,
                fontSize: common.font10,
                width: '15%',
                alignSelf: 'center',
              }}
            >可用</Text>
            <Text
              style={{
                color: common.textColor,
                fontSize: common.font10,
                width: '85%',
                textAlign: 'right',
                alignSelf: 'center',
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
                this.textInputUpdate(rd.price, quantity)
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
                this.textInputUpdate(rd.price, quantity)
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

    valuation: store.asset.valuation,
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
