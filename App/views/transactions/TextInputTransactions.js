import React, { Component } from 'react'
import {
  TextInput,
} from 'react-native'
import { common } from '../../constants/common'

export default class TextInputTranscations extends Component {
  componentDidMount() { }

  render() {
    const { textInputStyle, placeholder, value, onChange, keyboardType, editable, maxLength,
    } = this.props
    return (
      <TextInput
        style={[{
          marginLeft: common.margin10,
          marginRight: common.margin10 / 2,
          borderColor: common.borderColor,
          borderWidth: 1,
          borderRadius: 1,
          backgroundColor: common.navBgColor,
          height: common.h35,
          fontSize: common.font12,
          textAlign: 'center',
          color: 'white',
        }, textInputStyle]}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor={common.placeholderColor}
        autoCorrect={false}
        value={value}
        onChangeText={onChange}
        editable={editable}
        maxLength={maxLength}
      />
    )
  }
}
