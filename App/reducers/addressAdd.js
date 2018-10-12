const initialState = {
  loading: false,
  error: null,
  formState: {
    address: '',
    remark: '',
    smsCode: '',
    googleCode: '',
    emailCode: '',
  },
  authCodeType: '短信验证码',
  requestGetCodeLoading: false,
  requestGetCodeResponse: null,
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
        error: payload,
      }
      break
    case 'addressAdd/request_address_clear_error':
      nextState = {
        ...state,
        error: null,
      }
      break
    case 'addressAdd/update_auth_code_type':
      nextState = {
        ...state,
        authCodeType: payload,
      }
      break
    case 'addressAdd/request_get_code':
      nextState = {
        ...state,
        requestGetCodeLoading: true,
        requestGetCodeResponse: null,
      }
      break
    case 'addressAdd/request_get_code_succeed':
      nextState = {
        ...state,
        requestGetCodeLoading: false,
        requestGetCodeResponse: payload,
      }
      break
    case 'addressAdd/request_get_code_failed':
      nextState = {
        ...state,
        requestGetCodeLoading: false,
        requestGetCodeResponse: payload,
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
