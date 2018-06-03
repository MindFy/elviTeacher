import {
  call,
  put,
  takeEvery,
} from 'redux-saga/effects'
import * as api from '../services/api'

export function* requestPairInfoWorker(action) {
  const { payload } = action
  const response = yield call(api.getRose, payload)

  if (response.success) {
    const result = {}
    response.result.forEach((ele) => {
      result[ele.name] = {
        id: ele.id,
        sub: ele.sub,
      }
    })
    yield put({
      type: 'withdraw/request_pair_info_succeed',
      payload: result,
    })
  } else {
    yield put({
      type: 'withdraw/request_pair_info_failed',
      payload: response.error,
    })
  }
}

export function* requestPairInfo() {
  yield takeEvery('withdraw/request_pair_info', requestPairInfoWorker)
}
