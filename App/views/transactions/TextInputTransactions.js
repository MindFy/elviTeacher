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
          flex: 1,
          fontSize: common.font12,
          color: common.placeholderColor,
          alignSelf: 'center',
          textAlign: 'center',
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
