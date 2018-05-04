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
    const { dispatch, price, quantity, homeRoseSelected } = this.props

    if (tag === 'price') {
      let temp
      let p = isNaN(Number(text)) ? 0 : Number(text)
      let aTemp
      let amount = common.bigNumber.multipliedBy(p, quantity)
      if (homeRoseSelected
        && homeRoseSelected.goods.name === common.token.BTC
        && homeRoseSelected.currency.name === common.token.CNYT) {
        temp = common.toFix2(text)
        p = isNaN(Number(temp)) ? 0 : Number(temp)
        aTemp = common.bigNumber.multipliedBy(p, quantity)
        amount = common.toFix6(aTemp)
      } else if (homeRoseSelected
        && homeRoseSelected.goods.name === common.token.TK
        && homeRoseSelected.currency.name === common.token.CNYT) {
        temp = common.toFix4(text)
        p = isNaN(Number(temp)) ? 0 : Number(temp)
        aTemp = common.bigNumber.multipliedBy(p, quantity)
        amount = common.toFix4(aTemp)
      } else if (homeRoseSelected
        && homeRoseSelected.goods.name === common.token.TK
        && homeRoseSelected.currency.name === common.token.BTC) {
        temp = common.toFix6(text)
        p = isNaN(Number(temp)) ? 0 : Number(temp)
        aTemp = common.bigNumber.multipliedBy(p, quantity)
        amount = common.toFix8(aTemp)
      }
      dispatch(actions.textInputDelegateUpdate({ price: p, quantity, amount: Number(amount) }))
    } else if (tag === 'quantity') {
      let temp
      let q = isNaN(Number(text)) ? 0 : Number(text)
      let aTemp
      let amount = common.bigNumber.multipliedBy(price, q)
      if (homeRoseSelected
        && homeRoseSelected.goods.name === common.token.BTC
        && homeRoseSelected.currency.name === common.token.CNYT) {
        temp = common.toFix4(text)
        q = isNaN(Number(temp)) ? 0 : Number(temp)
        aTemp = common.bigNumber.multipliedBy(price, q)
        amount = common.toFix6(aTemp)
      } else if (homeRoseSelected
        && homeRoseSelected.goods.name === common.token.TK
        && homeRoseSelected.currency.name === common.token.CNYT) {
        temp = common.toFix4(text)
        q = isNaN(Number(temp)) ? 0 : Number(temp)
        aTemp = common.bigNumber.multipliedBy(price, q)
        amount = common.toFix4(aTemp)
      } else if (homeRoseSelected
        && homeRoseSelected.goods.name === common.token.TK
        && homeRoseSelected.currency.name === common.token.BTC) {
        temp = common.toFix4(text)
        q = isNaN(Number(temp)) ? 0 : Number(temp)
        aTemp = common.bigNumber.multipliedBy(price, q)
        amount = common.toFix8(aTemp)
      }
      dispatch(actions.textInputDelegateUpdate({ price, quantity: q, amount: Number(amount) }))
    }
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
          dispatch(actions.homeRoseSelectedUpdate(element))
          this.getUIData(element.goods.id, element.currency.id)
          ws.onopen(element.goods.id, element.currency.id)
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
      Toast.message(`请输入${buyOrSell ? '买入' : '卖出'}价格`)
      return
    }
    if (quantity === 0) {
      Toast.message(`请输入${buyOrSell ? '买入' : '卖出'}数量`)
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
    let amountVisibleCurrency = 0
    if (homeRoseSelected) {
      goodsName = homeRoseSelected.goods.name
      currencyName = homeRoseSelected.currency.name
      const currencyId = homeRoseSelected.currency.id
      if (currencyId === 1) {
        amountVisibleCurrency = amountVisible.TK
      } else if (currencyId === 2) {
        amountVisibleCurrency = amountVisible.BTC
      } else if (currencyId === 3) {
        amountVisibleCurrency = amountVisible.CNYT
      }
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
            sliderValue={quantity}
            minimumValue={0.000000000}
            maximumValue={amountVisibleCurrency}
            onValueChange={(value) => {
              dispatch(actions.textInputDelegateUpdate({ price, quantity: value, amount }))
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
            >{`${amountVisibleCurrency} ${currencyName}`}</Text>
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
                const p = rd.price
                const temp = common.bigNumber.multipliedBy(p, quantity)
                const a = common.toFix6(temp)
                dispatch(actions.textInputDelegateUpdate({
                  price: p,
                  quantity,
                  amount: Number(a),
                }))
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
                const p = rd.price
                const temp = common.bigNumber.multipliedBy(p, quantity)
                const a = common.toFix6(temp)
                dispatch(actions.textInputDelegateUpdate({
                  price: p,
                  quantity,
                  amount: Number(a),
                }))
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
