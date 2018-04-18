import {
  take, call, put,
} from 'redux-saga/effects'
import * as constants from '../constants/index'
import * as api from '../services/api'

/* 增加一个提币地址 */
export function* add() {
  while (true) {
    const request = yield take(constants.ADD_REQUEST)
    const response = yield call(api.addressAdd, request.data)
    if (response.success) yield put({ type: constants.ADD_SUCCEED, response })
    else yield put({ type: constants.ADD_FAILED, response })
  }
}
/* 获取用户提币地址 */
export function* findAddress() {
  while (true) {
    const request = yield take(constants.FIND_ADDRESS_REQUEST)
    const response = yield call(api.graphql, request.schema)
    if (response.success) yield put({ type: constants.FIND_ADDRESS_SUCCEED, response })
    else yield put({ type: constants.FIND_ADDRESS_FAILED, response })
  }
}
