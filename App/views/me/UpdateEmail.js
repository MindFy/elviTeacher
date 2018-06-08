import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Image,
  ScrollView,
  TouchableOpacity,
  DeviceEventEmitter,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native'
import {
  Toast,
} from 'teaset'
import { common } from '../../constants/common'
import TextInputPwd from './TextInputPwd'
import TKButton from '../../components/TKButton'
import TKSpinner from '../../components/TKSpinner'
import TKInputItem from '../../components/TKInputItem'
import actions from '../../actions/index'
import schemas from '../../schemas/index'

class UpdateEmail extends Component {
  static navigationOptions(props) {
    return {
      headerTitle: '绑定邮箱',
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
    this.showGetVerificateSmtpCodeResponse = false
  }

  componentDidMount() {
    const { dispatch, user, navigation, codeEmail } = this.props

    dispatch(actions.findUser(schemas.findUser(user.id)))
    if (user.email) {
      dispatch(actions.updateEmailUpdate({ email: user.email, codeEmail }))
    }
    this.listener = DeviceEventEmitter.addListener(common.noti.updateEmail, () => {
      user.emailStatus = common.user.status.bind
      dispatch(actions.findUserUpdate(JSON.parse(JSON.stringify(user))))
      dispatch(actions.findUser(schemas.findUser(user.id)))
      navigation.goBack()
    })
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(actions.updateEmailUpdate({ email: '', codeEmail: '' }))
    this.listener.remove()
  }

  onChange(event, tag) {
    const { text } = event.nativeEvent
    const { dispatch, email, codeEmail } = this.props

    switch (tag) {
      case 'email':
        dispatch(actions.updateEmailUpdate({ email: text, codeEmail }))
        break
      case 'code':
        dispatch(actions.updateEmailUpdate({ email, codeEmail: text }))
        break
      default:
        break
    }
  }

  sendCodeEmail(count) {
    const { dispatch, email, user } = this.props
    if (!email.length || !common.regEmail.test(email)) {
      Toast.message('请输入正确格式的邮箱')
      return
    }
    this.count = count
    const service = (user && (user.emailStatus === common.user.status.bind)) ? 'reset' : 'auth'
    dispatch(actions.getVerificateSmtpCode({
      email,
      service,
    }))
  }

  confirmPress() {
    Keyboard.dismiss()

    const { dispatch, email, codeEmail } = this.props
    if (!email.length) {
      Toast.message('请输入邮箱地址')
      return
    }
    if (!codeEmail.length) {
      Toast.message('请输入邮箱验证码')
      return
    }
    if (!common.regEmail.test(email)) {
      Toast.message('请输入正确格式的邮箱')
      return
    }
    dispatch(actions.updateEmail({
      email,
      code: codeEmail,
    }))
  }

  handleGetVerificateSmtpCodeRequest() {
    const { getVerificateSmtpCodeVisible, getVerificateSmtpCodeResponse } = this.props
    if (!getVerificateSmtpCodeVisible && !this.showGetVerificateSmtpCodeResponse) return

    if (getVerificateSmtpCodeVisible) {
      this.showGetVerificateSmtpCodeResponse = true
    } else {
      this.showGetVerificateSmtpCodeResponse = false
      if (getVerificateSmtpCodeResponse.success) {
        this.count()
        Toast.success(getVerificateSmtpCodeResponse.result.message)
      } else if (getVerificateSmtpCodeResponse.error.code === 4000150) {
        Toast.fail('邮箱或服务类型错误')
      } else if (getVerificateSmtpCodeResponse.error.code === 4000151) {
        Toast.fail('一分钟内不能重复发送验证码')
      } else if (getVerificateSmtpCodeResponse.error.code === 4000152) {
        Toast.fail('邮箱已注册')
      } else if (getVerificateSmtpCodeResponse.error.message === common.badNet) {
        Toast.fail('网络连接失败，请稍后重试')
      } else {
        Toast.fail('获取验证码失败，请重试')
      }
    }
  }

  render() {
    const { email, codeEmail, updateEmailVisible, user } = this.props
    this.handleGetVerificateSmtpCodeRequest()

    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: common.bgColor,
        }}
        behavior="padding"
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
        >
          <TKInputItem
            viewStyle={{
              marginTop: common.margin10,
              marginLeft: common.margin10,
              marginRight: common.margin10,
            }}
            placeholder={'请输入邮箱地址'}
            value={email}
            onChange={e => this.onChange(e, 'email')}
            editable={user.emailStatus !== common.user.status.bind}
          />
          {
            user.emailStatus === common.user.status.bind ? null
              : <TextInputPwd
                placeholder={'请输入邮箱验证码'}
                value={codeEmail}
                codeEmail={'code'}
                onChange={e => this.onChange(e, 'code')}
                onPress={count => this.sendCodeEmail(count)}
                maxLength={8}
              />
          }

          <TKButton
            style={{
              marginTop: user.emailStatus === common.user.status.bind
                ? common.margin10 : common.margin40,
              backgroundColor: user.emailStatus === common.user.status.bind
                ? 'transparent' : common.navBgColor,
            }}
            onPress={() => this.confirmPress()}
            disabled={user.emailStatus === common.user.status.bind ? true : updateEmailVisible}
            caption={user.emailStatus === common.user.status.bind ? '邮箱已绑定' : '确定'}
            theme={'gray'}
          />
        </ScrollView>

        <TKSpinner
          isVisible={updateEmailVisible}
        />
      </KeyboardAvoidingView>
    )
  }
}

function mapStateToProps(store) {
  return {
    user: store.user.user,
    email: store.user.email,
    codeEmail: store.user.codeEmail,

    updateEmailVisible: store.user.updateEmailVisible,
    getVerificateSmtpCodeVisible: store.user.getVerificateSmtpCodeVisible,
    getVerificateSmtpCodeResponse: store.user.getVerificateSmtpCodeResponse,
  }
}

export default connect(
  mapStateToProps,
)(UpdateEmail)
