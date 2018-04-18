import {
  FIND_BANNERS_REQUEST,
  FIND_BANNERS_SUCCEED,
  FIND_ADDRESS_FAILED,
} from '../constants/index'

const initialState = {
  findBannersVisible: false,
  findBannersResponse: undefined,
}

export default function banners(state = initialState, action) {
  let nextState = state

  switch (action.type) {
    case FIND_BANNERS_REQUEST:
      nextState = {
        ...state,
        findBannersVisible: true,
      }
      break
    case FIND_BANNERS_SUCCEED:
      nextState = {
        ...state,
        findBannersVisible: false,
        findBannersResponse: action.response,
      }
      break
    case FIND_ADDRESS_FAILED:
      nextState = {
        ...state,
        findBannersVisible: false,
        findBannersResponse: action.response,
      }
      break
    default:
      break
  }
  return nextState
}
