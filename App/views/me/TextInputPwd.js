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
    const { placeholder, value, onChange, maxLength, keyboardType,
      secureTextEntry, password } = this.props
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
            value={value}
            onChange={onChange}
            maxLength={maxLength}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
          />
        </View>
        {
          ((password && !common.regPassword.test(password)) ||
            (password && !common.regSpace.test(password))) ?
            (<Text
              style={{
                marginTop: common.margin5,
                color: common.redColor,
                fontSize: common.font12,
                textAlign: 'right',
              }}
            >{common.regPasswordMsg}</Text>) : null
        }
      </View>
    )
  }
}
