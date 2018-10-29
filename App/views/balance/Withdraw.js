import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Keyboard,
  AsyncStorage,
} from 'react-native'
import {
  Toast,
  Overlay,
  ActionSheet,
} from 'teaset'
import { BigNumber } from 'bignumber.js'
import { common } from '../../constants/common'
import {
  coinSelected,
  toggleForm,
  updateForm,
  requestBalance,
  requestWithdraw,
  requestValuation,
  withdrawClear,
  requestWithdrawClearError,
  requestWithdrawAddress,
  updateAuthCodeType,
  requestGetCode,
  requestPairs,
} from '../../actions/withdraw'
import actions from '../../actions/index'
import WithdrawAuthorizeCode from './components/WithdrawAuthorizeCode'
import TKButton from '../../components/TKButton'
import TKInputItem from '../../components/TKInputItem'
import findAddress from '../../schemas/address'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
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
  contaier: {
    flex: 1,
    backgroundColor: common.blackColor,
  },
  coinSelector: {
    marginTop: common.margin10,
    height: common.h40,
    backgroundColor: common.navBgColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  currCoin: {
    marginLeft: common.margin10,
    fontSize: common.font14,
    color: common.textColor,
    alignSelf: 'center',
  },
  coinView: {
    marginTop: common.margin5,
    height: common.h40,
    backgroundColor: common.navBgColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  coinText: {
    marginLeft: common.margin10,
    fontSize: common.font14,
    color: common.textColor,
    alignSelf: 'center',
  },
  showAddressImage: {
    position: 'absolute',
    left: common.getH(10),
  },
  balanceTip: {
    marginTop: common.margin22,
    fontSize: common.font16,
    color: common.placeholderColor,
    alignSelf: 'center',
  },
  balance: {
    marginTop: common.margin10,
    marginLeft: common.margin10,
    marginRight: common.margin10,
    fontSize: common.font30,
    alignSelf: 'center',
    textAlign: 'center',
    color: 'white',
  },
  amountView: {
    marginTop: common.margin35,
    marginLeft: common.margin10,
    marginRight: common.margin10,
    justifyContent: 'center',
    height: common.h35,
  },
  amountInput: {
    textAlign: 'center',
  },
  addressInput: {
    marginLeft: common.getH(40),
    textAlign: 'center',
  },
  withdrawAddress: {

  },
  withdrawBtn: {
    marginTop: common.margin40,
  },
  extraBtnCover: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  overlay: {
    justifyContent: 'center',
  },
  googleAuthView: {
    marginTop: -common.margin127 * 2,
    borderRadius: common.radius6,
    height: common.h60,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '50%',
  },
  googleAuthTip: {
    fontSize: common.font16,
    color: common.blackColor,
    alignSelf: 'center',
  },
  codeImage: {
    width: common.w20,
    height: common.w20,
  },
})

