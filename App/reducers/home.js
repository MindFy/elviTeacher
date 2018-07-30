const initialState = {
  banners: [],
  announcements: [],
  market: [],

  lastPriceSortType: 'idle',
  changeSortType: 'idle',

  bannersLoading: false,
  announcementLoading: false,

  bannersError: null,
  announcementError: null,
}

export default function home(state = initialState, action) {
  let nextState
  const { type, payload } = action

  switch (type) {
    case 'home/request_banners':
      nextState = {
        ...state,
        bannersLoading: true,
      }
      break
    case 'home/request_banners_succeed':
      nextState = {
        ...state,
        bannersLoading: false,
        banners: payload,
        bannersError: null,
      }
      break
    case 'home/request_banners_failed':
      nextState = {
        ...state,
        bannersLoading: false,
        bannersError: payload,
      }
      break
    case 'home/request_announcements':
      nextState = {
        ...state,
        announcementLoading: true,
      }
      break
    case 'home/request_announcements_succeed':
      nextState = {
        ...state,
        announcementLoading: false,
        announcements: payload,
        announcementError: null,
      }
      break
    case 'home/request_announcements_failed':
      nextState = {
        ...state,
        announcementLoading: false,
        announcementError: payload,
      }
      break
    case 'home/request_market_succeed':
      nextState = {
        ...state,
        market: payload,
      }
      break
    case 'home/modify_lastPrice_sort':
      nextState = {
        ...state,
        lastPriceSortType: payload,
        changeSortType: 'idle',
      }
      break
    case 'home/modify_change_sort':
      nextState = {
        ...state,
        changeSortType: payload,
        lastPriceSortType: 'idle',
      }
      break
    default:
      nextState = state
      break
  }

  return nextState
}
