import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import {
  Toast,
  Overlay,
} from 'teaset'
import {
  common,
} from '../../constants/common'
import TextInputUpdateBank from './TextInputUpdateBank'
import TKViewCheckAuthorize from '../../components/TKViewCheckAuthorize'
import actions from '../../actions/index'

class UpdateBank extends Component {
  static navigationOptions(props) {
    return {
      headerTitle: '银行卡管理',
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
    this.showUpdateBankResponse = false
    this.showGetVerificateCodeResponse = false
  }

  componentDidMount() {
    const { dispatch, user } = this.props
    dispatch(actions.updateBankUpdate({
      bankName: user.bankName,
      subbankName: user.subbankName,
      bankNo: user.bankNo,
    }))
  }

  componentWillUnmount() {
    const { dispatch, mobile, password, passwordAgain } = this.props
    dispatch(actions.registerUpdate({ mobile, code: '', password, passwordAgain }))
    dispatch(actions.updateBankUpdate({ bankName: '', subbankName: '', bankNo: '' }))
  }

  onChange(event, tag) {
    const { text } = event.nativeEvent
    const { dispatch, bankName, subbankName, bankNo,
      mobile, password, passwordAgain } = this.props
    switch (tag) {
      case 'bankName':
        dispatch(actions.updateBankUpdate({ bankName: text, subbankName, bankNo }))
        break
      case 'subbankName':
        dispatch(actions.updateBankUpdate({ bankName, subbankName: text, bankNo }))
        break
      case 'bankNo':
        dispatch(actions.updateBankUpdate({ bankName, subbankName, bankNo: text }))
        break
      case 'code':
        dispatch(actions.registerUpdate({ mobile, code: text, password, passwordAgain }))
        break
      default:
        break
    }
  }

  confirmPress() {
    const { bankName, subbankName, bankNo } = this.props
    if (!bankName.length || !common.regBankName.test(bankName)
      || !common.regSpace.test(bankName)) {
      Toast.message('请输入开户银行, 至少四位中文')
      return
    }
    if (!subbankName.length || !common.regBankName.test(subbankName)
      || !common.regSpace.test(bankName)) {
      Toast.message('请输入开户支行名称, 至少四位中文')
      return
    }
    if (!bankNo.length || !common.regBankNo.test(bankNo) || !common.regSpace.test(bankNo)) {
      Toast.message('请输入银行卡号, 16-19位数字')
      return
    }
    this.showOverlay()
  }

  updateBank() {
    const { dispatch, bankName, subbankName, bankNo, code, user } = this.props
    const newUser = JSON.parse(JSON.stringify(user))
    newUser.bankName = bankName
    newUser.subbankName = subbankName
    newUser.bankNo = bankNo
    dispatch(actions.updateBank({
      bankName,
      subbankName,
      bankNo,
      code,
    }, newUser))
  }

  showOverlay() {
    const { dispatch, user, code } = this.props
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
          code={code}
          onChange={e => this.onChange(e, 'code')}
          codePress={(count) => {
            this.count = count
            dispatch(actions.getVerificateCode({ mobile: user.mobile, service: 'auth' }))
          }}
          confirmPress={() => {
            dispatch(actions.checkVerificateCode({ mobile: this.props.user.mobile, service: 'auth', code: this.props.code }))
          }}
          cancelPress={() => Overlay.hide(this.overlayViewKey)}
        />
      </Overlay.View>
    )
    this.overlayViewKey = Overlay.show(overlayView)
  }

  handleCheckVerificateCodeRequest() {
    const { checkVerificateCodeVisible, checkVerificateCodeResponse } = this.props
    if (!checkVerificateCodeVisible && !this.showCheckVerificateCodeResponse) return

    if (checkVerificateCodeVisible) {
      this.showCheckVerificateCodeResponse = true
    } else {
      this.showCheckVerificateCodeResponse = false
      if (checkVerificateCodeResponse.success) {
        this.updateBank()
      } else if (checkVerificateCodeResponse.error.message === common.badNet) {
        Toast.fail('网络连接失败，请稍后重试')
      } else if (checkVerificateCodeResponse.error.code === 4000101) {
        Toast.fail('手机号码或服务类型错误')
      } else if (checkVerificateCodeResponse.error.code === 4000102) {
        Toast.fail('验证码错误')
      } else {
        Toast.fail('验证失败，请重试')
      }
    }
  }

