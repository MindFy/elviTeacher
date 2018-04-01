import React, { Component } from 'react'
import {
  View,
  StatusBar,
  ScrollView,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native'
import { common } from '../common'
import Navigator from '../Navigator'
import SelectImage from './SelectImage'

export default class Authentication extends Component {
  constructor() {
    super()
    this.state = {
      authenticationState: -1, // -1普通状态，1成功，0失败
    }
  }
  componentDidMount() { }
  confirmPress(authenticationState) {
    this.setState({
      authenticationState,
    })
  }

  /*  */
  renderScrollView(state) {
    switch (state) {
      case -1:
        return (
          <ScrollView>
            <View
              style={{
                marginTop: common.margin10,
                marginLeft: common.margin10,
                marginRight: common.margin10,
                height: common.h40,
                backgroundColor: common.navBgColor,
                borderWidth: 1,
                borderColor: common.borderColor,
                justifyContent: 'center',
              }}
            >
              <TextInput
                style={{
                  marginLeft: common.margin10,
                  fontSize: common.font14,
                }}
                placeholder={'姓名'}
                placeholderTextColor={common.placeholderColor}
              />
            </View>

            <View
              style={{
                marginTop: common.margin10,
                marginLeft: common.margin10,
                marginRight: common.margin10,
                height: common.h40,
                backgroundColor: common.navBgColor,
                borderColor: common.borderColor,
                borderWidth: 1,
                justifyContent: 'center',
              }}
            >
              <TextInput
                style={{
                  marginLeft: common.margin10,
                  fontSize: common.font14,
                }}
                placeholder={'身份证号'}
                placeholderTextColor={common.placeholderColor}
              />
            </View>

            <SelectImage
              title={'请上传身份证正面照片'}
            />
            <SelectImage
              title={'请上传身份证反面照片'}
            />
            <SelectImage
              title={'请上传手持身份证照片'}
            />

            <TouchableOpacity
              activeOpacity={common.activeOpacity}
              onPress={() => this.confirmPress(0)}
            >
              <View
                style={{
                  marginTop: common.margin40,
                  height: common.h44,
                  backgroundColor: common.navBgColor,
                  justifyContent: 'center',
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: common.font14,
                    color: common.btnTextColor,
                    textAlign: 'center',
                  }}
                >确认</Text>
              </View>
            </TouchableOpacity>

          </ScrollView>
        )
      case 1:
        return (
          <ScrollView>
            <Image
              style={{
                marginTop: common.margin127,
                width: common.h80,
                height: common.h80,
                alignSelf: 'center',
              }}
              source={require('../../assets/成功.png')}
            />
            <Text
              style={{
                marginTop: common.margin20,
                color: common.textColor,
                fontSize: common.font16,
                alignSelf: 'center',
                textAlign: 'center',
              }}
            >恭喜！身份认证成功！</Text>
          </ScrollView>
        )
      case 0:
        return (
          <ScrollView>
            <Image
              style={{
                marginTop: common.margin127,
                width: common.h80,
                height: common.h80,
                alignSelf: 'center',
              }}
              source={require('../../assets/失败.png')}
            />
            <Text
              style={{
                marginTop: common.margin20,
                color: common.textColor,
                fontSize: common.font16,
                alignSelf: 'center',
                textAlign: 'center',
              }}
            >抱歉！您的身份认证未通过审核！</Text>
            <Text
              style={{
                marginTop: common.margin10,
                color: common.textColor,
                fontSize: common.font16,
                alignSelf: 'center',
                textAlign: 'center',
              }}
            >失败原因：照片不清晰</Text>
            <TouchableOpacity
              style={{

              }}
              activeOpacity={common.activeOpacity}
              onPress={() => this.confirmPress(1)}
            >
              <Text
                style={{
                  marginTop: common.margin10,
                  color: common.btnTextColor,
                  fontSize: common.font16,
                  alignSelf: 'center',
                }}
              >再次认证</Text>
            </TouchableOpacity>
          </ScrollView>
        )
      default:
        return null
    }
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: common.bgColor,
        }}
      >
        <StatusBar barStyle={'light-content'} />
        <Navigator
          headerTitle="身份认证"
          leftImagePress={() => this.props.navigation.goBack()}
        />
        {this.renderScrollView(this.state.authenticationState)}
      </View>
    )
  }
}
