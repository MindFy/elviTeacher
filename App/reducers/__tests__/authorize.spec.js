import authorize from '../authorize'
import {
  LOGIN_REQUEST,
  LOGIN_FORM_CHANGE,
  LOGIN_SUCCEED,
  LOGIN_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCEED,
  LOGOUT_FAILED,
} from '../../constants'

describe('authorize reducer', () => {
  const initialState = {
    formState: {
      mobile: '',
      password: '',
    },
    error: null,
    loading: false,
    loggedIn: false,
  }

  it('should return initialState', () => {
    const mockAction = {}
    expect(authorize(undefined, mockAction)).toEqual(initialState)
  })

  it('LOGIN_FORM_CHANGE should update formState', () => {
    const mockAction = {
      type: LOGIN_FORM_CHANGE,
      payload: {
        mobile: '15895847445',
        password: '123456',
      },
    }

    expect(authorize(initialState, mockAction)).toEqual({
      ...initialState,
      formState: mockAction.payload,
    })
  })

  it('LOGIN_REQUEST should set loading to true', () => {
    const mockAction = {
      type: LOGIN_REQUEST,
    }
    expect(authorize(initialState, mockAction)).toEqual({
      ...initialState,
      loading: true,
    })
  })

  it('LOGIN_SUCCEED should set loading to false and set loggedIn to true and clear formState and clear error', () => {
    const mockAction = {
      type: LOGIN_SUCCEED,
    }
    expect(authorize(initialState, mockAction)).toEqual({
      ...initialState,
      loading: false,
      loggedIn: true,
      error: null,
      formState: {},
    })
  })

  it('LOGIN_FAILED should set loading to false and set loggedIn to false and not clear formState and set error', () => {
    const mockAction = {
      type: LOGIN_FAILED,
      payload: {
        error: -1,
      },
    }
    expect(authorize(initialState, mockAction)).toEqual({
      ...initialState,
      loading: false,
      loggedIn: false,
      error: mockAction.payload,
    })
  })

  it('LOGOUT_REQUEST should set loading to true and set loggedIn to false', () => {
    const mockAction = {
      type: LOGOUT_REQUEST,
    }
    const prevState = {
      ...initialState,
      formState: {},
      loading: false,
      loggedIn: true,
    }

    expect(authorize(prevState, mockAction)).toEqual({
      ...initialState,
      formState: {},
      loading: true,
      loggedIn: true,
    })
  })

  it('LOGOUT_SUCCEED should set loading to false and set loggedIn to false', () => {
    const mockAction = {
      type: LOGOUT_SUCCEED,
    }
    const prevState = {
      ...initialState,
      formState: {},
      loading: true,
      loggedIn: true,
    }

    expect(authorize(prevState, mockAction)).toEqual({
      ...initialState,
      formState: {},
      loading: false,
      loggedIn: false,
    })
  })

  it('LOGOUT_FAILED should set loading to false and set error object', () => {
    const mockAction = {
      type: LOGOUT_FAILED,
      payload: {
        msg: 'some error',
      },
    }
    const prevState = {
      ...initialState,
      formState: {},
      loading: true,
      loggedIn: true,
    }

    expect(authorize(prevState, mockAction)).toEqual({
      ...prevState,
      formState: {},
      error: mockAction.payload,
      loading: false,
    })
  })
})
