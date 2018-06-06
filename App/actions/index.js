import {
  add,
  addUpdate,
  findAddress,
  selectTokenUpdate,
} from './address'
import {
  createAddress,
  getAssets,
  getValuation,
  findAssetList,
  findAssetListUpdate,
} from './asset'
import {
  findListSelf,
  latestDeals,
  wsDealsUpdate,
  buyOrSellUpdate,
  homeRoseSelectedUpdate,
} from './deal'
import {
  marketListUpdate,
} from './dealstat'
import invitationTotalCount from './invitation'
import {
  legalDealCancel,
  confirmPay,
  legalDealCreate,
  findLegalDeal,
  havedPay,
  legalDealUpdate,
  skipLegalDealUpdate,
} from './legalDeal'
import {
  cancelWithdraw,
  findPaymentListRecharge,
  findPaymentListWithdraw,
  recharge,
  withdraw,
  rechargeOrWithdrawUpdate,
  skipPaymentUpdate,
} from './payment'
import {
  rebatesCount,
  rebatesCountTK,
  rebatesCountBTC,
} from './rebates'
import {
  checkVerificateCode,
  getGoogleAuth,
  getVerificateCode,
  getVerificateSmtpCode,
  findUser,
  findUserUpdate,
  idCardAuth,
  imgHash,
  imgHashFailed,
  idCardAuthUpdate,
  isExist,
  logout,
  register,
  registerUpdate,
  resetPassword,
  sync,
  updatePassword,
  updatePasswordUpdate,
  updateEmail,
  updateEmailUpdate,
} from './user'
import {
  selectionBarUpdate,
  kLineOrDepthUpdate,
  averagePriceOrPriceUpdate,
  dealledOrQuantityUpdate,
  cashAccountUpdate,
  codeAuthUpdate,
  bankTextInputUpdate,
} from './ui'
import {
  detailupdateKV,
} from './detailDeal'
import {
  login,
  loginUpdate,
  clearError,
} from './authorize'
import * as home from './home'

const actions = {
  requestBanners: home.requestBanners,
  requestAnnouncements: home.requestAnnouncements,
  requestMarket: home.requestMarket,

  add,
  addUpdate,
  findAddress,
  selectTokenUpdate,

  createAddress,
  getAssets,
  getValuation,
  findAssetList,
  findAssetListUpdate,

  findListSelf,
  latestDeals,
  wsDealsUpdate,
  buyOrSellUpdate,
  homeRoseSelectedUpdate,

  marketListUpdate,

  invitationTotalCount,

  legalDealCancel,
  confirmPay,
  legalDealCreate,
  findLegalDeal,
  havedPay,
  legalDealUpdate,
  skipLegalDealUpdate,

  cancelWithdraw,
  findPaymentListRecharge,
  findPaymentListWithdraw,
  recharge,
  withdraw,
  rechargeOrWithdrawUpdate,
  skipPaymentUpdate,

  rebatesCount,
  rebatesCountTK,
  rebatesCountBTC,

  checkVerificateCode,
  getGoogleAuth,
  getVerificateCode,
  getVerificateSmtpCode,
  findUser,
  findUserUpdate,
  idCardAuth,
  imgHash,
  imgHashFailed,
  idCardAuthUpdate,
  isExist,
  logout,
  register,
  registerUpdate,
  resetPassword,
  sync,
  updatePassword,
  updatePasswordUpdate,
  updateEmail,
  updateEmailUpdate,

  selectionBarUpdate,
  kLineOrDepthUpdate,
  averagePriceOrPriceUpdate,
  dealledOrQuantityUpdate,
  cashAccountUpdate,
  codeAuthUpdate,
  bankTextInputUpdate,

  detailupdateKV,

  login,
  loginUpdate,
  clearError,
}
export default actions
