import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Text,
  View,
  Image,
  StatusBar,
  ScrollView,
  DeviceEventEmitter,
} from 'react-native'
import {
  Overlay,
} from 'teaset'
import { common } from '../../constants/common'
import MeCell from './MeCell'
import SecurityCenterCell from './SecurityCenterCell'
import actions from '../../actions/index'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import transfer from '../../localization/utils'

class SecurityCenter extends Component {
  static navigationOptions(props) {
    let title = ''
    if (props.navigation.state.params) {
      title = props.navigation.state.params.title
    }
    return {
      headerTitle: title,
      headerLeft:
        (
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

  componentWillMount() {
    const { navigation, language } = this.props
    navigation.setParams({
      title: transfer(language, 'me_security_center'),
    })
  }

  componentDidMount() {
    this.listener = DeviceEventEmitter.addListener(common.noti.googleAuth, () => {
      const { googleAuth, language } = this.props
      const msg = googleAuth ? transfer(language, 'me_googleBinded') : transfer(language, 'me_googleBindReminder')
      this.showOverlay(msg)
    })
  }

  componentWillUnmount() {
    this.listener.remove()
  }

  showOverlay(msg) {
    const overlayView = (
      <Overlay.View
        style={{
          justifyContent: 'center',
        }}
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

  maskMobile(value) {
    return String(value).replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
  }

  maskEmail(value = '') {
    if (value) {
      const arr = value.split('@')
      if (arr[0].length > 3) {
        return `${arr[0].substring(0, 3)}****@${arr[1]}`
      }
      return value
    }
    return ''
  }

  render() {
    const { navigation, loggedInResult, dispatch, language } = this.props
    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: common.bgColor,
        }}
      >
        <StatusBar
          barStyle={'light-content'}
        />
        <SecurityCenterCell
          title={transfer(language, 'me_linkEmail')}
          detail={this.maskEmail(loggedInResult.email || '')}
          onPress={() => {
            if (!loggedInResult.email) {
              navigation.navigate('UpdateEmail')
            } else {
              this.showOverlay(transfer(language, 'me_Email_binded'))
            }
          }}
        />
        <SecurityCenterCell
          title={transfer(language, 'me_linkMobile')}
          detail={this.maskMobile(loggedInResult.mobile || '')}
          onPress={() => {
            if (!loggedInResult.mobile) {
              navigation.navigate('EmailCheck')
            } else {
              this.showOverlay(transfer(language, 'me_Mobile_binded'))
            }
          }}
        />
        <SecurityCenterCell
          title={transfer(language, 'me_google_authenticator')}
          detail=""
          onPress={() => dispatch(actions.getGoogleAuth())}
        />
      </ScrollView>
    )
  }
}

function mapStateToProps(state) {
  return {
    googleAuth: state.user.googleAuth,
    loggedIn: state.authorize.loggedIn,
    loggedInResult: state.authorize.loggedInResult,
    language: state.system.language,
  }
}

export default connect(
  mapStateToProps,
)(SecurityCenter)
