import {
  call,
  put,
  takeEvery,
} from 'redux-saga/effects'
import * as api from '../services/api'

export function* submitRequestWorker(action) {
  const { payload } = action
  const response = yield call(api.legalDealCreate, {
    direct: payload.type,
    quantity: payload.quantity,
  })

  if (response.success) {
    yield put({
      type: 'otc/submit_request_succeed',
      payload: response.result,
    })
  } else {
    yield put({
      type: 'otc/submit_request_failed',
      payload: response.error,
    })
  }
}

export function* submitRequest() {
  yield takeEvery('otc/submit_request', submitRequestWorker)
}
