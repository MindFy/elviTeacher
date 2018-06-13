import {
  take, call, put, select,
} from 'redux-saga/effects'
import * as constants from '../constants/index'
import * as api from '../services/api'

/* 创建充值地址,触发时创建，减少浪费 */
export function* createAddress() {
  while (true) {
    const request = yield take(constants.CREATE_ADDRESS_REQUEST)
    const response = yield call(api.createAddress, request.data)
    if (response.success) {
      yield put({ type: constants.CREATE_ADDRESS_SUCCEED, response })
      const address = yield select(state => state.address)
      const copySelectedToken = { ...address.selectedToken }
      const newSelectedToken = {
        ...copySelectedToken,
        rechargeaddr: response.result.rechargeaddr,
      }
      const data = {
        selectedToken: newSelectedToken,
        tokenListSelected: address.tokenListSelected,
        selectedIndex: address.selectedIndex,
      }
      yield put({ type: constants.SELECT_TOKEN_UPDATE, data })
    } else {
      yield put({ type: constants.CREATE_ADDRESS_FAILED, response })
      const address = yield select(state => state.address)
      const copySelectedToken = { ...address.selectedToken }
      const newSelectedToken = {
        ...copySelectedToken,
        rechargeaddr: '暂无可充值地址',
      }
      const data = {
        tokenListSelected: address.tokenListSelected,
        selectedIndex: address.selectedIndex,
        selectedToken: newSelectedToken,
      }
      yield put({ type: constants.SELECT_TOKEN_UPDATE, data })
    }
  }
}
/* 获取某几个币种的余额等信息 */
export function* getAssets() {
  while (true) {
    const request = yield take(constants.GET_ASSETS_REQUEST)
    const response = yield call(api.getAssets, request.data)
    if (response.success) yield put({ type: constants.GET_ASSETS_SUCCEED, response })
    else yield put({ type: constants.GET_ASSETS_FAILED, response: undefined })
  }
}
/* 获取几种货币根据比特币换算的人民币价格和已提取数量 */
export function* getValuation() {
  while (true) {
    yield take(constants.GET_VALUATION_REQUEST)
    const response = yield call(api.getValuation)
    if (response.success) yield put({ type: constants.GET_VALUATION_SUCCEED, response })
    else yield put({ type: constants.GET_VALUATION_FAILED, response })
  }
}
/* 获取资产列表的余额 */
export function* findAssetList() {
  while (true) {
    const request = yield take(constants.FIND_ASSET_LIST_REQUEST)
    const response = yield call(api.graphql, request.schema)
    if (response.success) {
      const findAsset = response.result.data.find_asset
      const amountVisible = {}
      for (let i = 0; i < findAsset.length; i++) {
        const element = findAsset[i]
        amountVisible[element.token.name] = element.amount
      }
      yield put({ type: constants.FIND_ASSET_LIST_SUCCEED, findAsset, amountVisible })
      yield put({ type: constants.FIND_ASSET_SELECT_TOKEN_UPDATE, findAsset })
    } else {
      yield put({ type: constants.FIND_ASSET_LIST_FAILED, response })
    }
  }
}
