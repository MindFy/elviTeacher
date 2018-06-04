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
  lastprice_requesting: false,
  openorders_requesting: false,
  orderhistory_requesting: false,
  formData: {
    price: '',
    quantity: '',
    amount: '',
    ratio: 0,
  },
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
        lastprice_requesting: true,
      }
      break
    case 'exchange/request_lastprice_list_succeed':
      nextState = {
        ...state,
        lastprice_requesting: false,
        lastPrice: payload,
      }
      break
    case 'exchange/request_lastprice_list_failed':
      nextState = {
        ...state,
        lastprice_requesting: false,
        lastPrice: payload,
      }
      break
    case 'exchange/request_openorders_list':
      nextState = {
        ...state,
        openorders_requesting: true,
      }
      break
    case 'exchange/request_openorders_list_succeed':
      nextState = {
        ...state,
        openorders_requesting: false,
        openOrders: payload,
      }
      break
    case 'exchange/request_openorders_list_failed':
      nextState = {
        ...state,
        openorders_requesting: false,
        openOrders: payload,
      }
      break
    case 'exchange/request_orderhistory_list':
      nextState = {
        ...state,
        orderhistory_requesting: true,
      }
      break
    case 'exchange/request_orderhistory_list_succeed':
      nextState = {
        ...state,
        orderhistory_requesting: false,
        orderHistory: payload,
      }
      break
    case 'exchange/request_orderhistory_list_failed':
      nextState = {
        ...state,
        orderhistory_requesting: false,
        orderHistory: payload,
      }
      break
    case 'exchange/update_form':
      nextState = {
        ...state,
        formData: payload,
      }
      break
    case 'exchange/update_segmentIndex':
      nextState = {
        ...state,
        segmentIndex: payload,
      }
      break
    default:
      nextState = state
      break
  }

  return nextState
}
