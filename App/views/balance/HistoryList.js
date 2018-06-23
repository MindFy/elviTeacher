import React, { Component } from 'react'
import {
  View,
  Text,
} from 'react-native'
import { connect } from 'react-redux'
import RefreshListView from 'react-native-refresh-list-view'
import { BigNumber } from 'bignumber.js'
import { common } from '../../constants/common'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import transfer from '../../localization/utils'

class HistoryList extends Component {
  renderHeader() {
    const { rechargeOrWithdraw, language } = this.props
    if (rechargeOrWithdraw === common.payment.legalDeal) {
      return (
        <View style={{
          marginTop: common.margin10,
          marginLeft: common.margin15,
          marginRight: common.margin15,
          flexDirection: 'row',
        }}
        >
          <Text
            style={{
              color: common.textColor,
              fontSize: common.font12,
              width: '38%',
              alignSelf: 'center',
              textAlign: 'left',
            }}
          >{transfer(language, 'history_date')}</Text>
          <Text
            style={{
              color: common.textColor,
              fontSize: common.font12,
              width: '20%',
              textAlign: 'center',
              alignSelf: 'center',
            }}
          >{transfer(language, 'history_coin')}</Text>
          <Text
            style={{
              color: common.textColor,
              fontSize: common.font12,
              width: '20%',
              textAlign: 'center',
              alignSelf: 'center',
            }}
          >{transfer(language, 'history_type')}</Text>
          <Text
            style={{
              flex: 1,
              color: common.textColor,
              fontSize: common.font12,
              textAlign: 'right',
              alignSelf: 'center',
            }}
          >{transfer(language, 'history_amount')}</Text>
        </View>
      )
    }
    return (
      <View style={{
        marginTop: common.margin10,
        marginLeft: common.margin15,
        marginRight: common.margin15,
        flexDirection: 'row',
      }}
      >
        <Text
          style={{
            color: common.textColor,
            fontSize: common.font12,
            width: '38%',
            alignSelf: 'center',
            textAlign: 'left',
          }}
        >{transfer(language, 'history_date')}</Text>
        <Text
          style={{
            color: common.textColor,
            fontSize: common.font12,
            width: '15%',
            textAlign: 'center',
            alignSelf: 'center',
          }}
        >{transfer(language, 'history_coin')}</Text>
        <Text
          style={{
            flex: 1,
            color: common.textColor,
            fontSize: common.font12,
            textAlign: 'center',
            alignSelf: 'center',
          }}
        >{transfer(language, 'history_amount')}</Text>
        <Text
          style={{
            color: common.textColor,
            fontSize: common.font12,
            width: '17%',
            textAlign: rechargeOrWithdraw === common.payment.withdraw ? 'center' : 'right',
            alignSelf: 'center',
          }}
        >{transfer(language, 'history_status')}</Text>
        {
          rechargeOrWithdraw === common.payment.withdraw ?
            <Text
              style={{
                color: common.textColor,
                fontSize: common.font12,
                width: '12%',
                textAlign: 'right',
                alignSelf: 'center',
              }}
            >{transfer(language, 'history_action')}</Text> : null
        }
      </View>
    )
  }

