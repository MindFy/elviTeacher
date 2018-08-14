import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Image } from 'react-native'
import { common } from '../../constants/common'
import MarketList2 from '../market/MarketList2'
import { requestPairInfo } from '../../actions/market'
import * as exchange from '../../actions/exchange'
import HeaderScrollView2 from '../market/HeaderScrollView2'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import transfer from '../../localization/utils'

class Market2 extends Component {
  static navigationOptions(props) {
    let title = ''
    if (props.navigation.state.params) {
      title = props.navigation.state.params.title
    }
    return {
      headerTitle: title,
      headerLeft:
        (
          <NextTouchableOpacity
            style={{
              height: common.w40,
              width: common.w40,
              justifyContent: 'center',
            }}
            activeOpacity={common.activeOpacity}
            onPress={() => props.navigation.goBack()}
          >
            <Image
              style={{
                marginLeft: common.margin10,
                width: common.w10,
                height: common.h20,
              }}
              source={require('../../assets/arrow_left_left.png')}
            />
          </NextTouchableOpacity>
        ),
    }
  }

  componentDidMount() {
    const { dispatch, selectedPair, navigation, language } = this.props
    navigation.setParams({
      title: transfer(language, 'market_market'),
    })
    dispatch(requestPairInfo({}))
    dispatch(exchange.updateCurrentPair({
      title: selectedPair.currency.name,
    }))
  }

  onClickItem = (item) => {
    const { dispatch } = this.props
    dispatch(exchange.updateCurrentPair({
      title: item.title,
    }))
  }

  cellPressAction(e) {
    const { currPair, dispatch, navigation } = this.props
    const coinsIdDic = common.getDefaultPair().coinIdDic
    const goods = {
      id: e.id,
      name: e.name,
    }
    const currency = {
      id: coinsIdDic[currPair].id,
      name: currPair,
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
    dispatch(exchange.updatePair(rd))
    const params = {
      goods_id: goods.id,
      currency_id: currency.id,
    }
    dispatch(exchange.requestValuation())
    dispatch(exchange.requestLastpriceList(params))
    dispatch(exchange.requestOrderhistoryList(params))
    dispatch(exchange.requestDepthMap(params))
    dispatch(exchange.updateSegmentIndex(0))
    dispatch(exchange.clearOpenOrders())
    // dispatch(exchange.updateKLineIndex(3))
    navigation.goBack()
  }

  render() {
    const { pairs, currPair, language } = this.props
    const items = ['CNYT', 'BTC', 'TK']
    let marketData = []
    if (pairs && pairs[currPair]) {
      marketData = pairs[currPair].sub
    }
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: common.bgColor,
        }}
      >
        <HeaderScrollView2
          titles={items}
          title={currPair}
          onClickItem={this.onClickItem}
        />
        <MarketList2
          language={language}
          data={marketData}
          currencyName={currPair}
          cellPressAction={rd => this.cellPressAction(rd)}
        />
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    selectedPair: state.exchange.selectedPair,
    pairs: state.market.pairs,
    currPair: state.exchange.currPair,
    language: state.system.language,
  }
}

export default connect(
  mapStateToProps,
)(Market2)
