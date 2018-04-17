import {
  FIND_BANNERS_REQUEST,
  FIND_BANNERS_SUCCEED,
  FIND_BANNERS_FAILED,

  IMG_HASH_SUCCEED,
  IMG_HASH_FAILED,

  BANNERS_ADD_UPDATE,

  SYNC_REQUEST,
  SYNC_SUCCEED,
  SYNC_FAILED,
} from '../constants/index'

const initialState = {
  banners: [],

  findBannersVisible: false,
  findBannersResponse: undefined,

  syncVisible: false,
  syncResponse: undefined,
}

export default function home(state = initialState, action) {
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
    case IMG_HASH_SUCCEED:
      nextState = {
        ...state,
      }
      break
    case IMG_HASH_FAILED:
      nextState = {
        ...state,
      }
      break
    case BANNERS_ADD_UPDATE:
      state.banners.push(action.data)
      nextState = {
        ...state,
        banners: JSON.parse(JSON.stringify(state.banners)),
      }
      break
    case SYNC_REQUEST:
      nextState = {
        ...state,
        syncVisible: true,
      }
      break
    case SYNC_SUCCEED:
      nextState = {
        ...state,
        syncVisible: false,
        syncResponse: action.response,
      }
      break
    case SYNC_FAILED:
      nextState = {
        ...state,
        syncVisible: false,
        syncResponse: action.response,
      }
      break
    default:
      break
  }

  return nextState
}
