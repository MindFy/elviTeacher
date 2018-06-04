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
    width: '70%',
    color: 'white',
  },
})

export default class TextInputLogin extends Component {
  componentDidMount() { }

  render() {
    const { viewStyle, textStyle, placeholder, secureTextEntry, password, type,
      title, onChange, value, keyboardType, maxLength, textInputStyle } = this.props

    return (
      <View
        style={[styles.viewStyle, viewStyle]}
      >
        <View
          style={{
            backgroundColor: common.navBgColor,
            borderColor: common.borderColor,
            borderRadius: 1,
            borderWidth: 1,
            height: common.h40,
            flexDirection: 'row',
          }}
        >
          <Text
            style={[styles.textStyle, textStyle]}
          >{title}</Text>
          <TextInput
            style={[styles.textInputStyle, textInputStyle]}
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
        {
          ((password && !common.regPassword.test(password)) ||
            (password && !common.regSpace.test(password))) ?
            (<Text
              style={
                type && type === 'login' ?
                  {
                    marginTop: common.margin5,
                    color: common.redColor,
                    fontSize: common.font12,
                    textAlign: 'right',
                  } : {
                    position: 'absolute',
                    top: common.margin5 + common.margin40,
                    right: 0,
                    color: common.redColor,
                    fontSize: common.font12,
                  }
              }
            >{common.regPasswordMsg}</Text>) : null
        }
      </View>
    )
  }
}
