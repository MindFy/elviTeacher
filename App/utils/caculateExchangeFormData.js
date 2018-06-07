import { BigNumber } from 'bignumber.js'
import { common } from '../constants/common'

function textInputLimit(
  price, quantity, amount,
  precisionPrice, precisionQuantity, precisionAmount,
  tag, amountVisible, createOrderIndex,
) {
  if (tag === 'price') {
    let p = new BigNumber(price)
    if (p.isNaN() && price.length) { // 限制非数字字符
      return undefined
    }
    const pArr = price.split('.')
    if (pArr.length === 1 && p.eq(0)) { // 限制输入多个0
      let a = new BigNumber(p).multipliedBy(quantity)
      a = a.isNaN() ? '' : a.toFixed(precisionAmount, 1)
      return { p: '0', q: quantity, a }
    }
    if (pArr.length > 1 && pArr[1].length > precisionPrice) { // 小数精度限制
      return undefined
    }
    let a = new BigNumber(p).multipliedBy(quantity).toFixed(precisionAmount, 1)
    if (BigNumber(a).isNaN()) { // 金额为空不显示
      return { p: price, q: quantity, a: '' }
    }
    if (!createOrderIndex && BigNumber(a).gt(amountVisible)) { // 买入时根据可用限制最大输入
      a = new BigNumber(amountVisible).toFixed(precisionAmount, 1)
      p = new BigNumber(a).dividedBy(quantity).toFixed(precisionPrice, 1)
      return { p, q: quantity, a }
    }
    return { p: price, q: quantity, a }
  }
  if (tag === 'quantity') {
    let q = new BigNumber(quantity)
    if (q.isNaN() && quantity.length) { // 限制非数字字符
      return undefined
    }
    const qArr = quantity.split('.')
    if (qArr.length === 1 && q.eq(0)) { // 限制输入多个0
      let a = new BigNumber(q).multipliedBy(price)
      a = a.isNaN() ? '' : a.toFixed(precisionAmount, 1)
      return { p: price, q: '0', a }
    }
    if (qArr.length > 1 && qArr[1].length > precisionQuantity) { // 小数精度限制
      return undefined
    }
    let a = new BigNumber(q).multipliedBy(price).toFixed(precisionAmount, 1)
    if (BigNumber(a).isNaN()) { // 金额为空不显示
      return { p: price, q: quantity, a: '' }
    }
    if (!createOrderIndex && BigNumber(a).gt(amountVisible)) { // 买入时根据可用限制最大输入
      a = new BigNumber(amountVisible).toFixed(precisionAmount, 1)
      q = new BigNumber(a).dividedBy(price).toFixed(precisionQuantity, 1)
      return { p: price, q, a }
    } else if (createOrderIndex && BigNumber(q).gt(amountVisible)) { // 卖出时根据可用限制最大输入
      q = new BigNumber(amountVisible).toFixed(precisionQuantity, 1)
      a = new BigNumber(q).multipliedBy(price).toFixed(precisionAmount, 1)
      return { p: price, q, a }
    }
    return { p: price, q: quantity, a }
  }
  if (tag === 'amount') {
    const q = new BigNumber(amount).dividedBy(price).toFixed(precisionQuantity, 1)
    if (BigNumber(q).isNaN()) { // 分子不能为0，非数字
      return undefined
    }
    const a = new BigNumber(price).multipliedBy(q).toFixed(precisionAmount, 1)
    return { p: price, q, a }
  }
  return undefined
}

function textInputUpdate(
  price, quantity, amount, tag, selectedPair, amountVisible, createOrderIndex,
) {
  let returnVal
  if (selectedPair) {
    common.precision(selectedPair.goods.name, selectedPair.currency.name, (p, q, a) => {
      let availble = null
      if (createOrderIndex === 0) {
        availble = amountVisible[selectedPair.currency.name]
      } else {
        availble = amountVisible[selectedPair.goods.name]
      }
      const temp = textInputLimit(price, quantity, amount, p, q, a, tag, availble, createOrderIndex)
      if (temp) {
        returnVal = {
          price: temp.p,
          quantity: temp.q,
          amount: temp.a,
        }
      }
    })
  } else {
    let availble = null
    if (createOrderIndex === 0) {
      availble = amountVisible[selectedPair.currency.name]
    } else {
      availble = amountVisible[selectedPair.goods.name]
    }
    const temp = textInputLimit(price, quantity, amount, 2, 4, 6, tag, availble, createOrderIndex)
    if (temp) {
      returnVal = {
        price: temp.p,
        quantity: temp.q,
        amount: temp.a,
      }
    }
  }
  return returnVal
}


