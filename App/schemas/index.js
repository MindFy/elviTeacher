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
import findBanners from './banners'
import findAssetList from './asset'
import findAnnouncement from './announcement'
import findAddress from './address'

const schemas = {
  findUser,
  findPaymentListRecharge,
  findPaymentListWithdraw,
  findDelegateSelfCurrent,
  findDelegateSelfCurrentWithGoodsId,
  findDelegateSelfHistory,
  findLegalDeal,
  findListSelf,
  findBanners,
  findAssetList,
  findAnnouncement,
  findAddress,
}
export default schemas
