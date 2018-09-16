export function updateForm(payload) {
  return {
    type: 'addressAdd/update_form',
    payload,
  }
}

export function requestAddressAdd(payload) {
  return {
    type: 'addressAdd/request_address_add',
    payload,
  }
}

export function requestAddressAddSucceed(payload) {
  return {
    type: 'addressAdd/request_address_add_succeed',
    payload,
  }
}

export function requestAddressAddFailed(payload) {
  return {
    type: 'addressAdd/request_address_add_failed',
    payload,
  }
}

export function requestAddressClearError(payload) {
  return {
    type: 'addressAdd/request_address_clear_error',
    payload,
  }
}

export function updateAuthCodeType(payload) {
  return {
    type: 'addressAdd/update_auth_code_type',
    payload,
  }
}

export function check2GoogleAuth(payload) {
  return {
    type: 'addressAdd/check2_google_auth',
    payload,
  }
}

export function check2GoogleAuthSetResponse(payload) {
  return {
    type: 'addressAdd/check2_google_auth_set_response',
    payload,
  }
}

export function requestGetCode(payload) {
  return {
    type: 'addressAdd/request_get_code',
    payload,
  }
}

export function check2SMSAuth(payload) {
  return {
    type: 'addressAdd/check2_sms_auth',
    payload,
  }
}

export function check2SMSAuthSetResponse(payload) {
  return {
    type: 'addressAdd/check2_sms_auth_set_response',
    payload,
  }
}

export function check2SmtpAuth(payload) {
  return {
    type: 'addressAdd/check2_smtp_auth',
    payload,
  }
}

export function check2SmtpAuthSetResponse(payload) {
  return {
    type: 'addressAdd/check2_smtp_auth_set_response',
    payload,
  }
}
