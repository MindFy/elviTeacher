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

class Market extends Component {
  static navigationOptions() {
    return {
      headerTitle: '市场',
      headerStyle: {
        backgroundColor: common.navBgColor,
        borderBottomWidth: 0,
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontSize: common.font16,
      },
      headerLeft: null,
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(requestPairInfo({}))
  }

  onClickItem = (item) => {
    const { dispatch } = this.props
    dispatch(updateCurrentPair({
      title: item.title,
    }))
  }

  render() {
    const { currPair, pairs } = this.props

    const items = ['CNYT', 'BTC', 'TK']
    const marketData = []
    if (pairs && pairs[currPair]) {
      // marketData = pairs[currPair]
    }
    // todo 未完待续
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: common.bgColor,
        }}
      >
        <HeaderScrollView
          titles={items}
          onClickItem={this.onClickItem}
        />
        <MarketList
          data={marketData}
          currencyName={currPair}
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
