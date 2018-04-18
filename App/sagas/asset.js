import {
  take, call, put,
} from 'redux-saga/effects'
import * as constants from '../constants/index'
import * as api from '../services/api'

/* 创建充值地址,触发时创建，减少浪费 */
export function* createAddress() {
  while (true) {
    const request = yield take(constants.CREATE_ADDRESS_REQUEST)
    const response = yield call(api.createAddress, request.data)
    if (response.success) yield put({ type: constants.CREATE_ADDRESS_SUCCEED, response })
    else yield put({ type: constants.CREATE_ADDRESS_FAILED, response })
  }
}
/* 获取某几个币种的余额等信息 */
export function* getAssets() {
  while (true) {
    const request = yield take(constants.GET_ASSETS_REQUEST)
    const response = yield call(api.getAssets, request.data)
    if (response.success) yield put({ type: constants.GET_ASSETS_SUCCEED, response })
    else yield put({ type: constants.GET_ASSETS_FAILED, response })
  }
}
/* 获取资产列表的余额 */
export function* findAssetList() {
  while (true) {
    const request = yield take(constants.FIND_ASSET_LIST_REQUEST)
    const response = yield call(api.graphql, request.schema)
    if (response.success) yield put({ type: constants.FIND_ASSET_LIST_SUCCEED, response })
    else yield put({ type: constants.FIND_ADDRESS_FAILED, response })
  }
}
