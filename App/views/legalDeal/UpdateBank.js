import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import {
  Toast,
  Overlay,
} from 'teaset'
import {
  common,
} from '../../constants/common'
import TextInputUpdateBank from './TextInputUpdateBank'
import TKButtonGetVerificateCode from '../../components/TKButtonGetVerificateCode'
import actions from '../../actions/index'

class UpdateBank extends Component {
  static navigationOptions(props) {
    return {
      headerTitle: '银行卡管理',
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
    this.showUpdateBankResponse = false
    this.showGetVerificateCodeResponse = false
  }

  componentWillUnmount() {
    const { dispatch, mobile, password, passwordAgain } = this.props
    dispatch(actions.registerUpdate({ mobile, code: '', password, passwordAgain }))
  }

  onChange(event, tag) {
    const { text } = event.nativeEvent
    const { dispatch, bankName, subbankName, bankNo,
      mobile, password, passwordAgain } = this.props
    switch (tag) {
      case 'bankName':
        dispatch(actions.updateBankUpdate({ bankName: text, subbankName, bankNo }))
        break
      case 'subbankName':
        dispatch(actions.updateBankUpdate({ bankName, subbankName: text, bankNo }))
        break
      case 'bankNo':
        dispatch(actions.updateBankUpdate({ bankName, subbankName, bankNo: text }))
        break
      case 'code':
        dispatch(actions.registerUpdate({ mobile, code: text, password, passwordAgain }))
        break
      default:
        break
    }
  }

  confirmPress() {
    const { bankName, subbankName, bankNo } = this.props
    if (!bankName.length) {
      Toast.message('请输入开户银行')
      return
    }
    if (!subbankName.length) {
      Toast.message('请输入开户支行名称')
      return
    }
    if (!bankNo.length) {
      Toast.message('请输入银行卡号')
      return
    }
    if (bankNo.length < 16) {
      Toast.message('请输入正确的银行卡号')
      return
    }
    this.showOverlay()
  }

  updateBank() {
    const { dispatch, bankName, subbankName, bankNo, code } = this.props
    dispatch(actions.updateBank({
      bankName,
      subbankName,
      bankNo,
      code,
    }))
  }

  codePress(count) {
    const { dispatch, user } = this.props
    count()
    dispatch(actions.getVerificateCode({
      mobile: user.mobile,
      service: 'auth',
    }))
  }

  checkVerificateCodePress() {
    const { dispatch, user, code } = this.props
    dispatch(actions.checkVerificateCode({
      mobile: user.mobile,
      service: 'auth',
      code,
    }))
  }

  showOverlay() {
    const { user, code } = this.props
    this.overlayView = (
      <Overlay.View
        style={{
          justifyContent: 'center',
        }}
        modal={false}
        overlayOpacity={0}
      >
        <View
          style={{
            backgroundColor: '#fff',
            marginLeft: common.margin48,
            marginRight: common.margin48,
            height: common.h154,
          }}
        >
          <View
            style={{
              marginTop: common.margin20,
              marginLeft: common.margin20,
              marginRight: common.margin20,
              flexDirection: 'row',
            }}
          >
            <Text
              style={{
                color: common.blackColor,
                fontSize: common.font12,
                width: '40%',
              }}
            >手机号</Text>
            <Text
              style={{
                color: common.blackColor,
                fontSize: common.font12,
                width: '50%',
              }}
            >{user.mobile}</Text>
          </View>

          <View
            style={{
              marginTop: common.margin10,
              marginLeft: common.margin20,
              marginRight: common.margin20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                color: common.blackColor,
                fontSize: common.font12,
                alignSelf: 'center',
                width: '40%',
              }}
            >短信验证码</Text>
            <View
              style={{
                borderColor: common.placeholderColor,
                borderWidth: 1,
                height: common.h30,
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '60%',
              }}
            >
              <TextInput
                style={{
                  marginLeft: common.margin5,
                  color: common.blackColor,
                  fontSize: common.font12,
                  width: '50%',
                }}
                maxLength={6}
                value={code}
                onChange={e => this.onChange(e, 'code')}
                keyboardType={'number-pad'}
              />
              <TKButtonGetVerificateCode
                onPress={count => this.codePress(count)}
              />
            </View>
          </View>

          <View
            style={{
              left: common.margin20,
              bottom: common.margin20,
              right: common.margin20,
              position: 'absolute',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity
              style={{
                width: common.h70,
                height: common.h30,
                backgroundColor: common.btnTextColor,
                justifyContent: 'center',
              }}
              activeOpacity={common.activeOpacity}
              onPress={() => this.checkVerificateCodePress()}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: common.font12,
                  alignSelf: 'center',
                }}
              >确定</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: common.h70,
                height: common.h30,
                borderColor: common.placeholderColor,
                borderWidth: 1,
                justifyContent: 'center',
              }}
              activeOpacity={common.activeOpacity}
              onPress={() => {
                Overlay.hide(this.overlayView)
              }}
            >
              <Text
                style={{
                  color: common.blackColor,
                  fontSize: common.font12,
                  alignSelf: 'center',
                }}
              >取消</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Overlay.View>
    )
    Overlay.show(this.overlayView)
  }

  handleUpdateBankRequest() {
    const { navigation, updateBankVisible, updateBankResponse } = this.props
    if (!updateBankVisible && !this.showUpdateBankResponse) return

    if (updateBankVisible) {
      this.showUpdateBankResponse = true
    } else {
      this.showUpdateBankResponse = false
      if (updateBankResponse.success) {
        Toast.success(updateBankResponse.result)
        Overlay.hide(this.overlayView)
        navigation.goBack()
      } else {
        Toast.fail(updateBankResponse.error.message)
        if (updateBankResponse.error.code === 4000156) {
          this.showOverlay()
        }
      }
    }
  }

  handleCheckVerificateCodeRequest() {
    const { checkVerificateCodeVisible, checkVerificateCodeResponse, navigation } = this.props
    if (!checkVerificateCodeVisible && !this.showCheckVerificateCodeResponse) return

    if (checkVerificateCodeVisible) {
      this.showCheckVerificateCodeResponse = true
    } else {
      this.showCheckVerificateCodeResponse = false
      if (checkVerificateCodeResponse.success) {
        this.updateBank()
      } else {
        Toast.fail(checkVerificateCodeResponse.error.message)
      }
    }
  }

  handleGetVerificateCodeRequest() {
    const { getVerificateCodeVisible, getVerificateCodeResponse } = this.props
    if (!getVerificateCodeVisible && !this.showGetVerificateCodeResponse) return

    if (getVerificateCodeVisible) {
      this.showGetVerificateCodeResponse = true
    } else {
      this.showGetVerificateCodeResponse = false
      if (getVerificateCodeResponse.success) {
        Toast.success(getVerificateCodeResponse.result.message)
      } else {
        Toast.message(getVerificateCodeResponse.error.message)
      }
    }
  }

  render() {
    const { bankName, subbankName, bankNo } = this.props
    this.handleUpdateBankRequest()
    this.handleGetVerificateCodeRequest()
    this.handleCheckVerificateCodeRequest()

    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: common.blackColor,
        }}
      >
        <TextInputUpdateBank
          viewStyle={{
            marginTop: common.margin10,
          }}
          title={'开户银行'}
          placeholder={'请输入开户银行'}
          value={bankName}
          onChange={e => this.onChange(e, 'bankName')}
        />
        <TextInputUpdateBank
          title={'开户支行'}
          placeholder={'请输入正确的开户支行名称'}
          value={subbankName}
          onChange={e => this.onChange(e, 'subbankName')}
        />
        <TextInputUpdateBank
          title={'银行卡号'}
          placeholder={'请输入正确的银行卡号'}
          value={bankNo}
          onChange={e => this.onChange(e, 'bankNo')}
          keyboardType={'numbers-and-punctuation'}
          maxLength={common.textInputMaxLenBankNo}
        />

        <View
          style={{
            marginTop: common.margin5,
            backgroundColor: common.navBgColor,
          }}
        >
          <Text
            style={{
              marginTop: common.margin10,
              marginLeft: common.margin10,
              color: common.textColor,
              fontSize: common.font12,
            }}
          >温馨提示</Text>
          <Text
            style={{
              marginTop: common.margin5,
              marginLeft: common.margin10,
              marginRight: common.margin10,
              marginBottom: common.margin10,
              color: common.textColor,
              fontSize: common.font10,
              lineHeight: common.font12,
            }}
          >1、添加的银行卡必须用于法币交易买卖转账，若使用其他银行卡，可能导致交易失败，请谨慎添加！</Text>
        </View>

        <TouchableOpacity
          activeOpacity={common.activeOpacity}
          style={{
            marginTop: common.margin20,
            marginLeft: common.margin10,
            marginRight: common.margin10,
            backgroundColor: common.navBgColor,
            height: common.h40,
            justifyContent: 'center',
          }}
          onPress={() => this.confirmPress()}
        >
          <Text
            style={{
              color: common.btnTextColor,
              fontSize: common.font14,
              alignSelf: 'center',
            }}
          >确认</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}

function mapStateToProps(store) {
  return {
    bankName: store.user.bankName,
    subbankName: store.user.subbankName,
    bankNo: store.user.bankNo,
    user: store.user.user,
    mobile: store.user.mobileRegister,
    code: store.user.codeRegister,
    password: store.user.passwordRegister,
    passwordAgain: store.user.passwordAgainRegister,

    updateBankVisible: store.user.updateBankVisible,
    updateBankResponse: store.user.updateBankResponse,

    getVerificateCodeVisible: store.user.getVerificateCodeVisible,
    getVerificateCodeResponse: store.user.getVerificateCodeResponse,

    checkVerificateCodeVisible: store.user.checkVerificateCodeVisible,
    checkVerificateCodeResponse: store.user.checkVerificateCodeResponse,
  }
}

export default connect(
  mapStateToProps,
)(UpdateBank)
