import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native'
import Toast from 'teaset/components/Toast/Toast'
import Spinner from 'react-native-spinkit'
import {
  common,
  storeSave,
} from '../../constants/common'
import TextInputLogin from './TextInputLogin'
import BtnLogin from './BtnLogin'
import actions from '../../actions/index'
import schemas from '../../schemas/index'
import ws from '../../websocket/ws'

class Login extends Component {
  constructor() {
    super()
    this.showLoginResponse = false
  }

  onChange(event, tag) {
    const { text } = event.nativeEvent
    const { dispatch, mobile, password } = this.props

    if (tag === 'mobile') {
      dispatch(actions.loginUpdate({ mobile: text, password: text.length ? password : '' }))
    } else if (tag === 'password') {
      dispatch(actions.loginUpdate({ mobile, password: text }))
    }
  }

  loginPress() {
    const { dispatch, mobile, password } = this.props
    if (!mobile.length) {
      Toast.message('请输入账号')
      return
    }
    if (!password.length) {
      Toast.message('请输入密码')
      return
    }
    if (!common.regMobile.test(mobile)) {
      Toast.message(common.regMobileMsg)
      return
    }

    dispatch(actions.login({
      mobile,
      password,
    }))
  }

  handleLoginRequest() {
    const { dispatch, loginVisible, loginResponse, screenProps, homeRoseSelected } = this.props
    if (!loginVisible && !this.showLoginResponse) return

    if (loginVisible) {
      this.showLoginResponse = true
    } else {
      this.showLoginResponse = false
      if (loginResponse.success) {
        Toast.success('登录成功')
        const user = loginResponse.result
        storeSave(common.user, user, (error) => {
          if (!error) {
            dispatch(actions.findUser(schemas.findUser(user.id)))
            dispatch(actions.findAssetList(schemas.findAssetList(user.id)))
            if (homeRoseSelected) {
              ws.onopen(homeRoseSelected.goods.id, homeRoseSelected.currency.id, user)
            }
            screenProps.dismiss()
          }
        })
      } else if (loginResponse.error.code === 4000114) {
        Toast.fail('手机号不正确')
      } else if (loginResponse.error.code === 4000115) {
        Toast.fail('密码不正确')
      } else if (loginResponse.error.code === 4000116) {
        Toast.fail('手机号码未注册')
      } else if (loginResponse.error.code === 4000117) {
        Toast.fail('账号或密码错误')
      } else if (loginResponse.error.message === common.badNet) {
        Toast.fail('网络连接失败，请稍后重试')
      } else {
        Toast.fail('登录失败，请重试')
      }
    }
  }

  render() {
    this.handleLoginRequest()

    const { loginVisible, navigation, mobile, password, screenProps } = this.props
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
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: common.margin40,
              left: common.margin20,
              width: common.w40,
              height: common.h20,
              justifyContent: 'center',
            }}
            activeOpacity={common.activeOpacity}
            onPress={() => screenProps.dismiss()}
          >
            <Text
              style={{
                color: 'white',
                fontSize: common.font14,
                alignSelf: 'center',
              }}
            >返回</Text>
          </TouchableOpacity>

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
            value={mobile}
            maxLength={11}
            onChange={e => this.onChange(e, 'mobile')}
          />

          <TextInputLogin
            textInputStyle={{
              width: '80%',
            }}
            title="密码"
            placeholder={'请输入密码'}
            secureTextEntry
            value={password}
            maxLength={common.textInputMaxLenPwd}
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
                  fontSize: common.font12,
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
                  fontSize: common.font12,
                }}
              >忘记密码？</Text>
            </TouchableOpacity>
          </View>

          <BtnLogin
            title="登录"
            onPress={() => this.loginPress()}
            disabled={loginVisible}
          />
        </ScrollView>

        <Spinner
          style={{
            position: 'absolute',
            alignSelf: 'center',
            marginTop: common.sh / 2 - common.h50 / 2,
          }}
          isVisible={loginVisible}
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
    mobile: store.user.mobileLogin,
    password: store.user.passwordLogin,

    loginVisible: store.user.loginVisible,
    loginResponse: store.user.loginResponse,

    homeRoseSelected: store.dealstat.homeRoseSelected,
  }
}

export default connect(
  mapStateToProps,
)(Login)
