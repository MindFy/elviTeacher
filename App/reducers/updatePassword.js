const initialState = {
  formState: {
    smsCode: '',
    googleCode: '',
    emailCode: '',
  },
  requestGetCodeLoading: false,
  requestGetCodeResponse: null,
}

export default function updatePassword(state = initialState, action) {
  let nextState
  const { type, payload } = action

  switch (type) {
    case 'updatePassword/update_form':
      nextState = {
        ...state,
        formState: payload,
      }
      break
    case 'updatePassword/update_auth_code_type':
      nextState = {
        ...state,
        authCodeType: payload,
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
