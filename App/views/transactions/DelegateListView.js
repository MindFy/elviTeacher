import React, { Component } from 'react'
import {
  View,
  Text,
  ListView,
  TouchableOpacity,
} from 'react-native'
import { common } from '../common'

export default class Delegate extends Component {
  componentDidMount() { }

  renderHeader() {
    const { currentOrHistory, cancelAllBlock } = this.props
    if (currentOrHistory === common.current) {
      return (
        <TouchableOpacity
          activeOpacity={common.activeOpacity}
          onPress={() => cancelAllBlock()}
        >
          <Text
            style={{
              marginTop: common.margin10,
              marginRight: common.margin10,
              fontSize: common.font12,
              color: common.btnTextColor,
              textAlign: 'right',
            }}
          >全部撤单</Text>
        </TouchableOpacity>
      )
    }

    return (
      <View
        style={{
          marginTop: common.margin10,
          marginLeft: common.margin10,
          marginRight: common.margin10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            flex: 1,
            color: common.placeholderColor,
            fontSize: common.font12,
          }}
        >
          <Text
            style={{
              color: common.placeholderColor,
              fontSize: common.font12,
            }}
          >市场</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}
        >
          <Text
            style={{
              flex: 1,
              color: common.btnTextColor,
              fontSize: common.font12,
              textAlign: 'right',
            }}
          >均价</Text>
          <Text
            style={{
              color: common.placeholderColor,
              fontSize: common.font12,
            }}
          > / </Text>
          <Text
            style={{
              flex: 1,
              color: common.placeholderColor,
              fontSize: common.font12,
            }}
          >价格</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}
        >
          <Text
            style={{
              flex: 1,
              color: common.btnTextColor,
              fontSize: common.font12,
              textAlign: 'right',
            }}
          >成交数量</Text>
          <Text
            style={{
              color: common.placeholderColor,
              fontSize: common.font12,
              textAlign: 'right',
            }}
          > / 数量</Text>
        </View>
      </View>
    )
  }

  renderRow(rd, sid, rid) {
    const { currentOrHistory, cancelBlock } = this.props
    if (currentOrHistory === common.current) {
      const createdAtDate = new Date(rd.createdAt)
      const getYear = createdAtDate.getFullYear()
      const getMonth = createdAtDate.getMonth() < 10 ?
        `0${createdAtDate.getMonth()}` :
        createdAtDate.getMonth()
      const getDate = createdAtDate.getDate() < 10 ?
        `0${createdAtDate.getDate()}` :
        createdAtDate.getDate()
      const getHours = createdAtDate.getHours() < 10 ?
        `0${createdAtDate.getHours()}` :
        createdAtDate.getHours()
      const getMinutes = createdAtDate.getMinutes() < 10 ?
        `0${createdAtDate.getMinutes()}` :
        createdAtDate.getMinutes()
      const getSeconds = createdAtDate.getSeconds() < 10 ?
        `0${createdAtDate.getSeconds()}` :
        createdAtDate.getSeconds()
      const createdAt = `${getYear}/${getMonth}/${getDate} ${getHours}:${getMinutes}:${getSeconds}`

      return (
        <View
          style={{
            marginTop: common.margin10,
            marginLeft: common.margin10,
            marginRight: common.margin10,
            height: common.h60,
            backgroundColor: common.navBgColor,
            borderColor: common.borderColor,
            borderWidth: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              borderBottomColor: common.borderColor,
              borderBottomWidth: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
              }}
            >
              <Text
                style={{
                  marginLeft: common.margin5,
                  color: common.textColor,
                  fontSize: common.font12,
                  alignSelf: 'center',
                }}
              >{`${rd.goods.name}/${rd.currency.name}`}</Text>
              <Text
                style={{
                  marginLeft: common.margin10,
                  color: rd.direct === 'sell' ? common.redColor : common.greenColor,
                  fontSize: common.font12,
                  alignSelf: 'center',
                }}
              >{rd.direct === 'buy' ? '买入' : '卖出'}</Text>
              <Text
                style={{
                  marginLeft: common.margin10,
                  color: common.textColor,
                  fontSize: common.font12,
                  alignSelf: 'center',
                }}
              >{createdAt}</Text>
            </View>
            <TouchableOpacity
              style={{
                alignSelf: 'center',
              }}
              activeOpacity={common.activeOpacity}
              onPress={() => cancelBlock(rd, rid)}
            >
              <Text
                style={{
                  marginRight: common.margin5,
                  color: common.btnTextColor,
                  fontSize: common.font12,
                  paddingRight: 5,
                }}
              >撤单</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                marginLeft: common.margin5,
                color: common.textColor,
                fontSize: common.font10,
                alignSelf: 'center',
              }}
            >{`价格:${rd.price}`}</Text>
            <Text
              style={{
                marginLeft: common.margin5,
                color: common.textColor,
                fontSize: common.font10,
                alignSelf: 'center',
              }}
            >{`数量:${rd.quantity}`}</Text>
            <Text
              style={{
                marginLeft: common.margin5,
                color: common.textColor,
                fontSize: common.font10,
                alignSelf: 'center',
              }}
            >{`已成交:${rd.dealled}`}</Text>
          </View>
        </View >
      )
    }
    return (
      <View
        style={{
          marginTop: common.margin10,
          marginLeft: common.margin10,
          marginRight: common.margin10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text
          style={{
            flex: 1,
            fontSize: common.font10,
            color: common.textColor,
          }}
        >{`${rd.goods.name}/${rd.currency.name}`}</Text>
        <Text
          style={{
            flex: 1,
            fontSize: common.font10,
            color: common.textColor,
            textAlign: 'center',
          }}
        >{rd.price}</Text>
        <Text
          style={{
            flex: 1,
            fontSize: common.font10,
            color: common.textColor,
            textAlign: 'right',
          }}
        >{rd.dealamount}</Text>
      </View>
    )
  }

  render() {
    const { dataSource } = this.props
    return (
      <ListView
        dataSource={dataSource}
        renderHeader={() => this.renderHeader()}
        renderRow={(rd, sid, rid) => this.renderRow(rd, sid, rid)}
        enableEmptySections
      />
    )
  }
}