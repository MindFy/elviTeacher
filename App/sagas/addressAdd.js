import {
  call,
  put,
  takeEvery,
} from 'redux-saga/effects'
import * as api from '../services/api'

export function* requestAddressAddWorker(action) {
  const response = yield call(api.createAddress, action.payload)
  if (response.success) {
    yield put({
      type: 'addressAdd/request_address_add_succeed',
      payload: response.result,
    })
  } else {
    yield put({
      type: 'addressAdd/request_address_add_failed',
      payload: response.error,
    })
  }
}

export function* requestAddressAdd() {
  yield takeEvery('addressAdd/request_address_add', requestAddressAddWorker)
}
