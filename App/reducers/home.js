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

  requestPair: {},
  requestPairStatus: 0, // 加载币币对 的状态 (0: default, 1: 成功 2: 失败)

  requestShowRawPair: {}, 
  requestShowPair: {}, 
  requestShowPairStatus: 0,
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
    case 'home/request_pair_success':
      nextState = {
        ...state,
        requestPairStatus: 1,
        requestPair: payload,
      }
      break
    case 'home/request_pair_failed':
      nextState = {
        ...state,
        requestPairStatus: 2,
        requestPair: {},
      }
      break
    case 'home/request_show_pair_success':
      nextState = {
        ...state,
        requestShowPairStatus: 1,
        requestShowPair: payload.requestShowPair,
        requestShowRawPair: payload.requestShowRawPair,
      }
      break
    case 'home/request_show_pair_failed':
      nextState = {
        ...state,
        requestShowPairStatus: 2,
        requestShowPair: {},
        requestShowRawPair: {},
      }
      break
    default:
      nextState = state
      break
  }

  return nextState
}
