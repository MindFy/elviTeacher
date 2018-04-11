import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { common } from '../common'

const styles = StyleSheet.create({
  viewStyle: {
    marginTop: common.margin40,
    marginLeft: common.margin38,
    marginRight: common.margin38,
    height: common.h35,
    backgroundColor: common.navBgColor,
    borderColor: common.borderColor,
    borderRadius: 1,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textStyle: {
    width: common.w100,
    marginLeft: common.margin10,
    fontSize: common.font12,
    color: common.textColor,
    alignSelf: 'center',
  },
  textInputStyle: {
    fontSize: common.font12,
    color: 'white',
  },
  btnTextStyle: {
    color: common.btnTextColor,
    textAlign: 'center',
    fontSize: common.font12,
  },
})

export default class TextInputCode extends Component {
  componentDidMount() { }
  render() {
    return (
      <View
        style={[styles.viewStyle, this.props.viewStyle]}
      >
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <Text
            style={[styles.textStyle, this.props.textStyle]}
          >{this.props.title || '验证码'}</Text>
          <TextInput
            style={[styles.textInputStyle, this.props.textInputStyle]}
            placeholder={this.props.placeholder || '请输入短信验证码'}
            placeholderTextColor={common.placeholderColor}
          />
        </View>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            marginRight: common.margin10,
          }}
          activeOpacity={common.activeOpacity}
        >
          <Text
            style={[styles.btnTextStyle, this.props.btnTextStyle]}
          >{this.props.btnTitle || '获取验证码'}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
