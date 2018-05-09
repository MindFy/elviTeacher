import * as constants from '../constants/index'

const initialState = {
  totalCount: 0,
}

export default function invitation(state = initialState, action) {
  let nextState = state

  switch (action.type) {
    case constants.INVITATION_TOTAL_COUNT_REQUEST:
      nextState = {
        ...state,
      }
      break
    case constants.INVITATION_TOTAL_COUNT_SUCCEED:
      nextState = {
        ...state,
        totalCount: action.totalCount,
      }
      break
    case constants.INVITATION_TOTAL_COUNT_FAILED:
      nextState = {
        ...state,
      }
      break
    default:
      break
  }
  return nextState
}
