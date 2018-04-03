import React, { Component } from 'react'
import {
  ScrollView,
  StatusBar,
} from 'react-native'
import { common } from '../common'
import TextInputLogin from './TextInputLogin'
import TextInputCode from './TextInputCode'
import BtnLogin from './BtnLogin'

export default class ForgotPwd extends Component {
  componentDidMount() { }
  nextPress() {
    this.props.navigation.navigate('ConfirmPwd')
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

        <BtnLogin
          viewStyle={{
            marginTop: common.margin210,
          }}
          title="下一步"
          onPress={() => this.nextPress()}
        />
      </ScrollView>
    )
  }
}
