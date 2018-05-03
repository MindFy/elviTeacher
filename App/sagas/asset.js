import {
  take, call, put,
} from 'redux-saga/effects'
import * as constants from '../constants/index'
import * as api from '../services/api'
import {
  common,
} from '../constants/common'

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
    if (response.success) {
      const findAsset = response.result.data.find_asset
      const amountVisible = { TK: 0, BTC: 0, CNYT: 0 }
      for (let i = 0; i < findAsset.length; i++) {
        const element = findAsset[i]
        if (element.token.id === 1) {
          amountVisible.TK = common.bigNumber.minus(element.amount, element.freezed)
        } else if (element.token.id === 2) {
          amountVisible.BTC = common.bigNumber.minus(element.amount, element.freezed)
        } else if (element.token.id === 3) {
          amountVisible.CNYT = common.bigNumber.minus(element.amount, element.freezed)
        }
      }
      yield put({ type: constants.FIND_ASSET_LIST_SUCCEED, find_asset: findAsset, amountVisible })
    } else {
      yield put({ type: constants.FIND_ASSET_LIST_FAILED, response })
    }
  }
}
