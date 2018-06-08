import {
  call, put, takeEvery,
} from 'redux-saga/effects'
import * as api from '../services/api'

function* requestUserWorker(action) {
  const response = yield call(api.graphql, action.payload)
  if (response.success) {
    const user = response.result.data.user
    const levelName = user.levelName
    const prefixNo = user.prefixNo
    const recommendId = user.recommendId
    const id = user.id
    yield put({
      type: 'rebates/request_rebates_count_tk',
      payload: { user_id: id, token_id: 1 },
    })
    if (levelName === 'level1') {
      yield put({
        type: 'rebates/request_rebates_count_btc',
        payload: { user_id: id, token_id: 2 },
      })
    }

    yield put({
      type: 'rebates/request_user_succeed',
      payload: { levelName, prefixNo, recommendId },
    })
  } else {
    yield put({
      type: 'rebates/request_user_failed',
      payload: response.error,
    })
  }
}

function* requestInvitationCountWorker(action) {
  const response = yield call(api.totalCount, action.payload)
  if (response.success) {
    yield put({
      type: 'rebates/request_invitation_count_succeed',
      payload: response.result.totalCount,
    })
  } else {
    yield put({
      type: 'rebates/request_invitation_count_failed',
      payload: response.error,
    })
  }
}

function* requestRebatesCountTKWorker(action) {
  const response = yield call(api.rebatesCount, action.payload)
  if (response.success) {
    yield put({
      type: 'rebates/request_rebates_count_tk_succeed',
      payload: response.result.totalCount,
    })
  } else {
    yield put({
      type: 'rebates/request_rebates_count_tk_failed',
      payload: response.error,
    })
  }
}

function* requestRebatesCountBTCWorker(action) {
  const response = yield call(api.rebatesCount, action.payload)
  if (response.success) {
    yield put({
      type: 'rebates/request_rebates_count_btc_succeed',
      payload: response.result.totalCount,
    })
  } else {
    yield put({
      type: 'rebates/request_rebates_count_btc_failed',
      payload: response.error,
    })
  }
}

export function* requestUser() {
  yield takeEvery('rebates/request_user', requestUserWorker)
}
/* 邀请列表总数 */
export function* requestInvitationCount() {
  yield takeEvery('rebates/request_invitation_count', requestInvitationCountWorker)
}

/* 根据参数查询返利列表的总数 */
export function* requestRebatesCountTK() {
  yield takeEvery('rebates/request_rebates_count_tk', requestRebatesCountTKWorker)
}

export function* requestRebatesCountBTC() {
  yield takeEvery('rebates/request_rebates_count_btc', requestRebatesCountBTCWorker)
}
