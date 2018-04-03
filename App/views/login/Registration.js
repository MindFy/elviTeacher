import React, { Component } from 'react'
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native'
import { common } from '../common'
import TextInputLogin from './TextInputLogin'
import TextInputCode from './TextInputCode'
import BtnLogin from './BtnLogin'

export default class Registration extends Component {
  componentDidMount() { }
  registrationBtnPress() {

  }
  render() {
    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: common.bgColor,
        }}
        behavior="padding"
      >
        <ScrollView >
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
          />

          <TextInputCode />

          <TextInputLogin
            textStyle={{
              width: common.w100,
            }}
            title="密码"
            placeholder="请输入密码"
          />

          <TextInputLogin
            textStyle={{
              width: common.w100,
            }}
            title="再次确认密码"
            placeholder="请再次输入密码"
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
              onPress={() => this.props.navigation.goBack()}
            >
              <Text
                style={{
                  color: common.btnTextColor,
                  fontSize: common.font10,
                }}
              >已有账号？去登录</Text>
            </TouchableOpacity>
          </View>

          <BtnLogin
            viewStyle={{
              marginTop: common.margin40,
            }}
            title="注册"
            onPress={() => this.registrationBtnPress()}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}
