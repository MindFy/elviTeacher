import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {
  Text,
  View,
  Image,
  Keyboard,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native'
import Toast from 'teaset/components/Toast/Toast'
import { common } from '../../constants/common'
import actions from '../../actions/index'
import schemas from '../../schemas/index'
import TKInputItem from '../../components/TKInputItem'
import TKButton from '../../components/TKButton'
import TKSpinner from '../../components/TKSpinner'
import cache from '../../utils/cache'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import transfer from '../../localization/utils'

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
    flex: undefined,
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
  mobileTip: {
    position: 'absolute',
    top: common.margin5,
    left: common.h80,
    fontSize: common.font12,
    color: common.redColor,
  },
})

class Login extends PureComponent {
  static navigationOptions(props) {
    const params = props.navigation.state.params || {}
    return {
      headerStyle: {
        borderBottomWidth: 0,
      },
      headerTransparent: true,
      headerTintColor: 'white',
      headerLeft: (
        <NextTouchableOpacity
          style={{
            height: common.w40,
            width: common.w40,
            justifyContent: 'center',
          }}
          activeOpacity={common.activeOpacity}
          onPress={params.dismiss}
        >
          <Image
            style={{
              marginLeft: common.margin10,
              width: common.w15,
              height: common.h15,
            }}
            resizeMode="contain"
            source={require('../../assets/close_icon.png')}
          />
        </NextTouchableOpacity>
      ),
    }
  }

  constructor() {
    super()
    this.state = {
      showTip: false,
    }
  }

  componentWillMount() {
    const { screenProps, navigation } = this.props
    navigation.setParams({
      dismiss: () => {
        Keyboard.dismiss()
        screenProps.dismiss()
      },
    })
  }

  componentWillReceiveProps(nextProps) {
    this.loginHandle(nextProps)
  }

  componentWillUnmount() {
    const { dispatch, formState } = this.props
    dispatch(actions.loginUpdate({
      ...formState,
      mobile: '',
      password: '',
    }))
  }

  onChange(event, tag) {
    const { text } = event.nativeEvent
    const { dispatch, formState } = this.props

    if (tag === 'mobile') {
      const nextFormState = {
        ...formState,
        mobile: text,
      }
      this.setState({ showTip: false })
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

    // TODO 上线需要清理掉
    if (process.env.NODE_ENV === 'development'
      && formState.mobile.length === 0
    ) {
      dispatch(actions.login({
        mobile: '15913913914',
        password: '123456',
      }))
    }

    if (!formState.mobile.length) {
      Toast.fail('请输入账号')
      return
    }
    if (!common.regMobile.test(formState.mobile)) {
      Toast.fail(common.regMobileMsg)
      return
    }
    if (!formState.password.length) {
      Toast.fail('请输入密码')
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
    const { dispatch, loggedIn, error, loggedInResult, screenProps } = nextProps

    if (loggedIn !== this.props.loggedIn) {
      Toast.success('登录成功')
      const user = loggedInResult
      dispatch(actions.findUser(schemas.findUser(user.id)))
      dispatch(actions.findAssetList(schemas.findAssetList(user.id)))
      cache.setObject('isLoginIn', 'true')
      screenProps.dismiss()
    }

    if (nextProps.error && (error !== this.props.error)) {
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

  renderLogo = () => (
    <Image
      style={styles.logo}
      source={require('../../assets/Logo11.png')}
      resizeMode={'contain'}
    />
  )

  renderMobileTip = () => {
    const { showTip } = this.state
    const { language } = this.props
    return (
      <View style={{ height: 40 }}>
        {showTip ?
          <Text style={styles.mobileTip}>
            {transfer(language, 'login/idPlaceholder')}
          </Text> : null}
      </View>
    )
  }

  renderInput = () => {
    const { formState, dispatch, language } = this.props

    return (
      <View style={styles.input}>
        <TKInputItem
          viewStyle={{ flex: undefined }}
          titleStyle={{ width: common.w60 }}
          title={transfer(language, 'login/id')}
          placeholder="请输入11位手机号"
          value={formState.mobile}
          maxLength={11}
          textInputProps={{
            keyboardType: 'phone-pad',
            onBlur: () => {
              if (!common.regMobile.test(this.props.formState.mobile)) {
                this.setState({ showTip: true })
              } else {
                this.setState({ showTip: false })
              }
            },
          }}
          onChange={e => this.onChange(e, 'mobile')}
          onFocus={() => { dispatch(actions.clearError()) }}
        />

        {this.renderMobileTip()}

        <TKInputItem
          viewStyle={{ flex: undefined }}
          titleStyle={{ width: common.w60 }}
          title="密码"
          placeholder="请输入密码"
          value={formState.password}
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
    const { loading } = this.props
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
        </KeyboardAvoidingView>
        <TKSpinner
          isVisible={loading}
        />
      </ScrollView>
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
    language: store.system.language,
  }
}

export default connect(
  mapStateToProps,
)(Login)
