import {
  call,
  put,
  takeEvery,
} from 'redux-saga/effects'
import * as api from '../services/api'

export function* openOrderRequestWorker(action) {
  const { payload } = action
  const response = yield call(api.graphql, payload)

  if (response) {
    yield put({
      type: 'orders/open_order_request_succeed',
      payload: response.result,
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
  const response = yield call(api.api.graphql, payload)

  if (response) {
    yield put({
      type: 'orders/order_history_request_succeed',
      payload: response.result,
    })
  } else {
    yield put({
      type: 'orders/order_history_request_failed',
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
