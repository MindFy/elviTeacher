import {
  USERINFO_UPDATE,
} from '../constants/index'

const initialState = {
  user: null,
}

export default function me(state = initialState, action) {
  let nextState = state
  switch (action.type) {
    case USERINFO_UPDATE:
      nextState = {
        ...state,
        user: action.user,
      }
      break
    default:
      break
  }
  return nextState
}
