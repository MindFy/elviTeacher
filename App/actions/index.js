import {
  add,
  findAddress,
  selectTokenUpdate,
} from './address'
import findAnnouncement from './announcement'
import {
  createAddress,
  getAssets,
  findAssetList,
} from './asset'
import findBanners from './banners'
import {
  findListSelf,
  latestDeals,
  buyOrSellUpdate,
  currentTokensUpdate,
  textInputDelegateUpdate,
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
  findDelegateList,
  findDelegateSelf,
  currentOrHistoryUpdate,
} from './delegate'
import {
  legalDealCancel,
  confirmPay,
  legalDealCreate,
  findLegalDeal,
  havedPay,
  legalDealUpdate,
} from './legalDeal'
import {
  cancelWithdraw,
  findPaymentListRecharge,
  findPaymentListWithdraw,
  recharge,
  withdraw,
  rechargeOrWithdrawUpdate,
} from './payment'
import {
  checkVerificateCode,
  getVerificateCode,
  findUser,
  findUserUpdate,
  idCardAuth,
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
} from './user'

const actions = {
  add,
  findAddress,
  selectTokenUpdate,

  findAnnouncement,

  createAddress,
  getAssets,
  findAssetList,

  findBanners,

  findListSelf,
  latestDeals,
  buyOrSellUpdate,
  currentTokensUpdate,
  textInputDelegateUpdate,

  getRose,
  marketListUpdate,

  allCancel,
  cancel,
  create,
  getDepthMap,
  getShelves,
  findDelegateList,
  findDelegateSelf,
  currentOrHistoryUpdate,

  legalDealCancel,
  confirmPay,
  legalDealCreate,
  findLegalDeal,
  havedPay,
  legalDealUpdate,

  cancelWithdraw,
  findPaymentListRecharge,
  findPaymentListWithdraw,
  recharge,
  withdraw,
  rechargeOrWithdrawUpdate,

  checkVerificateCode,
  getVerificateCode,
  findUser,
  findUserUpdate,
  idCardAuth,
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
}
export default actions
