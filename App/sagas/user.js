import {
  take, call, put,
} from 'redux-saga/effects'
import {
  DeviceEventEmitter,
} from 'react-native'
import {
  common,
  storeSave,
} from '../constants/common'
import * as constants from '../constants/index'
import * as api from '../services/api'

/* 获取谷歌验证信息 */
export function* getGoogleAuth() {
  while (true) {
    const request = yield take(constants.GET_GOOGLE_AUTH_REQUEST)
    const response = yield call(api.graphql, request.schema)
    if (response.success && response.result.data.user.googleSecret) {
      const user = response.result.data.user
      storeSave(common.noti.googleAuth, user.googleSecret, (e) => {})
      yield put({ type: constants.GET_GOOGLE_AUTH_SUCCEED })
    } else {
      storeSave(common.noti.googleAuth, false, (e) => {})
      yield put({ type: constants.GET_GOOGLE_AUTH_FAILED })
    }
    DeviceEventEmitter.emit(common.noti.googleAuth)
  }
}

/* 获取验证码 */
export function* getVerificateCode() {
  while (true) {
    const request = yield take(constants.GET_VERIFICATE_CODE_REQUEST)
    const response = yield call(api.requestVerificateCode, request.data)
    if (response.success) yield put({ type: constants.GET_VERIFICATE_CODE_SUCCEED, response })
    else yield put({ type: constants.GET_VERIFICATE_CODE_FAILED, response })
  }
}

/* 获取单个用户的信息 */
export function* findUser() {
  while (true) {
    const request = yield take(constants.FIND_USER_REQUEST)
    const response = yield call(api.graphql, request.schema)
    if (response.success) {
      const user = response.result.data.user
      storeSave(common.user.string, user)
      yield put({ type: constants.FIND_USER_SUCCEED, user })
    }
  }
}
/* 提交身份认证审核 */
export function* idCardAuth() {
  while (true) {
    const request = yield take(constants.ID_CARD_AUTH_REQUEST)
    const response = yield call(api.idCardAuth, request.data)
    if (response.success) {
      yield put({ type: constants.ID_CARD_AUTH_SUCCEED, response })
      DeviceEventEmitter.emit('idCardAuth')
    } else {
      yield put({ type: constants.ID_CARD_AUTH_FAILED, response })
    }
  }
}

export function* findAuditmanage() {
  while (true) {
    const request = yield take(constants.FIND_AUDIT_MANAGE)
    const response = yield call(api.graphql, request.data)
    if (response.success) {
      yield put({
        type: constants.FIND_AUDIT_MANAGE_SUCCEED,
        data: response.result.data.find_auditmanage,
      })
    } else {
      yield put({ type: constants.FIND_AUDIT_MANAGE_FAILED, data: undefined })
    }
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

/* 用户自己修改密码 */
export function* updatePassword() {
  while (true) {
    const request = yield take(constants.UPDATE_PASSWORD_REQUEST)
    const response = yield call(api.updatePassword, request.data)
    if (response.success) yield put({ type: constants.UPDATE_PASSWORD_SUCCEED, response })
    else yield put({ type: constants.UPDATE_PASSWORD_FAILED, response })
  }
}
/* 检测手机号是否已被注册 */
export function* mobileIsExist() {
  while (true) {
    const request = yield take('user/mobile_isExist_requesting')
    const response = yield call(api.isExist, request.data)
    if (response.success) {
      yield put({
        type: 'user/mobile_isExist_result',
        data: (response.result === 1),
      })
    } else {
      yield put({
        type: 'user/mobile_isExist_result',
        data: false,
      })
    }
  }
}

/* 用户绑定邮箱 */
export function* updateEmail() {
  while (true) {
    const request = yield take(constants.UPDATE_EMAIL_REQUEST)
    const response = yield call(api.updateEmail, request.data)
    if (response.success) {
      yield put({ type: constants.UPDATE_EMAIL_SUCCEED, payload: response.result })
    } else {
      yield put({ type: constants.UPDATE_EMAIL_FAILED, payload: response.error })
    }
  }
}

export function* updateMobile() {
  while (true) {
    const request = yield take('me/update_mobile_request')
    const response = yield call(api.updateMobile, request.data)
    if (response.success) {
      yield put({ type: 'me/update_mobile_success', payload: response.result })
    } else {
      yield put({ type: 'me/update_mobile_failed', payload: response.error })
    }
  }
}
