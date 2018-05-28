import { takeEvery, call, put } from 'redux-saga/effects'
import { findAddress, addAddress, addAddress_, fetchAddress } from './address'
import schema from '../schemas/address'
import * as api from '../services/api'
import * as constants from '../constants/index'


it('findAddress watcher', () => {
  const it = findAddress()
  expect(it.next().value).toEqual(takeEvery(constants.FIND_ADDRESS_REQUEST, fetchAddress))
  expect(it.next().done).toBe(true)
})

it('fetchAddress succeed', () => {
  const action = {
    schema: schema(1),
  }
  const response = {
    success: true,
  }
  const it = fetchAddress(action)

  expect(it.next().value).toEqual(call(api.graphql, schema(1)))
  expect(it.next(response).value).toEqual(put({ type: constants.FIND_ADDRESS_SUCCEED, response }))
  expect(it.next().done).toBe(true)
})

it('fetchAddress failed', () => {
  const action = {
    schema: schema(1),
  }
  const response = {
    success: false,
  }
  const it = fetchAddress(action)

  expect(it.next().value).toEqual(call(api.graphql, schema(1)))
  expect(it.next(response).value).toEqual(put({ type: constants.FIND_ADDRESS_FAILED, response }))
  expect(it.next().done).toBe(true)
})

it('addAddress watcher', () => {
  const it = addAddress()
  expect(it.next().value).toEqual(takeEvery(constants.ADD_REQUEST, addAddress_))
  expect(it.next().done).toBe(true)
})

it('addAddress success', () => {
  const action = {
    data: {
      token_id: 2,
      withdrawaddr: '18cBEMRxXHqzWWCxZNtU91F5sbUNKhL5PX',
      remark: 'test',
      code: '1234',
    },
  }
  const response = {
    success: true,
  }
  const it = addAddress_(action)

  expect(it.next().value).toEqual(call(api.add, action.data))
  expect(it.next(response).value).toEqual(put({ type: constants.ADD_SUCCEED, response }))
  expect(it.next().done).toBe(true)
})

it('addAddress success', () => {
  const action = {
    data: {
      token_id: 2,
      withdrawaddr: '18cBEMRxXHqzWWCxZNtU91F5sbUNKhL5PX',
      remark: 'test',
      code: '1234',
    },
  }
  const response = {
    success: false,
  }
  const it = addAddress_(action)

  expect(it.next().value).toEqual(call(api.add, action.data))
  expect(it.next(response).value).toEqual(put({ type: constants.ADD_FAILED, response }))
  expect(it.next().done).toBe(true)
})
