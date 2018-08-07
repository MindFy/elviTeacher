const initialState = {
  currPair: 'CNTY',
  pairs: [],
  isEdit: false,
  markedTokenPairs: {},

  initialized: false,

  getFavoritePending: false,
  getFavoriteError: null,
  favoriteList: {},

  nameSortType: 'idle',
  volumeSortType: 'idle',
  lastPriceSortType: 'idle',
  dailyChangeSortType: 'idle',
}

export default function market(state = initialState, action) {
  let nextState
  const { type, payload } = action

  switch (type) {
    case 'withdraw/request_pair_info':
      nextState = {
        ...state,
      }
      break
    case 'withdraw/request_pair_info_succeed':
      nextState = {
        ...state,
        pairs: payload,
      }
      break
    case 'withdraw/request_pair_info_failed':
      nextState = {
        ...state,
      }
      break
    case 'withdraw/update_current_pair':
      nextState = {
        ...state,
        currPair: payload.title,
      }
      break
    case 'market/toggle_edit':
      nextState = {
        ...state,
        isEdit: payload,
      }
      break
    case 'market/get_favorite_request':
      nextState = {
        ...state,
        getFavoritePending: true,
        getFavoriteError: null,
      }
      break
    case 'market/get_favorite_success':
      nextState = {
        ...state,
        getFavoritePending: false,
        getFavoriteError: null,
        favoriteList: payload,
      }
      break
    case 'market/get_favorite_failed':
      nextState = {
        ...state,
        getFavoritePending: false,
        getFavoriteError: payload,
        favoriteList: null,
      }
      break
    case 'market/set_favorite_request':
      nextState = {
        ...state,
      }
      break
    case 'market/set_favorite_success':
      nextState = {
        ...state,
        pairs: payload,
      }
      break
    case 'market/set_favorite_failed':
      nextState = {
        ...state,
      }
      break
    case 'market/request_CCC':
      nextState = {
        ...state,
      }
      break
    case 'market/request_CCC_success':
      nextState = {
        ...state,
        pairs: payload,
      }
      break
    case 'market/set_initialized_state':
      nextState = {
        ...state,
        initialized: payload.initialized,
      }
      break
    case 'notify/clear_reducer':
      nextState = {
        ...state,
        getFavoritePending: false,
        getFavoriteError: null,
        favoriteList: {},
      }
      break
    case 'market/modify_name_Sort':
      nextState = {
        ...state,
        nameSortType: payload,
        volumeSortType: 'idle',
        lastPriceSortType: 'idle',
        dailyChangeSortType: 'idle',
      }
      break
    case 'market/modify_volume_Sort':
      nextState = {
        ...state,
        nameSortType: 'idle',
        volumeSortType: payload,
        lastPriceSortType: 'idle',
        dailyChangeSortType: 'idle',
      }
      break
    case 'market/modify_lastPrice_Sort':
      nextState = {
        ...state,
        nameSortType: 'idle',
        volumeSortType: 'idle',
        lastPriceSortType: payload,
        dailyChangeSortType: 'idle',
      }
      break
    case 'market/modify_dailyChange_Sort':
      nextState = {
        ...state,
        nameSortType: 'idle',
        volumeSortType: 'idle',
        lastPriceSortType: 'idle',
        dailyChangeSortType: payload,
      }
      break
    default:
      nextState = state
      break
  }

  return nextState
}
