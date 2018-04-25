import findUser from './user'
import {
  findDelegateList,
  findDelegateSelf,
} from './delegate'
import findLegalDeal from './legalDeal'
import findPaymentList from './payment'
import findListSelf from './deal'
import findBanners from './banners'
import findAssetList from './asset'
import findAnnouncement from './announcement'
import findAddress from './address'

const schemas = {
  findUser,
  findPaymentList,
  findDelegateList,
  findDelegateSelf,
  findLegalDeal,
  findListSelf,
  findBanners,
  findAssetList,
  findAnnouncement,
  findAddress,
}
export default schemas
