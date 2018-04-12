import {
  USERINFO_UPDATE,
  LOGOUT_REQUEST,
} from '../constants/index'

export function userInfoUpdate(userInfo) {
  return {
    type: USERINFO_UPDATE,
    userInfo,
  }
}

export function logoutRequest() {
  return {
    type: LOGOUT_REQUEST,
  }
}
