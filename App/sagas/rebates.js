import {
  take, call, put,
} from 'redux-saga/effects'
import * as constants from '../constants/index'
import * as api from '../services/api'

/* 根据参数查询返利列表的总数 */
export function* rebatesCount() {
  while (true) {
    const request = yield take(constants.REBATES_COUNT_REQUEST)
    const response = yield call(api.rebatesCount, request.data)
    if (response.success) {
      const totalCount = response.result.totalCount
      yield put({ type: constants.REBATES_COUNT_SUCCEED, totalCount })
    } else {
      yield put({ type: constants.REBATES_COUNT_FAILED, response })
    }
  }
}

export function* rebatesCountTK() {
  while (true) {
    const request = yield take(constants.REBATES_COUNT_TK_REQUEST)
    const response = yield call(api.rebatesCount, request.data)
    if (response.success) {
      const totalCount = response.result.totalCount
      yield put({ type: constants.REBATES_COUNT_TK_SUCCEED, totalCount })
    } else {
      yield put({ type: constants.REBATES_COUNT_TK_FAILED, response })
    }
  }
}

export function* rebateCountBTC() {
  while (true) {
    const request = yield take(constants.REBATES_COUNT_BTC_REQUEST)
    const response = yield call(api.rebatesCount, request.data)
    if (response.success) {
      const totalCount = response.result.totalCount
      yield put({ type: constants.REBATES_COUNT_BTC_SUCCEED, totalCount })
    } else {
      yield put({ type: constants.REBATES_COUNT_BTC_FAILED, response })
    }
  }
}

