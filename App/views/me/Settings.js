import React, { Component } from 'react'
import {
  View,
  StatusBar,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native'
import { common } from '../common'
import Navigator from '../Navigator'

export default class Settings extends Component {
  componentDidMount() { }
  changePwd() {
    this.props.navigation.navigate('SetPwd')
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: common.bgColor,
        }}
      >
        <StatusBar
          barStyle={'light-content'}
        />
        <Navigator
          headerTitle="设置"
          leftImagePress={() => this.props.navigation.goBack()}
        />
        <ScrollView >
          <TouchableOpacity
            activeOpacity={common.activeOpacity}
            onPress={() => this.changePwd()}
          >
            <View
              style={{
                marginTop: common.margin10,
                height: common.h40,
                backgroundColor: common.navBgColor,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text
                style={{
                  marginLeft: common.margin10,
                  fontSize: common.font14,
                  color: common.textColor,
                  alignSelf: 'center',
                }}
              >修改密码</Text>
              <Image
                style={{
                  marginRight: common.margin10,
                  width: common.w10,
                  height: common.h20,
                }}
                source={require('../../assets/下拉--向右.png')}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={common.activeOpacity}
          >
            <View
              style={{
                marginTop: common.margin5,
                height: common.h40,
                backgroundColor: common.navBgColor,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text
                style={{
                  marginLeft: common.margin10,
                  fontSize: common.font14,
                  color: common.textColor,
                  alignSelf: 'center',
                }}
              >语言选择</Text>
              <Image
                style={{
                  marginRight: common.margin10,
                  width: common.w10,
                  height: common.h20,
                }}
                source={require('../../assets/下拉--向右.png')}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={common.activeOpacity}
          >
            <View
              style={{
                marginTop: common.margin5,
                height: common.h40,
                backgroundColor: common.navBgColor,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text
                style={{
                  marginLeft: common.margin10,
                  fontSize: common.font14,
                  color: common.textColor,
                  alignSelf: 'center',
                }}
              >版本显示</Text>
              <Image
                style={{
                  marginRight: common.margin10,
                  width: common.w10,
                  height: common.h20,
                }}
                source={require('../../assets/下拉--向右.png')}
              />
            </View>
          </TouchableOpacity>

        </ScrollView>
      </View>
    )
  }
}
