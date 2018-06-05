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
  cancelLoading: false,
  cancelResult: null,
  cancelError: null,
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
        otcListError: null,
      }
      break
    case 'otcDetail/request_otc_list_succeed':
      nextState = {
        ...state,
        otcListLoading: false,
        otcList: payload,
        otcListError: null,
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
        getCodeResult: null,
        getCodeError: null,
      }
      break
    case 'otcDetail/request_get_code_succeed':
      nextState = {
        ...state,
        getCodeLoading: false,
        getCodeResult: payload,
        getCodeError: null,
      }
      break
    case 'otcDetail/request_get_code_failed':
      nextState = {
        ...state,
        getCodeLoading: false,
        getCodeResult: null,
        getCodeError: payload,
      }
      break
    case 'otcDetail/request_confirm_pay':
      nextState = {
        ...state,
        confirmPayLoading: true,
        confirmPayResult: null,
        confirmPayError: null,
      }
      break
    case 'otcDetail/request_confirm_pay_succeed':
      nextState = {
        ...state,
        confirmPayLoading: false,
        confirmPayResult: payload,
        confirmPayError: null,
      }
      break
    case 'otcDetail/request_confirm_pay_failed':
      nextState = {
        ...state,
        confirmPayLoading: false,
        confirmPayResult: null,
        confirmPayError: payload,
      }
      break
    case 'otcDetail/request_haved_pay':
      nextState = {
        ...state,
        havedPayLoading: true,
        havedPayResult: null,
        havedPayError: null,
      }
      break
    case 'otcDetail/request_haved_pay_succeed':
      nextState = {
        ...state,
        havedPayLoading: false,
        havedPayResult: payload,
        havedPayError: null,
      }
      break
    case 'otcDetail/request_haved_pay_failed':
      nextState = {
        ...state,
        havedPayLoading: false,
        havedPayResult: null,
        havedPayError: payload,
      }
      break
    case 'otcDetail/request_cancel':
      nextState = {
        ...state,
        cancelLoading: true,
        cancelResult: null,
        cancelError: null,
      }
      break
    case 'otcDetail/request_cancel_succeed':
      nextState = {
        ...state,
        cancelLoading: false,
        cancelResult: payload,
        cancelError: null,
      }
      break
    case 'otcDetail/request_cancel_failed':
      nextState = {
        ...state,
        cancelLoading: false,
        cancelResult: null,
        cancelError: payload,
      }
      break
    case 'otcDetail/update_form':
      nextState = {
        ...state,
        formState: payload,
      }
      break
    case 'otcDetail/update_otc_list':
      nextState = {
        ...state,
        otcList: payload,
      }
      break
    default:
      nextState = state
      break
  }

  return nextState
}
