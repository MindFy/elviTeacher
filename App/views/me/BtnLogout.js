import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { common } from '../common'

const styles = StyleSheet.create({
  viewStyle: {
    marginTop: common.margin40,
    height: common.h40,
    backgroundColor: common.navBgColor,
    justifyContent: 'center',
  },
  titleStyle: {
    fontSize: common.font16,
    color: common.btnTextColor,
    textAlign: 'center',
  },
})

export default class BtnLogout extends Component {
  componentDidMount() { }
  render() {
    return (
      <TouchableOpacity
        style={[styles.viewStyle, this.props.viewStyle]}
        activeOpacity={common.activeOpacity}
        onPress={this.props.onPress}
      >
        <Text
          style={styles.titleStyle}
        >{this.props.title}</Text>
      </TouchableOpacity>
    )
  }
}
