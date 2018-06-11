import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
} from 'react-native'
import { common } from '../../constants/common'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'

const styles = StyleSheet.create({
  viewStyle: {
    marginTop: common.margin36,
    marginLeft: common.margin38,
    marginRight: common.margin38,
    height: common.h35,
    backgroundColor: common.loginBtnBgColor,
    borderRadius: 1,
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: common.font16,
    color: common.loginBtnTitleColor,
    textAlign: 'center',
  },
})

export default class BtnLogin extends Component {
  componentDidMount() { }
  render() {
    return (
      <NextTouchableOpacity
        style={[styles.viewStyle, this.props.viewStyle]}
        activeOpacity={common.activeOpacity}
        onPress={this.props.onPress}
        disabled={this.props.disabled}
      >
        <Text
          style={[styles.textStyle, this.props.textStyle]}
        >{this.props.title}</Text>
      </NextTouchableOpacity>
    )
  }
}
