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

export default class ConfirmPwd extends Component {
  componentDidMount() { }
  confirmPress() {
  }
  render() {
    return (
      <ScrollView style={styles.scrollViewStyle} >
        <StatusBar
          barStyle={'light-content'}
        />

        <View style={[styles.inputViewStyle, { marginTop: common.screenH / 6 }]} >
          <Text style={[styles.textStyle, { width: common.textWidthPlus }]} >密码</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="请输入密码"
            placeholderTextColor={common.inputPlaceholderColor}
          />
        </View>

        <View style={[styles.inputViewStyle, { marginTop: common.inputH }]} >
          <Text style={[styles.textStyle, { width: common.textWidthPlus }]} >再次输入新密码</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="请再次输入新密码"
            placeholderTextColor={common.inputPlaceholderColor}
          />
        </View>

        <View style={[styles.bottomBtnViewStyle, { marginTop: common.screenH / 3 }]}>
          <TouchableOpacity
            activeOpacity={common.activeOpacity}
            onPress={() => this.confirmPress()}
          >
            <Text style={styles.bottomBtnTextStyle}>确定</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}
