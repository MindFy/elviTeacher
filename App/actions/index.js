import {
  add,
  findAddress,
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
  findPaymentList,
  recharge,
  withdraw,
} from './payment'
import {
  checkVerificateCode,
  getVerificateCode,
  findUser,
  findUserUpdate,
  idCardAuth,
  isExist,
  login,
  loginUpdate,
  logout,
  register,
  registerUpdate,
  resetPassword,
  sync,
  updatePassword,
} from './user'

const actions = {
  add,
  findAddress,

  findAnnouncement,

  createAddress,
  getAssets,
  findAssetList,

  findBanners,

  findListSelf,
  latestDeals,

  getRose,

  allCancel,
  cancel,
  create,
  getDepthMap,
  getShelves,
  findDelegateList,
  findDelegateSelf,

  cancelWithdraw,
  findPaymentList,
  recharge,
  withdraw,

  checkVerificateCode,
  getVerificateCode,
  findUser,
  findUserUpdate,
  idCardAuth,
  isExist,
  login,
  loginUpdate,
  logout,
  register,
  registerUpdate,
  resetPassword,
  sync,
  updatePassword,
}
export default actions
