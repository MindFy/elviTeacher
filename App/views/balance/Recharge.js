import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Image,
  Clipboard,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  CameraRoll,
} from 'react-native'
import {
  Toast,
  Overlay,
} from 'teaset'
import { common } from '../../constants/common'
import SelectToken from './SelectToken'
import actions from '../../actions/index'

class Recharge extends Component {
  static navigationOptions(props) {
    return {
      headerTitle: '充值',
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
      headerRight:
        (
          <TouchableOpacity
            activeOpacity={common.activeOpacity}
            onPress={() => props.navigation.navigate('History')}
          >
            <Text
              style={{
                marginRight: common.margin10,
                fontSize: common.font16,
                color: 'white',
              }}
            >历史记录</Text>
          </TouchableOpacity>
        ),
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(actions.selectTokenUpdate({
      selectedToken: common.selectedTokenDefault,
      tokenListSelected: false,
      selectedIndex: undefined,
    }))
  }

  clipPress() {
    const { selectedToken } = this.props
    if (selectedToken.rechargeaddr.length) {
      Clipboard.setString(selectedToken.rechargeaddr)
      Toast.message('已复制到剪贴板')
    }
  }

  _saveImageToCameraRoll() {
    const { selectedToken, qrApi } = this.props
    if (selectedToken.rechargeaddr.length === 0) {
      return
    }
    const uri = `${qrApi}${selectedToken.rechargeaddr}`
    CameraRoll.saveToCameraRoll(uri).then(() => {
      Toast.message('保存成功')
      Overlay.hide(this.overlayViewKey)
    }).catch(() => {
      Toast.message('保存失败')
      Overlay.hide(this.overlayViewKey)
    })
  }

  qrPress() {
    const { selectedToken, qrApi } = this.props
    const overlayView = (
      <Overlay.View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
        modal={false}
        overlayOpacity={0}
      >
        <View
          style={{
            backgroundColor: '#fff',
            top: -common.w40,
            borderRadius: common.radius6,
            height: 2 * common.h100,
            width: 2 * common.h100,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              position: 'absolute',
              top: common.margin10,
              fontSize: common.font14,
              color: common.blackColor,
            }}
          >{`${selectedToken.token.name}充值地址`}</Text>
          {
            selectedToken.rechargeaddr.length ?
              <Image
                style={{
                  height: common.h100,
                  width: common.h100,
                  alignSelf: 'center',
                }}
                source={{ uri: `${qrApi}${selectedToken.rechargeaddr}` }}
              /> : null
          }
          {
            selectedToken.rechargeaddr.length ?
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  bottom: common.margin10,
                }}
                activeOpacity={common.activeOpacity}
                onPress={() => {
                  // 保存图片
                  this._saveImageToCameraRoll()
                }}
              >
                <Text
                  style={{
                    fontSize: common.font14,
                    color: common.btnTextColor,
                  }}
                >保存二维码</Text>
              </TouchableOpacity> : null
          }
        </View>
      </Overlay.View>
    )
    this.overlayViewKey = Overlay.show(overlayView)
  }

  renderBottomCell() {
    const { selectedToken } = this.props
    if ((selectedToken !== common.selectedTokenDefault
      && selectedToken.token.id === 2)
    || (selectedToken !== common.selectedTokenDefault
      && selectedToken.token.id === 5)
    || (selectedToken !== common.selectedTokenDefault
      && selectedToken.token.id === 6)
    || (selectedToken !== common.selectedTokenDefault
      && selectedToken.token.id === 7)) {
      return (
        <View>
          <View
            style={{
              marginTop: common.margin10,
              height: common.h97,
              backgroundColor: common.navBgColor,
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                marginLeft: common.margin10,
                marginTop: common.margin10,
                fontSize: common.font12,
                color: common.placeholderColor,
              }}
            >充值地址</Text>
            <Text
              style={{
                marginLeft: common.margin10,
                fontSize: common.font14,
                color: common.textColor,
              }}
            >{selectedToken.rechargeaddr}</Text>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: common.margin10,
              }}
            >
              <TouchableOpacity
                activeOpacity={common.activeOpacity}
                onPress={() => this.clipPress()}
              >
                <Text
                  style={{
                    marginLeft: common.margin10,
                    color: common.btnTextColor,
                    fontSize: common.font14,
                  }}
                >复制地址</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={common.activeOpacity}
                onPress={() => this.qrPress()}
              >
                <Text
                  style={{
                    marginLeft: common.margin10,
                    color: common.btnTextColor,
                    fontSize: common.font14,
                  }}
                >显示二维码</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text
            style={{
              marginTop: common.margin10,
              marginLeft: common.margin10,
              marginRight: common.margin10,
              color: common.textColor,
              fontSize: common.font12,
              lineHeight: common.h15,
            }}
          >温馨提示:</Text>
          <Text
            style={{
              marginTop: common.margin10,
              marginLeft: common.margin10,
              marginRight: common.margin10,
              color: common.textColor,
              fontSize: common.font10,
              lineHeight: common.h15,
            }}
          >{`1. 请勿向上述地址充值任何非BTC资产，否则资产将不可找回。
2. 您充值至上述地址后，需要整个网络节点的确认，1次网络确认后到账，6次网络确认后可提币。
3. 最小充值金额：0.00000001 ${selectedToken.token.name}，小于最小金额的充值将不会上账。
4. 您的充值地址不会经常改变，可以重复充值；如有更改，我们会尽量通过网站公告或邮件通知您。
5. 请务必确认电脑及浏览器安全，防止信息被篡改或泄露。`}</Text>
        </View>
      )
    }
    return null
  }
  render() {
    const { dispatch, selectedToken, tokenListSelected } = this.props
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
          <SelectToken
            selectedToken={selectedToken}
            tokenListSelected={tokenListSelected}
            dispatch={dispatch}
            selectedTokenBlock={() => { }}
          />

          {this.renderBottomCell()}
        </ScrollView>
      </View>
    )
  }
}

function mapStateToProps(store) {
  return {
    asset: store.asset.asset,
    createAddress: store.asset.createAddress,

    qrApi: store.payment.qrApi,

    selectedToken: store.address.selectedToken,
    tokenListSelected: store.address.tokenListSelected,
  }
}

export default connect(
  mapStateToProps,
)(Recharge)
