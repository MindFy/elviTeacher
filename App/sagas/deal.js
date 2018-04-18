import {
  take, call, put,
} from 'redux-saga/effects'
import * as constants from '../constants/index'
import * as api from '../services/api'

/* 用户获取交易列表 */
export function* findListSelf() {
  while (true) {
    const request = yield take(constants.FIND_LIST_SELF_REQUEST)
    const response = yield call(api.graphql, request.schema)
    if (response.success) yield put({ type: constants.FIND_LIST_SELF_SUCCEED, response })
    else yield put({ type: constants.FIND_LIST_SELF_FAILED, response })
  }
}
/* 获取某个币币对最新交易列表 */
export function* latestDeals() {
  while (true) {
    const request = yield take(constants.LATEST_DEALS_REQUEST)
    const response = yield call(api.latestDeals, request.data)
    if (response.success) yield put({ type: constants.LATEST_DEALS_SUCCEED, response })
    else yield put({ type: constants.LATEST_DEALS_FAILED, response })
  }
}
