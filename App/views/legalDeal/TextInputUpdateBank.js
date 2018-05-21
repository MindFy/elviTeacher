import React, { Component } from 'react'
import {
  Text,
  View,
  TextInput,
} from 'react-native'
import {
  common,
} from '../../constants/common'

export default class TextInputUpdateBank extends Component {
  componentDidMount() { }

  render() {
    const { viewStyle, title, placeholder, onChange, keyboardType, maxLength, value } = this.props
    return (
      <View
        style={[{
          marginTop: common.margin5,
          backgroundColor: common.navBgColor,
          height: common.h40,
          flexDirection: 'row',
          alignItems: 'center',
        }, viewStyle]}
      >
        <Text
          style={{
            marginLeft: common.margin10,
            color: common.textColor,
            fontSize: common.font14,
            width: '28%',
          }}
        >{title}</Text>
        <TextInput
          style={{
            fontSize: common.font12,
            color: 'white',
            width: '60%',
          }}
          placeholder={placeholder}
          placeholderTextColor={common.placeholderColor}
          value={value}
          onChange={onChange}
          keyboardType={keyboardType}
          maxLength={maxLength}
        />
      </View>
    )
  }
}
