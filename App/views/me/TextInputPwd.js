import React, { Component } from 'react'
import {
  View,
  TextInput,
  StyleSheet,
} from 'react-native'
import { common } from '../common'

const styles = StyleSheet.create({
  viewStyle: {
    marginTop: common.margin10,
    marginLeft: common.margin10,
    marginRight: common.margin10,
    height: common.h40,
    backgroundColor: common.navBgColor,
    borderColor: common.borderColor,
    borderWidth: 1,
    borderRadius: 1,
    justifyContent: 'center',
  },
  inputStyle: {
    marginLeft: common.margin10,
    fontSize: common.font14,
  },
})

export default class TextInputPwd extends Component {
  componentDidMount() { }
  render() {
    return (
      <View
        style={styles.viewStyle}
      >
        <TextInput
          style={styles.inputStyle}
          placeholder={this.props.placeholder}
          placeholderTextColor={common.placeholderColor}
        />
      </View>
    )
  }
}
