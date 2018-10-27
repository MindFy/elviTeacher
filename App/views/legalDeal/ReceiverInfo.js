import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  Clipboard,
} from 'react-native'
import BigNumber from 'bignumber.js'
import {
  common,
} from '../../constants/common'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import transfer from '../../localization/utils'

import requesetReceiverInfo from '../../actions/receiverInfo'
import { findOtcReceiverInfo } from '../../schemas/otcDetail'

import TKSpinner from '../../components/TKSpinner'
import {
  Toast,
} from 'teaset'
import TKButton from '../../components/TKButton'
import * as otcDetail from '../../actions/otcDetail'
import schemas from '../../schemas/index'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: common.blackColor,
  },
  amountTip: {
    marginTop: common.margin15,
    fontSize: common.font16,
    color: common.placeholderColor,
    alignSelf: 'center',
  },
  amount: {
    marginTop: common.margin20,
    fontSize: common.font30,
    color: common.textColor,
    alignSelf: 'center',
  },
  contentContainer: {
    marginTop: common.margin15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentTip: {
    marginLeft: common.margin10,
    color: common.placeholderColor,
    fontSize: common.font12,
  },
  content: {
    marginRight: common.margin10,
    color: common.textColor,
    fontSize: common.font12,
  },
  pleaseNoteTip: {
    marginTop: common.margin30,
    marginLeft: common.margin10,
    color: common.textColor,
    fontSize: common.font12,
  },
  pleaseNote: {
    marginTop: common.margin10,
    marginLeft: common.margin10,
    marginRight: common.margin10,
    color: common.textColor,
    fontSize: common.font10,
    lineHeight: 14,
  },
})

