import {
  call,
  put,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects'
import * as api from '../services/api'

export function* requestUpdateBankWorker(action) {
  const response = yield call(api.updateBank, action.payload)

  if (response.success) {
    yield put({
      type: 'updateBank/request_update_bank_succeed',
      payload: response.result,
    })
  } else {
    yield put({
      type: 'updateBank/request_update_bank_failed',
      payload: response.error,
    })
  }
}

export function* requestGetCodeWorker(action) {
  const response = yield call(api.getVerificateCode, action.payload)

  if (response.success) {
    yield put({
      type: 'updateBank/request_get_code_succeed',
      payload: response.result,
    })
  } else {
    yield put({
      type: 'updateBank/request_get_code_failed',
      payload: response.error,
    })
  }
}

export function* requsetCheck2GoogleAuthWorker(action) {
  const { payload } = action
  const response = yield call(api.check2GoogleAuth, payload)
  if (response.success) {
    yield put({
      type: 'updateBank/check2_google_auth_set_response',
      payload: response,
    })
  } else {
    yield put({
      type: 'updateBank/check2_google_auth_set_response',
      payload: response,
    })
  }
}

export function* requsetCheck2SMSAuthWorker(action) {
  const { payload } = action
  const response = yield call(api.checkVerificateCode, payload)
  if (response.success) {
    yield put({
      type: 'updateBank/check2_sms_auth_set_response',
      payload: response,
    })
  } else {
    yield put({
      type: 'updateBank/check2_sms_auth_set_response',
      payload: response,
    })
  }
}

export function* requsetCheck2SmtpAuthWorker(action) {
  const { payload } = action
  const response = yield call(api.checkVerificateSmtpCode, payload)
  if (response.success) {
    yield put({
      type: 'updateBank/check2_smtp_auth_set_response',
      payload: response,
    })
  } else {
    yield put({
      type: 'updateBank/check2_smtp_auth_set_response',
      payload: response,
    })
  }
}

export function* requestUpdateBank() {
  yield takeEvery('updateBank/request_update_bank', requestUpdateBankWorker)
}

export function* requestGetCode() {
  yield takeEvery('updateBank/request_get_code', requestGetCodeWorker)
}

export function* requsetCheck2GoogleAuthWatcher() {
  yield takeLatest('updateBank/check2_google_auth', requsetCheck2GoogleAuthWorker)
}

export function* requsetCheck2SMSAuth() {
  yield takeEvery('updateBank/check2_sms_auth', requsetCheck2SMSAuthWorker)
}

export function* requsetCheck2SmtpAuth() {
  yield takeEvery('updateBank/check2_smtp_auth', requsetCheck2SmtpAuthWorker)
}