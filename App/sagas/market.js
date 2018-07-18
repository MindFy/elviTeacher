import {
  call,
  put,
  takeEvery,
  takeLatest,
  select,
} from 'redux-saga/effects'
import * as api from '../services/api'
import transfer from '../localization/utils'

const getFavoriteList = state => state.market.favoriteList

export function* requestPairInfoWorker(action) {
  const { payload } = action
  const response = yield call(api.getRose, payload)

  if (response.success) {
    const result = response.result
    yield put({
      type: 'withdraw/request_pair_info_succeed',
      payload: result,
    })
  } else {
    yield put({
      type: 'withdraw/request_pair_info_failed',
      payload: response.error,
    })
  }
}

function* getFavorite(action) {
  const { payload } = action

  const resp = yield call(api.getFavorite, payload)
  if (resp.success) {
    const dict = resp.result.favoriteLists
    yield put({
      type: 'market/get_favorite_success',
      payload: dict,
    })
    const initialized = yield select(state => state.market.initialized)
    if (!initialized && Object.keys(dict).length > 0) {
      const language = yield select(state => state.system.language)
      yield put({
        type: 'withdraw/update_current_pair',
        payload: { title: transfer(language, 'market_favorites') },
      })
    } else if (!initialized) {
      yield put({
        type: 'withdraw/update_current_pair',
        payload: { title: 'CNYT' },
      })
    }
  } else {
    const error = resp.error
    yield put({
      type: 'market/get_favorite_failed',
      payload: error,
    })
    const initialized = yield select(state => state.market.initialized)
    if (!initialized) {
      yield put({
        type: 'withdraw/update_current_pair',
        payload: { title: 'CNYT' },
      })
    }
  }
  yield put({
    type: 'market/set_initialized_state',
    payload: { initialized: true },
  })
}

function* setFavoriteAdd(action) {
  const { payload } = action
  const parms = { goods_id: payload.goods.id, currency_id: payload.currency.id }
  const resp = yield call(api.userFavoriteLists, parms)

  if (resp.success) {
    const dict = resp.result.favoriteLists
    yield put({
      type: 'market/get_favorite_success',
      payload: dict,
    })
  } else {
    yield put({
      type: 'market/get_favorite_failed',
    })
  }
}

function* setFavoriteRemove(action) {
  const { payload } = action
  const parms = { goods_id: payload.goods.id, currency_id: payload.currency.id }
  const resp = yield call(api.userFavoriteLists, parms)

  if (resp.success) {
    const dict = resp.result.favoriteLists
    yield put({
      type: 'market/get_favorite_success',
      payload: dict,
    })
  } else {
    yield put({
      type: 'market/get_favorite_failed',
    })
  }
}

function* setFavorite(action) {
  const { payload } = action
  const { goods, currency } = payload
  const favoriteList = yield select(getFavoriteList)
  if (favoriteList &&
    Object.keys(favoriteList).some(key => key === `${goods.id}_${currency.id}`)) {
    yield call(setFavoriteRemove, action)
  } else {
    yield call(setFavoriteAdd, action)
  }
}

export function* requestPairInfo() {
  yield takeEvery('withdraw/request_pair_info', requestPairInfoWorker)
}

export function* watchGetFavorite() {
  yield takeLatest('market/get_favorite_request', getFavorite)
}

export function* watchSetFavorite() {
  yield takeLatest('market/set_favorite_request', setFavorite)
}

