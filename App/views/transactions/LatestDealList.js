import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  ListView,
} from 'react-native'
import { BigNumber } from 'bignumber.js'
import { common } from '../../constants/common'

class LatestDealList extends Component {
  constructor() {
    super()

    this.latestDealsDS = data => new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(data)
  }

  renderLatestDealsRow(rd) {
    const { homeRoseSelected } = this.props
    let textColor = null
    let dealPrice
    let quantity
    if (rd.endDirect === 'buy') {
      textColor = common.redColor
    } else if (rd.endDirect === 'sell') {
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
          marginTop: common.margin10 / 2,
          marginLeft: common.margin10,
          marginRight: common.margin10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{
          flex: 1,
          color: 'white',
          fontSize: common.font12,
          textAlign: 'left',
        }}
        >{createdAt}</Text>
        <Text style={{
          flex: 1,
          color: textColor,
          fontSize: common.font12,
          textAlign: 'center',
        }}
        >{dealPrice}</Text>
        <Text style={{
          flex: 1,
          color: 'white',
          fontSize: common.font12,
          textAlign: 'right',
        }}
        >{quantity}</Text>
      </View>
    )
  }

  renderLatestDealsHeader() {
    return (
      <View>
        <View style={{
          height: common.h32,
          backgroundColor: common.navBgColor,
          flexDirection: 'row',
        }}
        >
          <Text style={{
            marginLeft: common.margin10,
            color: common.textColor,
            fontSize: common.font14,
            alignSelf: 'center',
          }}
          >最新成交</Text>
        </View>

        <View
          style={{
            marginTop: common.margin10,
            marginLeft: common.margin10,
            marginRight: common.margin10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{
            color: common.placeholderColor,
            fontSize: common.font12,
            alignSelf: 'center',
          }}
          >时间</Text>
          <Text style={{
            color: common.placeholderColor,
            fontSize: common.font12,
            alignSelf: 'center',
          }}
          >价格</Text>
          <Text style={{
            color: common.placeholderColor,
            fontSize: common.font12,
            alignSelf: 'center',
          }}
          >数量</Text>
        </View>
      </View>
    )
  }

  render() {
    const { latestDeals } = this.props

    return (
      <ListView
        style={{
          marginTop: common.margin10,
          marginBottom: common.margin10,
        }}
        dataSource={this.latestDealsDS(latestDeals)}
        renderRow={(rd, sid, rid) => this.renderLatestDealsRow(rd, sid, rid)}
        renderHeader={() => this.renderLatestDealsHeader()}
        enableEmptySections
        removeClippedSubviews={false}
      />
    )
  }
}

function mapStateToProps(store) {
  return {
    latestDeals: store.deal.latestDeals,

    homeRoseSelected: store.dealstat.homeRoseSelected,
  }
}

export default connect(
  mapStateToProps,
)(LatestDealList)
