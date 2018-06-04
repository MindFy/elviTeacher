const initialState = {
  loading: false,
  response: null,
  type: 'buy',
  formState: {
    quantity: '',
  },
}

export default function otc(state = initialState, action) {
  let nextState
  const { type, payload } = action

  switch (type) {
    case 'otc/update_form':
      nextState = {
        ...state,
        formState: {
          quantity: payload,
        },
      }
      break
    case 'otc/change_type':
      nextState = {
        ...state,
        type: payload,
      }
      break
    case 'otc/submit_request':
      nextState = {
        ...state,
        loading: true,
      }
      break
    case 'otc/submit_request_succeed':
      nextState = {
        ...state,
        formState: { quantity: '' },
        loading: false,
        response: payload,
      }
      break
    case 'otc/submit_request_failed':
      nextState = {
        ...state,
        loading: false,
        response: payload,
      }
      break
    case 'otc/clear_response':
      nextState = {
        ...state,
        response: null,
      }
      break
    default:
      nextState = state
      break
  }

  return nextState
}
