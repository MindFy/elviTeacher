import {
  call,
  put,
  takeEvery,
} from 'redux-saga/effects'
import * as api from '../services/api'

export function* requestCoinListWorker(action) {
  // const response = yield call(api.api_here, param_here)

  yield put({
    type: 'withdraw/request_coin_list_succeed',
    payload: ['TK', 'BTC', 'CNYT', 'ETH', 'ETC'],
  })
}

export function* requestCoinList() {
  yield takeEvery('withdraw/request_coin_list', requestCoinListWorker)
}
