import {
  take, call, put,
} from 'redux-saga/effects'
import * as constants from '../constants/index'
import * as api from '../services/api'

/* 取消提币 */
export function* cancelWithdraw() {
  while (true) {
    const request = yield take(constants.CANCEL_WITH_DRAW_REQUEST)
    const response = yield call(api.cancelWithdraw, request.data)
    if (response.success) yield put({ type: constants.CANCEL_WITH_DRAW_SUCCEED, response })
    else yield put({ type: constants.CANCEL_WITH_DRAW_FAILED, response })
  }
}
/* 获取个人交易信息列表 */
export function* findPaymentList() {
  while (true) {
    const request = yield take(constants.FIND_PAYMENT_LIST_REQUEST)
    const response = yield call(api.graphql, request.schema)
    if (response.success) {
      yield put({ type: constants.FIND_PAYMENT_LIST_SUCCEED, response })
    } else {
      yield put({ type: constants.FIND_PAYMENT_LIST_FAILED, response })
    }
  }
}
