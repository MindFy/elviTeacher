import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native'
import Toast from 'teaset/components/Toast/Toast'
import { common } from '../../constants/common'
import actions from '../../actions/index'
import TKInputItem from '../../components/TKInputItem'
import TKInputItemCheckCode from '../../components/TKInputItemCheckCode'
import TKButton from '../../components/TKButton'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import TKSpinner from '../../components/TKSpinner'

const styles = StyleSheet.create({
  cover: {
    flex: 1,
    backgroundColor: common.blackColor,
  },
  container: {
    marginTop: common.margin10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    alignSelf: 'center',
    color: common.textColor,
    fontSize: common.font12,
  },
  contentContainer: {
    marginHorizontal: common.margin38,
    marginTop: common.getH(90),
  },
  mobileTip: {
    position: 'absolute',
    top: common.margin5,
    left: common.w100,
    fontSize: common.font12,
    color: common.redColor,
  },
})

class Register extends Component {
  static navigationOptions(props) {
    return {
      headerStyle: {
        backgroundColor: common.bgColor,
        borderBottomWidth: 0,
      },
      headerTintColor: 'white',
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
    this.showRegisterResponse = false
    this.showGetVerificateCodeResponse = false
    this.state = {
      showTip: false,
      topOffset: 0,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.handleGetVerificateCodeRequest(nextProps)
    this.handleRegisterRequest(nextProps)
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(actions.registerResetNexus())
  }

  onChange(event, tag) {
    const { text } = event.nativeEvent
    const { dispatch, mobile, code, password, passwordAgain, recommendNo } = this.props
    const newText = text.trim()
    switch (tag) {
      case 'mobile':
        this.setState({ showTip: false })
        dispatch(actions.registerUpdate({
          mobile: newText,
          code,
          password,
          passwordAgain,
          recommendNo,
        }))
        break
      case 'code':
        dispatch(actions.registerUpdate({
          mobile,
          code: newText,
          password,
          passwordAgain,
          recommendNo,
        }))
        break
      case 'password':
        dispatch(actions.registerUpdate({
          mobile,
          code,
          password: newText,
          passwordAgain,
          recommendNo,
        }))
        break
      case 'passwordAgain':
        dispatch(actions.registerUpdate({
          mobile,
          code,
          password,
          passwordAgain: newText,
          recommendNo,
        }))
        break
      case 'recommendNo':
        dispatch(actions.registerUpdate({
          mobile,
          code,
          password,
          passwordAgain,
          recommendNo: newText,
        }))
        break
      default:
        break
    }
  }

  codePress() {
    const { dispatch, mobile, mobileIsExist } = this.props
    if (mobileIsExist) {
      Toast.fail('手机号已被注册')
      return
    }
    if (!mobile) {
      Toast.fail('手机号不可为空')
      return
    }
    if (!common.regMobile.test(mobile)) {
      Toast.fail('请输入正确的手机号')
      return
    }
    dispatch(actions.getVerificateCode({
      mobile,
      service: 'register',
    }))
  }

  registerPress() {
    const { dispatch, mobile, code, password, passwordAgain, recommendNo } = this.props

    if (!mobile.length) {
      Toast.fail('请输入手机号')
      return
    }
    if (!code.length) {
      Toast.fail('请输入验证码')
      return
    }
    if (!password.length || !common.regPassword.test(password) ||
      !common.regSpace.test(password)) {
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
      Toast.fail('确认密码需要和密码保持一致')
      return
    }
    if (!common.regMobile.test(mobile)) {
      Toast.fail('请输入正确的手机号')
      return
    }
    dispatch(actions.register({
      mobile,
      code,
      password,
      recommendNo,
    }))
  }

  handleGetVerificateCodeRequest(nextProps) {
    const { getVerificateCodeVisible, getVerificateCodeResponse } = nextProps
    if (!getVerificateCodeVisible && !this.showGetVerificateCodeResponse) return

    if (getVerificateCodeVisible) {
      this.showGetVerificateCodeResponse = true
    } else {
      this.showGetVerificateCodeResponse = false
      if (getVerificateCodeResponse.success) {
        Toast.success(getVerificateCodeResponse.result.message)
      } else if (getVerificateCodeResponse.error.code === 4000101) {
        Toast.fail('手机号码或服务类型错误')
      } else if (getVerificateCodeResponse.error.code === 4000102) {
        Toast.fail('一分钟内不能重复发送验证码')
      } else if (getVerificateCodeResponse.error.code === 4000104) {
        Toast.fail('手机号码已注册')
      } else if (getVerificateCodeResponse.error.message === common.badNet) {
        Toast.fail('网络连接失败，请稍后重试')
      } else {
        Toast.fail('获取验证码失败，请重试')
      }
    }
  }

  handleRegisterRequest(nextProps) {
    const { registerVisible, registerResponse, navigation } = nextProps
    if (!registerVisible && !this.showRegisterResponse) return

    if (registerVisible) {
      this.showRegisterResponse = true
    } else {
      this.showRegisterResponse = false

      if (registerResponse.success) {
        Toast.success('注册成功')

        const { dispatch } = this.props
        dispatch(actions.loginUpdate({ mobile: '', password: '' }))
        navigation.goBack()
      } else if (registerResponse.error.code === 4000104) {
        Toast.fail('请重新获取验证码')
      } else if (registerResponse.error.code === 4000101) {
        Toast.fail('验证码不能为空')
      } else if (registerResponse.error.code === 4000102) {
        Toast.fail('验证码错误')
      } else if (registerResponse.error.code === 4000103) {
        Toast.fail('验证码已过期，请重新获取')
      } else if (registerResponse.error.code === 4000114) {
        Toast.fail('手机号码已被注册')
      } else if (registerResponse.error.code === 4000115) {
        Toast.fail('邀请用户不存在')
      } else if (registerResponse.error.code === 4000113) {
        Toast.fail('邀请码不正确')
      } else if (registerResponse.error.message === common.badNet) {
        Toast.fail('网络连接失败，请稍后重试')
      } else {
        Toast.fail('注册失败，请重试')
      }
    }
  }

  renderAccount = () => {
    const { mobile } = this.props
    return (
      <TKInputItem
        viewStyle={{ flex: undefined }}
        titleStyle={{
          width: common.h80,
        }}
        title="账号"
        placeholder="请输入11位手机号"
        textInputProps={{
          keyboardType: 'phone-pad',
          onBlur: () => {
            if (!common.regMobile.test(this.props.mobile)) {
              this.props.dispatch(actions.clearMobileIsExist())
              this.setState({ showTip: true })
            } else {
              this.props.dispatch(actions.mobileIsExist({
                type: 'mobile',
                value: this.props.mobile,
              }))
              this.setState({ showTip: false })
            }
          },
        }}
        value={mobile}
        maxLength={11}
        onChange={e => this.onChange(e, 'mobile')}
      />
    )
  }

  renderAccountTip = () => {
    const { showTip } = this.state
    const { mobileIsExist } = this.props
    if (mobileIsExist) {
      return (
        <View style={{ height: 40 }}>
          <Text style={styles.mobileTip}>
            手机号已被注册
          </Text>
        </View>
      )
    }
    return (
      <View style={{ height: 40 }}>
        {showTip ?
          <Text style={styles.mobileTip}>
            请输入正确的11位手机号
          </Text> : null}
      </View>
    )
  }

  renderCheckCode = () => {
    const { code, mobile } = this.props
    return (
      <TKInputItemCheckCode
        viewStyle={{ flex: undefined }}
        titleStyle={{
          width: common.h80,
        }}
        title="验证码"
        placeholder="请输入短信验证码"
        value={code}
        maxLength={common.textInputMaxLenPwd}
        onChange={e => this.onChange(e, 'code')}
        onPressCheckCodeBtn={() => { this.codePress() }}
        extraDisable={!mobile || !common.regMobile.test(mobile)}
        textInputProps={{
          keyboardType: 'numeric',
        }}
      />
    )
  }

  renderErrorTip = (tip) => {
    const hasTip = (
      (tip && !common.regPassword.test(tip)) ||
      (tip && !common.regSpace.test(tip))
    )
    const tipView = hasTip && (
      <Text
        style={{
          color: common.redColor,
          fontSize: common.font12,
        }}
      >
        {common.regPasswordMsg}
      </Text>
    )
    return (
      <View style={{
        alignItems: 'flex-end',
        height: common.w40,
      }}
      >
        <View>
          <Text style={{ paddingTop: common.margin5 }}>
            {tipView}
          </Text>
        </View>
      </View>
    )
  }

  renderPwdErrorTip = () => {
    const { password } = this.props
    return this.renderErrorTip(password)
  }

  renderPassword = () => {
    const { password } = this.props
    return (
      <TKInputItem
        viewStyle={{ flex: undefined }}
        titleStyle={{
          width: common.h80,
        }}
        title="密码"
        placeholder="请输入密码"
        value={password}
        maxLength={common.textInputMaxLenPwd}
        secureTextEntry
        onChange={e => this.onChange(e, 'password')}
      />
    )
  }

  renderConfirmPwd = () => {
    const { passwordAgain } = this.props
    return (
      <TKInputItem
        viewStyle={{ flex: undefined }}
        titleStyle={{
          width: common.h80,
        }}
        title="再次确认密码"
        placeholder="请再次输入密码"
        value={passwordAgain}
        maxLength={common.textInputMaxLenPwd}
        secureTextEntry
        onChange={e => this.onChange(e, 'passwordAgain')}
        onFocus={() => {
          if (!common.IsIOS) {
            this.setState({
              topOffset: 216 - this.inputViewBottom - common.getH(160),
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
      />
    )
  }

  renderRecommendNo = () => {
    const { recommendNo } = this.props
    return (
      <TKInputItem
        viewStyle={{ flex: undefined }}
        titleStyle={{
          width: common.h80,
        }}
        title="邀请码"
        placeholder="选填"
        value={recommendNo}
        maxLength={common.textInputMaxLenPwd}
        onChange={e => this.onChange(e, 'recommendNo')}
        onFocus={() => {
          if (!common.IsIOS) {
            this.setState({
              topOffset: this.inputViewBottom - common.getH(60) - 216,
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
      />
    )
  }

  renderExtraBtns = () => {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }} >
          <Text
            style={styles.title}
          >注册即同意</Text>
          <TKButton
            theme={'small'}
            caption={'《用户协议》'}
            onPress={() => navigation.navigate('Agreement')}
          />
        </View>
        <TKButton
          theme={'small'}
          caption={'已有账号？去登录'}
          onPress={() => navigation.goBack()}
        />
      </View>
    )
  }

  render() {
    const {
      registerVisible,
      mobile,
      code,
      password,
      passwordAgain,
    } = this.props

    const behavior = common.IsIOS ? 'position' : 'padding'
    let canRegister = false
    if (!this.state.showTip && mobile && code && password && passwordAgain && true) {
      canRegister = true
    }
    const registerBtnBackgroundColor = canRegister ? {} : { backgroundColor: common.grayColor }
    let topOffset = 0
    if (!common.IsIOS) {
      topOffset = this.state.topOffset
    }
    return (
      <ScrollView
        style={styles.cover}
        automaticallyAdjustContentInsets={false}
        keyboardShouldPersistTaps="handled"
      >
        <KeyboardAvoidingView
          style={{
            top: topOffset,
          }}
          contentContainerStyle={{ justifyContent: 'center' }}
          behavior={behavior}
        >
          <View
            style={styles.contentContainer}
            onLayout={(event) => {
              const { height, y } = event.nativeEvent.layout
              this.inputViewBottom = common.sh - height - y
            }}
          >
            {this.renderAccount()}

            {this.renderAccountTip()}

            {this.renderCheckCode()}

            <View style={{ height: 40 }} />

            {this.renderPassword()}

            {this.renderPwdErrorTip()}

            {this.renderConfirmPwd()}

            <View style={{ height: 40 }} />

            {this.renderRecommendNo()}

            {this.renderExtraBtns()}

            <View style={{ height: 40 }} />
          </View>

          <TKButton
            style={registerBtnBackgroundColor}
            theme="yellow"
            caption={'注册'}
            disabled={!canRegister}
            onPress={() => this.registerPress()}
          />
        </KeyboardAvoidingView>
        <TKSpinner
          isVisible={registerVisible}
        />
      </ScrollView>

    )
  }
}

function mapStateToProps(state) {
  return {
    mobile: state.user.mobileRegister,
    code: state.user.codeRegister,
    password: state.user.passwordRegister,
    passwordAgain: state.user.passwordAgainRegister,
    recommendNo: state.user.recommendNo,
    mobileIsExist: state.user.mobileIsExist,

    registerVisible: state.user.registerVisible,
    registerResponse: state.user.registerResponse,

    getVerificateCodeVisible: state.user.getVerificateCodeVisible,
    getVerificateCodeResponse: state.user.getVerificateCodeResponse,
  }
}

export default connect(
  mapStateToProps,
)(Register)
