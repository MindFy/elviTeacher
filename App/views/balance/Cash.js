import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Image,
  ListView,
  TextInput,
  ScrollView,
  TouchableOpacity,
  DeviceEventEmitter,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native'
import {
  Toast,
  Overlay,
  ActionSheet,
} from 'teaset'
import { BigNumber } from 'bignumber.js'
import { common } from '../../constants/common'
import SelectToken from './SelectToken'
import actions from '../../actions/index'
import schemas from '../../schemas/index'
import TKViewCheckAuthorize from '../../components/TKViewCheckAuthorize'
import TKButton from '../../components/TKButton'
import TKInputItem from '../../components/TKInputItem'

class Cash extends Component {
  static navigationOptions(props) {
    return {
      headerTitle: '提现',
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
    }
  }
  constructor() {
    super()
    this.showGetVerificateCodeResponse = false
    this.showCheckVerificateCodeResponse = false

    this.dataSource = data => new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(data)
  }

  componentDidMount() {
    const { dispatch, user } = this.props
    dispatch(actions.findAddress(schemas.findAddress(user.id)))
    this.listener = DeviceEventEmitter.addListener(common.noti.withdraw, () => {
      dispatch(actions.cashAccountUpdate({ cashAccount: '', currentAddress: '' }))
      dispatch(actions.findAssetList(schemas.findAssetList(user.id)))
      Overlay.hide(this.overlayViewKey)
    })
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(actions.selectTokenUpdate({
      selectedToken: common.selectedTokenDefault,
      tokenListSelected: false,
      selectedIndex: undefined,
    }))
    dispatch(actions.cashAccountUpdate({ cashAccount: '', currentAddress: '' }))
    this.listener.remove()
  }

  onChange(event, tag) {
    const { dispatch, cashAccount, currentAddress, selectedToken } = this.props
    const maxAmount = new BigNumber(selectedToken.amount).dp(8, 1).toString()

    if (tag === 'cashAccount') {
      const a = new BigNumber(event)
      if (a.isNaN() && event.length) return // 1.限制只能输入数字、小数点
      if (!a.isNaN() && a.gt(maxAmount)) {
        dispatch(actions.cashAccountUpdate({ cashAccount: maxAmount, currentAddress }))
        return // 2.限制最大输入可用量
      }
      const aArr = event.split('.')
      if (aArr[0].length > common.maxLenDelegate) return // 3.整数长度限制
      if (aArr.length > 1 && aArr[1].length > 8) return // 4.小数长度限制

      dispatch(actions.cashAccountUpdate({ cashAccount: event, currentAddress }))
    } else if (tag === 'currentAddress') {
      dispatch(actions.cashAccountUpdate({ cashAccount, currentAddress: event }))
    } else if (tag === 'codeAuth') {
      const { text } = event.nativeEvent
      dispatch(actions.codeAuthUpdate({ codeAuth: text }))
    }
  }

  showOverlay() {
    const { dispatch, user } = this.props
    const overlayView = (
      <Overlay.View
        style={{
          justifyContent: 'center',
        }}
        modal={false}
        overlayOpacity={0}
      >
        <TKViewCheckAuthorize
          mobile={user.mobile}
          onChange={e => this.onChange(e, 'codeAuth')}
          codePress={(count) => {
            this.count = count
            dispatch(actions.getVerificateCode({ mobile: user.mobile, service: 'auth' }))
          }}
          confirmPress={() => this.confirmPress()}
          cancelPress={() => Overlay.hide(this.overlayViewKey)}
        />
      </Overlay.View>
    )
    this.overlayViewKey = Overlay.show(overlayView)
  }

  confirmPress() {
    const { dispatch, selectedToken, cashAccount, currentAddress } = this.props
    if (!this.props.codeAuth.length) {
      Toast.message('请输入验证码')
      return
    }
    let code = new BigNumber(this.props.codeAuth)
    code = code.isNaN() ? 0 : code.toNumber()
    let amount = new BigNumber(cashAccount)
    amount = amount.isNaN() ? 0 : amount.toNumber()
    dispatch(actions.withdraw({
      token_id: selectedToken.token.id,
      amount,
      toaddr: currentAddress,
      code,
    }))
  }

