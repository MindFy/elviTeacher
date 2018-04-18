import findPaymentList from './payment'
import findUser from './user'
import {
  findDelegateList,
  findDelegateSelf,
} from './delegate'
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
  findListSelf,
  findBanners,
  findAssetList,
  findAnnouncement,
  findAddress,
}
export default schemas
