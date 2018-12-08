import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Keyboard,
} from 'react-native'
import { Toast, Overlay } from 'teaset'
import { common } from '../../constants/common'
import TKButton from '../../components/TKButton'
import TKSpinner from '../../components/TKSpinner'
import TKInputItem from '../../components/TKInputItem'
import {
  updateForm,
  requestUpdateBank,
  updateAuthCodeType,
  requestGetCode,
}from '../../actions/updateBank'
import { findUserUpdate } from '../../actions/user'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import WithdrawAuthorizeCode from '../balance/components/WithdrawAuthorizeCode'
import transfer from '../../localization/utils'
import actions from '../../actions/index'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: common.blackColor,
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
  tipView: {
    marginTop: common.margin5,
    backgroundColor: common.navBgColor,
  },
  tipTitle: {
    marginTop: common.margin10,
    marginLeft: common.margin10,
    color: common.textColor,
    fontSize: common.font12,
  },
  tipDetail: {
    
    marginTop: common.margin5,
    marginLeft: common.margin10,
    marginRight: common.margin10,
    marginBottom: common.margin10,
    color: common.textColor,
    fontSize: common.font14,
  },
})

class UpdateBank extends Component {
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

  constructor(props) {
    super(props)
    this.codeTitles = ['短信验证码', '谷歌验证码', '邮箱验证码']
  }

  componentDidMount() {
    const { dispatch, user, navigation, language, loggedIn } = this.props
    navigation.setParams({
      title: transfer(language, 'me_bankCards_management'),
    })
    if (!user) return
    dispatch(updateForm({
      bankName: user.bankName,
      subbankName: user.subbankName,
      bankNo: user.bankNo,
      smsCode: '',
      googleCode: '',
      emailCode: '',
    }))
    if(loggedIn) dispatch(actions.sync())
  }

  componentWillReceiveProps(nextProps) {
    this.handleRequestGetCode(nextProps)
    this.handleRequestUpdateBank(nextProps)
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(updateForm({ bankName: '', subbankName: '', bankNo: '', smsCode: '' }))
  }

  onChangeText(text, tag) {
    const { dispatch, formState } = this.props
    if (tag === 'bankName') {
      dispatch(updateForm({ ...formState, bankName: text.trim() }))
    } else if (tag === 'subbankName') {
      dispatch(updateForm({ ...formState, subbankName: text.trim() }))
    } else if (tag === 'bankNo') {
      const reg = /^\+?[1-9][0-9]*$/
      if (text === '' || reg.test(text)) {
        dispatch(updateForm({ ...formState, bankNo: text.trim() }))
      }
    } else if (tag === 'code') {
      dispatch(updateForm({ ...formState, smsCode: text.trim() }))
    }
  }

  confirmPress(title) {
    Keyboard.dismiss()

    const { dispatch, formState, navigation, user, language } = this.props
    if (title === '重新添加') {
      this.editable = true
      dispatch(updateForm({ bankName: '', subbankName: '', bankNo: '', smsCode: '' }))
      return
    }
    if (!formState.bankName.length || formState.bankName.length < 4) {
      Toast.fail(transfer(language, 'updateBank_enter_bank_account'))
      return
    }
    if (!formState.subbankName.length || formState.subbankName.length < 4) {
      Toast.fail(transfer(language, 'updateBank_enter_branch_account'))
      return
    }
    if (!formState.bankNo.length
      || !common.regBankNo.test(formState.bankNo)
      || !common.regSpace.test(formState.bankNo)) {
      Toast.fail(transfer(language, 'updateBank_enter_bank_card_no_at_least'))
      return
    }
    if (!navigation.state.params || !user.bankName.length) {
      // 如果第一次绑定银行卡，则不需要二次验证；走法币交易、我的页面进入
      dispatch(requestUpdateBank({
        bankName: formState.bankName,
        subbankName: formState.subbankName,
        bankNo: formState.bankNo,
        code: formState.googleCode,
        emailCode: formState.emailCode,
      }))
    } else {
      this.showAuthCode()
    }
  }

