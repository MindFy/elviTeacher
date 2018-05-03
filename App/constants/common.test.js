import { common } from './common'

test('11 should be 11', () => {
  expect(common.toFix2(11)).toBe('11')
})

test('11.1122334455 should be 11.11', () => {
  expect(common.toFix2(11.1122334455)).toBe('11.11')
})

test('11.1122334455 should be 11.1122', () => {
  expect(common.toFix4(11.1122334455)).toBe('11.1122')
})

test('11.1122334455 should be 11.112233', () => {
  expect(common.toFix6(11.1122334455)).toBe('11.112233')
})

test('11.1122334455 should be 11.11223344', () => {
  expect(common.toFix8(11.1122334455)).toBe('11.11223344')
})
