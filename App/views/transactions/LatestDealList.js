import React, { Component } from 'react'
import {
  View,
  Text,
  ListView,
  StyleSheet,
} from 'react-native'
import { common } from '../../constants/common'
import transfer from '../../localization/utils'

const styles = StyleSheet.create({
  rowView: {
    marginTop: common.margin10 / 2,
    marginLeft: common.margin15,
    marginRight: common.margin15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowText: {
    flex: 1,
    color: 'white',
    fontSize: common.font12,
  },
  headerView: {
    marginTop: common.margin10,
    marginLeft: common.margin15,
    marginRight: common.margin15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    color: common.placeholderColor,
    fontSize: common.font12,
    alignSelf: 'center',
  },
})

export default class LatestDealList extends Component {
  constructor() {
    super()

    this.dataSource = data => new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(data)
  }

  renderRow(rd) {
    let textColor
    if (rd.direct === 'buy') {
      textColor = common.redColor
    } else if (rd.direct === 'sell') {
      textColor = common.greenColor
    }
    return (
      <View style={styles.rowView}>
        <Text style={styles.rowText}>
          {rd.createdAt}
        </Text>
        <Text style={[styles.rowText, {
          color: textColor,
          textAlign: 'center',
        }]}
        >{rd.price}</Text>
        <Text style={[styles.rowText, {
          textAlign: 'right',
        }]}
        >{rd.quantity}</Text>
      </View>
    )
  }

  renderHeader() {
    const { language } = this.props
    return (
      <View style={styles.headerView}>
        <Text style={styles.headerText}>
          {transfer(language, 'exchange_lastTime')}
        </Text>
        <Text style={styles.headerText}>
          {transfer(language, 'exchange_price')}
        </Text>
        <Text style={styles.headerText}>
          {transfer(language, 'exchange_quality')}
        </Text>
      </View>
    )
  }

  render() {
    const { data } = this.props

    return (
      <ListView
        dataSource={this.dataSource(data)}
        renderRow={(rd, sid, rid) => this.renderRow(rd, rid)}
        renderHeader={() => this.renderHeader()}
        enableEmptySections
        removeClippedSubviews={false}
      />
    )
  }
}
