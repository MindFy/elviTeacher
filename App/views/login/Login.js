import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  StyleSheet,
} from 'react-native'
import Toast from 'teaset/components/Toast/Toast'
import Spinner from 'react-native-spinkit'
import {
  common,
  storeSave,
} from '../../constants/common'
import TextInputLogin from './TextInputLogin'
import BtnLogin from './BtnLogin'
import actions from '../../actions/index'
import schemas from '../../schemas/index'
import ws from '../../websocket/ws'
import TKInputItem from '../../components/TKInputItem'
import TKButton from '../../components/TKButton'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: common.bgColor,
  },
  back: {
    position: 'absolute',
    top: common.margin40,
    left: common.margin20,
    width: common.w40,
    height: common.h20,
    justifyContent: 'center',
  },
  input: {
    marginTop: common.margin60,
    marginHorizontal: '10%',
  },
  extraBtns: {
    marginTop: common.margin10,
    marginLeft: common.margin38,
    marginRight: common.margin38,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

class Login extends Component {
  constructor() {
    super()
    this.showLoginResponse = false
  }

  onChange(event, tag) {
    const { text } = event.nativeEvent
    const { dispatch, mobile, password } = this.props

    if (tag === 'mobile') {
      dispatch(actions.loginUpdate({ mobile: text, password: text.length ? password : '' }))
    } else if (tag === 'password') {
      dispatch(actions.loginUpdate({ mobile, password: text }))
    }
  }

  loginPress = () => {
    Keyboard.dismiss()

    const { dispatch, mobile, password } = this.props
    if (!mobile.length) {
      Toast.message('请输入账号')
      return
    }
    if (!password.length) {
      Toast.message('请输入密码')
      return
    }
    if (!common.regMobile.test(mobile)) {
      Toast.message(common.regMobileMsg)
      return
    }

    dispatch(actions.login({
      mobile,
      password,
    }))
  }

  handleLoginRequest() {
    const { dispatch, loginVisible, loginResponse, screenProps, homeRoseSelected } = this.props
    if (!loginVisible && !this.showLoginResponse) return

    if (loginVisible) {
      this.showLoginResponse = true
    } else {
      this.showLoginResponse = false
      if (loginResponse.success) {
        Toast.success('登录成功')
        const user = loginResponse.result
        storeSave(common.user.string, user, (error) => {
          if (!error) {
            dispatch(actions.findUser(schemas.findUser(user.id)))
            dispatch(actions.findAssetList(schemas.findAssetList(user.id)))
            if (homeRoseSelected) {
              ws.onclose(homeRoseSelected.goods.id, homeRoseSelected.currency.id)
              ws.onopen(homeRoseSelected.goods.id, homeRoseSelected.currency.id, user)
            }
            screenProps.dismiss()
          }
        })
      } else if (loginResponse.error.code === 4000114) {
        Toast.fail('手机号不正确')
      } else if (loginResponse.error.code === 4000115) {
        Toast.fail('密码不正确')
      } else if (loginResponse.error.code === 4000116) {
        Toast.fail('手机号码未注册')
      } else if (loginResponse.error.code === 4000117) {
        Toast.fail('账号或密码错误')
      } else if (loginResponse.error.code === 4000118) {
        Toast.fail('您已错误输入三次密码，请三十分钟后登录')
      } else if (loginResponse.error.message === common.badNet) {
        Toast.fail('网络连接失败，请稍后重试')
      } else {
        Toast.fail('登录失败，请重试')
      }
    }
  }

  renderBack = () => {
    const { screenProps } = this.props
    return (
      <TouchableOpacity
        activeOpacity={common.activeOpacity}
        onPress={() => screenProps.dismiss()}
      >
        <View style={styles.back}>
          <Text
            style={{
              color: 'white',
              fontSize: common.font14,
              alignSelf: 'center',
            }}
          >返回</Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderLogo = () => (
    <Image
      style={{
        marginTop: common.margin127,
        width: common.w150,
        height: common.h80,
        alignSelf: 'center',
      }}
      source={require('../../assets/Logo11.png')}
      resizeMode={'contain'}
    />
  )

  renderInput = () => {
    const { mobile, password } = this.props

    return (
      <View style={styles.input}>
        <TKInputItem
          title="账号"
          placeholder="请输入11位手机号"
          value={mobile}
          maxLength={11}
          onChange={e => this.onChange(e, 'mobile')}
        />

        <View style={{ height: 40 }} />

        <TKInputItem
          title="密码"
          placeholder="请输入密码"
          value={password}
          maxLength={common.textInputMaxLenPwd}
          secureTextEntry
          onChange={e => this.onChange(e, 'password')}
        />
      </View>
    )
  }

  renderExtraBtns = () => {
    const { navigation } = this.props
    return (
      <View style={styles.extraBtns}>
        <TKButton
          theme="small"
          caption="新用户注册"
          onPress={() => navigation.navigate('Register')}
        />
        <TKButton
          theme="small"
          caption="忘记密码?"
          onPress={() => navigation.navigate('ForgotPwd')}
        />
      </View>
    )
  }

  render() {
    this.handleLoginRequest()

    const { loginVisible } = this.props
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          {this.renderBack()}

          {this.renderLogo()}

          {this.renderInput()}

          {this.renderExtraBtns()}

          <View style={{ height: 40 }} />

          <TKButton
            theme="yellow"
            caption="登录"
            onPress={this.loginPress}
          />
        </ScrollView>

        <Spinner
          style={{
            position: 'absolute',
            alignSelf: 'center',
            marginTop: common.sh / 2 - common.h50 / 2,
          }}
          isVisible={loginVisible}
          size={common.h50}
          type={'Wave'}
          color={common.btnTextColor}
        />
      </KeyboardAvoidingView>
    )
  }
}

function mapStateToProps(store) {
  return {
    mobile: store.user.mobileLogin,
    password: store.user.passwordLogin,

    loginVisible: store.user.loginVisible,
    loginResponse: store.user.loginResponse,

    homeRoseSelected: store.dealstat.homeRoseSelected,
  }
}

export default connect(
  mapStateToProps,
)(Login)
