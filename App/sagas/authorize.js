import { take, call, put, fork, cancel, cancelled } from 'redux-saga/effects'
import {
  LOGIN_REQUEST,
  LOGIN_SUCCEED,
  LOGIN_FAILED,
  LOGOUT_REQUEST,
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

export default function* loginFlow() {
  while (true) {
    const { payload } = yield take(LOGIN_REQUEST)
    const task = yield fork(authorize, payload)
    const action = yield take([LOGOUT_REQUEST, LOGIN_FAILED])

    if (action.type === LOGOUT_REQUEST) {
      yield cancel(task)
    }
  }
}
