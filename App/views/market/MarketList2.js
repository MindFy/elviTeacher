import React, { Component } from 'react'
import {
  View,
  Text,
  ListView,
  StyleSheet,
} from 'react-native'
import { BigNumber } from 'bignumber.js'
import { common } from '../../constants/common'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import transfer from '../../localization/utils'

const styles = StyleSheet.create({
  header: {
    height: common.getH(48),
    marginHorizontal: common.getH(10),
  },
  headerTextView: {
    flexDirection: 'row',
    marginTop: common.getH(20),
    marginBottom: common.getH(10),
  },
  underLine: {
    height: 0.5,
    backgroundColor: common.placeholderColor,
  },
  headerName: {
    width: common.getH(66),
    fontSize: common.getH(12),
    color: common.placeholderColor,
    textAlign: 'left',
  },
  headerPrice: {
    flex: 1,
    fontSize: common.getH(12),
    color: common.placeholderColor,
    textAlign: 'right',
  },
  row: {
    marginHorizontal: common.getH(10),
  },
  rowTextView: {
    flexDirection: 'row',
    height: common.getH(40),
  },
  rowNameView: {
    width: common.getH(66),
    flexDirection: 'row',
    alignSelf: 'center',
  },
  rowName: {
    fontSize: common.getH(12),
    color: common.textColor,
  },
  rowNameMark: {
    fontSize: common.getH(8),
    color: common.textColor,
    paddingBottom: common.getH(2),
    alignSelf: 'flex-end',
  },
  rowPrice: {
    flex: 1,
    fontSize: common.getH(12),
    color: common.textColor,
    textAlign: 'right',
    alignSelf: 'center',
  },
})

export default class MarketList2 extends Component {
  constructor(props) {
    super(props)
    this.listDS = data => new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(data)
  }

  renderHeader(language) {
    return (
      <View style={styles.header}>
        <View style={styles.headerTextView}>
          <Text style={styles.headerName}>
            {transfer(language, 'market_marketName')}
          </Text>
          <Text style={styles.headerPrice}>
            {transfer(language, 'market_marketVolume')}
          </Text>
          <Text style={styles.headerPrice}>
            {transfer(language, 'market_marketLastPrice')}
          </Text>
          <Text style={styles.headerPrice}>
            {transfer(language, 'market_24hourChange')}
          </Text>
        </View>
        <View style={styles.underLine} />
      </View>
    )
  }

  renderRow(rd, currencyName, language) {
    let typeColor = common.textColor
    let rose = new BigNumber(rd.rose).multipliedBy(100)
    let quantity
    let cprice
    let roseSymbol = ''
    if (rose.gt(0)) {
      typeColor = common.redColor
      roseSymbol = '+'
    } else if (rose.lt(0)) {
      typeColor = common.greenColor
    } else {
      typeColor = common.textColor
    }
    rose = rose.toFixed(2, 1)
    common.precision(rd.name, currencyName, (p, q) => {
      cprice = new BigNumber(rd.cprice).toFixed(p, 1)
      quantity = new BigNumber(rd.quantity).toFixed(q, 1)
    })

    return (
      <NextTouchableOpacity
        style={styles.row}
        onPress={() => {
          if (this.props.cellPressAction) {
            this.props.cellPressAction(rd, currencyName)
          }
        }}
        activeOpacity={common.activeOpacity}
      >
        <View style={styles.rowTextView}>
          <View style={styles.rowNameView}>
            <Text style={styles.rowName}>{rd.name}</Text>
            <Text style={styles.rowNameMark}>
              {`（${transfer(language, `home_${rd.name}Name`)}）`}
            </Text>
          </View>
          <Text style={styles.rowPrice}>{quantity}</Text>
          <Text style={[styles.rowPrice, {
            color: typeColor,
          }]}
          >{cprice}</Text>
          <Text style={[styles.rowPrice, {
            color: typeColor,
          }]}
          >{`${roseSymbol}${rose}%`}</Text>
        </View>

        <View style={styles.underLine} />
      </NextTouchableOpacity>
    )
  }

  render() {
    const { data, currencyName, language } = this.props
    return (
      <ListView
        dataSource={this.listDS(data)}
        renderRow={rd => this.renderRow(rd, currencyName, language)}
        renderHeader={() => this.renderHeader(language)}
        enableEmptySections
        removeClippedSubviews={false}
      />
    )
  }
}
