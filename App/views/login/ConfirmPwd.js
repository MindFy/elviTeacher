import React, { Component } from 'react'
import {
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native'
import { common } from '../common'
import TextInputLogin from './TextInputLogin'
import BtnLogin from './BtnLogin'

export default class ConfirmPwd extends Component {
  componentDidMount() { }
  render() {
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
          />

          <TextInputLogin
            textStyle={{
              width: common.w100,
            }}
            title="再次输入新密码"
            placeholder="请再次输入新密码"
          />

          <BtnLogin
            viewStyle={{
              marginTop: common.margin210,
            }}
            title="确定"
            onPress={() => this.props.navigation.goBack(null)}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}
