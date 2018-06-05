import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ListView,
} from 'react-native'
import { BigNumber } from 'bignumber.js'
import { common } from '../../../constants/common'


const styles = StyleSheet.create({
  shelvesList: {
    flexDirection: 'row',
    marginLeft: common.margin15,
    marginRight: common.margin15,
  },
  shelvesListHeaderView: {
    marginTop: common.margin10,
    borderBottomColor: common.placeholderColor,
    borderBottomWidth: 1,
  },
  shelvesListHeaderTitle: {
    color: common.placeholderColor,
    fontSize: common.font12,
    paddingBottom: common.margin5,
  },
  shelvesListRowView: {
    marginTop: common.margin5,
    marginLeft: 1,
    marginRight: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

class LastPriceList extends Component {
  constructor(props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
  }

  renderHeader(type) {
    let text = ''
    if (type === common.buy) {
      text = '买'
    } else if (type === common.sell) {
      text = '卖'
    }
    return (
      <View style={styles.shelvesListHeaderView}>
        <Text style={styles.shelvesListHeaderTitle}>
          {text}
        </Text>
      </View>
    )
  }


  renderShelvesRow(rd, rid, type) {
    const { selectedPair } = this.props
    let price
    let sumQuantity
    let title
    let titleColor
    let detail
    let detailColor
    common.precision(selectedPair.goods.name, selectedPair.currency.name, (p, q) => {
      price = new BigNumber(rd.price).toFixed(p, 1)
      sumQuantity = new BigNumber(rd.sum_quantity).toFixed(q, 1)
    })
    if (type === common.buy) {
      title = sumQuantity
      titleColor = common.textColor
      detail = price
      detailColor = common.redColor
    } else if (type === common.sell) {
      title = price
      titleColor = common.greenColor
      detail = sumQuantity
      detailColor = common.textColor
    }
    return (
      <View style={styles.shelvesListRowView}>
        <Text
          style={{
            fontSize: common.font12,
            color: titleColor,
          }}
        >{title}</Text>
        <Text
          style={{
            fontSize: common.font12,
            color: detailColor,
          }}
        >{detail}</Text>
      </View>
    )
  }

  render() {
    const { dataSource } = this.props
    return (
      <View style={styles.shelvesList}>
        <ListView
          style={{ width: '50%' }}
          dataSource={this.dataSource.cloneWithRows(dataSource.buy)}
          renderHeader={() => this.renderHeader(common.buy)}
          renderRow={(rd, sid, rid) => this.renderShelvesRow(rd, rid, common.buy)}
          enableEmptySections
          removeClippedSubviews={false}
        />
        <ListView
          style={{ width: '50%' }}
          dataSource={this.dataSource.cloneWithRows(dataSource.sell)}
          renderHeader={() => this.renderHeader(common.sell)}
          renderRow={(rd, sid, rid) => this.renderShelvesRow(rd, rid, common.sell)}
          enableEmptySections
          removeClippedSubviews={false}
        />
      </View>
    )
  }
}

export default LastPriceList
