import {
  call,
  put,
  takeEvery,
  takeLatest,
  select,
} from 'redux-saga/effects'
import * as api from '../services/api'

export function* requestOtcListWorker(action) {
  const { payload } = action
  const response = yield call(api.graphql, payload)

  if (response.success) {
    const page = yield select(state => state.otcDetail.otcListPage)
    if (page === 0) {
      yield put({
        type: 'otcDetail/request_otc_list_succeed',
        payload: response.result.data.find_legalDeal,
      })
    } else {
      const otcList = yield select(state => state.otcDetail.otcList)
      const newOtcList = otcList.concat(response.result.data.find_legalDeal)
      yield put({
        type: 'otcDetail/request_otc_list_succeed',
        payload: newOtcList,
      })
    }
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

export function* requestCancelWorker(action) {
  const { payload } = action
  const response = yield call(api.legalDealCancel, payload)

  if (response.success) {
    yield put({
      type: 'otcDetail/request_cancel_succeed',
      payload: response.result,
    })
  } else {
    yield put({
      type: 'otcDetail/request_cancel_failed',
      payload: response.error,
    })
  }
}

export function* requestAllegeWorker(action) {
  const { payload } = action
  const response = yield call(api.createAllege, payload)

  if (response.success) {
    yield put({
      type: 'otcDetail/request_allege_succeed',
      payload: response.result,
    })
  } else {
    yield put({
      type: 'otcDetail/request_allege_failed',
      payload: response.error,
    })
  }
}

export function* requsetCheck2GoogleAuthWorker(action) {
  const { payload } = action
  const response = yield call(api.check2GoogleAuth, payload)
  if (response.success) {
    yield put({
      type: 'otcDetail/check2_google_auth_set_response',
      payload: response,
    })
  } else {
    yield put({
      type: 'otcDetail/check2_google_auth_set_response',
      payload: response,
    })
  }
}

export function* requsetCheck2SMSAuthWorker(action) {
  const { payload } = action
  const response = yield call(api.checkVerificateCode, payload)
  if (response.success) {
    yield put({
      type: 'otcDetail/check2_sms_auth_set_response',
      payload: response,
    })
  } else {
    yield put({
      type: 'otcDetail/check2_sms_auth_set_response',
      payload: response,
    })
  }
}

export function* requsetCheck2SmtpAuthWorker(action) {
  const { payload } = action
  const response = yield call(api.checkVerificateSmtpCode, payload)
  if (response.success) {
    yield put({
      type: 'otcDetail/check2_smtp_auth_set_response',
      payload: response,
    })
  } else {
    yield put({
      type: 'otcDetail/check2_smtp_auth_set_response',
      payload: response,
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
  yield takeLatest('otcDetail/request_confirm_pay', requestConfirmPayWorker)
}

export function* requestHavedPay() {
  yield takeEvery('otcDetail/request_haved_pay', requestHavedPayWorker)
}

export function* requestCancel() {
  yield takeEvery('otcDetail/request_cancel', requestCancelWorker)
}

export function* requestAllege() {
  yield takeEvery('otcDetail/request_allege', requestAllegeWorker)
}

export function* requsetCheck2GoogleAuthWatcher() {
  yield takeLatest('otcDetail/check2_google_auth', requsetCheck2GoogleAuthWorker)
}

export function* requsetCheck2SMSAuth() {
  yield takeEvery('otcDetail/check2_sms_auth', requsetCheck2SMSAuthWorker)
}

export function* requsetCheck2SmtpAuth() {
  yield takeEvery('otcDetail/check2_smtp_auth', requsetCheck2SmtpAuthWorker)
}