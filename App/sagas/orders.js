import {
  call,
  put,
  takeEvery,
  select,
} from 'redux-saga/effects'
import * as api from '../services/api'

export function* openOrderRequestWorker(action) {
  const { payload } = action
  const response = yield call(api.graphql, payload)

  if (response.success) {
    yield put({
      type: 'orders/open_order_request_succeed',
      payload: response.result.data.find_delegate,
    })
  } else {
    yield put({
      type: 'orders/open_order_request_failed',
      payload: response.error,
    })
  }
}

export function* orderHistoryRequestWorker(action) {
  const { payload } = action
  const response = yield call(api.graphql, payload)

  if (response.success) {
    yield put({
      type: 'orders/order_history_request_succeed',
      payload: response.result.data.find_delegate,
    })
  } else {
    yield put({
      type: 'orders/order_history_request_failed',
      payload: response.error,
    })
  }
}

export function* requestCancelOrderWorker(action) {
  const { payload } = action
  const response = yield call(api.cancel, payload)

  if (response.success) {
    const openOrders = yield select(state => state.orders.openOrders)

    const length = openOrders.length
    for (let i = 0; i < length; i++) {
      const one = openOrders[i]
      if (one.id === payload.id) {
        openOrders.splice(i, 1)
        break
      }
    }

    yield put({
      type: 'orders/request_cancel_order_succeed',
      payload: openOrders,
    })
  } else {
    yield put({
      type: 'orders/request_cancel_order_failed',
      payload: response.error,
    })
  }
}

export function* requestCancelAllOrderWorker(action) {
  const { payload } = action
  const response = yield call(api.allCancel, payload)

  if (response.success) {
    yield put({
      type: 'orders/request_cancel_all_order_succeed',
      payload: response.result,
    })
  } else {
    yield put({
      type: 'orders/request_cancel_all_order_failed',
      payload: response.error,
    })
  }
}

export function* openOrderRequest() {
  yield takeEvery('orders/open_order_request', openOrderRequestWorker)
}

export function* orderHistoryRequest() {
  yield takeEvery('orders/order_history_request', orderHistoryRequestWorker)
}

export function* requestCancelOrder() {
  yield takeEvery('orders/request_cancel_order', requestCancelOrderWorker)
}

export function* requestCancelAllOrder() {
  yield takeEvery('orders/request_cancel_all_order', requestCancelAllOrderWorker)
}
