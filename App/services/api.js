export const root = 'http://54.65.94.63'
export const login = '/1.0/app/user/login'
export const register = '/1.0/app/user/register'
export const getVerificateCode = '/1.0/app/user/getVerificateCode'

export function http(api, method = 'GET', data = {}) {
  return fetch(api, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
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
