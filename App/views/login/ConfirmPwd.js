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

export default class ConfirmPwd extends Component {
  componentDidMount() { }
  confirmPress() {
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
          >再次输入新密码</Text>
          <TextInput
            style={{
              fontSize: common.font12,
              color: 'white',
            }}
            placeholder="请再次输入新密码"
            placeholderTextColor={common.placeholderColor}
          />
        </View>

        <View
          style={{
            marginTop: common.margin210,
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
            onPress={() => this.confirmPress()}
          >
            <Text
              style={{
                fontSize: common.font16,
                color: 'white',
                textAlign: 'center',
              }}
            >确定</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}
