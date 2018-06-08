const initialState = {
  invitationCount: 0,
  totalCountTK: 0,
  totalCountBTC: 0,
  user: {
    levelName: null,
    prefixNo: '',
    recommendId: '',
  },
  userLoading: false,
  userError: null,
}

export default function rebates(state = initialState, action) {
  const { type, payload } = action
  let nextState = state

  switch (type) {
    case 'rebates/request_invitation_count':
      nextState = {
        ...state,
      }
      break
    case 'rebates/request_invitation_count_succeed':
      nextState = {
        ...state,
        invitationCount: payload,
      }
      break
    case 'rebates/request_invitation_count_failed':
      nextState = {
        ...state,
      }
      break
    case 'rebates/request_rebates_count_tk':
      nextState = {
        ...state,
      }
      break
    case 'rebates/request_rebates_count_tk_succeed':
      nextState = {
        ...state,
        totalCountTK: payload,
      }
      break
    case 'rebates/request_rebates_count_tk_failed':
      nextState = {
        ...state,
      }
      break
    case 'rebates/request_rebates_count_btc':
      nextState = {
        ...state,
      }
      break
    case 'rebates/request_rebates_count_btc_succeed':
      nextState = {
        ...state,
        totalCountBTC: payload,
      }
      break
    case 'rebates/request_rebates_count_btc_failed':
      nextState = {
        ...state,
      }
      break
    case 'rebates/request_user':
      nextState = {
        ...state,
        userLoading: true,
      }
      break
    case 'rebates/request_user_succeed':
      nextState = {
        ...state,
        userLoading: false,
        user: payload,
        userError: null,
      }
      break
    case 'rebates/request_user_failed':
      nextState = {
        ...state,
        userLoading: false,
        userError: payload,
      }
      break
    case 'notify/clear_reducer':
      nextState = initialState
      break
    default:
      break
  }
  return nextState
}
