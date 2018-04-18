import {
  take, call, put,
} from 'redux-saga/effects'
import * as constants from '../constants/index'
import * as api from '../services/api'

/* 获取交易中心的涨幅，包含：左上角以及顶上数据 */
export default function* getRose() {
  while (true) {
    yield take(constants.GET_ROSE_REQUEST)
    const response = yield call(api.getRose)
    if (response.success) yield put({ type: constants.GET_ROSE_SUCCEED, response })
    else yield put({ type: constants.GET_ROSE_FAILED, response })
  }
}
