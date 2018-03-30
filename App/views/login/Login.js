import React, { Component } from 'react'
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native'
import { common, styles } from '../common'

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
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: common.bgColor,
        }}
      >
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

        <View
          style={{
            marginTop: common.margin60,
            marginLeft: common.margin38,
            marginRight: common.margin38,
            height: common.h35,
            flexDirection: 'row',
            backgroundColor: common.navBgColor,
            borderColor: common.borderColor,
            borderRadius: 1,
            borderWidth: 1,
          }}
        >
          <Text
            style={{
              marginLeft: common.margin10,
              alignSelf: 'center',
              fontSize: common.font12,
              color: common.textColor,
            }}
          >账号</Text>
          <TextInput
            style={{
              marginLeft: common.margin30,
              marginRight: 0,
              fontSize: common.font12,
              color: 'white',
            }}
            placeholder="请输入11位手机号"
            placeholderTextColor={common.placeholderColor}
          />
        </View>

        <View
          style={{
            marginTop: common.margin40,
            marginLeft: common.margin38,
            marginRight: common.margin38,
            height: common.h35,
            backgroundColor: common.navBgColor,
            borderColor: common.borderColor,
            borderRadius: 1,
            borderWidth: 1,
            flexDirection: 'row',
          }}
        >
          <Text
            style={{
              marginLeft: common.margin10,
              fontSize: common.font12,
              color: common.textColor,
              alignSelf: 'center',
            }}
          >密码</Text>
          <TextInput
            style={{
              marginLeft: common.margin30,
              marginRight: 0,
              fontSize: common.font12,
              color: 'white',
            }}
            placeholder="请输入密码"
            placeholderTextColor={common.placeholderColor}
          />
        </View>

        <View
          style={{
            marginTop: common.margin10,
            marginLeft: common.margin35,
            marginRight: common.margin35,
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

        <View
          style={{
            marginTop: common.margin36,
            marginLeft: common.margin35,
            marginRight: common.margin35,
            height: common.h35,
            backgroundColor: common.loginBtnBgColor,
            borderRadius: 1,
            justifyContent: 'center',
          }}
        >
          <TouchableOpacity
            activeOpacity={common.activeOpacity}
            onPress={() => this.loginPress()}
          >
            <Text style={{
              fontSize: common.font16,
              color: 'white',
              textAlign: 'center',
            }}
            >登录</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}
