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

export default class Registration extends Component {
  componentDidMount() { }
  registrationBtnPress() {

  }
  backToLogin() {
    this.props.navigation.goBack()
  }
  render() {
    return (
      <ScrollView style={Styles.scrollViewStyle} >
        <StatusBar
          barStyle={'light-content'}
        />

        <View style={[Styles.inputViewStyle, { marginTop: Common.screenH / 6 }]} >
          <Text style={[Styles.textStyle, { width: Common.textWidthMiddle }]} >账号</Text>
          <TextInput
            style={Styles.inputStyle}
            placeholder="请输入11位手机号"
            placeholderTextColor={Common.inputPlaceholderColor}
          />
        </View>

        <View style={[Styles.inputViewStyle, { marginTop: Common.inputViewMarginLeft, justifyContent: 'space-between' }]} >
          <View style={{ flexDirection: 'row' }}>
            <Text style={[Styles.textStyle, { width: Common.textWidthMiddle }]} >验证码</Text>
            <TextInput
              style={Styles.inputStyle}
              placeholder="请输入短信验证码"
              placeholderTextColor={Common.inputPlaceholderColor}
            />
          </View>
          <View style={Styles.codeBtnViewStyle}>
            <TouchableOpacity >
              <Text style={Styles.codeBtnTextStyle}>获取验证码</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[Styles.inputViewStyle, { marginTop: Common.inputViewMarginLeft }]} >
          <Text style={[Styles.textStyle, { width: Common.textWidthMiddle }]} >密码</Text>
          <TextInput
            style={Styles.inputStyle}
            placeholder="请输入密码"
            placeholderTextColor={Common.inputPlaceholderColor}
          />
        </View>

        <View style={[Styles.inputViewStyle, { marginTop: Common.inputViewMarginLeft }]} >
          <Text style={[Styles.textStyle, { width: Common.textWidthMiddle }]} >再次确认密码</Text>
          <TextInput
            style={Styles.inputStyle}
            placeholder="请再次输入密码"
            placeholderTextColor={Common.inputPlaceholderColor}
          />
        </View>

        <View style={Styles.smallBtnViewStyle} >
          <View style={{ flexDirection: 'row' }}>
            <Text style={Styles.smallBtnLeftTextStyle}>注册即同意</Text>
            <TouchableOpacity
              activeOpacity={Common.activeOpacity}
              onPress={() => { }}
            >
              <Text style={Styles.smallBtnTextStyle}>《xxx服务协议》</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={Common.activeOpacity}
            onPress={() => this.backToLogin()}
          >
            <Text style={Styles.smallBtnTextStyle}>已有账号？去登录</Text>
          </TouchableOpacity>
        </View>

        <View style={Styles.bottomBtnViewStyle}>
          <TouchableOpacity
            activeOpacity={Common.activeOpacity}
            onPress={() => this.registrationBtnPress()}
          >
            <Text style={Styles.bottomBtnTextStyle}>注册</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}
