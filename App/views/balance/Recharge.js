import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Image,
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
import transfer from '../../localization/utils'
import Alert from '../../components/Alert'
import actions from '../../actions/index'
import cache from '../../utils/cache';

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
    let title = ''
    let right = ''
    if (props.navigation.state.params) {
      title = props.navigation.state.params.title
      right = props.navigation.state.params.right
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
      headerRight: (
        <NextTouchableOpacity
          activeOpacity={common.activeOpacity}
          onPress={() => props.navigation.navigate('History')}
        >
          <Text
            style={styles.headerRightText}
          >{right}</Text>
        </NextTouchableOpacity>
      ),
    }
  }

  componentWillMount() {
    const { navigation } = this.props
    const params = navigation.state.params
    if (!params || !params.hideShowForm) {
      this.showForm()
    }
  }

  componentDidMount() {
    const { navigation, language, dispatch, loggedIn } = this.props
    navigation.setParams({
      title: transfer(language, 'home_deposit'),
      right: transfer(language, 'recharge_historyList'),
    })
    if(loggedIn) dispatch(actions.sync())
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(resetNexus())
  }

  clipPress = (rechargeAddress) => {
    const { language } = this.props
    if (rechargeAddress) {
      Clipboard.setString(rechargeAddress)
      Toast.success(transfer(language, 'deposit_copied'))
    }
  }

  showAlert() {
    const { language } = this.props
    Alert.alert(
      transfer(language, 'deposit_save_QR_code_failed'),
      transfer(language, 'deposit_save_QR_code_error'),
      [{
        text: transfer(language, 'deposit_ok'),
        onPress: () => { },
      }],
    )
  }

  _saveImageToCameraRoll = (rechargeAddress, qrApi) => {
    if (rechargeAddress.length === 0) {
      return
    }
    const { language } = this.props
    const uri = `${qrApi}${rechargeAddress}`
    if (common.IsIOS) {
      CameraRoll.saveToCameraRoll(uri).then(() => {
        Overlay.hide(this.overlayViewKey)
        Toast.success(transfer(language, 'deposit_save_QR_code_succeed'))
      }).catch((error) => {
        Overlay.hide(this.overlayViewKey)
        if (error.code === 'E_UNABLE_TO_SAVE') {
          this.showAlert()
        } else {
          Toast.fail(transfer(language, 'deposit_save_QR_code_failed'))
        }
      })
    } else {
      FS.downloadOlineImage({
        uri,
      }, (r) => {
        Overlay.hide(this.overlayViewKey)
        if (r.result) {
          Toast.success(transfer(language, 'deposit_save_QR_code_succeed'))
        } else if (r.error === '保存出错') {
          this.showAlert()
        } else {
          Toast.fail(transfer(language, 'deposit_save_QR_code_failed'))
        }
      })
    }
  }

  qrPress = (rechargeAddress, coinName, qrApi, bIsLabel = false) => {
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
          <Text style={styles.qrRecharge}>
            {`${coinName} ${transfer(this.props.language, bIsLabel ? 'deposit_address_label' : 'deposit_address')}`}
          </Text>
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
            >{transfer(this.props.language, 'deposit_save_QR_code')}</Text>
          </NextTouchableOpacity>
        </View>
      </Overlay.View>
    )
    this.overlayViewKey = Overlay.show(overlayView)
  }

  showForm = () => {
    const { dispatch, user } = this.props
    dispatch(toggleForm())
    // dispatch(requestCoinList(user.id))
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

  canRechargeAddress = common.getDefaultPair().canRechargeAddress

  renderCoinSelector = (currCoin, listToggled, showForm) => {
    const { language } = this.props
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
        delay={100}
        activeOpacity={common.activeOpacity}
        onPress={() => {
          if (showForm) {
            showForm()
          }
        }}
      >
        <View style={styles.coinSelector}>
          <Text style={styles.coin}>
            {currCoin.name === '选择币种'
              ? transfer(language, 'deposit_select_coin') : currCoin.name}
          </Text>
          <View style={{ alignSelf: 'center' }}>
            {arrow}
          </View>
        </View>
      </NextTouchableOpacity>
    )
  }

  renderCoinList = (coinList, listToggled, tapCoinListCell) => {
    if (!listToggled) return null
    const { language } = this.props
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

  renderTip = (tokenName) => {
    const { language } = this.props
    return (
      <View>
        <Text style={styles.tip}>{transfer(language, 'deposit_please_note')}</Text>
        <Text style={styles.tip}>{`${transfer(language, 'deposit_note_1_1')}${tokenName}${transfer(language, 'deposit_note_1_2')}
${transfer(language, 'deposit_note_2')}
${transfer(language, 'deposit_note_3_1')}${tokenName}${transfer(language, 'deposit_note_3_2')}
${transfer(language, 'deposit_note_4')}
${transfer(language, 'deposit_note_5')}`}</Text>
      </View>
    )
  }

  renderRechargeAddress = (rechargeAddress, coinName, qrApi, contract) => {
    const { language, user } = this.props
    var rechargeAddressLabel = 150818 ^ user.id;
    const addressContent = (
      <View>
        <Text style={styles.addressTip}>{transfer(language, 'deposit_address')}</Text>
        <Text style={styles.address}>
          {rechargeAddress === '暂无可充值地址'
            ? transfer(language, 'deposit_no_address') : rechargeAddress}
        </Text>
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
            <Text style={styles.copyAddressBtn}>{transfer(language, 'deposit_copy_address')}</Text>
          </NextTouchableOpacity>
          <NextTouchableOpacity
            activeOpacity={common.activeOpacity}
            onPress={() => this.qrPress(rechargeAddress, coinName, qrApi)}
          >
            <Text style={styles.copyAddressBtn}>{transfer(language, 'deposit_QA_code')}</Text>
          </NextTouchableOpacity>
        </View>
      </View>
    )
    
    const addressLabelContent = (
      <View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.addressTip}>{transfer(language, 'withdrawal_address_label')}</Text>
          <Text style={[styles.addressTip, {color: common.redColor}]}>{transfer(language, 'deposit_address_label_warning')}</Text>
        </View>
        <Text style={styles.address}>{rechargeAddressLabel}</Text>
      </View>
    )
    const addressLabelBtn = (
      <View>
        <View style={styles.btnsContainer}>
          <NextTouchableOpacity
            activeOpacity={common.activeOpacity}
            onPress={() => this.clipPress(rechargeAddressLabel.toString())}
          >
            <Text style={styles.copyAddressBtn}>{transfer(language, 'deposit_copy_address_label')}</Text>
          </NextTouchableOpacity>
          <NextTouchableOpacity
            activeOpacity={common.activeOpacity}
            onPress={() => this.qrPress(rechargeAddressLabel, coinName, qrApi, true)}
          >
            <Text style={styles.copyAddressBtn}>{transfer(language, 'deposit_QA_code')}</Text>
          </NextTouchableOpacity>
        </View>
      </View>
    )

    return (
      <View >
        <View style={styles.addressContainer}>
          {addressContent}
          {addressBtn}
        </View>
        {
          (isHide || !contract || !contract.addrTag) ?
          null
          :
          <View style={styles.addressContainer}>
            {addressLabelContent}
            {addressLabelBtn}
          </View>
        }
      </View>
    )
  }

  render() {
    const { currCoin, listToggled, rechargeAddress, language } = this.props
    const { canRechargeAddress, coinIdDic } = common.getDefaultPair()
    const coinList = canRechargeAddress.map(e => ({
      id: coinIdDic[e].id,
      name: coinIdDic[e].name,
      contract: coinIdDic[e].contract,
    }))
    let contract = null
    coinList.map(e => {
      if(currCoin &&  currCoin.name === e.name){
        contract = e.contract
      }
    })
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
        rechargeAddress[currCoin.id].rechargeaddr, currCoin.name, api.qrApi, contract
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
    language: state.system.language,
    loggedIn: state.authorize.loggedIn,
  }
}

export default connect(
  mapStateToProps,
)(Recharge)
