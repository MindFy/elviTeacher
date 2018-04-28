import * as constants from '../constants/index'

const initialState = {
  rose: [],
  homeRose: [],
  homeRoseSelected: undefined,
  selectedIndex: 0,
}

export default function dealstat(state = initialState, action) {
  let nextState = state

  switch (action.type) {
    case constants.GET_ROSE_SUCCEED:
      nextState = {
        ...state,
        rose: action.data.rose,
        homeRose: action.data.homeRose,
        homeRoseSelected: action.data.homeRoseSelected,
        selectedIndex: 0,
      }
      break

    case constants.MARKET_LIST_UPDATE:
      nextState = {
        ...state,
        selectedIndex: action.data.selectedIndex,
      }
      break
    case constants.HOME_ROSE_SELECTED_UPDATE:
      nextState = {
        ...state,
        homeRoseSelected: action.data,
      }
      break
    default:
      break
  }
  return nextState
}
