import React, { Component } from 'react'
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native'
import { Common, Styles } from './common'

export default class Login extends Component {
  componentDidMount() { }
  registrationPress() {
    this.props.navigation.navigate('Registration')
  }
  pwdBtnPress() {
    this.props.navigation.navigate('ForgotPwd')
  }
  render() {
    return (
      <ScrollView style={Styles.scrollViewStyle} >
        <StatusBar
          barStyle={'light-content'}
        />

        <View style={[Styles.inputViewStyle, { marginTop: Common.screenH / 5 * 2 }]} >
          <Text style={Styles.textStyle} >账号</Text>
          <TextInput
            style={Styles.inputStyle}
            placeholder="请输入11位手机号"
            placeholderTextColor={Common.inputPlaceholderColor}
          />
        </View>

        <View style={[Styles.inputViewStyle, { marginTop: Common.inputViewMarginLeft }]} >
          <Text style={Styles.textStyle} >密码</Text>
          <TextInput
            style={Styles.inputStyle}
            placeholder="请输入密码"
            placeholderTextColor={Common.inputPlaceholderColor}
          />
        </View>

        <View style={Styles.smallBtnViewStyle} >
          <TouchableOpacity
            activeOpacity={Common.activeOpacity}
            onPress={() => this.registrationPress()}
          >
            <Text style={Styles.smallBtnTextStyle}>新用户注册</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={Common.activeOpacity}
            onPress={() => this.pwdBtnPress()}
          >
            <Text style={Styles.smallBtnTextStyle}>忘记密码？</Text>
          </TouchableOpacity>
        </View>

        <View style={Styles.bottomBtnViewStyle}>
          <TouchableOpacity
            activeOpacity={Common.activeOpacity}
            onPress={() => { }}
          >
            <Text style={Styles.bottomBtnTextStyle}>登录</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}
