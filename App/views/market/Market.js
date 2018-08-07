import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { common } from '../../constants/common'
import MarketList from './MarketList'
import {
  requestPairInfo,
  updateCurrentPair,
  toggleEdit,
  getFavorite,
  setFavorite,
  modifyDailyChangeSort,
  modifyNameSort,
  modifyVolumeSort,
  modifyLastPriceSort,
} from '../../actions/market'
import HeaderScrollView from './HeaderScrollView'
import * as exchange from '../../actions/exchange'
import cache from '../../utils/cache'
import { getDefaultLanguage } from '../../utils/languageHelper'
import transfer from '../../localization/utils'
import NavigationItem from '../../components/NavigationItem'

class Market extends Component {
  static navigationOptions({ navigation }) {
    const title = transfer(getDefaultLanguage(), 'market_market')
    let editPress
    let headerRightTitle = ''
    let headerLeft = null
    const params = navigation.state.params || {}

    if (params) {
      headerRightTitle =
        params.isFavoritedMode ?
          transfer(getDefaultLanguage(), 'market_complete') :
          transfer(getDefaultLanguage(), 'market_add_favorites')

      editPress = params.editPress
      headerLeft = params.fromDeal &&
        (
          <NavigationItem
            icon={require('../../assets/arrow_left_left.png')}
            iconStyle={{
              marginLeft: common.margin10,
              width: common.w10,
              height: common.h20,
            }}
            onPress={() => {
              cache.setObject('currentComponentVisible', 'Deal')
              navigation.goBack()
            }}
          />
        )
    }
    return {
      headerTitle: title,
      headerRight: (
        <NavigationItem
          title={headerRightTitle}
          onPress={editPress}
        />
      ),
      headerLeft,
    }
  }

  constructor(props) {
    super(props)
    props.navigation.addListener('didFocus', () => {
      cache.setObject('currentComponentVisible', 'Market')
      this.resetSortState()
      this.isNeedtoGetFavorites()
    })
    props.navigation.addListener('didBlur', () => {
      props.dispatch(toggleEdit(false))
      props.navigation.setParams({ isFavoritedMode: false })
    })
  }

  componentWillMount() {
    this.props.navigation.setParams({
      editPress: this.pressEdit,
      isFavoritedMode: false,
    })
  }

  componentDidMount() {
    const { dispatch, navigation } = this.props
    cache.setObject('currentComponentVisible', 'Market')
    dispatch(requestPairInfo({}))
    const params = navigation.state.params || {}
    if (params.fromDeal && params.currencyName) {
      dispatch(updateCurrentPair({ title: navigation.state.params.currencyName }))
    } else {
      dispatch(updateCurrentPair({ title: 'CNYT' }))
    }
    this.timeId = setInterval(() => {
      if (cache.getObject('currentComponentVisible') === 'Market') {
        dispatch(requestPairInfo({}))
      }
    }, common.refreshIntervalTime)
  }

  componentWillUnmount() {
    if (this.timeId) {
      clearInterval(this.timeId)
      this.timeId = null
    }
  }

  onClickItem = (item) => {
    const { dispatch } = this.props
    if (item.index === 0 && this.props.loggedIn) {
      dispatch(getFavorite())
    }
    dispatch(updateCurrentPair({
      title: item.title,
    }))
  }

  onClickMarketItem = (e) => {
    if (this.props.navigation.state.params.fromDeal) {
      this.jumpBackToDeal(e)
      return
    }
    const { dispatch, navigation } = this.props
    dispatch(exchange.setFavoriteSuccess(e.isFavorited))
    dispatch(exchange.updatePair(e))
    navigation.navigate('Deal')
  }

  handlePressMarked = (rd) => {
    const { dispatch } = this.props
    const parms = { currency: rd.currency, goods: rd.goods }
    dispatch(setFavorite(parms))
  }

  resetSortState = () => {
    const { dispatch } = this.props
    dispatch(modifyDailyChangeSort('idle'))
    dispatch(modifyNameSort('idle'))
    dispatch(modifyVolumeSort('idle'))
    dispatch(modifyLastPriceSort('idle'))
  }

  isNeedtoGetFavorites = () => {
    if (this.props.initialized || !this.props.loggedIn) {
      return
    }
    this.props.dispatch(getFavorite())
  }

