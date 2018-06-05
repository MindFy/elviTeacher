import {
  call,
  put,
  takeEvery,
} from 'redux-saga/effects'
import * as api from '../services/api'

export function* requestOtcListWorker(action) {
  const { payload } = action
  const response = yield call(api.graphql, payload)

  if (response.success) {
    yield put({
      type: 'otcDetail/request_otc_list_succeed',
      payload: response.result.data.find_legalDeal,
    })
  } else {
    yield put({
      type: 'otcDetail/request_otc_list_failed',
      payload: response.error,
    })
  }
}

export function* requestGetCodeWorker(action) {
  const { payload } = action
  const response = yield call(api.getVerificateCode, payload)

  if (response.success) {
    yield put({
      type: 'otcDetail/request_get_code_succeed',
      payload: response.result,
    })
  } else {
    yield put({
      type: 'otcDetail/request_get_code_failed',
      payload: response.error,
    })
  }
}

export function* requestConfirmPayWorker(action) {
  const { payload } = action
  const response = yield call(api.confirmPay, payload)

  if (response.success) {
    yield put({
      type: 'otcDetail/request_confirm_pay_succeed',
      payload: response.result,
    })
  } else {
    yield put({
      type: 'otcDetail/request_confirm_pay_failed',
      payload: response.error,
    })
  }
}

export function* requestHavedPayWorker(action) {
  const { payload } = action
  const response = yield call(api.havedPay, payload)

  if (response.success) {
    yield put({
      type: 'otcDetail/request_haved_pay_succeed',
      payload: response.result,
    })
  } else {
    yield put({
      type: 'otcDetail/request_haved_pay_failed',
      payload: response.error,
    })
  }
}

export function* requestOtcList() {
  yield takeEvery('otcDetail/request_otc_list', requestOtcListWorker)
}

export function* requestGetCode() {
  yield takeEvery('otcDetail/request_get_code', requestGetCodeWorker)
}

export function* requestConfirmPay() {
  yield takeEvery('otcDetail/request_confirm_pay', requestConfirmPayWorker)
}

export function* requestHavedPay() {
  yield takeEvery('otcDetail/request_haved_pay', requestHavedPayWorker)
}
