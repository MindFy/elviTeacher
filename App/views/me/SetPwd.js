import React, { Component } from 'react'
import {
  View,
  StatusBar,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native'
import { common, styles } from '../common'
import Navigator from '../Navigator'

export default class SetPwd extends Component {
  componentDidMount() { }
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: common.bgColor,
        }} >
        <StatusBar
          barStyle={'light-content'}
        />
        <Navigator
          headerTitle="修改密码"
          leftImagePress={() => this.props.navigation.goBack()}
        />
        <ScrollView>

          <View
            style={{
              marginTop: common.margin10,
              marginLeft: common.margin10,
              marginRight: common.margin10,
              height: common.h40,
              backgroundColor: common.navBgColor,
              borderColor: common.borderColor,
              borderWidth: 1,
              borderRadius: 1,
              justifyContent: 'center',
            }} >
            <TextInput
              style={{
                marginLeft: common.margin10,
                fontSize: common.font14,
              }}
              placeholder={'旧密码'}
              placeholderTextColor={common.placeholderColor}
            />
          </View>

          <View
            style={{
              marginTop: common.margin10,
              marginLeft: common.margin10,
              marginRight: common.margin10,
              height: common.h40,
              backgroundColor: common.navBgColor,
              borderColor: common.borderColor,
              borderWidth: 1,
              borderRadius: 1,
              justifyContent: 'center',
            }} >
            <TextInput
              style={{
                marginLeft: common.margin10,
                fontSize: common.font14,
              }}
              placeholder={'输入密码'}
              placeholderTextColor={common.placeholderColor}
            />
          </View>

          <View
            style={{
              marginTop: common.margin10,
              marginLeft: common.margin10,
              marginRight: common.margin10,
              height: common.h40,
              backgroundColor: common.navBgColor,
              borderColor: common.borderColor,
              borderWidth: 1,
              borderRadius: 1,
              justifyContent: 'center',
            }} >
            <TextInput
              style={{
                marginLeft: common.margin10,
                fontSize: common.font14,
              }}
              placeholder={'再次输入密码'}
              placeholderTextColor={common.placeholderColor}
            />
          </View>

          <TouchableOpacity
            activeOpacity={common.activeOpacity}
          >
            <View
              style={{
                marginTop: common.margin40,
                marginLeft: common.margin10,
                marginRight: common.margin10,
                height: common.h40,
                backgroundColor: common.navBgColor,
                justifyContent: 'center',
                borderRadius: 1,
              }} >
              <Text
                style={{
                  color: common.btnTextColor,
                  fontSize: common.font16,
                  textAlign: 'center',
                }} >确认</Text>
            </View>
          </TouchableOpacity>

        </ScrollView>
      </View>
    )
  }
}
