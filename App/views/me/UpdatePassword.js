import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Image,
  ScrollView,
  StyleSheet,
  Keyboard,
  View,
  Text,
} from 'react-native'
import {
  Toast,
  Overlay,
} from 'teaset'
import {
  updateForm,
  updateAuthCodeType,
}from '../../actions/updatePassword'
import { common } from '../../constants/common'
import TextInputPwd from './TextInputPwd'
import TKButton from '../../components/TKButton'
import TKSpinner from '../../components/TKSpinner'
import actions from '../../actions/index'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import WithdrawAuthorizeCode from '../balance/components/WithdrawAuthorizeCode'
import transfer from '../../localization/utils'

const styles = StyleSheet.create({
  backBtn: {
    height: common.w40,
    width: common.w40,
    justifyContent: 'center',
  },
  backImage: {
    marginLeft: common.margin10,
    width: common.w10,
    height: common.h20,
  },
  container: {
    flex: 1,
    backgroundColor: common.bgColor,
  },
  confirmBtn: {
    marginTop: common.margin10,
  },
  input: {
    flex: undefined,
  },
  inputText: {
    width: common.w100,
  },
  txt: {
    color: common.textColor,
    fontSize: common.font14,
  },
  txtView: {
    marginTop: common.margin10,
    justifyContent: 'center',
    marginLeft: common.margin10,
  },
})

class UpdatePassword extends Component {
  static navigationOptions(props) {
    let title = ''
    if (props.navigation.state.params) {
      title = props.navigation.state.params.title
    }
    return {
      headerTitle: title,
      headerLeft: (
        <NextTouchableOpacity
          style={styles.backBtn}
          activeOpacity={common.activeOpacity}
          onPress={() => props.navigation.goBack()}
        >
          <Image
            style={styles.backImage}
            source={require('../../assets/arrow_left_left.png')}
          />
        </NextTouchableOpacity>
      ),
    }
  }

  constructor() {
    super()
    this.showUpdatePasswordResponse = false
    this.codeTitles = ['短信验证码', '谷歌验证码', '邮箱验证码']
  }

  componentWillMount() {
    const { navigation, language } = this.props
    navigation.setParams({
      title: transfer(language, 'me_settings_changePW'),
    })
  }

  componentWillReceiveProps(nextProps) {
    this.handleRequestGetCode(nextProps)
    this.handlePasswordRequest(nextProps)
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(actions.updatePasswordUpdate({
      oldPassword: '',
      newPassword: '',
      newPasswordAgain: '',
    }))
  }

  componentDidMount() {
    const { dispatch, user, loggedIn } = this.props
    if (!user) return
    dispatch(updateForm({
      smsCode: '',
      googleCode: '',
      emailCode: '',
    }))
    if(loggedIn) dispatch(actions.sync())
  }

  onChange(event, tag) {
    const { text } = event.nativeEvent
    const { dispatch, oldPassword, newPassword, newPasswordAgain } = this.props
    const newText = text.trim()
    switch (tag) {
      case 'oldPassword':
        dispatch(actions.updatePasswordUpdate({
          oldPassword: newText, newPassword, newPasswordAgain,
        }))
        break
      case 'newPassword':
        dispatch(actions.updatePasswordUpdate({
          oldPassword, newPassword: newText, newPasswordAgain,
        }))
        break
      case 'newPasswordAgain':
        dispatch(actions.updatePasswordUpdate({
          oldPassword, newPassword, newPasswordAgain: newText,
        }))
        break
      default:
        break
    }
  }

  confirmPress() {
    Keyboard.dismiss()

    const { oldPassword, newPassword, newPasswordAgain, language } = this.props
    if (!oldPassword.length) {
      Toast.fail(transfer(language, 'me_settings_oldPwdLength0'))
      return
    }
    if (!newPassword.length || !common.filterPwd(newPassword)) {
      Toast.show({
        style: {
          paddingLeft: common.margin15,
          paddingRight: common.margin15,
        },
        text: transfer(language, 'me_settings_PWillegal'),
      })
      return
    }
    if (oldPassword === newPassword) {
      Toast.fail(transfer(language, 'me_settings_PWunchange'))
      return
    }
    if (!newPasswordAgain.length) {
      Toast.fail(transfer(language, 'me_settings_PWnewAgain'))
      return
    }
    if (newPassword !== newPasswordAgain) {
      Toast.fail(transfer(language, 'me_settings_PWreminder'))
      return
    }
    this.showAuthCode()
  }

