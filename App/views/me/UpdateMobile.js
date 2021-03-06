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
  mobile: {
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


class UpdateMobile extends Component {
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
      cache.setObject('currentComponentVisible', 'UpdateMobile')
      props.dispatch(actions.getGoogleAuth(schemas.findUser(props.user.id)))
    })
  }

  componentDidMount() {
    const { navigation, language, dispatch, loggedIn } = this.props
    navigation.setParams({
      title: transfer(language, 'me_linkMobile'),
    })
    if(loggedIn) dispatch(actions.sync())
  }

  componentWillReceiveProps(nextProps) {
    this.handleRequestGetCode(nextProps)
    this.handleUpdateMobileRequest(nextProps)
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(actions.updateEmailMobileUpdate({ email: '', codeEmail: '', mobile: '', codeMobile: '', codeGoogle: '' }))
  }

  onChange(event, tag) {
    const { text } = event.nativeEvent
    const { dispatch, codeEmail, mobile, codeMobile, codeGoogle  } = this.props

    switch (tag) {
      case 'codeEmail':
        dispatch(actions.updateEmailMobileUpdate({ codeEmail: text.trim(), mobile, codeMobile, codeGoogle }))
        break
      case 'mobile':
        dispatch(actions.updateEmailMobileUpdate({ codeEmail, mobile: text.trim(), codeMobile, codeGoogle }))
        break
      case 'codeMobile':
        dispatch(actions.updateEmailMobileUpdate({ codeEmail, mobile, codeMobile: text.trim(), codeGoogle }))
        break
      case 'codeGoogle':
        dispatch(actions.updateEmailMobileUpdate({ codeEmail, mobile, codeMobile, codeGoogle: text.trim() }))
        break
      default:
        break
    }
  }

  sendCodeMobile(count) {
    const { dispatch, mobile, language } = this.props
    if (!mobile.length || !common.regMobile.test(mobile)) {
      Toast.fail(transfer(language, 'me_Mobile_correctFormat'))
      return
    }
    this.count = count
    dispatch(actions.getVerificateCode({
      mobile: mobile,
      service: 'update_mobile',
    }))
  }

  sendCodeEmail(count) {
    const { dispatch, language, user } = this.props
    if (!user.email.length || !common.regEmail.test(user.email)) {
      Toast.fail(transfer(language, 'me_Mobile_correctFormat'))
      return
    }
    this.count = count
    dispatch(actions.getVerificateCode({
      email: user.email,
      service: 'update_mobile',
    }))
  }

  confirmPress() {
    Keyboard.dismiss()

    const { dispatch, language, user, codeEmail, mobile, codeMobile, codeGoogle, googleAuth  } = this.props
    if (!mobile.length || !common.regMobile.test(mobile)) {
      Toast.fail(transfer(language, 'me_Mobile_correctFormat'))
      return
    }

    if (!codeMobile.length) {
      Toast.fail(transfer(language, 'me_enter_mobileVerification'))
      return
    }

    if(googleAuth){
      if (!codeGoogle.length) {
        Toast.fail(transfer(language, 'me_inputGoogleCode'))
        return
      }
      dispatch(actions.updateMobile({
        mobile: mobile,
        mobileCode: codeMobile,
        googleCode: codeGoogle,
      }))
    } else{
      if (!codeEmail.length) {
        Toast.fail(transfer(language, 'me_enter_EmailVerification'))
        return
      }
      dispatch(actions.updateMobile({
        mobile: mobile,
        mobileCode: codeMobile,
        email: user.email,
        emailCode: codeEmail,
      }))
    }
  }

  errors = {
    4000107: 'me_Email_repeatMinute',
    4000102: 'auth_smscode_error',
    4000174: 'AuthCode_gv_code_error',
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

  handleUpdateMobileRequest(nextProps) {
    const { updateMobileVisible, updateMobileError, updateMobileResult } = nextProps
    const { user, language, dispatch, navigation, loggedIn } = this.props
    if (!updateMobileVisible && this.props.updateMobileVisible) {
      if (updateMobileError) {
        if (updateMobileError.message === common.badNet) {
          Toast.fail(transfer(language, 'OtcDetail_net_error'))
        } else if(updateMobileError.message === 'sms验证码错误'){
          Toast.fail(transfer(language, 'auth_smscode_error'))
        } else if(updateMobileError.message === 'email验证码错误'){
          Toast.fail(transfer(language, 'auth_emailcode_error'))
        } else {
          const msg = this.errors[updateMobileError.code]
          if (msg) Toast.fail(transfer(language, msg))
          else Toast.fail(transfer(language, 'me_Mobile_bind_failed'))
        }
        if(loggedIn) dispatch(actions.sync())
      }
      if (updateMobileResult) {
        Toast.success(transfer(language, 'me_Mobile_binded'))
        user.mobileStatus = common.user.status.bind
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
        {transfer(this.props.language, 'me_Mobile_note_content')}
      </Text>
    </View>
  )

  render() {
    const { codeEmail, mobile, codeMobile, codeGoogle, updateMobileVisible, user, language, googleAuth } = this.props

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
            viewStyle={styles.mobile}
            titleStyle={styles.inputText}
            title={transfer(language, 'AuthCode_mobile_tip')}
            placeholder={transfer(language, 'me_enter_mobileAddress')}
            value={mobile}
            onChange={e => this.onChange(e, 'mobile')}
            editable={user.mobileStatus !== common.user.status.bind}
          />
          {
            user.mobileStatus === common.user.status.bind ? null
              : <TKInputItemCheckCode
              viewStyle={styles.viewStyle}
              inputStyle={styles.inputStyle}
              titleStyle={styles.inputText}
              title={transfer(language, 'AuthCode_sms_tip')}
              language={language}
              placeholder={transfer(language, 'me_enter_mobileVerification')}
              value={codeMobile}
              maxLength={8}
              extraDisable={
                !mobile || !common.regMobile.test(mobile)
              }
              onPressCheckCodeBtn={() => this.sendCodeMobile()}
              onChange={e => this.onChange(e, 'codeMobile')}
              textInputProps={{
                keyboardType: 'numeric',
              }}
            />
          }
          {
            !googleAuth ? null
              : <TKInputItem
                viewStyle={styles.mobile}
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
              viewStyle={styles.mobile}
              titleStyle={styles.inputText}
              title={transfer(language, 'AuthCode_email_tip')}
              placeholder={transfer(language, 'me_enter_EmailAddress')}
              value={common.maskEmail(user.email || '')}
              onChange={e => this.onChange(e, 'email')}
              editable={false}
            />
          }
          {
            googleAuth ? null
            : <TKInputItemCheckCode
              viewStyle={styles.viewStyle}
              inputStyle={styles.inputStyle}
              titleStyle={styles.inputText}
              title={transfer(language, 'AuthCode_email_code')}
              language={language}
              placeholder={transfer(language, 'me_enter_EmailVerification')}
              value={codeEmail}
              maxLength={6}
              onPressCheckCodeBtn={() => this.sendCodeEmail()}
              onChange={e => this.onChange(e, 'codeEmail')}
              textInputProps={{
                keyboardType: 'numeric',
              }}
            />
          }

          {this.renderTip()}
          <TKButton
            style={{
              marginTop: user.mobileStatus === common.user.status.bind
                ? common.margin10 : common.margin20,
              backgroundColor: user.mobileStatus === common.user.status.bind
                ? 'transparent' : common.navBgColor,
            }}
            onPress={() => this.confirmPress()}
            disabled={user.mobileStatus === common.user.status.bind ? true : updateMobileVisible}
            caption={user.mobileStatus === common.user.status.bind ? transfer(language, 'me_Mobile_binded') : transfer(language, 'me_ID_confirm')}
            theme={'gray'}
          />

          <TKSpinner
            isVisible={updateMobileVisible}
          />
        </ScrollView>
      </KeyboardAvoidingView>

    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.user,
    codeEmail: state.user.codeEmail,
    mobile: state.user.mobile,
    codeMobile: state.user.codeMobile,
    codeGoogle: state.user.codeGoogle,
    googleAuth: state.user.googleAuth,

    updateMobileVisible: state.user.updateMobileVisible,
    updateMobileResult: state.user.updateMobileResult,
    updateMobileError: state.user.updateMobileError,
    requestGetCodeLoading: state.user.requestGetCodeLoading,
    requestGetCodeResponse: state.user.requestGetCodeResponse,
    language: state.system.language,
    loggedIn: state.authorize.loggedIn,
  }
}

export default connect(mapStateToProps)(UpdateMobile)
