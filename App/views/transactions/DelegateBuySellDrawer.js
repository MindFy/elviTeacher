import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native'
import {
  Toast,
} from 'teaset'
import { BigNumber } from 'bignumber.js'
import TransactionsSlider from './TransactionsSlider'
import TextInputTransactions from './TextInputTransactions'
import { common } from '../../constants/common'
import actions from '../../actions/index'

class DelegateBuySellDrawer extends Component {
  componentDidMount() { }

  onChange(text, tag) {
    const { price, quantity } = this.props

    if (tag === 'price') {
      this.textInputUpdate(text, quantity, undefined, 'price')
    } else if (tag === 'quantity') {
      this.textInputUpdate(price, text, undefined, 'quantity')
    }
  }

  // 输入框限制
  textInputLimit(price, quantity, amount, precisionPrice, precisionQuantity, precisionAmount, tag) {
    if ((tag === 'price' && !price.length) || (tag === 'quantity' && !quantity.length)) {
      return { p: price, q: quantity, a: '' } // 1.输入框清空
    }

    let p = new BigNumber(price)
    let q = new BigNumber(quantity)
    let a

    if (amount || amount === 0) {
      q = new BigNumber(amount).dividedBy(p).dp(precisionQuantity, 1)
      if (q.isNaN()) return undefined // 9.分子不能为0，非数字
      a = new BigNumber(p).multipliedBy(q).dp(precisionAmount, 1)
      p = p.isNaN() ? '' : p.toString()
      q = q.isNaN() ? '' : q.toString()
      a = a.isNaN() ? '' : a.toFixed(precisionAmount, 1)
      return { p, q, a }
    }

    if (tag === 'price' && p.isNaN()) return undefined // 2.限制只能输入数字、小数点
    if (tag === 'quantity' && q.isNaN()) return undefined // 3.限制只能输入数字、小数点
    const pArr = price.split('.')
    const qArr = quantity.split('.')
    if (pArr[0].length > common.maxLenDelegate) return undefined // 4.整数长度限制
    if (pArr.length > 1 && pArr[1].length > precisionPrice) return undefined // 5.小数长度限制
    if (price.endsWith('.') || pArr.length > 1) {
      a = new BigNumber(p).multipliedBy(q).dp(precisionAmount, 1)
      a = a.isNaN() ? '' : a.toFixed(precisionAmount, 1)
      return { p: price, q: quantity, a }
    }
    if (qArr[0].length > common.maxLenDelegate) return undefined // 6.整数长度限制
    if (precisionQuantity === 0) {
      if (qArr.length > 1) return undefined // 7.限制只能输入整数
    } else {
      if (qArr.length > 1 && qArr[1].length > precisionQuantity) return undefined // 8.小数长度限制
      if (quantity.endsWith('.') || qArr.length > 1) {
        a = new BigNumber(p).multipliedBy(q).dp(precisionAmount, 1)
        a = a.isNaN() ? '' : a.toFixed(precisionAmount, 1)
        return { p: price, q: quantity, a }
      }
    }

    a = new BigNumber(p).multipliedBy(q).dp(precisionAmount, 1)
    p = p.isNaN() ? '' : p.toString()
    q = q.isNaN() ? '' : q.toString()
    a = a.isNaN() ? '' : a.toFixed(precisionAmount, 1)
    return { p, q, a }
  }

  textInputUpdate(price, quantity, amount, tag) {
    const { homeRoseSelected, dispatch } = this.props
    if (homeRoseSelected) {
      common.precision(homeRoseSelected.goods.name, homeRoseSelected.currency.name, (p, q, a) => {
        const temp = this.textInputLimit(price, quantity, amount, p, q, a, tag)
        if (temp) {
          dispatch(actions.textInputDelegateUpdate({
            price: temp.p, quantity: temp.q, amount: temp.a,
          }))
        }
      })
    } else {
      const temp = this.textInputLimit(price, quantity, amount, 2, 4, 6, tag)
      if (temp) {
        dispatch(actions.textInputDelegateUpdate({
          price: temp.p, quantity: temp.q, amount: temp.a,
        }))
      }
    }
  }

