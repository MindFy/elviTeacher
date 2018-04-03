import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { common } from '../common'

export default class Me extends Component {
  static navigationOptions() {
    return {
      headerTitle: '我的',
      headerStyle: {
        backgroundColor: common.navBgColor,
        borderBottomWidth: 0,
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontSize: common.font16,
      },
      headerLeft: null,
    }
  }
  componentDidMount() { }
  settingsPress() {
    this.props.navigation.navigate('Settings')
  }
  authenticationPress() {
    this.props.navigation.navigate('Authentication')
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: common.bgColor,
        }}
      >
        <StatusBar barStyle={'light-content'} />
        <ScrollView>
          <View
            style={{
              marginTop: common.margin10,
              height: common.h50,
              backgroundColor: common.navBgColor,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Image
              style={{
                marginLeft: common.margin10,
                width: common.w25,
                height: common.w25,
                alignSelf: 'center',
              }}
              source={require('../../assets/默认头像ICON.png')}
            />
            <Text
              style={{
                marginLeft: common.margin10,
                fontSize: common.font16,
                color: common.textColor,
                alignSelf: 'center',
              }}
            >
              13899993333
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={common.activeOpacity}
            onPress={() => this.authenticationPress()}
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
              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                <Image
                  style={{
                    marginLeft: common.margin10,
                    width: common.w20,
                    height: common.w20,
                    alignSelf: 'center',
                  }}
                  source={require('../../assets/手机认证copy.png')}
                />
                <Text
                  style={{
                    marginLeft: common.margin10,
                    fontSize: common.font14,
                    color: common.textColor,
                    alignSelf: 'center',
                  }}
                >身份认证</Text>
              </View>
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
              <View
                style={{ flexDirection: 'row' }}
              >
                <Image
                  style={{
                    marginLeft: common.margin10,
                    width: common.w20,
                    height: common.w20,
                    alignSelf: 'center',
                  }}
                  source={require('../../assets/手机认证.png')}
                />
                <Text
                  style={{
                    marginLeft: common.margin10,
                    fontSize: common.font14,
                    color: common.textColor,
                    alignSelf: 'center',
                  }}
                >手机认证</Text>
              </View>
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
              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                <Image
                  style={{
                    marginLeft: common.margin10,
                    width: common.w20,
                    height: common.w20,
                    alignSelf: 'center',
                  }}
                  source={require('../../assets/手机认证copy3.png')}
                />
                <Text
                  style={{
                    marginLeft: common.margin10,
                    fontSize: common.font14,
                    color: common.textColor,
                    alignSelf: 'center',
                  }}
                >超级返利</Text>
              </View>
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
            onPress={() => this.settingsPress()}
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
              <View
                style={{ flexDirection: 'row' }}
              >
                <Image
                  style={{
                    marginLeft: common.margin10,
                    width: common.w20,
                    height: common.w20,
                    alignSelf: 'center',
                  }}
                  source={require('../../assets/手机认证copy4.png')}
                />
                <Text
                  style={{
                    marginLeft: common.margin10,
                    fontSize: common.font14,
                    color: common.textColor,
                    alignSelf: 'center',
                  }}
                >设置</Text>
              </View>
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
            onPress={() => this.props.navigation.goBack()}
          >
            <View
              style={{
                marginTop: common.margin40,
                height: common.h40,
                backgroundColor: common.navBgColor,
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: common.font14,
                  color: common.btnTextColor,
                  textAlign: 'center',
                }}
              >退出登录</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}
