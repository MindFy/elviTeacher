import {
  take, call, put,
} from 'redux-saga/effects'
import * as constants from '../constants/index'
import * as api from '../services/api'

/* 检测验证码 */
export function* checkVerificateCode() {
  while (true) {
    const request = yield take(constants.CHECK_VERIFICATE_CODE_REQUEST)
    const response = yield call(api.checkVerificateCode, request.data)
    if (response.success) yield put({ type: constants.CHECK_VERIFICATE_CODE_SUCCEED, response })
    else yield put({ type: constants.CHECK_VERIFICATE_CODE_FAILED, response })
  }
}
/* 获取验证码 */
export function* getVerificateCode() {
  while (true) {
    const request = yield take(constants.GET_VERIFICATE_CODE_REQUEST)
    const response = yield call(api.getVerificateCode, request.data)
    if (response.success) yield put({ type: constants.GET_VERIFICATE_CODE_SUCCEED, response })
    else yield put({ type: constants.GET_VERIFICATE_CODE_FAILED, response })
  }
}
/* 获取单个用户的信息 */
export function* findUser() {
  while (true) {
    const request = yield take(constants.FIND_USER_REQUEST)
    const response = yield call(api.graphql, request.schema)
    if (response.success) yield put({ type: constants.FIND_USER_SUCCEED, response })
    else yield put({ type: constants.FIND_USER_FAILED, response })
  }
}
/* 提交身份认证审核 */
export function* idCardAuth() {
  while (true) {
    const request = yield take(constants.ID_CARD_AUTH_REQUEST)
    const response = yield call(api.idCardAuth, request.data)
    if (response.success) yield put({ type: constants.ID_CARD_AUTH_SUCCEED, response })
    else yield put({ type: constants.ID_CARD_AUTH_FAILED, response })
  }
}
/* 检查对象是否存在 */
export function* isExist() {
  while (true) {
    const request = yield take(constants.IS_EXIST_REQUEST)
    const response = yield call(api.isExist, request.data)
    if (response.success) yield put({ type: constants.IS_EXIST_SUCCEED, response })
    else yield put({ type: constants.IS_EXIST_FAILED, response })
  }
}
/* 登录 */
export function* login() {
  while (true) {
    const request = yield take(constants.LOGIN_REQUEST)
    const response = yield call(api.login, request.data)
    if (response.success) yield put({ type: constants.LOGIN_SUCCEED, response })
    else yield put({ type: constants.LOGIN_FAILED, response })
  }
}
/* 注销用户 */
export function* logout() {
  while (true) {
    yield take(constants.LOGOUT_REQUEST)
    const response = yield call(api.logout)
    if (response.success) yield put({ type: constants.LOGOUT_SUCCEED, response })
    else yield put({ type: constants.LOGOUT_FAILED, response })
  }
}
/* 注册 */
export function* register() {
  while (true) {
    const request = yield take(constants.REGISTER_REQUEST)
    const response = yield call(api.register, request.data)
    if (response.success) yield put({ type: constants.REGISTER_SUCCEED, response })
    else yield put({ type: constants.REGISTER_FAILED, response })
  }
}
/* 重设密码 */
export function* resetPassword() {
  while (true) {
    const request = yield take(constants.RESET_PASSWORD_REQUEST)
    const response = yield call(api.resetPassword, request.data)
    if (response.success) yield put({ type: constants.RESET_PASSWORD_SUCCEED, response })
    else yield put({ type: constants.RESET_PASSWORD_FAILED, response })
  }
}
/* app、web状态同步 */
export function* sync() {
  while (true) {
    yield take(constants.SYNC_REQUEST)
    const response = yield call(api.sync)
    if (response.success) yield put({ type: constants.SYNC_SUCCEED, response })
    else yield put({ type: constants.SYNC_FAILED, response })
  }
}
/* 用户自己修改密码 */
export function* updatePassword() {
  while (true) {
    const request = yield take(constants.UPDATE_PASSWORD_REQUEST)
    const response = yield call(api.updatePassword, request.data)
    if (response.success) yield put({ type: constants.UPDATE_PASSWORD_SUCCEED, response })
    else yield put({ type: constants.UPDATE_PASSWORD_FAILED, response })
  }
}
/* 用户绑定银行卡信息 */
export function* updateBank() {
  while (true) {
    const request = yield take(constants.UPDATE_BANK_REQUEST)
    const response = yield call(api.updateBank, request.data)
    if (response.success) yield put({ type: constants.UPDATE_BANK_SUCCEED, response })
    else yield put({ type: constants.UPDATE_BANK_FAILED, response })
  }
}
