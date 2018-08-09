import {
  call,
  put,
  takeEvery,
  select,
} from 'redux-saga/effects'
import * as api from '../services/api'
import getHomeMarket from '../utils'

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
    coinIdDic[e.name] = {
      id: e.id,
      fee: e.withdrawFree,
      minAmount: e.withdrawMin,
    }
    if (e.allowWithdraw) {
      canWithdrawCoins.push(e.name)
    }
    if (e.allowRecharge) {
      canRechargeAddress.push(e.name)
    }
  })

  // 配置精度
  coinPairs.forEach((e) => {
    e.pairs.forEach((elem) => {
      accuracy[`${elem.name}_${e.name}`] = {
        priceLimit: elem.priceLimit,
        quantityLimit: elem.quantityLimit,
        moneyLimit: elem.moneyLimit,
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
  yield put({
    type: 'home/request_pair_success',
    payload: parseConfig(require('../constants/response.json')),
  })
}


export function* requestPairs() {
  yield takeEvery('home/request_pair_request', requestPairsWorker)
}
