import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  ListView,
  StyleSheet,
} from 'react-native'
import { BigNumber } from 'bignumber.js'
import {
  common,
} from '../../constants/common'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import transfer from '../../localization/utils'

const styles = StyleSheet.create({
  header: {
    marginTop: common.margin10,
    marginLeft: common.margin10,
    marginRight: common.margin10,
    marginBottom: common.margin10,
    flexDirection: 'row',
  },
  headerTitle: {
    color: common.placeholderColor,
    fontSize: common.font12,
    textAlign: 'center',
  },
  row: {
    marginLeft: common.margin10,
    marginRight: common.margin10,
    marginBottom: common.margin10,
    borderRadius: common.radius6,
    backgroundColor: common.borderColor,
    flexDirection: 'row',
  },
  rowIcon: {
    marginLeft: common.margin20,
    height: common.h40,
    width: common.h40,
  },
  rowIconView: {
    width: '25%',
    justifyContent: 'center',
  },
  rowMiddleView: {
    width: '45%',
    justifyContent: 'center',
  },
  rowCoinView: {
    flex: 1,
    marginTop: common.margin10,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  goods: {
    color: common.textColor,
    fontSize: common.font20,
    alignSelf: 'center',
    textAlign: 'center',
  },
  goodsMark: {
    color: common.textColor,
    fontSize: common.getH(10),
    paddingBottom: common.getH(3),
    alignSelf: 'flex-end',
    textAlign: 'center',
  },
  currency: {
    color: common.placeholderColor,
    fontSize: common.font16,
    paddingBottom: 0,
    alignSelf: 'flex-end',
    textAlign: 'center',
  },
  cpriceView: {
    marginTop: common.margin5,
    marginBottom: common.margin10,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  dirImage: {
    height: common.w10,
    width: common.w10,
    alignSelf: 'center',
  },
  cprice: {
    marginLeft: common.margin5,
    fontSize: common.font12,
    alignSelf: 'center',
    textAlign: 'center',
  },
  rose: {
    width: '30%',
    fontSize: common.font16,
    alignSelf: 'center',
    textAlign: 'center',
  },
})

export default class HomeMarket extends Component {
  constructor() {
    super()
    this.dataSource = data => new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(data)
  }

  renderHeader() {
    const { language } = this.props
    return (
      <View style={styles.header}>
        <Text style={{ width: '30%' }} />
        <Text style={[styles.headerTitle, { width: '40%' }]}>    {transfer(language, 'home_pairLastPrice')}</Text>
        <Text style={[styles.headerTitle, { width: '30%' }]}>{transfer(language, 'home_change')}</Text>
      </View>
    )
  }

  renderRow(rd) {
    const { onPress, language } = this.props
    let dirImageSource
    let priceColor = null
    let rangeColor = null
    let rose = new BigNumber(rd.rose).multipliedBy(100)
    let cprice
    let roseSymbol = ''
    if (rose.gt(0)) {
      priceColor = common.redColor
      rangeColor = common.redColor
      roseSymbol = '+'
      dirImageSource = require('../../assets/red_arrow_up.png')
    } else if (rose.lt(0)) {
      priceColor = common.greenColor
      rangeColor = common.greenColor
      dirImageSource = require('../../assets/down_arrow_green.png')
    } else {
      priceColor = common.textColor
      rangeColor = common.textColor
    }
    rose = rose.toFixed(2, 1)
    common.precision(rd.goods.name, rd.currency.name, (p) => {
      cprice = new BigNumber(rd.cprice).toFixed(p, 1)
    })

    return (
      <NextTouchableOpacity
        style={styles.row}
        activeOpacity={common.activeOpacity}
        onPress={() => onPress(rd)}
      >
        <View style={styles.rowIconView}>
          <Image
            style={styles.rowIcon}
            source={require('../../assets/111.png')}
          />
        </View>

        <View style={styles.rowMiddleView}>
          <View style={styles.rowCoinView}>
            <Text style={styles.goods}>{rd.goods.name}</Text>
            <Text style={styles.goodsMark}>{`（${transfer(language, `home_${rd.goods.name}Name`)}）`}</Text>
            <Text style={styles.currency}>{`/${rd.currency.name}`}</Text>
          </View>

          <View style={styles.cpriceView}>
            {dirImageSource ?
              <Image
                style={styles.dirImage}
                source={dirImageSource}
              /> : null}
            <Text style={[styles.cprice, { color: priceColor }]}>
              {cprice}
            </Text>
          </View>
        </View>

        <Text style={[styles.rose, { color: rangeColor }]}>
          {`${roseSymbol}${rose}%`}
        </Text>
      </NextTouchableOpacity>
    )
  }

  render() {
    const { data } = this.props
    return (
      <ListView
        dataSource={this.dataSource(data)}
        renderRow={rd => this.renderRow(rd)}
        renderHeader={() => this.renderHeader()}
        enableEmptySections
        removeClippedSubviews={false}
      />
    )
  }
}
