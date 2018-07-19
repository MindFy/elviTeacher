import React, { Component } from 'react'
import {
  ListView,
} from 'react-native'
import { BigNumber } from 'bignumber.js'
import { common } from '../../constants/common'
import transfer from '../../localization/utils'

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

  getDetailCellData = (rd, currencyName, language) => {
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
    common.precision(rd.goods.name, currencyName, (p, q) => {
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

  handlePressMarked = (rd) => {
    if (this.props.onPressMarked) {
      this.props.onPressMarked(rd)
    }
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
    const { language } = this.props
    return (
      <MarketDetailHeader
        name={transfer(language, 'market_marketName')}
        volume={transfer(language, 'market_marketVolume')}
        lastPrice={transfer(language, 'market_marketLastPrice')}
        dailyChange={transfer(language, 'market_24hourChange')}
      />
    )
  }

  renderRow(rd, currencyName) {
    const { language, isEdit, currPair } = this.props
    const cellData = this.getDetailCellData(rd, currencyName, language)
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
            this.props.onClickMarketItem(rd, currencyName)
          }
        }}
      />
    )
  }

  render() {
    const { data, currencyName } = this.props
    return (
      <ListView
        dataSource={this.listDS(data)}
        renderRow={rd => this.renderRow(rd, currencyName)}
        renderHeader={() => this.renderHeader()}
        enableEmptySections
        removeClippedSubviews={false}
      />
    )
  }
}
