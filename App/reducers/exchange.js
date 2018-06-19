const initialState = {
  lastPrice: {
    buy: [],
    sell: [],
  },
  openOrders: [],
  orderHistory: [],
  selectedPair: {
    cprice: '',
    currency: {
      id: 0,
      name: '',
    },
    goods: {
      id: 0,
      name: '',
    },
    hprice: '',
    lastprice: '',
    lprice: '',
    quantity: '',
    rose: '',
  },
  segmentIndex: 0,
  lastpriceRequesting: false,
  openordersRequesting: false,
  orderhistoryRequesting: false,
  formData: {
    price: '',
    quantity: '',
    amount: '',
    ratio: 0,
  },
  createOrderIndex: 0,
  createOrderRequesting: false,
  createResponse: undefined,
  depthMapRequesting: false,
  depthMap: {
    buy: [],
    lastprice: 0,
    sell: [],
  },
  cancelOrderLoading: false,
  cancelOrderError: null,
  valuationRequesting: false,
  valuation: undefined,
  currPair: 'CNTY',
  pairs: {},
}

export default function exchange(state = initialState, action) {
  let nextState
  const { type, payload } = action

  switch (type) {
    case 'exchange/update_pair':
      nextState = {
        ...state,
        selectedPair: payload,
      }
      break
    case 'exchange/request_lastprice_list':
      nextState = {
        ...state,
        lastpriceRequesting: true,
      }
      break
    case 'exchange/request_lastprice_list_succeed':
      nextState = {
        ...state,
        lastpriceRequesting: false,
        lastPrice: payload,
      }
      break
    case 'exchange/request_lastprice_list_failed':
      nextState = {
        ...state,
        lastpriceRequesting: false,
        lastPrice: payload,
      }
      break
    case 'exchange/request_openorders_list':
      nextState = {
        ...state,
        openordersRequesting: true,
      }
      break
    case 'exchange/request_openorders_list_succeed':
      nextState = {
        ...state,
        openordersRequesting: false,
        openOrders: payload,
      }
      break
    case 'exchange/request_openorders_list_failed':
      nextState = {
        ...state,
        openordersRequesting: false,
        openOrders: payload,
      }
      break
    case 'exchange/request_orderhistory_list':
      nextState = {
        ...state,
        orderhistoryRequesting: true,
      }
      break
    case 'exchange/request_orderhistory_list_succeed':
      nextState = {
        ...state,
        orderhistoryRequesting: false,
        orderHistory: payload,
      }
      break
    case 'exchange/request_orderhistory_list_failed':
      nextState = {
        ...state,
        orderhistoryRequesting: false,
        orderHistory: payload,
      }
      break
    case 'exchange/update_form':
      nextState = {
        ...state,
        formData: payload,
      }
      break
    case 'exchange/update_segment_index':
      nextState = {
        ...state,
        segmentIndex: payload,
        openOrders: [],
      }
      break
    case 'exchange/create_order':
      nextState = {
        ...state,
        createOrderRequesting: true,
      }
      break
    case 'exchange/create_order_succeed':
      nextState = {
        ...state,
        createOrderRequesting: false,
        createResponse: payload,
      }
      break
    case 'exchange/create_order_failed':
      nextState = {
        ...state,
        createOrderRequesting: false,
        createResponse: payload,
      }
      break
    case 'exchange/clear_response':
      nextState = {
        ...state,
        createResponse: undefined,
      }
      break
    case 'exchange/update_order_index':
      nextState = {
        ...state,
        createOrderIndex: payload,
      }
      break
    case 'exchange/request_cancel_order':
      nextState = {
        ...state,
        cancelOrderLoading: true,
      }
      break
    case 'exchange/request_cancel_order_succeed':
      nextState = {
        ...state,
        cancelOrderLoading: false,
        openOrders: payload,
      }
      break
    case 'exchange/request_cancel_order_failed':
      nextState = {
        ...state,
        cancelOrderLoading: false,
        cancelOrderError: payload,
      }
      break
    case 'exchange/request_cancel_order_set_error':
      nextState = {
        ...state,
        cancelOrderError: payload,
      }
      break
    case 'exchange/request_valuation':
      nextState = {
        ...state,
        valuationRequesting: true,
      }
      break
    case 'exchange/requset_valuation_succeed':
      nextState = {
        ...state,
        valuationRequesting: false,
        valuation: payload,
      }
      break
    case 'exchange/requset_valuation_failed':
      nextState = {
        ...state,
        valuationRequesting: false,
        valuation: payload,
      }
      break
    case 'exchange/request_depth_map':
      nextState = {
        ...state,
        depthMapRequesting: true,
      }
      break
    case 'exchange/request_depth_map_succeed':
      nextState = {
        ...state,
        depthMapRequesting: false,
        depthMap: payload,
      }
      break
    case 'exchange/request_depth_map_failed':
      nextState = {
        ...state,
        depthMapRequesting: false,
      }
      break
    case 'exchange/clear_open_orders':
      nextState = {
        ...state,
        openOrders: [],
      }
      break
    case 'exchange/update_current_pair':
      nextState = {
        ...state,
        currPair: payload.title,
      }
      break
    case 'exchange/request_pair_info_succeed':
      nextState = {
        ...state,
        pairs: payload,
      }
      break
    case 'notify/clear_reducer':
      nextState = initialState
      break
    default:
      nextState = state
      break
  }

  return nextState
}
