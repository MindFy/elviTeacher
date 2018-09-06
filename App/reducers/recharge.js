const initialState = {
  coinList: [],
  currCoin: { name: '选择币种' },
  listToggled: false,
  rechargeAddress: null,
}

export default function recharge(state = initialState, action) {
  let nextState
  const { type, payload } = action

  switch (type) {
    case 'recharge/coin_selected':
      nextState = {
        ...state,
        currCoin: payload,
      }
      break
    case 'recharge/toggle_form':
      nextState = {
        ...state,
        listToggled: !state.listToggled,
      }
      break
    case 'recharge/request_coin_list':
      nextState = {
        ...state,
      }
      break
    case 'recharge/request_coin_list_succeed':
      nextState = {
        ...state,
        coinList: payload,
      }
      break
    case 'recharge/request_coin_list_failed':
      nextState = {
        ...state,
      }
      break
    case 'recharge/request_recharge_address':
      nextState = {
        ...state,
      }
      break
    case 'recharge/request_recharge_address_succeed':
      nextState = {
        ...state,
        rechargeAddress: payload,
      }
      break
    case 'recharge/request_recharge_address_failed':
      nextState = {
        ...state,
        rechargeAddress: payload,
      }
      break
    case 'recharge/request_create_address':
      nextState = {
        ...state,
      }
      break
    case 'recharge/request_create_address_succeed':
      nextState = {
        ...state,
        rechargeAddress: payload,
      }
      break
    case 'recharge/request_create_address_failed':
      nextState = {
        ...state,
        rechargeAddress: payload,
      }
      break
    case 'recharge/reset_nexus':
      nextState = initialState
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
