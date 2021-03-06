import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import Toast from 'antd-mobile/lib/toast'
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
import actions from '../../actions/index'
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
    this.pairData = {}
    props.navigation.addListener('didFocus', () => {
      props.dispatch(actions.requestShowPairs())
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
    const { dispatch, navigation, language } = this.props
    cache.setObject('currentComponentVisible', 'Market')
    dispatch(requestPairInfo({}))
    const params = navigation.state.params || {}
    if (params.fromDeal && params.currencyName) {
      dispatch(updateCurrentPair({ title: navigation.state.params.currencyName }))
    } else if (getDefaultLanguage() === 'zh_hans') {
      dispatch(updateCurrentPair({ title: 'CNYT' }))
    } else {
      dispatch(updateCurrentPair({ title: 'BTC' }))
    }
    if(this.props.pairs && this.props.pairs.length === 0){
      Toast.loading(transfer(language, 'exchange_loadingData'), 0)
    }
    this.timeId = setInterval(() => {
      if (cache.getObject('currentComponentVisible') === 'Market') {
        dispatch(requestPairInfo({}))
        dispatch(actions.requestShowPairs())
      }
    }, common.refreshIntervalTime)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.pairs.length !== 0 && this.props.pairs.length === 0) {
      Toast.hide()
    }
    if (nextProps.language !== this.props.language &&
      this.props.language === 'zh_hans' &&
      this.props.currPair === 'CNYT') {
      this.props.dispatch(updateCurrentPair({ title: 'BTC' }))
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

  obtainMarketData = (pairs, showRawPairData) => {
    const { currPair, language, favoriteList } = this.props
    const marketData = []
    marts = this.getMarketInfo(pairs, showRawPairData);
    if (marts && currPair === transfer(language, 'market_favorites')) {
      for (let i = 0; i < marts.length; i++) {
        const ones = marts[i]
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
    } else if (marts) {
      for (let i = 0; i < marts.length; i++) {
        const ones = marts[i]
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

  getMarketInfo(res, tokens) {
    const exclusion = window.exclusion || []
    var marketRose = []
    tokens.coinPairs.forEach(cp => {
      var roseMarket = res.filter(it => {
        return it.id === cp.id
      })
      if (roseMarket.length === 0) return
  
      var sub = []
      cp.pairs.forEach(pair => {
        var roseCoin = roseMarket[0].sub.filter(it => {
          return (it.id === pair.id && pair.istransaction)
        })
  
        if (roseCoin.length === 0) return
        var coinPair = {
          ...roseCoin[0]
        }
        sub.push(coinPair)
      })
      if (sub.length > 0) {
        var market = {
          ...roseMarket[0],
          sub: sub
        }
        marketRose.push(market)
      }
    })
  
    return marketRose
  }

  render() {
    const { currPair, language, isEdit, pairs, showPairData, showRawPairData } = this.props
    let marketData = []
    if(showRawPairData && showRawPairData.coinPairs && pairs){
      marketData = this.obtainMarketData(pairs, showRawPairData)
    }

    let marketTitles = []
    if(showRawPairData && showRawPairData.coinPairs){
      marketTitles.push(transfer(language, 'market_favorites'))
      showRawPairData.coinPairs.map(e => {
        if((e.name !== 'CNYT' || getDefaultLanguage() === 'zh_hans') && Object.keys(e.pairs).length !== 0){
          marketTitles.push(e.name)
        }
      })
    }

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
    showPairData: state.home.requestShowPair,
    showRawPairData: state.home.requestShowRawPair
  }
}

export default connect(
  mapStateToProps,
)(Market)
