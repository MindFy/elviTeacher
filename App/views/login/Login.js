import React, { PureComponent } from 'react'
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
import {
  common,
  storeSave,
} from '../../constants/common'
import actions from '../../actions/index'
import schemas from '../../schemas/index'
import ws from '../../websocket/ws'
import TKInputItem from '../../components/TKInputItem'
import TKButton from '../../components/TKButton'
import TKSpinner from '../../components/TKSpinner'

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
  logo: {
    marginTop: common.margin127,
    width: common.w150,
    height: common.h80,
    alignSelf: 'center',
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

class Login extends PureComponent {
  componentWillReceiveProps(nextProps) {
    this.loginHandle(nextProps)
  }

  onChange(event, tag) {
    const { text } = event.nativeEvent
    const { dispatch, formState } = this.props

    if (tag === 'mobile') {
      const nextFormState = {
        ...formState,
        mobile: text,
      }
      dispatch(actions.loginUpdate(nextFormState))
    } else if (tag === 'password') {
      const nextFormState = {
        ...formState,
        password: text,
      }
      dispatch(actions.loginUpdate(nextFormState))
    }
  }

  loginPress = () => {
    Keyboard.dismiss()

    const { dispatch, formState } = this.props
    if (!formState.mobile.length) {
      Toast.message('请输入账号')
      return
    }
    if (!common.regMobile.test(formState.mobile)) {
      Toast.message(common.regMobileMsg)
      return
    }
    if (!formState.password.length) {
      Toast.message('请输入密码')
      return
    }
    dispatch(actions.login(formState))
  }

  errs = {
    4000114: '手机号不存在或者错误',
    4000115: '密码不正确',
    4000116: '手机号码未注册',
    4000117: '账号或密码错误',
  }

  loginHandle(nextProps) {
    const { dispatch, loggedIn, error, loggedInResult, screenProps, homeRoseSelected } = nextProps

    if (loggedIn !== this.props.loggedIn) {
      Toast.success('登录成功')
      const user = loggedInResult
      storeSave(common.user.string, user, (e) => {
        if (!e) {
          dispatch(actions.findUser(schemas.findUser(user.id)))
          dispatch(actions.findAssetList(schemas.findAssetList(user.id)))
          if (homeRoseSelected) {
            ws.onclose(homeRoseSelected.goods.id, homeRoseSelected.currency.id)
            ws.onopen(homeRoseSelected.goods.id, homeRoseSelected.currency.id, user)
          }
          screenProps.dismiss()
        }
      })
    }

    if (nextProps.error) {
      const msg = this.errs[error.code]
      if (msg) {
        Toast.fail(msg)
      } else if (error.code === 4000118) {
        Toast.fail(error.message)
      } else {
        Toast.fail('登录失败, 请您稍后重试')
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
      style={styles.logo}
      source={require('../../assets/Logo11.png')}
      resizeMode={'contain'}
    />
  )

  renderInput = () => {
    const { formState, dispatch } = this.props

    return (
      <View style={styles.input}>
        <TKInputItem
          titleStyle={{ width: common.w60 }}
          title="账号"
          placeholder="请输入11位手机号"
          value={formState.mobile}
          maxLength={11}
          onChange={e => this.onChange(e, 'mobile')}
          onFocus={() => { dispatch(actions.clearError()) }}
        />

        <View style={{ height: common.h40 }} />

        <TKInputItem
          titleStyle={{ width: common.w60 }}
          title="密码"
          placeholder="请输入密码"
          value={formState.password}
          maxLength={common.textInputMaxLenPwd}
          secureTextEntry
          onChange={e => this.onChange(e, 'password')}
          onFocus={() => { dispatch(actions.clearError()) }}
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
    const { loading } = this.props
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

          <TKButton
            style={{ marginTop: common.margin40 }}
            theme="yellow"
            caption="登录"
            onPress={this.loginPress}
            disabled={this.loading}
          />
        </ScrollView>

        <TKSpinner
          isVisible={loading}
        />
      </KeyboardAvoidingView>
    )
  }
}

function mapStateToProps(store) {
  return {
    formState: store.authorize.formState,
    error: store.authorize.error,
    loading: store.authorize.loading,
    loggedIn: store.authorize.loggedIn,
    loggedInResult: store.authorize.loggedInResult,

    homeRoseSelected: store.dealstat.homeRoseSelected,
  }
}

export default connect(
  mapStateToProps,
)(Login)
