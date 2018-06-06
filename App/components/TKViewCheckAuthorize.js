import React, { Component } from 'react'
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { common } from '../constants/common'
import TKCheckCodeBtn from '../components/TKCheckCodeBtn'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginLeft: common.margin48,
    marginRight: common.margin48,
    height: common.h154,
  },
  phoneContainer: {
    marginTop: common.margin20,
    marginLeft: common.margin20,
    marginRight: common.margin20,
    flexDirection: 'row',
  },
  phoneTip: {
    color: common.blackColor,
    fontSize: common.font12,
    width: '40%',
  },
  phone: {
    color: common.blackColor,
    fontSize: common.font12,
    width: '50%',
  },
  inputContainer: {
    marginTop: common.margin10,
    marginLeft: common.margin20,
    marginRight: common.margin20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  codeTip: {
    color: common.blackColor,
    fontSize: common.font12,
    alignSelf: 'center',
    width: '40%',
  },
  inputInnerContainer: {
    borderColor: common.placeholderColor,
    borderWidth: 1,
    height: common.h30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  textInput: {
    marginLeft: common.margin5,
    color: common.blackColor,
    fontSize: common.font12,
    width: '50%',
  },
  codeContainer: {
    marginRight: common.margin5,
    alignSelf: 'center',
  },
})

export default class TKViewCheckAuthorize extends Component {
  componentDidMount() { }

  render() {
    const {
      mobile,
      code,
      onChangeText,
      codePress,
      confirmPress,
      cancelPress,
      containerStyle,
    } = this.props
    return (
      <View style={[styles.container, containerStyle]}>
        <View style={styles.phoneContainer}>
          <Text style={styles.phoneTip}>手机号</Text>
          <Text style={styles.phone}>{mobile}</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.codeTip}>短信验证码</Text>
          <View style={styles.inputInnerContainer}>
            <TextInput
              style={styles.textInput}
              maxLength={6}
              value={code}
              onChangeText={text => onChangeText(text)}
            />
            <View style={styles.codeContainer}>
              <TKCheckCodeBtn
                onPress={() => {
                  codePress()
                }}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            left: common.margin20,
            bottom: common.margin20,
            right: common.margin20,
            position: 'absolute',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <TouchableOpacity
            style={{
              width: common.h70,
              height: common.h30,
              backgroundColor: common.btnTextColor,
              justifyContent: 'center',
            }}
            activeOpacity={common.activeOpacity}
            onPress={() => confirmPress()}
          >
            <Text
              style={{
                color: 'white',
                fontSize: common.font12,
                alignSelf: 'center',
              }}
            >确定</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: common.h70,
              height: common.h30,
              borderColor: common.placeholderColor,
              borderWidth: 1,
              justifyContent: 'center',
            }}
            activeOpacity={common.activeOpacity}
            onPress={cancelPress}
          >
            <Text
              style={{
                color: common.blackColor,
                fontSize: common.font12,
                alignSelf: 'center',
              }}
            >取消</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
