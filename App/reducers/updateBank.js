const initialState = {
  formState: {
    bankName: '',
    subbankName: '',
    bankNo: '',
    code: '',
  },
  mobile: '',
  loading: false,
  updateBankError: null,
  getCodeError: null,
  updateBankResult: null,
  getCodeResult: null,
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
    case 'notify/clear_reducer':
      nextState = initialState
      break
    default:
      nextState = state
      break
  }

  return nextState
}