  renderItem(rd, rid) {
    const { rechargeOrWithdraw, cancelWithdraw, language } = this.props
    if (rechargeOrWithdraw === common.payment.legalDeal) {
      const createdAt = common.dfFullDate(rd.createdAt)
      let direct = ''
      let directColor = 'white'
      const quantity = new BigNumber(rd.quantity).toFixed(2)
      if (rd.direct === common.buy) {
        directColor = common.redColor
        direct = transfer(language, 'history_buy')
      } else if (rd.direct === common.sell) {
        directColor = common.greenColor
        direct = transfer(language, 'history_sell')
      }
      return (
        <View style={{
          marginTop: common.margin10,
          marginLeft: common.margin15,
          marginRight: common.margin15,
          flexDirection: 'row',
        }}
        >
          <Text
            style={{
              color: common.textColor,
              fontSize: common.font12,
              width: '38%',
              alignSelf: 'center',
            }}
          >{createdAt}</Text>
          <Text
            style={{
              color: common.textColor,
              fontSize: common.font12,
              width: '20%',
              textAlign: 'center',
              alignSelf: 'center',
            }}
          >{common.legalDeal.token}</Text>
          <Text
            style={{
              color: directColor,
              fontSize: common.font12,
              width: '20%',
              alignSelf: 'center',
              textAlign: 'center',
            }}
          >{direct}</Text>
          <Text
            style={{
              flex: 1,
              color: common.textColor,
              fontSize: common.font12,
              alignSelf: 'center',
              textAlign: 'right',
            }}
          >{quantity}</Text>
        </View>
      )
    }
    const btnTitleColor = rd.status === '待审核' ? common.btnTextColor : common.placeholderColor
    const btnDisabled = rd.status !== '待审核'
    const createdAt = common.dfFullDate(rd.createdAt)
    const amount = new BigNumber(rd.amount).toFixed(8, 1)
    let status = ''
    switch (rd.status) {
      case '已完成':
        status = rechargeOrWithdraw === common.payment.recharge
          ? transfer(language, 'history_deposited') : transfer(language, 'history_withdrawed')
        break
      case '已取消':
        status = transfer(language, 'history_cancelled')
        break
      case '提币中':
        status = transfer(language, 'history_withdrawing')
        break
      case '待审核':
        status = transfer(language, 'history_pending')
        break
      default:
        break
    }
    return (
      <View style={{
        marginTop: common.margin10,
        marginLeft: common.margin15,
        marginRight: common.margin15,
        flexDirection: 'row',
      }}
      >
        <Text
          style={{
            color: common.textColor,
            fontSize: common.font12,
            width: '38%',
            alignSelf: 'center',
            textAlign: 'left',
          }}
        >{createdAt}</Text>
        <Text
          style={{
            color: common.textColor,
            fontSize: common.font12,
            width: '15%',
            textAlign: 'center',
            alignSelf: 'center',
          }}
        >{rd.token.name}</Text>
        <Text
          style={{
            flex: 1,
            color: common.textColor,
            fontSize: common.font12,
            textAlign: 'center',
            alignSelf: 'center',
          }}
        >{amount}</Text>
        <Text
          style={{
            color: common.textColor,
            fontSize: common.font12,
            width: '17%',
            textAlign: rechargeOrWithdraw === common.payment.withdraw ? 'center' : 'right',
            alignSelf: 'center',
          }}
        >{status}</Text>
        {
          rechargeOrWithdraw === common.payment.withdraw ?
            <NextTouchableOpacity
              style={{
                width: '12%',
                alignSelf: 'center',
              }}
              onPress={() => cancelWithdraw(rd, rid)}
              disabled={btnDisabled}
            >
              <Text
                style={{
                  color: btnTitleColor,
                  fontSize: common.font12,
                  textAlign: 'right',
                }}
              >{transfer(language, 'history_cancel')}</Text>
            </NextTouchableOpacity> : null
        }
      </View>
    )
  }

  render() {
    const { data, refreshState, onHeaderRefresh, onFooterRefresh, language } = this.props
    return (
      <RefreshListView
        keyExtractor={item => item.id}
        data={data}
        renderItem={({ item, index }) => this.renderItem(item, index)}
        ListHeaderComponent={() => this.renderHeader()}
        refreshState={refreshState}
        onHeaderRefresh={() => onHeaderRefresh()}
        onFooterRefresh={() => onFooterRefresh()}
        footerTextStyle={{
          color: common.textColor,
          fontSize: common.font14,
        }}
        footerRefreshingText={transfer(language, 'exchange_dataInLoading')}
        footerFailureText={transfer(language, 'exchange_dataFailureText')}
        footerNoMoreDataText={transfer(language, 'exchange_dataNoMoreData')}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    language: state.system.language,
  }
}

export default connect(mapStateToProps)(HistoryList)