  buyOrSellPress() {
    const { dispatch, navigation, user, buyOrSell, price, quantity, amount, homeRoseSelected,
    } = this.props
    if (!user) {
      navigation.navigate('LoginStack')
      return
    }
    const p = new BigNumber(price)
    const q = new BigNumber(quantity)
    const a = new BigNumber(amount)
    if (!price.length || p === 0) {
      Toast.message(`请输入正确的${buyOrSell ? '买入' : '卖出'}价格`)
      return
    }
    if (!quantity.length || q === 0) {
      Toast.message(`请输入正确的${buyOrSell ? '买入' : '卖出'}数量`)
      return
    }

    if (homeRoseSelected) {
      dispatch(actions.create({
        goods_id: homeRoseSelected.goods.id,
        currency_id: homeRoseSelected.currency.id,
        direct: buyOrSell ? 'buy' : 'sell',
        price: p,
        quantity: q,
        total_money: a.toString(),
      }))
    }
  }

  render() {
    const { buyOrSell, delegateCreateVisible, homeRoseSelected,
      price, quantity, amount, amountVisible,
    } = this.props
    let goodsName = ''
    let currencyName = ''
    let amountVisibleTitle = ''
    let maximumValueSlider = 0
    let currentVisible = new BigNumber(0)
    let percentSlider = 0
    if (homeRoseSelected) {
      goodsName = homeRoseSelected.goods.name
      currencyName = homeRoseSelected.currency.name
      if (amountVisible) {
        if (buyOrSell) {
          currentVisible = new BigNumber(amountVisible[currencyName]
            ? amountVisible[currencyName] : 0)
          maximumValueSlider = !price.length || Number(price) === 0 ? 0 : 1
          amountVisibleTitle = `${new BigNumber(currentVisible).toFixed(8, 1)} ${currencyName}`
        } else {
          currentVisible = new BigNumber(amountVisible[goodsName] ? amountVisible[goodsName] : 0)
          maximumValueSlider = !price.length || currentVisible.eq(0) ? 0 : 1
          amountVisibleTitle = `${new BigNumber(currentVisible).toFixed(8, 1)} ${goodsName}`
        }
      }
    }

    if (currentVisible.eq(0)) {
      percentSlider = 0
    } else if (buyOrSell) {
      let temp = amount / currentVisible.toNumber()
      if (BigNumber(temp).lt(0.01) && BigNumber(temp).gt(0)) {
        temp = 0.01
      }
      if (BigNumber(temp).lt(1) && BigNumber(temp).gt(0.99)) {
        temp = 0.99
      }
      percentSlider = temp
    } else {
      let temp = quantity / currentVisible.toNumber()
      if (BigNumber(temp).lt(0.01) && BigNumber(temp).gt(0)) {
        temp = 0.01
      }
      if (BigNumber(temp).lt(1) && BigNumber(temp).gt(0.99)) {
        temp = 0.99
      }
      percentSlider = temp
    }

    return (
      <View
        style={{
          backgroundColor: common.navBgColor,
          width: common.sw,
        }}
        behavior="padding"
      >
        <View
          style={{
            marginTop: common.margin10,
            marginLeft: common.margin15,
            marginRight: common.margin15,
            flexDirection: 'row',
            justifyContent: 'space-between',
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

        <View
          style={{
            marginTop: common.margin5,
            marginLeft: common.margin15,
            marginRight: common.margin15,
            flexDirection: 'row',
          }}
        >
          <View
            style={{
              flex: 1,
              marginRight: common.margin22,
              height: common.h30,
              borderWidth: 1,
              borderColor: common.borderColor,
              backgroundColor: common.blackColor,
              flexDirection: 'row',
            }}
          >
            <TouchableOpacity
              style={{
                width: common.h30,
                justifyContent: 'center',
              }}
              activeOpacity={common.activeOpacity}
              onPress={() => { }}
            >
              <Image
                style={{
                  height: common.h15,
                  width: common.h15,
                  alignSelf: 'center',
                }}
                source={require('../../assets/减号.png')}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
            <TextInputTransactions
              placeholder={`价格（${currencyName}）`}
              value={price}
              onChange={e => this.onChange(e, 'price')}
            />
            <TouchableOpacity
              style={{
                width: common.h30,
                justifyContent: 'center',
              }}
              activeOpacity={common.activeOpacity}
              onPress={() => { }}
            >
              <Image
                style={{
                  height: common.h15,
                  width: common.h15,
                  alignSelf: 'center',
                }}
                source={require('../../assets/加号.png')}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              marginLeft: common.margin22,
              height: common.h30,
              borderWidth: 1,
              borderColor: common.borderColor,
              backgroundColor: common.blackColor,
              flexDirection: 'row',
            }}
          >
            <TouchableOpacity
              style={{
                width: common.h30,
                justifyContent: 'center',
              }}
              activeOpacity={common.activeOpacity}
              onPress={() => { }}
            >
              <Image
                style={{
                  height: common.h15,
                  width: common.h15,
                  alignSelf: 'center',
                }}
                source={require('../../assets/减号.png')}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
            <TextInputTransactions
              placeholder={`数量（${goodsName}）`}
              value={quantity}
              onChange={e => this.onChange(e, 'quantity')}
            />
            <TouchableOpacity
              style={{
                width: common.h30,
                justifyContent: 'center',
              }}
              activeOpacity={common.activeOpacity}
              onPress={() => { }}
            >
              <Image
                style={{
                  height: common.h15,
                  width: common.h15,
                  alignSelf: 'center',
                }}
                source={require('../../assets/加号.png')}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            marginTop: common.margin10,
            marginLeft: common.margin15,
            marginRight: common.margin15,
            height: common.h30,
            borderWidth: 1,
            borderColor: common.borderColor,
            backgroundColor: common.blackColor,
          }}
        >
          <TextInputTransactions
            textInputStyle={{
              width: '100%',
            }}
            placeholder={`成交金额（${currencyName}）`}
            value={amount}
            editable={false}
          />
        </View>

