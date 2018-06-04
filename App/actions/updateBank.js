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
