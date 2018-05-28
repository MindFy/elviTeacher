import * as constants from '../constants/index'

const initialState = {
  price: '0',
  quantity: '0',
  amount: '0',
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
    default:
      break
  }
  return nextState
}