  updateBank(link) {
    Keyboard.dismiss()
    if (link === undefined) {
      return
    }
    if (link) {
      return
    }
    const { user, authCodeType, formState, dispatch, language } = this.props
    const { smsCode, googleCode, emailCode, bankName, subbankName, bankNo } = formState
    if (authCodeType === '短信验证码') {
      if (!smsCode || smsCode.length === 0) {
        Toast.fail(transfer(language, 'me_enter_mobileVerification'))
        return
      }
      dispatch(requestUpdateBank({
        bankName: bankName,
        subbankName: subbankName,
        bankNo: bankNo,
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
      dispatch(requestUpdateBank({
        bankName: bankName,
        subbankName: subbankName,
        bankNo: bankNo,
        googleCode: googleCode,
      }))
      return
    }
    if (authCodeType === '邮箱验证码') {
      if (!emailCode || emailCode.length === 0) {
        Toast.fail(transfer(language, 'me_enter_EmailVerification'))
        return
      }
      dispatch(requestUpdateBank({
        bankName: bankName,
        subbankName: subbankName,
        bankNo: bankNo,
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
    dispatch(requestGetCode({ mobile: user.mobile, service: 'update_bank' }))
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
            dispatch(requestGetCode({ email: user.email, service: 'update_bank' }))
          }}
          confirmPress={link => this.updateBank(link)}
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
    }
    if(loggedIn) dispatch(actions.sync())
  }

  userUpdate(nextProps) {
    const { user, formState, dispatch } = nextProps
    const newUser = {
      ...user,
      bankName: formState.bankName,
      subbankName: formState.subbankName,
      bankNo: formState.bankNo,
    }
    dispatch(findUserUpdate(newUser))
  }

  handleRequestUpdateBank(nextProps) {
    const { updateBankResult, updateBankError, navigation, language, dispatch, loggedIn } = nextProps
    if (updateBankResult && (updateBankResult !== this.props.updateBankResult)) {
      this.userUpdate(nextProps)
      Toast.success(transfer(language, 'bank_linked'))
      Overlay.hide(this.overlayViewKeyID)
      navigation.goBack()
      return
    }
    if (updateBankError && (updateBankError !== this.props.updateBankError)) {
      if (updateBankError.message === common.badNet) {
        Toast.fail(transfer(language, 'UpdateBank_net_error'))
        return
      }
      const msg = this.errors[updateBankError.code]
      if (msg) Toast.fail(transfer(language, msg))
      else Toast.fail(transfer(language, 'UpdateBank_blind_card_failed'))
      if(loggedIn) dispatch(actions.sync())
    }
  }

  renderTip = () => (
    <View style={styles.tipView}>
      <Text style={styles.tipTitle}>
        {transfer(this.props.language, 'UpdateBank_please_note')}
      </Text>
      <Text style={styles.tipDetail}>
        {transfer(this.props.language, 'UpdateBank_please_note_content')}
      </Text>
    </View>
  )

  renderChineseVisible(language) {
    return (
      <View
        style={styles.container1}
      >
        <Text style={styles.txt}>{transfer(language, 'otc_visible_chinese')}</Text>
      </View>
    )
  }

  isStringContainNumber(event){
    const newText = event.trim()
    let p = /[0-9]/
    return p.test(newText)
  }

  render() {
    const { loading, formState, navigation, user, language } = this.props
    
    if (language !== 'zh_hans') {
      return this.renderChineseVisible(language)
    }
    let bankName = ''
    if (user) {
      bankName = user.bankName
    }
    const editable = !(navigation.state.params
      && navigation.state.params.fromMe === 'fromMe'
      && bankName.length && !this.editable)

    return (
      <ScrollView
        style={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <TKInputItem
          viewStyle={{
            marginTop: common.margin10,
            borderRadius: 0,
            borderWidth: 0,
          }}
          titleStyle={{
            width: common.h97,
            fontSize: common.font14,
          }}
          title={transfer(language, 'UpdateBank_account_name')}
          value={user.name}
          inputStyle={{color: common.placeholderColor}}
          editable={false}
        />
        <TKInputItem
          viewStyle={{
            marginTop: common.margin10,
            borderRadius: 0,
            borderWidth: 0,
          }}
          titleStyle={{
            width: common.h97,
            fontSize: common.font14,
          }}
          title={transfer(language, 'UpdateBank_account_bank')}
          value={formState.bankName}
          placeholder={transfer(language, 'UpdateBank_account_bank_placeholder')}
          onChangeText={e => {
            if(this.isStringContainNumber(e)){
              return
            }
            this.onChangeText(e, 'bankName')
          }}
          editable={editable}
        />

        <TKInputItem
          viewStyle={{
            marginTop: common.margin5,
            borderRadius: 0,
            borderWidth: 0,
          }}
          titleStyle={{
            width: common.h97,
            fontSize: common.font14,
          }}
          title={transfer(language, 'UpdateBank_branch')}
          value={formState.subbankName}
          placeholder={transfer(language, 'UpdateBank_branch_placeholder')}
          onChangeText={e => {
            if(this.isStringContainNumber(e)){
              return
            }
            this.onChangeText(e, 'subbankName')
          }}
          editable={editable}
        />

        <TKInputItem
          viewStyle={{
            marginTop: common.margin5,
            borderRadius: 0,
            borderWidth: 0,
          }}
          titleStyle={{
            width: common.h97,
            fontSize: common.font14,
          }}
          title={transfer(language, 'UpdateBank_account_No')}
          placeholder={transfer(language, 'UpdateBank_account_No_placeholder')}
          value={formState.bankNo}
          onChangeText={e => this.onChangeText(e, 'bankNo')}
          keyboardType={'numeric'}
          maxLength={common.textInputMaxLenBankNo}
          editable={editable}
        />

        <Text
          style={{
            textAlign: 'center',
            color: common.redColor,
            fontSize: common.font12,
          }}
        >
          {`${transfer(this.props.language, 'UpdateBank_bankno_hint1')}${user.name}${transfer(this.props.language, 'UpdateBank_bankno_hint2')}`}
        </Text>

        {this.renderTip(language)}

        <TKButton
          theme={'gray'}
          style={{ marginTop: common.margin20 }}
          caption={transfer(language, editable ? 'UpdateBank_confirm' : 'UpdateBank_addAgain')}
          onPress={() => {
            const title = editable ? '确认' : '重新添加'
            this.confirmPress(title)
          }}
        />

        <TKSpinner isVisible={loading} />
      </ScrollView>
    )
  }
}

function mapStateToProps(store) {
  return {
    ...store.updateBank,
    user: store.user.user,
    loggedInResult: store.authorize.loggedInResult,
    loggedIn: store.authorize.loggedIn,
    language: store.system.language,
  }
}

export default connect(
  mapStateToProps,
)(UpdateBank)
