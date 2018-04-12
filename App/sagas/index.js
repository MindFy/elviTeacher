import {
  take, fork, call, put,
} from 'redux-saga/effects'
import {
  LOGIN_REQUEST,
  LOGIN_SUCCEED,
  LOGIN_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCEED,
  REGISTER_FAILED,
  GETCODE,
  GETCODE_SUCCEED,
  GETCODE_FAILED,
  RESETPASSWORD,
  RESETPASSWORD_SUCCEED,
  RESETPASSWORD_FAILED,
} from '../constants/index'
import * as http from '../services/api'

function* loginFlow() {
  while (true) {
    const request = yield take(LOGIN_REQUEST)
    const { username, password } = request.data
    const response = yield call(http.login, {
      mobile: username,
      password,
    })
    if (response.success) {
      yield put({
        type: LOGIN_SUCCEED,
        result: response.result,
      })
    } else {
      yield put({
        type: LOGIN_FAILED,
        error: response.error,
      })
    }
  }
}

/* 注册 */
function* registerFlow() {
  while (true) {
    const request = yield take(REGISTER_REQUEST)
    const { mobile, code, password } = request.data
    const response = yield call(http.register, {
      mobile,
      code,
      password,
    })
    if (response.success) {
      yield put({
        type: REGISTER_SUCCEED,
        result: response.result,
      })
    } else {
      yield put({
        type: REGISTER_FAILED,
        error: response.error,
      })
    }
  }
}

/* 获取验证码 */
function* getVerificateCode() {
  while (true) {
    const request = yield take(GETCODE)
    const { mobile, service } = request.data
    const response = yield call(http.getVerificateCode, {
      mobile,
      service,
    })
    if (response.success) {
      yield put({
        type: GETCODE_SUCCEED,
        result: response.result,
      })
    } else {
      yield put({
        type: GETCODE_FAILED,
        error: response.error,
      })
    }
  }
}

/* 重设密码 */
function* resetPassword() {
  while (true) {
    const request = yield take(RESETPASSWORD)
    const { mobile, code, newpassword } = request.data
    const response = yield call(http.resetPassword, {
      mobile,
      code,
      newpassword,
    })
    if (response.success) {
      yield put({
        type: RESETPASSWORD_SUCCEED,
        result: response.result,
      })
    } else {
      yield put({
        type: RESETPASSWORD_FAILED,
        error: response.error,
      })
    }
  }
}

export default function* rootSaga() {
  yield [
    fork(loginFlow),
    fork(registerFlow),
    fork(getVerificateCode),
    fork(resetPassword),
  ]
}