  updatePassword(link) {
    Keyboard.dismiss()
    if (link === undefined) {
      return
    }
    if (link) {
      return
    }
    const { user, authCodeType, formState, dispatch, language, oldPassword, newPassword } = this.props
    const { smsCode, googleCode, emailCode } = formState
    if (authCodeType === '短信验证码') {
      if (!smsCode || smsCode.length === 0) {
        Toast.fail(transfer(language, 'me_enter_mobileVerification'))
        return
      }
      dispatch(actions.updatePassword({
        oldpassword: oldPassword,
        newpassword: newPassword,
        mobile: user.mobile,
        code: smsCode,
      }))
      return
    }
    if (authCodeType === '谷歌验证码') {
      if (!googleCode || googleCode.length === 0) {
        Toast.fail(transfer(language, 'me_inputGoogleCode'))
        return
      }
      dispatch(actions.updatePassword({
        oldpassword: oldPassword,
        newpassword: newPassword,
        googleCode: googleCode,
      }))
      return
    }
    if (authCodeType === '邮箱验证码') {
      if (!emailCode || emailCode.length === 0) {
        Toast.fail(transfer(language, 'me_enter_EmailVerification'))
        return
      }
      dispatch(actions.updatePassword({
        oldpassword: oldPassword,
        newpassword: newPassword,
        email: user.email,
        code: emailCode,
      }))
    }
  }

  authCodeChanged = (e, code) => {
    const { dispatch, formState, authCodeType } = this.props
    if (authCodeType === '短信验证码') {
      dispatch(updateForm({
        ...formState,
        smsCode: code,
      }))
    } else if(authCodeType === '谷歌验证码'){
      dispatch(updateForm({
        ...formState,
        googleCode: code,
      }))
    } else{
      dispatch(updateForm({
        ...formState,
        emailCode: code,
      }))
    }
  }

  segmentValueChanged = (e) => {
    const { dispatch, formState } = this.props
    const title = this.codeTitles[e.index]
    dispatch(updateAuthCodeType(title))
    if (title === '谷歌验证码') {
      dispatch(updateForm({
        ...formState,
        smsCode: '',
        emailCode: '',
      }))
    } else if(title === '短信验证码'){
      dispatch(updateForm({
        ...formState,
        googleCode: '',
        emailCode: '',
      }))
    } else {
      dispatch(updateForm({
        ...formState,
        smsCode: '',
        googleCode: '',
      }))
    }
  }

  SMSCodePress = (count) => {
    this.count = count
    const { user, dispatch } = this.props
    dispatch(actions.getVerificateCode({ mobile: user.mobile, service: 'update_pass' }))
  }

  showAuthCode = () => {
    const { dispatch, user, formState, language } = this.props
    dispatch(updateAuthCodeType('短信验证码'))
    dispatch(updateForm({
      ...formState,
      smsCode: '',
      googleCode: '',
      emailCode: '',
    }))
    const overlayView = (
      <Overlay.View
        style={{ top: '35%' }}
        modal={false}
        overlayOpacity={0}
      >
        <WithdrawAuthorizeCode
          initialIndexSelected={language === 'zh_hans' ? 0 : 1}
          dispatch={this.props.dispatch}
          titles={[transfer(language, 'AuthCode_SMS_code'), transfer(language, 'AuthCode_GV_code'), transfer(language, 'AuthCode_email_code')]}
          mobile={user.mobile}
          email={user.email}
          emailStatus={user.emailStatus}
          onChangeText={this.authCodeChanged}
          segmentValueChanged={this.segmentValueChanged}
          smsCodePress={this.SMSCodePress}
          emsCodePress={(count) => {
            this.count = count
            dispatch(actions.getVerificateCode({ email: user.email, service: 'update_pass' }))
          }}
          confirmPress={link => this.updatePassword(link)}
          cancelPress={() => Overlay.hide(this.overlayViewKeyID)}
          language={language}
        />
      </Overlay.View>
    )
    this.overlayViewKeyID = Overlay.show(overlayView)
  }

  codeTitles = ['短信验证码', '谷歌验证码', '邮箱验证码']

  errors = {
    4000156: 'login_codeError',
    4000107: 'AuthCode_cannot_send_verification_code_repeatedly_within_one_minute',
    4031601: 'Otc_please_login_to_operate',
  }

  handleRequestGetCode(nextProps) {
    const { requestGetCodeLoading, requestGetCodeResponse, language, dispatch, loggedIn } = nextProps
    if (!this.props.requestGetCodeLoading || requestGetCodeLoading) {
      return
    }
    if (requestGetCodeResponse.success) {
      Toast.success(transfer(language, 'get_code_succeed'))
    }
    else{
      const msg = transfer(language, this.errors[requestGetCodeResponse.error.code])
      if (msg) Toast.fail(msg)
      else Toast.fail(transfer(language, 'AuthCode_failed_to_get_verification_code'))
      if(loggedIn) dispatch(actions.sync())
    }
  }

