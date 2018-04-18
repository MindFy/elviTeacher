import findPaymentList from './payment'
import getUser from './user'
import {
  findDelegateList,
  findDelegateSelf,
} from './delegate'
import findListSelf from './deal'
import findBanners from './banners'
import findAssetList from './asset'
import findAnnouncement from './announcement'
import findAddress from './address'

exports.module = {
  getUser,
  findPaymentList,
  findDelegateList,
  findDelegateSelf,
  findListSelf,
  findBanners,
  findAssetList,
  findAnnouncement,
  findAddress,
}
