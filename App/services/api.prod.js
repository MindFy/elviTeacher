export const API_ROOT = 'http://47.91.202.112:8080'
export const ws = 'ws://47.91.202.112:8080/1.0/push'

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

function makePostAPITest() {
  return params => fetch('http://47.52.34.160:8080/1.0/app/payment/withdraw', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  }).then(resp => resp.json())
    .then((result) => {
      if (result.id) return { success: true, result }
      return { success: false, error: result }
    })
}

function makePostAPITestCancelWithdraw() {
  return params => fetch('http://47.52.34.160:8080/1.0/app/payment/cancelWithdraw', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
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

// User
export const checkVerificateCode = makePostAPI('/1.0/app/user/checkVerificateCode')
export const getVerificateCode = makePostAPI('/1.0/app/user/getVerificateCode')
export const getVerificateSmtpCode = makePostAPI('/1.0/app/user/getVerificateSmtpCode')
export const idCardAuth = makePostAPI('/1.0/app/user/idCardAuth')
export const isExist = makePostAPI('/1.0/app/user/isExist')
export const login = makePostAPI('/1.0/app/user/login')
export const logout = makePostAPI('/1.0/app/user/logout')
export const register = makePostAPI('/1.0/app/user/register')
export const resetPassword = makePostAPI('/1.0/app/user/resetPassword')
export const sync = makePostAPI('/1.0/app/user/sync')
export const updateBank = makePostAPI('/1.0/app/user/updateBank')
export const updateEmail = makePostAPI('/1.0/app/user/updateEmail')
export const updatePassword = makePostAPI('/1.0/app/user/updatePassword')
// Rebates
export const rebatesLink = `${API_ROOT}/signup?invitation=`
export const rebatesLinkQr = `${API_ROOT}/img-qr/${rebatesLink}`
export const rebatesCount = makePostAPI('/1.0/app/rebates/rebatesCount')
// Payment
export const cancelWithdraw = makePostAPITestCancelWithdraw('/1.0/payment/cancelWithdraw')
export const recharge = makePostAPI('/1.0/payment/recharge')
export const withdraw = makePostAPITest('/1.0/payment/withdraw')
export const qrApi = `${API_ROOT}/qr/`
// LegalDeal
export const legalDealCancel = makePostAPI('/1.0/app/legalDeal/cancel')
export const confirmPay = makePostAPI('/1.0/app/legalDeal/confirmPay')
export const legalDealCreate = makePostAPI('/1.0/app/legalDeal/create')
export const havedPay = makePostAPI('/1.0/app/legalDeal/havedPay')
// Invitation
export const totalCount = makePostAPI('/1.0/app/invitation/totalCount')
// Delegate
export const allCancel = makePostAPI('/1.0/app/delegate/allCancel')
export const cancel = makePostAPI('/1.0/app/delegate/cancel')
export const create = makePostAPI('/1.0/app/delegate/create')
export const getDepthMap = makePostAPI('/1.0/app/delegate/getDepthMap')
export const getShelves = makePostAPI('/1.0/app/delegate/getShelves')
// Dealstat
export const getRose = makePostAPI('/1.0/app/dealstat/getRose')
// Deal
export const latestDeals = makePostAPI('/1.0/app/deal/latestDeals')
// Banners
export const imgHashApi = `${API_ROOT}/1.0/fileProc/`

// Asset
export const createAddress = makePostAPI('/1.0/app/asset/createAddress')
export const getAssets = makePostAPI('/1.0/app/asset/getAssets')
export const getValuation = makePostAPI('/1.0/app/asset/getValuation')
// Address
export const add = makePostAPI('/1.0/app/address/add')

export const graphql = graphqlAPI('/1.0/app')
