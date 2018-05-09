import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Image,
  TextInput,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native'
import {
  Toast,
  Overlay,
} from 'teaset'
import Spinner from 'react-native-spinkit'
import { common } from '../../constants/common'
import actions from '../../actions/index'
import schemas from '../../schemas/index'
import TKViewCheckAuthorize from '../../components/TKViewCheckAuthorize'

class AddAddress extends Component {
  static navigationOptions(props) {
    return {
      headerTitle: '添加地址',
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
              source={require('../../assets/下拉copy.png')}
            />
          </TouchableOpacity>
        ),
    }
  }
  constructor() {
    super()
    this.showGetVerificateCodeResponse = false
  }

  componentDidMount() {
    const { navigation, dispatch, user } = this.props
    this.listener = DeviceEventEmitter.addListener(common.noti.addAddress, () => {
      navigation.goBack()
      Overlay.hide(this.overlayViewKey)
      dispatch(actions.addUpdate({ remark: '', withdrawaddr: '' }))
      dispatch(actions.findAddress(schemas.findAddress(user.id)))
    })
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(actions.codeAuthUpdate({ codeAuth: '' }))
    this.listener.remove()
  }

  onChange(event, tag) {
    const { text } = event.nativeEvent
    const { dispatch, remark, withdrawaddr } = this.props

    if (tag === 'remark') {
      dispatch(actions.addUpdate({ remark: text, withdrawaddr }))
    } else if (tag === 'withdrawaddr') {
      dispatch(actions.addUpdate({ remark, withdrawaddr: text }))
    } else if (tag === 'codeAuth') {
      dispatch(actions.codeAuthUpdate({ codeAuth: text }))
    }
  }

  confirmPress() {
    const { remark, withdrawaddr } = this.props
    if (!remark.length) {
      Toast.message('请填写备注')
      return
    }
    if (!withdrawaddr.length) {
      Toast.message('请填写提币地址')
      return
    }
    this.showOverlay()
  }

  addPress() {
    const { dispatch, remark, withdrawaddr, selectedToken, codeAuth } = this.props
    dispatch(
      actions.add({ token_id: selectedToken.token.id, withdrawaddr, remark, code: codeAuth }))
  }

  showOverlay() {
    const { dispatch, user, codeAuth } = this.props
    const overlayView = (
      <Overlay.View
        style={{
          justifyContent: 'center',
        }}
        modal={false}
        overlayOpacity={0}
      >
        <TKViewCheckAuthorize
          mobile={user.mobile}
          code={codeAuth}
          onChange={e => this.onChange(e, 'codeAuth')}
          codePress={(count) => {
            this.count = count
            dispatch(actions.getVerificateCode({ mobile: user.mobile, service: 'auth' }))
          }}
          confirmPress={() => this.addPress()}
          cancelPress={() => Overlay.hide(this.overlayViewKey)}
        />
      </Overlay.View>
    )
    this.overlayViewKey = Overlay.show(overlayView)
  }

  handleGetVerificateCodeRequest() {
    const { getVerificateCodeVisible, getVerificateCodeResponse } = this.props
    if (!getVerificateCodeVisible && !this.showGetVerificateCodeResponse) return

    if (getVerificateCodeVisible) {
      this.showGetVerificateCodeResponse = true
    } else {
      this.showGetVerificateCodeResponse = false
      if (getVerificateCodeResponse.success) {
        this.count()
        Toast.success(getVerificateCodeResponse.result.message, 2000, 'top')
      } else if (getVerificateCodeResponse.error.code === 4000101) {
        Toast.fail('手机号码或服务类型错误')
      } else if (getVerificateCodeResponse.error.code === 4000102) {
        Toast.fail('一分钟内不能重复发送验证码')
      } else if (getVerificateCodeResponse.error.code === 4000104) {
        Toast.fail('手机号码已注册')
      } else if (getVerificateCodeResponse.error.message === common.badNet) {
        Toast.fail('网络连接失败，请稍后重试')
      } else {
        Toast.fail('获取验证码失败，请重试')
      }
    }
  }

  render() {
    const { selectedToken, remark, withdrawaddr, addVisible } = this.props
    this.handleGetVerificateCodeRequest()
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: common.bgColor,
        }}
      >
        <StatusBar
          barStyle={'light-content'}
        />
        <ScrollView>
          <View
            style={{
              marginTop: common.margin10,
              marginLeft: common.margin10,
              marginRight: common.margin10,
              height: common.h40,
              borderWidth: 1,
              borderRadius: 1,
              borderColor: common.borderColor,
              backgroundColor: common.navBgColor,
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                marginLeft: common.margin10,
                fontSize: common.font14,
                color: common.textColor,
              }}
            >{selectedToken.token.name}</Text>
          </View>

          <View
            style={{
              marginTop: common.margin10,
              marginLeft: common.margin10,
              marginRight: common.margin10,
              height: common.h40,
              borderWidth: 1,
              borderRadius: 1,
              borderColor: common.borderColor,
              backgroundColor: common.navBgColor,
              justifyContent: 'center',
            }}
          >
            <TextInput
              style={{
                marginLeft: common.margin10,
                fontSize: common.font14,
                color: 'white',
              }}
              placeholder="备注"
              placeholderTextColor={common.placeholderColor}
              value={remark}
              onChange={e => this.onChange(e, 'remark')}
            />
          </View>
          <View
            style={{
              marginTop: common.margin10,
              marginLeft: common.margin10,
              marginRight: common.margin10,
              height: common.h40,
              borderWidth: 1,
              borderRadius: 1,
              borderColor: common.borderColor,
              backgroundColor: common.navBgColor,
              justifyContent: 'center',
            }}
          >
            <TextInput
              style={{
                marginLeft: common.margin10,
                fontSize: common.font14,
                color: 'white',
              }}
              placeholder="地址"
              placeholderTextColor={common.placeholderColor}
              value={withdrawaddr}
              onChange={e => this.onChange(e, 'withdrawaddr')}
            />
          </View>

          <TouchableOpacity
            activeOpacity={common.activeOpacity}
            onPress={() => this.confirmPress()}
          >
            <View
              style={{
                marginTop: common.margin40,
                marginLeft: common.margin10,
                marginRight: common.margin10,
                height: common.h40,
                borderWidth: 1,
                borderRadius: 1,
                borderColor: common.borderColor,
                backgroundColor: common.navBgColor,
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  color: common.btnTextColor,
                  fontSize: common.font16,
                  alignSelf: 'center',
                }}
              >确认</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>

        <Spinner
          style={{
            position: 'absolute',
            alignSelf: 'center',
            marginTop: common.sh / 2 - common.h50 / 2 - 64,
          }}
          isVisible={addVisible}
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
    getVerificateCodeVisible: store.user.getVerificateCodeVisible,
    getVerificateCodeResponse: store.user.getVerificateCodeResponse,

    codeAuth: store.ui.codeAuth,

    remark: store.address.remark,
    addVisible: store.address.addVisible,
    withdrawaddr: store.address.withdrawaddr,
    selectedToken: store.address.selectedToken,
  }
}

export default connect(
  mapStateToProps,
)(AddAddress)
