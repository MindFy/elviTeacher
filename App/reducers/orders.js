const initialState = {
  openOrders: [],
  orderHistory: [],
  titleSeleted: '当前委托',
  isShowTotalPrice: false,
  refreshState: 0,

  openOrderPage: 0,
  openOrderLoading: false,
  openOrderError: null,

  orderHistoryPage: 0,
  orderHistoryLoading: false,
  orderHistoryError: null,

  cancelOrderLoading: false,
  cancelOrderError: null,

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
        openOrderLoading: true,
      }
      break
    case 'orders/open_order_request_succeed':
      if (state.openOrderPage === 0) {
        nextState = {
          ...state,
          openOrderLoading: false,
          openOrders: payload,
        }
        break
      }
      nextState = {
        ...state,
        openOrderLoading: false,
        openOrders: state.openOrders.concat(payload),
      }
      break
    case 'orders/open_order_request_failed':
      nextState = {
        ...state,
        openOrderError: payload,
      }
      break
    case 'orders/open_order_set_error':
      nextState = {
        ...state,
        openOrderError: payload,
      }
      break
    case 'orders/update_open_order_page':
      nextState = {
        ...state,
        openOrderPage: payload,
      }
      break
    /** order history  ================================================================ */

    case 'orders/order_history_request':
      nextState = {
        ...state,
        orderHistoryLoading: true,
      }
      break
    case 'orders/order_history_request_succeed':
      if (state.orderHistoryPage === 0) {
        nextState = {
          ...state,
          orderHistoryLoading: false,
          orderHistory: payload,
        }
        break
      }
      nextState = {
        ...state,
        orderHistoryLoading: false,
        orderHistory: state.orderHistory.concat(payload),
      }
      break
    case 'orders/order_history_request_failed':
      nextState = {
        ...state,
        orderHistoryError: payload,
      }
      break
    case 'orders/order_history_set_error':
      nextState = {
        ...state,
        orderHistoryError: payload,
      }
      break
    case 'orders/update_order_histroy_page':
      nextState = {
        ...state,
        orderHistoryPage: payload,
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
        cancelOrderLoading: true,
      }
      break
    case 'orders/request_cancel_order_succeed':
      nextState = {
        ...state,
        cancelOrderLoading: false,
      }
      break
    case 'orders/request_cancel_order_failed':
      nextState = {
        ...state,
        cancelOrderError: payload,
      }
      break
    case 'orders/request_cancel_order_set_error':
      nextState = {
        ...state,
        cancelOrderError: payload,
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
        cancelAllOrderError: payload,
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
