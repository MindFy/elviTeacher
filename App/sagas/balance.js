import {
  call,
  put,
  takeEvery,
} from 'redux-saga/effects'
import * as api from '../services/api'

export function* requestBalanceListWorker(action) {
  const { payload } = action
  const response = yield call(api.graphql, payload)

  if (response.success) {
    yield put({
      type: 'balance/request_balance_list_succeed',
      payload: response.result.data.find_asset,
    })
  } else {
    yield put({
      type: 'balance/request_balance_list_failed',
      payload: response.error,
    })
  }
}

export function* requestBalanceValuationWorker() {
  const response = yield call(api.getValuation)

  if (response.success) {
    yield put({
      type: 'balance/request_balance_valuation_succeed',
      payload: response.result,
    })
  } else {
    yield put({
      type: 'balance/request_balance_valuation_failed',
      payload: response.error,
    })
  }
}

export function* requestBalanceList() {
  yield takeEvery('balance/request_balance_list', requestBalanceListWorker)
}

export function* requestBalanceValuation() {
  yield takeEvery('balance/request_balance_valuation', requestBalanceValuationWorker)
}
