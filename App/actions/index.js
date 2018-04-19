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
import getRose from './dealstat'
import {
  allCancel,
  cancel,
  create,
  getDepthMap,
  getShelves,
  findDelegateList,
  findDelegateSelf,
} from './delegate'
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

  allCancel,
  cancel,
  create,
  getDepthMap,
  getShelves,
  findDelegateList,
  findDelegateSelf,

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
}
export default actions
