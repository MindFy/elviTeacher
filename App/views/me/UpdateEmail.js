import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Image,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  View,
  Text,
} from 'react-native'
import {
  Toast,
} from 'teaset'
import { common } from '../../constants/common'
import TKButton from '../../components/TKButton'
import TKSpinner from '../../components/TKSpinner'
import TKInputItem from '../../components/TKInputItem'
import TKInputItemCheckCode from '../../components/TKInputItemCheckCode'
import actions from '../../actions/index'
import schemas from '../../schemas/index'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import transfer from '../../localization/utils'
import cache from '../../utils/cache'

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
  email: {
    marginTop: common.margin10,
    marginLeft: common.margin10,
    marginRight: common.margin10,
  },
  tipsContainer: {
    marginTop: common.margin15,
    color: common.textColor,
    fontSize: common.font12,
  },
  tipsContent: {
    marginTop: common.margin10,
    color: common.textColor,
    fontSize: common.font10,
    lineHeight: 14,
  },
  viewStyle: {
    marginTop: common.margin10,
    marginLeft: common.margin10,
    marginRight: common.margin10,
    height: common.h40,
    backgroundColor: common.navBgColor,
    borderColor: common.borderColor,
    borderWidth: 1,
    borderRadius: 1,
    justifyContent: 'center',
  },
  inputStyle: {
    marginLeft: common.margin10,
    width: '80%',
    fontSize: common.font12,
    color: 'white',
  },
  inputText: {
    width: common.w100,
  },
})

class UpdateEmail extends Component {
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

  constructor(props) {
    super(props)
    this.showGetVerificateSmtpCodeResponse = false
    props.navigation.addListener('didFocus', () => {
      cache.setObject('currentComponentVisible', 'UpdateEmail')
      props.dispatch(actions.getGoogleAuth(schemas.findUser(props.user.id)))
    })
  }

  componentDidMount() {
    const { navigation, language, dispatch, loggedIn } = this.props
    navigation.setParams({
      title: transfer(language, 'me_linkEmail'),
    })
    if(loggedIn) dispatch(actions.sync())
  }

  componentWillReceiveProps(nextProps) {
    this.handleRequestGetCode(nextProps)
    this.handleUpdateEmailRequest(nextProps)
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(actions.updateEmailMobileUpdate({ email: '', codeEmail: '', mobile: '', codeMobile: '', codeGoogle: '' }))
  }

  onChange(event, tag) {
    const { text } = event.nativeEvent
    const { dispatch, email, codeEmail, codeMobile, codeGoogle  } = this.props

    switch (tag) {
      case 'email':
        dispatch(actions.updateEmailMobileUpdate({ email: text.trim(), codeEmail, codeMobile, codeGoogle }))
        break
      case 'codeEmail':
        dispatch(actions.updateEmailMobileUpdate({ email, codeEmail: text.trim(), codeMobile, codeGoogle }))
        break
      case 'codeMobile':
        dispatch(actions.updateEmailMobileUpdate({ email, codeEmail, codeMobile: text.trim(), codeGoogle }))
        break
      case 'codeGoogle':
        dispatch(actions.updateEmailMobileUpdate({ email, codeEmail, codeMobile, codeGoogle: text.trim() }))
        break
      default:
        break
    }
  }

  sendCodeEmail(count) {
    const { dispatch, email, language } = this.props
    if (!email.length || !common.regEmail.test(email)) {
      Toast.fail(transfer(language, 'me_Email_correctFormat'))
      return
    }
    this.count = count
    dispatch(actions.getVerificateCode({
      email,
      service: 'update_email',
    }))
  }

  sendCodeMobile(count) {
    const { dispatch, user, language } = this.props
    if (!user.mobile.length || !common.regMobile.test(user.mobile)) {
      Toast.fail(transfer(language, 'me_Mobile_correctFormat'))
      return
    }
    this.count = count
    dispatch(actions.getVerificateCode({
      mobile: user.mobile,
      service: 'update_email',
    }))
  }

