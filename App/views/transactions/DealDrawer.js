import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  Animated,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native'
import { BigNumber } from 'bignumber.js'
import TransactionsSlider from './TransactionsSlider'
import TextInputTransactions from './TextInputTransactions'
import { common } from '../../constants/common'
import TKButton from '../../components/TKButton'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'

const styles = StyleSheet.create({
  cover: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: common.sw,
    height: common.IsIOS ? common.sh : (common.sh - 20),
    zIndex: 10,
  },
  press: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    flex: 1,
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
    marginTop: common.margin5,
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
  buttonStyle: {
    fontSize: common.font16,
    color: 'white',
  },
})

class DealDrawer extends Component {
  constructor() {
    super()
    this.state = {
      visible: false,
      index: 0,
      keyboardHeight: new Animated.Value(0),
    }
  }

  caculateNecessaryData() {
    const { formData, selectedPair, amountVisible } = this.props
    const { price, quantity, amount } = formData
    const { index } = this.state
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

  hide() {
    this.setState({
      visible: false,
      index: 0,
    }, () => {
      const { unmountAction } = this.props
      if (unmountAction) {
        unmountAction()
      }
    })
  }

  showAtIndex(index) {
    this.setState({
      visible: true,
      index,
    })
  }

  render() {
    const caculatedData = this.caculateNecessaryData()
    const { formData, changeAction, slideAction, buttonAction } = this.props
    const { price, quantity, amount } = formData
    const { index } = this.state
    if (this.state.visible === false) {
      return null
    }
    return (
      <View style={styles.cover}>
        <NextTouchableOpacity
          activeOpacity={1}
          style={styles.press}
          onPress={() => this.hide()}
        />
        <KeyboardAvoidingView
          style={{ backgroundColor: common.blackColor }}
          contentContainerStyle={{ justifyContent: 'center' }}
          behavior="padding"
        >
          <View style={[styles.inputView, { marginTop: common.margin10 }]}>
            <Text style={styles.amountVisibleTitle}>可用</Text>
            <Text style={styles.amountVisible}>
              {caculatedData.newamountVisible}
            </Text>
          </View>

          <View style={styles.inputView}>
            <View style={styles.price}>
              <NextTouchableOpacity
                style={styles.plusBtn}
                activeOpacity={common.activeOpacity}
                onPress={() => {
                  if (changeAction) {
                    changeAction({
                      cmd: 'release',
                      type: 'price',
                    })
                  }
                }}
              >
                <Image
                  style={styles.plusBtnImage}
                  source={require('../../assets/release.png')}
                  resizeMode={'contain'}
                />
              </NextTouchableOpacity>
              <TextInputTransactions
                placeholder={`价格（${caculatedData.currencyName}）`}
                keyboardType="numeric"
                value={price}
                onChangeText={(e) => {
                  if (changeAction) {
                    changeAction({
                      cmd: 'input',
                      type: 'price',
                      val: e,
                    })
                  }
                }}
                onFocus={() => {
                  if (!common.IsIOS) {
                    Animated.timing(
                      this.state.keyboardHeight,
                      { toValue: 240, duration: 200 },
                    ).start()
                  }
                }}
                onEndEditing={() => {
                  if (!common.IsIOS) {
                    Animated.timing(
                      this.state.keyboardHeight,
                      { toValue: 0, duration: 200 },
                    ).start()
                  }
                }}
              />
              <NextTouchableOpacity
                style={styles.plusBtn}
                activeOpacity={common.activeOpacity}
                onPress={() => {
                  if (changeAction) {
                    changeAction({
                      cmd: 'plus',
                      type: 'price',
                    })
                  }
                }}
              >
                <Image
                  style={styles.plusBtnImage}
                  source={require('../../assets/plus.png')}
                  resizeMode={'contain'}
                />
              </NextTouchableOpacity>
            </View>
            <View style={styles.price}>
              <NextTouchableOpacity
                style={styles.plusBtn}
                activeOpacity={common.activeOpacity}
                onPress={() => {
                  if (changeAction) {
                    changeAction({
                      cmd: 'release',
                      type: 'quantity',
                    })
                  }
                }}
              >
                <Image
                  style={styles.plusBtnImage}
                  source={require('../../assets/release.png')}
                  resizeMode={'contain'}
                />
              </NextTouchableOpacity>
              <TextInputTransactions
                placeholder={`数量（${caculatedData.goodsName}）`}
                keyboardType="numeric"
                value={quantity}
                onChangeText={(e) => {
                  if (changeAction) {
                    changeAction({
                      cmd: 'input',
                      type: 'quantity',
                      val: e,
                    })
                  }
                }}
                onFocus={() => {
                  if (!common.IsIOS) {
                    Animated.timing(
                      this.state.keyboardHeight,
                      { toValue: 240, duration: 200 },
                    ).start()
                  }
                }}
                onEndEditing={() => {
                  if (!common.IsIOS) {
                    Animated.timing(
                      this.state.keyboardHeight,
                      { toValue: 0, duration: 200 },
                    ).start()
                  }
                }}
              />
              <NextTouchableOpacity
                style={styles.plusBtn}
                activeOpacity={common.activeOpacity}
                onPress={() => {
                  if (changeAction) {
                    changeAction({
                      cmd: 'plus',
                      type: 'quantity',
                    })
                  }
                }}
              >
                <Image
                  style={styles.plusBtnImage}
                  source={require('../../assets/plus.png')}
                  resizeMode={'contain'}
                />
              </NextTouchableOpacity>
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
              if (slideAction) {
                slideAction({
                  percent,
                  currentVisible: caculatedData.currentVisible,
                  index,
                })
              }
            }}
          />

          <TKButton
            style={[styles.bottomBtn, {
              backgroundColor: !index ? common.redColor : common.greenColor,
            }]}
            titleStyle={styles.buttonStyle}
            theme={'gray'}
            caption={!index ? '买入' : '卖出'}
            onPress={() => {
              if (buttonAction) {
                buttonAction(index)
              }
            }}
            disabled={caculatedData.delegateCreateVisible}
          />
          <Animated.View
            style={{
              height: this.state.keyboardHeight,
            }}
          />
        </KeyboardAvoidingView>
      </View>
    )
  }
}

export default DealDrawer
