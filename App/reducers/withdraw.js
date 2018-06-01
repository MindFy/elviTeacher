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
    verificationCode: '',
  },
  minAmount: '',
  loading: false,
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
      console.log('coinlist:', payload)
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
    default:
      nextState = state
      break
  }

  return nextState
}
