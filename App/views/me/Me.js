import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Text,
  View,
  ScrollView,
} from 'react-native'
import {
  common,
} from '../../constants/common'
import MeCell from './MeCell'
import TKButton from '../../components/TKButton'
import TKSpinner from '../../components/TKSpinner'
import actions from '../../actions/index'
import cache from '../../utils/cache'
import transfer from '../../localization/utils'
import Alert from '../../components/Alert'
import { getDefaultLanguage } from '../../utils/languageHelper'
import user from '../../reducers/user';
import {
  Overlay,
} from 'teaset'

class Me extends Component {
  static navigationOptions = () => {
    const language = getDefaultLanguage()
    const title = transfer(language, 'me_me')
    return {
      headerTitle: title,
      tabBarLabel: transfer(language, 'accountTab'),
    }
  }

  constructor(props) {
    super(props)

    this.showLogoutResponse = false
    props.navigation.addListener('didFocus', () => {
      cache.setObject('currentComponentVisible', 'Me')
      if(this.props.loggedIn) this.props.dispatch(actions.sync())
    })
  }

  componentDidMount() {
    const { navigation, language } = this.props
    navigation.setParams({
      title: transfer(language, 'me_me'),
    })
  }

  /* 跳转到登录页面 */
  navigateLogin() {
    const { navigation } = this.props
    navigation.navigate('LoginStack')
  }

  logoutPress() {
    const { dispatch, language } = this.props
    Alert.alert(
      transfer(language, 'me_logout_tilte'),
      '',
      [
        {
          text: transfer(language, 'me_logout_cancel'),
          onPress: () => { },
          style: 'cancel',
        },
        {
          text: transfer(language, 'me_logout_confirm'),
          onPress: () => {
            dispatch(actions.logout())
            dispatch(actions.clearAllReducer())
            cache.removeObject('isLoginIn')
          },
        },
      ],
    )
  }

  maskPhoneOrEmail(value) {
    const mobile = value.mobile
    const email = value.email
    if (mobile) {
      return String(mobile).replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
    }
    if (email) {
      const arr = email.split('@')
      if (arr[0].length > 3) {
        return `${arr[0].substring(0, 3)}****@${arr[1]}`
      }
      return email
    }
    return ''
  }

  showOverlay(msg) {
    const overlayView = (
      <Overlay.View
        style={{ justifyContent: 'center' }}
        modal={false}
        overlayOpacity={0}
      >
        <View
          style={{
            marginTop: -common.margin210,
            borderRadius: common.radius6,
            height: common.h60,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignSelf: 'center',
            width: '50%',
          }}
        >
          <Text
            style={{
              fontSize: common.font16,
              color: common.blackColor,
              alignSelf: 'center',
            }}
          >{msg}</Text>
        </View>
      </Overlay.View>
    )
    this.overlayViewKey = Overlay.show(overlayView)
    setTimeout(() => {
      Overlay.hide(this.overlayViewKey)
    }, 2000)
  }

  render() {
    const { loggedIn, navigation, loading, loggedInResult, language } = this.props
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: common.bgColor,
        }}
      >
        <ScrollView>
          <MeCell
            onPress={() => {
              if (!loggedIn) {
                this.navigateLogin()
              }
            }}
            viewStyle={{
              marginTop: common.margin10,
              height: common.h50,
            }}
            leftImageStyle={{
              width: common.w25,
              height: common.w25,
            }}
            leftImageSource={require('../../assets/default_icon.png')}
            titleStyle={{
              fontSize: common.font16,
            }}
            title={!loggedIn ? transfer(language, 'me_login') : this.maskPhoneOrEmail(loggedInResult)}
            rightImageHide
            target="global"
          />
          <MeCell
            viewStyle={{
              marginTop: common.margin10,
            }}
            onPress={() => {
              if (loggedIn) navigation.navigate('Authentication')
              else navigation.navigate('LoginStack')
            }}
            leftImageSource={require('../../assets/phone_right.png')}
            title={transfer(language, 'me_identity_authentication')}
            target="global"
          />
          <MeCell
            onPress={() => {
              if (loggedIn) navigation.navigate('SecurityCenter')
              else navigation.navigate('LoginStack')
            }}
            leftImageSource={require('../../assets/phone_down.png')}
            title={transfer(language, 'me_security_center')}
            target="global"
          />
          <MeCell
            onPress={() => {
              if (!loggedIn){
                navigation.navigate('LoginStack')
              } else if (loggedInResult && loggedInResult.idCardAuthStatus && loggedInResult.idCardAuthStatus === common.user.status.pass){
                navigation.navigate('UpdateBank', { fromMe: 'fromMe' })
              } else {
                this.showOverlay(transfer(language, 'me_id_authentic_before'))
              }
            }}
            leftImageSource={require('../../assets/bank_card.png')}
            title={transfer(language, 'me_bankCards_management')}
            target="global"
          />
          <MeCell
            onPress={() => {
              if (loggedIn) navigation.navigate('Rebates')
              else navigation.navigate('LoginStack')
            }}
            leftImageSource={require('../../assets/gift.png')}
            title={transfer(language, 'me_super_cashBack')}
            target="global"
          />
          <MeCell
            onPress={() => navigation.navigate('Settings')}
            leftImageSource={require('../../assets/setting.png')}
            title={transfer(language, 'me_settings')}
          />

          {
            loggedIn ? (<TKButton
              style={{
                marginTop: common.margin40,
                marginLeft: 0,
                marginRight: 0,
              }}
              onPress={() => this.logoutPress()}
              disabled={!loggedIn}
              caption={transfer(language, 'me_logOut')}
              theme={'gray'}
            />) : null
          }
        </ScrollView>

        <TKSpinner
          isVisible={loading}
        />
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.authorize.loggedIn,
    loading: state.authorize.loading,
    loggedInResult: state.authorize.loggedInResult,
    language: state.system.language,
  }
}

export default connect(
  mapStateToProps,
)(Me)
