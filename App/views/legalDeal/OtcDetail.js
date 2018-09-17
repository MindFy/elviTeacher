import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Text,
  View,
  Image,
  StyleSheet,
  Keyboard,
} from 'react-native'
import {
  Toast,
  Overlay,
} from 'teaset'
import { BigNumber } from 'bignumber.js'
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import {
  common,
} from '../../constants/common'
import {
  requestOtcList,
  requestGetCode,
  requestConfirmPay,
  requestCancel,
  requestHavedPay,
  requestAllege,
  updateForm,
  updateOtcList,
  updateAuthCodeType,
  check2GoogleAuth,
  check2GoogleAuthSetResponse,
  check2SMSAuth,
  check2SmtpAuth,
  updateListPage,
} from '../../actions/otcDetail'
import actions from '../../actions/index'
import schemas from '../../schemas/index'
import AllegeView from './AllegeView'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import WithdrawAuthorizeCode from '../../views/balance/components/WithdrawAuthorizeCode'
import transfer from '../../localization/utils'

const styles = StyleSheet.create({
  row: {
    marginTop: common.margin10,
    marginLeft: common.margin10,
    marginRight: common.margin10,
    backgroundColor: common.navBgColor,
  },
  statusView: {
    height: common.h30,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: common.borderColor,
    borderBottomWidth: 0,
  },
  coin: {
    marginLeft: common.margin5,
    color: common.textColor,
    fontSize: common.font12,
  },
  direct: {
    marginLeft: common.margin20,
    fontSize: common.font12,
  },
  createdAt: {
    marginLeft: common.margin20,
    color: common.textColor,
    fontSize: common.font10,
  },
  status: {
    position: 'absolute',
    right: common.margin5,
    color: common.textColor,
    fontSize: common.font12,
  },
  rowBorderView: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  priceView: {
    width: '20%',
    borderWidth: 1,
    borderColor: common.borderColor,
    justifyContent: 'center',
  },
  price: {
    color: common.textColor,
    fontSize: common.font10,
    textAlign: 'center',
  },
  paymentBtn: {
    marginTop: common.margin10,
    alignSelf: 'center',
  },
  paymentTitle: {
    color: common.btnTextColor,
    fontSize: common.font10,
  },
  havedPayBtn: {
    marginTop: common.margin8,
    alignSelf: 'center',
    marginBottom: common.margin10,
  },
  allegeView: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
  },
  footerText: {
    color: common.textColor,
    fontSize: common.font14,
  },
})

