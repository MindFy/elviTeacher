const initialState = {
  deposit: [],
  depositPage: 0,
  depositLoading: false,
  depositError: null,
  withdraw: [],
  withdrawPage: 0,
  withdrawLoading: false,
  withdrawError: null,
  withdrawCancelLoading: false,
  withdrawCancelResult: null,
  withdrawCancelError: null,
  otc: [],
  otcPage: 0,
  otcLoading: false,
  otcError: null,
}

export default function history(state = initialState, action) {
  let nextState
  const { type, payload } = action

  switch (type) {
    case 'history/request_deposit':
      nextState = {
        ...state,
        depositLoading: true,
        depositError: null,
      }
      break
    case 'history/request_deposit_succeed':
      nextState = {
        ...state,
        deposit: payload,
        depositLoading: false,
        depositError: null,
      }
      break
    case 'history/request_deposit_failed':
      nextState = {
        ...state,
        depositLoading: false,
        depositError: payload,
      }
      break
    case 'history/request_withdraw':
      nextState = {
        ...state,
        withdrawLoading: true,
        withdrawError: null,
      }
      break
    case 'history/request_withdraw_succeed':
      nextState = {
        ...state,
        withdraw: payload,
        withdrawLoading: false,
        withdrawError: null,
      }
      break
    case 'history/request_withdraw_failed':
      nextState = {
        ...state,
        withdrawLoading: false,
        withdrawError: payload,
      }
      break
    case 'history/withdraw_cancel':
      nextState = {
        ...state,
        withdrawCancelResult: null,
        withdrawCancelLoading: true,
        withdrawCancelError: null,
      }
      break
    case 'history/withdraw_cancel_succeed':
      nextState = {
        ...state,
        withdrawCancelResult: payload,
        withdrawCancelLoading: false,
        withdrawCancelError: null,
      }
      break
    case 'history/withdraw_cancel_failed':
      nextState = {
        ...state,
        withdrawCancelResult: null,
        withdrawCancelLoading: false,
        withdrawCancelError: payload,
      }
      break
    case 'history/withdraw_update':
      nextState = {
        ...state,
        withdraw: payload,
      }
      break
    case 'history/request_otc':
      nextState = {
        ...state,
        otcLoading: true,
        otcError: null,
      }
      break
    case 'history/request_otc_succeed':
      nextState = {
        ...state,
        otc: payload,
        otcLoading: false,
        otcError: null,
      }
      break
    case 'history/request_otc_failed':
      nextState = {
        ...state,
        otcLoading: false,
        otcError: payload,
      }
      break
    case 'history/deposit_page_update':
      nextState = {
        ...state,
        depositPage: payload,
      }
      break
    case 'history/withdraw_page_update':
      nextState = {
        ...state,
        withdrawPage: payload,
      }
      break
    case 'history/otc_page_update':
      nextState = {
        ...state,
        otcPage: payload,
      }
      break
    default:
      nextState = state
      break
  }

  return nextState
}
