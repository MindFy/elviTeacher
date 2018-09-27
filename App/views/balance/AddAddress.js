import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Keyboard,
} from 'react-native'
import {
  Toast,
  Overlay,
} from 'teaset'
import { common } from '../../constants/common'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import {
  updateForm,
  requestAddressAdd,
  requestAddressClearError,
  updateAuthCodeType,
  check2GoogleAuth,
  check2GoogleAuthSetResponse,
  check2SMSAuth,
  check2SmtpAuth,
  requestGetCode,
} from '../../actions/addressAdd'
import actions from '../../actions/index'
import { requestWithdrawAddress } from '../../actions/withdraw'
import TKButton from '../../components/TKButton'
import TKInputItem from '../../components/TKInputItem'
import findAddress from '../../schemas/address'
import WithdrawAuthorizeCode from './components/WithdrawAuthorizeCode'
import transfer from '../../localization/utils'
import Alert from '../../components/Alert'
import TKWAValidator from '../../utils/TKWAValidator'

const styles = StyleSheet.create({
  headerLeft: {
    height: common.w40,
    width: common.w40,
    justifyContent: 'center',
  },
  headerLeftImage: {
    marginLeft: common.margin10,
    width: common.w10,
    height: common.h20,
  },
  container: {
    flex: 1,
    backgroundColor: common.bgColor,
  },
  titleContainer: {
    marginTop: common.margin10,
    marginLeft: common.margin10,
    marginRight: common.margin10,
    height: common.h40,
    borderWidth: 1,
    borderRadius: 1,
    borderColor: common.borderColor,
    backgroundColor: common.navBgColor,
    justifyContent: 'center',
  },
  title: {
    marginLeft: common.margin10,
    fontSize: common.font14,
    color: common.textColor,
  },
  addressContainer: {
    marginTop: common.margin10,
    marginLeft: common.margin10,
    marginRight: common.margin10,
  },
  remarkContainer: {
    marginTop: common.margin10,
    marginLeft: common.margin10,
    marginRight: common.margin10,
  },
  addContainer: {
    marginTop: common.margin40,
  },
  overlay: {
    justifyContent: 'center',
  },
})

class AddAddress extends Component {
  static navigationOptions(props) {
    let headerTitle = ''
    if (props.navigation.state.params) {
      headerTitle = props.navigation.state.params.headerTitle
    }
    return {
      headerTitle,
      headerLeft: (
        <NextTouchableOpacity
          style={styles.headerLeft}
          activeOpacity={common.activeOpacity}
          onPress={() => props.navigation.goBack()}
        >
          <Image
            style={styles.headerLeftImage}
            source={require('../../assets/arrow_left_left.png')}
          />
        </NextTouchableOpacity>
      ),
    }
  }

