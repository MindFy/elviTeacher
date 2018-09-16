export function requestUpdateBank(payload) {
  return {
    type: 'updateBank/request_update_bank',
    payload,
  }
}

export function requestUpdateBankSucceed(payload) {
  return {
    type: 'updateBank/request_update_bank_succeed',
    payload,
  }
}

export function requestUpdateBankFailed(payload) {
  return {
    type: 'updateBank/request_update_bank_failed',
    payload,
  }
}

export function updateForm(payload) {
  return {
    type: 'updateBank/update_form',
    payload,
  }
}

export function requestGetCode(payload) {
  return {
    type: 'updateBank/request_get_code',
    payload,
  }
}

export function requestGetCodeSucceed(payload) {
  return {
    type: 'updateBank/request_get_code_succeed',
    payload,
  }
}

export function requestGetCodeFailed(payload) {
  return {
    type: 'updateBank/request_get_code_failed',
    payload,
  }
}

export function updateAuthCodeType(payload) {
  return {
    type: 'updateBank/update_auth_code_type',
    payload,
  }
}

export function check2GoogleAuth(payload) {
  return {
    type: 'updateBank/check2_google_auth',
    payload,
  }
}

export function check2GoogleAuthSetResponse(payload) {
  return {
    type: 'updateBank/check2_google_auth_set_response',
    payload,
  }
}

export function check2SMSAuth(payload) {
  return {
    type: 'updateBank/check2_sms_auth',
    payload,
  }
}

export function check2SMSAuthSetResponse(payload) {
  return {
    type: 'updateBank/check2_sms_auth_set_response',
    payload,
  }
}

export function check2SmtpAuth(payload) {
  return {
    type: 'updateBank/check2_smtp_auth',
    payload,
  }
}

export function check2SmtpAuthSetResponse(payload) {
  return {
    type: 'updateBank/check2_smtp_auth_set_response',
    payload,
  }
}
