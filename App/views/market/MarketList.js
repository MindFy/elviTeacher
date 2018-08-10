import React, { Component } from 'react'
import {
  ListView,
} from 'react-native'
import { BigNumber } from 'bignumber.js'
import { common } from '../../constants/common'
import transfer from '../../localization/utils'

import {
  modifyDailyChangeSort,
  modifyNameSort,
  modifyVolumeSort,
  modifyLastPriceSort,
} from '../../actions/market'

import MarketDetailCell from './components/MarketDetailCell'
import MarketEditDetailCell from './components/MarketEditDetailCell'
import MarketMarkedCell from './components/MarketMarkedCell'
import MarketEditMarkedCell from './components/MarketEditMarkedCell'
import MarketDetailHeader from './components/MarketDetailHeader'

export default class MarketList extends Component {
  constructor(props) {
    super(props)
    this.listDS = data => new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(data)
  }

  getDetailCellData = (rd, language) => {
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
    common.precision(rd.goods.name, rd.currency.name, (p, q) => {
      cprice = new BigNumber(rd.cprice).toFixed(p, 1)
      quantity = new BigNumber(rd.quantity).toFixed(q, 1)
    })
    const isFavorited = rd.isFavorited || false

    return ({
      goods: rd.goods,
      currency: rd.currency,
      subName: `（${transfer(language, `home_${rd.goods.name}Name`)}）`,
      volume: quantity,
      lastPrice: cprice,
      lastPriceTextStyle: { color: typeColor },
      dailyChangeTextStyle: { color: typeColor },
      dailyChange: `${roseSymbol}${rose}%`,
      isFavorited,
    })
  }

