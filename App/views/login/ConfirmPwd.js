import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Image,
} from 'react-native'
import Toast from 'teaset/components/Toast/Toast'
import { common } from '../../constants/common'
import TKButton from '../../components/TKButton'
import TKSpinner from '../../components/TKSpinner'
import TKInputItem from '../../components/TKInputItem'
import actions from '../../actions/index'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import transfer from '../../localization/utils'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: common.bgColor,
  },
  inputView: {
    flex: undefined,
    marginTop: common.getH(90),
    marginLeft: common.margin38,
    marginRight: common.margin38,
  },
  input: {
    marginLeft: 0,
  },
  inputText: {
    width: common.w100,
  },
})

class ConfirmPwd extends Component {
  static navigationOptions(props) {
    return {
      headerStyle: {
        borderBottomWidth: 0,
      },
      headerTintColor: 'white',
      headerTransparent: true,
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
    this.showResetPasswordResponse = false
  }

  componentWillReceiveProps(nextProps) {
    this.HandleResetPasswordRequest(nextProps)
  }

  componentWillUnmount() {
    const { dispatch, mobile, code } = this.props
    dispatch(actions.registerUpdate({ mobile, code, password: '', passwordAgain: '' }))
  }

  onChange(event, tag) {
    const { text } = event.nativeEvent
    const { dispatch, mobile, code, password, passwordAgain } = this.props

    switch (tag) {
      case 'password':
        dispatch(actions.registerUpdate({ mobile, code, password: text, passwordAgain }))
        break
      case 'passwordAgain':
        dispatch(actions.registerUpdate({ mobile, code, password, passwordAgain: text }))
        break
      default:
        break
    }
  }

  confirmPress() {
    const { dispatch, mobile, code, password, passwordAgain, language } = this.props
    if (!password.length || !common.filterPwd(password)) {
      Toast.show({
        style: {
          paddingLeft: common.margin20,
          paddingRight: common.margin20,
        },
        text: transfer(language, 'login_passFormatterError'),
      })
      return
    }
    if (!passwordAgain.length) {
      Toast.fail(transfer(language, 'login_resetPass'))
      return
    }
    if (password !== passwordAgain) {
      Toast.fail(transfer(language, 'login_passwordDidMatch'))
      return
    }
    if (common.regMobile.test(mobile)) {
      dispatch(actions.resetPassword({
        mobile,
        code,
        newpassword: password,
      }))
    } else {
      dispatch(actions.resetPassword({
        email: mobile,
        code,
        newpassword: password,
      }))
    }
  }

  HandleResetPasswordRequest(nextProps) {
    const { dispatch, resetPasswordVisible, resetPasswordResponse,
      navigation, language } = nextProps
    if (!resetPasswordVisible && !this.showResetPasswordResponse) return

    if (resetPasswordVisible) {
      this.showResetPasswordResponse = true
    } else {
      this.showResetPasswordResponse = false
      if (resetPasswordResponse.success) {
        Toast.success(transfer(language, 'login_resetPasswordSuccess'))
        dispatch(actions.registerUpdate({ mobile: '', code: '', password: '', passwordAgain: '' }))
        navigation.goBack('Login')
      } else if (resetPasswordResponse.error.code === 4000104) {
        Toast.fail(transfer(language, 'login_phoneUnRegist2'))
      } else if (resetPasswordResponse.error.code === 4000101) {
        Toast.fail(transfer(language, 'login_codeNotNull'))
      } else if (resetPasswordResponse.error.code === 4000102) {
        Toast.fail(transfer(language, 'login_codeError'))
      } else if (resetPasswordResponse.error.message === common.badNet) {
        Toast.fail(transfer(language, 'login_networdError'))
      } else {
        Toast.fail(transfer(language, 'login_resetPasswordFailed'))
      }
    }
  }

  render() {
    const { password, passwordAgain,
      resetPasswordVisible, language } = this.props
    return (

      <ScrollView
        style={styles.container}
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustContentInsets={false}
      >
        <KeyboardAvoidingView
          contentContainerStyle={{ justifyContent: 'center' }}
          behavior="padding"
        >
          <TKInputItem
            viewStyle={styles.inputView}
            inputStyle={styles.input}
            titleStyle={styles.inputText}
            title={transfer(language, 'login_password')}
            placeholder={transfer(language, 'login_passwordPlaceholder')}
            value={password}
            maxLength={common.textInputMaxLenPwd}
            onChange={e => this.onChange(e, 'password')}
            secureTextEntry
          />

          <TKInputItem
            viewStyle={[styles.inputView, { marginTop: common.margin40 }]}
            inputStyle={styles.input}
            titleStyle={styles.inputText}
            title={transfer(language, 'login_reEnterPassword')}
            placeholder={transfer(language, 'login_pleaseReEnterPass')}
            value={passwordAgain}
            maxLength={common.textInputMaxLenPwd}
            onChange={e => this.onChange(e, 'passwordAgain')}
            secureTextEntry
          />

          <TKButton
            style={{ marginTop: common.getH(227) }}
            theme={'yellow'}
            caption={transfer(language, 'login_submit')}
            onPress={() => this.confirmPress()}
            disabled={resetPasswordVisible}
          />
        </KeyboardAvoidingView>
        <TKSpinner
          isVisible={resetPasswordVisible}
        />
      </ScrollView>
    )
  }
}

function mapStateToProps(store) {
  return {
    mobile: store.user.mobileRegister,
    code: store.user.codeRegister,
    password: store.user.passwordRegister,
    passwordAgain: store.user.passwordAgainRegister,

    resetPasswordVisible: store.user.resetPasswordVisible,
    resetPasswordResponse: store.user.resetPasswordResponse,
    language: store.system.language,
  }
}

export default connect(
  mapStateToProps,
)(ConfirmPwd)
