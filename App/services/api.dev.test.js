import { API_ROOT } from './api.dev'

test('API_ROOT should be http://127.0.0.1:8080', () => {
  expect(API_ROOT).toBe('http://127.0.0.1:8080')
})
