import { take, takeEvery, call, put, fork, cancel, cancelled, select } from 'redux-saga/effects'
import {
  LOGIN_REQUEST,
  LOGIN_SUCCEED,
  LOGIN_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCEED,
  LOGOUT_FAILED,
  SYNC_REQUEST,
} from '../constants/index'
import * as api from '../services/api'

export function* authorize(data) {
  try {
    const response = yield call(api.login, data)

    if (response.success) {
      yield put({ type: LOGIN_SUCCEED, payload: response.result })
    } else {
      yield put({ type: LOGIN_FAILED, payload: response.error })
    }
  } catch (error) {
    yield put({ type: LOGIN_FAILED, payload: error })
  } finally {
    if (yield cancelled()) {
      // console.log('canceled')
    }
  }
}

export function* sync() {
  try {
    const response = yield call(api.sync)
    if (response.success && response.result.id > 0) {
      yield put({ type: 'authorize/sync_request_succeed', payload: response.result })
    } else {
      yield put({ type: 'authorize/sync_request_failed', payload: response.error })
    }
  } catch (error) {
    yield put({ type: 'authorize/sync_request_failed', payload: error })
  }
}

function* requestLoginOut() {
  let loading
  if (loading) return
  loading = true
  const response = yield call(api.logout)
  if (response.success) {
    loading = false
    yield put({ type: LOGOUT_SUCCEED, payload: response.result })
  } else {
    loading = false
    yield put({ type: LOGOUT_FAILED, payload: response.error })
  }
}

export default function* loginFlow() {
  while (true) {
    const { payload } = yield take(LOGIN_REQUEST)
    const task = yield fork(authorize, payload)
    const action = yield take([LOGOUT_REQUEST, LOGIN_FAILED])

    if (action.type === LOGOUT_REQUEST) {
      yield cancel(task)
      yield fork(requestLoginOut)
    }
  }
}

export function* syncWatcher() {
  yield takeEvery(SYNC_REQUEST, sync)
}

export function* watchRequestLoginout() {
  yield takeEvery(LOGOUT_REQUEST, requestLoginOut)
}
