const initialState = {
  otcList: [],
  formState: {
    code: '',
  },
  getCodeLoading: false,
  getCodeResult: null,
  getCodeError: null,
  confirmPayLoading: false,
  confirmPayResult: null,
  confirmPayError: null,
  havedPayLoading: false,
  havedPayResult: null,
  havedPayError: null,
  otcListLoading: false,
  otcListError: null,
}

export default function otcDetail(state = initialState, action) {
  let nextState
  const { type, payload } = action

  switch (type) {
    case 'otcDetail/request_otc_list':
      nextState = {
        ...state,
        otcListLoading: true,
      }
      break
    case 'otcDetail/request_otc_list_succeed':
      nextState = {
        ...state,
        otcListLoading: false,
        otcList: payload,
      }
      break
    case 'otcDetail/request_otc_list_failed':
      nextState = {
        ...state,
        otcListLoading: false,
        otcListError: payload,
      }
      break
    case 'otcDetail/request_get_code':
      nextState = {
        ...state,
        getCodeLoading: true,
      }
      break
    case 'otcDetail/request_get_code_succeed':
      nextState = {
        ...state,
        getCodeLoading: false,
        getCodeResult: payload,
      }
      break
    case 'otcDetail/request_get_code_failed':
      nextState = {
        ...state,
        getCodeLoading: false,
        getCodeError: payload,
      }
      break
    case 'otcDetail/request_confirm_pay':
      nextState = {
        ...state,
        confirmPayLoading: true,
      }
      break
    case 'otcDetail/request_confirm_pay_succeed':
      nextState = {
        ...state,
        confirmPayLoading: false,
        confirmPayResult: payload,
      }
      break
    case 'otcDetail/request_confirm_pay_failed':
      nextState = {
        ...state,
        confirmPayLoading: false,
        confirmPayError: payload,
      }
      break
    case 'otcDetail/request_haved_pay':
      nextState = {
        ...state,
        havedPayLoading: true,
      }
      break
    case 'otcDetail/request_haved_pay_succeed':
      nextState = {
        ...state,
        havedPayLoading: false,
        havedPayResult: payload,
      }
      break
    case 'otcDetail/request_haved_pay_failed':
      nextState = {
        ...state,
        havedPayLoading: false,
        havedPayError: payload,
      }
      break
    case 'otcDetail/update_form':
      nextState = {
        ...state,
        formState: payload,
      }
      break
    default:
      nextState = state
      break
  }

  return nextState
}
