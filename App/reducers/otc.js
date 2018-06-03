const initialState = {
  formState: {
    quantity: '',
    type: '',
  },
}

export default function otc(state = initialState, action) {
  let nextState
  const { type, payload } = action

  switch (type) {
    case 'otc/update_form':
      nextState = {
        ...state,
      }
      break
    case 'otc/sell_request':
      nextState = {
        ...state,
      }
      break
    case 'otc/sell_request_succeed':
      nextState = {
        ...state,
      }
      break
    case 'otc/sell_request_failed':
      nextState = {
        ...state,
      }
      break
    case 'otc/buy_request':
      nextState = {
        ...state,
      }
      break
    case 'otc/buy_request_succeed':
      nextState = {
        ...state,
      }
      break
    case 'otc/buy_request_failed':
      nextState = {
        ...state,
      }
      break
    default:
      nextState = state
      break
  }

  return nextState
}
