import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native'
import md5 from 'md5'
import Toast from 'teaset/components/Toast/Toast'
import Spinner from 'react-native-spinkit'
import { common } from '../common'
import SelectImage from './SelectImage'
import TextInputPwd from './TextInputPwd'
import BtnLogout from './BtnLogout'
import actions from '../../actions/index'
import schemas from '../../schemas/index'

class Authentication extends Component {
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
    this.showIdCardAuthResponse = false
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(actions.idCardAuthUpdate({
      name: '',
      idNo: '',
      idCardImages: {},
    }))
  }

  onChange(event, tag) {
    const { text } = event.nativeEvent
    const { dispatch, name, idNo, idCardImages } = this.props

    switch (tag) {
      case 'name':
        dispatch(actions.idCardAuthUpdate({ name: text, idNo, idCardImages }))
        break
      case 'idNo':
        dispatch(actions.idCardAuthUpdate({ name, idNo: text, idCardImages }))
        break
      default:
        break
    }
  }

  confirmPress() {
    const { dispatch, name, idNo, idCardImages } = this.props
    if (!name.length) {
      Toast.message('请输入姓名')
      return
    }
    if (!idNo.length || idNo.length !== common.textInputMaxLenIdNo) {
      Toast.message('请输入18位身份证号')
      return
    }
    if (!idCardImages.first) {
      Toast.message('请上传身份证正面照片')
      return
    }
    if (!idCardImages.second) {
      Toast.message('请上传身份证反面照片')
      return
    }
    if (!idCardImages.third) {
      Toast.message('请上传手持身份证照片')
      return
    }
    dispatch(actions.idCardAuth({
      name,
      idNo: Number(idNo),
      idCardImages: [
        idCardImages.first.hash,
        idCardImages.second.hash,
        idCardImages.third.hash,
      ],
    }))
  }

  imagePicker(response, tag) {
    const { dispatch, name, idNo, idCardImages } = this.props
    switch (tag) {
      case 'first':
        idCardImages.first = { uri: response.uri, hash: md5(response.data) }
        break
      case 'second':
        idCardImages.second = { uri: response.uri, hash: md5(response.data) }
        break
      case 'third':
        idCardImages.third = { uri: response.uri, hash: md5(response.data) }
        break
      default:
        break
    }
    dispatch(actions.idCardAuthUpdate({
      name,
      idNo,
      idCardImages: {
        first: idCardImages.first,
        second: idCardImages.second,
        third: idCardImages.third,
      },
    }))
  }

  handleIdCardAuthRequest() {
    const { idCardAuthVisible, idCardAuthResponse } = this.props
    if (!idCardAuthVisible && !this.showIdCardAuthResponse) return

    if (idCardAuthVisible) {
      this.showIdCardAuthResponse = true
    } else {
      this.showIdCardAuthResponse = false
      if (idCardAuthResponse.success) {
        Toast.success(idCardAuthResponse.result.message)
      } else {
        Toast.fail(idCardAuthResponse.error.message)
      }
    }
  }

  renderScrollView(state) {
    const { name, idNo, idCardImages } = this.props
    switch (state) {
      case -1:
        return (
          <KeyboardAvoidingView
            behavior="padding"
          >
            <ScrollView>
              <TextInputPwd
                placeholder="姓名"
                value={name}
                onChange={e => this.onChange(e, 'name')}
              />
              <TextInputPwd
                placeholder="身份证号"
                value={idNo}
                maxLength={common.textInputMaxLenIdNo}
                onChange={e => this.onChange(e, 'idNo')}
                keyboardType={'numbers-and-punctuation'}
              />

              <SelectImage
                title={'请上传身份证正面照片'}
                imagePickerBlock={response => this.imagePicker(response, 'first')}
                avatarSource={idCardImages.first ? idCardImages.first.uri : undefined}
              />
              <SelectImage
                title={'请上传身份证反面照片'}
                imagePickerBlock={response => this.imagePicker(response, 'second')}
                avatarSource={idCardImages.second ? idCardImages.second.uri : undefined}
              />
              <SelectImage
                title={'请上传手持身份证照片'}
                imagePickerBlock={response => this.imagePicker(response, 'third')}
                avatarSource={idCardImages.third ? idCardImages.third.uri : undefined}
              />

              <BtnLogout
                viewStyle={{
                  marginTop: common.margin40,
                  height: common.h44,
                }}
                onPress={() => this.confirmPress()}
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
              onPress={() => this.confirmPress()}
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
    this.handleIdCardAuthRequest()
    const { idCardAuthVisible, idCardAuthResponse } = this.props
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: common.bgColor,
        }}
      >
        <StatusBar barStyle={'light-content'} />
        {this.renderScrollView(this.state.authenticationState)}
        {
          idCardAuthResponse && idCardAuthResponse.success ?
            <View
              style={{
                position: 'absolute',
                alignSelf: 'center',
                top: '20%',
                backgroundColor: 'white',
                borderRadius: common.radius6,
              }}
            >
              <Text
                style={{
                  color: common.blackColor,
                  fontSize: common.font16,
                  alignSelf: 'center',
                }}
              >提交成功</Text>
              <Text
                style={{
                  color: common.blackColor,
                  fontSize: common.font16,
                  alignSelf: 'center',
                }}
              >请耐心等待后台审核</Text>
            </View> : null
        }
        <Spinner
          style={{
            position: 'absolute',
            alignSelf: 'center',
            marginTop: common.sh / 2 - common.h50 / 2,
          }}
          isVisible={idCardAuthVisible}
          size={common.h50}
          type={'Wave'}
          color={common.btnTextColor}
        />
      </View>
    )
  }
}

function mapStateToProps(store) {
  return {
    user: store.user.user,

    name: store.user.name,
    idNo: store.user.idNo,
    idCardImages: store.user.idCardImages,

    idCardAuthVisible: store.user.idCardAuthVisible,
    idCardAuthResponse: store.user.idCardAuthResponse,
  }
}

export default connect(
  mapStateToProps,
)(Authentication)
