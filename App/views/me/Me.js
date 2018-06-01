import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
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

  /* 跳转到登录页面 */
  navigateLogin() {
    const { navigation } = this.props
    navigation.navigate('LoginStack')
  }

  logoutPress() {
    const { dispatch } = this.props
    dispatch(actions.logout())
  }

  render() {
    const { user, logoutVisible, navigation } = this.props

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
            onPress={() => {
              if (user) navigation.navigate('Rebates')
              else navigation.navigate('LoginStack')
            }}
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
            onPress={() => {
              if (user) navigation.navigate('Rebates')
              else navigation.navigate('LoginStack')
            }}
            leftImageSource={require('../../assets/手机认证copy3.png')}
            title="超级返利"
          />
          <MeCell
            onPress={() => {
              if (user) navigation.navigate('Rebates')
              else navigation.navigate('LoginStack')
            }}
            leftImageSource={require('../../assets/手机认证copy4.png')}
            title="设置"
          />

          {
            user ? (<TKButton
              style={{
                marginTop: common.margin40,
                marginLeft: 0,
                marginRight: 0,
              }}
              onPress={() => this.logoutPress()}
              disabled={logoutVisible}
              caption="退出登录"
              theme={'gray'}
            />) : null
          }
        </ScrollView>

        <TKSpinner
          isVisible={logoutVisible}
        />
      </View>
    )
  }
}

function mapStateToProps(store) {
  return {
    user: store.user.user,
    logoutVisible: store.user.logoutVisible,
  }
}

export default connect(
  mapStateToProps,
)(Me)