class ReceiverInfo extends Component {
  static navigationOptions(props) {
    const { navigation } = props
    return {
      headerTitle: navigation.state.params.titleName,
      headerLeft:
        (
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

  componentWillReceiveProps(nextProps) {
    this.handleRequestCancel(nextProps)
    this.handleRequestHavedPay(nextProps)
  }

  errors = {
    4000156: 'login_codeError',
    4000107: 'AuthCode_cannot_send_verification_code_repeatedly_within_one_minute',
    4001480: 'OtcDetail_order_statusexpired',
    4001421: 'OtcDetail_order_statusexpired',
  }

  handleRequestCancel(nextProps) {
    const { receiverInfoData, dispatch, cancelResult, cancelError, language } = nextProps

    if (cancelResult && cancelResult !== this.props.cancelResult) {
      Toast.success(transfer(language, 'OtcDetail_revocation_successful'))
      dispatch(otcDetail.updateOtcList([{id: receiverInfoData.id, status: 'cancel', key: receiverInfoData.id}]))
    }
    if (cancelError && cancelError !== this.props.cancelError) {
      if (cancelError.message === common.badNet) {
        Toast.fail(transfer(language, 'OtcDetail_net_error'))
      } else {
        const msg = this.errors[cancelError.code]
        if (msg) Toast.fail(transfer(language, msg))
        else Toast.fail(transfer(language, 'OtcDetail_failed_to_cancel_the_order'))
      }
    }
  }

  handleRequestHavedPay(nextProps) {
    const { receiverInfoData, dispatch, havedPayResult, havedPayError, language } = nextProps

    if (havedPayResult && havedPayResult !== this.props.havedPayResult) {
      Toast.success(transfer(language, 'OtcDetail_confirm_successful'))
      dispatch(otcDetail.updateOtcList([{id: receiverInfoData.id, status: 'waitconfirm'}]))
    }
    if (havedPayError && havedPayError !== this.props.havedPayError) {
      if (havedPayError.message === common.badNet) {
        Toast.fail(transfer(language, 'OtcDetail_net_error'))
      } else {
        const msg = transfer(language, this.errors[havedPayError.code])
        if (msg) Toast.fail(msg)
        Toast.fail(transfer(language, 'OtcDetail_operation_failed'))
      }
    }
  }

  componentDidMount() {
    const { navigation, loggedInResult } = this.props
    const { params } = navigation.state
    if (params && params.receiverId) {
      this.requesetReceiverInfo(params.receiverId)
    }
    this.refreshOtcList({
      id: loggedInResult.id,
      skip: 0,
      limit: 10,
    })
  }

  requesetReceiverInfo = (id) => {
    const { dispatch } = this.props
    dispatch(requesetReceiverInfo(findOtcReceiverInfo(id)))
  }

  cancelPress(id) {
    const { dispatch } = this.props
    dispatch(otcDetail.requestCancel({ id }))
  }

  havedPayPress(id) {
    const { dispatch } = this.props
    dispatch(otcDetail.requestHavedPay({ id }))
  }

  refreshOtcList(data) {
    const { dispatch } = this.props
    dispatch(otcDetail.requestOtcList(schemas.findOtcList(data)))
  }

  render() {
    const { receiverInfoData, receiverInfoLoading, language } = this.props
    if (receiverInfoData === null) {
      return (
        <View style={styles.container}>
          <TKSpinner isVisible={receiverInfoLoading} />
        </View>)
    }
    const amount =
      new BigNumber(receiverInfoData.dealPrice)
        .multipliedBy(receiverInfoData.quantity)
        .toFixed(2, 1)
    const name = receiverInfoData.traderPayinfo.cardHolderName
    const bankName =
      receiverInfoData.traderPayinfo.bankName + receiverInfoData.traderPayinfo.subbankName
    const bankNo = receiverInfoData.traderPayinfo.bankNo
    const titleName = transfer(language, 'payment_b_account_name')
    const titleBankName = transfer(language, 'payment_b_bank')
    const titleBankNo = transfer(language, 'payment_b_account_No')

    const amountTip = transfer(language, 'payment_transaction_amount')
    const remarkTip = transfer(language, 'payment_remark')
    const remark =
      `${receiverInfoData.traderPayinfo.remark}（${transfer(language, 'payment_please_fill_in')}）`
    const pleaseNoteTitle = transfer(language, 'payment_s_please_note')
    const pleaseNote = transfer(language, 'payment_s_please_note_content')
    const havedPayTitle = transfer(language, 'OtcDetail_i_paid')
    const cancelBtnTitle = transfer(language, 'OtcDetail_cancelOrder')
    let havedPayDisabled = true
    let cancelBtnDisabled = true
    for(var i = 0; i < this.props.otcList.length; i++){
      if(this.props.otcList[i].id === receiverInfoData.id && this.props.otcList[i].status === common.legalDeal.status.waitpay){
        cancelBtnDisabled = false
        havedPayDisabled = false
      }
    }
    return (
      <View style={{flex: 1, backgroundColor: common.blackColor,}}>
        <ScrollView style={styles.container}>
          <Text style={styles.amountTip}> {amountTip}</Text>
          <Text style={styles.amount}>{`¥${amount}`}</Text>

          <View style={styles.contentContainer}>
            <Text style={styles.contentTip}>{titleName}</Text>
            <Text style={styles.content}>{name}</Text>
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.contentTip}>{titleBankName}</Text>
            <Text style={styles.content}>{bankName}</Text>
          </View>

          <View style={styles.contentContainer} >
            <Text style={styles.contentTip}>{titleBankNo}</Text>
            <Text
              onLongPress={() => {
                Clipboard.setString(bankNo.toString())
                Toast.success(transfer(language, 'recharge_copyed'), 2000)
              }}
              value={bankNo}
              style={{
                paddingLeft: common.margin5,
                paddingRight: common.margin5,
                textAlign: 'center',
                borderColor: common.textColor,
                borderBottomWidth: 1,
                marginRight: common.margin10,
                color: common.textColor,
                fontSize: common.font12,
              }}
            >{bankNo}</Text>
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.contentTip}>{remarkTip}</Text>
            <Text style={styles.content}>{remark}</Text>
          </View>

          <Text style={styles.pleaseNoteTip}>{pleaseNoteTitle}</Text>
          <Text style={styles.pleaseNote}>{pleaseNote}</Text>
        </ScrollView>
        <View>
        {
          receiverInfoData.direct === common.sell ? null :
          <TKButton
            style={{ height: 40, margin: common.margin10, borderWidth: 1, borderColor: common.borderColor, backgroundColor: common.navBgColor, }}
            titleStyle={{ color: havedPayDisabled ? common.placeholderColor : common.btnTextColor }}
            target="global"
            caption={havedPayTitle}
            onPress={() => this.havedPayPress(receiverInfoData.id)}
            disabled={havedPayDisabled}
          />
        }
        {
          receiverInfoData.direct === common.sell ? null :
          <TKButton
            style={{ height: 40, margin: common.margin10, borderWidth: 1, marginTop: 0, borderColor: common.borderColor, backgroundColor: common.navBgColor, }}
            titleStyle={{ color: cancelBtnDisabled ? common.placeholderColor : common.btnTextColor }}
            target="global"
            caption={cancelBtnTitle}
            onPress={() => this.cancelPress(receiverInfoData.id)}
            disabled={cancelBtnDisabled}
          />
        }
      </View>
    </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state.receiverInfo,
    loggedInResult: state.authorize.loggedInResult,
    language: state.system.language,
    otcList: state.otcDetail.otcList,
    cancelResult: state.otcDetail.cancelResult,
    cancelError: state.otcDetail.cancelError,
    havedPayResult: state.otcDetail.havedPayResult,
    havedPayError: state.otcDetail.havedPayError,
  }
}

export default connect(mapStateToProps)(ReceiverInfo)
