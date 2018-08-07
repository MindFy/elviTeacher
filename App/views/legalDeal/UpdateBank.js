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
import * as actions from '../../actions/updateBank'
import { findUserUpdate } from '../../actions/user'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import WithdrawAuthorizeCode from '../balance/components/WithdrawAuthorizeCode'
import transfer from '../../localization/utils'

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
    fontSize: common.font10,
    lineHeight: common.font12,
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
    this.codeTitles = ['短信验证码', '谷歌验证码']
  }

  componentDidMount() {
    const { dispatch, user, navigation, language } = this.props
    navigation.setParams({
      title: transfer(language, 'me_bankCards_management'),
    })
    if (!user) return
    dispatch(actions.updateForm({
      bankName: user.bankName,
      subbankName: user.subbankName,
      bankNo: user.bankNo,
      code: '',
      googleCode: '',
    }))
  }

  componentWillReceiveProps(nextProps) {
    this.handleRequestGetCode(nextProps)
    this.handleRequestUpdateBank(nextProps)
    this.handleRequestCheck2GoogleCode(nextProps)
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(actions.updateForm({ bankName: '', subbankName: '', bankNo: '', code: '' }))
  }

  onChangeText(text, tag) {
    const { dispatch, formState } = this.props
    if (tag === 'bankName') {
      dispatch(actions.updateForm({ ...formState, bankName: text.trim() }))
    } else if (tag === 'subbankName') {
      dispatch(actions.updateForm({ ...formState, subbankName: text.trim() }))
    } else if (tag === 'bankNo') {
      const reg = /^\+?[1-9][0-9]*$/
      if (text === '' || reg.test(text)) {
        dispatch(actions.updateForm({ ...formState, bankNo: text.trim() }))
      }
    } else if (tag === 'code') {
      dispatch(actions.updateForm({ ...formState, code: text.trim() }))
    }
  }

  confirmPress(title) {
    Keyboard.dismiss()

    const { dispatch, formState, navigation, user, language } = this.props
    if (title === '重新添加') {
      this.editable = true
      dispatch(actions.updateForm({ bankName: '', subbankName: '', bankNo: '', code: '' }))
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
      dispatch(actions.requestUpdateBank({
        bankName: formState.bankName,
        subbankName: formState.subbankName,
        bankNo: formState.bankNo,
        code: formState.googleCode,
      }))
    } else {
      this.showAuthCode()
    }
  }

  updateBank(link) {
    Keyboard.dismiss()
    Overlay.hide(this.overlayViewKeyID)
    if (link === undefined) {
      return
    }
    if (link) {
      this.props.navigation.navigate('EmailCheck')
      return
    }
    const { authCodeType, formState, dispatch, language } = this.props
    if (authCodeType === '短信验证码') {
      const { code } = formState
      if (!code) {
        Toast.fail(transfer(language, 'AuthCode_enter_sms_code'))
        return
      }
      dispatch(actions.requestUpdateBank({
        bankName: formState.bankName,
        subbankName: formState.subbankName,
        bankNo: formState.bankNo,
        code: formState.code,
      }))
    } else {
      if (!formState.googleCode.length) {
        Toast.fail(transfer(language, 'AuthCode_enter_gv_code'))
        return
      }
      dispatch(actions.check2GoogleAuth({ googleCode: formState.googleCode }))
    }
  }

  authCodeChanged = (e, code) => {
    const { dispatch, formState, authCodeType } = this.props
    if (authCodeType === '短信验证码') {
      dispatch(actions.updateForm({
        ...formState,
        code,
      }))
    } else {
      dispatch(actions.updateForm({
        ...formState,
        googleCode: code,
      }))
    }
  }

  segmentValueChanged = (e) => {
    const { dispatch, formState } = this.props
    const title = this.codeTitles[e.index]
    dispatch(actions.updateAuthCodeType(title))

    if (e.index === 1) {
      dispatch(actions.updateForm({
        ...formState,
        code: '',
      }))
    } else {
      dispatch(actions.updateForm({
        ...formState,
        googleCode: '',
      }))
    }
  }

  SMSCodePress = (count) => {
    this.count = count
    const { user, dispatch } = this.props
    dispatch(actions.requestGetCode({ mobile: user.mobile, service: 'auth' }))
  }

  showAuthCode = () => {
    const { dispatch, user, formState, language } = this.props
    dispatch(actions.updateAuthCodeType('短信验证码'))
    dispatch(actions.updateForm({
      ...formState,
      code: '',
      googleCode: '',
    }))
    const overlayView = (
      <Overlay.View
        style={{ top: '35%' }}
        modal={false}
        overlayOpacity={0}
      >
        <WithdrawAuthorizeCode
          titles={[transfer(language, 'AuthCode_SMS_code'), transfer(language, 'AuthCode_GV_code')]}
          mobile={user.mobile}
          onChangeText={this.authCodeChanged}
          segmentValueChanged={this.segmentValueChanged}
          smsCodePress={this.SMSCodePress}
          confirmPress={link => this.updateBank(link)}
          cancelPress={() => Overlay.hide(this.overlayViewKeyID)}
          language={language}
        />
      </Overlay.View>
    )
    this.overlayViewKeyID = Overlay.show(overlayView)
  }

  codeTitles = ['短信验证码', '谷歌验证码']

  errors = {
    4000101: 'AuthCode_verification_code_must_be_filled',
    4000102: 'AuthCode_cannot_send_verification_code_repeatedly_within_one_minute',
    4000104: 'AuthCode_mobile_phone_number_registered',
    4000156: 'AuthCode_authorization_verification_failed',
  }

  handleRequestGetCode(nextProps) {
    const { getCodeResult, getCodeError, language } = nextProps
    if (getCodeResult && (getCodeResult !== this.props.getCodeResult)) {
      Toast.success(transfer(language, 'get_code_succeed'))
      return
    }
    if (getCodeError && (getCodeError !== this.props.getCodeError)) {
      if (getCodeError.message === common.badNet) {
        Toast.fail(transfer(language, 'AuthCode_net_error'))
        return
      }
      const msg = transfer(language, this.errors[getCodeError.code])
      if (msg) Toast.fail(msg)
      else Toast.fail(transfer(language, 'AuthCode_failed_to_get_verification_code'))
    }
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
    const { updateBankResult, updateBankError, navigation, language } = nextProps
    if (updateBankResult && (updateBankResult !== this.props.updateBankResult)) {
      this.userUpdate(nextProps)
      Toast.success(transfer(language, 'bank_linked'))
      Overlay.hide(this.overlayViewKey)
      navigation.goBack()
      return
    }
    if (updateBankError && (updateBankError !== this.props.updateBankError)) {
      Overlay.hide(this.overlayViewKey)
      if (updateBankError.message === common.badNet) {
        Toast.fail(transfer(language, 'UpdateBank_net_error'))
        return
      }
      const msg = this.errors[updateBankError.code]
      if (msg) Toast.fail(transfer(language, msg))
      else Toast.fail(transfer(language, 'UpdateBank_blind_card_failed'))
    }
  }

  handleRequestCheck2GoogleCode(nextProps) {
    if (!nextProps.googleCodeLoading && this.props.googleCodeLoading) {
      const { googleCodeResponse, dispatch, formState, language } = nextProps
      if (googleCodeResponse.success) {
        dispatch(actions.requestUpdateBank({
          bankName: formState.bankName,
          subbankName: formState.subbankName,
          bankNo: formState.bankNo,
          googleCode: formState.googleCode,
        }))
      } else {
        const errCode = googleCodeResponse.error.code
        if (errCode === 4000171) {
          Toast.fail(transfer(language, 'AuthCode_bind_gv_code_first'))
        } else {
          Toast.fail(transfer(language, 'AuthCode_gv_code_error'))
        }
      }
      dispatch(actions.check2GoogleAuthSetResponse(null))
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
          title={transfer(language, 'UpdateBank_account_bank')}
          value={formState.bankName}
          placeholder={transfer(language, 'UpdateBank_account_bank_placeholder')}
          onChangeText={e => this.onChangeText(e, 'bankName')}
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
          onChangeText={e => this.onChangeText(e, 'subbankName')}
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
    language: store.system.language,
  }
}

export default connect(
  mapStateToProps,
)(UpdateBank)
