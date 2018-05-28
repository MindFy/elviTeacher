import {
  add,
  addUpdate,
  findAddress,
  selectTokenUpdate,
} from './address'
import findAnnouncement from './announcement'
import {
  createAddress,
  getAssets,
  getValuation,
  findAssetList,
  findAssetListUpdate,
} from './asset'
import findBanners from './banners'
import {
  findListSelf,
  latestDeals,
  wsDealsUpdate,
  buyOrSellUpdate,
  homeRoseSelectedUpdate,
} from './deal'
import {
  getRose,
  marketListUpdate,
} from './dealstat'
import {
  allCancel,
  cancel,
  create,
  getDepthMap,
  getShelves,
  wsGetShelvesUpdate,
  findDelegateSelfCurrent,
  findDelegateSelfCurrentWithGoodsId,
  wsDelegatesCurrentUpdate,
  findDelegateSelfHistory,
  currentOrHistoryUpdate,
  textInputDelegateUpdate,
  skipDelegateUpdate,
} from './delegate'
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
  login,
  loginUpdate,
  logout,
  register,
  registerUpdate,
  resetPassword,
  sync,
  updatePassword,
  updatePasswordUpdate,
  updateBankUpdate,
  updateBank,
  updateEmail,
  updateEmailUpdate,
} from './user'
import {
  selectionBarUpdate,
  kLineOrDepthUpdate,
  averagePriceOrPriceUpdate,
  dealledOrQuantityUpdate,
  cashAccountUpdate,
  delegateDrawerUpdate,
  codeAuthUpdate,
  bankTextInputUpdate,
} from './ui'
import {
  detailupdateKV,
} from './detailDeal'

const actions = {
  add,
  addUpdate,
  findAddress,
  selectTokenUpdate,

  findAnnouncement,

  createAddress,
  getAssets,
  getValuation,
  findAssetList,
  findAssetListUpdate,

  findBanners,

  findListSelf,
  latestDeals,
  wsDealsUpdate,
  buyOrSellUpdate,
  homeRoseSelectedUpdate,

  getRose,
  marketListUpdate,

  allCancel,
  cancel,
  create,
  getDepthMap,
  getShelves,
  wsGetShelvesUpdate,
  findDelegateSelfCurrent,
  findDelegateSelfCurrentWithGoodsId,
  wsDelegatesCurrentUpdate,
  findDelegateSelfHistory,
  currentOrHistoryUpdate,
  textInputDelegateUpdate,
  skipDelegateUpdate,

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
  login,
  loginUpdate,
  logout,
  register,
  registerUpdate,
  resetPassword,
  sync,
  updatePassword,
  updatePasswordUpdate,
  updateBankUpdate,
  updateBank,
  updateEmail,
  updateEmailUpdate,

  selectionBarUpdate,
  kLineOrDepthUpdate,
  averagePriceOrPriceUpdate,
  dealledOrQuantityUpdate,
  cashAccountUpdate,
  delegateDrawerUpdate,
  codeAuthUpdate,
  bankTextInputUpdate,

  detailupdateKV,
}
export default actions
