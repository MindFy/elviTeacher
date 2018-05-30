import {
  takeEvery, call, put,
} from 'redux-saga/effects'
import * as constants from '../constants/index'
import * as api from '../services/api'

/* 获取announcement */
export function* fetchAnnouncement(action) {
  const { schema } = action
  const response = yield call(api.graphql, schema)
  yield put({
    type: response.success ?
      constants.FIND_ANNOUNCEMENT_SUCCEED :
      constants.FIND_ADDRESS_FAILED,
    response,
  })
}

export default function* findAnnouncement() {
  yield takeEvery(constants.FIND_ANNOUNCEMENT_REQUEST, fetchAnnouncement)
}
