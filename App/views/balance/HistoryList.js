import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import RefreshListView from 'react-native-refresh-list-view'
import { common } from '../../constants/common'

export default class HistoryList extends Component {
  componentDidMount() { }

  renderHeader() {
    const { rechargeOrWithdraw } = this.props
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
          >时间</Text>
          <Text
            style={{
              color: common.textColor,
              fontSize: common.font12,
              width: '20%',
              textAlign: 'center',
              alignSelf: 'center',
            }}
          >币种</Text>
          <Text
            style={{
              color: common.textColor,
              fontSize: common.font12,
              width: '20%',
              textAlign: 'center',
              alignSelf: 'center',
            }}
          >类型</Text>
          <Text
            style={{
              flex: 1,
              color: common.textColor,
              fontSize: common.font12,
              textAlign: 'right',
              alignSelf: 'center',
            }}
          >数量</Text>
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
        >时间</Text>
        <Text
          style={{
            color: common.textColor,
            fontSize: common.font12,
            width: '15%',
            textAlign: 'center',
            alignSelf: 'center',
          }}
        >币种</Text>
        <Text
          style={{
            flex: 1,
            color: common.textColor,
            fontSize: common.font12,
            textAlign: 'center',
            alignSelf: 'center',
          }}
        >数量</Text>
        <Text
          style={{
            color: common.textColor,
            fontSize: common.font12,
            width: '15%',
            textAlign: rechargeOrWithdraw === common.payment.withdraw ? 'center' : 'right',
            alignSelf: 'center',
          }}
        >状态</Text>
        {
          rechargeOrWithdraw === common.payment.withdraw ?
            <Text
              style={{
                color: common.textColor,
                fontSize: common.font12,
                width: '10%',
                textAlign: 'right',
                alignSelf: 'center',
              }}
            >操作</Text> : null
        }
      </View>
    )
  }

  renderItem(rd, rid) {
    const { rechargeOrWithdraw, cancelWithdraw } = this.props
    if (rechargeOrWithdraw === common.payment.legalDeal) {
      const createdAt = common.dfFullDate(rd.createdAt)
      let direct = ''
      let directColor = 'white'
      if (rd.direct === common.buy) {
        directColor = common.redColor
        direct = '买入'
      } else if (rd.direct === common.sell) {
        directColor = common.greenColor
        direct = '卖出'
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
          >{rd.quantity}</Text>
        </View>
      )
    }
    const btnTitleColor = rd.status === '待审核' ? common.btnTextColor : common.placeholderColor
    const btnDisabled = rd.status !== '待审核'
    const createdAt = common.dfFullDate(rd.createdAt)
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
        >{rd.amount}</Text>
        <Text
          style={{
            color: common.textColor,
            fontSize: common.font12,
            width: '15%',
            textAlign: rechargeOrWithdraw === common.payment.withdraw ? 'center' : 'right',
            alignSelf: 'center',
          }}
        >{rd.status}</Text>
        {
          rechargeOrWithdraw === common.payment.withdraw ?
            <TouchableOpacity
              style={{
                width: '10%',
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
              >撤单</Text>
            </TouchableOpacity> : null
        }
      </View>
    )
  }

  render() {
    const { data, refreshState, onHeaderRefresh, onFooterRefresh } = this.props
    return (
      <RefreshListView
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
      />
    )
  }
}
