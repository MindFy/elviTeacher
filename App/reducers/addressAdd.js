const initialState = {
  loading: false,
  error: null,
  formState: {
    address: '',
    remark: '',
    authCode: '',
    googleCode: '',
    emailCode: '',
  },
  authCodeType: '短信验证码',
  googleCodeLoading: false,
  googleCodeResponse: null,
  getCodeLoading: false,
  getCodeResult: null,
  getCodeError: null,
  getVerificateSmtpCodeLoading: false,
  getVerificateSmtpCodeResponse: null,
  
  checkSMSCodeLoading: false,
  checkSMSCodeResponse: null,
  checkSmtpCodeLoading: false,
  checkSmtpCodeResponse: null,
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
    case 'addressAdd/check2_google_auth':
      nextState = {
        ...state,
        googleCodeLoading: true,
      }
      break
    case 'addressAdd/check2_google_auth_set_response':
      nextState = {
        ...state,
        googleCodeLoading: false,
        googleCodeResponse: payload,
      }
      break
    case 'addressAdd/check2_sms_auth':
      nextState = {
        ...state,
        checkSMSCodeLoading: true,
      }
      break
    case 'addressAdd/check2_sms_auth_set_response':
      nextState = {
        ...state,
        checkSMSCodeLoading: false,
        checkSMSCodeResponse: payload,
      }
      break
    case 'addressAdd/check2_smtp_auth':
      nextState = {
        ...state,
        checkSmtpCodeLoading: true,
      }
      break
    case 'addressAdd/check2_smtp_auth_set_response':
      nextState = {
        ...state,
        checkSmtpCodeLoading: false,
        checkSmtpCodeResponse: payload,
      }
      break
    case 'addressAdd/request_get_code':
      nextState = {
        ...state,
        getCodeLoading: true,
        getCodeResult: null,
        getCodeError: null,
      }
      break
    case 'addressAdd/request_get_code_succeed':
      nextState = {
        ...state,
        getCodeLoading: false,
        getCodeResult: payload,
        getCodeError: null,
      }
      break
    case 'addressAdd/request_get_code_failed':
      nextState = {
        ...state,
        getCodeLoading: false,
        getCodeResult: null,
        getCodeError: payload,
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
