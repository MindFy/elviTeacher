export function updateForm(payload) {
  return {
    type: 'otc/update_form',
    payload,
  }
}

export function changeType(payload) {
  return {
    type: 'otc/change_type',
    payload,
  }
}

export function submitRequest(payload) {
  return {
    type: 'otc/submit_request',
    payload,
  }
}

export function submitRequestSucceed(payload) {
  return {
    type: 'otc/submit_request_succeed',
    payload,
  }
}

export function submitRequestFailed(payload) {
  return {
    type: 'otc/submit_request_failed',
    payload,
  }
}

export function clearResponse() {
  return {
    type: 'otc/clear_response',
  }
}
