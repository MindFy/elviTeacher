export function requestBalanceList(payload) {
  return {
    type: 'balance/request_balance_list',
    payload,
  }
}


export function requestBalanceValuation(payload) {
  return {
    type: 'balance/request_balance_valuation',
    payload,
  }
}

