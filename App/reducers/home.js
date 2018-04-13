import {
  FIND_BANNERS_REQUEST,
  FIND_BANNERS_SUCCEED,
  FIND_BANNERS_FAILED,
} from '../constants/index'

const initialState = {
  banners: [],

  findBannersVisible: false,
  findBannersResponse: undefined,
}

export default function home(state = initialState, action) {
  let nextState = state
  console.log('home-action->', action)

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
        banners: action.response.result.data.find_banners,
      }
      break
    case FIND_BANNERS_FAILED:
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
