import React, { Component } from 'react'
import {
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native'
import { common } from '../common'
import TextInputPwd from './TextInputPwd'
import BtnLogout from './BtnLogout'

export default class SetPwd extends Component {
  static navigationOptions(props) {
    return {
      headerTitle: '修改密码',
      headerStyle: {
        backgroundColor: common.navBgColor,
        borderBottomWidth: 0,
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontSize: common.font16,
      },
      headerLeft:
        (
          <TouchableOpacity
            activeOpacity={common.activeOpacity}
            onPress={() => props.navigation.goBack()}
          >
            <Image
              style={{
                marginLeft: common.margin10,
                width: common.w10,
                height: common.h20,
              }}
              source={require('../../assets/下拉copy.png')}
            />
          </TouchableOpacity>
        ),
    }
  }
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

          <TextInputPwd
            placeholder={'旧密码'}
          />
          <TextInputPwd
            placeholder={'输入密码'}
          />
          <TextInputPwd
            placeholder={'再次输入密码'}
          />

          <BtnLogout
            viewStyle={{
              marginLeft: common.margin10,
              marginRight: common.margin10,
            }}
            onPress={() => this.props.navigation.goBack()}
            title="确认"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}
