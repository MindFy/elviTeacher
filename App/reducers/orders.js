const initialState = {
  openOrders: [],
  orderHistory: [],
  titleSeleted: '当前委托',
  isShowTotalPrice: false,
  refreshState: 0,

  orderHistorySuccess: false,
  orderHistoryError: null,

  cancelOrderSuccess: false,
  cancelOrderError: false,

  cancelAllOrderSuccess: false,
  cancelAllOrderError: false,
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
        openOrders: payload,
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
        orderHistorySuccess: false,
      }
      break
    case 'orders/order_history_request_failed':
      nextState = {
        ...state,
        orderHistoryError: payload,
      }
      break
    case 'orders/order_history_request_succeed':
      nextState = {
        ...state,
        orderHistorySuccess: true,
        orderHistory: payload,
      }
      break
    case 'orders/update_selected_title':
      nextState = {
        ...state,
        titleSeleted: payload,
      }
      break
    case 'orders/toggle_is_show_totalPrice':
      nextState = {
        ...state,
        isShowTotalPrice: !state.isShowTotalPrice,
      }
      break
    case 'orders/request_cancel_order':
      nextState = {
        ...state,
      }
      break
    case 'orders/request_cancel_order_succeed':
      nextState = {
        ...state,
        cancelOrderSuccess: true,
      }
      break
    case 'orders/request_cancel_order_failed':
      nextState = {
        ...state,
        cancelOrderError: true,
      }
      break
    case 'orders/request_cancel_all_order':
      nextState = {
        ...state,
      }
      break
    case 'orders/request_cancel_all_order_succeed':
      nextState = {
        ...state,
        cancelOrderSuccess: true,
      }
      break
    case 'orders/request_cancel_all_order_failed':
      nextState = {
        ...state,
        cancelAllOrderError: true,
      }
      break
    case 'orders/request_cancel_order_clear_error':
      nextState = {
        ...state,
        cancelAllOrderError: false,
      }
      break
    case 'orders/update_refreshState':
      nextState = {
        ...state,
        refreshState: payload.state,
      }
      break
    default:
      nextState = state
      break
  }
  return nextState
}
