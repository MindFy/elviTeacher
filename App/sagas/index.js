import {
  take, fork, call, put,
} from 'redux-saga/effects'
import * as constants from '../constants/index'
import * as api from '../services/api'

/* app、web状态同步 */
function* sync() {
  while (true) {
    const request = yield take(constants.SYNC_REQUEST)
    const response = yield call(api.sync, request.data)
    if (response.success) yield put({ type: constants.SYNC_SUCCEED, response })
    else yield put({ type: constants.SYNC_FAILED, response })
  }
}
/* 登录 */
function* login() {
  while (true) {
    const request = yield take(constants.LOGIN_REQUEST)
    const response = yield call(api.login, request.data)
    if (response.success) yield put({ type: constants.LOGIN_SUCCEED, response })
    else yield put({ type: constants.LOGIN_FAILED, response })
  }
}
/* 注册 */
function* register() {
  while (true) {
    const request = yield take(constants.REGISTER_REQUEST)
    const response = yield call(api.register, request.data)
    if (response.success) yield put({ type: constants.REGISTER_SUCCEED, response })
    else yield put({ type: constants.REGISTER_FAILED, response })
  }
}
/* 获取验证码 */
function* getVerificateCode() {
  while (true) {
    const request = yield take(constants.GET_VERIFICATE_CODE_REQUEST)
    const response = yield call(api.getVerificateCode, request.data)
    if (response.success) yield put({ type: constants.GET_VERIFICATE_CODE_SUCCEED, response })
    else yield put({ type: constants.GET_VERIFICATE_CODE_FAILED, response })
  }
}
/* 检测验证码 */
function* checkVerificateCode() {
  while (true) {
    const request = yield take(constants.CHECK_VERIFICATE_CODE_REQUEST)
    const response = yield call(api.checkVerificateCode, request.data)
    if (response.success) yield put({ type: constants.CHECK_VERIFICATE_CODE_SUCCEED, response })
    else yield put({ type: constants.CHECK_VERIFICATE_CODE_FAILED, response })
  }
}
/* 重设密码 */
function* resetPassword() {
  while (true) {
    const request = yield take(constants.RESET_PASSWORD_REQUEST)
    const response = yield call(api.resetPassword, request.data)
    if (response.success) yield put({ type: constants.RESET_PASSWORD_SUCCEED, response })
    else yield put({ type: constants.RESET_PASSWORD_FAILED, response })
  }
}
/* 注销用户 */
function* logout() {
  while (true) {
    const request = yield take(constants.LOGOUT_REQUEST)
    const response = yield call(api.logout, request.data)
    if (response.success) yield put({ type: constants.LOGOUT_SUCCEED, response })
    else yield put({ type: constants.LOGOUT_FAILED, response })
  }
}
/* 获取单个用户信息 */
function* userInfo() {
  while (true) {
    const request = yield take(constants.USERINFO_REQUEST)
    const response = yield call(api.graphql, request.schema)
    if (response.success) yield put({ type: constants.USERINFO_SUCCEED, response })
    else yield put({ type: constants.USERINFO_FAILED, response })
  }
}
/* 用户自己修改密码 */
function* updatePassword() {
  while (true) {
    const request = yield take(constants.PASSWORD_REQUEST)
    const response = yield call(api.updatePassword, request.data)
    if (response.success) yield put({ type: constants.PASSWORD_SUCCEED, response })
    else yield put({ type: constants.PASSWORD_FAILED, response })
  }
}
/* 获取轮播图片 */
function* findBanners() {
  while (true) {
    const request = yield take(constants.FIND_BANNERS_REQUEST)
    const response = yield call(api.graphql, request.schema)
    if (response.success) {
      yield put({ type: constants.FIND_BANNERS_SUCCEED, response })
      const imgHashs = response.result.data.find_banners
      console.log('imgHashs-->', imgHashs)
      for (let i = 0; i < imgHashs.length; i++) {
        const imghash = imgHashs[i].imghash
        console.log('imghash-', i, '->', imghash)
        // const imgHashResponse = yield call(api.imgHash, { imghash: imgHashs[i].imghash })
        // console.log('imgHashResponse-', i, '->', imgHashResponse)
        // if (imgHashResponse.success) yield put({ type: constants.IMG_HASH_SUCCEED, response })
        // else yield put({ type: constants.IMG_HASH_FAILED, response })
      }
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
    fork(sync),
    fork(login),
    fork(register),
    fork(getVerificateCode),
    fork(checkVerificateCode),
    fork(resetPassword),
    fork(logout),
    fork(userInfo),
    fork(updatePassword),
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
