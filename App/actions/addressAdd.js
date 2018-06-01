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
