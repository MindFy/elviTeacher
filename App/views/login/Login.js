import React, { Component } from 'react'
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
} from 'react-native'
import { common } from '../common'
import TextInputLogin from './TextInputLogin'
import BtnLogin from './BtnLogin'

export default class Login extends Component {
  componentDidMount() { }
  registrationPress() {
    this.props.navigation.navigate('Registration')
  }
  pwdBtnPress() {
    this.props.navigation.navigate('ForgotPwd')
  }
  loginPress() {
    this.props.navigation.navigate('TabBar')
  }
  render() {
    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: common.bgColor,
        }}
        behavior='padding' >
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
            title='账号'
            placeholder="请输入11位手机号" />

          <TextInputLogin
            title='密码'
            placeholder="请输入密码dd" />

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
              onPress={() => this.registrationPress()}
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
              onPress={() => this.pwdBtnPress()}
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
          title='登录'
          onPress={() => this.loginPress()} />
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}
