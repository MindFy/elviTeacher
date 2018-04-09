import React, { Component } from 'react'
import {
  StatusBar,
  ScrollView,
} from 'react-native'
import { common } from '../common'
import MeCell from './MeCell'
import BtnLogout from './BtnLogout'

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
  constructor() {
    super()
    this.state = {
      phoneNum: '请登录',
    }
  }
  componentDidMount() { }
  loginPress(obj) {
    if (!common.reg.test(obj)) {
      this.props.navigation.navigate('LoginStack')
    }
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

        <MeCell
          onPress={() => this.loginPress(this.state.phoneNum)}
          viewStyle={{
            marginTop: common.margin10,
            height: common.h50,
          }}
          leftImageStyle={{
            width: common.w25,
            height: common.w25,
          }}
          leftImageSource={require('../../assets/默认头像ICON.png')}
          titleStyle={{
            fontSize: common.font16,
          }}
          title={this.state.phoneNum}
          rightImageHide
        />
        <MeCell
          onPress={() => this.props.navigation.navigate('Authentication')}
          leftImageSource={require('../../assets/手机认证copy.png')}
          title="身份认证"
        />
        <MeCell
          onPress={() => { }}
          leftImageSource={require('../../assets/手机认证.png')}
          title="手机认证"
        />
        <MeCell
          onPress={() => { }}
          leftImageSource={require('../../assets/手机认证copy3.png')}
          title="超级返利"
        />
        <MeCell
          onPress={() => this.props.navigation.navigate('Settings')}
          leftImageSource={require('../../assets/手机认证copy4.png')}
          title="设置"
        />

        {
          !common.reg.test(this.state.phoneNum) ? null :
            (<BtnLogout
              onPress={() => this.props.navigation.navigate('LoginStack')}
              title="退出登录"
            />)
        }
      </ScrollView>
    )
  }
}
