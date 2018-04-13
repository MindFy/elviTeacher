import {
  USERINFO_UPDATE,
  USERINFO_REQUEST,

  LOGOUT_REQUEST,
} from '../constants/index'

export function userInfoUpdate(userInfo) {
  return {
    type: USERINFO_UPDATE,
    userInfo,
  }
}

export function userInfoRequest(schema) {
  return {
    type: USERINFO_REQUEST,
    schema,
  }
}

export function logoutRequest() {
  return {
    type: LOGOUT_REQUEST,
  }
}
