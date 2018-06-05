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
import orders from './orders'
import market from './market'
import otc from './otc'
import updateBank from './updateBank'
import balance from './balance'

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
  orders,
  market,
  otc,
  updateBank,
  balance,
})

export default rootReducer
