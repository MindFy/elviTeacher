import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Text,
  View,
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
import TKInputItemCheckCode from '../../components/TKInputItemCheckCode'
import actions from '../../actions/index'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: common.bgColor,
  },
  inputView: {
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
  mobileTip: {
    position: 'absolute',
    top: common.margin5,
    left: common.w100 + common.margin48,
    fontSize: common.font12,
    color: common.redColor,
  },
})

class ForgotPwd extends Component {
  static navigationOptions(props) {
    return {
      headerTitle: '忘记密码',
      headerStyle: {
        backgroundColor: common.navBgColor,
        borderBottomWidth: 0,
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontSize: common.font16,
      },
      headerLeft:
        (
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
    this.showGetVerificateCodeResponse = false
    this.showCheckVerificateCodeResponse = false
    this.state = {
      showTip: false,
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(actions.registerUpdate({
      mobile: '',
      code: '',
      password: '',
      passwordAgain: '',
    }))
  }

  onChange(event, tag) {
    const { text } = event.nativeEvent
    const { dispatch, mobile, code } = this.props

    switch (tag) {
      case 'mobile':
        this.setState({ showTip: false })
        dispatch(actions.registerUpdate({ mobile: text, code, password: '', passwordAgain: '' }))
        break
      case 'code':
        dispatch(actions.registerUpdate({ mobile, code: text, password: '', passwordAgain: '' }))
        break
      default:
        break
    }
  }

  codePress() {
    const { dispatch, mobile } = this.props
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
      service: 'reset',
    }))
  }

  nextPress() {
    const { dispatch, mobile, code } = this.props
    if (!mobile.length) {
      Toast.fail('请输入手机号')
      return
    }
    if (!code.length) {
      Toast.fail('请输入验证码')
      return
    }
    if (!common.regMobile.test(mobile)) {
      Toast.fail('请输入正确的手机号')
      return
    }
    dispatch(actions.checkVerificateCode({
      mobile,
      service: 'reset',
      code,
    }))
  }

  /* 获取验证码请求结果处理 */
  handleGetVerificateCodeRequest() {
    const { getVerificateCodeVisible, getVerificateCodeResponse } = this.props
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
      } else if (getVerificateCodeResponse.error.code === 4000103) {
        Toast.fail('验证码已过期，请重新获取')
      } else if (getVerificateCodeResponse.error.code === 4000104) {
        Toast.fail('手机号码未注册')
      } else if (getVerificateCodeResponse.error.message === common.badNet) {
        Toast.fail('网络连接失败，请稍后重试')
      } else {
        Toast.fail('获取验证码失败，请重试')
      }
    }
  }

  /* 检测验证码请求结果处理 */
  handleCheckVerificateCodeRequest() {
    const { checkVerificateCodeVisible, checkVerificateCodeResponse, navigation } = this.props
    if (!checkVerificateCodeVisible && !this.showCheckVerificateCodeResponse) return
    if (checkVerificateCodeVisible) {
      this.showCheckVerificateCodeResponse = true
    } else {
      this.showCheckVerificateCodeResponse = false
      if (checkVerificateCodeResponse.success) {
        navigation.navigate('ConfirmPwd')
      } else if (checkVerificateCodeResponse.error.code === 4000101) {
        Toast.fail('手机号码或服务类型错误')
      } else if (checkVerificateCodeResponse.error.code === 4000102) {
        Toast.fail('验证码错误')
      } else if (checkVerificateCodeResponse.error.code === 4000103) {
        Toast.fail('验证码已过期，请重新获取')
      } else if (checkVerificateCodeResponse.error.message === common.badNet) {
        Toast.fail('网络连接失败，请稍后重试')
      } else {
        Toast.fail('验证失败，请重试')
      }
    }
  }

  renderMobileTip = () => {
    const { showTip } = this.state
    return (
      <View style={{ height: 40 }}>
        { showTip ?
          <Text style={styles.mobileTip}>
            请输入正确的11位手机号
          </Text> : null }
      </View>
    )
  }

  render() {
    this.handleGetVerificateCodeRequest()
    this.handleCheckVerificateCodeRequest()

    const { mobile, code, getVerificateCodeVisible, checkVerificateCodeVisible } = this.props
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >
        <ScrollView
          keyboardDismissMode={'on-drag'}
          keyboardShouldPersistTaps={'handled'}
        >
          <TKInputItem
            viewStyle={styles.inputView}
            inputStyle={styles.input}
            titleStyle={styles.inputText}
            textInputProps={{
              onBlur: () => {
                if (!common.regMobile.test(this.props.mobile)) {
                  this.setState({ showTip: true })
                } else {
                  this.setState({ showTip: false })
                }
              },
            }}
            title="账号"
            placeholder="请输入11位手机号"
            value={mobile}
            maxLength={11}
            onChange={e => this.onChange(e, 'mobile')}
          />

          {this.renderMobileTip()}

          <TKInputItemCheckCode
            viewStyle={[styles.inputView, { marginTop: 0 }]}
            inputStyle={styles.input}
            titleStyle={styles.inputText}
            title="验证码"
            placeholder="请输入短信验证码"
            value={code}
            maxLength={6}
            onPressCheckCodeBtn={() => this.codePress()}
            onChange={e => this.onChange(e, 'code')}
          />

          <TKButton
            style={{ marginTop: common.margin210 }}
            theme={'yellow'}
            caption={'下一步'}
            disabled={getVerificateCodeVisible}
            onPress={() => this.nextPress()}
          />
        </ScrollView>
        <TKSpinner
          isVisible={checkVerificateCodeVisible}
        />
      </KeyboardAvoidingView>
    )
  }
}

function mapStateToProps(store) {
  return {
    mobile: store.user.mobileRegister,
    code: store.user.codeRegister,

    getVerificateCodeVisible: store.user.getVerificateCodeVisible,
    getVerificateCodeResponse: store.user.getVerificateCodeResponse,

    checkVerificateCodeVisible: store.user.checkVerificateCodeVisible,
    checkVerificateCodeResponse: store.user.checkVerificateCodeResponse,
  }
}

export default connect(
  mapStateToProps,
)(ForgotPwd)
