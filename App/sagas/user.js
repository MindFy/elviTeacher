import {
  take, call, put,
} from 'redux-saga/effects'
import {
  DeviceEventEmitter,
} from 'react-native'
import {
  Toast,
} from 'teaset'
import {
  common,
  storeSave,
} from '../constants/common'
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
/* 获取验证码 */
export function* getVerificateSmtpCode() {
  while (true) {
    const request = yield take(constants.GET_VERIFICATE_SMTP_CODE_REQUEST)
    const response = yield call(api.getVerificateSmtpCode, request.data)
    if (response.success) yield put({ type: constants.GET_VERIFICATE_SMTP_CODE_SUCCEED, response })
    else yield put({ type: constants.GET_VERIFICATE_SMTP_CODE_FAILED, response })
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
      DeviceEventEmitter.emit(common.noti.idCardAuth)
    } else {
      yield put({ type: constants.ID_CARD_AUTH_FAILED, response })
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
/* 登录 */
export function* login() {
  while (true) {
    const request = yield take(constants.LOGIN_REQUEST)
    const response = yield call(api.login, request.data)
    if (response.success) {
      yield put({ type: constants.FIND_USER_UPDATE, user: response.result })
      yield put({ type: constants.LOGIN_SUCCEED, response })
    } else {
      yield put({ type: constants.LOGIN_FAILED, response })
    }
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
    if (response.success && response.result.mobile.length) {
      DeviceEventEmitter.emit(common.noti.home, constants.SYNC_SUCCEED)
    } else if (response.success && !response.result.mobile.length) {
      DeviceEventEmitter.emit(common.noti.home, constants.SYNC_FAILED)
    }
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
    if (response.success) {
      yield put({ type: constants.UPDATE_BANK_SUCCEED, response, user: request.user })
    } else {
      yield put({ type: constants.UPDATE_BANK_FAILED, response })
    }
  }
}
/* 用户绑定邮箱 */
export function* updateEmail() {
  while (true) {
    const request = yield take(constants.UPDATE_EMAIL_REQUEST)
    const response = yield call(api.updateEmail, request.data)
    if (response.success) {
      Toast.success(response.result)
      DeviceEventEmitter.emit(common.noti.updateEmail)
      yield put({ type: constants.UPDATE_EMAIL_SUCCEED, response })
    } else {
      yield put({ type: constants.UPDATE_EMAIL_FAILED, response })
      if (response.error.message === common.badNet) {
        Toast.fail('网络连接失败，请稍后重试')
      } else if (response.error.code === 4000101) {
        Toast.fail('验证码不能为空')
      } else if (response.error.code === 4000102) {
        Toast.fail('验证码错误')
      } else if (response.error.code === 4000103) {
        Toast.fail('验证码已过期，请重新获取')
      } else if (response.error.code === 4000160) {
        Toast.fail('邮箱格式不正确')
      } else if (response.error.code === 4000161) {
        Toast.fail('邮箱已被注册')
      } else if (response.error.code === 4000162) {
        Toast.fail('账户不存在')
      } else {
        Toast.fail('邮箱绑定失败')
      }
    }
  }
}
