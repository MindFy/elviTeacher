const API_ROOT = 'http://54.65.94.63'

function makePostAPI(endpoint) {
  return params => fetch(`${API_ROOT}${endpoint}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params || {}),
    credentials: 'same-origin',
  }).then(response => response.json().then(json => ({ json, response })))
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }
      return json
    }).then(result => ({
      success: true,
      result,
    }), error => ({
      success: false,
      error,
    }))
}

function graphqlAPI(endpoint) {
  return schema => fetch(`${API_ROOT}${endpoint}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/graphql',
    },
    body: schema,
    credentials: 'same-origin',
  }).then(response => response.json().then(json => ({ json, response })))
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }
      return json
    }).then(result => ({
      success: true,
      result,
    }), error => ({
      success: false,
      error,
    }))
}

export const login = makePostAPI('/1.0/app/user/login')
export const register = makePostAPI('/1.0/app/user/register')
export const getVerificateCode = makePostAPI('/1.0/app/user/getVerificateCode')
export const checkVerificateCode = makePostAPI('/1.0/app/user/checkVerificateCode')
export const resetPassword = makePostAPI('/1.0/app/user/resetPassword')
export const logout = makePostAPI('/1.0/app/user/logout')
export const updatePassword = makePostAPI('/1.0/app/user/updatePassword')
export const imgHash = makePostAPI('/1.0/fileProc/imghash')
export const getShelves = makePostAPI('/1.0/app/delegate/getShelves')
export const latestDeals = makePostAPI('/1.0/app/deal/latestDeals')
export const delegateCreate = makePostAPI('/1.0/app/delegate/create')

export const graphql = graphqlAPI('/1.0/app')
