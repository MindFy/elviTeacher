export const API_ROOT = 'https://www.tok.com'
export const ws = 'wss://tok.com/1.0/push'
// export const API_ROOT = 'http://192.168.0.11:8080'
// export const ws = 'ws://192.168.0.11:8080/1.0/push'
// export const API_ROOT = 'http://47.91.206.104:8080'
// export const ws = 'ws://47.91.206.104:8080/1.0/push'
export const announcements1 = 'https://toksupport.zendesk.com/api/v2/help_center/'
export const announcements2 = '/sections/360001728931/articles.json'

function makeGetAPI(endPoint) {
  return () => fetch(endPoint)
    .then(response => response.json())
    .then(json => ({
      success: true,
      result: json,
    }))
    .catch(e => ({
      success: false,
      error: e,
    }))
}

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

// Token
export const getToken = makePostAPI('/1.0/app/tokenmanage/getTokens')
// User
export const getGoogleAuth = makePostAPI('/1.0/app/user/getGoogleAuth')
export const requestVerificateCode = makePostAPI('/1.0/app/user/requestVerificateCode')
export const idCardAuth = makePostAPI('/1.0/app/user/idCardAuth')
export const isExist = makePostAPI('/1.0/app/user/isExist')
export const login = makePostAPI('/1.0/app/user/login')
export const logout = makePostAPI('/1.0/app/user/logout')
export const register = makePostAPI('/1.0/app/user/register')
export const resetPassword = makePostAPI('/1.0/app/user/resetPassword')
export const sync = makePostAPI('/1.0/app/user/sync')
export const updateBank = makePostAPI('/1.0/app/user/updateBank')
export const updateEmail = makePostAPI('/1.0/app/user/updateEmail')
export const updateMobile = makePostAPI('/1.0/app/user/updateMobile')
export const updatePassword = makePostAPI('/1.0/app/user/updatePassword')
export const updateRemoteLanguage = makePostAPI('/1.0/app/user/language')
// Rebates
export const rebatesLink = `${API_ROOT}/signup?invitation=`
export const rebatesLinkQr = `${API_ROOT}/img-qr/${rebatesLink}`
export const rebatesCount = makePostAPI('/1.0/app/rebates/rebatesCount')
// Payment
export const cancelWithdraw = makePostAPI('/1.0/app/payment/cancelWithdraw')
export const recharge = makePostAPI('/1.0/payment/recharge')
export const withdraw = makePostAPI('/1.0/app/payment/withdraw')
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
// Alleges
export const createAllege = makePostAPI('/1.0/app/alleges/create')

// Asset
export const createAddress = makePostAPI('/1.0/app/asset/createAddress')
export const getAssets = makePostAPI('/1.0/app/asset/getAssets')
export const getValuation = makePostAPI('/1.0/app/asset/getValuation')
// Address
export const add = makePostAPI('/1.0/app/address/add')

export const graphql = graphqlAPI('/1.0/app')

export const getAPI = uri => makeGetAPI(uri)

/** 查看用户自选列表 */
export const getFavorite = makePostAPI('/1.0/app/user/getFavorite')

/** 设置/取消用户自选项目 */
export const userFavoriteLists = makePostAPI('/1.0/app/user/userFavoriteLists')

/** 检查该币币对是否在用户自选列表内 */
export const checkFavorite = makePostAPI('/1.0/app/user/checkFavorite')