  jumpBackToDeal = (e) => {
    const { dispatch } = this.props
    dispatch(exchange.updatePair(e))
    const params = {
      goods_id: e.goods.id,
      currency_id: e.currency.id,
    }
    dispatch(exchange.checkFavorite({ goods: e.goods, currency: e.currency }))
    dispatch(exchange.requestValuation())
    dispatch(exchange.requestLastpriceList(params))
    dispatch(exchange.requestOrderhistoryList(params))
    dispatch(exchange.requestDepthMap(params))
    dispatch(exchange.updateSegmentIndex(0))
    dispatch(exchange.clearOpenOrders())
    // dispatch(exchange.updateKLineIndex(3))
    cache.setObject('currentComponentVisible', 'Deal')
    this.props.navigation.goBack()
  }

  pressEdit = () => {
    if (!this.props.loggedIn) {
      this.props.navigation.navigate('LoginStack')
      return
    }
    const { isEdit, dispatch, navigation } = this.props
    let isFavoritedMode
    if (!isEdit) {
      cache.setObject('currentComponentVisible', 'unknown')
      isFavoritedMode = true
    } else {
      cache.setObject('currentComponentVisible', 'Market')
      isFavoritedMode = false
    }
    navigation.setParams({ isFavoritedMode })
    dispatch(toggleEdit(!isEdit))
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

  obtainMarketData = () => {
    const { currPair, pairs, language, favoriteList } = this.props
    const marketData = []
    if (pairs && currPair === transfer(language, 'market_favorites')) {
      for (let i = 0; i < pairs.length; i++) {
        const ones = pairs[i]
        for (let j = 0; j < ones.sub.length; j++) {
          const one = ones.sub[j]
          if (favoriteList &&
            Object.keys(favoriteList).some(key => key === `${one.id}_${ones.id}`)) {
            const obj = {
              goods: {
                id: one.id,
                name: one.name,
              },
              currency: {
                id: ones.id,
                name: ones.name,
              },
              cprice: one.cprice,
              hprice: one.hprice,
              lastprice: one.lastprice,
              lprice: one.lprice,
              quantity: one.quantity,
              rose: one.rose,
              isFavorited: true,
            }
            marketData.push(obj)
          }
        }
      }
    } else if (pairs) {
      for (let i = 0; i < pairs.length; i++) {
        const ones = pairs[i]
        for (let j = 0; j < ones.sub.length; j++) {
          const one = ones.sub[j]
          if (ones.name === currPair) {
            const obj = {
              goods: {
                id: one.id,
                name: one.name,
              },
              currency: {
                id: ones.id,
                name: ones.name,
              },
              cprice: one.cprice,
              hprice: one.hprice,
              lastprice: one.lastprice,
              lprice: one.lprice,
              quantity: one.quantity,
              rose: one.rose,
            }
            if (favoriteList &&
              Object.keys(favoriteList).some(key => key === `${one.id}_${ones.id}`)) {
              const newObj = { ...obj, isFavorited: true }
              marketData.push(newObj)
            } else {
              marketData.push(obj)
            }
          }
        }
      }
    }

    return marketData
  }

  render() {
    const { currPair, language, isEdit } = this.props
    const marketData = this.obtainMarketData()
    const marketTitles = [transfer(language, 'market_favorites'), 'CNYT', 'BTC', 'TK']
    const index = marketTitles.indexOf(currPair)

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: common.bgColor,
        }}
      >
        <HeaderScrollView
          indexSelected={index}
          titles={marketTitles}
          onClickItem={this.onClickItem}
        />
        <MarketList
          {...this.props}
          language={language}
          data={marketData}
          isEdit={isEdit}
          onClickMarketItem={this.onClickMarketItem}
          onPressMarked={this.handlePressMarked}
        />
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    currPair: state.market.currPair,
    pairs: state.market.pairs,
    favoriteList: state.market.favoriteList,
    isEdit: state.market.isEdit,
    initialized: state.market.initialized,
    nameSortType: state.market.nameSortType,
    volumeSortType: state.market.volumeSortType,
    lastPriceSortType: state.market.lastPriceSortType,
    dailyChangeSortType: state.market.dailyChangeSortType,
    loggedIn: state.authorize.loggedIn,
    language: state.system.language,
  }
}

export default connect(
  mapStateToProps,
)(Market)
