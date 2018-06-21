import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
} from 'react-native'
import { common } from '../../constants/common'
import MarketList from './MarketList'
import {
  requestPairInfo,
  updateCurrentPair,
} from '../../actions/market'
import HeaderScrollView from './HeaderScrollView'
import * as exchange from '../../actions/exchange'
import cache from '../../utils/cache'

class Market extends Component {
  static navigationOptions() {
    return {
      headerTitle: '市场',
    }
  }

  constructor(props) {
    super(props)
    props.navigation.addListener('didFocus', () => {
      cache.setObject('currentComponentVisible', 'Market')
    })
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(requestPairInfo({}))
    this.timeId = setInterval(() => {
      if (cache.getObject('currentComponentVisible') === 'Market') {
        dispatch(requestPairInfo({}))
      }
    }, common.refreshIntervalTime)
  }

  componentWillReceiveProps(nextProp) {
    const { pairs, dispatch } = this.props
    if (!Object.keys(pairs).length && Object.keys(nextProp.pairs).length) {
      dispatch(updateCurrentPair({
        title: 'CNYT',
      }))
    }
  }

  componentWillUnmount() {
    if (this.timeId) {
      clearInterval(this.timeId)
      this.timeId = null
    }
  }

  onClickItem = (item) => {
    const { dispatch } = this.props
    dispatch(updateCurrentPair({
      title: item.title,
    }))
  }

  onClickMarketItem = (e, currencyName) => {
    const goods = {
      id: e.id,
      name: e.name,
    }
    const currency = {
      id: this.coinsIdDic[currencyName].id,
      name: currencyName,
    }
    const rd = {
      goods,
      currency,
      cprice: e.cprice,
      hprice: e.hprice,
      lastprice: e.lastprice,
      lprice: e.lprice,
      quantity: e.quantity,
      rose: e.rose,
    }
    const { dispatch, navigation } = this.props
    dispatch(exchange.updatePair(rd))
    navigation.navigate('Deal')
  }

  coinsIdDic = {
    TK: {
      id: 1,
    },
    BTC: {
      id: 2,
    },
    CNYT: {
      id: 3,
    },
    ETH: {
      id: 5,
    },
    ETC: {
      id: 6,
    },
  }

  render() {
    const { currPair, pairs } = this.props

    const items = ['CNYT', 'BTC', 'TK']
    let index = 0
    let marketData = []
    if (pairs && pairs[currPair]) {
      marketData = pairs[currPair].sub
      index = items.indexOf(currPair)
    }
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: common.bgColor,
        }}
      >
        <HeaderScrollView
          initialIndexSelected={index}
          titles={items}
          onClickItem={this.onClickItem}
        />
        <MarketList
          data={marketData}
          currencyName={currPair}
          onClickMarketItem={this.onClickMarketItem}
        />
      </View>
    )
  }
}

function mapStateToProps(store) {
  return {
    currPair: store.market.currPair,
    pairs: store.market.pairs,
  }
}

export default connect(
  mapStateToProps,
)(Market)
