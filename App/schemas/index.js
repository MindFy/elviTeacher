import findUser from './user'
import {
  findDelegateSelfCurrent,
  findDelegateSelfCurrentWithGoodsId,
  findDelegateSelfHistory,
} from './delegate'
import {
  findPaymentListRecharge,
  findPaymentListWithdraw,
} from './payment'
import findListSelf from './deal'
import * as home from './home'
import findAssetList from './asset'
import findAddress from './address'
import findOtcList from './otcDetail'

const schemas = {
  findUser,
  findPaymentListRecharge,
  findPaymentListWithdraw,
  findDelegateSelfCurrent,
  findDelegateSelfCurrentWithGoodsId,
  findDelegateSelfHistory,
  findListSelf,
  findAssetList,
  findBanners: home.findBanners,
  findAnnouncement: home.findAnnouncement,
  findAddress,
  findOtcList,
}
export default schemas
