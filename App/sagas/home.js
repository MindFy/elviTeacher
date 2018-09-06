import {
  call,
  put,
  takeEvery,
  select,
} from 'redux-saga/effects'
import * as api from '../services/api'
import getHomeMarket from '../utils'
import {
  common,
  storeSave,
} from '../constants/common'
import {
  DeviceEventEmitter,
} from 'react-native'

export function* requestBannersWorker(action) {
  const response = yield call(api.graphql, action.payload)

  if (response.success) {
    yield put({
      type: 'home/request_banners_succeed',
      payload: response.result.data.find_banners,
    })
  } else {
    yield put({
      type: 'home/request_banners_failed',
      payload: response.error,
    })
  }
}

export function* requestAnnouncementsWorker(action) {
  const lang = yield select(state => state.system.language)
  const dict = {
    zh_hans: 'zh-cn',
    zh_hant: 'zh-tw',
    ja: 'ja',
    ko: 'ko',
    en: 'en-us',
  }
  const uri = `${api.announcements1}${dict[lang]}${api.announcements2}`
  const response = yield call(api.getAPI(uri), action.payload)
  if (response.success) {
    let next = []
    try {
      const { articles } = response.result
      next = articles.map(e => ({
        id: e.id,
        title: e.title,
        content: '',
        imghash: e.html_url,
        createdAt: e.created_at,
      }))
    } catch (e) {
      // empty code
    }
    yield put({
      type: 'home/request_announcements_succeed',
      payload: next,
    })
  } else {
    yield put({
      type: 'home/request_announcements_failed',
      payload: [],
    })
  }
}

function* requestMarketWorker() {
  const response = yield call(api.getRose)
  if (response.success) {
    const market = response.result
    const homeMarket = getHomeMarket(market)

    yield put({
      type: 'home/request_market_succeed',
      payload: homeMarket,
    })
  } else {
    yield put({
      type: 'home/request_market_failed',
      payload: response.error,
    })
  }
}

export function* requestBanners() {
  yield takeEvery('home/request_banners', requestBannersWorker)
}

export function* requestAnnouncements() {
  yield takeEvery('home/request_announcements', requestAnnouncementsWorker)
}

export function* requestMarket() {
  yield takeEvery('home/request_market', requestMarketWorker)
}

// 转换币币对配置信息
function parseConfig(data) {
  const { tokens, coinPairs } = data
  const canWithdrawCoins = []
  const canRechargeAddress = []
  const coinIdDic = {}
  const accuracy = {}
  tokens.forEach((e) => {
    if (e.name !== 'CNY') {
      coinIdDic[e.name] = {
        id: e.id,
        fee: e.withdrawFee,
        minAmount: e.withdrawMin,
        name: e.name,
        cnName: e.cnName,
      }
      if (e.allowWithdraw) {
        canWithdrawCoins.push(e.name)
      }
      if (e.allowRecharge) {
        canRechargeAddress.push(e.name)
      }
    }
  })

  // 配置精度
  coinPairs.forEach((e) => {
    e.pairs.forEach((elem) => {
      accuracy[`${elem.name}_${e.name}`] = {
        priceLimit: Number(elem.priceLimit),
        quantityLimit: Number(elem.quantityLimit),
        moneyLimit: Number(elem.moneyLimit),
        istransaction: elem.istransaction
      }
    })
  })
  return {
    canWithdrawCoins,
    canRechargeAddress,
    coinIdDic,
    accuracy,
  }
}


function* requestPairsWorker() {
  const response = yield call(api.getToken)
  if (response.success) {
    yield put({
      type: 'home/request_pair_success',
      payload: parseConfig(response.result),
    })
    storeSave(common.noti.requestPairs, parseConfig(response.result), (e) => {})
    DeviceEventEmitter.emit(common.noti.requestPairs)
  } else {
    yield put({
      type: 'home/request_pair_failed',
      payload: undefined,
    })
  }

}


export function* requestPairs() {
  yield takeEvery('home/request_pair_request', requestPairsWorker)
}
