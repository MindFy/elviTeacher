import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native'
import { common } from '../common'
import SelectImage from './SelectImage'
import TextInputPwd from './TextInputPwd'
import BtnLogout from './BtnLogout'

export default class Authentication extends Component {
  static navigationOptions(props) {
    return {
      headerTitle: '身份认证',
      headerStyle: {
        backgroundColor: common.navBgColor,
        borderBottomWidth: 0,
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontSize: common.font16,
      },
      headerLeft:
        (
          <TouchableOpacity
            activeOpacity={common.activeOpacity}
            onPress={() => props.navigation.goBack()}
          >
            <Image
              style={{
                marginLeft: common.margin10,
                width: common.w10,
                height: common.h20,
              }}
              source={require('../../assets/下拉copy.png')}
            />
          </TouchableOpacity>
        ),
    }
  }
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

  renderScrollView(state) {
    switch (state) {
      case -1:
        return (
          <KeyboardAvoidingView
            behavior="padding"
          >
            <ScrollView>
              <TextInputPwd
                placeholder="姓名"
              />
              <TextInputPwd
                placeholder="身份证号"
              />

              <SelectImage
                title={'请上传身份证正面照片'}
              />
              <SelectImage
                title={'请上传身份证反面照片'}
              />
              <SelectImage
                title={'请上传手持身份证照片'}
              />

              <BtnLogout
                viewStyle={{
                  marginTop: common.margin40,
                  height: common.h44,
                }}
                onPress={() => this.confirmPress(0)}
                title="确认"
              />
            </ScrollView>
          </KeyboardAvoidingView>
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
        {this.renderScrollView(this.state.authenticationState)}
      </View>
    )
  }
}
