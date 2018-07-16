const initialState = {
  currPair: 'CNTY',
  pairs: {},
  isEdit: false,
  markedTokenPairs: {},

  getFavoritePending: false,
  getFavoriteError: null,
  favoriteList: {},
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
        getFavoritePending: true,
        getFavoriteError: null,
        favoriteList: payload,
      }
      break
    case 'market/get_favorite_failed':
      nextState = {
        ...state,
        getFavoritePending: true,
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
    default:
      nextState = state
      break
  }

  return nextState
}
