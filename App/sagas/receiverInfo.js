import {
  call,
  put,
  takeEvery,
} from 'redux-saga/effects'
import * as api from '../services/api'

function* requestReceiverInfo(action) {
  const { payload } = action
  const response = yield call(api.graphql, payload)
  if (response.success) {
    yield put({
      type: 'receiverInfo/request_receiver_info_succeed',
      payload: response.result.data.find_legalDeal[0],
    })
  } else {
    yield put({
      type: 'receiverInfo/request_receiver_info_failed',
      payload: response.error,
    })
  }
}

export default function* watcherRequestReceiverInfo() {
  yield takeEvery('receiverInfo/request_receiver_info', requestReceiverInfo)
}
