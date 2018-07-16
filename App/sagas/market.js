import {
  call,
  put,
  takeEvery,
  takeLatest,
  select,
} from 'redux-saga/effects'
import * as api from '../services/api'

const getFavoriteList = state => state.market.favoriteList

export function* requestPairInfoWorker(action) {
  const { payload } = action
  const response = yield call(api.getRose, payload)
  const tmepMarkedTokens = []

  if (response.success) {
    const result = {}
    const favoriteList = yield select(getFavoriteList)
    for (let i = 0; i < response.result.length; i++) {
      const ones = response.result[i]
      const tempTokens = []
      for (let j = 0; j < ones.sub.length; j++) {
        const one = ones.sub[j]
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
          tempTokens.push(newObj)
          tmepMarkedTokens.push(newObj)
        } else {
          tempTokens.push(obj)
        }
        if (j === ones.sub.length - 1) {
          result[ones.name] = tempTokens
        }
      }
      result.markedTokens = tmepMarkedTokens
    }

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
  } else {
    const error = resp.error
    yield put({
      type: 'market/get_favorite_failed',
      payload: error,
    })
  }
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

    const { currency, goods } = payload
    const pairs = yield select(state => state.market.pairs)
    const newPairs = { ...pairs }
    const ones = newPairs[currency.name]
    for (let i = 0; i < ones.length; i++) {
      const one = ones[i]
      if (one.goods.id === goods.id && one.currency.id === currency.id) {
        one.isFavorited = true
        const temp = newPairs.markedTokens || []
        temp.push(one)
        newPairs.markedTokens = temp
        break
      }
    }
    yield put({
      type: 'market/set_favorite_success',
      payload: newPairs,
    })
  } else {
    yield put({
      type: 'market/set_favorite_failed',
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

    const { currency, goods } = payload
    const pairs = yield select(state => state.market.pairs)
    const newPairs = { ...pairs }
    const ones = newPairs[currency.name]
    for (let i = 0; i < ones.length; i++) {
      const one = ones[i]
      if (one.goods.id === goods.id && one.currency.id === currency.id) {
        one.isFavorited = false
        const temp = newPairs.markedTokens || []
        for (let j = 0; j < temp.length; j++) {
          const tempOne = temp[j]
          if (tempOne.goods.id === one.goods.id) {
            temp.splice(j, 1)
            newPairs.markedTokens = temp
            break
          }
        }
      }
    }
    yield put({
      type: 'market/set_favorite_success',
      payload: newPairs,
    })
  } else {
    yield put({
      type: 'market/set_favorite_failed',
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

