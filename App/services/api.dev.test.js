import { API_ROOT, ws } from './api.dev'

test('API_ROOT should be http://127.0.0.1:8080', () => {
  expect(API_ROOT).toBe('http://127.0.0.1:8080')
})

test('ws should be ws://127.0.0.1:8080/1.0/push', () => {
  expect(ws).toBe('ws://127.0.0.1:8080/1.0/push')
})
