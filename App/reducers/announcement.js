import {
  FIND_ANNOUNCEMENT_REQUEST,
  FIND_ANNOUNCEMENT_SUCCEED,
  FIND_ANNOUNCEMENT_FAILED,
} from '../constants/index'

const initialState = {
  announcement: [],
}

export default function announcement(state = initialState, action) {
  let nextState = state

  switch (action.type) {
    case FIND_ANNOUNCEMENT_REQUEST:
      nextState = {
        ...state,
      }
      break
    case FIND_ANNOUNCEMENT_SUCCEED:
      nextState = {
        ...state,
        // announcement: action.reponse.data.
      }
      break
    case FIND_ANNOUNCEMENT_FAILED:
      nextState = {
        ...state,
      }
      break
    default:
      break
  }
  return nextState
}
