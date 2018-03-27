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

export default class ForgotPwd extends Component {
  componentDidMount() { }
  nextPress() {
    this.props.navigation.navigate('ConfirmPwd')
  }
  render() {
    return (
      <ScrollView style={Styles.scrollViewStyle} >
        <StatusBar
          barStyle={'light-content'}
        />
        <View style={[Styles.inputViewStyle, { marginTop: Common.screenH / 6 }]} >
          <Text style={Styles.textStyle} >账号</Text>
          <TextInput
            style={Styles.inputStyle}
            placeholder="请输入11位手机号"
            placeholderTextColor={Common.inputPlaceholderColor}
          />
        </View>

        <View style={[Styles.inputViewStyle, { marginTop: Common.inputViewMarginLeft, justifyContent: 'space-between' }]} >
          <View style={{ flexDirection: 'row' }}>
            <Text style={Styles.textStyle} >验证码</Text>
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

        <View style={[Styles.bottomBtnViewStyle, { marginTop: Common.screenH / 3 }]}>
          <TouchableOpacity
            activeOpacity={Common.activeOpacity}
            onPress={() => this.nextPress()}
          >
            <Text style={Styles.bottomBtnTextStyle}>下一步</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}
