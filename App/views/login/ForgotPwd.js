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
      nextBtnDisabled: true,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.handleGetVerificateCodeRequest(nextProps)
    this.handleGetVerificateSMPTCodeRequest(nextProps)
    this.handleCheckVerificateCodeRequest(nextProps)
    this.handleCheckVerificateSmptCodeRequest(nextProps)
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(actions.registerUpdate({
      mobile: '',
      code: '',
      password: '',
      passwordAgain: '',
    }))
  }

  onChange(event, tag) {
    const { text } = event.nativeEvent
    const { dispatch, mobile, code } = this.props

    switch (tag) {
      case 'mobile':
        this.setState({ showTip: false })
        dispatch(actions.registerUpdate({ mobile: text, code, password: '', passwordAgain: '' }))
        break
      case 'code':
        dispatch(actions.registerUpdate({ mobile, code: text, password: '', passwordAgain: '' }))
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
        service: 'reset',
      }))
      return
    }
    if (common.regEmail.test(mobile)) {
      dispatch(actions.getVerificateSmtpCode({
        email: mobile,
        service: 'reset',
      }))
      return
    }
    Toast.fail(transfer(language, 'login_inputCorrectId'))
  }

  nextPress() {
    Keyboard.dismiss()

    const { dispatch, mobile, code, language } = this.props
    if (!mobile.length) {
      Toast.fail(transfer(language, 'login_inputPhone'))
      return
    }
    if (!code.length) {
      Toast.fail(transfer(language, 'login_inputCode'))
      return
    }
    if (common.regMobile.test(mobile)) {
      dispatch(actions.checkVerificateCode({
        mobile,
        service: 'reset',
        code,
      }))
      return
    }
    if (common.regEmail.test(mobile)) {
      dispatch(actions.checksmptVerificateCode({
        email: mobile,
        service: 'reset',
        code,
      }))
      return
    }
    Toast.fail(transfer(language, 'login_inputCorrectId'))
  }

  /* 获取验证码请求结果处理 */
  handleGetVerificateCodeRequest(nextProps) {
    const { getVerificateCodeVisible, getVerificateCodeResponse, language } = nextProps
    if (!getVerificateCodeVisible && !this.showGetVerificateCodeResponse) return
    if (getVerificateCodeVisible) {
      this.showGetVerificateCodeResponse = true
    } else {
      this.showGetVerificateCodeResponse = false
      if (getVerificateCodeResponse.success) {
        Toast.success(transfer(language, 'get_code_succeed'))
        this.setState({ nextBtnDisabled: false })
      } else if (getVerificateCodeResponse.error.code === 4000101) {
        Toast.fail(transfer(language, 'login_numberOrTypeError'))
      } else if (getVerificateCodeResponse.error.code === 4000102) {
        Toast.fail(transfer(language, 'login_disbaleSendInOneMin'))
      } else if (getVerificateCodeResponse.error.code === 4000103) {
        Toast.fail(transfer(language, 'login_codeOverDue'))
      } else if (getVerificateCodeResponse.error.code === 4000104) {
        Toast.fail(transfer(language, 'login_phoneUnRegist2'))
      } else if (getVerificateCodeResponse.error.message === common.badNet) {
        Toast.fail(transfer(language, 'login_networdError'))
      } else {
        Toast.fail(transfer(language, 'login_getCodeFailed'))
      }
    }
  }

  /* 获取验证码请求结果处理 */
  handleGetVerificateSMPTCodeRequest(nextProps) {
    const { getVerificateSmtpCodeVisible, getVerificateSmtpCodeResponse, language } = nextProps
    if (!getVerificateSmtpCodeVisible && !this.showGetVerificateSMPTCodeResponse) return

    if (getVerificateSmtpCodeVisible) {
      this.showGetVerificateSMPTCodeResponse = true
    } else {
      this.showGetVerificateSMPTCodeResponse = false
      if (getVerificateSmtpCodeResponse.success) {
        Toast.success(transfer(language, 'get_code_succeed'))
        this.setState({ nextBtnDisabled: false })
      } else if (getVerificateSmtpCodeResponse.error.code === 4000101) {
        Toast.fail(transfer(language, 'login_numberOrTypeError'))
      } else if (getVerificateSmtpCodeResponse.error.code === 4000102) {
        Toast.fail(transfer(language, 'login_disbaleSendInOneMin'))
      } else if (getVerificateSmtpCodeResponse.error.code === 4000103) {
        Toast.fail(transfer(language, 'login_codeOverDue'))
      } else if (getVerificateSmtpCodeResponse.error.code === 4000104) {
        Toast.fail(transfer(language, 'login_phoneUnRegist2'))
      } else if (getVerificateSmtpCodeResponse.error.message === common.badNet) {
        Toast.fail(transfer(language, 'login_networdError'))
      } else {
        Toast.fail(transfer(language, 'login_getCodeFailed'))
      }
    }
  }

  /* 检测验证码请求结果处理 */
  handleCheckVerificateCodeRequest(nextProps) {
    const { checkVerificateCodeVisible, checkVerificateCodeResponse,
      navigation, language } = nextProps
    if (!checkVerificateCodeVisible && !this.showCheckVerificateCodeResponse) return
    if (checkVerificateCodeVisible) {
      this.showCheckVerificateCodeResponse = true
    } else {
      this.showCheckVerificateCodeResponse = false
      if (checkVerificateCodeResponse.success) {
        navigation.navigate('ConfirmPwd')
      } else if (checkVerificateCodeResponse.error.code === 4000101) {
        Toast.fail(transfer(language, 'login_numberOrTypeError'))
      } else if (checkVerificateCodeResponse.error.code === 4000102) {
        Toast.fail(transfer(language, 'login_codeError'))
      } else if (checkVerificateCodeResponse.error.code === 4000103) {
        Toast.fail(transfer(language, 'login_codeOverDue'))
      } else if (checkVerificateCodeResponse.error.message === common.badNet) {
        Toast.fail(transfer(language, 'login_networdError'))
      } else {
        Toast.fail(transfer(language, 'login_verificateFailed'))
      }
    }
  }

  /* 检测验证码请求结果处理 */
  handleCheckVerificateSmptCodeRequest(nextProps) {
    const { checkVerificateSmtpCodeVisible, checkVerificateSmtpCodeResponse,
      navigation, language } = nextProps
    if (!checkVerificateSmtpCodeVisible && !this.showCheckVerificateSMPTCodeResponse) return
    if (checkVerificateSmtpCodeVisible) {
      this.showCheckVerificateSMPTCodeResponse = true
    } else {
      this.showCheckVerificateSMPTCodeResponse = false
      if (checkVerificateSmtpCodeResponse.success) {
        navigation.navigate('ConfirmPwd')
      } else if (checkVerificateSmtpCodeResponse.error.code === 4000101) {
        Toast.fail(transfer(language, 'login_numberOrTypeError2'))
      } else if (checkVerificateSmtpCodeResponse.error.code === 4000102) {
        Toast.fail(transfer(language, 'login_codeError'))
      } else if (checkVerificateSmtpCodeResponse.error.code === 4000103) {
        Toast.fail(transfer(language, 'login_codeOverDue'))
      } else if (checkVerificateSmtpCodeResponse.error.message === common.badNet) {
        Toast.fail(transfer(language, 'login_networdError'))
      } else {
        Toast.fail(transfer(language, 'login_verificateFailed'))
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
    const { mobile, code, getVerificateCodeVisible,
      checkVerificateCodeVisible, language } = this.props
    const { nextBtnDisabled } = this.state
    let disabled = false
    if (nextBtnDisabled || getVerificateCodeVisible) {
      disabled = true
    }
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
            extraDisable={!mobile || (!common.regMobile.test(mobile) && !common.regEmail.test(mobile))}
            onChange={e => this.onChange(e, 'code')}
            textInputProps={{
              keyboardType: 'numeric',
            }}
          />
          <TKButton
            style={{
              marginTop: common.getH(227),
              backgroundColor: disabled ? common.grayColor : common.btnTextColor,
            }}
            theme={'yellow'}
            caption={transfer(language, 'login_nextStep')}
            disabled={disabled}
            onPress={() => this.nextPress()}
          />
        </KeyboardAvoidingView>
        <TKSpinner
          isVisible={checkVerificateCodeVisible}
        />
      </ScrollView>

    )
  }
}

function mapStateToProps(store) {
  return {
    mobile: store.user.mobileRegister,
    code: store.user.codeRegister,

    getVerificateCodeVisible: store.user.getVerificateCodeVisible,
    getVerificateCodeResponse: store.user.getVerificateCodeResponse,
    getVerificateSmtpCodeVisible: store.user.getVerificateSmtpCodeVisible,
    getVerificateSmtpCodeResponse: store.user.getVerificateSmtpCodeResponse,

    checkVerificateCodeVisible: store.user.checkVerificateCodeVisible,
    checkVerificateCodeResponse: store.user.checkVerificateCodeResponse,
    checkVerificateSmtpCodeVisible: store.user.checkVerificateSmtpCodeVisible,
    checkVerificateSmtpCodeResponse: store.user.checkVerificateSmtpCodeResponse,

    language: store.system.language,
  }
}

export default connect(
  mapStateToProps,
)(ForgotPwd)
