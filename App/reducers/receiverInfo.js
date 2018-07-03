const initialState = {
  receiverInfoLoading: false,
  receiverInfoData: null,
  receiverInfoError: null,
}

export default function receiverInfo(state = initialState, action) {
  const { type, payload } = action
  let nextState = state

  switch (type) {
    case 'receiverInfo/request_receiver_info':
      nextState = {
        ...state,
        receiverInfoLoading: true,
        receiverInfoData: null,
        receiverInfoError: null,
      }
      break
    case 'receiverInfo/request_receiver_info_succeed':
      nextState = {
        ...state,
        receiverInfoLoading: false,
        receiverInfoData: payload,
      }
      break
    case 'receiverInfo/request_receiver_info_failed':
      nextState = {
        ...state,
        receiverInfoLoading: false,
        receiverInfoError: payload,
      }
      break
    case 'notify/clear_reducer':
      nextState = initialState
      break
    default:
      break
  }
  return nextState
}
