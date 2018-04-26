import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native'
import {
  Toast,
  Overlay,
} from 'teaset'
import Spinner from 'react-native-spinkit'
import { common } from '../../constants/common'
import TextInputPwd from './TextInputPwd'
import BtnLogout from './BtnLogout'
import TKViewCheckAuthorize from '../../components/TKViewCheckAuthorize'
import actions from '../../actions/index'

class UpdatePassword extends Component {
  static navigationOptions(props) {
    return {
      headerTitle: '修改密码',
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
    this.showUpdatePasswordResponse = false
  }

  componentWillUnmount() {
    const { dispatch, mobile, password, passwordAgain } = this.props
    dispatch(actions.registerUpdate({ mobile, code: '', password, passwordAgain }))
    dispatch(actions.updatePasswordUpdate({
      oldPassword: '',
      newPassword: '',
      newPasswordAgain: '',
    }))
  }

  onChange(event, tag) {
    const { text } = event.nativeEvent
    const { dispatch, oldPassword, newPassword, newPasswordAgain,
      mobile, password, passwordAgain } = this.props

    switch (tag) {
      case 'oldPassword':
        dispatch(actions.updatePasswordUpdate({ oldPassword: text, newPassword, newPasswordAgain }))
        break
      case 'newPassword':
        dispatch(actions.updatePasswordUpdate({ oldPassword, newPassword: text, newPasswordAgain }))
        break
      case 'newPasswordAgain':
        dispatch(actions.updatePasswordUpdate({ oldPassword, newPassword, newPasswordAgain: text }))
        break
      case 'code':
        dispatch(actions.registerUpdate({ mobile, code: text, password, passwordAgain }))
        break
      default:
        break
    }
  }

  confirmPress() {
    const { oldPassword, newPassword, newPasswordAgain } = this.props
    if (!oldPassword.length) {
      Toast.message('请输入旧密码')
      return
    }
    if (!newPassword.length || !common.regPassword.test(newPassword)
      || !common.regSpace.test(newPassword)) {
      Toast.message(common.regPasswordMsg)
      return
    }
    if (!newPasswordAgain.length) {
      Toast.message('请再次输入新密码')
      return
    }
    if (newPassword !== newPasswordAgain) {
      Toast.message('新密码输入不一致')
      return
    }
    this.showOverlay()
  }

  updatePassword() {
    const { dispatch, oldPassword, newPassword } = this.props
    dispatch(actions.updatePassword({
      oldpassword: oldPassword,
      newpassword: newPassword,
    }))
  }

  showOverlay() {
    const { dispatch, user, code } = this.props
    const overlayView = (
      <Overlay.View
        style={{
          justifyContent: 'center',
        }}
        modal={false}
        overlayOpacity={0}
      >
        <TKViewCheckAuthorize
          mobile={user.mobile}
          code={code}
          onChange={e => this.onChange(e, 'code')}
          codePress={() => {
            dispatch(actions.getVerificateCode({ mobile: user.mobile, service: 'auth' }))
          }}
          confirmPress={() => {
            dispatch(actions.checkVerificateCode({ mobile: this.props.user.mobile, service: 'auth', code: this.props.code }))
          }}
          cancelPress={() => Overlay.hide(this.overlayViewKey)}
        />
      </Overlay.View>
    )
    this.overlayViewKey = Overlay.show(overlayView)
  }

  handleCheckVerificateCodeRequest() {
    const { checkVerificateCodeVisible, checkVerificateCodeResponse } = this.props
    if (!checkVerificateCodeVisible && !this.showCheckVerificateCodeResponse) return

    if (checkVerificateCodeVisible) {
      this.showCheckVerificateCodeResponse = true
    } else {
      this.showCheckVerificateCodeResponse = false
      if (checkVerificateCodeResponse.success) {
        this.updatePassword()
      } else {
        Toast.fail(checkVerificateCodeResponse.error.message)
      }
    }
  }

  handleGetVerificateCodeRequest() {
    const { getVerificateCodeVisible, getVerificateCodeResponse } = this.props
    if (!getVerificateCodeVisible && !this.showGetVerificateCodeResponse) return

    if (getVerificateCodeVisible) {
      this.showGetVerificateCodeResponse = true
    } else {
      this.showGetVerificateCodeResponse = false
      if (getVerificateCodeResponse.success) {
        Toast.success(getVerificateCodeResponse.result.message)
      } else {
        Toast.message(getVerificateCodeResponse.error.message)
      }
    }
  }

  handlePasswordRequest() {
    const { updatePasswordVisible, updatePasswordResponse, navigation } = this.props
    if (!updatePasswordVisible && !this.showUpdatePasswordResponse) return

    if (updatePasswordVisible) {
      this.showUpdatePasswordResponse = true
    } else {
      this.showUpdatePasswordResponse = false
      if (updatePasswordResponse.success) {
        Toast.success(updatePasswordResponse.result.message)
        Overlay.hide(this.overlayViewKey)
        navigation.goBack()
      } else {
        Toast.fail(updatePasswordResponse.error.message)
      }
    }
  }

  render() {
    this.handlePasswordRequest()
    this.handleCheckVerificateCodeRequest()
    this.handleGetVerificateCodeRequest()

    const { oldPassword, newPassword, newPasswordAgain, updatePasswordVisible } = this.props
    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: common.bgColor,
        }}
        behavior="padding"
      >
        <ScrollView>
          <StatusBar
            barStyle={'light-content'}
          />

          <TextInputPwd
            placeholder={'旧密码'}
            value={oldPassword}
            onChange={e => this.onChange(e, 'oldPassword')}
            maxLength={common.textInputMaxLenPwd}
            secureTextEntry
          />
          <TextInputPwd
            placeholder={'输入密码'}
            value={newPassword}
            password={newPassword}
            secureTextEntry
            onChange={e => this.onChange(e, 'newPassword')}
            maxLength={common.textInputMaxLenPwd}
          />
          <TextInputPwd
            placeholder={'再次输入密码'}
            value={newPasswordAgain}
            onChange={e => this.onChange(e, 'newPasswordAgain')}
            maxLength={common.textInputMaxLenPwd}
            secureTextEntry
          />

          <BtnLogout
            viewStyle={{
              marginLeft: common.margin10,
              marginRight: common.margin10,
            }}
            onPress={() => this.confirmPress()}
            disabled={updatePasswordVisible}
            title="确认"
          />
        </ScrollView>

        <Spinner
          style={{
            position: 'absolute',
            alignSelf: 'center',
            marginTop: common.sh / 2 - common.h50 / 2 - 64,
          }}
          isVisible={updatePasswordVisible}
          size={common.h50}
          type={'Wave'}
          color={common.btnTextColor}
        />
      </KeyboardAvoidingView>
    )
  }
}

function mapStateToProps(store) {
  return {
    oldPassword: store.user.oldPassword,
    newPassword: store.user.newPassword,
    newPasswordAgain: store.user.newPasswordAgain,

    updatePasswordVisible: store.user.updatePasswordVisible,
    updatePasswordResponse: store.user.updatePasswordResponse,

    user: store.user.user,
    mobile: store.user.mobileRegister,
    code: store.user.codeRegister,
    password: store.user.passwordRegister,
    passwordAgain: store.user.passwordAgainRegister,

    getVerificateCodeVisible: store.user.getVerificateCodeVisible,
    getVerificateCodeResponse: store.user.getVerificateCodeResponse,

    checkVerificateCodeVisible: store.user.checkVerificateCodeVisible,
    checkVerificateCodeResponse: store.user.checkVerificateCodeResponse,
  }
}

export default connect(
  mapStateToProps,
)(UpdatePassword)
