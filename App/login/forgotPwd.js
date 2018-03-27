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

export default class ForgotPwd extends Component {
  componentDidMount() { }
  nextPress() {
    this.props.navigation.navigate('ConfirmPwd')
  }
  render() {
    return (
      <ScrollView style={styles.scrollViewStyle} >
        <StatusBar
          barStyle={'light-content'}
        />
        <View style={[styles.inputViewStyle, { marginTop: common.screenH / 6 }]} >
          <Text style={styles.textStyle} >账号</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="请输入11位手机号"
            placeholderTextColor={common.inputPlaceholderColor}
          />
        </View>

        <View style={[styles.inputViewStyle, { marginTop: common.inputViewMarginLeft, justifyContent: 'space-between' }]} >
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.textStyle} >验证码</Text>
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

        <View style={[styles.bottomBtnViewStyle, { marginTop: common.screenH / 3 }]}>
          <TouchableOpacity
            activeOpacity={common.activeOpacity}
            onPress={() => this.nextPress()}
          >
            <Text style={styles.bottomBtnTextStyle}>下一步</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}
