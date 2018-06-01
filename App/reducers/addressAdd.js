const initialState = {
  loading: false,
  error: null,
  formState: {
    address: '',
    remark: '',
    authCode: '',
  },
}

export default function addressAdd(state = initialState, action) {
  let nextState
  const { type, payload } = action

  switch (type) {
    case 'addressAdd/update_form':
      nextState = {
        ...state,
        formState: payload,
      }
      break
    case 'addressAdd/request_address_add':
      nextState = {
        ...state,
        loading: true,
      }
      break
    case 'addressAdd/request_address_add_succeed':
      nextState = {
        ...state,
        loading: false,
      }
      break
    case 'addressAdd/request_address_add_failed':
      nextState = {
        ...state,
        loading: false,
        error: payload,
      }
      break
    default:
      nextState = state
      break
  }
  return nextState
}