  withdrawPress() {
    Keyboard.dismiss()

    const { cashAccount, currentAddress, selectedToken, valuation } = this.props
    // const ca = new BigNumber(cashAccount)
    // if (!cashAccount.length || ca.eq(0)) {
    //   Toast.message('请输入提现金额')
    //   return
    // }

    if (!valuation || Object.keys(valuation).length === 0) {
      Toast.message('暂时无法提币，请稍后再试')
      return
    }

    const { count, rates } = valuation
    const { quotaCount, withdrawedCount } = count
    const bAmount = new BigNumber(cashAccount)
    const bQuotaCount = new BigNumber(quotaCount)
    const bWithdrawedCount = new BigNumber(withdrawedCount)
    const bToBTC = new BigNumber(rates.ETH.BTC)

    if (!cashAccount.length || bAmount.isEqualTo(0)) {
      Toast.message('请输入提现金额')
      return
    }

    if (bAmount.isGreaterThan(bQuotaCount)) {
      Toast.message('提现金额超过可用额度')
      return
    }

    const limitNumber = bQuotaCount.minus(bWithdrawedCount).toFixed(8, 1)
    if (selectedToken.token.id === 2) {
      if (bAmount.gt(limitNumber)) {
        Toast.message('提现金额已超过当日限额！')
        return
      }

      if (bAmount.isLessThan('0.01')) {
        Toast.message('最小提币金额为0.01！')
        return
      }
    }

    if (selectedToken.token.id === 5) {
      if (bAmount.multipliedBy(bToBTC).gt(limitNumber)) {
        Toast.message('提现金额已超过当日限额！')
        return
      }

      if (bAmount.isLessThan('0.015')) {
        Toast.message('最小提币金额为0.015！')
        return
      }
    }

    // ETC

    if (!currentAddress.length) {
      Toast.message('请输入提现地址')
      return
    }
    // if (selectedToken.token.id === 2
    //   && !validate(currentAddress, SUPPORTED_CURRENCIES.bitcoin)) {
    //   Toast.message(`请输入正确的${selectedToken.token.name}提现地址`)
    //   return
    // }
    // if (selectedToken.token.id === 5
    //   && !validate(currentAddress, SUPPORTED_CURRENCIES.ethereum)) {
    //   Toast.message(`请输入正确的${selectedToken.token.name}提现地址`)
    //   return
    // }
    this.showOverlay()
  }

  selectAddress(element) {
    const { dispatch, cashAccount } = this.props
    dispatch(actions.cashAccountUpdate({
      cashAccount,
      currentAddress: element.withdrawaddr,
    }))
  }

  showActionSheets() {
    const { address } = this.props
    const items = []
    for (let i = 0; i < address.length; i++) {
      const element = address[i]
      items.push({
        title: element.withdrawaddr,
        onPress: () => this.selectAddress(element),
      })
    }
    items.push({
      title: '+添加新地址',
      onPress: () => this.addAddressPress(),
    })
    const cancelItem = { title: '取消' }
    ActionSheet.show(items, cancelItem)
  }

  addAddressPress() {
    const { selectedToken } = this.props
    this.props.navigation.navigate('AddAddress', { selectedToken })
  }

  handleGetVerificateCodeRequest() {
    const { getVerificateCodeVisible, getVerificateCodeResponse } = this.props
    if (!getVerificateCodeVisible && !this.showGetVerificateCodeResponse) return

    if (getVerificateCodeVisible) {
      this.showGetVerificateCodeResponse = true
    } else {
      this.showGetVerificateCodeResponse = false
      if (getVerificateCodeResponse.success) {
        if (this.count) this.count()
        Toast.success(getVerificateCodeResponse.result.message, 2000, 'top')
      } else if (getVerificateCodeResponse.error.code === 4000101) {
        Toast.fail('手机号码或服务类型错误')
      } else if (getVerificateCodeResponse.error.code === 4000102) {
        Toast.fail('一分钟内不能重复发送验证码')
      } else if (getVerificateCodeResponse.error.code === 4000104) {
        Toast.fail('手机号码已注册')
      } else if (getVerificateCodeResponse.error.message === common.badNet) {
        Toast.fail('网络连接失败，请稍后重试')
      } else {
        Toast.fail('获取验证码失败，请重试')
      }
    }
  }

  renderRow(rd) {
    return (
      <View
        style={{
          marginTop: common.margin35,
          marginLeft: common.margin10,
          marginRight: common.margin10,
          height: common.h35,
          borderWidth: 1,
          borderRadius: 1,
          borderColor: common.borderColor,
          backgroundColor: common.navBgColor,
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            alignSelf: 'center',
            textAlign: 'center',
            color: 'white',
          }}
        >{rd.withdrawaddr}</Text>
      </View>
    )
  }

