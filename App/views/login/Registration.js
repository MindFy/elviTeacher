import React, { Component } from 'react'
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native'
import { common } from '../common'

export default class Registration extends Component {
  componentDidMount() { }
  registrationBtnPress() {

  }
  backToLogin() {
    this.props.navigation.goBack()
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

        <View
          style={{
            marginTop: common.margin110,
            marginLeft: common.margin38,
            marginRight: common.margin38,
            height: common.h35,
            backgroundColor: common.navBgColor,
            borderColor: common.borderColor,
            borderWidth: 1,
            borderRadius: 1,
            flexDirection: 'row',
          }}
        >
          <Text
            style={{
              width: common.w100,
              marginLeft: common.margin10,
              color: common.textColor,
              fontSize: common.font12,
              alignSelf: 'center',
            }}
          >账号</Text>
          <TextInput
            style={{
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
                width: common.w100,
                marginLeft: common.margin10,
                fontSize: common.font12,
                color: common.textColor,
                alignSelf: 'center',
              }}
            >验证码</Text>
            <TextInput
              style={{
                fontSize: common.font12,
                color: 'white',
              }}
              placeholder="请输入短信验证码"
              placeholderTextColor={common.placeholderColor}
            />
          </View>
          <View
            style={{
              marginRight: common.margin10,
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity
              activeOpacity={common.activeOpacity}
            >
              <Text
                style={{
                  color: common.btnTextColor,
                  fontSize: common.font12,
                  textAlign: 'center',
                }}
              >获取验证码</Text>
            </TouchableOpacity>
          </View>
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
              width: common.w100,
              marginLeft: common.margin10,
              fontSize: common.font12,
              color: common.textColor,
              alignSelf: 'center',
            }}
          >密码</Text>
          <TextInput
            style={{
              fontSize: common.font12,
              color: 'white',
            }}
            placeholder="请输入密码"
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
              width: common.w100,
              marginLeft: common.margin10,
              fontSize: common.font12,
              color: common.textColor,
              alignSelf: 'center',
            }}
          >再次确认密码</Text>
          <TextInput
            style={{
              fontSize: common.font12,
              color: 'white',
            }}
            placeholder="请再次输入密码"
            placeholderTextColor={common.placeholderColor}
          />
        </View>

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
            onPress={() => this.backToLogin()}
          >
            <Text
              style={{
                color: common.btnTextColor,
                fontSize: common.font10,
              }}
            >已有账号？去登录</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: common.margin40,
            marginLeft: common.margin38,
            marginRight: common.margin38,
            height: common.h35,
            backgroundColor: common.loginBtnBgColor,
            justifyContent: 'center',
            borderRadius: 1,
          }}
        >
          <TouchableOpacity
            activeOpacity={common.activeOpacity}
            onPress={() => this.registrationBtnPress()}
          >
            <Text
              style={{
                fontSize: common.font16,
                color: 'white',
                textAlign: 'center',
              }}
            >注册</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}