  confirmPress() {
    Keyboard.dismiss()

    const { dispatch, user, email, codeEmail, codeMobile, codeGoogle, googleAuth, language } = this.props
    if (!email.length || !common.regEmail.test(email)) {
      Toast.fail(transfer(language, 'me_Email_correctFormat'))
      return
    }

    if (!codeEmail.length) {
      Toast.fail(transfer(language, 'me_enter_EmailVerification'))
      return
    }

    if(googleAuth){
      if (!codeGoogle.length) {
        Toast.fail(transfer(language, 'me_enter_GoogleVerification'))
        return
      }
      dispatch(actions.updateEmail({
        email,
        emailCode: codeEmail,
        googleCode: codeGoogle,
      }))
    } else{
      if (!codeMobile.length) {
        Toast.fail(transfer(language, 'me_enter_MobileVerification'))
        return
      }
      dispatch(actions.updateEmail({
        email,
        emailCode: codeEmail,
        mobile: user.mobile,
        mobileCode: codeMobile,
      }))
    }
  }

  SMSCodePress = (count) => {
    this.count = count
    const { user, dispatch } = this.props
    dispatch(actions.getVerificateCode({ mobile: user.mobile, service: 'update_email' }))
  }

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
    }
    if(loggedIn) dispatch(actions.sync())
  }

  handleUpdateEmailRequest(nextProps) {
    const { updateEmailVisible, updateEmailError, updateEmailResult } = nextProps
    const { user, language, dispatch, navigation, loggedIn } = this.props
    if (!updateEmailVisible && this.props.updateEmailVisible) {
      if (updateEmailError) {
        if (updateEmailError.message === common.badNet) {
          Toast.fail(transfer(language, 'OtcDetail_net_error'))
        } else {
          const msg = this.errors[updateEmailError.code]
          if (msg) Toast.fail(transfer(language, msg))
          else Toast.fail(transfer(language, 'me_Email_bind_failed'))
        }
        if(loggedIn) dispatch(actions.sync())
      }
      if (updateEmailResult) {
        Toast.success(transfer(language, 'me_Email_binded'))
        user.emailStatus = common.user.status.bind
        dispatch(actions.findUserUpdate(JSON.parse(JSON.stringify(user))))
        dispatch(actions.findUser(schemas.findUser(user.id)))
        navigation.goBack()
      }
    }
  }

  handleGetVerificateCodeRequest(nextProps) {
    const { language, dispatch, loggedIn } = this.props
    const { requestGetCodeLoading, requestGetCodeResponse } = nextProps
    if (!requestGetCodeLoading && !this.showGetVerificateSmtpCodeResponse) return

    if (requestGetCodeLoading) {
      this.showGetVerificateSmtpCodeResponse = true
    } else {
      this.showGetVerificateSmtpCodeResponse = false
      if (requestGetCodeResponse.success) {
        this.count()
        Toast.success(transfer(language, 'get_code_succeed'))
      } else if (requestGetCodeResponse.error.code === 4000107) {
        Toast.fail(transfer(language, 'me_Email_repeatMinute'))
      } else {
        Toast.fail(transfer(language, 'me_Email_getCodeFailed'))
      }
      if(loggedIn) dispatch(actions.sync())
    }
  }

  renderTip = () => (
    <View style={{ marginHorizontal: common.margin10 }}>
      <Text
        style={styles.tipsContainer}
      >
        {transfer(this.props.language, 'me_Email_pleaes_note')}
      </Text>
      <Text
        style={styles.tipsContent}
      >
        {transfer(this.props.language, 'me_Email_note_content')}
      </Text>
    </View>
  )

  render() {
    const { email, codeEmail, codeMobile, codeGoogle, updateEmailVisible, user, language, googleAuth } = this.props
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
      >
        <ScrollView
          style={styles.container}
          keyboardShouldPersistTaps="handled"
          automaticallyAdjustContentInsets={false}
        >
          <TKInputItem
            viewStyle={styles.email}
            titleStyle={styles.inputText}
            title={transfer(language, 'AuthCode_email_tip')}
            placeholder={transfer(language, 'me_enter_EmailAddress')}
            value={email}
            onChange={e => this.onChange(e, 'email')}
            editable={user.emailStatus !== common.user.status.bind}
          />
          {
            user.emailStatus === common.user.status.bind ? null
              : <TKInputItemCheckCode
              viewStyle={styles.viewStyle}
              inputStyle={styles.inputStyle}
              titleStyle={styles.inputText}
              title={transfer(language, 'AuthCode_email_code')}
              language={language}
              placeholder={transfer(language, 'me_enter_EmailVerification')}
              value={codeEmail}
              maxLength={8}
              extraDisable={
                !email || !common.regEmail.test(email)
              }
              onPressCheckCodeBtn={() => this.sendCodeEmail()}
              onChange={e => this.onChange(e, 'codeEmail')}
              textInputProps={{
                keyboardType: 'numeric',
              }}
            />
          }
          {
            !googleAuth ? null
              : <TKInputItem
                viewStyle={styles.email}
                titleStyle={styles.inputText}
                title={transfer(language, 'me_googleCode')}
                placeholder={transfer(language, 'me_inputGoogleCode')}
                value={codeGoogle}
                maxLength={6}
                onChange={e => this.onChange(e, 'codeGoogle')}
              /> 
          }
          {
            googleAuth ? null
              : <TKInputItem
                viewStyle={styles.email}
                titleStyle={styles.inputText}
                title={transfer(language, 'AuthCode_mobile_tip')}
                placeholder={transfer(language, 'login_inputPhone')}
                value={common.maskMobile(user.mobile || '')}
                editable={false}
              />
          }
          {
            googleAuth ? null
              : <TKInputItemCheckCode
                viewStyle={styles.viewStyle}
                inputStyle={styles.inputStyle}
                titleStyle={styles.inputText}
                title={transfer(language, 'AuthCode_sms_tip')}
                language={language}
                placeholder={transfer(language, 'me_enter_mobileVerification')}
                value={codeMobile}
                maxLength={6}
                onPressCheckCodeBtn={() => this.sendCodeMobile()}
                onChange={e => this.onChange(e, 'codeMobile')}
                textInputProps={{
                  keyboardType: 'numeric',
                }}
              />
          }

          {user.emailStatus !== common.user.status.bind && this.renderTip()}

          <TKButton
            style={{
              marginTop: user.emailStatus === common.user.status.bind
                ? common.margin10 : common.margin20,
              backgroundColor: user.emailStatus === common.user.status.bind
                ? 'transparent' : common.navBgColor,
            }}
            onPress={() => this.confirmPress()}
            disabled={user.emailStatus === common.user.status.bind ? true : updateEmailVisible}
            caption={user.emailStatus === common.user.status.bind ? transfer(language, 'me_Email_binded') : transfer(language, 'me_ID_confirm')}
            theme={'gray'}
          />

          <TKSpinner
            isVisible={updateEmailVisible}
          />
        </ScrollView>
      </KeyboardAvoidingView>

    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.user,
    email: state.user.email,
    codeEmail: state.user.codeEmail,
    codeMobile: state.user.codeMobile,
    codeGoogle: state.user.codeGoogle,
    googleAuth: state.user.googleAuth,

    updateEmailVisible: state.user.updateEmailVisible,
    updateEmailResult: state.user.updateEmailResult,
    updateEmailError: state.user.updateEmailError,
    requestGetCodeLoading: state.user.requestGetCodeLoading,
    requestGetCodeResponse: state.user.requestGetCodeResponse,
    language: state.system.language,
    loggedIn: state.authorize.loggedIn,
  }
}

export default connect(
  mapStateToProps,
)(UpdateEmail)
