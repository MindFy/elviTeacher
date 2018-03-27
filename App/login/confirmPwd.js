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

export default class ConfirmPwd extends Component {
  componentDidMount() { }
  confirmPress() {
  }
  render() {
    return (
      <ScrollView style={Styles.scrollViewStyle} >
        <StatusBar
          barStyle={'light-content'}
        />

        <View style={[Styles.inputViewStyle, { marginTop: Common.screenH / 6 }]} >
          <Text style={[Styles.textStyle, { width: Common.textWidthPlus }]} >密码</Text>
          <TextInput
            style={Styles.inputStyle}
            placeholder="请输入密码"
            placeholderTextColor={Common.inputPlaceholderColor}
          />
        </View>

        <View style={[Styles.inputViewStyle, { marginTop: Common.inputH }]} >
          <Text style={[Styles.textStyle, { width: Common.textWidthPlus }]} >再次输入新密码</Text>
          <TextInput
            style={Styles.inputStyle}
            placeholder="请再次输入新密码"
            placeholderTextColor={Common.inputPlaceholderColor}
          />
        </View>

        <View style={[Styles.bottomBtnViewStyle, { marginTop: Common.screenH / 3 }]}>
          <TouchableOpacity
            activeOpacity={Common.activeOpacity}
            onPress={() => this.confirmPress()}
          >
            <Text style={Styles.bottomBtnTextStyle}>确定</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}
