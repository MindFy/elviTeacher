import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  ListView,
} from 'react-native'
import { BigNumber } from 'bignumber.js'
import { common } from '../../constants/common'
import TKSelectionBar from '../../components/TKSelectionBar'
import actions from '../../actions/index'

class DetailList extends Component {
  constructor() {
    super()
    this.shelvesBuyDS = data => new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(data)
    this.shelvesSellDS = data => new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(data)
    this.latestDealsDS = data => new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(data)
  }

  renderHeader(type) {
    if (type === common.buy) {
      return (
        <View
          style={{
            marginTop: common.margin10,
            marginLeft: common.margin10,
            borderBottomColor: common.placeholderColor,
            borderBottomWidth: 1,
          }}
        >
          <Text
            style={{
              flex: 1,
              color: common.placeholderColor,
              fontSize: common.font12,
              paddingBottom: common.margin5,
            }}
          >买</Text>
        </View>
      )
    } else if (type === common.sell) {
      return (
        <View
          style={{
            marginTop: common.margin10,
            marginRight: common.margin10,
            borderBottomColor: common.placeholderColor,
            borderBottomWidth: 1,
          }}
        >
          <Text
            style={{
              color: common.placeholderColor,
              fontSize: common.font12,
              paddingBottom: common.margin5,
            }}
          >卖</Text>
        </View>
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
            fontSize: common.font12,
            color: common.placeholderColor,
            paddingBottom: common.margin5,
          }}
        >时间</Text>
        <Text
          style={{
            fontSize: common.font12,
            color: common.placeholderColor,
            paddingBottom: common.margin5,
          }}
        >价格</Text>
        <Text
          style={{
            fontSize: common.font12,
            color: common.placeholderColor,
            paddingBottom: common.margin5,
          }}
        >数量</Text>
      </View>
    )
  }

  renderRow(rd, type) {
    const { homeRoseSelected } = this.props
    if (type === common.buy) {
      let price
      let sumQuantity
      common.precision(homeRoseSelected.goods.name, homeRoseSelected.currency.name, (p, q) => {
        price = new BigNumber(rd.price).toFixed(p, 1)
        sumQuantity = new BigNumber(rd.sum_quantity).toFixed(q, 1)
      })
      return (
        <View
          style={{
            marginTop: common.margin5,
            marginLeft: common.margin10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              fontSize: common.font12,
              color: common.textColor,
            }}
          >{sumQuantity}</Text>
          <Text
            style={{
              marginRight: 1,
              fontSize: common.font12,
              color: common.redColor,
            }}
          >{price}</Text>
        </View>
      )
    } else if (type === common.sell) {
      let price
      let sumQuantity
      common.precision(homeRoseSelected.goods.name, homeRoseSelected.currency.name, (p, q) => {
        price = new BigNumber(rd.price).toFixed(p, 1)
        sumQuantity = new BigNumber(rd.sum_quantity).toFixed(q, 1)
      })
      return (
        <View
          style={{
            marginTop: common.margin5,
            marginRight: common.margin10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              marginLeft: 1,
              fontSize: common.font12,
              color: common.greenColor,
            }}
          >{price}</Text>
          <Text
            style={{
              fontSize: common.font12,
              color: common.textColor,
            }}
          >{sumQuantity}</Text>
        </View>
      )
    }
    let textColor = null
    let dealPrice
    let quantity
    if (rd.endDirect === common.buy) {
      textColor = common.redColor
    } else if (rd.endDirect === common.sell) {
      textColor = common.greenColor
    }
    const createdAt = common.dfTime(rd.createdAt)
    common.precision(homeRoseSelected.goods.name, homeRoseSelected.currency.name, (p, q) => {
      dealPrice = new BigNumber(rd.dealPrice).toFixed(p, 1)
      quantity = new BigNumber(rd.quantity).toFixed(q, 1)
    })
    return (
      <View
        style={{
          marginTop: common.margin5,
          marginLeft: common.margin10,
          marginRight: common.margin10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text
          style={{
            fontSize: common.font12,
            color: common.textColor,
            width: '20%',
            textAlign: 'left',
          }}
        >{createdAt}</Text>
        <Text
          style={{
            fontSize: common.font12,
            color: textColor,
            width: '60%',
            textAlign: 'center',
          }}
        >{dealPrice}</Text>
        <Text
          style={{
            fontSize: common.font12,
            color: common.textColor,
            width: '20%',
            textAlign: 'right',
          }}
        >{quantity}</Text>
      </View>
    )
  }

  render() {
    const { dispatch, selectionBarSelected, shelvesBuy, shelvesSell, latestDeals } = this.props

    return (
      <View>
        <TKSelectionBar
          leftTitle={'委托订单'}
          rightTitle={'最新成交'}
          leftBlock={() => dispatch(actions.selectionBarUpdate(common.selectionBar.left))}
          rightBlock={() => dispatch(actions.selectionBarUpdate(common.selectionBar.right))}
        />
        {
          selectionBarSelected === common.selectionBar.left
            ? <View
              style={{
                flexDirection: 'row',
              }}
            >
              <ListView
                style={{
                  width: '50%',
                }}
                dataSource={this.shelvesBuyDS(shelvesBuy)}
                renderHeader={() => this.renderHeader(common.buy)}
                renderRow={rd => this.renderRow(rd, common.buy)}
                enableEmptySections
                removeClippedSubviews={false}
              />
              <ListView
                style={{
                  width: '50%',
                }}
                dataSource={this.shelvesSellDS(shelvesSell)}
                renderHeader={() => this.renderHeader(common.sell)}
                renderRow={rd => this.renderRow(rd, common.sell)}
                enableEmptySections
                removeClippedSubviews={false}
              />
            </View>
            : <ListView
              dataSource={this.latestDealsDS(latestDeals)}
              renderHeader={() => this.renderHeader('')}
              renderRow={rd => this.renderRow(rd, '')}
              enableEmptySections
              removeClippedSubviews={false}
            />
        }
      </View>
    )
  }
}

function mapStateToProps(store) {
  return {
    shelvesBuy: store.delegate.shelvesBuy,
    shelvesSell: store.delegate.shelvesSell,

    latestDeals: store.deal.latestDeals,

    homeRoseSelected: store.dealstat.homeRoseSelected,

    selectionBarSelected: store.ui.selectionBarSelected,
  }
}

export default connect(
  mapStateToProps,
)(DetailList)
