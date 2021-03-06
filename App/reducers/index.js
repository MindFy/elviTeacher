import { combineReducers } from 'redux'
import address from './address'
import asset from './asset'
import deal from './deal'
import dealstat from './dealstat'
import legalDeal from './legalDeal'
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
import exchange from './exchange'
import updateBank from './updateBank'
import otcDetail from './otcDetail'
import balance from './balance'
import recharge from './recharge'
import system from './system'
import history from './history'
import receiverInfo from './receiverInfo'
import balanceDetail from './balanceDetail'
import updatePassword from './updatePassword'
import securityCenter from './securityCenter'

const rootReducer = combineReducers({
  authorize,
  home,
  address,
  asset,
  deal,
  dealstat,
  legalDeal,
  rebates,
  user,
  ui,
  detailDeal,
  receiverInfo,
  withdraw,
  addressAdd,
  orders,
  market,
  otc,
  exchange,
  updateBank,
  otcDetail,
  balance,
  recharge,
  system,
  history,
  balanceDetail,
  updatePassword,
  securityCenter,
})

export default rootReducer
