import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Image,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native'
import {
  Toast,
} from 'teaset'
import { common } from '../../constants/common'
import TextInputPwd from './TextInputPwd'
import TKButton from '../../components/TKButton'
import TKSpinner from '../../components/TKSpinner'
import actions from '../../actions/index'

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
          </TouchableOpacity>
        ),
    }
  }

  constructor() {
    super()
    this.showUpdatePasswordResponse = false
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(actions.updatePasswordUpdate({
      oldPassword: '',
      newPassword: '',
      newPasswordAgain: '',
    }))
  }

  onChange(event, tag) {
    const { text } = event.nativeEvent
    const { dispatch, oldPassword, newPassword, newPasswordAgain } = this.props

    switch (tag) {
      case 'oldPassword':
        dispatch(actions.updatePasswordUpdate({ oldPassword: text, newPassword, newPasswordAgain }))
        break
      case 'newPassword':
        dispatch(actions.updatePasswordUpdate({ oldPassword, newPassword: text, newPasswordAgain }))
        break
      case 'newPasswordAgain':
        dispatch(actions.updatePasswordUpdate({ oldPassword, newPassword, newPasswordAgain: text }))
        break
      default:
        break
    }
  }

  confirmPress() {
    Keyboard.dismiss()

    const { oldPassword, newPassword, newPasswordAgain } = this.props
    if (!oldPassword.length) {
      Toast.message('请输入旧密码')
      return
    }
    if (!newPassword.length || !common.regPassword.test(newPassword)
      || !common.regSpace.test(newPassword)) {
      Toast.show({
        style: {
          paddingLeft: common.margin15,
          paddingRight: common.margin15,
        },
        text: `新${common.regPasswordMsg}`,
        position: 'bottom',
      })
      return
    }
    if (oldPassword === newPassword) {
      Toast.message('新密码和旧密码不能一样')
      return
    }
    if (!newPasswordAgain.length) {
      Toast.message('请再次输入新密码')
      return
    }
    if (newPassword !== newPasswordAgain) {
      Toast.message('新密码输入不一致')
      return
    }
    this.updatePassword()
  }

  updatePassword() {
    const { dispatch, oldPassword, newPassword } = this.props
    dispatch(actions.updatePassword({
      oldpassword: oldPassword,
      newpassword: newPassword,
    }))
  }

  handlePasswordRequest() {
    const { updatePasswordVisible, updatePasswordResponse, navigation } = this.props
    if (!updatePasswordVisible && !this.showUpdatePasswordResponse) return

    if (updatePasswordVisible) {
      this.showUpdatePasswordResponse = true
    } else {
      this.showUpdatePasswordResponse = false
      if (updatePasswordResponse.success) {
        Toast.success(updatePasswordResponse.result.message)
        navigation.goBack()
      } else if (updatePasswordResponse.error.code === 4030501) {
        Toast.fail('原密码错误')
      } else if (updatePasswordResponse.error.code === 4000120) {
        Toast.fail('原密码错误')
      } else if (updatePasswordResponse.error.code === 4000121) {
        Toast.fail('原密码错误')
      } else if (updatePasswordResponse.error.message === common.badNet) {
        Toast.fail('网络连接失败，请稍后重试')
      } else {
        Toast.fail('密码修改失败，请重试')
      }
    }
  }

  render() {
    this.handlePasswordRequest()

    const { oldPassword, newPassword, newPasswordAgain, updatePasswordVisible } = this.props
    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: common.bgColor,
        }}
        behavior="padding"
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode={'on-drag'}
        >

          <TextInputPwd
            placeholder={'旧密码'}
            value={oldPassword}
            onChange={e => this.onChange(e, 'oldPassword')}
            maxLength={common.textInputMaxLenPwd}
            secureTextEntry
          />
          <TextInputPwd
            placeholder={'输入密码'}
            value={newPassword}
            type={'newPassword'}
            secureTextEntry
            onChange={e => this.onChange(e, 'newPassword')}
            maxLength={common.textInputMaxLenPwd}
          />
          <TextInputPwd
            placeholder={'再次输入密码'}
            value={newPasswordAgain}
            type={'newPasswordAgain'}
            newPassword={newPassword}
            newPasswordAgain={newPasswordAgain}
            onChange={e => this.onChange(e, 'newPasswordAgain')}
            maxLength={common.textInputMaxLenPwd}
            secureTextEntry
          />

          <TKButton
            style={{ marginTop: common.margin10 }}
            onPress={() => this.confirmPress()}
            disabled={updatePasswordVisible}
            caption="确认"
            theme={'gray'}
          />
        </ScrollView>

        <TKSpinner
          isVisible={updatePasswordVisible}
        />
      </KeyboardAvoidingView>
    )
  }
}

function mapStateToProps(store) {
  return {
    oldPassword: store.user.oldPassword,
    newPassword: store.user.newPassword,
    newPasswordAgain: store.user.newPasswordAgain,

    updatePasswordVisible: store.user.updatePasswordVisible,
    updatePasswordResponse: store.user.updatePasswordResponse,
  }
}

export default connect(
  mapStateToProps,
)(UpdatePassword)
