const initialState = {
  coinList: [],
  balance: '',
  amountReceived: '',
  mobile: '',
  currCoin: '选择币种',
  fee: 0.01,
  listToggled: false,
  formState: {
    withdrawAmount: '',
    withdrawAddress: '',
    withdrawAddressLabel: '',
    smsCode: '',
    googleCode: '',
    emailCode: '',
  },
  authCodeType: '短信验证码',
  valuation: null,
  loading: false,
  withdrawLoading: false,
  withdrawSuccess: false,
  withdrawError: null,
  error: null,
  address: [],
  requestGetCodeLoading: false,
  requestGetCodeResponse: null,
  requestPair: {},
  requestRawPair: {},
  requestPairStatus: 0,
}

export default function withdraw(state = initialState, action) {
  let nextState
  const { type, payload } = action

  switch (type) {
    case 'withdraw/coin_selected':
      nextState = {
        ...state,
        currCoin: payload,
        listToggled: !state.listToggled,
      }
      break
    case 'withdraw/toggle_form':
      nextState = {
        ...state,
        listToggled: !state.listToggled,
      }
      break
    case 'withdraw/request_coin_list':
      nextState = {
        ...state,
        loading: true,
      }
      break
    case 'withdraw/request_coin_list_succeed':
      nextState = {
        ...state,
        coinList: payload,
        loading: false,
      }
      break
    case 'withdraw/request_coin_list_failed':
      nextState = {
        ...state,
      }
      break
    case 'withdraw/update_form':
      nextState = {
        ...state,
        formState: payload,
      }
      break
    case 'withdraw/request_balance':
      nextState = {
        ...state,
        loading: true,
      }
      break
    case 'withdraw/request_balance_succeed':
      nextState = {
        ...state,
        loading: false,
        balance: payload,
      }
      break
    case 'withdraw/request_balance_failed':
      nextState = {
        ...state,
        loading: false,
        error: payload,
      }
      break

    case 'withdraw/requset_valuation':
      nextState = {
        ...state,
        loading: false,
      }
      break
    case 'withdraw/requset_valuation_succeed':
      nextState = {
        ...state,
        loading: false,
        valuation: payload,
      }
      break
    case 'withdraw/requset_valuation_failed':
      nextState = {
        ...state,
        loading: false,
        error: payload,
      }
      break
    case 'withdraw/request_withdraw':
      nextState = {
        ...state,
        withdrawLoading: true,
        withdrawError: null,
        withdrawSuccess: false,
      }
      break
    case 'withdraw/request_withdraw_address_succeed':
      nextState = {
        ...state,
        address: payload,
      }
      break
    case 'withdraw/request_withdraw_succeed':
      nextState = {
        ...state,
        withdrawLoading: false,
        withdrawSuccess: true,
      }
      break
    case 'withdraw/request_withdraw_failed':
      nextState = {
        ...state,
        withdrawLoading: false,
        withdrawError: payload,
        withdrawSuccess: false,
      }
      break
    case 'withdraw/clear':
      nextState = { ...initialState }
      break
    case 'withdraw/request_withdraw_clear_error':
      nextState = {
        ...state,
        withdrawError: null,
      }
      break
    case 'withdraw/update_auth_code_type':
      nextState = {
        ...state,
        authCodeType: payload,
      }
      break
    case 'withdraw/request_get_code':
      nextState = {
        ...state,
        requestGetCodeLoading: true,
        requestGetCodeResponse: null,
      }
      break
    case 'withdraw/request_get_code_succeed':
      nextState = {
        ...state,
        requestGetCodeLoading: false,
        requestGetCodeResponse: payload,
      }
      break
    case 'withdraw/request_get_code_failed':
      nextState = {
        ...state,
        requestGetCodeLoading: false,
        requestGetCodeResponse: payload,
      }
      break
    case 'notify/clear_reducer':
      nextState = initialState
      break
    case 'withdraw/request_pair_success':
      nextState = {
        ...state,
        requestPairStatus: 1,
        requestPair: payload.requestPair,
        requestRawPair: payload.requestRawPair,
      }
      break
    case 'withdraw/request_pair_failed':
      nextState = {
        ...state,
        requestPairStatus: 2,
        requestPair: {},
      }
      break
    default:
      nextState = state
      break
  }

  return nextState
}
