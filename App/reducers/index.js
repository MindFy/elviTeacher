import { combineReducers } from 'redux'
import address from './address'
import announcement from './announcement'
import asset from './asset'
import banners from './banners'
import deal from './deal'
import dealstat from './dealstat'
import delegate from './delegate'
import legalDeal from './legalDeal'
import payment from './payment'
import user from './user'
import ui from './ui'

const rootReducer = combineReducers({
  address,
  announcement,
  asset,
  banners,
  deal,
  dealstat,
  delegate,
  legalDeal,
  payment,
  user,
  ui,
})

export default rootReducer
