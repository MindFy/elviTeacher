import * as constants from '../constants/index'

const initialState = {
  price: '0',
  quantity: '0',
  amount: '0',
}

export default function detailDeal(state = initialState, action) {
  let nextState = state
  switch (action.type) {
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
