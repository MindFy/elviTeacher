import {
  FIND_ANNOUNCEMENT_REQUEST,
  FIND_ANNOUNCEMENT_SUCCEED,
  FIND_ANNOUNCEMENT_FAILED,
} from '../constants/index'

const initialState = {
  announcement: [],

  announcementVisible: false,
  announcementResponse: undefined,
}

export default function announcement(state = initialState, action) {
  let nextState = state

  switch (action.type) {
    case FIND_ANNOUNCEMENT_REQUEST:
      nextState = {
        ...state,
        announcementVisible: true,
      }
      break
    case FIND_ANNOUNCEMENT_SUCCEED:
      nextState = {
        ...state,
        announcementVisible: false,
        announcementResponse: action.response,
        announcement: action.response.result.data.find_announcement,
      }
      break
    case FIND_ANNOUNCEMENT_FAILED:
      nextState = {
        ...state,
        announcementVisible: false,
        announcementResponse: action.response,
      }
      break
    default:
      break
  }
  return nextState
}
