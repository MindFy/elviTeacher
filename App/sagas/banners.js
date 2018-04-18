import {
  take, call, put,
} from 'redux-saga/effects'
import * as constants from '../constants/index'
import * as api from '../services/api'

/* 获取banners */
export default function* findBanners() {
  while (true) {
    const request = yield take(constants.FIND_BANNERS_REQUEST)
    const response = yield call(api.graphql, request.schema)
    if (response.success) yield put({ type: constants.FIND_BANNERS_SUCCEED, response })
    else yield put({ type: constants.FIND_BANNERS_FAILED, response })
  }
}
