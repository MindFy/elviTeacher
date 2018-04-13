import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  StatusBar,
  ScrollView,
} from 'react-native'
import Spinner from 'react-native-spinkit'
import {
  userInfoUpdate,
  userInfoRequest,
  logoutRequest,
} from '../../actions/me'
import {
  common,
  storeSave,
  storeRead,
  storeDelete,
} from '../common'
import userInfoSchema from '../../schemas/me'
import MeCell from './MeCell'
import BtnLogout from './BtnLogout'

class Me extends Component {
  static navigationOptions() {
    return {
      headerTitle: '我的',
      headerStyle: {
        backgroundColor: common.navBgColor,
        borderBottomWidth: 0,
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontSize: common.font16,
      },
      headerLeft: null,
    }
  }

  constructor(props) {
    super(props)
    const { dispatch } = props

    this.showLogoutResponse = false
    this.showUserInfoResponse = false

    this.logoutPress = this.logoutPress.bind(this)
    this.loginPress = this.loginPress.bind(this)

    this.readAndDisplay(dispatch)
  }

  componentDidMount() { }

  readAndDisplay(dispatch) {
    storeRead(common.userInfo, (result) => {
      const objectResult = JSON.parse(result)

      dispatch(userInfoUpdate(objectResult))
      dispatch(userInfoRequest(userInfoSchema(objectResult.id)))
    })
  }

  loginPress() {
    const { dispatch, userInfo } = this.props
    const dismissBlock = () => {
      this.readAndDisplay(dispatch)
    }
    if (!userInfo) {
      this.props.navigation.navigate('LoginStack', {
        dismissBlock,
      })
    }
  }

  logoutPress() {
    const { dispatch } = this.props
    dispatch(logoutRequest())
  }

  handleUserInfoRequest() {
    const { dispatch, userInfoVisible, userInfoResponse, userInfo } = this.props
    if (!userInfoVisible && !this.showUserInfoResponse) return

    if (userInfoVisible) {
      this.showUserInfoResponse = true
    } else {
      this.showUserInfoResponse = false
      if (userInfoResponse.success) {
        const responseUserInfo = userInfoResponse.result.data.user
        storeSave(common.userInfo, responseUserInfo, (error) => {
          if (!error) {
            dispatch(userInfoUpdate(responseUserInfo))
          }
        })
      }
    }
  }

  handleLogoutRequest() {
    const { dispatch, logoutVisible, logoutResponse, navigation } = this.props
    if (!logoutVisible && !this.showLogoutResponse) return

    if (logoutVisible) {
      this.showLogoutResponse = true
    } else {
      this.showLogoutResponse = false
      if (logoutResponse.success) {
        storeDelete(common.userInfo, (error) => {
          if (!error) {
            // 清除页面数据
            dispatch(userInfoUpdate(undefined))
            // 返回登录页
            navigation.navigate('LoginStack')
          } else {
            // 删除失败
          }
        })
      } else {
        // 登出失败
      }
    }
  }

  render() {
    this.handleLogoutRequest()
    this.handleUserInfoRequest()

    const { userInfo, logoutVisible } = this.props

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
          onPress={this.loginPress}
          viewStyle={{
            marginTop: common.margin10,
            height: common.h50,
          }}
          leftImageStyle={{
            width: common.w25,
            height: common.w25,
          }}
          leftImageSource={require('../../assets/默认头像ICON.png')}
          titleStyle={{
            fontSize: common.font16,
          }}
          title={!userInfo ? '请登录' : userInfo.mobile}
          rightImageHide
        />
        <MeCell
          onPress={() => this.props.navigation.navigate('Authentication')}
          leftImageSource={require('../../assets/手机认证copy.png')}
          title="身份认证"
        />
        <MeCell
          onPress={() => { }}
          leftImageSource={require('../../assets/手机认证.png')}
          title="手机认证"
        />
        <MeCell
          onPress={() => { }}
          leftImageSource={require('../../assets/手机认证copy3.png')}
          title="超级返利"
        />
        <MeCell
          onPress={() => this.props.navigation.navigate('Settings')}
          leftImageSource={require('../../assets/手机认证copy4.png')}
          title="设置"
        />

        {
          !userInfo ? null :
            (<BtnLogout
              onPress={this.logoutPress}
              disabled={logoutVisible}
              title="退出登录"
            />)
        }

        <Spinner
          style={{
            position: 'absolute',
            alignSelf: 'center',
            marginTop: common.sh / 2 - common.h50 / 2,
          }}
          isVisible={logoutVisible}
          size={common.h50}
          type={'Wave'}
          color={common.btnTextColor}
        />
      </ScrollView>
    )
  }
}

function mapStateToProps(state) {
  return {
    userInfo: state.me.userInfo,
    userInfoVisible: state.me.userInfoVisible,
    userInfoResponse: state.me.userInfoResponse,

    logoutVisible: state.me.logoutVisible,
    logoutResponse: state.me.logoutResponse,
  }
}

export default connect(
  mapStateToProps,
)(Me)
