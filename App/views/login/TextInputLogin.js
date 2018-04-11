import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native'
import { common } from '../common'

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
    width: '50%',
    color: 'white',
  },
})

export default class TextInputLogin extends Component {
  componentDidMount() {}
  render() {
    return (
      <View
        style={[styles.viewStyle, this.props.viewStyle]}
      >
        <Text
          style={[styles.textStyle, this.props.textStyle]}
        >{this.props.title}</Text>
        <TextInput
          style={styles.textInputStyle}
          autoCapitalize="none"
          placeholder={this.props.placeholder}
          placeholderTextColor={common.placeholderColor}
          password={this.props.password}
          multiline={false}
          onChange={this.props.onChange}
          keyboardType={this.props.keyboardType}
          maxLength={this.props.maxLength}
          editable
          autoFocus
        />
      </View>
    )
  }
}
