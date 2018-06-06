import { common } from './common'

test('mobile reg', () => {
  const mobile = '13123456789'
  expect(common.regMobile.test(mobile)).toBe(true)
})

test('mobile reg', () => {
  const mobile = '1312345678'
  expect(common.regMobile.test(mobile)).toBe(false)
})
