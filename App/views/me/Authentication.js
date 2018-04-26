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
import Toast from 'teaset/components/Toast/Toast'
import PutObject from 'rn-put-object'
import Spinner from 'react-native-spinkit'
import { common } from '../../constants/common'
import SelectImage from './SelectImage'
import TextInputPwd from './TextInputPwd'
import BtnLogout from './BtnLogout'
import actions from '../../actions/index'

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
    this.showIdCardAuthResponse = false
  }

  componentWillMount() {
    const { dispatch, user, imgHashApi, authenticationAgain } = this.props

    dispatch(actions.idCardAuthUpdate({
      name: user.name,
      idNo: user.idNo ? user.idNo : '',
      idCardImages: user.idCardImages && user.idCardImages.length === 3 ?
        {
          first: { uri: `${imgHashApi}${user.idCardImages[0]}`, hash: user.idCardImages[0] },
          second: { uri: `${imgHashApi}${user.idCardImages[1]}`, hash: user.idCardImages[1] },
          third: { uri: `${imgHashApi}${user.idCardImages[2]}`, hash: user.idCardImages[2] },
        } : {},
      authenticationAgain,
    }))
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(actions.idCardAuthUpdate({
      name: '',
      idNo: '',
      idCardImages: {},
      authenticationAgain: false,
    }))
  }

  onChange(event, tag) {
    const { text } = event.nativeEvent
    const { dispatch, name, idNo, idCardImages, authenticationAgain } = this.props

    switch (tag) {
      case 'name':
        dispatch(actions.idCardAuthUpdate({ name: text, idNo, idCardImages, authenticationAgain }))
        break
      case 'idNo':
        dispatch(actions.idCardAuthUpdate({ name, idNo: text, idCardImages, authenticationAgain }))
        break
      default:
        break
    }
  }

  confirmPress() {
    const { dispatch, name, idNo, idCardImages, imgHashApi } = this.props
    if (!name.length) {
      Toast.message('请输入姓名')
      return
    }
    if (!idNo.length || !common.regIdCard.test(idNo)) {
      Toast.message('请输入正确的身份证号')
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
    PutObject.putObject({
      url: imgHashApi,
      path: idCardImages.first.uri,
      async: true,
      header: [{
        key: 'Content-Type',
        value: 'application/octet-stream',
      }],
      method: 'POST',
    }, (r) => {
      console.log('----r----->', r)
    })
    PutObject.mulitPutObject({
      url: imgHashApi,
      path: [idCardImages.first.uri, idCardImages.second.uri, idCardImages.third.uri],
      async: true,
      header: [{
        key: 'Content-Type',
        value: 'application/octet-stream',
      }],
      method: 'POST',
    }, (r) => {
      console.log('----rs----->', r)
    })
    // dispatch(actions.idCardAuth({
    //   name,
    //   idNo: Number(idNo),
    //   idCardImages: [
    //     idCardImages.first.hash,
    //     idCardImages.second.hash,
    //     idCardImages.third.hash,
    //   ],
    // }))
  }

  imagePicker(response, tag) {
    const { dispatch, name, idNo, idCardImages, authenticationAgain } = this.props
    switch (tag) {
      case 'first':
        idCardImages.first = { uri: response.uri, hash: '' }
        break
      case 'second':
        idCardImages.second = { uri: response.uri, hash: '' }
        break
      case 'third':
        idCardImages.third = { uri: response.uri, hash: '' }
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
      authenticationAgain,
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

  renderScrollView() {
    const { name, idNo, idCardImages } = this.props
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
  }

  renderContentView() {
    const { dispatch, name, idNo, idCardImages, user, authenticationAgain } = this.props
    if (!user.idCardAuthStatus) return null
    if (authenticationAgain) return this.renderScrollView()

    switch (user.idCardAuthStatus) {
      case common.never: case common.waiting:
        return this.renderScrollView()
      case common.pass:
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
      case common.refuse:
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
              onPress={() => {
                dispatch(actions.idCardAuthUpdate({
                  name,
                  idNo,
                  idCardImages,
                  authenticationAgain: true,
                }))
              }}
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
    const { idCardAuthVisible, user } = this.props
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: common.bgColor,
        }}
      >
        <StatusBar barStyle={'light-content'} />
        {this.renderContentView()}
        {
          user.idCardAuthStatus && user.idCardAuthStatus === common.waiting ?
            <View
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: 'transparent',
              }}
            >
              <View
                style={{
                  position: 'absolute',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  top: common.margin30,
                  width: '50%',
                  height: common.h60,
                  backgroundColor: 'white',
                  borderRadius: common.radius6,
                }}
              >
                <Text
                  style={{
                    color: common.blackColor,
                    fontSize: common.font16,
                    alignSelf: 'center',
                    textAlign: 'center',
                    lineHeight: common.margin20,
                  }}
                >{'提交成功\n请耐心等待后台审核'}</Text>
              </View>
            </View> : null
        }
        <Spinner
          style={{
            position: 'absolute',
            alignSelf: 'center',
            marginTop: common.sh / 2 - common.h50 / 2 - 64,
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
    authenticationAgain: store.user.authenticationAgain,
    idCardAuthVisible: store.user.idCardAuthVisible,
    idCardAuthResponse: store.user.idCardAuthResponse,

    imgHashApi: store.banners.imgHashApi,
  }
}

export default connect(
  mapStateToProps,
)(Authentication)
