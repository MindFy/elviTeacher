const initialState = {
  formState: {
    bankName: '',
    subbankName: '',
    bankNo: '',
    code: '',
    googleCode: '',
    emailCode: '',
  },
  mobile: '',
  loading: false,
  updateBankError: null,
  getCodeError: null,
  updateBankResult: null,
  getCodeResult: null,
  googleCodeLoading: false,
  googleCodeResponse: null,
  checkSMSCodeLoading: false,
  checkSMSCodeResponse: null,
  checkSmtpCodeLoading: false,
  checkSmtpCodeResponse: null,
  getVerificateSmtpCodeLoading: false,
  getVerificateSmtpCodeResponse: null,
}

export default function updateBank(state = initialState, action) {
  let nextState
  const { type, payload } = action

  switch (type) {
    case 'updateBank/request_update_bank':
      nextState = {
        ...state,
        loading: true,
        updateBankError: null,
        updateBankResult: null,
      }
      break
    case 'updateBank/request_update_bank_succeed':
      nextState = {
        ...state,
        loading: false,
        updateBankError: null,
        updateBankResult: payload,
      }
      break
    case 'updateBank/request_update_bank_failed':
      nextState = {
        ...state,
        loading: false,
        updateBankError: payload,
        updateBankResult: null,
      }
      break
    case 'updateBank/update_form':
      nextState = {
        ...state,
        formState: payload,
      }
      break
    case 'updateBank/request_get_code':
      nextState = {
        ...state,
        loading: true,
        getCodeError: null,
        getCodeResult: null,
      }
      break
    case 'updateBank/request_get_code_succeed':
      nextState = {
        ...state,
        loading: false,
        getCodeError: null,
        getCodeResult: payload,
      }
      break
    case 'updateBank/request_get_code_failed':
      nextState = {
        ...state,
        loading: false,
        getCodeError: payload,
        getCodeResult: null,
      }
      break
    case 'updateBank/update_auth_code_type':
      nextState = {
        ...state,
        authCodeType: payload,
      }
      break
    case 'updateBank/check2_google_auth':
      nextState = {
        ...state,
        googleCodeLoading: true,
      }
      break
    case 'updateBank/check2_google_auth_set_response':
      nextState = {
        ...state,
        googleCodeLoading: false,
        googleCodeResponse: payload,
      }
      break
    case 'updateBank/check2_sms_auth':
      nextState = {
        ...state,
        checkSMSCodeLoading: true,
      }
      break
    case 'updateBank/check2_sms_auth_set_response':
      nextState = {
        ...state,
        checkSMSCodeLoading: false,
        checkSMSCodeResponse: payload,
      }
      break
    case 'updateBank/check2_smtp_auth':
      nextState = {
        ...state,
        checkSmtpCodeLoading: true,
      }
      break
    case 'updateBank/check2_smtp_auth_set_response':
      nextState = {
        ...state,
        checkSmtpCodeLoading: false,
        checkSmtpCodeResponse: payload,
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
