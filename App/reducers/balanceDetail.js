const initialState = {
  currentToken: {
    name: undefined,
    id: undefined,
  },
  currentTokenBalance: {
  },
  tradeTokenDatas: [],
  isLoading: false,
}

export default function balanceDetail(state = initialState, action) {
  const { type, payload } = action
  let nextState
  switch (type) {
    case 'balanceDetail/update_current_token':
      nextState = {
        ...state,
        currentToken: payload,
      }
      break
    case 'balanceDetail/update_current_token_balance':
      nextState = {
        ...state,
        currentTokenBalance: payload,
      }
      break
    case 'balanceDetail/request_daily_change':
      nextState = {
        ...state,
        isLoading: true,
        tradeTokenDatas: [],
      }
      break
    case 'balanceDetail/request_daily_change_success':
      nextState = {
        ...state,
        tradeTokenDatas: payload,
        isLoading: false,
      }
      break
    case 'balanceDetail/request_daily_change_failed':
      nextState = {
        ...state,
        isLoading: false,
      }
      break
    default:
      nextState = state
      break
  }
  return nextState
}
