import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native'
import Toast from 'teaset/components/Toast/Toast'
import Spinner from 'react-native-spinkit'
import { common } from '../../constants/common'
import actions from '../../actions/index'
import TKInputItem from '../../components/TKInputItem'
import TKInputItemCheckCode from '../../components/TKInputItemCheckCode'
import TKButton from '../../components/TKButton'

class Register extends Component {
  constructor() {
    super()
    this.showRegisterResponse = false
    this.showGetVerificateCodeResponse = false
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(actions.registerUpdate({
      mobile: '',
      code: '',
      password: '',
      passwordAgain: '',
      recommendNo: '',
    }))
  }

  onChange(event, tag) {
    const { text } = event.nativeEvent
    const { dispatch, mobile, code, password, passwordAgain, recommendNo } = this.props
    switch (tag) {
      case 'mobile':
        dispatch(actions.registerUpdate({
          mobile: text,
          code,
          password,
          passwordAgain,
          recommendNo,
        }))
        break
      case 'code':
        dispatch(actions.registerUpdate({
          mobile,
          code: text,
          password,
          passwordAgain,
          recommendNo,
        }))
        break
      case 'password':
        dispatch(actions.registerUpdate({
          mobile,
          code,
          password: text,
          passwordAgain,
          recommendNo,
        }))
        break
      case 'passwordAgain':
        dispatch(actions.registerUpdate({
          mobile,
          code,
          password,
          passwordAgain: text,
          recommendNo,
        }))
        break
      case 'recommendNo':
        dispatch(actions.registerUpdate({
          mobile,
          code,
          password,
          passwordAgain,
          recommendNo: text,
        }))
        break
      default:
        break
    }
  }

  codePress() {
    const { dispatch, mobile } = this.props
    if (!common.regMobile.test(mobile)) {
      Toast.message('请输入正确的手机号')
      return
    }
    dispatch(actions.getVerificateCode({
      mobile,
      service: 'register',
    }))
  }

  registerPress() {
    const { dispatch, mobile, code, password, passwordAgain, recommendNo } = this.props
    if (!mobile.length) {
      Toast.message('请输入手机号')
      return
    }
    if (!code.length) {
      Toast.message('请输入验证码')
      return
    }
    if (!password.length || !common.regPassword.test(password) ||
      !common.regSpace.test(password)) {
      Toast.show({
        style: {
          paddingLeft: common.margin20,
          paddingRight: common.margin20,
        },
        text: common.regPasswordMsg,
        position: 'bottom',
      })
      return
    }
    if (!passwordAgain.length) {
      Toast.message('请再次设置密码')
      return
    }
    if (password !== passwordAgain) {
      Toast.message('确认密码需要和密码保持一致')
      return
    }
    if (!common.regMobile.test(mobile)) {
      Toast.message('请输入正确的手机号')
      return
    }
    dispatch(actions.register({
      mobile,
      code,
      password,
      recommendNo,
    }))
  }

