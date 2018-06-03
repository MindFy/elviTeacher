const initialState = {
  currPair: 'CNTY',
  pairs: {},
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
    default:
      nextState = state
      break
  }

  return nextState
}
