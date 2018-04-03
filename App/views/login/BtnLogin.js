import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { common } from '../common'

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
    color: 'white',
    textAlign: 'center',
  },
})

export default class BtnLogin extends Component {
  render() {
    return (
      <View
        style={[styles.viewStyle, this.props.viewStyle]}
      >
        <TouchableOpacity
          activeOpacity={common.activeOpacity}
          onPress={this.props.onPress}
        >
          <Text style={[styles.textStyle, this.props.textStyle]}
          >{this.props.title}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}