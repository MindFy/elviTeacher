const API_ROOT = 'http://54.65.94.63'
const login = '/1.0/app/user/login'

export default function userLoggin({ username, password }) {
  return fetch(`${API_ROOT}${login}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      mobile: username,
      password,
    }),
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
