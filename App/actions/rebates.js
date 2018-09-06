export function requesetInvitationCount(payload) {
  return {
    type: 'rebates/request_invitation_count',
    payload,
  }
}

export function requestRebatesCountTK(payload) {
  return {
    type: 'rebates/request_rebates_count_tk',
    payload,
  }
}

export function requestRebatesCountBTC(payload) {
  return {
    type: 'rebates/request_rebates_count_btc',
    payload,
  }
}

export function requestUser(payload) {
  return {
    type: 'rebates/request_user',
    payload,
  }
}
