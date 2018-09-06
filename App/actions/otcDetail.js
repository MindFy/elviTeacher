export function requestOtcList(payload) {
  return {
    type: 'otcDetail/request_otc_list',
    payload,
  }
}

export function requestOtcListSucceed(payload) {
  return {
    type: 'otcDetail/request_otc_list_succeed',
    payload,
  }
}

export function requestOtcListFailed(payload) {
  return {
    type: 'otcDetail/request_otc_list_failed',
    payload,
  }
}

export function updateListPage(payload) {
  return {
    type: 'otcDetail/update_list_page',
    payload,
  }
}

export function requestGetCode(payload) {
  return {
    type: 'otcDetail/request_get_code',
    payload,
  }
}

export function requestConfirmPay(payload) {
  return {
    type: 'otcDetail/request_confirm_pay',
    payload,
  }
}

export function requestHavedPay(payload) {
  return {
    type: 'otcDetail/request_haved_pay',
    payload,
  }
}

export function requestCancel(payload) {
  return {
    type: 'otcDetail/request_cancel',
    payload,
  }
}

export function requestAllege(payload) {
  return {
    type: 'otcDetail/request_allege',
    payload,
  }
}

export function requestGetCodeSucceed(payload) {
  return {
    type: 'otcDetail/request_get_code_succeed',
    payload,
  }
}

export function requestGetCodeFailed(payload) {
  return {
    type: 'otcDetail/request_get_code_failed',
    payload,
  }
}

export function updateForm(payload) {
  return {
    type: 'otcDetail/update_form',
    payload,
  }
}

export function updateOtcList(payload) {
  return {
    type: 'otcDetail/update_otc_list',
    payload,
  }
}

export function updateAuthCodeType(payload) {
  return {
    type: 'otcDetail/update_auth_code_type',
    payload,
  }
}

export function check2GoogleAuth(payload) {
  return {
    type: 'otcDetail/check2_google_auth',
    payload,
  }
}

export function check2GoogleAuthSetResponse(payload) {
  return {
    type: 'otcDetail/check2_google_auth_set_response',
    payload,
  }
}
