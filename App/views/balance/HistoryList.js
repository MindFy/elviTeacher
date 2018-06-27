import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'
import RefreshListView from 'react-native-refresh-list-view'
import { BigNumber } from 'bignumber.js'
import { common } from '../../constants/common'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'

const styles = StyleSheet.create({
  header: {
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    flexDirection: 'row',
  },
  date: {
    color: common.textColor,
    fontSize: common.font12,
    width: '38%',
    alignSelf: 'center',
  },
  headerCoin: {
    color: common.textColor,
    fontSize: common.font12,
    width: '20%',
    alignSelf: 'center',
    textAlign: 'center',
  },
  rowCoin: {
    color: common.textColor,
    fontSize: common.font12,
    width: '15%',
    alignSelf: 'center',
    textAlign: 'center',
  },
  otcAmount: {
    flex: 1,
    color: common.textColor,
    fontSize: common.font12,
    alignSelf: 'center',
    textAlign: 'right',
  },
  headerText: {
    color: common.textColor,
    fontSize: common.font12,
    alignSelf: 'center',
    textAlign: 'center',
  },
  status: {
    color: common.textColor,
    fontSize: common.font12,
    width: '17%',
    alignSelf: 'center',
    textAlign: 'center',
  },
  action: {
    color: common.textColor,
    fontSize: common.font12,
    alignSelf: 'center',
    textAlign: 'right',
    width: '12%',
  },
  cancelBtn: {
    width: '12%',
    alignSelf: 'center',
  },
  cancel: {
    fontSize: common.font12,
    textAlign: 'right',
  },
})

export default class HistoryList extends Component {
  renderHeader() {
    const { selectionBar, language } = this.props
    if (selectionBar === 'otc') {
      return (
        <View style={styles.header}>
          <Text style={styles.date}>{language.date}</Text>
          <Text style={styles.headerCoin}>{language.coin}</Text>
          <Text style={styles.headerCoin}>{language.type}</Text>
          <Text style={styles.otcAmount}>{language.amount}</Text>
        </View>
      )
    }
    return (
      <View style={styles.header}>
        <Text style={styles.date}>{language.date}</Text>
        <Text style={styles.rowCoin}>{language.coin}</Text>
        <Text style={[styles.headerText, {
          flex: 1,
        }]}
        >{language.amount}</Text>
        <Text style={[styles.status, {
          textAlign: selectionBar === 'withdraw' ? 'center' : 'right',
        }]}
        >{language.status}</Text>
        {selectionBar === 'withdraw' ?
          <Text style={styles.action}>{language.action}</Text>
          : null}
      </View>
    )
  }

  renderItem(rd, rid) {
    const { selectionBar, cancelWithdraw, language } = this.props
    if (selectionBar === 'otc') {
      const createdAt = common.dfFullDate(rd.createdAt)
      let direct = ''
      let directColor = 'white'
      const quantity = new BigNumber(rd.quantity).toFixed(2)
      if (rd.direct === common.buy) {
        directColor = common.redColor
        direct = language.buy
      } else if (rd.direct === common.sell) {
        directColor = common.greenColor
        direct = language.sell
      }
      return (
        <View style={styles.header}>
          <Text style={styles.date}>{createdAt}</Text>
          <Text style={styles.headerCoin}>{common.legalDeal.token}</Text>
          <Text style={[styles.headerCoin, {
            color: directColor,
          }]}
          >{direct}</Text>
          <Text style={styles.otcAmount}>{quantity}</Text>
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
        status = selectionBar === 'deposit' ? language.deposited : language.withdrawed
        break
      case '已取消':
        status = language.cancelled
        break
      case '提币中':
        status = language.withdrawing
        break
      case '待审核':
        status = language.pending
        break
      default:
        break
    }
    return (
      <View style={styles.header}>
        <Text style={styles.date}>{createdAt}</Text>
        <Text style={styles.rowCoin}>{rd.token.name}</Text>
        <Text style={[styles.headerText, {
          flex: 1,
        }]}
        >{amount}</Text>
        <Text style={[styles.status, {
          textAlign: selectionBar === 'withdraw' ? 'center' : 'right',
        }]}
        >{status}</Text>
        {selectionBar === 'withdraw' ?
          <NextTouchableOpacity
            style={styles.cancelBtn}
            onPress={() => cancelWithdraw(rd, rid)}
            disabled={btnDisabled}
          >
            <Text style={[styles.cancel, {
              color: btnTitleColor,
            }]}
            >{language.cancel}</Text>
          </NextTouchableOpacity>
          : null}
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
        footerRefreshingText={language.loading}
        footerFailureText={language.reload}
        footerNoMoreDataText={language.noMoreData}
      />
    )
  }
}