  renderBottomView() {
    const { selectedToken, cashAccount, currentAddress } = this.props
    if (selectedToken !== common.selectedTokenDefault) {
      let minAcount = 0
      let charge = 0
      if (selectedToken.token.name === common.token.BTC) {
        minAcount = 0.01
        charge = common.payment.charge.BTC
      } else if (selectedToken.token.name === common.token.ETH) {
        minAcount = 0.015
        charge = common.payment.charge.ETH
      } else if (selectedToken.token.name === common.token.ETC) {
        minAcount = 0.5
        charge = common.payment.charge.ETH
      }
      let actualAccount = new BigNumber(cashAccount)
      actualAccount = actualAccount.isNaN()
        ? 0 : actualAccount.minus(charge)
      actualAccount = BigNumber(actualAccount).lt(0) ? 0 : actualAccount
      const amount = new BigNumber(selectedToken.amount).toFixed(8, 1)
      return (
        <View>
          <Text style={{
            marginTop: common.margin22,
            fontSize: common.font16,
            color: common.placeholderColor,
            alignSelf: 'center',
          }}
          >可用</Text>
          <Text style={{
            marginTop: common.margin10,
            marginLeft: common.margin10,
            marginRight: common.margin10,
            fontSize: common.font30,
            alignSelf: 'center',
            textAlign: 'center',
            color: 'white',
          }}
          >{amount}</Text>
          {
            (selectedToken.token.name === common.token.BTC
              || selectedToken.token.name === common.token.ETH
              || selectedToken.token.name === common.token.ETC)
              ? <View>
                <TKInputItem
                  viewStyle={{
                    marginTop: common.margin35,
                    marginLeft: common.margin10,
                    marginRight: common.margin10,
                    height: common.h35,
                  }}
                  inputStyle={{
                    textAlign: 'center',
                  }}
                  placeholder="提现金额"
                  value={cashAccount}
                  onChangeText={e => this.onChange(e, 'cashAccount')}
                />

                <View
                  style={{
                    marginTop: common.margin5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text
                    style={{
                      marginLeft: common.margin10,
                      color: common.textColor,
                      fontSize: common.font12,
                      alignSelf: 'center',
                    }}
                  >{`手续费：${charge}${selectedToken.token.name}`}</Text>
                  <Text
                    style={{
                      marginRight: common.margin10,
                      marginLeft: common.margin10,
                      color: common.textColor,
                      fontSize: common.font12,
                      alignSelf: 'center',
                    }}
                  >{`实际到账：${actualAccount}${selectedToken.token.name}`}</Text>
                </View>

                <TKInputItem
                  viewStyle={{
                    marginTop: common.margin30,
                    marginLeft: common.margin10,
                    marginRight: common.margin10,
                    height: common.h35,
                  }}
                  inputStyle={{
                    textAlign: 'center',
                  }}
                  placeholder="地址"
                  value={currentAddress}
                  onChangeText={e => this.onChange(e, 'currentAddress')}
                  extra={() => (
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        right: 0,
                      }}
                      activeOpacity={common.activeOpacity}
                      onPress={() => this.showActionSheets()}
                    >
                      <Image
                        style={{
                          width: common.w20,
                          height: common.w20,
                        }}
                        source={require('../../assets/二维码.png')}
                      />
                    </TouchableOpacity>
                  )}
                />

                <TKButton
                  style={{ marginTop: common.margin40 }}
                  onPress={() => this.withdrawPress()}
                  theme={'gray'}
                  caption={'提现'}
                />
                <Text
                  style={{
                    marginTop: common.margin10,
                    marginLeft: common.margin10,
                    marginRight: common.margin10,
                    color: common.textColor,
                    fontSize: common.font12,
                    lineHeight: common.h15,
                  }}
                >温馨提示:</Text>
                <Text
                  style={{
                    marginTop: common.margin10,
                    marginLeft: common.margin10,
                    marginRight: common.margin10,
                    color: common.textColor,
                    fontSize: common.font10,
                    lineHeight: common.h15,
                  }}
                >{`1. 最小提币数量为：${minAcount} ${selectedToken.token.name}
2. 最大提币数量为：未身份认证：单日限1 BTC或等额其他币种， 已身份认证：单日限50 BTC或等额其他币种`}</Text>
              </View> : null
          }
        </View>
      )
    }
    return null
  }
  render() {
    const { dispatch, tokenListSelected } = this.props
    this.handleGetVerificateCodeRequest()

    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: common.bgColor,
        }}
        behavior="padding"
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
        >
          <SelectToken
            tokenListSelected={tokenListSelected}
            dispatch={dispatch}
            selectedTokenBlock={() => {
              dispatch(actions.cashAccountUpdate({ cashAccount: '', currentAddress: '' }))
            }}
          />

          {this.renderBottomView()}
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

function mapStateToProps(store) {
  return {
    user: store.user.user,
    getVerificateCodeVisible: store.user.getVerificateCodeVisible,
    getVerificateCodeResponse: store.user.getVerificateCodeResponse,

    asset: store.asset.asset,
    valuation: store.asset.valuation,

    address: store.address.address,
    selectedToken: store.address.selectedToken,
    tokenListSelected: store.address.tokenListSelected,

    codeAuth: store.ui.codeAuth,
    cashAccount: store.ui.cashAccount,
    currentAddress: store.ui.currentAddress,
  }
}

export default connect(
  mapStateToProps,
)(Cash)
