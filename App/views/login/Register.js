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
import {
  MessageBar,
  MessageBarManager,
} from 'react-native-message-bar'
import Spinner from 'react-native-spinkit'
import {
  registerUpdate,
  registerRequest,
  getVerificateCode,
} from './actions'
import { common } from '../common'
import TextInputLogin from './TextInputLogin'
import TextInputCode from './TextInputCode'
import BtnLogin from './BtnLogin'

class Register extends Component {
  constructor() {
    super()
    this.needShowAlert = false
    this.getCodeShowAlert = false

    this.msgBar = undefined

    this.codePress = this.codePress.bind(this)
  }

  componentDidMount() {
    MessageBarManager.registerMessageBar(this.msgBar)
  }

  componentWillUnmount() {
    MessageBarManager.unregisterMessageBar()
  }

  onChange(event, tag) {
    const { text } = event.nativeEvent
    const { dispatch, mobile, code, password, passwordAgain } = this.props

    switch (tag) {
      case 'mobile':
        dispatch(registerUpdate(text, code, password, passwordAgain))
        break
      case 'code':
        dispatch(registerUpdate(mobile, text, password, passwordAgain))
        break
      case 'password':
        dispatch(registerUpdate(mobile, code, text, passwordAgain))
        break
      case 'passwordAgain':
        dispatch(registerUpdate(mobile, code, password, text))
        break
      default:
        break
    }
  }

  /* 发送验证码结果处理 */
  getCodeResult() {
    const { getCodeVisible, getCodeStatus, getCodeResult } = this.props

    if (!getCodeVisible && !this.getCodeShowAlert) return
    if (getCodeVisible) {
      this.getCodeShowAlert = true
    } else {
      this.getCodeShowAlert = false
      switch (getCodeStatus) {
        case 0:
          break
        case 1:
          this.showAlert(getCodeResult.message, 'success')
          break
        case -1:
          this.showAlert(getCodeResult.message, 'error')
          break
        default:
          break
      }
    }
  }

  showAlert(message, alertType) {
    MessageBarManager.showAlert({
      message,
      alertType,
      duration: common.messageBarDur,
      messageStyle: {
        marginTop: common.margin10,
        alignSelf: 'center',
        color: 'white',
        fontSize: common.font14,
      },
    })
  }

  codePress(count) {
    const { dispatch, mobile } = this.props
    if (!common.reg.test(mobile)) {
      this.showAlert('请输入正确的手机号', 'warning')
      return
    }
    count()
    dispatch(getVerificateCode({
      mobile,
      service: 'register',
    }))
  }

  registerPress() {
    const { dispatch, mobile, code, password, passwordAgain } = this.props
    if (!mobile.length) {
      this.showAlert('请输入手机号', 'warning')
      return
    }
    if (!password.length) {
      this.showAlert('请设置密码', 'warning')
      return
    }
    if (!passwordAgain.length) {
      this.showAlert('请再次设置密码', 'warning')
      return
    }
    if (password !== passwordAgain) {
      this.showAlert('两次密码输入不一致', 'warning')
      return
    }
    if (!common.reg.test(mobile)) {
      this.showAlert('请输入正确的手机号', 'warning')
      return
    }
    if (password.length < 6) {
      this.showAlert('密码至少为6位', 'warning')
      return
    }
    dispatch(registerRequest({
      mobile,
      code,
      password,
    }))
  }

  /* 注册请求结果处理 */
  registerRequestResult() {
    const { isVisible, requestStatus, registerResult, navigation } = this.props

    if (!isVisible && !this.needShowAlert) return
    if (isVisible) {
      this.needShowAlert = true
    } else {
      this.needShowAlert = false
      switch (requestStatus) {
        case 0:
          break
        case 1:
          this.showAlert('注册成功', 'success')
          setTimeout(() => {
            navigation.goBack()
          }, common.messageBarDur)
          break
        case -1:
          this.showAlert(registerResult.message, 'error')
          break
        default:
          break
      }
    }
  }

  render() {
    this.registerRequestResult()
    this.getCodeResult()

    const { navigation, isVisible } = this.props
    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: common.bgColor,
        }}
        behavior="padding"
      >
        <ScrollView >
          <StatusBar
            barStyle={'light-content'}
          />
          <MessageBar
            ref={(e) => {
              this.msgBar = e
            }}
          />
          <Spinner
            style={{
              position: 'absolute',
              alignSelf: 'center',
              marginTop: common.sh / 2 - common.h50 / 2,
              zIndex: 20,
            }}
            isVisible={isVisible}
            size={common.h50}
            type={'Wave'}
            color={common.btnTextColor}
          />

          <TextInputLogin
            viewStyle={{
              marginTop: common.margin110,
            }}
            textStyle={{
              width: common.w100,
            }}
            title="账号"
            placeholder="请输入11位手机号"
            keyboardType="phone-pad"
            maxLength={11}
            onChange={e => this.onChange(e, 'mobile')}
          />

          <TextInputCode
            keyboardType="number-pad"
            maxLength={6}
            codePress={this.codePress}
            onChange={e => this.onChange(e, 'code')}
          />

          <TextInputLogin
            textStyle={{
              width: common.w100,
            }}
            title="密码"
            placeholder="请输入密码"
            maxLength={10}
            onChange={e => this.onChange(e, 'password')}
          />

          <TextInputLogin
            textStyle={{
              width: common.w100,
            }}
            title="再次确认密码"
            placeholder="请再次输入密码"
            maxLength={10}
            onChange={e => this.onChange(e, 'passwordAgain')}
          />

          <View
            style={{
              marginTop: common.margin10,
              marginLeft: common.margin38,
              marginRight: common.margin38,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
              }}
            >
              <Text
                style={{
                  alignSelf: 'center',
                  color: common.textColor,
                  fontSize: common.font10,
                }}
              >注册即同意</Text>
              <TouchableOpacity
                activeOpacity={common.activeOpacity}
                onPress={() => { }}
              >
                <Text
                  style={{
                    color: common.btnTextColor,
                    fontSize: common.font10,
                  }}
                >《xxx服务协议》</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              activeOpacity={common.activeOpacity}
              onPress={() => navigation.goBack()}
            >
              <Text
                style={{
                  color: common.btnTextColor,
                  fontSize: common.font10,
                }}
              >已有账号？去登录</Text>
            </TouchableOpacity>
          </View>

          <BtnLogin
            viewStyle={{
              marginTop: common.margin40,
            }}
            title="注册"
            onPress={() => this.registerPress()}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

function mapStateToProps(state) {
  return {
    mobile: state.register.mobile,
    code: state.register.code,
    password: state.register.password,
    passwordAgain: state.register.passwordAgain,
    requestStatus: state.register.requestStatus,
    isVisible: state.register.isVisible,
    registerResult: state.register.registerResult,
    getCodeVisible: state.register.getCodeVisible,
    getCodeStatus: state.register.getCodeStatus,
    getCodeResult: state.register.getCodeResult,
  }
}

export default connect(
  mapStateToProps,
)(Register)
