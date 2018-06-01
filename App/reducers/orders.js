const initialState = {
  openOrders: [],
  orderHistory: [],
}

export default function orders(state = initialState, action) {
  let nextState
  const { type, payload } = action

  switch (type) {
    case 'orders/open_order_request':
      nextState = {
        ...state,
      }
      break
    case 'orders/open_order_request_succeed':
      nextState = {
        ...state,
      }
      break
    case 'orders/open_order_request_failed':
      nextState = {
        ...state,
      }
      break
    case 'orders/order_history_request':
      nextState = {
        ...state,
      }
      break
    case 'orders/order_history_request_failed':
      nextState = {
        ...state,
      }
      break
    case 'orders/order_history_request_succeed':
      nextState = {
        ...state,
      }
      break
    default:
      nextState = state
      break
  }

  return nextState
}
