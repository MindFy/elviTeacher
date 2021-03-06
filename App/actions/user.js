import * as constants from '../constants/index'

export function getGoogleAuth(schema) {
  return {
    type: constants.GET_GOOGLE_AUTH_REQUEST,
    schema,
  }
}

export function getVerificateCode(data) {
  return {
    type: constants.GET_VERIFICATE_CODE_REQUEST,
    data,
  }
}

export function findUser(schema) {
  return {
    type: constants.FIND_USER_REQUEST,
    schema,
  }
}

export function findUserUpdate(user) {
  return {
    type: constants.FIND_USER_UPDATE,
    user,
  }
}

export function idCardAuth(data) {
  return {
    type: constants.ID_CARD_AUTH_REQUEST,
    data,
  }
}

export function imgHash() {
  return {
    type: constants.IMG_HASH_REQUEST,
  }
}

export function imgHashFailed() {
  return {
    type: constants.IMG_HASH_FAILED,
  }
}

export function idCardAuthUpdate(data) {
  return {
    type: constants.ID_CARD_AUTH_UPDATE,
    data,
  }
}

export function isExist(data) {
  return {
    type: constants.IS_EXIST_REQUEST,
    data,
  }
}

export function clearAllReducer() {
  return {
    type: 'notify/clear_reducer',
  }
}

export function register(data) {
  return {
    type: constants.REGISTER_REQUEST,
    data,
  }
}

export function registerUpdate(data) {
  return {
    type: constants.REGISTER_UPDATE,
    data,
  }
}

export function resetPassword(data) {
  return {
    type: constants.RESET_PASSWORD_REQUEST,
    data,
  }
}

export function sync() {
  return {
    type: constants.SYNC_REQUEST,
  }
}

export function updatePassword(data) {
  return {
    type: constants.UPDATE_PASSWORD_REQUEST,
    data,
  }
}

export function updatePasswordUpdate(data) {
  return {
    type: constants.UPDATE_PASSWORD_UPDATE,
    data,
  }
}

export function updateEmail(data) {
  return {
    type: constants.UPDATE_EMAIL_REQUEST,
    data,
  }
}

export function updateEmailMobileUpdate(data) {
  return {
    type: constants.UPDATE_EMAIL_MOBILE_UPDATE,
    data,
  }
}

export function updateMobile(data) {
  return {
    type: 'me/update_mobile_request',
    data,
  }
}

export function findAuditmanage(data) {
  return {
    type: constants.FIND_AUDIT_MANAGE,
    data,
  }
}

export function mobileIsExist(data) {
  return {
    type: 'user/mobile_isExist_requesting',
    data,
  }
}

export function clearMobileIsExist() {
  return {
    type: 'user/mobile_isExist_clear',
  }
}

export function registerResetNexus() {
  return {
    type: 'register/reset_nexus',
  }
}
