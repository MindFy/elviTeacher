import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
} from 'react-native'
import {
  MessageBar,
  MessageBarManager,
} from 'react-native-message-bar'
import Spinner from 'react-native-spinkit'
import {
  updateUser,
  loginRequest,
} from './actions'
import { common } from '../common'
import TextInputLogin from './TextInputLogin'
import BtnLogin from './BtnLogin'

class Login extends Component {
  constructor() {
    super()
    // 组件渲染时，是否需要显示成功/失败提示
    this.needShowAlert = false

    // binds
    this.loginPress = this.loginPress.bind(this)

    // refs
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
    const { dispatch, username, password } = this.props

    if (tag === 'username') {
      dispatch(updateUser(text, password))
    } else if (tag === 'password') {
      dispatch(updateUser(username, text))
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

  loginPress() {
    const { dispatch, username, password } = this.props
    if (!username.length) {
      this.showAlert('请输入账号', 'warning')
      return
    }
    if (!password.length) {
      this.showAlert('请输入密码', 'warning')
      return
    }
    if (!common.reg.test(username)) {
      this.showAlert('请输入正确的手机号', 'warning')
      return
    }

    dispatch(loginRequest({
      username,
      password,
    }))
  }

  /* 登录请求结果处理 */
  loginRequestResult() {
    const { isVisible, loginStatus, screenProps, loginResult } = this.props
    if (!isVisible && !this.needShowAlert) return
    if (isVisible) {
      this.needShowAlert = true
    } else {
      this.needShowAlert = false
      switch (loginStatus) {
        case 0:
          break
        case 1:
          this.showAlert('登录成功', 'success')
          // screenProps.dismiss()
          break
        case -1:
          this.showAlert((loginResult.code === 4000114 ?
            '密码不正确' :
            loginResult.message), 'error')
          break
        default:
          break
      }
    }
  }

  render() {
    this.loginRequestResult()
    const { isVisible, navigation } = this.props
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

          <Image
            style={{
              marginTop: common.margin127,
              width: common.w150,
              height: common.h80,
              alignSelf: 'center',
            }}
            source={require('../../assets/Logo11.png')}
            resizeMode={'contain'}
          />

          <TextInputLogin
            viewStyle={{
              marginTop: common.margin60,
            }}
            title="账号"
            placeholder="请输入11位手机号"
            maxLength={11}
            onChange={e => this.onChange(e, 'username')}
          />

          <TextInputLogin
            title="密码"
            placeholder="请输入密码"
            maxLength={10}
            onChange={e => this.onChange(e, 'password')}
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
            <TouchableOpacity
              activeOpacity={common.activeOpacity}
              onPress={() => navigation.navigate('Register')}
            >
              <Text
                style={{
                  color: common.btnTextColor,
                  fontSize: common.font10,
                }}
              >新用户注册</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={common.activeOpacity}
              onPress={() => navigation.navigate('ForgotPwd')}
            >
              <Text
                style={{
                  color: common.btnTextColor,
                  fontSize: common.font10,
                }}
              >忘记密码？</Text>
            </TouchableOpacity>
          </View>

          <BtnLogin
            title="登录"
            onPress={this.loginPress}
            disabled={isVisible}
          />
        </ScrollView>
      </KeyboardAvoidingView>

    )
  }
}

function mapStateToProps(state) {
  return {
    username: state.login.username,
    password: state.login.password,
    loginStatus: state.login.loginStatus,
    isVisible: state.login.isVisible,
    loginResult: state.login.loginResult,
  }
}

export default connect(
  mapStateToProps,
)(Login)
