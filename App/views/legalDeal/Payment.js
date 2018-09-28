import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Text,
  View,
  Image,
  ScrollView,
  Clipboard,
} from 'react-native'
import BigNumber from 'bignumber.js'
import {
  common,
} from '../../constants/common'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import transfer from '../../localization/utils'
import {
  Toast,
} from 'teaset'
import TKButton from '../../components/TKButton'
import * as otcDetail from '../../actions/otcDetail'

class Payment extends Component {
  static navigationOptions(props) {
    const { navigation } = props
    return {
      headerTitle: navigation.state.params.data.direct === common.buy ?
        transfer(navigation.state.params.lang, 'payment_b') :
        transfer(navigation.state.params.lang, 'payment_s'),
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
  componentDidMount() { }

  cancelPress(id) {
    const { dispatch } = this.props
    dispatch(otcDetail.requestCancel({ id }))
  }

  havedPayPress(id) {
    const { dispatch } = this.props
    dispatch(otcDetail.requestHavedPay({ id }))
  }

  render() {
    const { navigation } = this.props
    const rd = navigation.state.params.data
    const lang = navigation.state.params.lang
    
    let havedPayDisabled = true
    let cancelBtnDisabled = true
    for(var i = 0; i < this.props.otcList.length; i++){
      if(this.props.otcList[i].id === rd.id && this.props.otcList[i].status === common.legalDeal.status.waitpay){
        cancelBtnDisabled = false
        havedPayDisabled = false
      }
    }
 
    let titleName = ''
    let titleBankName = ''
    let titleBankNo = ''
    let name = ''
    let bankName = ''
    let bankNo = ''
    let remark = ''
    let titleTips = ''
    const amount = new BigNumber(rd.dealPrice).multipliedBy(rd.quantity).toFixed(2, 1)
    let havedPayTitle = ''
    let cancelBtnTitle = ''
    if (rd.direct === common.buy) {
      name = rd.traderPayinfo.cardHolderName
      bankName = rd.traderPayinfo.bankName + rd.traderPayinfo.subbankName
      bankNo = rd.traderPayinfo.bankNo
      remark = rd.traderPayinfo.remark
      titleName = transfer(lang, 'payment_b_account_name')
      titleBankName = transfer(lang, 'payment_b_bank')
      titleBankNo = transfer(lang, 'payment_b_account_No')
      titleTips = transfer(lang, 'payment_s_please_note_content')
      havedPayTitle = transfer(lang, 'OtcDetail_i_paid')
      cancelBtnTitle = transfer(lang, 'OtcDetail_cancelOrder')
    } else if (rd.direct === common.sell) {
      name = rd.traderPayinfo.cardHolderName
      bankName = rd.traderPayinfo.bankName + rd.traderPayinfo.subbankName
      bankNo = rd.traderPayinfo.bankNo
      remark = rd.traderPayinfo.remark
      titleName = transfer(lang, 'payment_s_account_name')
      titleBankName = transfer(lang, 'payment_s_bank')
      titleBankNo = transfer(lang, 'payment_s_account_No')
      titleTips = transfer(lang, 'payer_s_please_note_content')
    }
    return (
      <View style={{flex: 1, backgroundColor: common.blackColor,}}>
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: common.blackColor,
          }}
        >
          <Text
            style={{
              marginTop: common.margin15,
              fontSize: common.font16,
              color: common.placeholderColor,
              alignSelf: 'center',
            }}
          >{transfer(lang, 'payment_transaction_amount')}</Text>
          <Text
            style={{
              marginTop: common.margin20,
              fontSize: common.font30,
              color: common.textColor,
              alignSelf: 'center',
            }}
          >{`¥${amount}`}</Text>

          <View
            style={{
              marginTop: common.margin15,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                marginLeft: common.margin10,
                color: common.placeholderColor,
                fontSize: common.font12,
              }}
            >{titleName}</Text>
            <Text
              style={{
                marginRight: common.margin10,
                color: common.textColor,
                fontSize: common.font12,
              }}
            >{name}</Text>
          </View>
          <View
            style={{
              marginTop: common.margin15,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                marginLeft: common.margin10,
                color: common.placeholderColor,
                fontSize: common.font12,
              }}
            >{titleBankName}</Text>
            <Text
              style={{
                marginRight: common.margin10,
                color: common.textColor,
                fontSize: common.font12,
              }}
            >{bankName}</Text>
          </View>
          <View
            style={{
              marginTop: common.margin15,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                marginLeft: common.margin10,
                color: common.placeholderColor,
                fontSize: common.font12,
              }}
            >{titleBankNo}</Text>
            <Text
              onLongPress={() => {
                Clipboard.setString(bankNo.toString())
                Toast.success(transfer(lang, 'recharge_copyed'), 2000)
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
          <View
            style={{
              marginTop: common.margin15,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                marginLeft: common.margin10,
                color: common.placeholderColor,
                fontSize: common.font12,
              }}
            >{transfer(lang, 'payment_remark')}</Text>
            <Text
              style={{
                marginRight: common.margin10,
                color: common.textColor,
                fontSize: common.font12,
              }}
            >{`${remark}（${transfer(lang, 'payment_please_fill_in')}）`}</Text>
          </View>

          <Text
            style={{
              marginTop: common.margin30,
              marginLeft: common.margin10,
              color: common.textColor,
              fontSize: common.font12,
            }}
          >{transfer(lang, 'payment_s_please_note')}</Text>
          <Text
            style={{
              marginTop: common.margin10,
              marginLeft: common.margin10,
              marginRight: common.margin10,
              color: common.textColor,
              fontSize: common.font10,
              lineHeight: 14,
            }}
          >{titleTips}</Text>
        </ScrollView>
        <View>
        {
          rd.direct === common.sell ? null :
          <TKButton
            style={{ height: 40, margin: common.margin10, borderWidth: 1, borderColor: common.borderColor, backgroundColor: common.navBgColor, }}
            titleStyle={{ color: havedPayDisabled ? common.placeholderColor : common.btnTextColor }}
            target="global"
            caption={havedPayTitle}
            onPress={() => this.havedPayPress(rd.id)}
            disabled={havedPayDisabled}
          />
        }
        {
          rd.direct === common.sell ? null :
          <TKButton
            style={{ height: 40, margin: common.margin10, borderWidth: 1, marginTop: 0, borderColor: common.borderColor, backgroundColor: common.navBgColor, }}
            titleStyle={{ color: cancelBtnDisabled ? common.placeholderColor : common.btnTextColor }}
            target="global"
            caption={cancelBtnTitle}
            onPress={() => this.cancelPress(rd.id)}
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
    ...state.Payment,
    otcList: state.otcDetail.otcList,
  }
}

export default connect(
  mapStateToProps,
)(Payment)

