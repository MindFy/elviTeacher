import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Text,
  View,
  Image,
  StatusBar,
  ScrollView,
} from 'react-native'
import {
  Overlay,
} from 'teaset'
import { common, storeRead } from '../../constants/common'
import SecurityCenterCell from './SecurityCenterCell'
import {
  getGoogleAuth,
} from '../../actions/securityCenter'
import actions from '../../actions/index'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import transfer from '../../localization/utils'
import schemas from '../../schemas/index'

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

  componentWillReceiveProps(nextProps) {
    const { language } = this.props
    if(this.props.requestGoogleAuthLoading && !nextProps.requestGoogleAuthLoading){
      const msg = nextProps.GoogleAuthBinded ? transfer(language, 'me_googleBinded') : transfer(language, 'me_googleBindReminder')
      this.showOverlay(msg)
    }
  }

  componentWillMount() {
    const { navigation, language } = this.props
    navigation.setParams({
      title: transfer(language, 'me_security_center'),
    })
  }

  componentDidMount() {
  }

  componentWillUnmount() {
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
          detail={common.maskEmail(loggedInResult.email || '')}
          onPress={() => {
            if (!loggedInResult.email) {
              navigation.navigate('UpdateEmail')
            } else {
              this.showOverlay(transfer(language, 'me_Email_binded'))
            }
          }}
        />
        {
          language === 'zh_hans' ?
            (<SecurityCenterCell
              title={transfer(language, 'me_linkMobile')}
              detail={common.maskMobile(loggedInResult.mobile || '')}
              onPress={() => {
                if (!loggedInResult.mobile) {
                  navigation.navigate('UpdateMobile')
                } else {
                  this.showOverlay(transfer(language, 'me_Mobile_binded'))
                }
              }}
            />) : null
        }
        <SecurityCenterCell
          title={transfer(language, 'me_google_authenticator')}
          detail=""
          onPress={() => {
            storeRead(common.user.string, (result) => {
              if (result) {
                const user = JSON.parse(result)
                const { dispatch } = this.props
                dispatch(actions.findUserUpdate(user))
                dispatch(actions.findUser(schemas.findUser(user.id)))
                dispatch(getGoogleAuth(schemas.findUser(user.id)))}
              })
            }
          }
        />
      </ScrollView>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state.securityCenter,
    googleAuth: state.user.googleAuth,
    loggedIn: state.authorize.loggedIn,
    loggedInResult: state.authorize.loggedInResult,
    language: state.system.language,
  }
}

export default connect(
  mapStateToProps,
)(SecurityCenter)
