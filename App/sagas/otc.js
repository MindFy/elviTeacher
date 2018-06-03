import {
  call,
  put,
  takeEvery,
} from 'redux-saga/effects'
import * as api from '../services/api'

export function* sellRequestWorker(action) {
  const { payload } = action
  const response = yield call(api.api_here, payload)

  if (response.success) {
    yield put({
      type: 'otc/sell_request_succeed',
      payload: response.result,
    })
  } else {
    yield put({
      type: 'otc/sell_request_failed',
      payload: response.error,
    })
  }
}

export function* sellRequestSucceedWorker(action) {
  const { payload } = action
  const response = yield call(api.api_here, payload)

  if (response.success) {
    yield put({
      type: 'otc/sell_request_succeed_succeed',
      payload: response.result,
    })
  } else {
    yield put({
      type: 'otc/sell_request_succeed_failed',
      payload: response.error,
    })
  }
}

export function* sellRequestFailedWorker(action) {
  const { payload } = action
  const response = yield call(api.api_here, payload)

  if (response.success) {
    yield put({
      type: 'otc/sell_request_failed_succeed',
      payload: response.result,
    })
  } else {
    yield put({
      type: 'otc/sell_request_failed_failed',
      payload: response.error,
    })
  }
}

export function* buyRequestWorker(action) {
  const { payload } = action
  const response = yield call(api.api_here, payload)

  if (response.success) {
    yield put({
      type: 'otc/buy_request_succeed',
      payload: response.result,
    })
  } else {
    yield put({
      type: 'otc/buy_request_failed',
      payload: response.error,
    })
  }
}

export function* buyRequestSucceedWorker(action) {
  const { payload } = action
  const response = yield call(api.api_here, payload)

  if (response.success) {
    yield put({
      type: 'otc/buy_request_succeed_succeed',
      payload: response.result,
    })
  } else {
    yield put({
      type: 'otc/buy_request_succeed_failed',
      payload: response.error,
    })
  }
}

export function* buyRequestFailedWorker(action) {
  const { payload } = action
  const response = yield call(api.api_here, payload)

  if (response.success) {
    yield put({
      type: 'otc/buy_request_failed_succeed',
      payload: response.result,
    })
  } else {
    yield put({
      type: 'otc/buy_request_failed_failed',
      payload: response.error,
    })
  }
}

export function* sellRequest() {
  yield takeEvery('otc/sell_request', sellRequestWorker)
}

export function* sellRequestSucceed() {
  yield takeEvery('otc/sell_request_succeed', sellRequestSucceedWorker)
}

export function* sellRequestFailed() {
  yield takeEvery('otc/sell_request_failed', sellRequestFailedWorker)
}

export function* buyRequest() {
  yield takeEvery('otc/buy_request', buyRequestWorker)
}

export function* buyRequestSucceed() {
  yield takeEvery('otc/buy_request_succeed', buyRequestSucceedWorker)
}

export function* buyRequestFailed() {
  yield takeEvery('otc/buy_request_failed', buyRequestFailedWorker)
}
