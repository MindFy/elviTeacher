import { takeEvery, call, put } from 'redux-saga/effects'
import findAnnouncement, { fetchAnnouncement } from './announcement'
import * as constants from '../constants/index'
import * as api from '../services/api'

it('findAnnouncement watcher', () => {
  const it = findAnnouncement()
  expect(it.next().value)
    .toEqual(takeEvery(constants.FIND_ANNOUNCEMENT_REQUEST, fetchAnnouncement))
})

it('findAnnouncement succeed', () => {
  const schema = `{
    find_announcement{
        id,
          title,
          content,
          imghash,
          createdAt
    }
  }`
  const action = {
    schema,
  }
  const response = {
    success: true,
  }

  const it = fetchAnnouncement(action)
  expect(it.next(response).value).toEqual(call(api.graphql, schema))
  expect(it.next(response).value).toEqual(put({
    type: constants.FIND_ANNOUNCEMENT_SUCCEED,
    response,
  }))
  expect(it.next().done).toBe(true)
})

it('findAnnouncement failed', () => {
  const schema = `{
    find_announcement{
        id,
          title,
          content,
          imghash,
          createdAt
    }
}`
  const action = {
    schema,
  }
  const response = {
    success: false,
  }

  const it = fetchAnnouncement(action)
  expect(it.next().value).toEqual(call(api.graphql, schema))
  expect(it.next(response).value).toEqual(put({
    type: constants.FIND_ADDRESS_FAILED,
    response,
  }))
  expect(it.next().done).toBe(true)
})