export function caculateExchangeFormData({
  selectedPair,
  formData,
  actions,
  amountVisible,
  createOrderIndex,
}) {
  const { price, quantity } = formData
  const { cmd, type, val } = actions
  if (cmd === 'release') {
    if (type === 'price') {
      if (price === '') {
        return undefined
      }
      const nextFormData = { ...formData }
      common.precision(selectedPair.goods.name, selectedPair.currency.name, (p, q, nextAmount) => {
        const minusNum = BigNumber(0.1).pow(p)
        let newPrice = BigNumber(price).minus(minusNum)
        if (newPrice.lt(0)) {
          newPrice = BigNumber(0)
        }
        nextFormData.price = newPrice.toString()
        const newAmount = BigNumber(quantity).multipliedBy(newPrice)
        if (newAmount.isNaN()) {
          return
        }
        nextFormData.amount = newAmount.toFixed(nextAmount, 1)
      })
      return nextFormData
    } else if (type === 'quantity') {
      if (quantity === '') {
        return undefined
      }
      const nextFormData = { ...formData }
      common.precision(selectedPair.goods.name, selectedPair.currency.name, (p, q, nextAmount) => {
        const minusNum = BigNumber(0.1).pow(q)
        let newQuantity = BigNumber(quantity).minus(minusNum)
        if (newQuantity.lt(0)) {
          newQuantity = BigNumber(0)
        }
        nextFormData.quantity = newQuantity.toString()
        const newAmount = BigNumber(price).multipliedBy(newQuantity)
        if (newAmount.isNaN()) {
          return
        }
        nextFormData.amount = newAmount.toFixed(nextAmount, 1)
      })
      return nextFormData
    }
    return undefined
  }
  if (cmd === 'plus') {
    if (type === 'price') {
      if (price === '') {
        return undefined
      }
      const nextFormData = { ...formData }
      common.precision(selectedPair.goods.name, selectedPair.currency.name, (p, q, nextAmount) => {
        const plusNum = BigNumber(0.1).pow(p)
        let newPrice = BigNumber(price).plus(plusNum)
        if (newPrice.lt(0)) {
          newPrice = BigNumber(0)
        }
        nextFormData.price = newPrice.toString()
        const newAmount = BigNumber(quantity).multipliedBy(newPrice)
        if (newAmount.isNaN()) {
          return
        }
        nextFormData.amount = newAmount.toFixed(nextAmount, 1)
      })
      return nextFormData
    } else if (type === 'quantity') {
      if (quantity === '') {
        return undefined
      }
      const nextFormData = { ...formData }
      common.precision(selectedPair.goods.name, selectedPair.currency.name, (p, q, nextAmount) => {
        const plusNum = BigNumber(0.1).pow(q)
        let newQuantity = BigNumber(quantity).plus(plusNum)
        if (newQuantity.lt(0)) {
          newQuantity = BigNumber(0)
        }
        nextFormData.quantity = newQuantity.toString()
        const newAmount = BigNumber(price).multipliedBy(newQuantity)
        if (newAmount.isNaN()) {
          return
        }
        nextFormData.amount = newAmount.toFixed(nextAmount, 1)
      })
      return nextFormData
    }
    return undefined
  }
  if (cmd === 'input') {
    if (type === 'price') {
      return textInputUpdate(
        val, quantity, undefined, type, selectedPair, amountVisible, createOrderIndex)
    }
    if (type === 'quantity') {
      return textInputUpdate(
        price, val, undefined, type, selectedPair, amountVisible, createOrderIndex)
    }
  }
  return undefined
}

export function slideAction({ selectedPair, formData, actions, amountVisible, createOrderIndex }) {
  const { currentVisible, percent, index } = actions
  const { price, quantity } = formData
  let temp = currentVisible.toNumber() * percent
  if (!index) {
    return textInputUpdate(
      price, quantity, temp, 'amount', selectedPair, amountVisible, createOrderIndex)
  }
  temp = new BigNumber(temp).dp(0, 1)
  return textInputUpdate(
    price, temp.toString(), undefined, 'quantity', selectedPair, amountVisible, createOrderIndex)
}
