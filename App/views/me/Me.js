import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  StatusBar,
  ScrollView,
} from 'react-native'
import Spinner from 'react-native-spinkit'
import {
  userInfoUpdate,
  logoutRequest,
} from '../../actions/me'
import {
  common,
  storeRead,
  storeDelete,
} from '../common'
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

    this.logoutPress = this.logoutPress.bind(this)
    this.loginPress = this.loginPress.bind(this)

    this.readAndDisplay(dispatch)
  }

  componentDidMount() { }

  readAndDisplay(dispatch) {
    storeRead(common.user, (result) => {
      dispatch(userInfoUpdate(JSON.parse(result)))
    })
  }

  loginPress() {
    const { dispatch, user } = this.props
    const dismissBlock = () => {
      this.readAndDisplay(dispatch)
    }
    if (!user) {
      this.props.navigation.navigate('LoginStack', {
        dismissBlock,
      })
    }
  }

  logoutPress() {
    const { dispatch, navigation } = this.props
    dispatch(logoutRequest())
  }

  handleLogoutRequest() {
    const { dispatch, logoutVisible, logoutResponse, navigation } = this.props
    if (!logoutVisible && !this.showLogoutResponse) return

    if (logoutVisible) {
      this.showLogoutResponse = true
    } else {
      this.showLogoutResponse = false
      if (logoutResponse.success) {
        storeDelete(common.user, (error) => {
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

    const { user, logoutVisible } = this.props
    
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
          title={!user ? '请登录' : user.mobile}
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
          !user ? null :
            (<BtnLogout
              onPress={this.logoutPress}
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
    user: state.me.user,

    logoutVisible: state.me.logoutVisible,
    logoutResponse: state.me.logoutResponse,
  }
}

export default connect(
  mapStateToProps,
)(Me)
