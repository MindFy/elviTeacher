import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Alert,
  Keyboard,
} from 'react-native'
import {
  Toast,
  Overlay,
} from 'teaset'
import WAValidator from 'wallet-address-validator'
import { common } from '../../constants/common'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import {
  updateForm,
  requestAddressAdd,
  requestAddressClearError,
  updateAuthCodeType,
  check2GoogleAuth,
  check2GoogleAuthSetResponse,
  requestGetCode,
} from '../../actions/addressAdd'
import { requestWithdrawAddress } from '../../actions/withdraw'
import TKButton from '../../components/TKButton'
import TKInputItem from '../../components/TKInputItem'
import findAddress from '../../schemas/address'
import WithdrawAuthorizeCode from './components/WithdrawAuthorizeCode'
import transfer from '../../localization/utils'

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
    const { navigation, dispatch, user, language } = this.props
    this.handleRequestGetCode(nextProps)
    this.handleRequestCheck2GoogleCode(nextProps)
    if (nextProps.error) {
      Overlay.hide(this.overlayViewKey)
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
      Toast.fail(transfer(language, 'add_address_succeed'))
      Overlay.hide(this.overlayViewKey)
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
    }))
  }

  getCodeErrors = {
    4000101: 'login_numberOrTypeError',
    4000102: 'me_Email_repeatMinute',
    4000104: 'me_phoneRegisted',
  }

  codeTitles = ['短信验证码', '谷歌验证码']

  errMsgs = {
    4000413: 'withdraw_address_length_error',
    4000414: 'withdraw_address_exist',
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
    !WAValidator.validate(address, coin) &&
    !WAValidator.validate(address, coin, 'testnet')

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

  addPress() {
    Keyboard.dismiss()
    Overlay.hide(this.overlayViewKeyID)

    const { authCodeType, formState, dispatch, language } = this.props
    if (authCodeType === '短信验证码') {
      if (!formState.authCode.length) {
        Toast.fail(transfer(language, 'login_inputCode'))
        return
      }
      const { navigation } = this.props
      dispatch(requestAddressAdd({
        token_id: navigation.state.params.tokenId,
        withdrawaddr: formState.address,
        remark: formState.remark,
        code: formState.authCode,
      }))
    } else {
      if (!formState.googleCode.length) {
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
    } else {
      dispatch(updateForm({
        ...formState,
        googleCode: code,
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
      }))
    } else {
      dispatch(updateForm({
        ...formState,
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
          confirmPress={() => this.addPress()}
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
  }
}

export default connect(
  mapStateToProps,
)(AddAddress)
