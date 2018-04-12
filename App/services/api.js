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

export const login = makePostAPI('/1.0/app/user/login')
export const register = makePostAPI('/1.0/app/user/register')
export const getVerificateCode = makePostAPI('/1.0/app/user/getVerificateCode')
export const resetPassword = makePostAPI('/1.0/app/user/resetPassword')
