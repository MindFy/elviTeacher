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
    const { dispatch, user } = this.props

    if (tag === 1) {
      dispatch(updateUser(text, user.password))
    } else if (tag === 0) {
      dispatch(updateUser(user.username, text))
    }
  }

  loginPress() {
    const { dispatch, user } = this.props
    if (!user.username.length || !user.password.length) {
      MessageBarManager.showAlert({
        message: '请检查用户名和密码',
        alertType: 'warning',
        duration: 1500,
        messageStyle: {
          marginTop: common.margin10,
          alignSelf: 'center',
          color: 'white',
          fontSize: common.font14,
        },
      })
      return
    }
    dispatch(loginRequest({
      username: user.username,
      password: user.password,
    }))
  }

  /* 登录请求结果处理 */
  loginRequestResult() {
    const { user } = this.props
    if (!user.isVisible && !this.needShowAlert) return
    if (user.isVisible) {
      this.needShowAlert = true
    } else {
      this.needShowAlert = false
    }
    switch (user.loginStatus) {
      case 0:
        break
      case 1:
        MessageBarManager.showAlert({
          message: '登录成功',
          alertType: 'success',
          duration: 1500,
          messageStyle: {
            marginTop: common.margin10,
            alignSelf: 'center',
            color: 'white',
            fontSize: common.font14,
          },
        })
        this.props.screenProps.dismiss()
        break
      case -1:
        MessageBarManager.showAlert({
          message: '登录失败',
          alertType: 'error',
          duration: 1500,
          messageStyle: {
            marginTop: common.margin10,
            alignSelf: 'center',
            color: 'white',
            fontSize: common.font14,
          },
        })
        break
      default:
        break
    }
  }

  render() {
    this.loginRequestResult()

    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: common.bgColor,
        }}
        behavior="padding"
      >
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
          isVisible={this.props.user.isVisible}
          size={common.h50}
          type={'Wave'}
          color={common.btnTextColor}
        />
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
            onChange={e => this.onChange(e, 1)}
          />

          <TextInputLogin
            title="密码"
            placeholder="请输入密码"
            onChange={e => this.onChange(e, 0)}
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
              onPress={() => this.props.navigation.navigate('Registration')}
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
              onPress={() => this.props.navigation.navigate('ForgotPwd')}
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
          />
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(
  mapStateToProps,
)(Login)
