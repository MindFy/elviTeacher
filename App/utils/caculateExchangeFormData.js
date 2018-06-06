import { BigNumber } from 'bignumber.js'
import { common } from '../constants/common'

function textInputLimit(
  price, quantity, amount, precisionPrice,
  precisionQuantity, precisionAmount, tag,
) {
  if ((tag === 'price' && !price.length) || (tag === 'quantity' && !quantity.length)) {
    return { p: price, q: quantity, a: '' } // 1.输入框清空
  }

  let p = new BigNumber(price)
  let q = new BigNumber(quantity)
  let a
  if (amount || amount === 0) {
    q = new BigNumber(amount).dividedBy(p).dp(precisionQuantity, 1)
    if (q.isNaN()) return undefined // 9.分子不能为0，非数字
    a = new BigNumber(p).multipliedBy(q).dp(precisionAmount, 1)
    p = p.isNaN() ? '' : p.toString()
    q = q.isNaN() ? '' : q.toString()
    a = a.isNaN() ? '' : a.toFixed(precisionAmount, 1)
    return { p, q, a }
  }
  // if (q.gt(amountVisible)) {
  //   q = new BigNumber(amountVisible)
  // }
  if (tag === 'price' && p.isNaN()) return undefined // 2.限制只能输入数字、小数点
  if (tag === 'quantity' && q.isNaN()) return undefined // 3.限制只能输入数字、小数点
  const pArr = price.split('.')
  const qArr = quantity.split('.')
  if (pArr[0].length > common.maxLenDelegate) return undefined // 4.整数长度限制
  if (pArr.length > 1 && pArr[1].length > precisionPrice) return undefined // 5.小数长度限制
  if (price.endsWith('.') || pArr.length > 1) {
    a = new BigNumber(p).multipliedBy(q).dp(precisionAmount, 1)
    a = a.isNaN() ? '' : a.toFixed(precisionAmount, 1)
    return { p: price, q: quantity, a }
  }
  if (qArr[0].length > common.maxLenDelegate) return undefined // 6.整数长度限制
  if (precisionQuantity === 0) {
    if (qArr.length > 1) return undefined // 7.限制只能输入整数
  } else {
    if (qArr.length > 1 && qArr[1].length > precisionQuantity) return undefined // 8.小数长度限制
    if (quantity.endsWith('.') || qArr.length > 1) {
      a = new BigNumber(p).multipliedBy(q).dp(precisionAmount, 1)
      a = a.isNaN() ? '' : a.toFixed(precisionAmount, 1)
      return { p: price, q: quantity, a }
    }
  }

  a = new BigNumber(p).multipliedBy(q).dp(precisionAmount, 1)
  p = p.isNaN() ? '' : p.toString()
  q = q.isNaN() ? '' : q.toString()
  a = a.isNaN() ? '' : a.toFixed(precisionAmount, 1)
  return { p, q, a }
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
      const temp = textInputLimit(price, quantity, amount, p, q, a, tag, availble)
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
    const temp = textInputLimit(price, quantity, amount, 2, 4, 6, tag, availble)
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
      price, quantity, temp, undefined, selectedPair, amountVisible, createOrderIndex)
  }
  temp = new BigNumber(temp).dp(0, 1)
  return textInputUpdate(
    price, temp.toString(), undefined, undefined, selectedPair, amountVisible, createOrderIndex)
}
