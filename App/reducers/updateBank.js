const initialState = {
  formState: {
    bankName: '',
    subbankName: '',
    bankNo: '',
    smsCode: '',
    googleCode: '',
    emailCode: '',
  },
  mobile: '',
  loading: false,
  updateBankError: null,
  updateBankResult: null,
  requestGetCodeLoading: false,
  requestGetCodeResponse: null,
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
        requestGetCodeLoading: true,
        requestGetCodeResponse: null,
      }
      break
    case 'updateBank/request_get_code_succeed':
      nextState = {
        ...state,
        requestGetCodeLoading: false,
        requestGetCodeResponse: payload,
      }
      break
    case 'updateBank/request_get_code_failed':
      nextState = {
        ...state,
        requestGetCodeLoading: false,
        requestGetCodeResponse: payload,
      }
      break
    case 'updateBank/update_auth_code_type':
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
