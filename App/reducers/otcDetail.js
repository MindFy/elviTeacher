const initialState = {
  otcList: [],
  otcListPage: 0,
  formState: {
    allegeText: '',
    smsCode: '',
    googleCode: '',
    emailCode: '',
  },
  confirmPayLoading: false,
  confirmPayResult: null,
  confirmPayError: null,
  havedPayLoading: false,
  havedPayResult: null,
  havedPayError: null,
  cancelLoading: false,
  cancelResult: null,
  cancelError: null,
  allegeLoading: false,
  allegeResult: null,
  allegeError: null,
  otcListLoading: false,
  otcListError: null,

  requestGetCodeLoading: false,
  requestGetCodeResponse: null,
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
    case 'otcDetail/update_list_page':
      nextState = {
        ...state,
        otcListPage: payload,
      }
      break
    case 'otcDetail/request_get_code':
      nextState = {
        ...state,
        requestGetCodeLoading: true,
        requestGetCodeResponse: null,
      }
      break
    case 'otcDetail/request_get_code_succeed':
      nextState = {
        ...state,
        requestGetCodeLoading: false,
        requestGetCodeResponse: payload,
      }
      break
    case 'otcDetail/request_get_code_failed':
      nextState = {
        ...state,
        requestGetCodeLoading: false,
        requestGetCodeResponse: payload,
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
    case 'otcDetail/request_allege':
      nextState = {
        ...state,
        allegeLoading: true,
        allegeResult: null,
        allegeError: null,
      }
      break
    case 'otcDetail/request_allege_succeed':
      nextState = {
        ...state,
        allegeLoading: false,
        allegeResult: payload,
        allegeError: null,
      }
      break
    case 'otcDetail/request_allege_failed':
      nextState = {
        ...state,
        allegeLoading: false,
        allegeResult: null,
        allegeError: payload,
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
    case 'otcDetail/update_auth_code_type':
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
