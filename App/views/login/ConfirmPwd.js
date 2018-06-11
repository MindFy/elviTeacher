import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
} from 'react-native'
import Toast from 'teaset/components/Toast/Toast'
import { common } from '../../constants/common'
import TKButton from '../../components/TKButton'
import TKSpinner from '../../components/TKSpinner'
import TKInputItem from '../../components/TKInputItem'
import actions from '../../actions/index'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: common.bgColor,
  },
  inputView: {
    flex: undefined,
    marginTop: common.margin110,
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
      headerTitle: '确认密码',
      headerStyle: {
        backgroundColor: common.navBgColor,
        borderBottomWidth: 0,
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontSize: common.font16,
      },
      headerLeft: (
        <TouchableOpacity
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
        </TouchableOpacity>
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
    const { dispatch, mobile, code, password, passwordAgain } = this.props
    if (!password.length || !common.regPassword.test(password)
      || !common.regSpace.test(password)) {
      Toast.show({
        style: {
          paddingLeft: common.margin20,
          paddingRight: common.margin20,
        },
        text: common.regPasswordMsg,
        position: 'bottom',
      })
      return
    }
    if (!passwordAgain.length) {
      Toast.fail('请再次设置密码')
      return
    }
    if (password !== passwordAgain) {
      Toast.fail('两次密码输入不一致')
      return
    }
    dispatch(actions.resetPassword({
      mobile,
      code,
      newpassword: password,
    }))
  }

  HandleResetPasswordRequest(nextProps) {
    const { dispatch, resetPasswordVisible, resetPasswordResponse, navigation } = nextProps
    if (!resetPasswordVisible && !this.showResetPasswordResponse) return

    if (resetPasswordVisible) {
      this.showResetPasswordResponse = true
    } else {
      this.showResetPasswordResponse = false
      if (resetPasswordResponse.success) {
        Toast.success('重置密码成功')
        dispatch(actions.registerUpdate({ mobile: '', code: '', password: '', passwordAgain: '' }))
        navigation.goBack('Login')
      } else if (resetPasswordResponse.error.code === 4000104) {
        Toast.fail('手机号未注册')
      } else if (resetPasswordResponse.error.code === 4000101) {
        Toast.fail('验证码不能为空')
      } else if (resetPasswordResponse.error.code === 4000102) {
        Toast.fail('验证码错误')
      } else if (resetPasswordResponse.error.message === common.badNet) {
        Toast.fail('网络连接失败，请稍后重试')
      } else {
        Toast.fail('重置密码失败，请稍后再试')
      }
    }
  }

  render() {
    const { password, passwordAgain, resetPasswordVisible } = this.props
    return (

      <ScrollView
        style={styles.container}
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustContentInsets={false}
      >
        <KeyboardAvoidingView
          contentContainerStyle={{ justifyContent: 'center' }}
          behavior="position"
        >
          <TKInputItem
            viewStyle={styles.inputView}
            inputStyle={styles.input}
            titleStyle={styles.inputText}
            title="密码"
            placeholder="请输入密码"
            value={password}
            maxLength={common.textInputMaxLenPwd}
            onChange={e => this.onChange(e, 'password')}
            secureTextEntry
          />

          <TKInputItem
            viewStyle={[styles.inputView, { marginTop: common.margin40 }]}
            inputStyle={styles.input}
            titleStyle={styles.inputText}
            title="再次输入新密码"
            placeholder="请再次输入新密码"
            value={passwordAgain}
            maxLength={common.textInputMaxLenPwd}
            onChange={e => this.onChange(e, 'passwordAgain')}
            secureTextEntry
          />

          <TKButton
            style={{ marginTop: common.margin210 }}
            theme={'yellow'}
            caption="确定"
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
  }
}

export default connect(
  mapStateToProps,
)(ConfirmPwd)
