import {
  call,
  put,
  takeEvery,
} from 'redux-saga/effects'
import * as constants from '../constants/index'
import * as api from '../services/api'

export function* fetchAddress(action) {
  const { schema } = action
  const response = yield call(api.graphql, schema)

  if (response.success) {
    yield put({ type: constants.FIND_ADDRESS_SUCCEED, response })
  } else {
    yield put({ type: constants.FIND_ADDRESS_FAILED, response })
  }
}

export function* addAddress_(action) {
  const response = yield call(api.add, action.data)

  if (response.success) {
    yield put({ type: constants.ADD_SUCCEED, response })
  } else {
    yield put({ type: constants.ADD_FAILED, response })
  }
}

export function* findAddress() {
  yield takeEvery(constants.FIND_ADDRESS_REQUEST, fetchAddress)
}

export function* addAddress() {
  yield takeEvery(constants.ADD_REQUEST, addAddress_)
}
