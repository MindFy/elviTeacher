import findUser from './user'
import {
  findDelegateSelfCurrent,
  findDelegateSelfCurrentWithGoodsId,
  findDelegateSelfHistory,
} from './delegate'
import findLegalDeal from './legalDeal'
import {
  findPaymentListRecharge,
  findPaymentListWithdraw,
} from './payment'
import findListSelf from './deal'
import * as home from './home'
import findAssetList from './asset'
import findAddress from './address'
import findOpenOrders from './exchange'

const schemas = {
  findUser,
  findPaymentListRecharge,
  findPaymentListWithdraw,
  findDelegateSelfCurrent,
  findDelegateSelfCurrentWithGoodsId,
  findDelegateSelfHistory,
  findLegalDeal,
  findListSelf,
  findAssetList,
  findBanners: home.findBanners,
  findAnnouncement: home.findAnnouncement,
  findAddress,
  findOpenOrders,
}
export default schemas
