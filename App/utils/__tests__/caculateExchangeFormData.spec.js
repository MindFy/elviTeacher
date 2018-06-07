import { textInputLimit } from '../caculateExchangeFormData'

describe('输入框price 测试', () => {
  it('输入框price 清空', () => {
    // const params =
    expect(textInputLimit('', '', undefined, 2, 4, 6, 'price', '9999', 0))
      .toEqual({ p: '', q: '', a: '' })
  })
  it('输入框price 输入0000得出0', () => {
    // const params =
    expect(textInputLimit('00000', '', undefined, 2, 4, 6, 'price', '9999', 0))
      .toEqual({ p: '0', q: '', a: '' })
  })
  it('输入框price 金额为NAN不显示', () => {
    // const params =
    expect(textInputLimit('1', '', undefined, 2, 4, 6, 'price', '9999', 0))
      .toEqual({ p: '1', q: '', a: '' })
  })
  it('输入框price 输入小数精度为2以内的值', () => {
    // const params =
    expect(textInputLimit('1', '', undefined, 2, 4, 6, 'price', '9999', 0))
      .toEqual({ p: '1', q: '', a: '' })
    expect(textInputLimit('0.1', '', undefined, 2, 4, 6, 'price', '9999', 0))
      .toEqual({ p: '0.1', q: '', a: '' })
    expect(textInputLimit('0.01', '', undefined, 2, 4, 6, 'price', '9999', 0))
      .toEqual({ p: '0.01', q: '', a: '' })
    expect(textInputLimit('0.00', '', undefined, 2, 4, 6, 'price', '9999', 0))
      .toEqual({ p: '0.00', q: '', a: '' })
    expect(textInputLimit('0.00000010', '24', undefined, 8, 0, 8, 'quantity', '9999', 0))
      .toEqual({ p: '0.00000010', q: '24', a: '0.00000240' })
  })
  it('输入框price 输入超过小数精度为2的值', () => {
    // const params =
    expect(textInputLimit('0.012', '', undefined, 2, 4, 6, 'price', '9999', 0))
      .toEqual(undefined)
    expect(textInputLimit('0.001', '', undefined, 2, 4, 6, 'price', '9999', 0))
      .toEqual(undefined)
    expect(textInputLimit('0.000', '', undefined, 2, 4, 6, 'price', '9999', 0))
      .toEqual(undefined)
  })
  it('输入框price 输入非数字', () => {
    // const params =
    for (let i = 65; i < 123; i++) {
      const param = String.fromCharCode(i)
      expect(textInputLimit(param, '', undefined, 2, 4, 6, 'price', '9999', 0))
        .toEqual(undefined)
    }
  })
  it('输入框price 根据可用金额限制价格最大输入，价格和金额保留小数精度', () => {
    // const params =
    expect(textInputLimit('111', '1', undefined, 2, 4, 6, 'price', '100', 0))
      .toEqual({ p: '100.00', q: '1', a: '100.000000' })
    expect(textInputLimit('100.1', '1', undefined, 2, 4, 6, 'price', '100', 0))
      .toEqual({ p: '100.00', q: '1', a: '100.000000' })
    expect(textInputLimit('100.01', '1', undefined, 2, 4, 6, 'price', '100', 0))
      .toEqual({ p: '100.00', q: '1', a: '100.000000' })
    expect(textInputLimit('111', '1', undefined, 2, 4, 6, 'price', '100.1', 0))
      .toEqual({ p: '100.10', q: '1', a: '100.100000' })
    expect(textInputLimit('100.1', '1', undefined, 2, 4, 6, 'price', '100.01', 0))
      .toEqual({ p: '100.01', q: '1', a: '100.010000' })
    expect(textInputLimit('4', '25', undefined, 2, 4, 6, 'price', '99.9', 0))
      .toEqual({ p: '3.99', q: '25', a: '99.750000' })
  })
})

