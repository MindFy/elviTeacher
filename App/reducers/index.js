import { combineReducers } from 'redux'
import address from './address'
import asset from './asset'
import deal from './deal'
import dealstat from './dealstat'
import delegate from './delegate'
import invitation from './invitation'
import legalDeal from './legalDeal'
import payment from './payment'
import rebates from './rebates'
import user from './user'
import ui from './ui'
import detailDeal from './detailDeal'
import authorize from './authorize'
import withdraw from './withdraw'
import addressAdd from './addressAdd'
import home from './home'

const rootReducer = combineReducers({
  authorize,
  home,
  address,
  asset,
  deal,
  dealstat,
  delegate,
  invitation,
  legalDeal,
  payment,
  rebates,
  user,
  ui,
  detailDeal,
  withdraw,
  addressAdd,
})

export default rootReducer
