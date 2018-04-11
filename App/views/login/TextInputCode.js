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
    width: '45%',
    color: 'white',
  },
  btnTextStyle: {
    color: common.btnTextColor,
    textAlign: 'center',
    fontSize: common.font12,
  },
})

let count = 60

export default class TextInputCode extends Component {
  constructor() {
    super()

    this.state = {
      btnTitle: '获取验证码',
      disabled: false,
    }

    this.codePress = this.codePress.bind(this)
  }
  componentDidMount() { }

  codePress() {
    this.props.codePress(() => {
      this.setState({
        btnTitle: `${count}`,
        disabled: true,
      })
      this.timer = setInterval(() => {
        count--
        if (count === 0) {
          this.setState({
            btnTitle: '获取验证码',
            disabled: false,
          })
          clearInterval(this.timer)
          count = 60
        } else {
          this.setState({
            btnTitle: `${count}`,
          })
        }
      }, 1000)
    })
  }

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
          >验证码</Text>
          <TextInput
            style={[styles.textInputStyle, this.props.textInputStyle]}
            placeholder={this.props.placeholder || '请输入短信验证码'}
            placeholderTextColor={common.placeholderColor}
            keyboardType={this.props.keyboardType}
            maxLength={this.props.maxLength}
            onChange={this.props.onChange}
          />
        </View>
        <TouchableOpacity
          style={{
            position: 'absolute',
            alignSelf: 'center',
            right: common.margin10,
          }}
          activeOpacity={common.activeOpacity}
          disabled={this.state.disabled}
          onPress={this.codePress}
        >
          <Text
            style={[styles.btnTextStyle, this.props.btnTextStyle]}
          >{this.state.btnTitle}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
