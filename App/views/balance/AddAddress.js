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
    const { navigation, dispatch, user, language, loggedIn } = this.props
    this.handleRequestGetCode(nextProps)
    if (nextProps.error) {
      const errCode = nextProps.error.code
      const errMsg = this.errMsgs[errCode]
      if (errMsg) {
        Toast.fail(transfer(language, errMsg))
      } else {
        Toast.fail(transfer(language, 'add_address_failed'))
      }
      dispatch(requestAddressClearError())
      if(loggedIn) dispatch(actions.sync())
    }

    if (this.props.loading && !nextProps.loading) {
      Toast.success(transfer(language, 'add_address_succeed'))
      Overlay.hide(this.overlayViewKeyID)
      dispatch(requestWithdrawAddress(findAddress(user.id)))
      navigation.goBack()
    }
  }

  componentDidMount() {
    const { dispatch, loggedIn } = this.props
    if(loggedIn) dispatch(actions.sync())
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(updateForm({
      address: '',
      remark: '',
      smsCode: '',
      googleCode: '',
      emailCode: '',
    }))
  }

  getCodeErrors = {
    4000107: 'me_Email_repeatMinute',
    4031601: 'Otc_please_login_to_operate'
  }

  codeTitles = ['短信验证码', '谷歌验证码', '邮箱验证码']

  errMsgs = {
    4000156: 'login_codeError',
    4000413: 'withdraw_address_length_error',
    4000416: 'withdraw_address_error',
    4031601: 'Otc_please_login_to_operate'
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
      const msg = transfer(language, this.getCodeErrors[requestGetCodeResponse.error.code])
      if (msg){
        Toast.fail(msg)
      } else{
        Toast.fail(transfer(language, 'AuthCode_failed_to_get_verification_code'))
      }
      if(loggedIn) dispatch(actions.sync())
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

  checkWithdrawAddressIsIneligible = (address, coin) => {
    const isIneligible =
    !TKWAValidator.validate(address, coin) &&
    !TKWAValidator.validate(address, coin, 'testnet')

    return isIneligible
  }

  confirmPress() {
    const { formState, language, requestPair } = this.props
    if (!formState.address.length) {
      Toast.fail(transfer(language, 'withdrawal_address_required'))
      return
    }

    const { address } = formState
    const { navigation } = this.props
    const { title } = navigation.state.params

    let item = title
    if(requestPair && requestPair.coinIdDic[item] && requestPair.coinIdDic[item].contract.chain){
      item = requestPair.coinIdDic[item].contract.chain
    }

    if (this.checkWithdrawAddressIsIneligible(address, item)) {
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
      return
    }

    const { dispatch, formState, authCodeType, language, user, navigation } = this.props
    const { smsCode, googleCode, emailCode, remark, address } = formState
    if (authCodeType === '短信验证码') {
      if (!smsCode || smsCode.length === 0) {
        Toast.fail(transfer(language, 'me_enter_mobileVerification'))
        return
      }
      dispatch(requestAddressAdd({
        token_id: navigation.state.params.tokenId,
        withdrawaddr: address,
        remark: remark,
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
      dispatch(requestAddressAdd({
        token_id: navigation.state.params.tokenId,
        withdrawaddr: address,
        remark: remark,
        googleCode: googleCode,
      }))
      return
    }
    if (authCodeType === '邮箱验证码') {
      if (!emailCode || emailCode.length === 0) {
        Toast.fail(transfer(language, 'me_enter_EmailVerification'))
        return
      }
      dispatch(requestAddressAdd({
        token_id: navigation.state.params.tokenId,
        withdrawaddr: address,
        remark: remark,
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
    } else{
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
    dispatch(requestGetCode({ mobile: user.mobile, service: 'address_add' }))
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
            dispatch(requestGetCode({ email: user.email, service: 'address_add' }))
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
    loggedIn: state.authorize.loggedIn,
    requestPair: state.home.requestPair,
    
  }
}

export default connect(
  mapStateToProps,
)(AddAddress)
