import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { common } from '../../constants/common'

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
    const { viewStyle, onPress, disabled, title } = this.props
    return (
      <TouchableOpacity
        style={[styles.viewStyle, viewStyle]}
        activeOpacity={common.activeOpacity}
        onPress={onPress}
        disabled={disabled}
      >
        <Text
          style={styles.titleStyle}
        >{title}</Text>
      </TouchableOpacity>
    )
  }
}
