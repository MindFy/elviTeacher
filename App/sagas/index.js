import {
  take, fork, call, put,
} from 'redux-saga/effects'
import * as constants from '../constants/index'
import * as api from '../services/api'
import * as user from './user'

/* 取消提币 */
function* cancelWithdraw() {
  while (true) {
    const request = yield take(constants.CANCEL_WITH_DRAW_REQUEST)
    const response = yield call(api.cancelWithdraw, request.data)
    if (response.success) yield put({ type: constants.CANCEL_WITH_DRAW_SUCCEED, response })
    else yield put({ type: constants.CANCEL_WITH_DRAW_FAILED, response })
  }
}

/* 获取轮播图片 */
function* findBanners() {
  while (true) {
    const request = yield take(constants.FIND_BANNERS_REQUEST)
    const response = yield call(api.graphql, request.schema)
    if (response.success) {
      yield put({ type: constants.FIND_BANNERS_SUCCEED, response })
    } else {
      yield put({ type: constants.FIND_BANNERS_FAILED, response })
    }
  }
}
/* 按交易币币对，查询委托的买卖的各10档 */
function* getShelves() {
  while (true) {
    const request = yield take(constants.GET_SHELVES_REQUEST)
    const response = yield call(api.getShelves, request.data)
    if (response.success) yield put({ type: constants.GET_SHELVES_SUCCEED, response })
    else yield put({ type: constants.GET_SHELVES_FAILED, response })
  }
}
/* 获取某个币币对最新交易列表 */
function* latestDeals() {
  while (true) {
    const request = yield take(constants.LATEST_DEALS_REQUEST)
    const response = yield call(api.latestDeals, request.data)
    if (response.success) yield put({ type: constants.LATEST_DEALS_SUCCEED, response })
    else yield put({ type: constants.LATEST_DEALS_FAILED, response })
  }
}
/* 创建委托单 */
function* delegateCreate() {
  while (true) {
    const request = yield take(constants.DELEGATE_CREATE_REQUEST)
    const response = yield call(api.delegateCreate, request.data)
    if (response.success) yield put({ type: constants.DELEGATE_CREATE_SUCCEED, response })
    else yield put({ type: constants.DELEGATE_CREATE_FAILED, response })
  }
}
/* 按交易币币对，查询深度图 */
function* getDepthMap() {
  while (true) {
    const request = yield take(constants.GET_DEPTH_MAP_REQUEST)
    const response = yield call(api.getDepthMap, request.data)
    if (response.success) yield put({ type: constants.GET_DEPTH_MAP_SUCCEED, response })
    else yield put({ type: constants.GET_DEPTH_MAP_FAILED, response })
  }
}
/* 获取交易中心的涨幅，包含：左上角以及顶上数据 */
function* getRose() {
  while (true) {
    yield take(constants.GET_ROSE_REQUEST)
    const response = yield call(api.getRose)
    if (response.success) yield put({ type: constants.GET_ROSE_SUCCEED, response })
    else yield put({ type: constants.GET_ROSE_FAILED, response })
  }
}
/* 增加一个提币地址 */
function* addressAdd() {
  while (true) {
    const request = yield take(constants.ADDRESS_ADD_REQUEST)
    const response = yield call(api.addressAdd, request.data)
    if (response.success) yield put({ type: constants.ADDRESS_ADD_SUCCEED, response })
    else yield put({ type: constants.ADDRESS_ADD_FAILED, response })
  }
}
/* 获取用户提币地址 */
function* findAddress() {
  while (true) {
    const request = yield take(constants.FIND_ADDRESS_REQUEST)
    const response = yield call(api.graphql, request.schema)
    if (response.success) yield put({ type: constants.FIND_ADDRESS_SUCCEED, response })
    else yield put({ type: constants.FIND_ADDRESS_FAILED, response })
  }
}
/* 获取announcement */
function* findAnnouncement() {
  while (true) {
    const request = yield take(constants.FIND_ANNOUNCEMENT_REQUEST)
    const response = yield call(api.graphql, request.schema)
    if (response.success) yield put({ type: constants.FIND_ANNOUNCEMENT_SUCCEED, response })
    else yield put({ type: constants.FIND_ANNOUNCEMENT_FAILED, response })
  }
}
/* 创建充值地址,触发时创建，减少浪费 */
function* createAddress() {
  while (true) {
    const request = yield take(constants.CREATE_ADDRESS_REQUEST)
    const response = yield call(api.createAddress, request.data)
    if (response.success) yield put({ type: constants.CREATE_ADDRESS_SUCCEED, response })
    else yield put({ type: constants.CREATE_ADDRESS_FAILED, response })
  }
}
/* 获取某几个币种的余额等信息 */
function* getAssets() {
  while (true) {
    const request = yield take(constants.GET_ASSETS_REQUEST)
    const response = yield call(api.getAssets, request.data)
    if (response.success) yield put({ type: constants.GET_ASSETS_SUCCEED, response })
    else yield put({ type: constants.GET_ASSETS_FAILED, response })
  }
}
/* 获取资产列表的余额 */
function* findAssetList() {
  while (true) {
    const request = yield take(constants.FIND_ASSET_LIST_REQUEST)
    const response = yield call(api.graphql, request.schema)
    if (response.success) yield put({ type: constants.FIND_ASSET_LIST_SUCCEED, response })
    else yield put({ type: constants.FIND_ADDRESS_FAILED, response })
  }
}

export default function* rootSaga() {
  yield [
    fork(user.checkVerificateCode),
    fork(user.getVerificateCode),
    fork(user.getUser),
    fork(user.idCardAuth),
    fork(user.isExist),
    fork(user.login),
    fork(user.logout),
    fork(user.register),
    fork(user.resetPassword),
    fork(user.sync),
    fork(user.updatePassword),

    fork(cancelWithdraw),

    fork(findBanners),
    fork(getShelves),
    fork(latestDeals),
    fork(delegateCreate),
    fork(getDepthMap),
    fork(getRose),
    fork(addressAdd),
    fork(findAddress),
    fork(findAnnouncement),
    fork(createAddress),
    fork(getAssets),
    fork(findAssetList),
  ]
}
