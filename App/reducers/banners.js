import * as constants from '../constants/index'
import * as api from '../services/api'

const initialState = {
  banners: [],
  imgHashApi: api.imgHashApi,

  findBannersVisible: false,
  findBannersResponse: undefined,
}

export default function banners(state = initialState, action) {
  let nextState = state

  switch (action.type) {
    case constants.FIND_BANNERS_REQUEST:
      nextState = {
        ...state,
        findBannersVisible: true,
      }
      break
    case constants.FIND_BANNERS_SUCCEED:
      nextState = {
        ...state,
        findBannersVisible: false,
        banners: action.banners,
      }
      break
    case constants.FIND_ADDRESS_FAILED:
      nextState = {
        ...state,
        findBannersVisible: false,
      }
      break
    default:
      break
  }
  return nextState
}
