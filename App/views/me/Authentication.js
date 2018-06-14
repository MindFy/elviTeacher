import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  DeviceEventEmitter,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native'
import Toast from 'teaset/components/Toast/Toast'
import idcard from 'idcard'
import PutObject from 'rn-put-object'
import { common } from '../../constants/common'
import SelectImage from './SelectImage'
import TKButton from '../../components/TKButton'
import TKSpinner from '../../components/TKSpinner'
import TKInputItem from '../../components/TKInputItem'
import actions from '../../actions/index'
import schemas from '../../schemas/index'
import { imgHashApi } from '../../services/api'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'

const styles = StyleSheet.create({
  inputView: {
    marginTop: common.margin10,
    marginLeft: common.margin10,
    marginRight: common.margin10,
  },
  imageSucceed: {
    marginTop: common.margin127,
    width: common.h80,
    height: common.h80,
    alignSelf: 'center',
  },
  titleSucceed: {
    marginTop: common.margin20,
    color: common.textColor,
    fontSize: common.font16,
    alignSelf: 'center',
    textAlign: 'center',
  },
})

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
      headerLeft: (
        <NextTouchableOpacity
          style={{
            height: common.w40,
            width: common.w40,
            justifyContent: 'center',
          }}
          activeOpacity={common.activeOpacity}
          onPress={() => props.navigation.goBack()}
        >
          <Image
            style={{
              marginLeft: common.margin10,
              width: common.w10,
              height: common.h20,
            }}
            source={require('../../assets/arrow_left_left.png')}
          />
        </NextTouchableOpacity>
      ),
    }
  }

  constructor() {
    super()
    this.showIdCardAuthResponse = false
    this.imgHash = false
  }

  componentDidMount() {
    const { dispatch, user, authenticationAgain, loggedInResult } = this.props
    dispatch(actions.findUser(schemas.findUser(loggedInResult.id)))
    dispatch(actions.findAuditmanage(schemas.findAuditmanage(loggedInResult.id)))
    this.listener = DeviceEventEmitter.addListener(common.noti.idCardAuth, () => {
      user.idCardAuthStatus = common.user.status.waiting
      dispatch(actions.findUserUpdate(JSON.parse(JSON.stringify(user))))
      dispatch(actions.findUser(schemas.findUser(user.id)))
      dispatch(actions.findAuditmanage(schemas.findAuditmanage(user.id, user.idCardAuthStatus)))
    })
    if (!user) {
      return
    }
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

  componentWillReceiveProps(nextProps) {
    this.handleIdCardAuthRequest(nextProps)
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(actions.idCardAuthUpdate({
      name: '',
      idNo: '',
      idCardImages: {},
      authenticationAgain: false,
    }))
    this.listener.remove()
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
    Keyboard.dismiss()

    const { dispatch, name, idNo, idCardImages } = this.props
    if (!name.length) {
      Toast.fail('请输入姓名')
      return
    }
    if (!idNo.length || !idcard.verify(idNo)) {
      Toast.fail('请输入正确的身份证号')
      return
    }
    if (!idCardImages.first) {
      Toast.fail('请上传身份证正面照片')
      return
    }
    if (!idCardImages.second) {
      Toast.fail('请上传身份证反面照片')
      return
    }
    if (!idCardImages.third) {
      Toast.fail('请上传手持身份证照片')
      return
    }

    const hash = {}
    hash[idCardImages.first.hash] = true
    hash[idCardImages.second.hash] = true
    hash[idCardImages.third.hash] = true
    const hashArr = Object.keys(hash)
    if (hashArr.length !== 3) {
      Toast.fail('请勿上传相同照片')
      return
    }

    dispatch(actions.imgHash())
    this.imgHash = true
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
      this.imgHash = false
      if (r.result && r.res) {
        const h1 = r.res[0] !== '' ? JSON.parse(r.res[0]).hash : ''
        const h2 = r.res[1] !== '' ? JSON.parse(r.res[1]).hash : ''
        const h3 = r.res[2] !== '' ? JSON.parse(r.res[2]).hash : ''
        if (!h1.length || !h2.length || !h3.length) {
          Toast.fail('图片上传失败')
          dispatch(actions.imgHashFailed())
        } else if ((h1 === h2)
          || (h1 === h3)
          || (h2 === h3)) {
          Toast.fail('请勿上传相同照片')
          dispatch(actions.imgHashFailed())
        } else {
          dispatch(actions.idCardAuth({
            name,
            idNo,
            idCardImages: [h1, h2, h3],
          }))
        }
      } else {
        Toast.fail('图片上传失败')
        dispatch(actions.imgHashFailed())
      }
    })
  }

  imagePicker(err, uri, hash, tag) {
    if (err) {
      Toast.fail(err)
      return
    }
    const { dispatch, name, idNo, idCardImages, authenticationAgain } = this.props
    switch (tag) {
      case 'first':
        idCardImages.first = { uri, hash }
        break
      case 'second':
        idCardImages.second = { uri, hash }
        break
      case 'third':
        idCardImages.third = { uri, hash }
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

  handleIdCardAuthRequest(nextProps) {
    const { idCardAuthResponse } = nextProps
    if (idCardAuthResponse && idCardAuthResponse !== this.props.idCardAuthResponse) {
      if (idCardAuthResponse.success) {
        Toast.success(idCardAuthResponse.result)
      } else if (idCardAuthResponse.error.code === 4000150) {
        Toast.fail('身份认证失败，请确认信息是否正确')
      } else if (idCardAuthResponse.error.code === 4000151) {
        Toast.fail('身份证号错误')
      } else if (idCardAuthResponse.error.code === 4000155) {
        Toast.fail('身份证号已存在')
      } else {
        Toast.fail('身份认证失败')
      }
    }
  }

  renderScrollView() {
    const { name, idNo, idCardImages } = this.props
    return (
      <ScrollView
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustContentInsets={false}
      >
        <KeyboardAvoidingView
          contentContainerStyle={{ justifyContent: 'center' }}
          behavior="padding"
        >
          <TKInputItem
            viewStyle={styles.inputView}
            inputStyle={{ fontSize: common.font14 }}
            placeholder="姓名"
            value={name}
            onChange={e => this.onChange(e, 'name')}
          />
          <TKInputItem
            viewStyle={styles.inputView}
            inputStyle={{ fontSize: common.font14 }}
            placeholder="身份证号"
            value={idNo}
            maxLength={common.textInputMaxLenIdNo}
            onChange={e => this.onChange(e, 'idNo')}
            keyboardType={'numbers-and-punctuation'}
          />

          <SelectImage
            title={'请上传身份证正面照片'}
            onPress={() => Keyboard.dismiss()}
            imagePickerBlock={(err, response, hash) => this.imagePicker(err, response, hash, 'first')}
            avatarSource={idCardImages.first ? idCardImages.first.uri : undefined}
          />
          <SelectImage
            title={'请上传身份证反面照片'}
            onPress={() => Keyboard.dismiss()}
            imagePickerBlock={(err, response, hash) => this.imagePicker(err, response, hash, 'second')}
            avatarSource={idCardImages.second ? idCardImages.second.uri : undefined}
          />
          <SelectImage
            title={'请上传手持身份证照片'}
            onPress={() => Keyboard.dismiss()}
            imagePickerBlock={(err, response, hash) => this.imagePicker(err, response, hash, 'third')}
            avatarSource={idCardImages.third ? idCardImages.third.uri : undefined}
          />

          <TKButton
            style={{ marginTop: common.margin40 }}
            onPress={() => this.confirmPress()}
            caption="确认"
            theme={'gray'}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }

  renderSucceed() {
    return (
      <ScrollView>
        <Image
          style={styles.imageSucceed}
          source={require('../../assets/success.png')}
        />
        <Text style={styles.titleSucceed}>
          恭喜！身份认证成功！
        </Text>
      </ScrollView>
    )
  }

  renderFailed() {
    const { dispatch, findAuditmanageData } = this.props
    let reason = ''
    try {
      if (findAuditmanageData) {
        reason = findAuditmanageData[0].auditdata.refuseReason
      }
    } catch (ex) {
      reason = ''
    }
    return (
      <ScrollView>
        <Image
          style={styles.imageSucceed}
          source={require('../../assets/failed.png')}
        />
        <Text style={styles.titleSucceed}>
          抱歉！您的身份认证未通过审核！
        </Text>
        <Text style={[styles.titleSucceed, { marginTop: common.margin10 }]}>
          失败原因：{reason}
        </Text>
        <NextTouchableOpacity
          activeOpacity={common.activeOpacity}
          onPress={() => {
            dispatch(actions.idCardAuthUpdate({
              name: '',
              idNo: '',
              idCardImages: {},
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
        </NextTouchableOpacity>
      </ScrollView>
    )
  }

  renderContentView() {
    const { user, authenticationAgain } = this.props
    if (!user || !user.idCardAuthStatus) return null
    if (authenticationAgain) return this.renderScrollView()

    switch (user.idCardAuthStatus) {
      case common.user.status.never: case common.user.status.waiting:
        return this.renderScrollView()
      case common.user.status.pass:
        return this.renderSucceed()
      case common.user.status.refuse:
        return this.renderFailed()
      default:
        return null
    }
  }

  renderWaitingTip = () => (
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
    </View>
  )

  render() {
    const { idCardAuthVisible, user } = this.props
    const isShowWaitingTip =
      user && user && user.idCardAuthStatus && user.idCardAuthStatus === common.user.status.waiting
    const contentView = !isShowWaitingTip && this.renderContentView()
    const waitingTip = isShowWaitingTip && this.renderWaitingTip()
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: common.bgColor,
        }}
      >
        {contentView}
        {waitingTip}
        <TKSpinner
          isVisible={idCardAuthVisible}
        />
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.user,
    name: state.user.name,
    idNo: state.user.idNo,
    idCardImages: state.user.idCardImages,
    authenticationAgain: state.user.authenticationAgain,
    idCardAuthVisible: state.user.idCardAuthVisible,
    idCardAuthResponse: state.user.idCardAuthResponse,
    findAuditmanageData: state.user.findAuditmanageData,

    loggedInResult: state.authorize.loggedInResult,
  }
}

export default connect(
  mapStateToProps,
)(Authentication)
