import { common } from './common'

test('11 should be 11', () => {
  expect(common.toFix2(11)).toBe('11')
})

test('11.100 should be 11.1', () => {
  expect(common.toFix2(11.100)).toBe('11.1')
})

test('11.1001 should be 11.1001', () => {
  expect(common.toFix2(11.1001)).toBe('11.10')
})

test('11.1122334455 should be 11.11', () => {
  expect(common.toFix2(11.1122334455)).toBe('11.11')
})

test('11.1122334455 should be 11.1122', () => {
  expect(common.toFix4(11.1122334455)).toBe('11.1122')
})

test('11.11 should be 11.11', () => {
  expect(common.toFix4(11.11)).toBe('11.11')
})

test('11.1122334455 should be 11.112233', () => {
  expect(common.toFix6(11.1122334455)).toBe('11.112233')
})

test('11.1122334455 should be 11.11223344', () => {
  expect(common.toFix8(11.1122334455)).toBe('11.11223344')
})

test('11.112233 should be 11.112233', () => {
  expect(common.toFix8(11.112233)).toBe('11.112233')
})

test('abc should be abc', () => {
  expect(common.toFix8('abc')).toBe('abc')
})

test('abc.123 should be abc.123', () => {
  expect(common.toFix2('abc.123')).toBe('abc.123')
})

test('abc.def should be abc.def', () => {
  expect(common.toFix2('abc.def')).toBe('abc.def')
})

test('abc.123 should be abc.123', () => {
  expect(common.toFix8('abc.123')).toBe('abc.123')
})
