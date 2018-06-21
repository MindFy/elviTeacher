import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Keyboard,
} from 'react-native'
import { Toast, Overlay } from 'teaset'
import { common } from '../../constants/common'
import TKButton from '../../components/TKButton'
import TKSpinner from '../../components/TKSpinner'
import TKInputItem from '../../components/TKInputItem'
import * as actions from '../../actions/updateBank'
import { findUserUpdate } from '../../actions/user'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import WithdrawAuthorizeCode from '../balance/components/WithdrawAuthorizeCode'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: common.blackColor,
  },
  tipView: {
    marginTop: common.margin5,
    backgroundColor: common.navBgColor,
  },
  tipTitle: {
    marginTop: common.margin10,
    marginLeft: common.margin10,
    color: common.textColor,
    fontSize: common.font12,
  },
  tipDetail: {
    marginTop: common.margin5,
    marginLeft: common.margin10,
    marginRight: common.margin10,
    marginBottom: common.margin10,
    color: common.textColor,
    fontSize: common.font10,
    lineHeight: common.font12,
  },
})

class UpdateBank extends Component {
  static navigationOptions(props) {
    return {
      headerTitle: '银行卡管理',
      headerLeft: (
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
    const { dispatch, user } = this.props
    if (!user) return
    dispatch(actions.updateForm({
      bankName: user.bankName,
      subbankName: user.subbankName,
      bankNo: user.bankNo,
      code: '',
      googleCode: '',
    }))
  }

  componentWillReceiveProps(nextProps) {
    this.handleRequestGetCode(nextProps)
    this.handleRequestUpdateBank(nextProps)
    this.handleRequestCheck2GoogleCode(nextProps)
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(actions.updateForm({ bankName: '', subbankName: '', bankNo: '', code: '' }))
  }

  onChangeText(text, tag) {
    const { dispatch, formState } = this.props
    if (tag === 'bankName') {
      dispatch(actions.updateForm({ ...formState, bankName: text.trim() }))
    } else if (tag === 'subbankName') {
      dispatch(actions.updateForm({ ...formState, subbankName: text.trim() }))
    } else if (tag === 'bankNo') {
      const reg = /^\+?[1-9][0-9]*$/
      if (text === '' || reg.test(text)) {
        dispatch(actions.updateForm({ ...formState, bankNo: text.trim() }))
      }
    } else if (tag === 'code') {
      dispatch(actions.updateForm({ ...formState, code: text.trim() }))
    }
  }

  confirmPress(title) {
    Keyboard.dismiss()

    const { dispatch, formState, navigation, user } = this.props
    if (title === '重新添加') {
      this.editable = true
      dispatch(actions.updateForm({ bankName: '', subbankName: '', bankNo: '', code: '' }))
      return
    }
    if (!formState.bankName.length || formState.bankName.length < 4) {
      Toast.fail('请输入开户银行, 至少四位')
      return
    }
    if (!formState.subbankName.length || formState.subbankName.length < 4) {
      Toast.fail('请输入开户支行名称, 至少四位')
      return
    }
    if (!formState.bankNo.length
      || !common.regBankNo.test(formState.bankNo)
      || !common.regSpace.test(formState.bankNo)) {
      Toast.fail('请输入银行卡号, 16-19位数字')
      return
    }
    if (!navigation.state.params || !user.bankName.length) {
      // 如果第一次绑定银行卡，则不需要二次验证；走法币交易、我的页面进入
      dispatch(actions.requestUpdateBank({
        bankName: formState.bankName,
        subbankName: formState.subbankName,
        bankNo: formState.bankNo,
        code: formState.googleCode,
      }))
    } else {
      this.showAuthCode()
    }
  }

  updateBank() {
    Keyboard.dismiss()
    Overlay.hide(this.overlayViewKeyID)

    const { authCodeType, formState, dispatch } = this.props
    if (authCodeType === '短信验证码') {
      const { code } = formState
      if (!code) {
        Toast.fail('请输入验证码')
        return
      }
      dispatch(actions.requestUpdateBank({
        bankName: formState.bankName,
        subbankName: formState.subbankName,
        bankNo: formState.bankNo,
        code: formState.code,
      }))
    } else {
      if (!formState.googleCode.length) {
        Toast.fail('请输入谷歌验证码')
        return
      }
      dispatch(actions.check2GoogleAuth({ googleCode: formState.googleCode }))
    }
  }

  authCodeChanged = (e, code) => {
    const { dispatch, formState, authCodeType } = this.props
    if (authCodeType === '短信验证码') {
      dispatch(actions.updateForm({
        ...formState,
        code,
      }))
    } else {
      dispatch(actions.updateForm({
        ...formState,
        googleCode: code,
      }))
    }
  }

  segmentValueChanged = (e) => {
    const { dispatch, formState } = this.props
    dispatch(actions.updateAuthCodeType(e.title))

    if (e.title === '谷歌验证码') {
      dispatch(actions.updateForm({
        ...formState,
        code: '',
      }))
    } else {
      dispatch(actions.updateForm({
        ...formState,
        googleCode: '',
      }))
    }
  }

  SMSCodePress = (count) => {
    this.count = count
    const { user, dispatch } = this.props
    dispatch(actions.requestGetCode({ mobile: user.mobile, service: 'auth' }))
  }

  showAuthCode = () => {
    const { dispatch, user, formState } = this.props
    dispatch(actions.updateAuthCodeType('短信验证码'))
    dispatch(actions.updateForm({
      ...formState,
      code: '',
      googleCode: '',
    }))
    const overlayView = (
      <Overlay.View
        style={{ top: '35%' }}
        modal={false}
        overlayOpacity={0}
      >
        <WithdrawAuthorizeCode
          titles={['短信验证码', '谷歌验证码']}
          mobile={user.mobile}
          onChangeText={this.authCodeChanged}
          segmentValueChanged={this.segmentValueChanged}
          smsCodePress={this.SMSCodePress}
          confirmPress={() => this.updateBank()}
          cancelPress={() => Overlay.hide(this.overlayViewKeyID)}
        />
      </Overlay.View>
    )
    this.overlayViewKeyID = Overlay.show(overlayView)
  }

  errors = {
    4000101: '验证码不能为空',
    4000102: '一分钟内不能重复发送验证码',
    4000104: '手机号码已注册',
    4000156: '授权验证失败',
  }

  handleRequestGetCode(nextProps) {
    const { getCodeResult, getCodeError } = nextProps
    if (getCodeResult && (getCodeResult !== this.props.getCodeResult)) {
      Toast.success(getCodeResult.message)
      return
    }
    if (getCodeError && (getCodeError !== this.props.getCodeError)) {
      if (getCodeError.message === common.badNet) {
        Toast.fail('网络连接失败，请稍后重试')
        return
      }
      const msg = this.errors[getCodeError.code]
      if (msg) Toast.fail(msg)
      else Toast.fail('获取验证码失败，请重试')
    }
  }

  userUpdate(nextProps) {
    const { user, formState, dispatch } = nextProps
    const newUser = {
      ...user,
      bankName: formState.bankName,
      subbankName: formState.subbankName,
      bankNo: formState.bankNo,
    }
    dispatch(findUserUpdate(newUser))
  }

  handleRequestUpdateBank(nextProps) {
    const { updateBankResult, updateBankError, navigation } = nextProps
    if (updateBankResult && (updateBankResult !== this.props.updateBankResult)) {
      this.userUpdate(nextProps)
      Toast.success(updateBankResult)
      Overlay.hide(this.overlayViewKey)
      navigation.goBack()
      return
    }
    if (updateBankError && (updateBankError !== this.props.updateBankError)) {
      Overlay.hide(this.overlayViewKey)
      if (updateBankError.message === common.badNet) {
        Toast.fail('网络连接失败，请稍后重试')
        return
      }
      const msg = this.errors[updateBankError.code]
      if (msg) Toast.fail(msg)
      else Toast.fail('银行卡绑定失败，请稍后重试')
    }
  }

  handleRequestCheck2GoogleCode(nextProps) {
    if (!nextProps.googleCodeLoading && this.props.googleCodeLoading) {
      const { googleCodeResponse, dispatch, formState } = nextProps
      if (googleCodeResponse.success) {
        dispatch(actions.requestUpdateBank({
          bankName: formState.bankName,
          subbankName: formState.subbankName,
          bankNo: formState.bankNo,
          googleCode: formState.googleCode,
        }))
      } else {
        const errCode = googleCodeResponse.error.code
        if (errCode === 4000171) {
          Toast.fail('请先绑定谷歌验证码!')
        } else {
          Toast.fail('谷歌验证码错误!')
        }
      }
      dispatch(actions.check2GoogleAuthSetResponse(null))
    }
  }

  renderTip = () => (
    <View style={styles.tipView}>
      <Text style={styles.tipTitle}>
        温馨提示
      </Text>
      <Text style={styles.tipDetail}>
        1、添加的银行卡必须用于法币交易买卖转账，若使用其他银行卡，可能导致交易失败，请谨慎添加！
      </Text>
    </View>
  )

  render() {
    const { loading, formState, navigation, user } = this.props
    let bankName = ''
    if (user) {
      bankName = user.bankName
    }
    const editable = !(navigation.state.params
      && navigation.state.params.fromMe === 'fromMe'
      && bankName.length && !this.editable)

    return (
      <ScrollView
        style={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <TKInputItem
          viewStyle={{
            marginTop: common.margin10,
            borderRadius: 0,
            borderWidth: 0,
          }}
          titleStyle={{
            width: common.h97,
            fontSize: common.font14,
          }}
          title={'开户银行'}
          value={formState.bankName}
          placeholder={'请输入开户银行'}
          onChangeText={e => this.onChangeText(e, 'bankName')}
          editable={editable}
        />

        <TKInputItem
          viewStyle={{
            marginTop: common.margin5,
            borderRadius: 0,
            borderWidth: 0,
          }}
          titleStyle={{
            width: common.h97,
            fontSize: common.font14,
          }}
          title={'开户支行'}
          value={formState.subbankName}
          placeholder={'请输入正确的开户支行名称'}
          onChangeText={e => this.onChangeText(e, 'subbankName')}
          editable={editable}
        />

        <TKInputItem
          viewStyle={{
            marginTop: common.margin5,
            borderRadius: 0,
            borderWidth: 0,
          }}
          titleStyle={{
            width: common.h97,
            fontSize: common.font14,
          }}
          title={'银行卡号'}
          placeholder={'请输入正确的银行卡号'}
          value={formState.bankNo}
          onChangeText={e => this.onChangeText(e, 'bankNo')}
          keyboardType={'numeric'}
          maxLength={common.textInputMaxLenBankNo}
          editable={editable}
        />

        {this.renderTip()}

        <TKButton
          theme={'gray'}
          style={{ marginTop: common.margin20 }}
          caption={editable ? '确认' : '重新添加'}
          onPress={() => {
            const title = editable ? '确认' : '重新添加'
            this.confirmPress(title)
          }}
        />

        <TKSpinner isVisible={loading} />
      </ScrollView>
    )
  }
}

function mapStateToProps(store) {
  return {
    ...store.updateBank,
    user: store.user.user,
    loggedInResult: store.authorize.loggedInResult,
  }
}

export default connect(
  mapStateToProps,
)(UpdateBank)
