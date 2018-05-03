import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  StatusBar,
  ScrollView,
} from 'react-native'
import Spinner from 'react-native-spinkit'
import {
  common,
  storeRead,
  storeDelete,
} from '../../constants/common'
import MeCell from './MeCell'
import BtnLogout from './BtnLogout'
import actions from '../../actions/index'
import schemas from '../../schemas/index'

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

    this.showLogoutResponse = false
  }

  /* 读取用户数据并展示 */
  readAndDisplay() {
    const { dispatch } = this.props
    storeRead(common.user, (result) => {
      const objectResult = JSON.parse(result)

      dispatch(actions.findUserUpdate(objectResult))
      /* 发送获取用户个人信息请求 */
      dispatch(actions.findUser(schemas.findUser(objectResult.id)))
      dispatch(actions.findAssetList(schemas.findAssetList(objectResult.id)))
    })
  }

  /* 跳转到登录页面 */
  navigateLogin() {
    const { navigation } = this.props
    navigation.navigate('LoginStack')
  }

  logoutPress() {
    const { dispatch } = this.props
    dispatch(actions.logout())
  }

  handleLogoutRequest() {
    const { dispatch, logoutVisible, logoutResponse } = this.props
    if (!logoutVisible && !this.showLogoutResponse) return

    if (logoutVisible) {
      this.showLogoutResponse = true
    } else {
      this.showLogoutResponse = false
      if (logoutResponse.success) {
        storeDelete(common.user, (error) => {
          if (!error) {
            // 清除页面数据
            dispatch(actions.findUserUpdate(undefined))
            dispatch(actions.findAssetListUpdate({
              asset: [
                {
                  amount: 0,
                  freezed: 0,
                  id: 1,
                  rechargeaddr: '',
                  token: { id: 1, name: 'TK' },
                },
                {
                  amount: 0,
                  freezed: 0,
                  id: 2,
                  rechargeaddr: '',
                  token: { id: 2, name: 'BTC' },
                },
                {
                  amount: 0,
                  freezed: 0,
                  id: 3,
                  rechargeaddr: '',
                  token: { id: 3, name: 'CNYT' },
                },
              ],
              amountVisible: { TK: 0, BTC: 0, CNYT: 0 },
            }))
            // 返回登录页
            this.navigateLogin()
          }
        })
      } else {
        // 登出失败
      }
    }
  }

  render() {
    this.handleLogoutRequest()

    const { user, logoutVisible, navigation } = this.props

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: common.bgColor,
        }}
      >
        <ScrollView>
          <StatusBar
            barStyle={'light-content'}
          />

          <MeCell
            onPress={() => {
              if (!user) {
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
            leftImageSource={require('../../assets/默认头像ICON.png')}
            titleStyle={{
              fontSize: common.font16,
            }}
            title={!user ? '请登录' : user.mobile}
            rightImageHide
          />
          <MeCell
            viewStyle={{
              marginTop: common.margin10,
            }}
            onPress={() => {
              if (user) navigation.navigate('Authentication')
              else navigation.navigate('LoginStack')
            }}
            leftImageSource={require('../../assets/手机认证copy.png')}
            title="身份认证"
          />
          <MeCell
            onPress={() => { }}
            leftImageSource={require('../../assets/手机认证.png')}
            title="安全中心"
          />
          <MeCell
            onPress={() => {
              if (user) navigation.navigate('UpdateBank', { fromMe: 'fromMe' })
              else navigation.navigate('LoginStack')
            }}
            leftImageSource={require('../../assets/银行卡.png')}
            title="银行卡管理"
          />
          <MeCell
            onPress={() => { }}
            leftImageSource={require('../../assets/手机认证copy3.png')}
            title="超级返利"
          />
          <MeCell
            onPress={() => navigation.navigate('Settings')}
            leftImageSource={require('../../assets/手机认证copy4.png')}
            title="设置"
          />

          {
            !user ? null :
              (<BtnLogout
                onPress={() => this.logoutPress()}
                disabled={logoutVisible}
                title="退出登录"
              />)
          }
        </ScrollView>

        <Spinner
          style={{
            position: 'absolute',
            alignSelf: 'center',
            marginTop: common.sh / 2 - common.h50 / 2 - 64,
          }}
          isVisible={logoutVisible}
          size={common.h50}
          type={'Wave'}
          color={common.btnTextColor}
        />
      </View>
    )
  }
}

function mapStateToProps(store) {
  return {
    user: store.user.user,

    logoutVisible: store.user.logoutVisible,
    logoutResponse: store.user.logoutResponse,
  }
}

export default connect(
  mapStateToProps,
)(Me)
