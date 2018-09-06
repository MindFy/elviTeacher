export default function getHomeMarket(market) {
  const newMarket = []

  for (let i = 0; i < market.length; i++) {
    const currency = market[i]
    const sub = currency.sub
    for (let j = 0; j < sub.length; j++) {
      const element = {}
      const goods = sub[j]
      element.currency = { id: currency.id, name: currency.name }
      element.goods = { id: goods.id, name: goods.name }
      element.lastprice = goods.lastprice
      element.cprice = goods.cprice
      element.hprice = goods.hprice
      element.lprice = goods.lprice
      element.quantity = goods.quantity
      element.rose = goods.rose
      newMarket.push(element)
    }
  }

  return newMarket
}
