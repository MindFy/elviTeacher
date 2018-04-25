import React, { Component } from 'react'
import {
  View,
  TextInput,
  StyleSheet,
} from 'react-native'
import { common } from '../../constants/common'

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
    width: '80%',
    fontSize: common.font14,
    color: 'white',
  },
})

export default class TextInputPwd extends Component {
  componentDidMount() { }
  render() {
    const { placeholder, value, onChange, maxLength, keyboardType } = this.props
    return (
      <View
        style={styles.viewStyle}
      >
        <TextInput
          style={styles.inputStyle}
          placeholder={placeholder}
          placeholderTextColor={common.placeholderColor}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          keyboardType={keyboardType}
        />
      </View>
    )
  }
}
