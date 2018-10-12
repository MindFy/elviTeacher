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
  AsyncStorage,
} from 'react-native'
import Toast from 'teaset/components/Toast/Toast'
import { common, storeSave } from '../../constants/common'
import actions from '../../actions/index'
import { setInitialized } from '../../actions/market'
import schemas from '../../schemas/index'
import TKInputItem from '../../components/TKInputItem'
import TKButton from '../../components/TKButton'
import TKSpinner from '../../components/TKSpinner'
import cache from '../../utils/cache'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import transfer from '../../localization/utils'
import * as system from '../../actions/system'

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
    width: common.sw * 0.8 - common.getH(80),
  },
  autoLoginContainer: {
    marginTop: common.margin10,
    marginHorizontal: common.margin38,
  },
  autoLoginInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  autoLoginImage: {
    width: 13,
    height: 13,
  },
  autoLoginText: {
    marginLeft: common.margin10,
    fontSize: 12,
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

  componentDidMount = async () => {
    const { dispatch } = this.props
    this.props.dispatch(actions.toggleAutoLogin(false))
    const result = await AsyncStorage.getItem(common.user.string)
    if (result) {
      const user = JSON.parse(result)
      const { formState } = this.props
      const nextFormState = {
        ...formState,
        mobile: user.mobile || user.email,
      }
      dispatch(actions.loginUpdate(nextFormState))
    }
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
    const { dispatch, formState, language } = this.props

    // TODO 上线需要清理掉
    if (process.env.NODE_ENV === 'development'
      && formState.mobile.length === 0
    ) {
      dispatch(actions.login({
        mobile: '15913913914',
        password: '123456',
        client: 'app',
        language: language,
      }))
    }

    if (!formState.mobile.length) {
      Toast.fail(transfer(language, 'login_inputId'))
      return
    }
    const nextFormData = {}
    if (common.regMobile.test(formState.mobile)) {
      nextFormData.mobile = formState.mobile
    } else if (common.regEmail.test(formState.mobile)) {
      nextFormData.email = formState.mobile
    }
    if (Object.keys(nextFormData).length === 0) {
      Toast.fail(transfer(language, 'login_inputCorrectId'))
      return
    }
    if (!formState.password.length) {
      Toast.fail(transfer(language, 'login_inputPass'))
      return
    }
    nextFormData.password = formState.password
    nextFormData.client = 'app'
    nextFormData.language = language
    dispatch(actions.login(nextFormData))
  }

  loginHandle(nextProps) {
    const { dispatch, loggedIn, error, loggedInResult, screenProps, language } = nextProps

    if (loggedIn !== this.props.loggedIn) {
      Toast.success(transfer(language, 'login_success'))
      dispatch(system.updateRemoteLanguage({lang: language}))
      const user = loggedInResult
      const { isAutoLogin } = this.props
      AsyncStorage.setItem('isAutoLogin', isAutoLogin.toString())
      AsyncStorage.setItem('lastLoginTs', new Date().toISOString())
      storeSave(common.user.string, user, (e) => {
        if (!e) {
          dispatch(actions.findUser(schemas.findUser(user.id)))
          dispatch(actions.findAssetList(schemas.findAssetList(user.id)))
          dispatch(setInitialized({ initialized: false }))
          cache.setObject('isLoginIn', 'true')
          screenProps.dismiss()
        }
      })
    }

    const errs = {
      4000156: 'login_codeError',
      4000117: transfer(language, 'login_idOrPassError'),
    }

    if (nextProps.error && (error !== this.props.error)) {
      const msg = errs[error.code]
      if (msg) {
        Toast.fail(msg)
      } else if (error.code === 4000118) {
        Toast.fail(error.message)
      } else {
        Toast.fail(transfer(language, 'login_idOrPassError'))
      }
    }
  }

  tapAutoLogin = () => {
    const { isAutoLogin, dispatch } = this.props
    const newIsAutoLogin = !isAutoLogin
    dispatch(actions.toggleAutoLogin(newIsAutoLogin))
    AsyncStorage.setItem('isAutoLogin', newIsAutoLogin.toString())
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
            {transfer(language, 'login_idError')}
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
          title={transfer(language, 'login_id')}
          placeholder={transfer(language, 'login_idPlaceholder2')}
          value={formState.mobile}
          showDelBtn
          textInputProps={{
            onBlur: () => {
              if (!common.regMobile.test(formState.mobile) &&
                !common.regEmail.test(formState.mobile)) {
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
          title={transfer(language, 'login_password')}
          placeholder={transfer(language, 'login_passwordPlaceholder')}
          value={formState.password}
          maxLength={common.textInputMaxLenPwd}
          secureTextEntry
          onChange={e => this.onChange(e, 'password')}
        />
      </View>
    )
  }

  renderAutoLogin = () => {
    const { language, isAutoLogin } = this.props
    const text = transfer(language, 'login_auto_login')
    const textColor = isAutoLogin ? { color: 'rgb(255,213,2)' } : { color: 'rgb(97,105,137)' }
    const icon = isAutoLogin ?
      <Image style={styles.autoLoginImage} source={require('../../assets/icon_auto_login_selected.png')} />
      :
      <Image style={styles.autoLoginImage} source={require('../../assets/icon_auto_login.png')} />
    return (
      <View style={styles.autoLoginContainer}>
        <NextTouchableOpacity style={{ width: 100 }} delay={100} onPress={this.tapAutoLogin} >
          <View style={styles.autoLoginInnerContainer}>
            {icon}
            <Text style={[styles.autoLoginText, textColor]}>{text}</Text>
          </View>
        </NextTouchableOpacity>
      </View>
    )
  }

  renderExtraBtns = () => {
    const { navigation, language } = this.props
    return (
      <View style={styles.extraBtns}>
        <TKButton
          theme="small"
          caption={transfer(language, 'login_newUser')}
          onPress={() => navigation.navigate(language === 'zh_hans' ? 'Register' : 'EmailRegist')}
        />
        <TKButton
          theme="small"
          caption={transfer(language, 'login_forget_password')}
          onPress={() => navigation.navigate('ForgotPwd')}
        />
      </View>
    )
  }

  render() {
    const { loading, language } = this.props
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
      >
        <ScrollView
          style={styles.container}
          keyboardShouldPersistTaps="handled"
          automaticallyAdjustContentInsets={false}
        >

          {this.renderLogo()}
          {this.renderInput()}
          {this.renderAutoLogin()}
          <TKButton
            style={{ marginTop: common.margin40 }}
            theme="yellow"
            caption={transfer(language, 'login_login')}
            onPress={this.loginPress}
            disabled={this.loading}
          />
          {this.renderExtraBtns()}
          <TKSpinner
            isVisible={loading}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

function mapStateToProps(store) {
  return {
    formState: store.authorize.formState,
    error: store.authorize.error,
    isAutoLogin: store.authorize.isAutoLogin,
    loading: store.authorize.loading,
    loggedIn: store.authorize.loggedIn,
    loggedInResult: store.authorize.loggedInResult,
    language: store.system.language,
  }
}

export default connect(
  mapStateToProps,
)(Login)
