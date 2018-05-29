import { take, call, put, fork, cancel, cancelled } from 'redux-saga/effects'
import { createMockTask } from 'redux-saga/utils'
import loginFlow, { authorize } from './authorize'
import {
  LOGIN_REQUEST,
  LOGIN_SUCCEED,
  LOGIN_FAILED,
  LOGOUT_REQUEST,
} from '../constants/index'
import * as api from '../services/api'

describe('login successfully', () => {
  const iterator = loginFlow()
  const mockTask = createMockTask()

  it(`开始监听 ${LOGIN_REQUEST}`, () => {
    expect(iterator.next().value).toEqual(take(LOGIN_REQUEST))
  })

  it('fork 登录进程', () => {
    const mockAction = {
      data: {
        mobile: '15895847445',
        password: '123456',
      },
      type: LOGIN_REQUEST,
    }
    const task = iterator.next(mockAction).value
    expect(task).toEqual(fork(authorize, mockAction.data))
  })

  it(`监听 ${LOGOUT_REQUEST} 和 ${LOGIN_FAILED}`, () => {
    expect(iterator.next(mockTask).value).toEqual(take([LOGOUT_REQUEST, LOGIN_FAILED]))
  })

  it(`登录成功继续等待 ${LOGIN_REQUEST}`, () => {
    const mockAction = {
      type: LOGIN_SUCCEED,
    }

    expect(iterator.next(mockAction).value).toEqual(take(LOGIN_REQUEST))
  })
})

describe('logout action should cancel login task', () => {
  const iterator = loginFlow()
  const mockTask = createMockTask()

  it(`开始监听 ${LOGIN_REQUEST}`, () => {
    expect(iterator.next().value).toEqual(take(LOGIN_REQUEST))
  })

  it('fork 登录进程', () => {
    const mockAction = {
      data: {
        mobile: '15895847445',
        password: '123456',
      },
      type: LOGIN_REQUEST,
    }
    const task = iterator.next(mockAction).value
    expect(task).toEqual(fork(authorize, mockAction.data))
  })

  it(`监听 ${LOGOUT_REQUEST} 和 ${LOGIN_FAILED}`, () => {
    expect(iterator.next(mockTask).value).toEqual(take([LOGOUT_REQUEST, LOGIN_FAILED]))
  })

  it(`登录成功，进入下一次循环，继续监听${LOGOUT_REQUEST}`, () => {
    const mockAction = {
      type: LOGOUT_REQUEST,
    }

    expect(iterator.next(mockAction).value).toEqual(cancel(mockTask))
  })
})
