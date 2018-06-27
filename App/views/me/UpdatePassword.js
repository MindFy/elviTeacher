import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Image,
  ScrollView,
  StyleSheet,
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
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import transfer from '../../localization/utils'

const styles = StyleSheet.create({
  backBtn: {
    height: common.w40,
    width: common.w40,
    justifyContent: 'center',
  },
  backImage: {
    marginLeft: common.margin10,
    width: common.w10,
    height: common.h20,
  },
  container: {
    flex: 1,
    backgroundColor: common.bgColor,
  },
  confirmBtn: {
    marginTop: common.margin10,
  },
  input: {
    flex: undefined,
  },
})

class UpdatePassword extends Component {
  static navigationOptions(props) {
    let title = ''
    if (props.navigation.state.params) {
      title = props.navigation.state.params.title
    }
    return {
      headerTitle: title,
      headerLeft: (
        <NextTouchableOpacity
          style={styles.backBtn}
          activeOpacity={common.activeOpacity}
          onPress={() => props.navigation.goBack()}
        >
          <Image
            style={styles.backImage}
            source={require('../../assets/arrow_left_left.png')}
          />
        </NextTouchableOpacity>
      ),
    }
  }

  constructor() {
    super()
    this.showUpdatePasswordResponse = false
  }

  componentWillMount() {
    const { navigation, language } = this.props
    navigation.setParams({
      title: transfer(language, 'me_settings_changePW'),
    })
  }

  componentWillReceiveProps(nextProps) {
    this.handlePasswordRequest(nextProps)
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
    const newText = text.trim()
    switch (tag) {
      case 'oldPassword':
        dispatch(actions.updatePasswordUpdate({
          oldPassword: newText, newPassword, newPasswordAgain,
        }))
        break
      case 'newPassword':
        dispatch(actions.updatePasswordUpdate({
          oldPassword, newPassword: newText, newPasswordAgain,
        }))
        break
      case 'newPasswordAgain':
        dispatch(actions.updatePasswordUpdate({
          oldPassword, newPassword, newPasswordAgain: newText,
        }))
        break
      default:
        break
    }
  }

  confirmPress() {
    Keyboard.dismiss()

    const { oldPassword, newPassword, newPasswordAgain, language } = this.props
    if (!oldPassword.length) {
      Toast.fail(transfer(language, 'me_settings_PWold'))
      return
    }
    if (!newPassword.length || !common.regPassword.test(newPassword)
      || !common.regSpace.test(newPassword)) {
      Toast.show({
        style: {
          paddingLeft: common.margin15,
          paddingRight: common.margin15,
        },
        text: transfer(language, 'me_settings_PWillegal'),
        position: 'bottom',
      })
      return
    }
    if (oldPassword === newPassword) {
      Toast.fail(transfer(language, 'me_settings_PWunchange'))
      return
    }
    if (!newPasswordAgain.length) {
      Toast.fail(transfer(language, 'me_settings_PWnewAgain'))
      return
    }
    if (newPassword !== newPasswordAgain) {
      Toast.fail(transfer(language, 'me_settings_PWreminder'))
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

  handlePasswordRequest(nextProps) {
    const { updatePasswordVisible, updatePasswordResponse, navigation, language } = nextProps
    if (!updatePasswordVisible && !this.showUpdatePasswordResponse) return

    if (updatePasswordVisible) {
      this.showUpdatePasswordResponse = true
    } else {
      this.showUpdatePasswordResponse = false
      if (updatePasswordResponse.success) {
        Toast.success(transfer(language, 'me_change_pwd_succeed'))
        navigation.goBack()
      } else if (updatePasswordResponse.error.code === 4030501) {
        Toast.fail(transfer(language, 'me_settings_PWoldWrong'))
      } else if (updatePasswordResponse.error.code === 4000120) {
        Toast.fail(transfer(language, 'me_settings_PWoldWrong'))
      } else if (updatePasswordResponse.error.code === 4000121) {
        Toast.fail(transfer(language, 'me_settings_PWoldWrong'))
      } else if (updatePasswordResponse.error.message === common.badNet) {
        Toast.fail(transfer(language, 'me_settings_PWinternetFailed'))
      } else {
        Toast.fail(transfer(language, 'me_settings_PWchangeFailed'))
      }
    }
  }

  render() {
    const {
      oldPassword,
      newPassword,
      newPasswordAgain,
      updatePasswordVisible,
      language,
    } = this.props
    return (
      <ScrollView
        style={styles.container}
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustContentInsets={false}
      >
        <TextInputPwd
          language={language}
          viewStyle={styles.input}
          placeholder={transfer(language, 'me_settings_PWold')}
          value={oldPassword}
          onChange={e => this.onChange(e, 'oldPassword')}
          maxLength={common.textInputMaxLenPwd}
          secureTextEntry
        />
        <TextInputPwd
          language={language}
          viewStyle={styles.input}
          placeholder={transfer(language, 'me_settings_PWnew')}
          value={newPassword}
          type={'newPassword'}
          secureTextEntry
          onChange={e => this.onChange(e, 'newPassword')}
          maxLength={common.textInputMaxLenPwd}
          inputTip={transfer(language, 'me_settings_PWreminder')}
        />
        <TextInputPwd
          language={language}
          viewStyle={styles.input}
          placeholder={transfer(language, 'me_settings_PWnewAgain')}
          value={newPasswordAgain}
          type={'newPasswordAgain'}
          newPassword={newPassword}
          newPasswordAgain={newPasswordAgain}
          onChange={e => this.onChange(e, 'newPasswordAgain')}
          maxLength={common.textInputMaxLenPwd}
          inputTip={transfer(language, 'me_settings_PWreminder')}
          secureTextEntry
        />

        <TKButton
          style={styles.confirmBtn}
          onPress={() => this.confirmPress()}
          disabled={updatePasswordVisible}
          caption={transfer(language, 'me_ID_confirm')}
          theme={'gray'}
        />

        <TKSpinner
          isVisible={updatePasswordVisible}
        />
      </ScrollView>
    )
  }
}

function mapStateToProps(state) {
  return {
    oldPassword: state.user.oldPassword,
    newPassword: state.user.newPassword,
    newPasswordAgain: state.user.newPasswordAgain,

    updatePasswordVisible: state.user.updatePasswordVisible,
    updatePasswordResponse: state.user.updatePasswordResponse,
    language: state.system.language,
  }
}

export default connect(
  mapStateToProps,
)(UpdatePassword)