class OtcDetail extends Component {
  static navigationOptions(props) {
    const params = props.navigation.state.params || {}
    let title = ''
    if (params.title) {
      title = params.title
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

  constructor() {
    super()
    this.state = {
      refreshState: RefreshState.Idle,
      showAllegeView: false,
    }
    this.firstRequest = true
    this.limit = 10
    this.skip = 0
    this.codeTitles = ['短信验证码', '谷歌验证码', '邮箱验证码']
  }

  componentWillMount() {
    const { language } = this.props
    this.props.navigation.setParams({
      title: transfer(language, 'OtcDetail'),
    })
  }

  componentDidMount() {
    const { loggedInResult } = this.props
    this.refreshOtcList({
      id: loggedInResult.id,
      skip: 0,
      limit: this.limit,
    })
  }

  componentWillReceiveProps(nextProps) {
    this.handleRequestGetCode(nextProps)
    this.handleRequestCancel(nextProps)
    this.handleRequestConfirmPay(nextProps)
    this.handleRequestHavedPay(nextProps)
    this.handleRequestOtcList(nextProps)
    this.handleRequestAllege(nextProps)
    this.handleRequestCheck2GoogleCode(nextProps)
    this.handleGetVerificateSMPTCodeRequest(nextProps)
    this.handleCheckVerificateSmptCodeRequest(nextProps)
    this.handleCheckVerificateCodeRequest(nextProps)
  }

  componentWillUnmount() {
    const { dispatch, formState } = this.props
    dispatch(updateForm({ ...formState, code: '', allegeText: '' }))
  }

  onChangeText(text, tag) {
    const { dispatch, formState } = this.props
    if (tag === 'code') {
      dispatch(updateForm({ ...formState, code: text }))
    } else if (tag === 'allege') {
      if (text.length > 50) return
      dispatch(updateForm({ ...formState, allegeText: text }))
    }
  }

  confirmPayPress(id, link) {
    Keyboard.dismiss()
    if (link === undefined) {
      return
    }
    if (link) {
      this.props.navigation.navigate('EmailCheck')
      return
    }
    const { loggedInResult, dispatch, formState, authCodeType, language } = this.props
    if (authCodeType === '短信验证码' || authCodeType === '邮箱验证码') {
      const code = authCodeType === '短信验证码' ? formState.code : formState.emailCode
      if (!code.length) {
        Toast.fail(transfer(language, 'AuthCode_enter_sms_code'))
        return
      }
      Overlay.hide(this.overlayViewKeyID)
      this.id = id
      if (authCodeType === '短信验证码') {
        dispatch(check2SMSAuth({
          mobile: loggedInResult.mobile,
          service: 'auth',
          code: formState.code,
        }))
        return
      }
      if (authCodeType === '邮箱验证码') {
        dispatch(check2SmtpAuth({
          email: loggedInResult.email,
          service: 'auth',
          code: formState.emailCode,
        }))
      }
    } else {
      const { googleCode } = formState
      if (!googleCode.length) {
        Toast.fail(transfer(language, 'AuthCode_enter_gv_code'))
        return
      }
      Overlay.hide(this.overlayViewKeyID)
      this.id = id
      dispatch(check2GoogleAuth({
        googleCode: formState.googleCode,
      }))
    }
  }

  cancelPress(title, id) {
    const { dispatch, formState, language } = this.props
    if (title === transfer(language, 'OtcDetail_cancelOrder')) {
      dispatch(requestCancel({ id }))
    } else if (title === transfer(language, 'OtcDetail_complaints')) {
      dispatch(updateForm({ ...formState, allegeText: '' }))
      this.setState({
        showAllegeView: true,
        allegeId: id,
      })
    }
  }

  havedPayPress(title, id) {
    const { dispatch, language } = this.props
    if (title === transfer(language, 'OtcDetail_i_paid')) {
      dispatch(requestHavedPay({ id }))
    } else if (title === transfer(language, 'OtcDetail_received')) {
      this.showAuthCode(id)
    }
  }

  allegeConfirmPress(data) {
    const { dispatch } = this.props
    dispatch(requestAllege(data))
  }

  refreshOtcList(data) {
    const { dispatch } = this.props
    this.props.dispatch(updateListPage(this.skip))
    dispatch(requestOtcList(schemas.findOtcList(data)))
  }

  authCodeChanged = (e, code) => {
    const { dispatch, formState, authCodeType } = this.props
    if (authCodeType === '短信验证码') {
      dispatch(updateForm({
        ...formState,
        code: code,
      }))
    } else if(authCodeType === '谷歌验证码'){
      dispatch(updateForm({
        ...formState,
        googleCode: code,
      }))
    }else{
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

    if (e.index === 0) {
      dispatch(updateForm({
        ...formState,
        googleCode: '',
        emailCode: '',
      }))
    } else if(e.index === 1){
      dispatch(updateForm({
        code: '',
        emailCode: '',
      }))
    } else {
      dispatch(updateForm({
        code: '',
        googleCode: '',
      }))
    }
  }

  SMSCodePress = (count) => {
    this.count = count
    const { loggedInResult, dispatch } = this.props
    dispatch(requestGetCode({ mobile: loggedInResult.mobile, service: 'auth' }))
  }

  showAuthCode = (id) => {
    const { dispatch, loggedInResult, formState, language } = this.props
    dispatch(updateAuthCodeType('短信验证码'))
    dispatch(updateForm({
      ...formState,
      SMSCode: '',
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
          dispatch={this.props.dispatch}
          titles={[transfer(language, 'AuthCode_SMS_code'), transfer(language, 'AuthCode_GV_code'), transfer(language, 'AuthCode_email_code')]}
          mobile={loggedInResult.mobile}
          email={loggedInResult.email}
          emailStatus={loggedInResult.emailStatus}
          onChangeText={this.authCodeChanged}
          segmentValueChanged={this.segmentValueChanged}
          smsCodePress={this.SMSCodePress}
          emsCodePress={(count) => {
            this.count = count
            dispatch(actions.getVerificateSmtpCode({ email: loggedInResult.email, service: 'check' }))
          }}
          confirmPress={link => this.confirmPayPress(id, link)}
          cancelPress={() => Overlay.hide(this.overlayViewKeyID)}
          language={language}
        />
      </Overlay.View>
    )
    this.overlayViewKeyID = Overlay.show(overlayView)
  }

  errors = {
    4000101: 'AuthCode_bad_phone_number_or_service_type',
    4000102: 'AuthCode_cannot_send_verification_code_repeatedly_within_one_minute',
    4000104: 'AuthCode_mobile_phone_number_registered',
    4000156: 'AuthCode_authorization_verification_failed',
    4001480: 'OtcDetail_order_statusexpired',
    4001421: 'OtcDetail_order_statusexpired',
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
        const msg = transfer(language, this.errors[getCodeError.code])
        if (msg) Toast.fail(msg)
        else Toast.fail(transfer(language, 'AuthCode_failed_to_get_verification_code'))
      }
    }
  }

  handleRequestCancel(nextProps) {
    const { dispatch, cancelResult, cancelError, otcList, language } = nextProps

    if (cancelResult && cancelResult !== this.props.cancelResult) {
      Toast.success(transfer(language, 'OtcDetail_revocation_successful'))
      const nextOtcList = otcList.concat()
      nextOtcList[this.operateIndex].status = 'cancel'
      dispatch(updateOtcList(nextOtcList))
    }
    if (cancelError && cancelError !== this.props.cancelError) {
      if (cancelError.message === common.badNet) {
        Toast.fail(transfer(language, 'OtcDetail_net_error'))
      } else {
        const msg = this.errors[cancelError.code]
        if (msg) Toast.fail(transfer(language, msg))
        else Toast.fail(transfer(language, 'OtcDetail_failed_to_cancel_the_order'))
      }
    }
  }

  handleRequestConfirmPay(nextProps) {
    const { dispatch, confirmPayResult, confirmPayError, otcList, language } = nextProps

    if (confirmPayResult && confirmPayResult !== this.props.confirmPayResult) {
      Toast.success(transfer(language, 'OtcDetail_confirm_successful'))
      Overlay.hide(this.overlayViewKey)
      const nextOtcList = otcList.concat()
      nextOtcList[this.operateIndex].status = 'complete'
      dispatch(updateOtcList(nextOtcList))
    }
    if (confirmPayError && confirmPayError !== this.props.confirmPayError) {
      if (confirmPayError.message === common.badNet) {
        Toast.fail(transfer(language, 'OtcDetail_net_error'))
      } else {
        const msg = this.errors[confirmPayError.code]
        if (msg) Toast.fail(transfer(language, msg))
        else Toast.fail(transfer(language, 'OtcDetail_confirm_failed'))
      }
    }
  }

  handleRequestHavedPay(nextProps) {
    const { dispatch, havedPayResult, havedPayError, otcList, language } = nextProps

    if (havedPayResult && havedPayResult !== this.props.havedPayResult) {
      Toast.success(transfer(language, 'OtcDetail_confirm_successful'))
      const nextOtcList = otcList.concat()
      nextOtcList[this.operateIndex].status = 'waitconfirm'
      dispatch(updateOtcList(nextOtcList))
    }
    if (havedPayError && havedPayError !== this.props.havedPayError) {
      if (havedPayError.message === common.badNet) {
        Toast.fail(transfer(language, 'OtcDetail_net_error'))
      } else {
        const msg = transfer(language, this.errors[havedPayError.code])
        if (msg) Toast.fail(msg)
        Toast.fail(transfer(language, 'OtcDetail_operation_failed'))
      }
    }
  }

  handleRequestCheck2GoogleCode(nextProps) {
    if (!nextProps.googleCodeLoading && this.props.googleCodeLoading) {
      const { googleCodeResponse, dispatch, formState, language } = nextProps
      if (googleCodeResponse.success) {
        dispatch(requestConfirmPay({ id: this.id, googleCode: formState.googleCode }))
      } else {
        const errCode = googleCodeResponse.error.code
        if (errCode === 4000171) {
          Toast.fail(transfer(language, 'AuthCode_bind_gv_code_first'))
        } else {
          Toast.fail(transfer(language, 'AuthCode_gv_code_error'))
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
    const { loggedInResult, checkSmtpCodeLoading, checkSmtpCodeResponse, dispatch, formState, language } = nextProps
    if (!this.props.checkSmtpCodeLoading || checkSmtpCodeLoading ){
      return
    } 
    if (checkSmtpCodeResponse.success) {
      dispatch(requestConfirmPay({ id: this.id, code: Number(formState.emailCode), email: loggedInResult.email }))
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
    const { loggedInResult, checkSMSCodeLoading, checkSMSCodeResponse, dispatch, formState, language } = nextProps
    if (!this.props.checkSMSCodeLoading || checkSMSCodeLoading ){
      return
    } 
    if (checkSMSCodeResponse.success) {
      dispatch(requestConfirmPay({ id: this.id, code: Number(formState.code), email: loggedInResult.email }))
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

  handleRequestAllege(nextProps) {
    const { dispatch, allegeResult, allegeError, otcList, language } = nextProps

    if (allegeResult && allegeResult !== this.props.allegeResult) {
      Toast.success(transfer(language, 'OtcDetail_complaint_successful'))
      const nextOtcList = otcList.concat()
      nextOtcList[this.operateIndex].isAllege = 'yes'
      dispatch(updateOtcList(nextOtcList))
      this.setState({ showAllegeView: false })
    }
    if (allegeError && allegeError !== this.props.allegeError) {
      if (allegeError.message === common.badNet) {
        Toast.fail(transfer(language, 'OtcDetail_net_error'))
      } else {
        const msg = this.errors[allegeError.code]
        if (msg) Toast.fail(transfer(language, msg))
        Toast.fail(transfer(language, 'OtcDetail_complaint_failed'))
      }
      this.setState({ showAllegeView: false })
    }
  }

  handleRequestOtcList(nextProps) {
    if (this.props.otcListLoading && !nextProps.otcListLoading) {
      this.firstRequest = false
      if (nextProps.otcListError) {
        this.setState({
          refreshState: RefreshState.Idle,
        })
      } else if (nextProps.otcList) {
        const otcListLength =
          nextProps.otcList.length < (this.skip + 1) * this.limit
        this.setState({
          refreshState: !otcListLength ? RefreshState.Idle : RefreshState.NoMoreData,
        })
      }
    }
  }

  handleHeaderRefresh = (id) => {
    if (this.firstRequest) return
    this.setState({ refreshState: RefreshState.HeaderRefreshing })
    this.skip = 0
    this.refreshOtcList({ id, skip: this.skip, limit: this.limit })
  }

  handleFooterRefresh = (id) => {
    if (this.firstRequest) return
    this.setState({ refreshState: RefreshState.FooterRefreshing })

    this.skip += 1
    // this.props.dispatch(updateListPage(this.skip))
    this.refreshOtcList({ id, skip: this.skip, limit: this.limit })
  }

  keyExtractor = item => item.id

  renderRow(rd, rid) {
    const { navigation, language } = this.props
    const createdAt = common.dfFullDate(rd.createdAt)
    let textColor = 'white'
    let status = ''
    let direct = ''
    let paymentBtnTitle = ''
    let havedPayTitle = ''
    let cancelBtnDisabled = true
    let confirmPayDisabled = true
    let havedPayDisabled = true
    let cancelBtnTitle
    const dealPrice = new BigNumber(rd.dealPrice).toFixed(2)
    const quantity = new BigNumber(rd.quantity).toFixed(2)
    const amount = new BigNumber(dealPrice).multipliedBy(quantity).toFixed(2, 1)
    switch (rd.status) {
      case common.legalDeal.status.waitpay:
        status =
          transfer(language,
            rd.direct === common.buy ? 'OtcDetail_unpaid' : 'OtcDetail_unReceived')
        cancelBtnDisabled = false
        havedPayDisabled = false
        break
      case common.legalDeal.status.waitconfirm:
        status = transfer(language, 'OtcDetail_unconfirmed')
        confirmPayDisabled = false
        break
      case common.legalDeal.status.complete:
        status = transfer(language, 'OtcDetail_closed')
        break
      case common.legalDeal.status.cancel:
        status = transfer(language, 'OtcDetail_cancel')
        break
      default:
        break
    }
    if (rd.direct === common.buy) {
      textColor = common.redColor
      direct = transfer(language, 'OtcDetail_buy')
      paymentBtnTitle = transfer(language, 'OtcDetail_Billing_info')
      havedPayTitle = transfer(language, 'OtcDetail_i_paid')
      cancelBtnTitle = transfer(language, 'OtcDetail_cancelOrder')
    } else if (rd.direct === common.sell) {
      textColor = common.greenColor
      direct = transfer(language, 'OtcDetail_sell')
      paymentBtnTitle = transfer(language, 'OtcDetail_payment_info')
      havedPayTitle = transfer(language, 'OtcDetail_received')
      cancelBtnTitle = transfer(language, 'OtcDetail_complaints')
      havedPayDisabled = confirmPayDisabled
    }
    const coin = common.legalDeal.token
    let cancelTitleColor = common.placeholderColor
    let havedPayTitleColor = common.placeholderColor

    const priceTip = transfer(language, 'OtcDetail_price')
    const amountTip = transfer(language, 'OtcDetail_amount')
    const totalTip = transfer(language, 'OtcDetail_total')

    if (!havedPayDisabled) {
      havedPayTitleColor = common.btnTextColor
    }
    if (cancelBtnTitle === transfer(language, 'OtcDetail_complaints')) {
      if (!havedPayDisabled && rd.isAllege === 'no') {
        cancelBtnDisabled = false
      } else {
        cancelBtnDisabled = true
      }
    }
    if (!cancelBtnDisabled) {
      cancelTitleColor = common.btnTextColor
    }
    return (
      <View style={styles.row}>
        <View style={styles.statusView}>
          <Text style={styles.coin}>
            {coin}</Text>
          <Text style={[styles.direct, { color: textColor }]}>
            {direct}</Text>
          <Text style={styles.createdAt}>
            {createdAt}</Text>
          <Text style={styles.status}>
            {status}</Text>
        </View>
        <View style={styles.rowBorderView}>
          <View style={styles.priceView}>
            <Text style={styles.price}>
              {`${priceTip}:¥${dealPrice}`}</Text>
          </View>
          <View style={[styles.priceView, { width: '30%' }]}>
            <Text style={styles.price}>
              {`${amountTip}:${quantity} ${common.legalDeal.token}`}</Text>
          </View>
          <View style={[styles.priceView, { width: '30%' }]}>
            <Text style={styles.price}>
              {`${totalTip}:¥${amount}`}</Text>
          </View>
          <View style={styles.priceView}>
            <NextTouchableOpacity
              style={styles.paymentBtn}
              activeOpacity={common.activeOpacity}
              onPress={() => {
                navigation.navigate('Payment', { data: rd, lang: language })
              }}
            >
              <Text style={styles.paymentTitle}>
                {paymentBtnTitle}</Text>
            </NextTouchableOpacity>
            <NextTouchableOpacity
              style={[styles.paymentBtn, {
                marginTop: common.margin8,
              }]}
              activeOpacity={common.activeOpacity}
              disabled={cancelBtnDisabled}
              onPress={() => {
                this.operateIndex = rid
                this.cancelPress(cancelBtnTitle, rd.id)
              }}
            >
              <Text
                style={{
                  color: cancelTitleColor,
                  fontSize: common.font10,
                }}
              >{cancelBtnTitle}</Text>
            </NextTouchableOpacity>
            <NextTouchableOpacity
              activeOpacity={common.activeOpacity}
              style={styles.havedPayBtn}
              disabled={havedPayDisabled}
              onPress={() => {
                this.operateIndex = rid
                this.havedPayPress(havedPayTitle, rd.id)
              }}
            >
              <Text
                style={{
                  color: havedPayTitleColor,
                  fontSize: common.font10,
                }}
              >{havedPayTitle}</Text>
            </NextTouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  renderAllegeView() {
    const { formState, language } = this.props
    const { showAllegeView, allegeId } = this.state
    const { allegeText } = formState

    if (showAllegeView) {
      return (
        <AllegeView
          style={styles.allegeView}
          onPress={() => this.setState({ showAllegeView: false })}
          inputValue={allegeText}
          onChangeText={e => this.onChangeText(e, 'allege')}
          placeholder={transfer(language, 'OtcDetail_fill_in_50_words')}
          cancelPress={() => this.setState({ showAllegeView: false })}
          confirmPress={() => {
            Keyboard.dismiss()
            if (!formState.allegeText || formState.allegeText.length > 50) {
              Toast.fail(transfer(language, 'OtcDetail_fill_in_50_words'))
              return
            }
            const data = { legaldeal_id: allegeId, reason: formState.allegeText }
            this.allegeConfirmPress(data)
          }}
          language={language}
        />
      )
    }
    return null
  }

  render() {
    const { loggedInResult, otcList, language } = this.props
    const { refreshState } = this.state

    return (
      <View style={{ flex: 1, backgroundColor: common.blackColor }}>
        <RefreshListView
          data={otcList}
          renderItem={({ item, index }) => this.renderRow(item, index)}
          keyExtractor={this.keyExtractor}
          refreshState={refreshState}
          onHeaderRefresh={() => { this.handleHeaderRefresh(loggedInResult.id) }}
          onFooterRefresh={() => { this.handleFooterRefresh(loggedInResult.id) }}
          footerTextStyle={styles.footerText}
          footerRefreshingText={transfer(language, 'exchange_dataInLoading')}
          footerFailureText={transfer(language, 'exchange_dataFailureText')}
          footerNoMoreDataText={transfer(language, 'exchange_dataNoMoreData')}
        />
        {this.renderAllegeView()}
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state.otcDetail,
    loggedInResult: state.authorize.loggedInResult,
    language: state.system.language,
    getVerificateSmtpCodeLoading: state.user.getVerificateSmtpCodeVisible,
    getVerificateSmtpCodeResponse: state.user.getVerificateSmtpCodeResponse,
  }
}

export default connect(
  mapStateToProps,
)(OtcDetail)
