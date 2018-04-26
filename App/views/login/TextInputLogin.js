import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native'
import { common } from '../../constants/common'

const styles = StyleSheet.create({
  viewStyle: {
    marginTop: common.margin40,
    marginLeft: common.margin38,
    marginRight: common.margin38,
    backgroundColor: common.navBgColor,
    borderColor: common.borderColor,
    borderRadius: 1,
    borderWidth: 1,
    height: common.h40,
    flexDirection: 'row',
  },
  textStyle: {
    marginLeft: common.margin10,
    fontSize: common.font12,
    width: common.w60,
    color: common.textColor,
    alignSelf: 'center',
  },
  textInputStyle: {
    fontSize: common.font12,
    width: '55%',
    color: 'white',
  },
})

export default class TextInputLogin extends Component {
  componentDidMount() { }

  render() {
    const { viewStyle, textStyle, placeholder, secureTextEntry,
      title, onChange, value, keyboardType, maxLength } = this.props

    return (
      <View
        style={[styles.viewStyle, viewStyle]}
      >
        <Text
          style={[styles.textStyle, textStyle]}
        >{title}</Text>
        <TextInput
          style={styles.textInputStyle}
          autoCapitalize="none"
          placeholder={placeholder}
          placeholderTextColor={common.placeholderColor}
          secureTextEntry={secureTextEntry}
          multiline={false}
          onChange={onChange}
          value={value}
          keyboardType={keyboardType}
          maxLength={maxLength}
          editable
        />
      </View>
    )
  }
}
