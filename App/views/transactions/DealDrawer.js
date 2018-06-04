import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Text,
  View,
  Image,
  Animated,
  Keyboard,
  StyleSheet,
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
import TKButton from '../../components/TKButton'

const styles = StyleSheet.create({
  container: {
    backgroundColor: common.navBgColor,
    width: common.sw,
  },
  bottomBtn: {
    marginTop: common.margin10,
    marginLeft: common.margin15,
    marginRight: common.margin15,
    marginBottom: common.margin10,
    height: common.h36,
  },
  inputView: {
    marginTop: common.margin5,
    marginLeft: common.margin15,
    marginRight: common.margin15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price: {
    height: common.h30,
    width: (common.sw - common.margin30 - 2 * common.margin22) / 2,
    borderWidth: 1,
    borderColor: common.borderColor,
    backgroundColor: common.blackColor,
    flexDirection: 'row',
  },
  plusBtn: {
    width: common.h30,
    justifyContent: 'center',
  },
  plusBtnImage: {
    height: common.h15,
    width: common.h15,
    alignSelf: 'center',
  },
  slider: {
    marginTop: common.margin10,
    marginLeft: common.margin15,
    marginRight: common.margin15,
  },
  amount: {
    marginTop: common.margin10,
    marginLeft: common.margin15,
    marginRight: common.margin15,
    height: common.h30,
    borderWidth: 1,
    borderColor: common.borderColor,
    backgroundColor: common.blackColor,
  },
  amountVisible: {
    color: common.textColor,
    fontSize: common.font10,
    width: '85%',
    textAlign: 'right',
    alignSelf: 'center',
  },
  amountVisibleTitle: {
    color: common.textColor,
    fontSize: common.font10,
    width: '15%',
    alignSelf: 'center',
  },
})

class DealDrawer extends Component {
  constructor() {
    super()
    this.state = {
      keyboardHeight: new Animated.Value(0),
    }
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      Animated.timing(this.state.keyboardHeight, { toValue: 216, duration: 100 }).start()
    })
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      Animated.timing(this.state.keyboardHeight, { toValue: 0, duration: 100 }).start()
    })
  }

  componentWillUnmount() {
    if (this.keyboardDidShowListener != null) {
      this.keyboardDidShowListener.remove()
    }
    if (this.keyboardDidHideListener != null) {
      this.keyboardDidHideListener.remove()
    }
  }

  onChange(text, tag) {
    const { price, quantity } = this.props

    if (tag === 'price') {
      // this.textInputUpdate(text, quantity, undefined, 'price')
    } else if (tag === 'quantity') {
      // this.textInputUpdate(price, text, undefined, 'quantity')
    }
  }

  caculateNecessaryData() {
    const { formData, selectedPair, index, amountVisible } = this.props
    const { number, price, ratio, quantity, amount } = formData
    let goodsName = ''
    let currencyName = ''
    let newamountVisible = ''
    let maximumValueSlider = 0
    let currentVisible = new BigNumber(0)
    let percentSlider = 0
    if (selectedPair) {
      goodsName = selectedPair.goods.name
      currencyName = selectedPair.currency.name
      if (amountVisible) {
        if (!index) {
          currentVisible = new BigNumber(amountVisible[currencyName]
            ? amountVisible[currencyName] : 0)
          maximumValueSlider = !price.length || Number(price) === 0 ? 0 : 1
          newamountVisible = `${new BigNumber(currentVisible).toFixed(8, 1)} ${currencyName}`
        } else {
          currentVisible = new BigNumber(amountVisible[goodsName] ? amountVisible[goodsName] : 0)
          maximumValueSlider = !price.length || currentVisible.eq(0) ? 0 : 1
          newamountVisible = `${new BigNumber(currentVisible).toFixed(8, 1)} ${goodsName}`
        }
      }
    }

    if (currentVisible.eq(0)) {
      percentSlider = 0
    } else if (!index) {
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
    return {
      goodsName,
      currencyName,
      newamountVisible,
      maximumValueSlider,
      currentVisible,
      percentSlider,
    }
  }


  // 输入框限制
  // textInputLimit(price, quantity, amount, precisionPrice, precisionQuantity, precisionAmount, tag) {
  //   if ((tag === 'price' && !price.length) || (tag === 'quantity' && !quantity.length)) {
  //     return { p: price, q: quantity, a: '' } // 1.输入框清空
  //   }

  //   let p = new BigNumber(price)
  //   let q = new BigNumber(quantity)
  //   let a
  //   if (amount || amount === 0) {
  //     q = new BigNumber(amount).dividedBy(p).dp(precisionQuantity, 1)
  //     if (q.isNaN()) return undefined // 9.分子不能为0，非数字
  //     a = new BigNumber(p).multipliedBy(q).dp(precisionAmount, 1)
  //     p = p.isNaN() ? '' : p.toString()
  //     q = q.isNaN() ? '' : q.toString()
  //     a = a.isNaN() ? '' : a.toFixed(precisionAmount, 1)
  //     return { p, q, a }
  //   }

  //   if (tag === 'price' && p.isNaN()) return undefined // 2.限制只能输入数字、小数点
  //   if (tag === 'quantity' && q.isNaN()) return undefined // 3.限制只能输入数字、小数点
  //   const pArr = price.split('.')
  //   const qArr = quantity.split('.')
  //   if (pArr[0].length > common.maxLenDelegate) return undefined // 4.整数长度限制
  //   if (pArr.length > 1 && pArr[1].length > precisionPrice) return undefined // 5.小数长度限制
  //   if (price.endsWith('.') || pArr.length > 1) {
  //     a = new BigNumber(p).multipliedBy(q).dp(precisionAmount, 1)
  //     a = a.isNaN() ? '' : a.toFixed(precisionAmount, 1)
  //     return { p: price, q: quantity, a }
  //   }
  //   if (qArr[0].length > common.maxLenDelegate) return undefined // 6.整数长度限制
  //   if (precisionQuantity === 0) {
  //     if (qArr.length > 1) return undefined // 7.限制只能输入整数
  //   } else {
  //     if (qArr.length > 1 && qArr[1].length > precisionQuantity) return undefined // 8.小数长度限制
  //     if (quantity.endsWith('.') || qArr.length > 1) {
  //       a = new BigNumber(p).multipliedBy(q).dp(precisionAmount, 1)
  //       a = a.isNaN() ? '' : a.toFixed(precisionAmount, 1)
  //       return { p: price, q: quantity, a }
  //     }
  //   }

  //   a = new BigNumber(p).multipliedBy(q).dp(precisionAmount, 1)
  //   p = p.isNaN() ? '' : p.toString()
  //   q = q.isNaN() ? '' : q.toString()
  //   a = a.isNaN() ? '' : a.toFixed(precisionAmount, 1)
  //   return { p, q, a }
  // }

  // textInputUpdate(price, quantity, amount, tag) {
  //   const { selectedPair, dispatch } = this.props
  //   if (selectedPair) {
  //     common.precision(selectedPair.goods.name, selectedPair.currency.name, (p, q, a) => {
  //       const temp = this.textInputLimit(price, quantity, amount, p, q, a, tag)
  //       if (temp) {
  //         dispatch(actions.textInputDelegateUpdate({
  //           price: temp.p, quantity: temp.q, amount: temp.a,
  //         }))
  //       }
  //     })
  //   } else {
  //     const temp = this.textInputLimit(price, quantity, amount, 2, 4, 6, tag)
  //     if (temp) {
  //       dispatch(actions.textInputDelegateUpdate({
  //         price: temp.p, quantity: temp.q, amount: temp.a,
  //       }))
  //     }
  //   }
  // }

  // buyOrSellPress() {
  //   const {
  //     dispatch,
  //     navigation,
  //     user,
  //     buyOrSell,
  //     price,
  //     quantity,
  //     amount,
  //     selectedPair,
  //     onPress,
  //   } = this.props
  //   if (!user) {
  //     navigation.navigate('LoginStack')
  //     return
  //   }
  //   const p = new BigNumber(price)
  //   const q = new BigNumber(quantity)
  //   const a = new BigNumber(amount)
  //   if (!price.length || p === 0) {
  //     Toast.message(`请输入正确的${!index ? '买入' : '卖出'}价格`)
  //     return
  //   }
  //   if (!quantity.length || q === 0) {
  //     Toast.message(`请输入正确的${!index ? '买入' : '卖出'}数量`)
  //     return
  //   }

  //   if (selectedPair) {
  //     dispatch(actions.create({
  //       goods_id: selectedPair.goods.id,
  //       currency_id: selectedPair.currency.id,
  //       direct: !index ? 'buy' : 'sell',
  //       price: p,
  //       quantity: q,
  //       total_money: a.toString(),
  //     }))
  //     if (onPress) {
  //       onPress()
  //     }
  //   }
  // }

  // tapPlusBtn = (type) => {
  //   const { price, quantity, dispatch } = this.props
  //   if (type === 'price') {
  //     if (price === '') {
  //       return
  //     }
  //     common.precision('BTC', 'TK', (p, q, amount) => {
  //       const plusNum = BigNumber(0.1).pow(p)
  //       let newPrice = BigNumber(price).plus(plusNum)
  //       if (newPrice.lt(0)) {
  //         newPrice = BigNumber(0)
  //       }
  //       dispatch(actions.detailupdateKV('price', newPrice.toString()))
  //       const newAmount = BigNumber(quantity).multipliedBy(newPrice)
  //       if (newAmount.isNaN()) {
  //         return
  //       }
  //       dispatch(actions.detailupdateKV('amount', newAmount.toFixed(amount, 1)))
  //     })
  //   } else {
  //     if (quantity === '') {
  //       return
  //     }
  //     common.precision('BTC', 'TK', (p, q, amount) => {
  //       const plusNum = BigNumber(0.1).pow(q)
  //       let newQuantity = BigNumber(quantity).plus(plusNum)
  //       if (newQuantity.lt(0)) {
  //         newQuantity = BigNumber(0)
  //       }
  //       dispatch(actions.detailupdateKV('quantity', newQuantity.toString()))
  //       const newAmount = BigNumber(price).multipliedBy(newQuantity)
  //       if (newAmount.isNaN()) {
  //         return
  //       }
  //       dispatch(actions.detailupdateKV('amount', newAmount.toFixed(amount, 1)))
  //     })
  //   }
  // }

  tapMinusBtn = (type) => {
    const { dispatch, formData } = this.props
    const { price, quantity } = formData
    if (type === 'price') {
      if (price === '') {
        return
      }
      common.precision('BTC', 'TK', (p, q, amount) => {
        const minusNum = BigNumber(0.1).pow(p)
        let newPrice = BigNumber(price).minus(minusNum)
        if (newPrice.lt(0)) {
          newPrice = BigNumber(0)
        }
        dispatch(actions.detailupdateKV('price', newPrice.toString()))
        const newAmount = BigNumber(quantity).multipliedBy(newPrice)
        if (newAmount.isNaN()) {
          return
        }
        dispatch(actions.detailupdateKV('amount', newAmount.toFixed(amount, 1)))
      })
    } else {
      if (quantity === '') {
        return
      }
      common.precision('BTC', 'TK', (p, q, amount) => {
        const minusNum = BigNumber(0.1).pow(q)
        let newQuantity = BigNumber(quantity).minus(minusNum)
        if (newQuantity.lt(0)) {
          newQuantity = BigNumber(0)
        }
        dispatch(actions.detailupdateKV('quantity', newQuantity.toString()))
        const newAmount = BigNumber(price).multipliedBy(newQuantity)
        if (newAmount.isNaN()) {
          return
        }
        dispatch(actions.detailupdateKV('amount', newAmount.toFixed(amount, 1)))
      })
    }
  }

  render() {
    const caculatedData = this.caculateNecessaryData()
    const { index, formData } = this.props
    const { price, quantity, amount } = formData
    return (
      <View
        style={styles.container}
        behavior="padding"
      >
        <View style={[styles.inputView, { marginTop: common.margin10 }]}>
          <Text style={styles.amountVisibleTitle}>
            可用
          </Text>
          <Text style={styles.amountVisible}>
            {caculatedData.newamountVisible}
          </Text>
        </View>

        <View style={styles.inputView}>
          <View style={styles.price}>
            <TouchableOpacity
              style={styles.plusBtn}
              activeOpacity={common.activeOpacity}
              onPress={() => { this.tapMinusBtn('price') }}
            >
              <Image
                style={styles.plusBtnImage}
                source={require('../../assets/减号.png')}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
            <TextInputTransactions
              placeholder={`价格（${caculatedData.currencyName}）`}
              value={price}
              onChange={e => this.onChange(e, 'price')}
            />
            <TouchableOpacity
              style={styles.plusBtn}
              activeOpacity={common.activeOpacity}
              onPress={() => { this.tapPlusBtn('price') }}
            >
              <Image
                style={styles.plusBtnImage}
                source={require('../../assets/加号.png')}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.price}>
            <TouchableOpacity
              style={styles.plusBtn}
              activeOpacity={common.activeOpacity}
              onPress={() => { this.tapMinusBtn('quantity') }}
            >
              <Image
                style={styles.plusBtnImage}
                source={require('../../assets/减号.png')}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
            <TextInputTransactions
              placeholder={`数量（${caculatedData.goodsName}）`}
              value={quantity}
              onChange={e => this.onChange(e, 'quantity')}
            />
            <TouchableOpacity
              style={styles.plusBtn}
              activeOpacity={common.activeOpacity}
              onPress={() => { this.tapPlusBtn('quantity') }}
            >
              <Image
                style={styles.plusBtnImage}
                source={require('../../assets/加号.png')}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.amount}>
          <TextInputTransactions
            textInputStyle={{ width: '100%' }}
            placeholder={`成交金额（${caculatedData.currencyName}）`}
            value={amount}
            editable={false}
          />
        </View>

        <TransactionsSlider
          viewStyle={styles.slider}
          minimumValue={0}
          maximumValue={caculatedData.maximumValueSlider}
          percentSlider={caculatedData.percentSlider}
          onValueChange={(percent) => {
            let temp = caculatedData.currentVisible.toNumber() * percent
            if (!index) {
              // this.textInputUpdate(price, quantity, temp)
            } else {
              temp = new BigNumber(temp).dp(0, 1)
              // this.textInputUpdate(price, temp.toString())
            }
          }}
        />

        <TKButton
          style={[styles.bottomBtn, {
            backgroundColor: !index ? common.redColor : common.greenColor,
          }]}
          titleStyle={{
            fontSize: common.font16,
            color: 'white',
          }}
          theme={'gray'}
          caption={!index ? '买入' : '卖出'}
          onPress={() => () => {}}
          disabled={caculatedData.delegateCreateVisible}
        />

        <Animated.View
          style={{ height: this.state.keyboardHeight }}
        />
      </View>
    )
  }
}

export default DealDrawer
