import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  Keyboard,
} from 'react-native'
import Toast from 'teaset/components/Toast/Toast'
import { common } from '../../constants/common'
import TKButton from '../../components/TKButton'
import TKSpinner from '../../components/TKSpinner'
import TKInputItem from '../../components/TKInputItem'
import TKInputItemCheckCode from '../../components/TKInputItemCheckCode'
import actions from '../../actions/index'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import transfer from '../../localization/utils'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: common.bgColor,
    paddingTop: common.getH(90) - common.navHeight,
  },
  inputView: {
    marginTop: common.getH(90),
    marginLeft: common.margin38,
    marginRight: common.margin38,
  },
  input: {
    marginLeft: 0,
  },
  inputText: {
    width: common.w100,
  },
  mobileTip: {
    position: 'absolute',
    top: common.margin5,
    left: common.w100 + common.margin48,
    fontSize: common.font12,
    color: common.redColor,
  },
})

class ForgotPwd extends Component {
  static navigationOptions(props) {
    return {
      headerStyle: {
        borderBottomWidth: 0,
      },
      headerTransparent: true,
      headerTintColor: 'white',
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
    this.showGetVerificateCodeResponse = false
    this.showGetVerificateSMPTCodeResponse = false
    this.showCheckVerificateCodeResponse = false
    this.showCheckVerificateSMPTCodeResponse = false
    this.state = {
      showTip: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.handleRequestGetCode(nextProps)
    this.HandleResetPasswordRequest(nextProps)
  }

  componentWillUnmount() {
    const { dispatch, mobile, code, password, passwordAgain } = this.props
    dispatch(actions.registerUpdate({ mobile, code, password, passwordAgain }))
  }

  onChange(event, tag) {
    const { text } = event.nativeEvent
    const { dispatch, mobile, code, password, passwordAgain } = this.props

    switch (tag) {
      case 'mobile':
        this.setState({ showTip: false })
        dispatch(actions.registerUpdate({ mobile: text, code, password, passwordAgain }))
        break
      case 'code':
        dispatch(actions.registerUpdate({ mobile, code: text, password, passwordAgain }))
        break
      case 'password':
        dispatch(actions.registerUpdate({ mobile, code, password: text, passwordAgain }))
        break
      case 'passwordAgain':
        dispatch(actions.registerUpdate({ mobile, code, password, passwordAgain: text }))
        break
      default:
        break
    }
  }

  codePress() {
    Keyboard.dismiss()

    const { dispatch, mobile, language } = this.props
    if (!mobile) {
      Toast.fail(transfer(language, 'login_idUnNull'))
      return
    }
    if (common.regMobile.test(mobile)) {
      dispatch(actions.getVerificateCode({
        mobile,
        service: 'reset_pass',
      }))
      return
    }
    if (common.regEmail.test(mobile)) {
      dispatch(actions.getVerificateCode({
        email: mobile,
        service: 'reset_pass',
      }))
      return
    }
    Toast.fail(transfer(language, 'login_inputCorrectId'))
  }

  resetPasswordPress() {
    const { dispatch, mobile, code, password, passwordAgain, language } = this.props
    if (!password.length || !common.filterPwd(password)) {
      Toast.show({
        style: {
          paddingLeft: common.margin20,
          paddingRight: common.margin20,
        },
        text: transfer(language, 'login_passFormatterError'),
      })
      return
    }
    if (!passwordAgain.length) {
      Toast.fail(transfer(language, 'login_resetPass'))
      return
    }
    if (password !== passwordAgain) {
      Toast.fail(transfer(language, 'login_passwordDidMatch'))
      return
    }
    if (common.regMobile.test(mobile)) {
      dispatch(actions.resetPassword({
        mobile,
        code,
        newpassword: password,
      }))
    } else {
      dispatch(actions.resetPassword({
        email: mobile,
        code,
        newpassword: password,
      }))
    }
  }

  errors = {
    4000107: 'AuthCode_cannot_send_verification_code_repeatedly_within_one_minute',
  }

  handleRequestGetCode(nextProps) {
    const { requestGetCodeLoading, requestGetCodeResponse, language } = nextProps
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
    }
  }

  HandleResetPasswordRequest(nextProps) {
    const { dispatch, resetPasswordVisible, resetPasswordResponse,
      navigation, language } = nextProps
    if (!resetPasswordVisible && !this.showResetPasswordResponse) return

    if (resetPasswordVisible) {
      this.showResetPasswordResponse = true
    } else {
      this.showResetPasswordResponse = false
      if (resetPasswordResponse.success) {
        Toast.success(transfer(language, 'login_resetPasswordSuccess'))
        dispatch(actions.registerUpdate({ mobile: '', code: '', password: '', passwordAgain: '' }))
        navigation.goBack('Login')
      } else if (resetPasswordResponse.error.code === 4000101) {
        Toast.fail(transfer(language, 'login_codeNotNull'))
      } else if (resetPasswordResponse.error.code === 4000102) {
        Toast.fail(transfer(language, 'login_codeError'))
      } else if (resetPasswordResponse.error.message === common.badNet) {
        Toast.fail(transfer(language, 'login_networdError'))
      } else if (resetPasswordResponse.error.code === 4000156) {
        Toast.fail(transfer(language, 'login_codeError'))
      } else {
        Toast.fail(transfer(language, 'login_resetPasswordFailed'))
      }
    }
  }

  renderMobileTip = () => {
    const { showTip } = this.state
    return (
      <View style={{ height: 40 }}>
        {showTip ?
          <Text style={styles.mobileTip}>
            {transfer(this.props.language, 'login_inputCorrectId')}
          </Text> : null}
      </View>
    )
  }

  render() {
    const { mobile, code, requestGetCodeLoading, password, passwordAgain, language } = this.props
    return (
      <ScrollView
        style={styles.container}
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustContentInsets={false}
      >
        <KeyboardAvoidingView
          contentContainerStyle={{ justifyContent: 'center' }}
          behavior="padding"
        >
          <TKInputItem
            viewStyle={styles.inputView}
            inputStyle={styles.input}
            titleStyle={styles.inputText}
            textInputProps={{
              onBlur: () => {
                if (!common.regMobile.test(mobile) && !common.regEmail.test(mobile)) {
                  this.setState({ showTip: true })
                } else {
                  this.setState({ showTip: false })
                }
              },
            }}
            title={transfer(language, 'login_id')}
            placeholder={transfer(language, 'login_idPlaceholder2')}
            value={mobile}
            onChange={e => this.onChange(e, 'mobile')}
          />
          {this.renderMobileTip()}
          <TKInputItemCheckCode
            viewStyle={[styles.inputView, { marginTop: 0 }]}
            inputStyle={styles.input}
            titleStyle={styles.inputText}
            language={language}
            title={transfer(language, 'login_code')}
            placeholder={transfer(language, 'login_enterSmsCode2')}
            value={code}
            maxLength={6}
            onPressCheckCodeBtn={() => this.codePress()}
            extraDisable={
              !mobile || (!common.regMobile.test(mobile) && !common.regEmail.test(mobile))
            }
            onChange={e => this.onChange(e, 'code')}
            textInputProps={{
              keyboardType: 'numeric',
            }}
          />
           <TKInputItem
            viewStyle={[styles.inputView, { marginTop: common.margin40 }]}
            inputStyle={styles.input}
            titleStyle={styles.inputText}
            title={transfer(language, 'login_password')}
            placeholder={transfer(language, 'me_settings_PWnew')}
            value={password}
            maxLength={common.textInputMaxLenPwd}
            onChange={e => this.onChange(e, 'password')}
            secureTextEntry
          />
          <TKInputItem
            viewStyle={[styles.inputView, { marginTop: common.margin40 }]}
            inputStyle={styles.input}
            titleStyle={styles.inputText}
            title={transfer(language, 'login_reEnterPassword')}
            placeholder={transfer(language, 'me_settings_PWnewAgain')}
            value={passwordAgain}
            maxLength={common.textInputMaxLenPwd}
            onChange={e => this.onChange(e, 'passwordAgain')}
            secureTextEntry
          />
          <TKButton
            style={{
              marginTop: common.getH(80),
              backgroundColor: common.btnTextColor,
            }}
            theme={'yellow'}
            caption={transfer(language, 'login_submit')}
            onPress={() => this.resetPasswordPress()}
          />
        </KeyboardAvoidingView>
        <TKSpinner
          isVisible={requestGetCodeLoading}
        />
      </ScrollView>

    )
  }
}

function mapStateToProps(store) {
  return {
    mobile: store.user.mobileRegister,
    code: store.user.codeRegister,

    password: store.user.passwordRegister,
    passwordAgain: store.user.passwordAgainRegister,

    resetPasswordVisible: store.user.resetPasswordVisible,
    resetPasswordResponse: store.user.resetPasswordResponse,

    requestGetCodeLoading: store.user.requestGetCodeLoading,
    requestGetCodeResponse: store.user.requestGetCodeResponse,

    language: store.system.language,
  }
}

export default connect(
  mapStateToProps,
)(ForgotPwd)