class WithDraw extends Component {
  static navigationOptions(props) {
    let title = ''
    if (props.navigation.state.params) {
      title = props.navigation.state.params.title
    }
    return {
      headerTitle: title,
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

  constructor(props) {
    super(props)
    this.withdrawErrorDic = {
      4000156: 'login_codeError',
      4000414: 'withdraw_address_exist',
      4000416: 'withdraw_address_error',
      4000606: 'withdraw_address_error',
      4000608: 'withdraw_error_after_pwd_changed',
      4000668: 'withdraw_account_frozen',
    }
    this.verificationCodeErrorDic = {
      4000156: 'login_codeError',
      4000107: 'me_Email_repeatMinute',
    }

    this.codeTitles = ['短信验证码', '谷歌验证码', '邮箱验证码']
    this.canWithdrawCoins = common.getDefaultPair().canWithdrawCoins
  }

  componentWillMount() {
    const { navigation } = this.props
    const params = navigation.state.params
    if (!params || !params.hideShowForm) {
      this.showForm()
    }
  }

  componentDidMount() {
    const { dispatch, user, navigation, language } = this.props
    navigation.setParams({
      title: transfer(language, 'balances_withdraw'),
    })
    dispatch(requestPairs())
    dispatch(requestValuation())
    dispatch(requestWithdrawAddress(findAddress(user.id)))
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, withdrawLoading, language, requestPairStatus, currCoin } = this.props
    this.handleRequestGetCode(nextProps)
    if (withdrawLoading && !nextProps.withdrawLoading && nextProps.withdrawSuccess) {
      Toast.success(transfer(language, 'withdrawal_succeed'))
      Overlay.hide(this.overlayViewKeyID)
      this.props.navigation.navigate('Balance')
    }

    if (nextProps.withdrawError) {
      const errMsg = this.withdrawErrorDic[nextProps.withdrawError.code]
      if (errMsg) {
        Toast.fail(transfer(language, errMsg))
      } else {
        Toast.fail(transfer(language, 'withdrawal_failed'))
      }
      dispatch(requestWithdrawClearError())
    }
    if (nextProps.requestPairStatus === 2 && requestPairStatus !== 1) {
      // 加载失败
      dispatch(requestPairs())
    } else if (nextProps.requestPairStatus === 1 && requestPairStatus !== 1) {
      common.setDefaultPair(nextProps.requestPair)
      AsyncStorage.setItem('local_pair', JSON.stringify(nextProps.requestPair), () => { })
      this.canWithdrawCoins = common.getDefaultPair().canWithdrawCoins
      this.coinsIdDic = common.getDefaultPair().coinIdDic
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(withdrawClear())
  }

  onChangeAuthCode = (e, code) => {
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

  onChangeWithdrawAmount = (withdrawAmount) => {
    const { dispatch, formState, balance, currCoin, language   } = this.props
    if (!withdrawAmount) {
      dispatch(updateForm({
        ...formState,
        withdrawAmount,
      }))
      return
    }
    const bWithdrawAmount = new BigNumber(withdrawAmount)

    if (bWithdrawAmount.isNaN()) {
      return
    }
    const bMaxBalace = new BigNumber(balance).dp(8, 1)
    if (bWithdrawAmount.gt(bMaxBalace)) {
      if(currCoin === 'ONT' && balance.indexOf('.') >= 0){
        dispatch(updateForm({
          ...formState,
          withdrawAmount: balance.split('.')[0],
        }))
        return
      }

      dispatch(updateForm({
        ...formState,
        withdrawAmount: bMaxBalace.toFixed(),
      }))
      return
    }
    const splitArr = withdrawAmount.split('.')
    if (splitArr[0].length > common.maxLenDelegate) { // 整数长度限制
      return
    }

    if (splitArr.length > 1 && splitArr[1].length > 8) { // 小数长度限制
      return
    }

    if(currCoin === 'ONT' && withdrawAmount.indexOf('.') >= 0){
      Keyboard.dismiss()
      Toast.fail(transfer(language, 'NoDecimal'))
      return
    }
    
    dispatch(updateForm({
      ...formState,
      withdrawAmount,
    }))
  }

  onChangeWithdrawAddress = (withdrawAddress) => {
    const { dispatch, formState } = this.props

    dispatch(updateForm({
      ...formState,
      withdrawAddress,
    }))
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
      const msg = transfer(language, this.verificationCodeErrorDic[requestGetCodeResponse.error.code])
      if (msg) Toast.fail(msg)
      else Toast.fail(transfer(language, 'AuthCode_failed_to_get_verification_code'))
    }
  }

  showForm() {
    const { dispatch } = this.props
    dispatch(toggleForm())
  }

  tapCoinListCell = (ele) => {
    const {
      dispatch,
      formState,
    } = this.props


    dispatch(updateForm({
      ...formState,
      withdrawAmount: '',
      withdrawAddress: '',
      smsCode: '',
      googleCode: '',
      emailCode: '',
    }))
    dispatch(coinSelected(ele))
    dispatch(requestBalance({
      token_ids: [this.coinsIdDic[ele].id],
    }))
  }

  coinsIdDic = common.getDefaultPair().coinIdDic

  checkValuationIsEmpty = () => {
    const { valuation } = this.props

    if (!valuation) {
      return true
    }

    const { count, rates } = valuation
    if (!count || Object.keys(count).length === 0) {
      return true
    }

    if (!rates || Object.keys(rates).length === 0) {
      return true
    }

    return false
  }

  checkWithdrawAddressIsIneligible = (address, coin) => {
    const isIneligible =
      !TKWAValidator.validate(address, coin) &&
      !TKWAValidator.validate(address, coin, 'testnet')

    return isIneligible
  }

  withdrawPress() {
    Keyboard.dismiss()

    if (this.checkValuationIsEmpty()) {
      const { dispatch } = this.props
      dispatch(requestValuation())
      return
    }

    const { formState, language } = this.props

    if (!formState.withdrawAmount) {
      Toast.fail(transfer(language, 'withdrawal_amount_required'))
      return
    }

    const bAmount = new BigNumber(formState.withdrawAmount)
    if (bAmount.eq(0)) {
      Toast.fail(transfer(language, 'withdrawal_amount_required'))
      return
    }

    const { currCoin } = this.props
    const { valuation } = this.props
    const { count, rates } = valuation
    const { quotaCount, withdrawedCount } = count
    const bQuotaCount = new BigNumber(quotaCount)
    const bWithdrawedCount = new BigNumber(withdrawedCount)
    const bToBTC = new BigNumber(rates[currCoin].BTC)

    const limitNumber = bQuotaCount.minus(bWithdrawedCount)

    const minAmount = this.coinsIdDic[currCoin].minAmount
    const minAmountMsg = `${transfer(language, 'minimum_withdrawal')}${minAmount}`

    if (bAmount.multipliedBy(bToBTC).gt(limitNumber)) {
      Toast.fail(transfer(language, 'withdrawal_exceed_limit'))
      return
    }
    if (bAmount.lt(minAmount)) {
      Toast.fail(minAmountMsg)
      return
    }

    if (!formState.withdrawAddress) {
      Toast.fail(transfer(language, 'withdrawal_address_required'))
      return
    }

    if (this.checkWithdrawAddressIsIneligible(formState.withdrawAddress, currCoin)) {
      Alert.alert(
        transfer(language, 'withdraw_scanNote'),
        `${transfer(language, 'withdrawal_address_correct_required_1')}${currCoin}${transfer(language, 'withdrawal_address_correct_required_2')}`,
        [
          {
            text: transfer(language, 'withdrawal_confirm'),
            onPress: () => { },
          },
        ],
      )
      return
    }

    this.showVerificationCode()
  }

  confirmPress = (link) => {
    Keyboard.dismiss()

    if (link === undefined) {
      return
    }
    if (link) {
      return
    }
    const { dispatch, formState, authCodeType, language, user, currCoin } = this.props
    const { smsCode, googleCode, emailCode, withdrawAmount, withdrawAddress } = formState
    const tokenId = this.coinsIdDic[currCoin].id
    if (authCodeType === '短信验证码') {
      if (!smsCode || smsCode.length === 0) {
        Toast.fail(transfer(language, 'me_enter_mobileVerification'))
        return
      }
      dispatch(requestWithdraw({
        token_id: tokenId,
        amount: withdrawAmount,
        toaddr: withdrawAddress,
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
      dispatch(requestWithdraw({
        token_id: tokenId,
        amount: withdrawAmount,
        toaddr: withdrawAddress,
        googleCode: googleCode,
      }))
      return
    }
    if (authCodeType === '邮箱验证码') {
      if (!emailCode || emailCode.length === 0) {
        Toast.fail(transfer(language, 'me_enter_EmailVerification'))
        return
      }
      dispatch(requestWithdraw({
        token_id: tokenId,
        amount: withdrawAmount,
        toaddr: withdrawAddress,
        email: user.email,
        code: emailCode,
      }))
    }
  }

  alertBindingGoogleCode = () => {
    const { language } = this.props
    const googleCodeAlert = (
      <Overlay.View
        style={styles.overlay}
        modal={false}
        overlayOpacity={0}
      >
        <View style={styles.googleAuthView} >
          <Text
            style={styles.googleAuthTip}
          >{transfer(language, 'me_googleBindReminder')}</Text>
        </View>
      </Overlay.View>
    )
    this.googleCodeAlertId = Overlay.show(googleCodeAlert)
    setTimeout(() => {
      Overlay.hide(this.googleCodeAlertId)
    }, 2000)
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

  showVerificationCode = () => {
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
        style={styles.overlay}
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
          onChangeText={this.onChangeAuthCode}
          segmentValueChanged={this.segmentValueChanged}
          smsCodePress={(count) => {
            this.count = count
            dispatch(requestGetCode({ mobile: user.mobile, service: 'withdraw' }))
          }}
          emsCodePress={(count) => {
            this.count = count
            dispatch(requestGetCode({ email: user.email, service: 'withdraw' }))
          }}
          confirmPress={link => this.confirmPress(link)}
          cancelPress={() => Overlay.hide(this.overlayViewKeyID)}
          language={language}
        />
      </Overlay.View>
    )
    this.overlayViewKeyID = Overlay.show(overlayView)
  }

  selectAddress = (withdrawAddress) => {
    const { dispatch, formState } = this.props
    dispatch(updateForm({
      ...formState,
      withdrawAddress,
    }))
  }

  addAddressPress = () => {
    const { currCoin, language } = this.props
    const tokenId = this.coinsIdDic[currCoin].id
    this.props.navigation.navigate('AddAddress', {
      title: currCoin,
      headerTitle: transfer(language, 'withdrawal_add_address'),
      tokenId,
    })
  }

  jumpToScanPage() {
    const { navigation, currCoin, dispatch, formState } = this.props
    navigation.navigate('ScanBarCode', {
      coin: currCoin,
      didScan: (val) => {
        dispatch(updateForm({
          ...formState,
          withdrawAddress: val,
        }))
      },
    })
  }

  tapAddAddress = () => {
    Keyboard.dismiss()

    const { address = [], currCoin, language } = this.props
    const items = []
    for (let i = 0; i < address.length; i++) {
      const element = address[i]
      if (element.token.name === currCoin) {
        items.push({
          title: element.withdrawaddr,
          onPress: () => this.selectAddress(element.withdrawaddr),
        })
      }
    }
    items.push({
      title: transfer(language, 'withdrawal_add_address'),
      onPress: () => this.addAddressPress(),
    })
    const cancelItem = { title: transfer(language, 'withdrawal_cancel') }
    ActionSheet.show(items, cancelItem)
  }

  renderCoinSelector() {
    const { currCoin, listToggled, language } = this.props

    return (
      <NextTouchableOpacity
        activeOpacity={common.activeOpacity}
        onPress={() => this.showForm()}
        delay={100}
      >
        <View
          style={styles.coinSelector}
        >
          <Text
            style={styles.currCoin}
          >{currCoin === '选择币种' ? transfer(language, 'deposit_select_coin') : currCoin}</Text>
          <View style={{ alignSelf: 'center' }}>
            <Image
              style={listToggled ? {
                marginRight: common.margin10,
                width: common.h20,
                height: common.w10,
              } : {
                marginRight: common.margin10,
                height: common.h20,
                width: common.w10,
              }}
              source={(listToggled ?
                require('../../assets/arrow_down.png') :
                require('../../assets/arrow_right.png'))}
            />
          </View>
        </View>
      </NextTouchableOpacity>
    )
  }

  renderCoinList() {
    const { listToggled, language } = this.props
    const coinList = common.getDefaultPair().canWithdrawCoins
    let coinListEx = []
    if(coinList && common.getDefaultPair()['coinIdDic']['FO']){
      coinListEx = [transfer(language, 'FO_temp_hint')]
    }
    coinListEx = coinList.concat(coinListEx)
    return !listToggled ? null : coinListEx.map(ele => (
      <NextTouchableOpacity
        style={{
          marginTop: common.margin5,
          height: ele === transfer(language, 'FO_temp_hint') ? common.h60 : common.h40,
          backgroundColor: common.navBgColor,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        key={ele}
        activeOpacity={common.activeOpacity}
        onPress={() => {
          if(ele === transfer(language, 'FO_temp_hint')){
            return
          }
          this.tapCoinListCell(ele)
        }}
        delay={100}
      >
        <Text
          style={styles.coinText}
        >{ele}</Text>
      </NextTouchableOpacity>
    ))
  }

  renderFormWithdrawAmount = () => {
    const { formState, language } = this.props
    return (
      <TKInputItem
        viewStyle={styles.amountView}
        inputStyle={styles.amountInput}
        placeholder={transfer(language, 'withdrawal_amount')}
        value={formState.withdrawAmount}
        onChangeText={this.onChangeWithdrawAmount}
      />
    )
  }

  renderFormFeeOrBalanceReceived = () => {
    const { currCoin, formState, language } = this.props
    const fee = this.coinsIdDic[currCoin].fee
    let bAalanceReceived = '0'
    if (formState.withdrawAmount) {
      const tFee = this.coinsIdDic[currCoin].fee
      const bAmount = new BigNumber(formState.withdrawAmount)
      bAalanceReceived = bAmount.minus(tFee).toFixed(8, 1)
      if (BigNumber(bAalanceReceived).lt(0)) {
        bAalanceReceived = '0'
      }
    }
    return (
      <View
        style={{
          marginTop: common.margin5,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text
          style={{
            marginLeft: common.margin10,
            color: common.textColor,
            fontSize: common.font12,
            alignSelf: 'center',
          }}
        >{`${transfer(language, 'withdrawal_fee')}: ${fee}${currCoin}`}</Text>
        <Text
          style={{
            marginRight: common.margin10,
            marginLeft: common.margin10,
            color: common.textColor,
            fontSize: common.font12,
            alignSelf: 'center',
          }}
        >{`${transfer(language, 'withdrawal_you_will_get')}: ${bAalanceReceived}`}</Text>
      </View>
    )
  }

  renderFormWithdrawAddress = () => {
    const { dispatch, formState, language } = this.props

    return (
      <View style={styles.amountView}>
        <TKInputItem
          inputStyle={styles.addressInput}
          placeholder={transfer(language, 'withdrawal_address')}
          value={formState.withdrawAddress}
          onChangeText={(withdrawAddress = '') => dispatch(updateForm({
            ...formState,
            withdrawAddress: withdrawAddress.trim(),
          }))}
          onFocus={() => {
            if (!common.IsIOS) {
              this.setState({
                topOffset: -100,
              })
            }
          }}
          textInputProps={{
            onEndEditing: () => {
              if (!common.IsIOS) {
                this.setState({
                  topOffset: 0,
                })
              }
            },
          }}
          extra={() => (
            <NextTouchableOpacity
              style={styles.extraBtnCover}
              activeOpacity={common.activeOpacity}
              onPress={() => {
                Keyboard.dismiss()
                this.jumpToScanPage()
              }}
            >
              <Image
                style={styles.codeImage}
                source={require('../../assets/qrcode_white.png')}
              />
            </NextTouchableOpacity>
          )}
        />
        <NextTouchableOpacity
          style={styles.showAddressImage}
          activeOpacity={common.activeOpacity}
          onPress={() => this.tapAddAddress()}
        >
          <Image
            style={styles.codeImage}
            resizeMode="contain"
            source={require('../../assets/arrow_down.png')}
          />
        </NextTouchableOpacity>
      </View>
    )
  }

  renderFormWithdrawBtn = () => {
    const { formState, language } = this.props
    const { withdrawAmount } = formState
    let disabled = false
    let captionColor = common.btnTextColor
    if (!withdrawAmount || BigNumber(withdrawAmount).eq(0)) {
      disabled = true
      captionColor = common.placeholderColor
    }
    return (
      <TKButton
        style={styles.withdrawBtn}
        titleStyle={{ color: captionColor }}
        onPress={() => this.withdrawPress()}
        theme={'gray'}
        caption={transfer(language, 'withdrawal')}
        disabled={disabled}
      />
    )
  }

  renderFormTip = () => {
    const { currCoin, language } = this.props
    const minAmount = this.coinsIdDic[currCoin].minAmount
    return (
      <View>
        <Text
          style={{
            marginTop: common.margin10,
            marginLeft: common.margin10,
            marginRight: common.margin10,
            color: common.textColor,
            fontSize: common.font12,
            lineHeight: common.h15,
          }}
        >{transfer(language, 'deposit_please_note')}</Text>
        <Text
          style={{
            marginTop: common.margin10,
            marginLeft: common.margin10,
            marginRight: common.margin10,
            color: common.textColor,
            fontSize: common.font10,
            lineHeight: common.h15,
          }}
        >{`${transfer(language, 'withdrawal_note_1')}${minAmount} ${currCoin}
${transfer(language, 'withdrawal_note_2')}`}
        </Text>
      </View>
    )
  }

  renderForm() {
    const {
      balance,
      currCoin,
      listToggled,
      language,
    } = this.props

    const bBalance = new BigNumber(balance)
    let balanceString = ''
    if (bBalance.isNaN()) {
      balanceString = '0'
    } else {
      balanceString = bBalance.toFixed(8, 1)
    }

    return (currCoin !== '选择币种' && !listToggled) ? (
      (
        <View>
          <Text style={styles.balanceTip}>{transfer(language, 'withdrawal_available')}</Text>
          <Text style={styles.balance}>{balanceString}</Text>
          {
            (this.canWithdrawCoins.includes(currCoin)) &&
            <View>
              {this.renderFormWithdrawAmount()}
              {this.renderFormFeeOrBalanceReceived()}
              {this.renderFormWithdrawAddress()}
              {this.renderFormWithdrawBtn()}
              {this.renderFormTip()}
            </View>
          }
        </View>
      )
    ) : null
  }

  render() {
    const coinSelector = this.renderCoinSelector()
    const coinList = this.renderCoinList()
    const form = this.renderForm()
    return (
      <ScrollView
        style={styles.contaier}
        keyboardShouldPersistTaps="handled"
      >
        <KeyboardAvoidingView
          behavior="padding"
        >
          {coinSelector}
          {coinList}
          {form}
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state.withdraw,
    user: state.user.user,
    language: state.system.language,
  }
}

export default connect(
  mapStateToProps,
)(WithDraw)