  handleGetVerificateCodeRequest() {
    const { getVerificateCodeVisible, getVerificateCodeResponse } = this.props
    if (!getVerificateCodeVisible && !this.showGetVerificateCodeResponse) return

    if (getVerificateCodeVisible) {
      this.showGetVerificateCodeResponse = true
    } else {
      this.showGetVerificateCodeResponse = false
      if (getVerificateCodeResponse.success) {
        this.count()
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

  handleUpdateBankRequest() {
    const { navigation, updateBankVisible, updateBankResponse } = this.props
    if (!updateBankVisible && !this.showUpdateBankResponse) return

    if (updateBankVisible) {
      this.showUpdateBankResponse = true
    } else {
      this.showUpdateBankResponse = false
      if (updateBankResponse.success) {
        Toast.success(updateBankResponse.result)
        Overlay.hide(this.overlayViewKey)
        navigation.goBack()
      } else {
        Toast.fail(updateBankResponse.error.message)
        if (updateBankResponse.error.code === 4000156) {
          this.showOverlay()
        }
      }
    }
  }

  render() {
    const { bankName, subbankName, bankNo, navigation } = this.props
    this.handleUpdateBankRequest()
    this.handleGetVerificateCodeRequest()
    this.handleCheckVerificateCodeRequest()

    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: common.blackColor,
        }}
      >
        <TextInputUpdateBank
          viewStyle={{
            marginTop: common.margin10,
          }}
          title={'开户银行'}
          value={bankName}
          placeholder={'请输入开户银行'}
          onEndEditing={e => this.onChange(e, 'bankName')}
          maxLength={common.textInputMaxLenBankName}
        />
        <TextInputUpdateBank
          title={'开户支行'}
          value={subbankName}
          placeholder={'请输入正确的开户支行名称'}
          onEndEditing={e => this.onChange(e, 'subbankName')}
          maxLength={common.textInputMaxLenBankName}
        />
        <TextInputUpdateBank
          title={'银行卡号'}
          placeholder={'请输入正确的银行卡号'}
          value={bankNo}
          onChange={e => this.onChange(e, 'bankNo')}
          keyboardType={'numbers-and-punctuation'}
          maxLength={common.textInputMaxLenBankNo}
        />

        <View
          style={{
            marginTop: common.margin5,
            backgroundColor: common.navBgColor,
          }}
        >
          <Text
            style={{
              marginTop: common.margin10,
              marginLeft: common.margin10,
              color: common.textColor,
              fontSize: common.font12,
            }}
          >温馨提示</Text>
          <Text
            style={{
              marginTop: common.margin5,
              marginLeft: common.margin10,
              marginRight: common.margin10,
              marginBottom: common.margin10,
              color: common.textColor,
              fontSize: common.font10,
              lineHeight: common.font12,
            }}
          >1、添加的银行卡必须用于法币交易买卖转账，若使用其他银行卡，可能导致交易失败，请谨慎添加！</Text>
        </View>

        <TouchableOpacity
          activeOpacity={common.activeOpacity}
          style={{
            marginTop: common.margin20,
            marginLeft: common.margin10,
            marginRight: common.margin10,
            backgroundColor: common.navBgColor,
            height: common.h40,
            justifyContent: 'center',
          }}
          onPress={() => this.confirmPress()}
        >
          <Text
            style={{
              color: common.btnTextColor,
              fontSize: common.font14,
              alignSelf: 'center',
            }}
          >{(navigation.state.params && navigation.state.params.fromMe === 'fromMe' && bankName.length) ? '重新添加' : '确认'}</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}

function mapStateToProps(store) {
  return {
    bankName: store.user.bankName,
    subbankName: store.user.subbankName,
    bankNo: store.user.bankNo,
    user: store.user.user,
    mobile: store.user.mobileRegister,
    code: store.user.codeRegister,
    password: store.user.passwordRegister,
    passwordAgain: store.user.passwordAgainRegister,

    updateBankVisible: store.user.updateBankVisible,
    updateBankResponse: store.user.updateBankResponse,

    getVerificateCodeVisible: store.user.getVerificateCodeVisible,
    getVerificateCodeResponse: store.user.getVerificateCodeResponse,

    checkVerificateCodeVisible: store.user.checkVerificateCodeVisible,
    checkVerificateCodeResponse: store.user.checkVerificateCodeResponse,
  }
}

export default connect(
  mapStateToProps,
)(UpdateBank)
