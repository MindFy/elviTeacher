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
import { Toast } from 'teaset'
import idcard from 'idcard'
import PutObject from 'rn-put-object'
import { common } from '../../constants/common'
import SelectImage from './SelectImage'
import TKButton from '../../components/TKButton'
import TKInputItem from '../../components/TKInputItem'
import actions from '../../actions/index'
import schemas from '../../schemas/index'
import { imgHashApi } from '../../services/api'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import transfer from '../../localization/utils'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: common.bgColor,
  },
  container1: {
    flex: 1,
    backgroundColor: common.bgColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    fontSize: 16,
    color: '#DFE4FF',
    marginHorizontal: 30,
    textAlign: 'center',
  },
  transparentView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  tips: {
    backgroundColor: 'transparent',
    color: '#dfe4ff',
    fontSize: 12,
    marginTop: common.margin10,
    marginLeft: common.margin10,
  },
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
  overlay: {
    justifyContent: 'center',
  },
  waitAuth: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  waitImage: {
    marginTop: 115,
    marginBottom: 20,
    width: 80,
    height: 80,
  },
  waitText: {
    color: '#DFE4FF',
    fontSize: 16,
  },
})

class Authentication extends Component {
  static navigationOptions(props) {
    let title = ''
    if (props.navigation.state.params) {
      title = props.navigation.state.params.title
    }
    return {
      headerTitle: title,
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
    const { dispatch, user, authenticationAgain, loggedInResult, navigation, language } = this.props
    navigation.setParams({
      title: transfer(language, 'me_identity_authentication'),
    })
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
    PutObject.removeListener('uploadProgress', this.uploadProgress)
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

    const { dispatch, name, idNo, idCardImages, language } = this.props
    if (!name.length) {
      Toast.fail(transfer(language, 'me_ID_enterName'))
      return
    }
    if (name.length < 2) {
      Toast.fail(transfer(language, 'me_ID_shorterName'))
      return
    }
    if (/\d/gi.test(name)) {
      Toast.fail(transfer(language, 'me_ID_enterCorrectName'))
      return
    }
    if (!idNo.length || !idcard.verify(idNo)) {
      Toast.fail(transfer(language, 'me_ID_correctNumber'))
      return
    }
    if (!idCardImages.first) {
      Toast.fail(transfer(language, 'me_ID_uploadIDcard_FrontPhoto'))
      return
    }
    if (!idCardImages.second) {
      Toast.fail(transfer(language, 'me_ID_uploadIDcard_BackPhoto'))
      return
    }
    if (!idCardImages.third) {
      Toast.fail(transfer(language, 'me_ID_uploadIDcard_HandPhoto'))
      return
    }
    const hash = {}
    hash[idCardImages.first.hash] = true
    hash[idCardImages.second.hash] = true
    hash[idCardImages.third.hash] = true
    const hashArr = Object.keys(hash)
    if (hashArr.length !== 3) {
      Toast.fail(transfer(language, 'me_ID_notUploadSamePhoto'))
      return
    }
    dispatch(actions.imgHash())
    const h1 = idCardImages.first.hash
    const h2 = idCardImages.second.hash
    const h3 = idCardImages.third.hash
    dispatch(actions.idCardAuth({
      name,
      idNo,
      idCardImages: [h1, h2, h3],
    }))
    // dispatch(actions.imgHash())
    // this.imgHash = true
    // PutObject.mulitPutObject({
    //   url: imgHashApi,
    //   path: [idCardImages.first.uri, idCardImages.second.uri, idCardImages.third.uri],
    //   async: true,
    //   header: [{
    //     key: 'Content-Type',
    //     value: 'application/octet-stream',
    //   }],
    //   method: 'POST',
    // }, (r) => {
    //   this.imgHash = false
    //   if (r.result && r.res) {
    //     const h1 = r.res[0] !== '' ? JSON.parse(r.res[0]).hash : ''
    //     const h2 = r.res[1] !== '' ? JSON.parse(r.res[1]).hash : ''
    //     const h3 = r.res[2] !== '' ? JSON.parse(r.res[2]).hash : ''
    //   } else {
    //     Toast.fail(transfer(language, 'me_ID_uploadPhotoFailed'))
    //     dispatch(actions.imgHashFailed())
    //   }
    // })
  }

  imagePicker(err, uri, tag) {
    if (err) {
      Toast.fail(err)
      return
    }
    const { dispatch, name, idNo, idCardImages, authenticationAgain } = this.props
    let target
    switch (tag) {
      case 'first':
        idCardImages.first = { uri }
        target = this.image1
        break
      case 'second':
        idCardImages.second = { uri }
        target = this.image2
        break
      case 'third':
        idCardImages.third = { uri }
        target = this.image3
        break
      default:
        break
    }
    target.setStatus(1)
    PutObject.putObject({
      url: imgHashApi,
      path: uri,
      async: true,
      header: [{
        key: 'Content-Type',
        value: 'application/octet-stream',
      }],
      method: 'POST',
    }, (r) => {
      let hash
      if (r.result) {
        target.setStatus(2)
        hash = JSON.parse(r.res).hash
      } else {
        target.setStatus(3)
      }
      const idCardImages2 = this.props.idCardImages
      if (tag === 'first') {
        idCardImages2.first = { uri, hash }
      } else if (tag === 'second') {
        idCardImages2.second = { uri, hash }
      } else {
        idCardImages2.third = { uri, hash }
      }
      this.imageUpdate(
        dispatch,
        this.props.name,
        this.props.idNo,
        idCardImages2.first,
        idCardImages2.second,
        idCardImages2.third,
        this.props.authenticationAgain,
      )
    })
    this.imageUpdate(
      dispatch,
      name,
      idNo,
      idCardImages.first,
      idCardImages.second,
      idCardImages.third,
      authenticationAgain,
    )
  }

  imageUpdate(dispatch, name, idNo, first, second, third, again) {
    dispatch(actions.idCardAuthUpdate({
      name,
      idNo,
      idCardImages: {
        first,
        second,
        third,
      },
      authenticationAgain: again,
    }))
  }

  handleIdCardAuthRequest(nextProps) {
    const { idCardAuthResponse } = nextProps
    const { language } = this.props
    if (idCardAuthResponse && idCardAuthResponse !== this.props.idCardAuthResponse) {
      if (idCardAuthResponse.success) {
        Toast.success(transfer(language, 'me_ID_Submit_success'))
      } else if (idCardAuthResponse.error.code === 4000150) {
        Toast.fail(transfer(language, 'me_ID_AuthFailedInfo'))
      } else if (idCardAuthResponse.error.code === 4000151) {
        Toast.fail(transfer(language, 'me_ID_numberWrong'))
      } else if (idCardAuthResponse.error.code === 4000155) {
        Toast.fail(transfer(language, 'me_ID_numberExisted'))
      } else if (idCardAuthResponse.error.code === 4000156) {
        Toast.fail(transfer(language, 'login_codeError'))
      } else {
        Toast.fail(transfer(language, 'me_ID_AuthFailed'))
      }
    }
  }

  renderScrollView() {
    const { name, idNo, idCardImages, language } = this.props
    return (
      <ScrollView
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustContentInsets={false}
      >
        <KeyboardAvoidingView
          contentContainerStyle={{ justifyContent: 'center' }}
          behavior="padding"
        >
          {/* <Text style={styles.tips}>{transfer(language, 'me_idcard_auth_tips')}</Text> */}
          <TKInputItem
            viewStyle={styles.inputView}
            inputStyle={{ fontSize: common.font14 }}
            placeholder={transfer(language, 'me_ID_name')}
            value={name}
            onChange={e => this.onChange(e, 'name')}
          />
          <TKInputItem
            viewStyle={styles.inputView}
            inputStyle={{ fontSize: common.font14 }}
            placeholder={transfer(language, 'me_ID_number')}
            value={idNo}
            maxLength={common.textInputMaxLenIdNo}
            onChange={e => this.onChange(e, 'idNo')}
            keyboardType={'numbers-and-punctuation'}
          />

          <SelectImage
            ref={(e) => { this.image1 = e }}
            title={transfer(language, 'me_ID_uploadIDcard_FrontPhoto')}
            onPress={() => Keyboard.dismiss()}
            language={language}
            imagePickerBlock={(err, response) => this.imagePicker(err, response, 'first')}
            avatarSource={idCardImages.first ? idCardImages.first.uri : undefined}
          />
          <SelectImage
            ref={(e) => { this.image2 = e }}
            title={transfer(language, 'me_ID_uploadIDcard_BackPhoto')}
            onPress={() => Keyboard.dismiss()}
            language={language}
            imagePickerBlock={(err, response) => this.imagePicker(err, response, 'second')}
            avatarSource={idCardImages.second ? idCardImages.second.uri : undefined}
          />
          <SelectImage
            ref={(e) => { this.image3 = e }}
            title={transfer(language, 'me_ID_uploadIDcard_HandPhoto')}
            onPress={() => Keyboard.dismiss()}
            language={language}
            imagePickerBlock={(err, response) => this.imagePicker(err, response, 'third')}
            avatarSource={idCardImages.third ? idCardImages.third.uri : undefined}
          />

          <TKButton
            style={{ marginTop: common.margin40 }}
            onPress={() => this.confirmPress()}
            caption={transfer(language, 'me_ID_confirm')}
            theme={'gray'}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }

  renderSucceed() {
    const { language } = this.props
    return (
      <ScrollView>
        <Image
          style={styles.imageSucceed}
          source={require('../../assets/success.png')}
        />
        <Text style={styles.titleSucceed}>
          {transfer(language, 'me_ID_Authentication_success')}
        </Text>
      </ScrollView >
    )
  }

  renderFailed() {
    const { dispatch, findAuditmanageData, language } = this.props
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
          {transfer(language, 'me_ID_Authentication_failed')}
        </Text>
        <Text style={[styles.titleSucceed, { marginTop: common.margin10 }]}>
          {transfer(language, 'me_ID_Auth_failedReasonReminder')}{reason}
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
          >{transfer(language, 'me_ID_Authentication_again')}</Text>
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
  renderWaitingTip(language) {
    return (
      <View style={styles.waitAuth}>
        <Image
          resizeMode="contain"
          style={styles.waitImage}
          source={require('../../assets/wait.png')}
        />
        <Text style={styles.waitText}>
          {transfer(language, 'auth_wait_auth')}
        </Text>
      </View>
    )
  }

  renderChineseVisible(language) {
    return (
      <View
        style={styles.container1}
      >
        <Text style={styles.txt}>{transfer(language, 'otc_visible_chinese')}</Text>
      </View>
    )
  }

  render() {
    const { idCardAuthVisible, user, language } = this.props
    if (language !== 'zh_hans') {
      return this.renderChineseVisible(language)
    }
    const isShowWaitingTip =
      user && user && user.idCardAuthStatus && user.idCardAuthStatus === common.user.status.waiting
    const contentView = !isShowWaitingTip && this.renderContentView()
    const waitingTip = isShowWaitingTip && this.renderWaitingTip(language)
    let transparentView = null
    if (idCardAuthVisible) {
      transparentView = <View style={styles.transparentView} />
    }
    return (
      <View style={styles.container}>
        {contentView}
        {waitingTip}
        {transparentView}
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
    language: state.system.language,
  }
}

export default connect(
  mapStateToProps,
)(Authentication)
