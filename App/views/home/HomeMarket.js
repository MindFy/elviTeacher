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
import HomeMarkHeader from './components/HomeMarkHeader'
import { modifyLastPriceSort, modifyChangeSort } from '../../actions/home'
import { getDefaultLanguage } from '../../utils/languageHelper'

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

  marketIcons = {
    TK: require('../../assets/market_TK.png'),
    BTC: require('../../assets/market_BTC.png'),
    ETH: require('../../assets/market_ETH.png'),
    ETC: require('../../assets/market_ETC.png'),
    LTC: require('../../assets/market_LTC.png'),
    EIEC: require('../../assets/market_EIEC.png'),
    MDT: require('../../assets/market_MDT.png'),
  }

  marketHeaderIcons = {
    headerIdle: require('../../assets/icon_change_normal.png'),
    headerDecending: require('../../assets/icon_change_decending.png'),
    headerAscending: require('../../assets/icon_change_ascending.png'),
  }

  compareWithKey = (array, sortTye, key) => {
    if (sortTye === 'decending') {
      return this.compareDecendingWithKey(array, key)
    }
    return this.compareAscendingWithKey(array, key)
  }

  compareDecendingWithKey = (array, key) => {
    const tempArray = array
    tempArray.sort((a, b) => {
      if (Number(a[key]) < Number(b[key])) {
        return 1
      } else if (Number(a[key]) > Number(b[key])) {
        return -1
      }
      return 0
    })
    return tempArray
  }

  compareAscendingWithKey = (array, key) => {
    const tempArray = array
    tempArray.sort((a, b) => {
      if (Number(a[key]) < Number(b[key])) {
        return -1
      } else if (Number(a[key]) > Number(b[key])) {
        return 1
      }
      return 0
    })
    return tempArray
  }

  configureData = (data) => {
    let tempData = [...data]
    if (getDefaultLanguage() !== 'zh_hans') {
      tempData = tempData.filter(e => e.currency.name !== 'CNYT')
    }
    const { lastPriceSortType } = this.props
    if (lastPriceSortType !== 'idle') {
      return this.compareWithKey(tempData, lastPriceSortType, 'cprice')
    }

    const { changeSortType } = this.props
    if (changeSortType !== 'idle') {
      return this.compareWithKey(tempData, changeSortType, 'rose')
    }

    return tempData
  }

  obtainIconImageBySortString = (sortString) => {
    if (sortString === 'idle') {
      return this.marketHeaderIcons.headerIdle
    } else if (sortString === 'decending') {
      return this.marketHeaderIcons.headerDecending
    } else if (sortString === 'ascending') {
      return this.marketHeaderIcons.headerAscending
    }
    throw new Error('must have sort string')
  }

  obtainNextSortString = (sortString) => {
    if (sortString === 'idle') {
      return 'decending'
    } else if (sortString === 'decending') {
      return 'ascending'
    } else if (sortString === 'ascending') {
      return 'idle'
    }
    throw new Error('must have sort string')
  }

  handleLastPrice = (sortString) => {
    const nextSortType = this.obtainNextSortString(sortString)
    this.props.dispatch(modifyLastPriceSort(nextSortType))
  }

  handleChange = (sortString) => {
    const nextSortType = this.obtainNextSortString(sortString)
    this.props.dispatch(modifyChangeSort(nextSortType))
  }

  renderHeader() {
    const { language, lastPriceSortType, changeSortType } = this.props
    const lastPirceIcon = this.obtainIconImageBySortString(lastPriceSortType)
    const changeIcon = this.obtainIconImageBySortString(changeSortType)
    return (
      <HomeMarkHeader
        lastPrice={transfer(language, 'home_pairLastPrice')}
        lastPriceIcon={lastPirceIcon}
        onPressLastPrice={() => { this.handleLastPrice(lastPriceSortType) }}
        change={transfer(language, 'home_change')}
        changeIcon={changeIcon}
        onPressChange={() => { this.handleChange(changeSortType) }}
      />
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
    const iconSource = this.marketIcons[rd.goods.name] || this.marketIcons.ETH
    const coinIdDic = common.getDefaultPair().coinIdDic
    let subName = null
    if (language === 'zh_hans') {
      if (coinIdDic[rd.goods.name]) {
        subName = `（${coinIdDic[rd.goods.name].cnName}）`
      }
    }
    return (
      <NextTouchableOpacity
        style={styles.row}
        activeOpacity={common.activeOpacity}
        onPress={() => onPress(rd)}
      >
        <View style={styles.rowIconView}>
          <Image
            style={styles.rowIcon}
            source={iconSource}
          />
        </View>

        <View style={styles.rowMiddleView}>
          <View style={styles.rowCoinView}>
            <Text style={styles.goods}>{rd.goods.name}</Text>
            {
              subName ?
                <Text style={styles.goodsMark}>{subName}</Text>
                :
                null
            }
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
    const listDS = this.configureData(data)
    return (
      <ListView
        dataSource={this.dataSource(listDS)}
        renderRow={rd => this.renderRow(rd)}
        renderHeader={() => this.renderHeader()}
        enableEmptySections
        removeClippedSubviews={false}
      />
    )
  }
}
