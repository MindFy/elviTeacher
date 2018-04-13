import {
  take, fork, call, put,
} from 'redux-saga/effects'
import * as constants from '../constants/index'
import * as api from '../services/api'

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
    if (response.success) yield put({ type: constants.FIND_BANNERS_SUCCEED, response })
    else yield put({ type: constants.FIND_BANNERS_FAILED, response })
  }
}

export default function* rootSaga() {
  yield [
    fork(login),
    fork(register),
    fork(getVerificateCode),
    fork(checkVerificateCode),
    fork(resetPassword),
    fork(logout),
    fork(userInfo),
    fork(updatePassword),
    fork(findBanners),
  ]
}
