import { combineReducers } from 'redux'
import address from './address'
import announcement from './announcement'
import asset from './asset'
import banners from './banners'
import deal from './deal'
import dealstat from './dealstat'
import delegate from './delegate'
import payment from './payment'
import user from './user'

const rootReducer = combineReducers({
  address,
  announcement,
  asset,
  banners,
  deal,
  dealstat,
  delegate,
  payment,
  user,
})

export default rootReducer
