import WAValidator from 'wallet-address-validator'

const orginCoins = ['BTC', 'ETC', 'ETH', 'LTC', 'ONT']

function validate(address, currencyNameOrSymbol, networkType) {
  let validateCurrency = currencyNameOrSymbol
  if (orginCoins.every(e => e !== validateCurrency)) {
    validateCurrency = 'ETH'
  }

   const result = WAValidator.validate(address, validateCurrency, networkType)

  return result
}

export default {
  validate,
}
