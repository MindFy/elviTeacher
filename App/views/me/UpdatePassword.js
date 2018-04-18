import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native'
import {
  MessageBar,
  MessageBarManager,
} from 'react-native-message-bar'
import Spinner from 'react-native-spinkit'
import { common } from '../common'
import TextInputPwd from './TextInputPwd'
import BtnLogout from './BtnLogout'
import * as actions from '../../actions/index'

class UpdatePassword extends Component {
  static navigationOptions(props) {
    return {
      headerTitle: '修改密码',
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
          <TouchableOpacity
            activeOpacity={common.activeOpacity}
            onPress={() => props.navigation.goBack()}
          >
            <Image
              style={{
                marginLeft: common.margin10,
                width: common.w10,
                height: common.h20,
              }}
              source={require('../../assets/下拉copy.png')}
            />
          </TouchableOpacity>
        ),
    }
  }

  constructor() {
    super()
    this.showPasswordResponse = false

    this.confirmPress = this.confirmPress.bind(this)

    this.msgBar = undefined
  }

  componentDidMount() {
    MessageBarManager.registerMessageBar(this.msgBar)
  }

  componentWillUnmount() {
    MessageBarManager.unregisterMessageBar()
  }

  onChange(event, tag) {
    const { text } = event.nativeEvent
    const { dispatch, oldPassword, newPassword, newPasswordAgain } = this.props

    switch (tag) {
      case 'oldPassword':
        // dispatch(passwordUpdate(text, newPassword, newPasswordAgain))
        break
      case 'newPassword':
        // dispatch(passwordUpdate(oldPassword, text, newPasswordAgain))
        break
      case 'newPasswordAgain':
        // dispatch(passwordUpdate(oldPassword, newPassword, text))
        break
      default:
        break
    }
  }

  confirmPress() {
    const { dispatch, oldPassword, newPassword, newPasswordAgain } = this.props
    if (!oldPassword.length) {
      this.showAlert('请输入旧密码', 'warning')
      return
    }
    if (!newPassword.length) {
      this.showAlert('请输入新密码', 'warning')
      return
    }
    if (!newPasswordAgain.length) {
      this.showAlert('请再次输入新密码', 'warning')
      return
    }
    if (newPassword !== newPasswordAgain) {
      this.showAlert('新密码输入不一致', 'warning')
      return
    }
    if (newPassword.length < 6) {
      this.showAlert('新密码至少为6位', 'warning')
      return
    }
    dispatch(passwordRequest({
      oldpassword: oldPassword,
      newpassword: newPassword,
    }))
  }

  handlePasswordRequest() {
    const { dispatch, passwordVisible, passwordResponse, navigation } = this.props
    if (!passwordVisible && !this.showPasswordResponse) return

    if (passwordVisible) {
      this.showPasswordResponse = true
    } else {
      this.showPasswordResponse = false
      if (passwordResponse.success) {
        this.showAlert(passwordResponse.result.message, 'success')
        dispatch(passwordUpdate(undefined, undefined, undefined))
        navigation.goBack()
      } else {
        this.showAlert(passwordResponse.error.message, 'error')
      }
    }
  }

  showAlert(message, alertType) {
    MessageBarManager.showAlert({
      message,
      alertType,
      duration: common.messageBarDur,
      messageStyle: {
        marginTop: common.margin10,
        alignSelf: 'center',
        color: 'white',
        fontSize: common.font14,
      },
    })
  }

  render() {
    this.handlePasswordRequest()

    const { oldPassword, newPassword, newPasswordAgain, passwordVisible } = this.props
    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: common.bgColor,
        }}
        behavior="padding"
      >
        <ScrollView>
          <StatusBar
            barStyle={'light-content'}
          />

          <TextInputPwd
            placeholder={'旧密码'}
            value={oldPassword}
            onChange={e => this.onChange(e, 'oldPassword')}
            maxLength={common.textInputMaxLenPwd}
          />
          <TextInputPwd
            placeholder={'输入密码'}
            value={newPassword}
            onChange={e => this.onChange(e, 'newPassword')}
            maxLength={common.textInputMaxLenPwd}
          />
          <TextInputPwd
            placeholder={'再次输入密码'}
            value={newPasswordAgain}
            onChange={e => this.onChange(e, 'newPasswordAgain')}
            maxLength={common.textInputMaxLenPwd}
          />

          <BtnLogout
            viewStyle={{
              marginLeft: common.margin10,
              marginRight: common.margin10,
            }}
            onPress={this.confirmPress}
            disabled={passwordVisible}
            title="确认"
          />
        </ScrollView>

        <Spinner
          style={{
            position: 'absolute',
            alignSelf: 'center',
            marginTop: common.sh / 2 - common.h50 / 2,
          }}
          isVisible={passwordVisible}
          size={common.h50}
          type={'Wave'}
          color={common.btnTextColor}
        />
        <MessageBar
          ref={(e) => {
            this.msgBar = e
          }}
        />
      </KeyboardAvoidingView>
    )
  }
}

function mapStateToProps(state) {
  return {
    oldPassword: state.user.oldPassword,
    newPassword: state.user.newPassword,
    newPasswordAgain: state.user.newPasswordAgain,

    passwordVisible: state.user.passwordVisible,
    passwordResponse: state.user.passwordResponse,
  }
}

export default connect(
  mapStateToProps,
)(UpdatePassword)
