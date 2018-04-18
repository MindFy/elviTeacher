import {
  take, call, put,
} from 'redux-saga/effects'
import * as constants from '../constants/index'
import * as api from '../services/api'

/* 获取announcement */
export default function* findAnnouncement() {
  while (true) {
    const request = yield take(constants.FIND_ANNOUNCEMENT_REQUEST)
    const response = yield call(api.graphql, request.schema)
    if (response.success) yield put({ type: constants.FIND_ANNOUNCEMENT_SUCCEED, response })
    else yield put({ type: constants.FIND_ANNOUNCEMENT_FAILED, response })
  }
}
