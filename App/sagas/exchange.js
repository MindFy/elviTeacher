import {
  call,
  put,
  takeEvery,
  select,
} from 'redux-saga/effects'
import * as api from '../services/api'

export function* requestLastpriceListWorker(action) {
  const { payload } = action
  const response = yield call(api.getShelves, payload)

  if (response.success) {
    yield put({
      type: 'exchange/request_lastprice_list_succeed',
      payload: response.result,
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
      payload: response.error,
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
      payload: response.error,
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
