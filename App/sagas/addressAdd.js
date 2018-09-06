import {
  call,
  put,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects'
import * as api from '../services/api'

export function* requestAddressAddWorker(action) {
  const response = yield call(api.add, action.payload)
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

export function* requsetCheck2GoogleAuthWorker(action) {
  const { payload } = action
  const response = yield call(api.check2GoogleAuth, payload)
  if (response.success) {
    yield put({
      type: 'addressAdd/check2_google_auth_set_response',
      payload: response,
    })
  } else {
    yield put({
      type: 'addressAdd/check2_google_auth_set_response',
      payload: response,
    })
  }
}

export function* requestGetCodeWorker(action) {
  const { payload } = action
  const response = yield call(api.getVerificateCode, payload)

  if (response.success) {
    yield put({
      type: 'addressAdd/request_get_code_succeed',
      payload: response.result,
    })
  } else {
    yield put({
      type: 'addressAdd/request_get_code_failed',
      payload: response.error,
    })
  }
}

export function* requestAddressAdd() {
  yield takeEvery('addressAdd/request_address_add', requestAddressAddWorker)
}

export function* requsetCheck2GoogleAuthWatcher() {
  yield takeLatest('addressAdd/check2_google_auth', requsetCheck2GoogleAuthWorker)
}

export function* requestGetCode() {
  yield takeEvery('addressAdd/request_get_code', requestGetCodeWorker)
}