        <TransactionsSlider
          viewStyle={{
            marginTop: common.margin10,
            marginLeft: common.margin15,
            marginRight: common.margin15,
          }}
          minimumValue={0}
          maximumValue={maximumValueSlider}
          percentSlider={percentSlider}
          onValueChange={(percent) => {
            let temp = currentVisible.toNumber() * percent
            if (buyOrSell) {
              this.textInputUpdate(price, quantity, temp)
            } else {
              temp = new BigNumber(temp).dp(0, 1)
              this.textInputUpdate(price, temp.toString())
            }
          }}
        />

        <TouchableOpacity
          style={{
            marginTop: common.margin10,
            marginLeft: common.margin15,
            marginRight: common.margin15,
            marginBottom: common.margin10,
            height: common.h36,
            backgroundColor: buyOrSell ? common.redColor : common.greenColor,
            justifyContent: 'center',
          }}
          activeOpacity={common.activeOpacity}
          onPress={() => this.buyOrSellPress()}
          disabled={delegateCreateVisible}
        >
          <Text style={{
            fontSize: common.font16,
            color: 'white',
            alignSelf: 'center',
          }}
          >{buyOrSell ? '买入' : '卖出'}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps(store) {
  return {
    user: store.user.user,

    amountVisible: store.asset.amountVisible,

    homeRoseSelected: store.dealstat.homeRoseSelected,

    buyOrSell: store.deal.buyOrSell,

    price: store.delegate.price,
    quantity: store.delegate.quantity,
    amount: store.delegate.amount,
    delegateCreateVisible: store.delegate.delegateCreateVisible,
  }
}

export default connect(
  mapStateToProps,
)(DelegateBuySellDrawer)
