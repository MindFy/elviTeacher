import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Image,
  Alert,
  Clipboard,
  ScrollView,
  CameraRoll,
  StyleSheet,
} from 'react-native'
import {
  Toast,
  Overlay,
} from 'teaset'
import FS from 'rn-fs-d3j'
import { common } from '../../constants/common'
import {
  coinSelected,
  toggleForm,
  requestCoinList,
  requestRechargeAddress,
  resetNexus,
} from '../../actions/recharge'
import * as api from '../../services/api'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'

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
  headerRightText: {
    marginRight: common.margin10,
    fontSize: common.font16,
    color: 'white',
  },
  coinSelector: {
    marginTop: common.margin10,
    height: common.h40,
    backgroundColor: common.navBgColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  coin: {
    marginLeft: common.margin10,
    fontSize: common.font14,
    color: common.textColor,
    alignSelf: 'center',
  },
  addressContainer: {
    marginTop: common.margin10,
    height: common.h97,
    backgroundColor: common.navBgColor,
    justifyContent: 'space-between',
  },
  addressTip: {
    marginLeft: common.margin10,
    marginTop: common.margin10,
    fontSize: common.font12,
    color: common.placeholderColor,
  },
  address: {
    marginLeft: common.margin10,
    marginTop: common.margin15,
    fontSize: common.font14,
    color: common.textColor,
  },
  btnsContainer: {
    flexDirection: 'row',
    marginBottom: common.margin10,
  },
  copyAddressBtn: {
    marginLeft: common.margin10,
    color: common.btnTextColor,
    fontSize: common.font14,
  },
  qrBtn: {
    marginLeft: common.margin10,
    color: common.btnTextColor,
    fontSize: common.font14,
  },
  tip: {
    marginTop: common.margin10,
    marginLeft: common.margin10,
    marginRight: common.margin10,
    color: common.textColor,
    fontSize: common.font12,
    lineHeight: common.h15,
  },
  qrContainer: {
    backgroundColor: '#fff',
    top: -common.w40,
    borderRadius: common.radius6,
    height: 2 * common.h100,
    width: 2 * common.h100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrRecharge: {
    position: 'absolute',
    top: common.margin10,
    fontSize: common.font14,
    color: common.blackColor,
  },
  qrImage: {
    height: common.h100,
    width: common.h100,
    alignSelf: 'center',
  },
})

