import * as constants from '../constants/index'

const initialState = {
  price: '0',
  quantity: '0',
  amount: '0',

  delegateCurrent: [],
}

export default function detailDeal(state = initialState, action) {
  let nextState = state
  switch (action.type) {
    case constants.TEXTINPUT_DELEGATE_UPDATE:
      nextState = {
        ...state,
        price: action.data.price,
        quantity: action.data.quantity,
        amount: action.data.amount,
      }
      break
    case constants.DETAIL_DEAL_UPDATEKV:
      nextState = {
        ...state,
        [action.k]: action.v,
      }
      break
    case constants.CANCEL_DELEGATE_SELF_CURRENT_DEAL_SUCCEED:
      nextState = {
        ...state,
        delegateCurrent: action.delegateCurrent,
      }
      break
    case 'notify/clear_reducer':
      nextState = initialState
      break
    default:
      break
  }
  return nextState
}
