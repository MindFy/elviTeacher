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
import Spinner from 'react-native-spinkit'
import {
  resetPasswordUpdate,
  resetPasswordRequest,
} from '../../actions/login'
import { common } from '../common'
import TextInputLogin from './TextInputLogin'
import BtnLogin from './BtnLogin'

class ConfirmPwd extends Component {
  constructor() {
    super()
    this.showResetPasswordResponse = false

    this.msgBar = undefined
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
      case 'password':
        dispatch(resetPasswordUpdate(mobile, code, text, passwordAgain))
        break
      case 'passwordAgain':
        dispatch(resetPasswordUpdate(mobile, code, password, text))
        break
      default:
        break
    }
  }

  confirmPress() {
    const { dispatch, mobile, code, password, passwordAgain } = this.props

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
    if (password.length < 6) {
      this.showAlert('密码至少为6位', 'warning')
      return
    }
    dispatch(resetPasswordRequest({
      mobile,
      code,
      newpassword: password,
    }))
  }

  /* 请求结果处理 */
  HandleResetPasswordRequest() {
    const { isVisible, resetPasswordResponse } = this.props
    if (!isVisible && !this.showResetPasswordResponse) return

    if (isVisible) {
      this.showResetPasswordResponse = true
    } else {
      this.showResetPasswordResponse = false
      if (resetPasswordResponse.success) {
        this.showAlert(resetPasswordResponse.result.message, 'success')
      } else {
        this.showAlert(resetPasswordResponse.error.message, 'error')
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

  render() {
    this.HandleResetPasswordRequest()

    const { isVisible, password, passwordAgain } = this.props
    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: common.bgColor,
        }}
        behavior="padding"
      >
        <ScrollView>
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
            title="密码"
            placeholder="请输入密码"
            value={password}
            maxLength={10}
            onChange={e => this.onChange(e, 'password')}
          />

          <TextInputLogin
            textStyle={{
              width: common.w100,
            }}
            title="再次输入新密码"
            placeholder="请再次输入新密码"
            value={passwordAgain}
            maxLength={10}
            onChange={e => this.onChange(e, 'passwordAgain')}
          />

          <BtnLogin
            viewStyle={{
              marginTop: common.margin210,
            }}
            title="确定"
            onPress={() => this.confirmPress()}
          />
        </ScrollView>

        <Spinner
          style={{
            position: 'absolute',
            alignSelf: 'center',
            marginTop: common.sh / 2 - common.h50 / 2,
          }}
          isVisible={isVisible}
          size={common.h50}
          type={'Wave'}
          color={common.btnTextColor}
        />
        <MessageBar
          ref={(e) => {
            this.msgBar = e
          }}
        />
      </KeyboardAvoidingView>
    )
  }
}

function mapStateToProps(state) {
  return {
    mobile: state.resetPassword.mobile,
    code: state.resetPassword.code,
    password: state.resetPassword.password,
    passwordAgain: state.resetPassword.passwordAgain,

    isVisible: state.resetPassword.isVisible,
    resetPasswordResponse: state.resetPassword.resetPasswordResponse,
  }
}

export default connect(
  mapStateToProps,
)(ConfirmPwd)
