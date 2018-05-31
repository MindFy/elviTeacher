import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native'
import {
  Toast,
  Overlay,
} from 'teaset'
import { common } from '../../constants/common'
import actions from '../../actions/index'
import schemas from '../../schemas/index'
import TKViewCheckAuthorize from '../../components/TKViewCheckAuthorize'
import TKButton from '../../components/TKButton'
import TKInputItem from '../../components/TKInputItem'
import TKSpinner from '../../components/TKSpinner'

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
      headerLeft: (
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

    if (!withdrawaddr.length) {
      Toast.message('请填写提币地址')
      return
    }
    // if (!validate(withdrawaddr, SUPPORTED_CURRENCIES.ethereum)
    //   && !validate(withdrawaddr, SUPPORTED_CURRENCIES.bitcoin)) {
    //   Toast.message('请填写正确的提币地址')
    //   return
    // }
    if (!remark.length) {
      Toast.message('请填写备注')
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
    const { dispatch, user } = this.props
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
          onChange={e => this.onChange(e, 'codeAuth')}
          codePress={(count) => {
            this.authCount = count
            dispatch(actions.getVerificateCode({ mobile: user.mobile, service: 'auth' }))
          }}
          confirmPress={() => this.addPress()}
          cancelPress={() => Overlay.hide(this.overlayViewKey)}
        />
      </Overlay.View>
    )
    this.overlayViewKey = Overlay.show(overlayView)
  }

  errors = {
    4000101: '手机号码或服务类型错误',
    4000102: '一分钟内不能重复发送验证码',
    4000104: '手机号码已注册',
  }

  handleGetVerificateCodeRequest(nextProps) {
    const { getVerificateCodeVisible, getVerificateCodeResponse } = nextProps

    if (getVerificateCodeVisible !== this.props.getVerificateCodeVisible) {
      if (getVerificateCodeResponse.success) {
        this.authCount()
        Toast.success(getVerificateCodeResponse.result.message, 2000, 'top')
      } else if (getVerificateCodeResponse.error.message === common.badNet) {
        Toast.fail('网络连接失败，请稍后重试')
      } else {
        const msg = this.errors[getVerificateCodeResponse.error.code]
        if (msg) Toast.fail(msg)
        else Toast.fail('获取验证码失败，请重试')
      }
    }
  }

  render() {
    const { selectedToken, remark, withdrawaddr, addVisible } = this.props
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: common.bgColor,
        }}
      >
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

          <TKInputItem
            viewStyle={{
              marginTop: common.margin10,
              marginLeft: common.margin10,
              marginRight: common.margin10,
            }}
            inputStyle={{
              fontSize: common.font14,
            }}
            placeholder="地址"
            value={withdrawaddr}
            onChange={e => this.onChange(e, 'withdrawaddr')}
          />

          <TKInputItem
            viewStyle={{
              marginTop: common.margin10,
              marginLeft: common.margin10,
              marginRight: common.margin10,
            }}
            inputStyle={{
              fontSize: common.font14,
            }}
            placeholder="备注"
            value={remark}
            onChange={e => this.onChange(e, 'remark')}
          />

          <TKButton
            style={{ marginTop: common.margin40 }}
            onPress={() => this.confirmPress()}
            caption={'添加'}
            theme={'gray'}
          />
        </ScrollView>

        <TKSpinner
          isVisible={addVisible}
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
