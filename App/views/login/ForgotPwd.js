import React, { Component } from 'react'
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native'
import { common, styles } from '../common'

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
              justifyContent: 'center',
              marginRight: common.margin10,
            }}>
            <TouchableOpacity
              activeOpacity={common.activeOpacity} >
              <Text
                style={{
                  color: common.btnTextColor,
                  textAlign: 'center',
                  fontSize: common.font12,
                }} >获取验证码</Text>
            </TouchableOpacity>
          </View>
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
            onPress={() => this.nextPress()}
          >
            <Text
              style={{
                fontSize: common.font16,
                color: 'white',
                textAlign: 'center',
              }}
            >下一步</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}
