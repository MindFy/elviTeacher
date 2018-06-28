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
import TextInputPwd from './TextInputPwd'
import TKButton from '../../components/TKButton'
import TKSpinner from '../../components/TKSpinner'
import TKInputItem from '../../components/TKInputItem'
import actions from '../../actions/index'
import schemas from '../../schemas/index'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
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

  constructor() {
    super()
    this.showGetVerificateSmtpCodeResponse = false
  }

  componentDidMount() {
    const { dispatch, user, navigation, codeEmail, language } = this.props
    navigation.setParams({
      title: transfer(language, 'me_linkEmail'),
    })
    dispatch(actions.findUser(schemas.findUser(user.id)))
    if (user.email) {
      dispatch(actions.updateEmailUpdate({ email: user.email, codeEmail }))
    }
  }

  componentWillReceiveProps(nextProps) {
    this.handleGetVerificateSmtpCodeRequest(nextProps)
    this.handleUpdateEmailRequest(nextProps)
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(actions.updateEmailUpdate({ email: '', codeEmail: '' }))
  }

  onChange(event, tag) {
    const { text } = event.nativeEvent
    const { dispatch, email, codeEmail } = this.props

    switch (tag) {
      case 'email':
        dispatch(actions.updateEmailUpdate({ email: text.trim(), codeEmail }))
        break
      case 'code':
        dispatch(actions.updateEmailUpdate({ email, codeEmail: text.trim() }))
        break
      default:
        break
    }
  }

  sendCodeEmail(count) {
    const { dispatch, email, user, language } = this.props
    if (!email.length || !common.regEmail.test(email)) {
      Toast.fail(transfer(language, 'me_Email_correctFormat'))
      return
    }
    this.count = count
    const service = (user && (user.emailStatus === common.user.status.bind)) ? 'reset' : 'auth'
    dispatch(actions.getVerificateSmtpCode({
      email,
      service,
    }))
  }

  confirmPress() {
    Keyboard.dismiss()

    const { dispatch, email, codeEmail, language } = this.props
    if (!email.length) {
      Toast.fail(transfer(language, 'me_enter_EmailAddress'))
      return
    }

    if (!common.regEmail.test(email)) {
      Toast.fail(transfer(language, 'me_enter_EmailAddress'))
      return
    }

    if (!codeEmail.length) {
      Toast.fail(transfer(language, 'me_enter_EmailVerification'))
      return
    }

    dispatch(actions.updateEmail({
      email,
      code: codeEmail,
    }))
  }

  errors = {
    4000101: 'login_codeNotNull',
    4000102: 'login_codeError',
    4000103: 'login_codeOverDue',
    4000160: 'me_Email_format_error',
    4000161: 'me_Email_registered',
  }

  handleUpdateEmailRequest(nextProps) {
    const { updateEmailVisible, updateEmailError, updateEmailResult } = nextProps
    const { user, language, dispatch, navigation } = this.props
    if (!updateEmailVisible && this.props.updateEmailVisible) {
      if (updateEmailError) {
        if (updateEmailError.message === common.badNet) {
          Toast.fail(transfer(language, 'OtcDetail_net_error'))
        } else {
          const msg = this.errors[updateEmailError.code]
          if (msg) Toast.fail(transfer(language, msg))
          else Toast.fail(transfer(language, 'me_Email_bind_failed'))
        }
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

  handleGetVerificateSmtpCodeRequest(nextProps) {
    const { language } = this.props
    const { getVerificateSmtpCodeVisible, getVerificateSmtpCodeResponse } = nextProps
    if (!getVerificateSmtpCodeVisible && !this.showGetVerificateSmtpCodeResponse) return

    if (getVerificateSmtpCodeVisible) {
      this.showGetVerificateSmtpCodeResponse = true
    } else {
      this.showGetVerificateSmtpCodeResponse = false
      if (getVerificateSmtpCodeResponse.success) {
        this.count()
        Toast.success(transfer(language, 'get_code_succeed'))
      } else if (getVerificateSmtpCodeResponse.error.code === 4000150) {
        Toast.fail(transfer(language, 'me_Email_serverTypeWrong'))
      } else if (getVerificateSmtpCodeResponse.error.code === 4000151) {
        Toast.fail(transfer(language, 'me_Email_repeatMinute'))
      } else if (getVerificateSmtpCodeResponse.error.code === 4000152) {
        Toast.fail(transfer(language, 'me_Email_registered'))
      } else if (getVerificateSmtpCodeResponse.error.message === common.badNet) {
        Toast.fail(transfer(language, 'me_settings_PWinternetFailed'))
      } else {
        Toast.fail(transfer(language, 'me_Email_getCodeFailed'))
      }
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
    const { email, codeEmail, updateEmailVisible, user, language } = this.props

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
            placeholder={transfer(language, 'me_enter_EmailAddress')}
            value={email}
            onChange={e => this.onChange(e, 'email')}
            editable={user.emailStatus !== common.user.status.bind}
          />
          {
            user.emailStatus === common.user.status.bind ? null
              : <TextInputPwd
                language={language}
                placeholder={transfer(language, 'me_enter_EmailVerification')}
                value={codeEmail}
                codeEmail={'code'}
                onChange={e => this.onChange(e, 'code')}
                onPress={count => this.sendCodeEmail(count)}
                maxLength={8}
              />
          }

          <TKButton
            style={{
              marginTop: user.emailStatus === common.user.status.bind
                ? common.margin10 : common.margin40,
              backgroundColor: user.emailStatus === common.user.status.bind
                ? 'transparent' : common.navBgColor,
            }}
            onPress={() => this.confirmPress()}
            disabled={user.emailStatus === common.user.status.bind ? true : updateEmailVisible}
            caption={user.emailStatus === common.user.status.bind ? transfer(language, 'me_Email_binded') : transfer(language, 'me_ID_confirm')}
            theme={'gray'}
          />

          {user.emailStatus !== common.user.status.bind && this.renderTip()}

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

    updateEmailVisible: state.user.updateEmailVisible,
    updateEmailResult: state.user.updateEmailResult,
    updateEmailError: state.user.updateEmailError,
    getVerificateSmtpCodeVisible: state.user.getVerificateSmtpCodeVisible,
    getVerificateSmtpCodeResponse: state.user.getVerificateSmtpCodeResponse,
    language: state.system.language,
  }
}

export default connect(
  mapStateToProps,
)(UpdateEmail)
