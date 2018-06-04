import {
  call,
  put,
  takeEvery,
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
  const response = yield call(api.graphql, action.payload)

  if (response.success) {
    yield put({
      type: 'home/request_announcements_succeed',
      payload: response.result.data.find_announcement,
    })
  } else {
    yield put({
      type: 'home/request_announcements_failed',
      payload: response.error,
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