describe('输入框quantity 测试', () => {
  it('输入框quantity 清空', () => {
    // const params =
    expect(textInputLimit('', '', undefined, 2, 4, 6, 'quantity', '9999', 0))
      .toEqual({ p: '', q: '', a: '' })
  })
  it('输入框quantity 输入0000得出0', () => {
    // const params =
    expect(textInputLimit('', '00000', undefined, 2, 4, 6, 'quantity', '9999', 0))
      .toEqual({ p: '', q: '0', a: '' })
  })
  it('输入框quantity 金额为NAN不显示', () => {
    // const params =
    expect(textInputLimit('', '1', undefined, 2, 4, 6, 'quantity', '9999', 0))
      .toEqual({ p: '', q: '1', a: '' })
  })
  it('输入框quantity 输入小数精度为4以内的值', () => {
    // const params =
    expect(textInputLimit('', '1', undefined, 2, 4, 6, 'quantity', '9999', 0))
      .toEqual({ p: '', q: '1', a: '' })
    expect(textInputLimit('', '0.01', undefined, 2, 4, 6, 'quantity', '9999', 0))
      .toEqual({ p: '', q: '0.01', a: '' })
    expect(textInputLimit('', '0.001', undefined, 2, 4, 6, 'quantity', '9999', 0))
      .toEqual({ p: '', q: '0.001', a: '' })
    expect(textInputLimit('', '0.0001', undefined, 2, 4, 6, 'quantity', '9999', 0))
      .toEqual({ p: '', q: '0.0001', a: '' })
    expect(textInputLimit('', '0.0000', undefined, 2, 4, 6, 'quantity', '9999', 0))
      .toEqual({ p: '', q: '0.0000', a: '' })
    expect(textInputLimit('0.081', '0.0001', undefined, 6, 4, 6, 'quantity', '9999', 0))
      .toEqual({ p: '0.081', q: '0.0001', a: '0.000008' })
  })
  it('输入框quantity 输入超过小数精度为4的值', () => {
    // const params =
    expect(textInputLimit('', '0.00012', undefined, 2, 4, 6, 'quantity', '9999', 0))
      .toEqual(undefined)
    expect(textInputLimit('', '0.00001', undefined, 2, 4, 6, 'quantity', '9999', 0))
      .toEqual(undefined)
    expect(textInputLimit('', '0.00000', undefined, 2, 4, 6, 'quantity', '9999', 0))
      .toEqual(undefined)
  })
  it('输入框quantity 输入非数字', () => {
    // const params =
    for (let i = 65; i < 123; i++) {
      const param = String.fromCharCode(i)
      expect(textInputLimit('', param, undefined, 2, 4, 6, 'quantity', '9999', 0))
        .toEqual(undefined)
    }
  })
  it('输入框quantity 根据可用金额限制价格最大输入，价格和金额保留小数精度', () => {
    // const params =
    expect(textInputLimit('1', '111', undefined, 2, 4, 6, 'quantity', '100', 0))
      .toEqual({ p: '1', q: '100.0000', a: '100.000000' })
    expect(textInputLimit('1', '100.1', undefined, 2, 4, 6, 'quantity', '100', 0))
      .toEqual({ p: '1', q: '100.0000', a: '100.000000' })
    expect(textInputLimit('1', '100.01', undefined, 2, 4, 6, 'quantity', '100', 0))
      .toEqual({ p: '1', q: '100.0000', a: '100.000000' })
    expect(textInputLimit('1', '111', undefined, 2, 4, 6, 'quantity', '100.1', 0))
      .toEqual({ p: '1', q: '100.1000', a: '100.100000' })
    expect(textInputLimit('1', '100.1', undefined, 2, 4, 6, 'quantity', '100.01', 0))
      .toEqual({ p: '1', q: '100.0100', a: '100.010000' })
    expect(textInputLimit('25', '4', undefined, 2, 4, 6, 'quantity', '99.999', 0))
      .toEqual({ p: '25', q: '3.9999', a: '99.997500' })
  })
})

describe('slider 测试', () => {
  it('slider 滑动到0', () => {
    // const params =
    expect(textInputLimit('0.01', '', '0', 2, 4, 6, 'amount', '99.999999', 0))
      .toEqual({ p: '0.01', q: '0.0000', a: '0.000000' })
    expect(textInputLimit('0.01', '0', undefined, 2, 4, 6, 'sliderForSell', '99.999999', 0))
      .toEqual({ p: '0.01', q: '0.0000', a: '0.000000' })
  })
  it('slider 滑动到最大值', () => {
    // const params =
    expect(textInputLimit('0.01', '', '0', 2, 4, 6, 'amount', '99.999999', 0))
      .toEqual({ p: '0.01', q: '0.0000', a: '0.000000' })
    expect(textInputLimit('0.01', '99.9999', undefined, 2, 4, 6, 'sliderForSell', '99.999999', 0))
      .toEqual({ p: '0.01', q: '99.9999', a: '0.999999' })
  })
  it('slider 滑动到49.999999', () => {
    // const params =
    expect(textInputLimit('2.22', '', '49.999999', 2, 4, 6, 'amount', '99.999999', 0))
      .toEqual({ p: '2.22', q: '22.5225', a: '49.999950' })
    expect(textInputLimit('2.22', '49.9999', undefined, 2, 4, 6, 'sliderForSell', '99.999999', 0))
      .toEqual({ p: '2.22', q: '49.9999', a: '110.999778' })
  })
})