  componentWillReceiveProps(nextProps) {
    const { navigation, dispatch, user, language, authCodeType } = this.props
    this.handleRequestGetCode(nextProps)
    this.handleRequestCheck2GoogleCode(nextProps)
    this.handleGetVerificateSMPTCodeRequest(nextProps)
    this.handleCheckVerificateSmptCodeRequest(nextProps)
    this.handleCheckVerificateCodeRequest(nextProps)
    if (nextProps.error) {
      if(authCodeType !== '谷歌验证码')
      {
        Overlay.hide(this.overlayViewKeyID)
      }
      const errCode = nextProps.error.code
      const errMsg = this.errMsgs[errCode]
      if (errMsg) {
        Toast.fail(transfer(language, errMsg))
      } else {
        Toast.fail(transfer(language, 'add_address_failed'))
      }
      dispatch(requestAddressClearError())
    }

    if (this.props.loading && !nextProps.loading) {
      Toast.success(transfer(language, 'add_address_succeed'))
      Overlay.hide(this.overlayViewKeyID)
      dispatch(requestWithdrawAddress(findAddress(user.id)))
      navigation.goBack()
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(updateForm({
      address: '',
      remark: '',
      authCode: '',
      googleCode: '',
      emailCode: '',
    }))
  }

  getCodeErrors = {
    4000101: 'login_numberOrTypeError',
    4000102: 'me_Email_repeatMinute',
    4000104: 'me_phoneRegisted',
  }

  codeTitles = ['短信验证码', '谷歌验证码', '邮箱验证码']

  errMsgs = {
    4000413: 'withdraw_address_length_error',
    4000416: 'withdraw_address_error',
    4000156: 'me_authFailed',
  }

  handleRequestGetCode(nextProps) {
    const { getCodeResult, getCodeError, language } = nextProps

    if (getCodeResult && getCodeResult !== this.props.getCodeResult) {
      Toast.success(transfer(language, 'get_code_succeed'))
    }
    if (getCodeError && getCodeError !== this.props.getCodeError) {
      if (getCodeError.message === common.badNet) {
        Toast.fail(transfer(language, 'OtcDetail_net_error'))
      } else {
        const msg = transfer(language, this.getCodeErrors[getCodeError.code])
        if (msg) Toast.fail(msg)
        else Toast.fail(transfer(language, 'AuthCode_failed_to_get_verification_code'))
      }
    }
  }

  handleRequestCheck2GoogleCode(nextProps) {
    if (!nextProps.googleCodeLoading && this.props.googleCodeLoading) {
      const { googleCodeResponse, dispatch, formState, language } = nextProps
      if (googleCodeResponse.success) {
        const { navigation } = this.props
        dispatch(requestAddressAdd({
          token_id: navigation.state.params.tokenId,
          withdrawaddr: formState.address,
          remark: formState.remark,
          googleCode: formState.googleCode,
        }))
      } else {
        const errCode = googleCodeResponse.error.code
        if (errCode === 4000171) {
          Toast.fail(transfer(language, 'me_bindBankCardFirst'))
        } else {
          Toast.fail(transfer(language, 'me_googleCodeError'))
        }
      }
      dispatch(check2GoogleAuthSetResponse(null))
    }
  }

  /* 获取邮箱验证码请求结果处理 */
  handleGetVerificateSMPTCodeRequest(nextProps) {
    const { getVerificateSmtpCodeLoading, getVerificateSmtpCodeResponse, language } = nextProps
    if (!this.props.getVerificateSmtpCodeLoading || getVerificateSmtpCodeLoading){
      return
    } 
    if (getVerificateSmtpCodeResponse.success) {
      Toast.success(transfer(language, 'get_code_succeed'))
    } else if (getVerificateSmtpCodeResponse.error.code === 4000101) {
      Toast.fail(transfer(language, 'login_numberOrTypeError'))
    } else if (getVerificateSmtpCodeResponse.error.code === 4000151) {
      Toast.fail(transfer(language, 'login_disbaleSendInOneMin'))
    } else if (getVerificateSmtpCodeResponse.error.code === 4000103) {
      Toast.fail(transfer(language, 'login_codeOverDue'))
    } else if (getVerificateSmtpCodeResponse.error.message === common.badNet) {
      Toast.fail(transfer(language, 'login_networdError'))
    } else {
      Toast.fail(transfer(language, 'login_getCodeFailed'))
    }
  }

  /* 检测邮箱验证码请求结果处理 */
  handleCheckVerificateSmptCodeRequest(nextProps) {
    const { user, checkSmtpCodeLoading, checkSmtpCodeResponse, dispatch, formState, language } = nextProps
    if (!this.props.checkSmtpCodeLoading || checkSmtpCodeLoading ){
      return
    } 
    if (checkSmtpCodeResponse.success) {
      const { navigation } = this.props
      dispatch(requestAddressAdd({
        token_id: navigation.state.params.tokenId,
        withdrawaddr: formState.address,
        remark: formState.remark,
        code: formState.emailCode,
        email: user.email,
      }))
      return
    } else if (checkSmtpCodeResponse.error.code === 4000101) {
      Toast.fail(transfer(language, 'login_numberOrTypeError2'))
    } else if (checkSmtpCodeResponse.error.code === 4000102) {
      Toast.fail(transfer(language, 'login_codeError'))
    } else if (checkSmtpCodeResponse.error.code === 4000103) {
      Toast.fail(transfer(language, 'login_codeOverDue'))
    } else if (checkSmtpCodeResponse.error.message === common.badNet) {
      Toast.fail(transfer(language, 'login_networdError'))
    } else {
      Toast.fail(transfer(language, 'login_verificateFailed'))
    }
  }

  /* 检测短信验证码请求结果处理 */
  handleCheckVerificateCodeRequest(nextProps) {
    const { user, checkSMSCodeLoading, checkSMSCodeResponse, dispatch, formState, language } = nextProps
    if (!this.props.checkSMSCodeLoading || checkSMSCodeLoading ){
      return
    } 
    if (checkSMSCodeResponse.success) {
      const { navigation } = this.props
      dispatch(requestAddressAdd({
        token_id: navigation.state.params.tokenId,
        withdrawaddr: formState.address,
        remark: formState.remark,
        code: formState.authCode,
        email: user.email,
      }))
      return
    } else if (checkSMSCodeResponse.error.code === 4000101) {
      Toast.fail(transfer(language, 'login_numberOrTypeError'))
    } else if (checkSMSCodeResponse.error.code === 4000102) {
      Toast.fail(transfer(language, 'login_codeError'))
    } else if (checkSMSCodeResponse.error.code === 4000103) {
      Toast.fail(transfer(language, 'login_codeOverDue'))
    } else if (checkSMSCodeResponse.error.message === common.badNet) {
      Toast.fail(transfer(language, 'login_networdError'))
    } else {
      Toast.fail(transfer(language, 'login_verificateFailed'))
    }                         
  }

  handleChangeAddress = (address = '') => {
    const { dispatch, formState } = this.props
    const newAddress = address.trim()
    dispatch(updateForm({
      ...formState,
      address: newAddress,
    }))
  }

  handleRemarkAddress = (remark) => {
    const { dispatch, formState } = this.props
    dispatch(updateForm({
      ...formState,
      remark,
    }))
  }

  handleAuthCode = (authCode) => {
    const { dispatch, formState } = this.props
    dispatch(updateForm({
      ...formState,
      authCode: authCode.trim(),
    }))
  }

  checkWithdrawAddressIsIneligible = (address, coin) => {
    const isIneligible =
    !TKWAValidator.validate(address, coin) &&
    !TKWAValidator.validate(address, coin, 'testnet')

    return isIneligible
  }

  confirmPress() {
    const { formState, language } = this.props
    if (!formState.address.length) {
      Toast.fail(transfer(language, 'withdrawal_address_required'))
      return
    }

    const { address } = formState
    const { navigation } = this.props
    const { title } = navigation.state.params

    if (this.checkWithdrawAddressIsIneligible(address, title)) {
      Alert.alert(
        transfer(language, 'withdraw_scanNote'),
        `${transfer(language, 'withdrawal_address_correct_required_1')}${title}${transfer(language, 'withdrawal_address_correct_required_2')}`,
        [
          {
            text: transfer(language, 'withdrawal_confirm'),
            onPress: () => {},
          },
        ],
      )
      return
    }

    if (!formState.remark.length) {
      Toast.fail(transfer(language, 'address_remark_required'))
      return
    }
    this.showAuthCode()
  }

  addPress(link) {
    Keyboard.dismiss()
    if (link === undefined) {
      return
    }
    if (link) {
      this.props.navigation.navigate('EmailCheck')
      return
    }
    const { user, authCodeType, formState, dispatch, language } = this.props
    if (authCodeType === '短信验证码' || authCodeType === '邮箱验证码') {
      const code = authCodeType === '短信验证码' ? formState.authCode : formState.emailCode
      if (!code || code.length === 0) {
        Toast.fail(transfer(language, 'login_inputCode'))
        return
      }
      if (authCodeType === '短信验证码') {
        dispatch(check2SMSAuth({
          mobile: user.mobile,
          service: 'auth',
          code: formState.authCode,
        }))
        return
      }
      if (authCodeType === '邮箱验证码') {
        dispatch(check2SmtpAuth({
          email: user.email,
          service: 'auth',
          code: formState.emailCode,
        }))
      }
    } else{
      if (!formState.googleCode || formState.googleCode.length === 0) {
        Toast.fail(transfer(language, 'me_inputGoogleCode'))
        return
      }
      dispatch(check2GoogleAuth({ googleCode: formState.googleCode }))
    }
  }

  authCodeChanged = (e, code) => {
    const { dispatch, formState, authCodeType } = this.props
    if (authCodeType === '短信验证码') {
      dispatch(updateForm({
        ...formState,
        authCode: code,
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
        authCode: '',
        emailCode: '',
      }))
    } else if(title === '短信验证码'){
      dispatch(updateForm({
        ...formState,
        googleCode: '',
        emailCode: '',
      }))
    } else{
      dispatch(updateForm({
        ...formState,
        authCode: '',
        googleCode: '',
      }))
    }
  }

  SMSCodePress = (count) => {
    this.count = count
    const { user, dispatch } = this.props
    dispatch(requestGetCode({ mobile: user.mobile, service: 'auth' }))
  }

  showAuthCode = () => {
    const { dispatch, user, formState, language } = this.props
    dispatch(updateAuthCodeType('短信验证码'))
    dispatch(updateForm({
      ...formState,
      authCode: '',
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
            dispatch(actions.getVerificateSmtpCode({ email: user.email, service: 'check' }))
          }}
          confirmPress={link => this.addPress(link)}
          cancelPress={() => Overlay.hide(this.overlayViewKeyID)}
          language={language}
        />
      </Overlay.View>
    )
    this.overlayViewKeyID = Overlay.show(overlayView)
  }

  render() {
    const { navigation, formState, language } = this.props

    return (
      <View
        style={styles.container}
      >
        <ScrollView>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              {navigation.state.params.title}
            </Text>
          </View>

          <TKInputItem
            viewStyle={styles.addressContainer}
            inputStyle={{
              fontSize: common.font14,
            }}
            placeholder={transfer(language, 'withdrawal_address')}
            value={formState.address}
            onChangeText={this.handleChangeAddress}
          />

          <TKInputItem
            viewStyle={styles.remarkContainer}
            inputStyle={{ fontSize: common.font14 }}
            placeholder={transfer(language, 'address_remark')}
            value={formState.remark}
            onChangeText={this.handleRemarkAddress}
          />

          <TKButton
            style={styles.addContainer}
            onPress={() => this.confirmPress()}
            caption={transfer(language, 'address_add')}
            theme={'gray'}
          />
        </ScrollView>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state.addressAdd,
    user: state.user.user,
    language: state.system.language,
    getVerificateSmtpCodeLoading: state.user.getVerificateSmtpCodeVisible,
    getVerificateSmtpCodeResponse: state.user.getVerificateSmtpCodeResponse,
  }
}

export default connect(
  mapStateToProps,
)(AddAddress)
