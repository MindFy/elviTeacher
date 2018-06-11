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

class SecurityCenter extends Component {
  static navigationOptions(props) {
    return {
      headerTitle: '安全中心',
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
    this.listener = DeviceEventEmitter.addListener(common.noti.googleAuth, () => {
      this.showOverlay()
    })
  }

  componentWillUnmount() {
    this.listener.remove()
  }

  showOverlay() {
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
          >{this.props.googleAuth ? '谷歌认证已绑定' : '请前去官网完成绑定'}</Text>
        </View>
      </Overlay.View>
    )
    this.overlayViewKey = Overlay.show(overlayView)
    setTimeout(() => {
      Overlay.hide(this.overlayViewKey)
    }, 2000)
  }

  render() {
    const { navigation, loggedIn, dispatch } = this.props
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
          title="邮箱绑定"
        />
        <MeCell
          leftImageHide
          onPress={() => {
            if (loggedIn) dispatch(actions.getGoogleAuth())
            else navigation.navigate('LoginStack')
          }}
          title="谷歌验证码"
        />

      </ScrollView>
    )
  }
}

function mapStateToProps(state) {
  return {
    googleAuth: state.user.googleAuth,
    loggedIn: state.authorize.loggedIn,
  }
}

export default connect(
  mapStateToProps,
)(SecurityCenter)
