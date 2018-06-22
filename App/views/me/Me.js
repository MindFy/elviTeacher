import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  ScrollView,
  Alert,
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

class Me extends Component {
  static navigationOptions({ navigation }) {
    let title = ''
    if (navigation.state.params) {
      title = navigation.state.params.title
    }
    return {
      headerTitle: title,
    }
  }

  constructor(props) {
    super(props)

    this.showLogoutResponse = false
    props.navigation.addListener('didFocus', () => {
      cache.setObject('currentComponentVisible', 'Me')
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
      { cancelable: false },
    )
  }

  maskPhone(phone) {
    if (!phone) return undefined

    const str = String(phone)
    return str.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
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
            title={!loggedIn ? transfer(language, 'me_login') : this.maskPhone(loggedInResult.mobile)}
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
              if (loggedIn) navigation.navigate('UpdateBank', { fromMe: 'fromMe' })
              else navigation.navigate('LoginStack')
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
