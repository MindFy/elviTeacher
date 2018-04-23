import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native'
import Toast from 'teaset/components/Toast/Toast'
import Spinner from 'react-native-spinkit'
import { common } from '../../constants/common'
import TextInputLogin from './TextInputLogin'
import BtnLogin from './BtnLogin'
import actions from '../../actions/index'

class ConfirmPwd extends Component {
  constructor() {
    super()
    this.showResetPasswordResponse = false
  }

  componentWillUnmount() {
    const { dispatch, mobile, code } = this.props
    dispatch(actions.registerUpdate({
      mobile,
      code,
      password: '',
      passwordAgain: '',
    }))
  }

  onChange(event, tag) {
    const { text } = event.nativeEvent
    const { dispatch, mobile, code, password, passwordAgain } = this.props

    switch (tag) {
      case 'password':
        dispatch(actions.registerUpdate({ mobile, code, password: text, passwordAgain }))
        break
      case 'passwordAgain':
        dispatch(actions.registerUpdate({ mobile, code, password, passwordAgain: text }))
        break
      default:
        break
    }
  }

  confirmPress() {
    const { dispatch, mobile, code, password, passwordAgain } = this.props
    if (!password.length) {
      Toast.message('请设置密码')
      return
    }
    if (!passwordAgain.length) {
      Toast.message('请再次设置密码')
      return
    }
    if (password !== passwordAgain) {
      Toast.message('两次密码输入不一致')
      return
    }
    if (password.length < 6) {
      Toast.message('密码至少为6位')
      return
    }
    dispatch(actions.resetPassword({
      mobile,
      code,
      newpassword: password,
    }))
  }

  HandleResetPasswordRequest() {
    const { resetPasswordVisible, resetPasswordResponse, navigation } = this.props
    if (!resetPasswordVisible && !this.showResetPasswordResponse) return

    if (resetPasswordVisible) {
      this.showResetPasswordResponse = true
    } else {
      this.showResetPasswordResponse = false
      if (resetPasswordResponse.success) {
        Toast.success('重置密码成功')
        navigation.goBack('Login')
      } else {
        Toast.fail(resetPasswordResponse.error.message)
      }
    }
  }

  render() {
    this.HandleResetPasswordRequest()

    const { password, passwordAgain, resetPasswordVisible } = this.props
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
            maxLength={common.textInputMaxLenPwd}
            onChange={e => this.onChange(e, 'password')}
          />

          <TextInputLogin
            textStyle={{
              width: common.w100,
            }}
            title="再次输入新密码"
            placeholder="请再次输入新密码"
            value={passwordAgain}
            maxLength={common.textInputMaxLenPwd}
            onChange={e => this.onChange(e, 'passwordAgain')}
          />

          <BtnLogin
            viewStyle={{
              marginTop: common.margin210,
            }}
            title="确定"
            onPress={() => this.confirmPress()}
            disabled={resetPasswordVisible}
          />
        </ScrollView>

        <Spinner
          style={{
            position: 'absolute',
            alignSelf: 'center',
            marginTop: common.sh / 2 - common.h50 / 2,
          }}
          isVisible={resetPasswordVisible}
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

    resetPasswordVisible: store.user.resetPasswordVisible,
    resetPasswordResponse: store.user.resetPasswordResponse,
  }
}

export default connect(
  mapStateToProps,
)(ConfirmPwd)
