const initialState = {
  balanceList: [],
  valuation: undefined,
  loading: false,
}

export default function balance(state = initialState, action) {
  let nextState
  const { type, payload } = action

  switch (type) {
    case 'balance/request_balance_list':
      nextState = {
        ...state,
        loading: true,
      }
      break
    case 'balance/request_balance_list_succeed':
      nextState = {
        ...state,
        loading: false,
        balanceList: payload,
      }
      break
    case 'balance/request_balance_list_failed':
      nextState = {
        ...state,
        loading: false,
      }
      break
    case 'balance/request_balance_valuation':
      nextState = {
        ...state,
      }
      break
    case 'balance/request_balance_valuation_succeed':
      nextState = {
        ...state,
        valuation: payload,
      }
      break
    case 'balance/request_balance_valuation_failed':
      nextState = {
        ...state,
      }
      break
    case 'notify/clear_reducer':
      nextState = initialState
      break
    default:
      nextState = state
      break
  }

  return nextState
}
