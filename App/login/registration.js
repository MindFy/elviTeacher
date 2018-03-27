import React, { Component } from 'react'
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native'
import { common, styles } from './common'

export default class Registration extends Component {
  componentDidMount() { }
  registrationBtnPress() {

  }
  backToLogin() {
    this.props.navigation.goBack()
  }
  render() {
    return (
      <ScrollView style={styles.scrollViewStyle} >
        <StatusBar
          barStyle={'light-content'}
        />

        <View style={[styles.inputViewStyle, { marginTop: common.screenH / 6 }]} >
          <Text style={[styles.textStyle, { width: common.textWidthMiddle }]} >账号</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="请输入11位手机号"
            placeholderTextColor={common.inputPlaceholderColor}
          />
        </View>

        <View style={[styles.inputViewStyle, { marginTop: common.inputViewMarginLeft, justifyContent: 'space-between' }]} >
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.textStyle, { width: common.textWidthMiddle }]} >验证码</Text>
            <TextInput
              style={styles.inputStyle}
              placeholder="请输入短信验证码"
              placeholderTextColor={common.inputPlaceholderColor}
            />
          </View>
          <View style={styles.codeBtnViewStyle}>
            <TouchableOpacity >
              <Text style={styles.codeBtnTextStyle}>获取验证码</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.inputViewStyle, { marginTop: common.inputViewMarginLeft }]} >
          <Text style={[styles.textStyle, { width: common.textWidthMiddle }]} >密码</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="请输入密码"
            placeholderTextColor={common.inputPlaceholderColor}
          />
        </View>

        <View style={[styles.inputViewStyle, { marginTop: common.inputViewMarginLeft }]} >
          <Text style={[styles.textStyle, { width: common.textWidthMiddle }]} >再次确认密码</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="请再次输入密码"
            placeholderTextColor={common.inputPlaceholderColor}
          />
        </View>

        <View style={styles.smallBtnViewStyle} >
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.smallBtnLeftTextStyle}>注册即同意</Text>
            <TouchableOpacity
              activeOpacity={common.activeOpacity}
              onPress={() => { }}
            >
              <Text style={styles.smallBtnTextStyle}>《xxx服务协议》</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={common.activeOpacity}
            onPress={() => this.backToLogin()}
          >
            <Text style={styles.smallBtnTextStyle}>已有账号？去登录</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomBtnViewStyle}>
          <TouchableOpacity
            activeOpacity={common.activeOpacity}
            onPress={() => this.registrationBtnPress()}
          >
            <Text style={styles.bottomBtnTextStyle}>注册</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}
