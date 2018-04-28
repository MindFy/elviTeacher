import React, { Component } from 'react'
import {
  Text,
  View,
  TextInput,
  StyleSheet,
} from 'react-native'
import { common } from '../../constants/common'

const styles = StyleSheet.create({
  viewStyle: {
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
    const { placeholder, onChange, maxLength, keyboardType, type,
      secureTextEntry, newPassword, newPasswordAgain } = this.props
    return (
      <View
        style={{
          marginTop: common.margin10,
          marginLeft: common.margin10,
          marginRight: common.margin10,
        }}
      >
        <View
          style={styles.viewStyle}
        >
          <TextInput
            style={styles.inputStyle}
            placeholder={placeholder}
            placeholderTextColor={common.placeholderColor}
            onChange={onChange}
            maxLength={maxLength}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
          />
        </View>
        {
          type === 'newPassword' ?
            <Text
              style={{
                marginTop: common.margin5,
                color: common.placeholderColor,
                fontSize: common.font12,
                textAlign: 'right',
              }}
            >{common.regPasswordMsg}</Text> : null
        }
        {
          ((type === 'newPasswordAgain') && (newPassword !== newPasswordAgain))
            ? <Text
              style={{
                marginTop: common.margin5,
                color: common.btnTextColor,
                fontSize: common.font12,
                textAlign: 'left',
              }}
            >请确保两次输入密码一致</Text> : null
        }
      </View>
    )
  }
}