  compareWithNameKey = (array, sortTye) => {
    const tempArray = array
    if (sortTye === 'decending') {
      tempArray.sort((a, b) => {
        if (a.goods.name < b.goods.name) {
          return 1
        } else if (a.goods.name > b.goods.name) {
          return -1
        }
        return 0
      })
      return tempArray
    }
    tempArray.sort((a, b) => {
      if (a.goods.name < b.goods.name) {
        return -1
      } else if (a.goods.name > b.goods.name) {
        return 1
      }
      return 0
    })
    return tempArray
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
    const tempData = [...data]
    const { nameSortType } = this.props
    if (nameSortType !== 'idle') {
      return this.compareWithNameKey(tempData, nameSortType)
    }

    const { volumeSortType } = this.props
    if (volumeSortType !== 'idle') {
      return this.compareWithKey(tempData, volumeSortType, 'quantity')
    }

    const { lastPriceSortType } = this.props
    if (lastPriceSortType !== 'idle') {
      return this.compareWithKey(tempData, lastPriceSortType, 'cprice')
    }

    const { dailyChangeSortType } = this.props
    if (dailyChangeSortType !== 'idle') {
      return this.compareWithKey(tempData, dailyChangeSortType, 'rose')
    }

    return tempData
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

  marketHeaderIcons = {
    headerIdle: require('../../assets/icon_change_normal.png'),
    headerDecending: require('../../assets/icon_change_decending.png'),
    headerAscending: require('../../assets/icon_change_ascending.png'),
  }

  handlePressMarked = (rd) => {
    if (this.props.onPressMarked) {
      this.props.onPressMarked(rd)
    }
  }

  handlePressName = (sortString) => {
    const nextSortType = this.obtainNextSortString(sortString)
    this.props.dispatch(modifyNameSort(nextSortType))
  }

  handlePresVolume = (sortString) => {
    const nextSortType = this.obtainNextSortString(sortString)
    this.props.dispatch(modifyVolumeSort(nextSortType))
  }

  handlePressLastPrice = (sortString) => {
    const nextSortType = this.obtainNextSortString(sortString)
    this.props.dispatch(modifyLastPriceSort(nextSortType))
  }

  handlePressDailyChange = (sortString) => {
    const nextSortType = this.obtainNextSortString(sortString)
    this.props.dispatch(modifyDailyChangeSort(nextSortType))
  }
  renderMarkedCell = (isEdit, cellData, rd) => {
    if (isEdit) {
      return (
        <MarketEditMarkedCell
          goodsName={cellData.goods.name}
          currencyName={cellData.currency.name}
          volume={cellData.volume}
          lastPrice={cellData.lastPrice}
          lastPriceTextStyle={cellData.lastPriceTextStyle}
          dailyChange={cellData.dailyChange}
          dailyChangeTextStyle={cellData.dailyChangeTextStyle}
          isFavorited={cellData.isFavorited}
          onPressMarked={() => { this.handlePressMarked(rd) }}
        />
      )
    }
    return (
      <MarketMarkedCell
        goodsName={cellData.goods.name}
        currencyName={cellData.currency.name}
        volume={cellData.volume}
        lastPrice={cellData.lastPrice}
        lastPriceTextStyle={cellData.lastPriceTextStyle}
        dailyChange={cellData.dailyChange}
        dailyChangeTextStyle={cellData.dailyChangeTextStyle}
        onPressCell={() => {
          if (this.props.onClickMarketItem) {
            this.props.onClickMarketItem(rd, rd.currency.name)
          }
        }}
      />
    )
  }

  renderHeader() {
    const {
      language,
      nameSortType,
      volumeSortType,
      lastPriceSortType,
      dailyChangeSortType,
      isEdit,
    } = this.props
    const nameIcon = this.obtainIconImageBySortString(nameSortType)
    const volumeIcon = this.obtainIconImageBySortString(volumeSortType)
    const lastPriceIcon = this.obtainIconImageBySortString(lastPriceSortType)
    const dailyChangeIcon = this.obtainIconImageBySortString(dailyChangeSortType)
    return (
      <MarketDetailHeader
        disabled={isEdit}
        name={transfer(language, 'market_marketName')}
        nameIcon={nameIcon}
        onPressName={() => { this.handlePressName(nameSortType) }}
        volume={transfer(language, 'market_marketVolume')}
        volumeIcon={volumeIcon}
        onPressVolume={() => { this.handlePresVolume(volumeSortType) }}
        lastPrice={transfer(language, 'market_marketLastPrice')}
        lastPriceIcon={lastPriceIcon}
        onPressLastPrice={() => { this.handlePressLastPrice(lastPriceSortType) }}
        dailyChange={transfer(language, 'market_24hourChange')}
        dailyChangeIcon={dailyChangeIcon}
        onPressDailyChange={() => { this.handlePressDailyChange(dailyChangeSortType) }}
      />
    )
  }

  renderRow(rd) {
    const { language, isEdit, currPair } = this.props
    const cellData = this.getDetailCellData(rd, language)
    if (currPair === transfer(language, 'market_favorites')) {
      return this.renderMarkedCell(isEdit, cellData, rd)
    }

    if (isEdit) {
      return (
        <MarketEditDetailCell
          name={cellData.goods.name}
          subName={cellData.subName}
          volume={cellData.volume}
          lastPrice={cellData.lastPrice}
          lastPriceTextStyle={cellData.lastPriceTextStyle}
          dailyChange={cellData.dailyChange}
          dailyChangeTextStyle={cellData.dailyChangeTextStyle}
          isFavorited={cellData.isFavorited}
          onPressMarked={() => { this.handlePressMarked(rd) }}
        />
      )
    }
    return (
      <MarketDetailCell
        name={cellData.goods.name}
        subName={cellData.subName}
        volume={cellData.volume}
        lastPrice={cellData.lastPrice}
        lastPriceTextStyle={cellData.lastPriceTextStyle}
        dailyChange={cellData.dailyChange}
        dailyChangeTextStyle={cellData.dailyChangeTextStyle}
        onPressCell={() => {
          if (this.props.onClickMarketItem) {
            this.props.onClickMarketItem(rd)
          }
        }}
      />
    )
  }

  render() {
    const { data } = this.props
    const listDS = this.configureData(data)
    return (
      <ListView
        dataSource={this.listDS(listDS)}
        renderRow={rd => this.renderRow(rd)}
        renderHeader={() => this.renderHeader()}
        enableEmptySections
        removeClippedSubviews={false}
      />
    )
  }
}
