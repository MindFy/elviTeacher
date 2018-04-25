import * as constants from '../constants/index'

const initialState = {
  rose: [],
  selectedIndex: 0,
}

export default function dealstat(state = initialState, action) {
  let nextState = state

  switch (action.type) {
    case constants.GET_ROSE_SUCCEED:
      nextState = {
        ...state,
        rose: action.response.result,
        selectedIndex: 0,
      }
      break

    case constants.MARKET_LIST_UPDATE:
      nextState = {
        ...state,
        selectedIndex: action.data.selectedIndex,
      }
      break
    default:
      break
  }
  return nextState
}
