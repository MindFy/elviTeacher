import React, { Component } from 'react'
import { connect } from 'react-redux'
import BigNumber from 'bignumber.js'
import {
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import Toast from 'teaset/components/Toast/Toast'
import Spinner from 'react-native-spinkit'
import {
  common,
} from '../../constants/common'
import TKSelectionBar from '../../components/TKSelectionBar'
import actions from '../../actions/index'

class LegalDeal extends Component {
  static navigationOptions(props) {
    return {
      headerTitle: '法币',
      headerStyle: {
        backgroundColor: common.navBgColor,
        borderBottomWidth: 0,
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontSize: common.font16,
      },
      headerLeft:
        (
          <TouchableOpacity
            style={{
              height: common.w40,
              width: common.w40,
              justifyContent: 'center',
            }}
            activeOpacity={common.activeOpacity}
            onPress={() => props.navigation.goBack()}
          >
            <Image
              style={{
                marginLeft: common.margin10,
                width: common.w10,
                height: common.h20,
              }}
              source={require('../../assets/下拉copy.png')}
            />
          </TouchableOpacity>
        ),
      headerRight:
        (
          <TouchableOpacity
            activeOpacity={common.activeOpacity}
            onPress={() => props.navigation.navigate('LegalDealDetail')}
          >
            <Text
              style={{
                marginRight: common.margin10,
                fontSize: common.font16,
                color: 'white',
              }}
            >明细</Text>
          </TouchableOpacity>
        ),
    }
  }
  constructor() {
    super()

    this.showLegalDealCreateResponse = false
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(actions.legalDealUpdate({ direct: common.buy, quantity: 0 }))
  }

  selectionBarPress(direct) {
    const { dispatch, quantity } = this.props
    dispatch(actions.legalDealUpdate({
      direct,
      quantity,
    }))
  }

  createPress() {
    const { dispatch, direct, quantity } = this.props
    const q = new BigNumber(quantity)
    if (!quantity.length && q.eq(0)) {
      Toast.message(`请输入${direct === common.buy ? '买入' : '卖出'}数量`)
      return
    }
    if (q.lt(common.minQuantityLegalDeal)) {
      Toast.message(`${direct === common.buy ? '买入' : '卖出'}数量最少为${
        common.minQuantityLegalDeal}`)
      return
    }
    dispatch(actions.legalDealCreate({
      direct,
      quantity: q.toNumber(),
    }))
  }

  quantityOnChange(text) {
    const { dispatch, direct } = this.props
    const a = new BigNumber(text)
    if (a.isNaN() && text.length) return // 1.限制只能输入数字、小数点
    if (!a.isNaN() && a.gt(common.maxQuantityLegalDeal)) {
      dispatch(actions.legalDealUpdate({ direct, quantity: `${common.maxQuantityLegalDeal}` }))
      return // 2.限制最大输入数量
    }
    const aArr = text.split('.')
    if (aArr.length > 1 && aArr[1].length > 2) return // 4.小数长度限制

    dispatch(actions.legalDealUpdate({ direct, quantity: text }))
  }

  handleLegalDealCreateRequest() {
    const { navigation, legalDealCreateVisible, legalDealCreateResponse } = this.props
    if (!legalDealCreateVisible && !this.showLegalDealCreateResponse) return

    if (legalDealCreateVisible) {
      this.showLegalDealCreateResponse = true
    } else {
      this.showLegalDealCreateResponse = false
      if (legalDealCreateResponse.success) {
        Toast.success(legalDealCreateResponse.result.message)
      } else if (legalDealCreateResponse.error.code === 4001414) {
        Toast.fail('余额不足')
      } else if (legalDealCreateResponse.error.code === 4001415) {
        Toast.fail('银行卡信息未绑定')
        navigation.navigate('UpdateBank')
      } else if (legalDealCreateResponse.error.code === 4001416) {
        Toast.fail('系统未提供可交易的商家')
      } else if (legalDealCreateResponse.error.code === 4001417) {
        Toast.fail('商家未提供银行卡信息')
      } else if (legalDealCreateResponse.error.code === 4001418) {
        Toast.fail('未实名认证')
      } else if (legalDealCreateResponse.error.message === common.badNet) {
        Toast.fail('网络连接失败，请稍后重试')
      } else if (legalDealCreateResponse.error.code === 4031601) {
        Toast.fail('请登录后进行操作')
      } else {
        Toast.fail('挂单失败，请重试')
      }
    }
  }

  render() {
    const { direct, priceBuy, priceSell, quantity, legalDealCreateVisible } = this.props
    const price = direct === common.buy ? priceBuy : priceSell
    const amount = !quantity.length ? 0 : new BigNumber(price).multipliedBy(quantity).dp(2, 1)
    this.handleLegalDealCreateRequest()

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: common.bgColor,
        }}
      >
        <ScrollView>
          <TKSelectionBar
            leftTitle={'买入'}
            rightTitle={'卖出'}
            leftBlock={() => this.selectionBarPress(common.buy)}
            rightBlock={() => this.selectionBarPress(common.sell)}
          />

          <View
            style={{
              marginTop: common.margin20,
              marginLeft: common.margin10,
              marginRight: common.margin10,
              height: common.h40,
              borderWidth: 1,
              borderColor: common.borderColor,
              backgroundColor: common.navBgColor,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                marginLeft: common.margin10,
                color: common.textColor,
                fontSize: common.font14,
                alignSelf: 'center',
              }}
            >{price}</Text>
            <Text
              style={{
                marginRight: common.margin10,
                color: common.textColor,
                fontSize: common.font14,
                alignSelf: 'center',
              }}
            >元</Text>
          </View>
          <View
            style={{
              marginTop: common.margin10,
              marginLeft: common.margin10,
              marginRight: common.margin10,
              height: common.h40,
              borderWidth: 1,
              borderColor: common.borderColor,
              backgroundColor: common.navBgColor,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <TextInput
              style={{
                marginLeft: common.margin10,
                color: common.textColor,
                fontSize: common.font14,
                width: '70%',
                alignSelf: 'center',
              }}
              placeholder={`${direct === common.buy ? '买入' : '卖出'}数量`}
              placeholderTextColor={common.placeholderColor}
              value={quantity}
              onChangeText={e => this.quantityOnChange(e)}
            />
            <Text
              style={{
                marginRight: common.margin10,
                color: common.textColor,
                fontSize: common.font14,
                alignSelf: 'center',
              }}
            >CNYT</Text>
          </View>

          <Text
            style={{
              marginTop: common.margin10,
              marginLeft: common.margin10,
              color: common.textColor,
              fontSize: common.font14,
            }}
          >{`${
              direct === common.buy ? '买入' : '卖出'
            }总计:${amount}元`}</Text>

          <TouchableOpacity
            style={{
              marginTop: common.margin10,
              marginLeft: common.margin10,
              marginRight: common.margin10,
              backgroundColor: common.navBgColor,
              height: common.h40,
              justifyContent: 'center',
            }}
            activeOpacity={common.activeOpacity}
            onPress={() => this.createPress()}
          >
            <Text
              style={{
                color: common.btnTextColor,
                fontSize: common.font14,
                alignSelf: 'center',
              }}
            >{direct === common.buy ? '买入' : '卖出'}</Text>
          </TouchableOpacity>

          <Text
            style={{
              marginTop: common.margin15,
              marginLeft: common.margin10,
              color: common.textColor,
              fontSize: common.font12,
            }}
          >温馨提示</Text>
          <Text
            style={{
              marginTop: common.margin10,
              marginLeft: common.margin10,
              marginRight: common.margin10,
              color: common.textColor,
              fontSize: common.font10,
              lineHeight: 14,
            }}
          >{'1. 买卖商户均为实地考察认证商户，并提供100万usdt保证金，您每次兑换会冻结商户资产，商户资产不够时，不能接单，可放心兑换；\n2. 买卖商户均为实名认证商户，可放心兑换；\n3. 请使用本人绑定的银行卡进行汇款，其他任何方式汇款都会退款。（禁止微信和支付宝）'}</Text>
        </ScrollView>
        <Spinner
          style={{
            position: 'absolute',
            alignSelf: 'center',
            marginTop: common.sh / 2 - common.h50 / 2 - 64,
          }}
          isVisible={legalDealCreateVisible}
          size={common.h50}
          type={'Wave'}
          color={common.btnTextColor}
        />
      </View>
    )
  }
}

function mapStateToProps(store) {
  return {
    direct: store.legalDeal.direct,
    priceBuy: store.legalDeal.priceBuy,
    priceSell: store.legalDeal.priceSell,
    quantity: store.legalDeal.quantity,

    legalDealCreateVisible: store.legalDeal.legalDealCreateVisible,
    legalDealCreateResponse: store.legalDeal.legalDealCreateResponse,
  }
}

export default connect(
  mapStateToProps,
)(LegalDeal)
