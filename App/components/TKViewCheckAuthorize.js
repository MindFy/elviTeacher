import React, { Component } from 'react'
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { common } from '../constants/common'
import TKButtonGetVerificateCode from './TKButtonGetVerificateCode'

export default class TKViewCheckAuthorize extends Component {
  componentDidMount() { }

  render() {
    const { mobile, code, onChange, codePress, confirmPress, cancelPress } = this.props
    return (
      <View
        style={{
          backgroundColor: '#fff',
          marginLeft: common.margin48,
          marginRight: common.margin48,
          height: common.h154,
        }}
      >
        <View
          style={{
            marginTop: common.margin20,
            marginLeft: common.margin20,
            marginRight: common.margin20,
            flexDirection: 'row',
          }}
        >
          <Text
            style={{
              color: common.blackColor,
              fontSize: common.font12,
              width: '40%',
            }}
          >手机号</Text>
          <Text
            style={{
              color: common.blackColor,
              fontSize: common.font12,
              width: '50%',
            }}
          >{mobile}</Text>
        </View>

        <View
          style={{
            marginTop: common.margin10,
            marginLeft: common.margin20,
            marginRight: common.margin20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              color: common.blackColor,
              fontSize: common.font12,
              alignSelf: 'center',
              width: '40%',
            }}
          >短信验证码</Text>
          <View
            style={{
              borderColor: common.placeholderColor,
              borderWidth: 1,
              height: common.h30,
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '60%',
            }}
          >
            <TextInput
              style={{
                marginLeft: common.margin5,
                color: common.blackColor,
                fontSize: common.font12,
                width: '50%',
              }}
              maxLength={6}
              value={code}
              onChange={e => onChange(e)}
            />
            <TKButtonGetVerificateCode
              onPress={(count) => {
                codePress(count)
              }}
            />
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
