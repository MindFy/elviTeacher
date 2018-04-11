import {
  take, fork, call, put,
} from 'redux-saga/effects'
import {
  LOGIN_REQUEST,
  LOGIN_SUCCEED,
  LOGIN_FAILED,
} from '../constants/index'
import userLogin from '../servers/api'

function* loginFlow() {
  while (true) {
    const request = yield take(LOGIN_REQUEST)
    const { username, password } = request.data
    const response = yield call(userLogin, {
      username,
      password,
    })
    if (response.success) {
      yield put({
        type: LOGIN_SUCCEED,
      })
    } else {
      yield put({
        type: LOGIN_FAILED,
      })
    }
  }
}

export default function* rootSaga() {
  yield [
    fork(loginFlow),
  ]
}
