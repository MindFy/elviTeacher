import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native'
import {
  MessageBar,
  MessageBarManager,
} from 'react-native-message-bar'
import {
  getVerificateCode,
  resetPasswordUpdate,
} from './actions'
import { common } from '../common'
import TextInputLogin from './TextInputLogin'
import TextInputCode from './TextInputCode'
import BtnLogin from './BtnLogin'

class ForgotPwd extends Component {
  constructor() {
    super()
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
    const { dispatch, mobile, code } = this.props

    switch (tag) {
      case 'mobile':
        dispatch(resetPasswordUpdate(text, code))
        break
      case 'code':
        dispatch(resetPasswordUpdate(mobile, text))
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
      service: 'reset',
    }))
  }

  nextPress() {
    const { navigation, mobile, code } = this.props
    if (!mobile.length) {
      this.showAlert('请输入手机号', 'warning')
      return
    }
    if (!code.length) {
      this.showAlert('请输入验证码', 'warning')
      return
    }
    if (!common.reg.test(mobile)) {
      this.showAlert('请输入正确的手机号', 'warning')
      return
    }
    if (code !== '1234') {
      this.showAlert('验证码不正确', 'error')
      return
    }
    navigation.navigate('ConfirmPwd')
  }

  render() {
    this.getCodeResult()
    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: common.bgColor,
        }}
        behavior="padding"
      >
        <ScrollView>
          <MessageBar
            ref={(e) => {
              this.msgBar = e
            }}
          />
          <StatusBar
            barStyle={'light-content'}
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

          <BtnLogin
            viewStyle={{
              marginTop: common.margin210,
            }}
            title="下一步"
            onPress={() => this.nextPress()}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

function mapStateToProps(state) {
  return {
    mobile: state.resetPassword.mobile,
    code: state.resetPassword.code,
    getCodeVisible: state.resetPassword.getCodeVisible,
    getCodeStatus: state.resetPassword.getCodeStatus,
    getCodeResult: state.resetPassword.getCodeResult,
  }
}

export default connect(
  mapStateToProps,
)(ForgotPwd)
