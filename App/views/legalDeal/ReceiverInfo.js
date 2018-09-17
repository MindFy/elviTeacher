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
  componentDidMount() {
    const { navigation } = this.props
    const { params } = navigation.state
    if (params && params.receiverId) {
      this.requesetReceiverInfo(params.receiverId)
    }
  }

  requesetReceiverInfo = (id) => {
    const { dispatch } = this.props
    dispatch(requesetReceiverInfo(findOtcReceiverInfo(id)))
  }

  render() {
    const { receiverInfo, language } = this.props
    const { receiverInfoData, receiverInfoLoading } = receiverInfo
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
    return (
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
    )
  }
}

function mapStateToProps(state) {
  return {
    receiverInfo: state.receiverInfo,
    language: state.system.language,
  }
}

export default connect(mapStateToProps)(ReceiverInfo)
