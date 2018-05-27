import { takeEvery, call, put } from 'redux-saga/effects'
import { findAddress, addAddress, fetchAddress } from './address'
import schema from '../schemas/address'
import * as api from '../services/api'
import * as constants from '../constants/index'


it('watch findAddress saga', () => {
  const it = findAddress()
  expect(it.next().value).toEqual(takeEvery(constants.FIND_ADDRESS_REQUEST, fetchAddress))
  expect(it.next().done).toBe(true)
})

it('fetchAddress success', () => {
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
