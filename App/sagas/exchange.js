import {
  call,
  put,
  takeEvery,
  select,
  takeLatest,
} from 'redux-saga/effects'
import * as api from '../services/api'

export function* requestLastpriceListWorker(action) {
  const { payload } = action
  const response = yield call(api.getShelves, payload)

  if (response.success) {
    const result = response.result
    const buy = result.buy.sort((x1, x2) => Number(x2.price) - Number(x1.price))
    const sell = result.sell.sort((x1, x2) => Number(x1.price) - Number(x2.price))
    yield put({
      type: 'exchange/request_lastprice_list_succeed',
      payload: {
        buy,
        sell,
      },
    })
  } else {
    yield put({
      type: 'exchange/request_lastprice_list_failed',
      payload: {
        buy: [],
        sell: [],
      },
    })
  }
}

export function* requestOpenordersListWorker(action) {
  const { payload } = action
  const response = yield call(api.graphql, payload)

  if (response.success) {
    yield put({
      type: 'exchange/request_openorders_list_succeed',
      payload: response.result.data.find_delegate,
    })
  } else {
    yield put({
      type: 'exchange/request_openorders_list_failed',
      payload: [],
    })
  }
}

export function* requestOrderhistoryListWorker(action) {
  const { payload } = action
  const response = yield call(api.latestDeals, payload)

  if (response.success) {
    yield put({
      type: 'exchange/request_orderhistory_list_succeed',
      payload: response.result,
    })
  } else {
    yield put({
      type: 'exchange/request_orderhistory_list_failed',
      payload: [],
    })
  }
}

export function* createOrderWorker(action) {
  const { payload } = action
  const response = yield call(api.create, payload)
  if (response.success) {
    yield put({
      type: 'exchange/create_order_succeed',
      payload: response.result,
    })
  } else {
    yield put({
      type: 'exchange/create_order_failed',
      payload: response.error,
    })
  }
}

export function* requestValuationWorker() {
  const response = yield call(api.getValuation)
  if (response.success) {
    yield put({
      type: 'exchange/requset_valuation_succeed',
      payload: response.result,
    })
  } else {
    yield put({
      type: 'exchange/requset_valuation_failed',
      payload: undefined,
    })
  }
}

export function* requestCancelOrderWorker(action) {
  const { payload } = action
  const response = yield call(api.cancel, payload)

  if (response.success) {
    const o = yield select(state => state.exchange.openOrders)
    const openOrders = [...o]
    const length = openOrders.length
    for (let i = 0; i < length; i++) {
      const one = openOrders[i]
      if (one.id === payload.id) {
        openOrders.splice(i, 1)
        break
      }
    }

    yield put({
      type: 'exchange/request_cancel_order_succeed',
      payload: openOrders,
    })
  } else {
    yield put({
      type: 'exchange/request_cancel_order_failed',
      payload: response.error,
    })
  }
}

export function* requestDepthMapWorker(action) {
  const { payload } = action
  const response = yield call(api.getDepthMap, payload)

  if (response.success) {
    yield put({
      type: 'exchange/request_depth_map_succeed',
      payload: response.result,
    })
  } else {
    yield put({
      type: 'exchange/request_depth_map_failed',
      payload: {
        buy: [],
        lastprice: 0,
        sell: [],
      },
    })
  }
}

function* checkFavorite(action) {
  const { payload } = action
  const parms = {
    goods_id: payload.goods.id,
    currency_id: payload.currency.id,
  }
  const resp = yield call(api.checkFavorite, parms)
  if (resp.success) {
    yield put({
      type: 'exchange/check_favorite_success',
      payload: resp.result.existFavorite,
    })
  } else {
    yield put({
      type: 'exchange/check_favorite_failed',
      payload: resp.error,
    })
  }
}

function* setFavorite(action) {
  const { payload } = action
  const parms = { goods_id: payload.goods.id, currency_id: payload.currency.id }
  const resp = yield call(api.userFavoriteLists, parms)
  if (resp.success) {
    let result
    const dict = resp.result.favoriteLists
    if (Object.keys(dict).some(key => key === `${payload.goods.id}_${payload.currency.id}`)) {
      result = true
    } else {
      result = false
    }
    yield put({
      type: 'exchange/set_favorite_success',
      payload: result,
    })
    yield put({
      type: 'market/get_favorite_success',
      payload: dict,
    })
  } else {
    yield put({
      type: 'exchange/set_favorite_success',
      payload: false,
    })
  }
}

export function* requestLastpriceList() {
  yield takeEvery('exchange/request_lastprice_list', requestLastpriceListWorker)
}

export function* requestOpenordersList() {
  yield takeEvery('exchange/request_openorders_list', requestOpenordersListWorker)
}

export function* requestOrderhistoryList() {
  yield takeEvery('exchange/request_orderhistory_list', requestOrderhistoryListWorker)
}

export function* createOrder() {
  yield takeEvery('exchange/create_order', createOrderWorker)
}

export function* requestCancelOrder() {
  yield takeEvery('exchange/request_cancel_order', requestCancelOrderWorker)
}

export function* requestValuation() {
  yield takeEvery('exchange/requset_valuation', requestValuationWorker)
}

export function* requestDepthMap() {
  yield takeEvery('exchange/request_depth_map', requestDepthMapWorker)
}

export function* watchCheckFavorite() {
  yield takeLatest('exchange/check_favorite_request', checkFavorite)
}

export function* watchSetFavorite() {
  yield takeLatest('exchange/set_favorite_request', setFavorite)
}
