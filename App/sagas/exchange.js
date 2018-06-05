import {
  call,
  put,
  takeEvery,
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
      payload: response.error,
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

export function* requestLastpriceList() {
  yield takeEvery('exchange/request_lastprice_list', requestLastpriceListWorker)
}

export function* requestOpenordersList() {
  yield takeEvery('exchange/request_openorders_list', requestOpenordersListWorker)
}

export function* requestOrderhistoryList() {
  yield takeEvery('exchange/request_orderhistory_list', requestOrderhistoryListWorker)
}