class Recharge extends Component {
  static navigationOptions(props) {
    return {
      headerTitle: '充值',
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
      headerRight: (
        <NextTouchableOpacity
          activeOpacity={common.activeOpacity}
          onPress={() => props.navigation.navigate('History')}
        >
          <Text
            style={styles.headerRightText}
          >历史记录</Text>
        </NextTouchableOpacity>
      ),
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(resetNexus())
  }

  clipPress = (rechargeAddress) => {
    if (rechargeAddress) {
      Clipboard.setString(rechargeAddress)
      Toast.success('已复制到剪贴板')
    }
  }

  showAlert() {
    Alert.alert(
      '无法保存',
      '请在设置中,为本应用开放相册权限',
      [{
        text: '好',
        onPress: () => { },
      }],
      { cancelable: false },
    )
  }

  _saveImageToCameraRoll = (rechargeAddress, qrApi) => {
    if (rechargeAddress.length === 0) {
      return
    }
    const uri = `${qrApi}${rechargeAddress}`
    if (common.IsIOS) {
      CameraRoll.saveToCameraRoll(uri).then(() => {
        Overlay.hide(this.overlayViewKey)
        Toast.success('保存成功')
      }).catch((error) => {
        Overlay.hide(this.overlayViewKey)
        if (error.code === 'E_UNABLE_TO_SAVE') {
          this.showAlert()
        } else {
          Toast.fail('保存失败')
        }
      })
    } else {
      FS.downloadOlineImage({
        uri,
      }, (r) => {
        Overlay.hide(this.overlayViewKey)
        if (r.result) {
          Toast.success('保存成功')
        } else if (r.error === '保存出错') {
          this.showAlert()
        } else {
          Toast.fail('保存失败')
        }
      })
    }
  }

  qrPress = (rechargeAddress, coinName, qrApi) => {
    const overlayView = (
      <Overlay.View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
        modal={false}
        overlayOpacity={0}
      >
        <View style={styles.qrContainer}>
          <Text style={styles.qrRecharge}>{`${coinName}充值地址`}</Text>
          <Image
            style={styles.qrImage}
            source={{ uri: `${qrApi}${rechargeAddress}` }}
          />
          <NextTouchableOpacity
            style={{
              position: 'absolute',
              bottom: common.margin10,
            }}
            activeOpacity={common.activeOpacity}
            onPress={() => {
              // 保存图片
              this._saveImageToCameraRoll(rechargeAddress, qrApi)
            }}
          >
            <Text
              style={{
                fontSize: common.font14,
                color: common.btnTextColor,
              }}
            >保存二维码</Text>
          </NextTouchableOpacity>
        </View>
      </Overlay.View>
    )
    this.overlayViewKey = Overlay.show(overlayView)
  }

  showForm = () => {
    const { dispatch, user } = this.props
    dispatch(toggleForm())
    dispatch(requestCoinList(user.id))
  }

  tapCoinListCell = (ele) => {
    const {
      dispatch,
    } = this.props
    dispatch(toggleForm())
    dispatch(coinSelected(ele))
    if (this.canRechargeAddress.includes(ele.name)) {
      dispatch(requestRechargeAddress({
        token_ids: [ele.id],
      }))
    }
  }

  canRechargeAddress = ['BTC', 'ETH', 'ETC', 'LTC']

  renderCoinSelector = (currCoin, listToggled, showForm) => {
    const arrow = listToggled ? (
      <Image
        style={{ marginRight: common.margin10, width: common.h20, height: common.w10 }}
        source={require('../../assets/arrow_down.png')}
      />
    ) : (
      <Image
        style={{ marginRight: common.margin10, height: common.h20, width: common.w10 }}
        source={require('../../assets/arrow_right.png')}
      />
    )
    return (
      <NextTouchableOpacity
        activeOpacity={common.activeOpacity}
        onPress={() => {
          if (showForm) {
            showForm()
          }
        }}
      >
        <View style={styles.coinSelector}>
          <Text style={styles.coin}>{currCoin.name}</Text>
          <View style={{ alignSelf: 'center' }}>
            {arrow}
          </View>
        </View>
      </NextTouchableOpacity>
    )
  }

  renderCoinList = (coinList, listToggled, tapCoinListCell) => {
    if (!listToggled) return null
    const coinListView = coinList.map(ele => (
      <NextTouchableOpacity
        key={ele.id}
        activeOpacity={common.activeOpacity}
        onPress={() => {
          if (tapCoinListCell) {
            tapCoinListCell(ele)
          }
        }}
      >
        <View
          style={{
            marginTop: common.margin5,
            height: common.h40,
            backgroundColor: common.navBgColor,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              marginLeft: common.margin10,
              fontSize: common.font14,
              color: common.textColor,
              alignSelf: 'center',
            }}
          >{ele.name}</Text>
        </View>
      </NextTouchableOpacity>
    ))
    return coinListView
  }

  renderTip = tokenName => (
    <View>
      <Text style={styles.tip}>温馨提示:</Text>
      <Text style={styles.tip}>{`1. 请勿向上述地址充值任何非${tokenName}资产，否则资产将不可找回。
2. 您充值至上述地址后，需要整个网络节点的确认，1次网络确认后到账，6次网络确认后可提币。
3. 最小充值金额：0.00000001 ${tokenName}，小于最小金额的充值将不会上账。
4. 您的充值地址不会经常改变，可以重复充值；如有更改，我们会尽量通过网站公告或邮件通知您。
5. 请务必确认电脑及浏览器安全，防止信息被篡改或泄露。`}</Text>
    </View>
  )

  renderRechargeAddress = (rechargeAddress, coinName, qrApi) => {
    const addressContent = (
      <View>
        <Text style={styles.addressTip}>充值地址</Text>
        <Text style={styles.address}>{rechargeAddress}</Text>
      </View>
    )
    const isHide = rechargeAddress === '暂无可充值地址'
    const addressBtn = !isHide && (
      <View>
        <View style={styles.btnsContainer}>
          <NextTouchableOpacity
            activeOpacity={common.activeOpacity}
            onPress={() => this.clipPress(rechargeAddress)}
          >
            <Text style={styles.copyAddressBtn}>复制地址</Text>
          </NextTouchableOpacity>
          <NextTouchableOpacity
            activeOpacity={common.activeOpacity}
            onPress={() => this.qrPress(rechargeAddress, coinName, qrApi)}
          >
            <Text style={styles.copyAddressBtn}>显示二维码</Text>
          </NextTouchableOpacity>
        </View>
      </View>
    )
    return (
      <View style={styles.addressContainer}>
        {addressContent}
        {addressBtn}
      </View>
    )
  }

  render() {
    const { currCoin, listToggled, coinList, rechargeAddress } = this.props
    const coinSelector = this.renderCoinSelector(currCoin, listToggled, this.showForm)
    const coinListView = this.renderCoinList(coinList, listToggled, this.tapCoinListCell)
    const ishasAddress =
      rechargeAddress &&
      this.canRechargeAddress.includes(currCoin.name) &&
      rechargeAddress[currCoin.id] &&
      !listToggled

    const rechargeAddressView =
      ishasAddress &&
      this.renderRechargeAddress(
        rechargeAddress[currCoin.id].rechargeaddr, currCoin.name, api.qrApi,
      )
    const tipView = ishasAddress && this.renderTip(currCoin.name)

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: common.bgColor,
        }}
        behavior="padding"
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          {coinSelector}
          {coinListView}
          {rechargeAddressView}
          {tipView}
        </ScrollView>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state.recharge,
    user: state.user.user,
  }
}

export default connect(
  mapStateToProps,
)(Recharge)
