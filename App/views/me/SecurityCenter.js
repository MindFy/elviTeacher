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
  componentDidMount() {
    const { navigation, language } = this.props
    navigation.setParams({
      title: transfer(language, 'me_security_center'),
    })
    this.listener = DeviceEventEmitter.addListener(common.noti.googleAuth, () => {
      this.showOverlay()
    })
  }

  componentWillUnmount() {
    this.listener.remove()
  }

  showOverlay() {
    const { language } = this.props
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
          >{this.props.googleAuth ? transfer(language, 'me_googleBinded') : transfer(language, 'me_googleBindReminder')}</Text>
        </View>
      </Overlay.View>
    )
    this.overlayViewKey = Overlay.show(overlayView)
    setTimeout(() => {
      Overlay.hide(this.overlayViewKey)
    }, 2000)
  }

  render() {
    const { navigation, loggedIn, dispatch, language } = this.props
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

        <MeCell
          viewStyle={{
            marginTop: common.margin10,
          }}
          leftImageHide
          onPress={() => {
            if (loggedIn) navigation.navigate('UpdateEmail')
            else navigation.navigate('LoginStack')
          }}
          title={transfer(language, 'me_linkEmail')}
        />
        <MeCell
          leftImageHide
          onPress={() => {
            if (loggedIn) dispatch(actions.getGoogleAuth())
            else navigation.navigate('LoginStack')
          }}
          title={transfer(language, 'me_google_authenticator')}
        />

      </ScrollView>
    )
  }
}

function mapStateToProps(state) {
  return {
    googleAuth: state.user.googleAuth,
    loggedIn: state.authorize.loggedIn,
    language: state.system.language,
  }
}

export default connect(
  mapStateToProps,
)(SecurityCenter)
