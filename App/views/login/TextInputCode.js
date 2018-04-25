import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native'
import { common } from '../../constants/common'
import TKButtonGetVerificateCode from '../../components/TKButtonGetVerificateCode'

const styles = StyleSheet.create({
  viewStyle: {
    marginTop: common.margin40,
    marginLeft: common.margin38,
    marginRight: common.margin38,
    height: common.h35,
    backgroundColor: common.navBgColor,
    borderColor: common.borderColor,
    borderRadius: 1,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textStyle: {
    width: common.w100,
    marginLeft: common.margin10,
    fontSize: common.font12,
    color: common.textColor,
    alignSelf: 'center',
  },
  textInputStyle: {
    fontSize: common.font12,
    width: '48%',
    color: 'white',
  },
})

export default class TextInputCode extends Component {
  componentDidMount() { }

  render() {
    const { viewStyle, textStyle, textInputStyle, placeholder,
      keyboardType, maxLength, value, onChange, onPress } = this.props
    return (
      <View
        style={[styles.viewStyle, viewStyle]}
      >
        <View
          style={{
            flexDirection: 'row',
            // justifyContent: 'space-between',
          }}
        >
          <Text
            style={[styles.textStyle, textStyle]}
          >验证码</Text>
          <TextInput
            style={[styles.textInputStyle, textInputStyle]}
            placeholder={placeholder || '请输入短信验证码'}
            placeholderTextColor={common.placeholderColor}
            keyboardType={keyboardType}
            maxLength={maxLength}
            value={value}
            onChange={onChange}
          />
        </View>
        <TKButtonGetVerificateCode
          viewStyle={{
            position: 'absolute',
            marginRight: 0,
            right: 10,
          }}
          onPress={onPress}
        />
      </View>
    )
  }
}