  handleGetVerificateCodeRequest() {
    const { getVerificateCodeVisible, getVerificateCodeResponse } = this.props
    if (!getVerificateCodeVisible && !this.showGetVerificateCodeResponse) return

    if (getVerificateCodeVisible) {
      this.showGetVerificateCodeResponse = true
    } else {
      this.showGetVerificateCodeResponse = false
      if (getVerificateCodeResponse.success) {
        Toast.success(getVerificateCodeResponse.result.message)
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

  handleRegisterRequest() {
    const { registerVisible, registerResponse, navigation } = this.props
    if (!registerVisible && !this.showRegisterResponse) return

    if (registerVisible) {
      this.showRegisterResponse = true
    } else {
      this.showRegisterResponse = false

      if (registerResponse.success) {
        Toast.success('注册成功')

        const { dispatch } = this.props
        dispatch(actions.loginUpdate({ mobile: '', password: '' }))
        navigation.goBack()
      } else if (registerResponse.error.code === 4000104) {
        Toast.fail('注册用户失败')
      } else if (registerResponse.error.code === 4000101) {
        Toast.fail('验证码不能为空')
      } else if (registerResponse.error.code === 4000102) {
        Toast.fail('验证码错误')
      } else if (registerResponse.error.code === 4000103) {
        Toast.fail('验证码已过期，请重新获取')
      } else if (registerResponse.error.code === 4000114) {
        Toast.fail('手机号码已被注册')
      } else if (registerResponse.error.code === 4000115) {
        Toast.fail('邀请用户不存在')
      } else if (registerResponse.error.code === 4000113) {
        Toast.fail('邀请码不正确')
      } else if (registerResponse.error.message === common.badNet) {
        Toast.fail('网络连接失败，请稍后重试')
      } else {
        Toast.fail('注册失败，请重试')
      }
    }
  }

  renderAccount = () => {
    const { mobile } = this.props
    return (
      <TKInputItem
        titleStyle={{
          width: common.h80,
        }}
        title="账号"
        placeholder="请输入11位手机号"
        value={mobile}
        maxLength={11}
        onChange={e => this.onChange(e, 'mobile')}
      />
    )
  }

  renderCheckCode = () => {
    const { code, mobile } = this.props
    return (
      <TKInputItemCheckCode
        titleStyle={{
          width: common.h80,
        }}
        title="验证码"
        placeholder="获取验证码"
        value={code}
        maxLength={common.textInputMaxLenPwd}
        onChange={e => this.onChange(e, 'code')}
        onPressCheckCodeBtn={() => { this.codePress() }}
        extraDisable={!mobile}
      />
    )
  }

  renderErrorTip = (tip) => {
    const hasTip = (
      (tip && !common.regPassword.test(tip)) ||
      (tip && !common.regSpace.test(tip))
    )
    const tipView = hasTip && (
      <Text
        style={{
          color: common.redColor,
          fontSize: common.font12,
        }}
      >
        {common.regPasswordMsg}
      </Text>
    )
    return (
      <View style={{
        alignItems: 'flex-end',
        height: common.w40,
      }}
      >
        <View>
          <Text style={{ paddingTop: common.margin5 }}>
            {tipView}
          </Text>
        </View>
      </View>
    )
  }

  renderPwdErrorTip = () => {
    const { password } = this.props
    return this.renderErrorTip(password)
  }

  renderPassword = () => {
    const { password } = this.props
    return (
      <TKInputItem
        titleStyle={{
          width: common.h80,
        }}
        title="密码"
        placeholder="请输入密码"
        value={password}
        maxLength={common.textInputMaxLenPwd}
        secureTextEntry
        onChange={e => this.onChange(e, 'password')}
      />
    )
  }

  renderConfirmPwd = () => {
    const { passwordAgain } = this.props
    return (
      <TKInputItem
        titleStyle={{
          width: common.h80,
        }}
        title="再次确认密码"
        placeholder="请再次输入密码"
        value={passwordAgain}
        maxLength={common.textInputMaxLenPwd}
        secureTextEntry
        onChange={e => this.onChange(e, 'passwordAgain')}
      />
    )
  }

  renderRecommendNo = () => {
    const { recommendNo } = this.props
    return (
      <TKInputItem
        titleStyle={{
          width: common.h80,
        }}
        title="邀请码"
        placeholder="选填"
        value={recommendNo}
        maxLength={common.textInputMaxLenPwd}
        onChange={e => this.onChange(e, 'recommendNo')}
      />
    )
  }

  renderExtraBtns = () => {
    const { navigation } = this.props

    return (
      <View
        style={{
          marginTop: common.margin10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flexDirection: 'row' }} >
          <Text
            style={{
              alignSelf: 'center',
              color: common.textColor,
              fontSize: common.font12,
            }}
          >注册即同意</Text>
          <TKButton
            theme={'small'}
            caption={'《用户协议》'}
            onPress={() => navigation.navigate('Agreement')}
          />
        </View>
        <TKButton
          theme={'small'}
          caption={'已有账号？去登录'}
          onPress={() => navigation.goBack()}
        />
      </View>
    )
  }

  render() {
    this.handleGetVerificateCodeRequest()
    this.handleRegisterRequest()

    const {
      registerVisible,
    } = this.props

    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: common.bgColor,
        }}
        behavior="padding"
      >
        <ScrollView
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ marginHorizontal: common.margin38, marginTop: common.margin110 }}>
            {this.renderAccount()}

            <View style={{ height: 40 }} />

            {this.renderCheckCode()}

            <View style={{ height: 40 }} />

            {this.renderPassword()}

            {this.renderPwdErrorTip()}

            {this.renderConfirmPwd()}

            <View style={{ height: 40 }} />

            {this.renderRecommendNo()}

            {this.renderExtraBtns()}

            <View style={{ height: 40 }} />
          </View>

          <TKButton
            theme="yellow"
            caption={'注册'}
            disabled={registerVisible}
            onPress={() => this.registerPress()}
          />

        </ScrollView>

        <Spinner
          style={{
            position: 'absolute',
            alignSelf: 'center',
            marginTop: common.sh / 2 - common.h50 / 2,
          }}
          isVisible={registerVisible}
          size={common.h50}
          type={'Wave'}
          color={common.btnTextColor}
        />
      </KeyboardAvoidingView>
    )
  }
}

function mapStateToProps(store) {
  return {
    mobile: store.user.mobileRegister,
    code: store.user.codeRegister,
    password: store.user.passwordRegister,
    passwordAgain: store.user.passwordAgainRegister,
    recommendNo: store.user.recommendNo,

    registerVisible: store.user.registerVisible,
    registerResponse: store.user.registerResponse,

    getVerificateCodeVisible: store.user.getVerificateCodeVisible,
    getVerificateCodeResponse: store.user.getVerificateCodeResponse,
  }
}

export default connect(
  mapStateToProps,
)(Register)
