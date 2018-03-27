import React, { Component } from 'react'
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
  AppRegistry,
} from 'react-native'
import { common, styles } from './common'

export default class Login extends Component {
  componentDidMount() { }
  registrationPress() {
    this.props.navigation.navigate('Registration')
  }
  pwdBtnPress() {
    this.props.navigation.navigate('ForgotPwd')
  }
  loginPress() {
    this.props.navigation.navigate('Mine')
  }
  render() {
    return (
      <ScrollView style={styles.scrollViewStyle} >
        <StatusBar
          barStyle={'light-content'}
        />

        <View style={[styles.inputViewStyle, { marginTop: common.screenH / 5 * 2 }]} >
          <Text style={styles.textStyle} >账号</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="请输入11位手机号"
            placeholderTextColor={common.inputPlaceholderColor}
          />
        </View>

        <View style={[styles.inputViewStyle, { marginTop: common.inputViewMarginLeft }]} >
          <Text style={styles.textStyle} >密码</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="请输入密码"
            placeholderTextColor={common.inputPlaceholderColor}
          />
        </View>

        <View style={styles.smallBtnViewStyle} >
          <TouchableOpacity
            activeOpacity={common.activeOpacity}
            onPress={() => this.registrationPress()}
          >
            <Text style={styles.smallBtnTextStyle}>新用户注册</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={common.activeOpacity}
            onPress={() => this.pwdBtnPress()}
          >
            <Text style={styles.smallBtnTextStyle}>忘记密码？</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomBtnViewStyle}>
          <TouchableOpacity
            activeOpacity={common.activeOpacity}
            onPress={() => this.loginPress()}
          >
            <Text style={styles.bottomBtnTextStyle}>登录</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}
