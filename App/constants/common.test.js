import { common } from './common'

test('mobile reg', () => {
  const mobile = '11123456789'
  expect(common.regMobile.test(mobile)).toBe(false)
})

test('mobile reg', () => {
  const mobile = '12123456789'
  expect(common.regMobile.test(mobile)).toBe(false)
})

test('mobile reg', () => {
  const mobile = '13123456789'
  expect(common.regMobile.test(mobile)).toBe(true)
})

test('mobile reg', () => {
  const mobile = '14123456789'
  expect(common.regMobile.test(mobile)).toBe(true)
})

test('mobile reg', () => {
  const mobile = '15123456789'
  expect(common.regMobile.test(mobile)).toBe(true)
})

test('mobile reg', () => {
  const mobile = '16123456789'
  expect(common.regMobile.test(mobile)).toBe(true)
})

test('mobile reg', () => {
  const mobile = '17123456789'
  expect(common.regMobile.test(mobile)).toBe(true)
})

test('mobile reg', () => {
  const mobile = '18123456789'
  expect(common.regMobile.test(mobile)).toBe(true)
})

test('mobile reg', () => {
  const mobile = '19123456789'
  expect(common.regMobile.test(mobile)).toBe(true)
})

test('mobile reg', () => {
  const mobile = '10123456789'
  expect(common.regMobile.test(mobile)).toBe(false)
})

test('mobile reg', () => {
  const mobile = '1234'
  expect(common.regMobile.test(mobile)).toBe(false)
})

test('mobile reg', () => {
  const mobile = 'asdfqwer'
  expect(common.regMobile.test(mobile)).toBe(false)
})

test('mobile reg', () => {
  const mobile = '182 6238122'
  expect(common.regMobile.test(mobile)).toBe(false)
})
