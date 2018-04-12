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
  loginUpdate,
  loginRequest,
} from '../../actions/login'
import {
  common,
  storeSave,
} from '../common'
import TextInputLogin from './TextInputLogin'
import BtnLogin from './BtnLogin'

class Login extends Component {
  constructor() {
    super()
    this.showLoginResponse = false

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
    const { dispatch, mobile, password } = this.props

    if (tag === 'mobile') {
      dispatch(loginUpdate(text, password))
    } else if (tag === 'password') {
      dispatch(loginUpdate(mobile, text))
    }
  }

  loginPress() {
    const { dispatch, mobile, password } = this.props
    if (!mobile.length) {
      this.showAlert('请输入账号', 'warning')
      return
    }
    if (!password.length) {
      this.showAlert('请输入密码', 'warning')
      return
    }
    if (!common.reg.test(mobile)) {
      this.showAlert('请输入正确的手机号', 'warning')
      return
    }

    dispatch(loginRequest({
      mobile,
      password,
    }))
  }

  /* 请求结果处理 */
  handleLoginRequest() {
    const { isVisible, loginResponse, screenProps, navigation } = this.props
    if (!isVisible && !this.showLoginResponse) return

    if (isVisible) {
      this.showLoginResponse = true
    } else {
      this.showLoginResponse = false
      if (loginResponse.success) {
        this.showAlert('登录成功', 'success')
        storeSave(common.user, loginResponse.result, (error) => {
          if (error) {
            this.showAlert('用户保存失败', 'error')
          } else {
            navigation.state.params.dismissBlock()
            screenProps.dismiss()
          }
        })
      } else {
        this.showAlert((loginResponse.error.code === 4000114 ?
          '密码不正确' :
          loginResponse.error.message), 'error')
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
    this.handleLoginRequest()

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
            onChange={e => this.onChange(e, 'mobile')}
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
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

function mapStateToProps(state) {
  return {
    mobile: state.login.mobile,
    password: state.login.password,

    isVisible: state.login.isVisible,
    loginResponse: state.login.loginResponse,
  }
}

export default connect(
  mapStateToProps,
)(Login)
