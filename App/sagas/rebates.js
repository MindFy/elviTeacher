import {
  take, call, put,
} from 'redux-saga/effects'
import * as constants from '../constants/index'
import * as api from '../services/api'

/* 根据参数查询返利列表的总数 */
export default function* rebatesCount() {
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
