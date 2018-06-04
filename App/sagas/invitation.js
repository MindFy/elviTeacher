import {
  take, call, put,
} from 'redux-saga/effects'
import * as constants from '../constants/index'
import * as api from '../services/api'

/* 邀请列表总数 */
export default function* invitationTotalCount() {
  while (true) {
    const request = yield take(constants.INVITATION_TOTAL_COUNT_REQUEST)
    const response = yield call(api.totalCount, request.data)
    if (response.success) {
      const totalCount = response.result.totalCount
      yield put({ type: constants.INVITATION_TOTAL_COUNT_SUCCEED, totalCount })
    } else {
      yield put({ type: constants.INVITATION_TOTAL_COUNT_FAILED, response })
    }
  }
}