  handlePasswordRequest(nextProps) {
    const { updatePasswordVisible, updatePasswordResponse, navigation, language, dispatch, loggedIn } = nextProps
    if (!updatePasswordVisible && !this.showUpdatePasswordResponse) return

    if (updatePasswordVisible) {
      this.showUpdatePasswordResponse = true
    } else {
      this.showUpdatePasswordResponse = false
      if (updatePasswordResponse.success) {
        Toast.success(transfer(language, 'me_change_pwd_succeed'))
        Overlay.hide(this.overlayViewKeyID)
        navigation.goBack()
      } else if (error.code === 4031601) {
        Toast.fail(transfer(language, 'Otc_please_login_to_operate'))
      } else if (updatePasswordResponse.error.code === 4030501) {
        Toast.fail(transfer(language, 'me_settings_PWoldWrong'))
      } else if (updatePasswordResponse.error.code === 4000120) {
        Toast.fail(transfer(language, 'me_settings_PWoldWrong'))
      } else if (updatePasswordResponse.error.code === 4000121) {
        Toast.fail(transfer(language, 'me_settings_PWoldWrong'))
      } else if (updatePasswordResponse.error.code === 4000156) {
        Toast.fail(transfer(language, 'login_codeError'))
      } else if (updatePasswordResponse.error.message === common.badNet) {
        Toast.fail(transfer(language, 'me_settings_PWinternetFailed'))
      } else {
        Toast.fail(transfer(language, 'me_settings_PWchangeFailed'))
      }
      if(loggedIn) dispatch(actions.sync())
    }
  }

  render() {
    const {
      oldPassword,
      newPassword,
      newPasswordAgain,
      updatePasswordVisible,
      language,
    } = this.props
    return (
      <ScrollView
        style={styles.container}
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustContentInsets={false}
      >
        <View style={styles.txtView}>
          <Text style={styles.txt}>
            {transfer(language, 'me_settings_PWold') + ':'}
          </Text>
        </View>
        <TextInputPwd
          language={language}
          viewStyle={styles.input}
          placeholder={transfer(language, 'me_settings_PWold')}
          value={oldPassword}
          onChange={e => this.onChange(e, 'oldPassword')}
          maxLength={common.textInputMaxLenPwd}
          secureTextEntry
        />
        <View style={styles.txtView}>
          <Text style={styles.txt}>
            {transfer(language, 'login_password') + ':'}
          </Text>
        </View>
        <TextInputPwd
          language={language}
          viewStyle={styles.input}
          placeholder={transfer(language, 'me_settings_PWnew')}
          value={newPassword}
          type={'newPassword'}
          secureTextEntry
          onChange={e => this.onChange(e, 'newPassword')}
          maxLength={common.textInputMaxLenPwd}
          inputTip={transfer(language, 'me_settings_PWreminder')}
        />
        <View style={styles.txtView}>
          <Text style={styles.txt}>
            {transfer(language, 'login_reEnterPassword') + ':'}
          </Text>
        </View>
        <TextInputPwd
          language={language}
          viewStyle={styles.input}
          placeholder={transfer(language, 'me_settings_PWnewAgain')}
          value={newPasswordAgain}
          type={'newPasswordAgain'}
          newPassword={newPassword}
          newPasswordAgain={newPasswordAgain}
          onChange={e => this.onChange(e, 'newPasswordAgain')}
          maxLength={common.textInputMaxLenPwd}
          inputTip={transfer(language, 'me_settings_PWreminder')}
          secureTextEntry
        />

        <TKButton
          style={styles.confirmBtn}
          onPress={() => this.confirmPress()}
          disabled={updatePasswordVisible}
          caption={transfer(language, 'me_ID_confirm')}
          theme={'gray'}
        />

        <TKSpinner
          isVisible={updatePasswordVisible}
        />
      </ScrollView>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state.updatePassword,
    user: state.user.user,
    oldPassword: state.user.oldPassword,
    newPassword: state.user.newPassword,
    newPasswordAgain: state.user.newPasswordAgain,

    updatePasswordVisible: state.user.updatePasswordVisible,
    updatePasswordResponse: state.user.updatePasswordResponse,

    requestGetCodeLoading: state.user.requestGetCodeLoading,
    requestGetCodeResponse: state.user.requestGetCodeResponse,

    language: state.system.language,
    loggedIn: state.authorize.loggedIn,
  }
}

export default connect(
  mapStateToProps,
)(UpdatePassword)
