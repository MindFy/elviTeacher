import { fork } from 'redux-saga/effects'
import * as user from './user'
import * as rebates from './rebates'
import * as legalDeal from './legalDeal'
import getRose from './dealstat'
import * as deal from './deal'
import * as asset from './asset'
import * as address from './address'
import loginFlow, { syncWatcher, watchRequestLoginout } from './authorize'
import {
  openOrderRequest,
  orderHistoryRequest,
  requestCancelOrder,
  requestCancelAllOrder,
} from './orders'
import * as withdraw from './withdraw'
import * as addressAdd from './addressAdd'
import * as home from './home'
import { requestPairInfo, watchGetFavorite, watchSetFavorite } from './market'
import { submitRequest } from './otc'
import * as exchanges from './exchange'

import * as updateBank from './updateBank'
import * as otcDetail from './otcDetail'
import {
  requestBalanceList,
  requestBalanceValuation,
} from './balance'
import watchRequestDailyChange from './balanceDetail'
import * as recharge from './recharge'
import * as history from './history'
import watcherRequestReceiverInfo from './receiverInfo'
import * as system from './system'
import * as securityCenter from './securityCenter'

export default function* rootSaga() {
  yield [
    home.requestBanners(),
    home.requestAnnouncements(),
    home.requestMarket(),
    home.requestPairs(),
    home.requestShowPairs(),
    withdraw.requestPairs(),
    loginFlow(),
    syncWatcher(),
    watchRequestLoginout(),
    fork(user.getGoogleAuth),
    fork(user.getVerificateCode),
    fork(user.findUser),
    fork(user.idCardAuth),
    fork(user.isExist),
    fork(user.findAuditmanage),
    fork(user.register),
    fork(user.resetPassword),
    fork(user.updateEmail),
    fork(user.updateMobile),
    fork(user.updatePassword),
    fork(user.mobileIsExist),

    fork(rebates.requestUser),
    fork(rebates.requestInvitationCount),
    fork(rebates.requestRebatesCountTK),
    fork(rebates.requestRebatesCountBTC),

    fork(legalDeal.legalDealCancel),
    fork(legalDeal.confirmPay),
    fork(legalDeal.legalDealCreate),
    fork(legalDeal.findLegalDeal),
    fork(legalDeal.havedPay),

    fork(getRose),

    fork(deal.findListSelf),
    fork(deal.latestDeals),

    fork(watchRequestDailyChange),

    fork(asset.createAddress),
    fork(asset.getAssets),
    fork(asset.getValuation),
    fork(asset.findAssetList),

    fork(address.addAddress),
    fork(address.findAddress),

    fork(withdraw.requestCoinList),
    fork(withdraw.requestBalance),
    fork(withdraw.requestValuation),
    fork(withdraw.requestWithdraw),
    fork(withdraw.requestWithdrawAddress),
    fork(withdraw.requestGetCode),

    fork(orderHistoryRequest),
    fork(openOrderRequest),
    fork(requestCancelOrder),
    fork(requestCancelAllOrder),

    fork(requestPairInfo),
    fork(submitRequest),

    fork(exchanges.requestLastpriceList),
    fork(exchanges.requestOpenordersList),
    fork(exchanges.requestOrderhistoryList),
    fork(exchanges.createOrder),
    fork(exchanges.requestCancelOrder),
    fork(exchanges.requestValuation),
    fork(exchanges.requestDepthMap),
    fork(requestBalanceList),
    fork(requestBalanceValuation),
    fork(securityCenter.getGoogleAuth),
    exchanges.watchCheckFavorite(),
    exchanges.watchSetFavorite(),

    updateBank.requestUpdateBank(),
    updateBank.requestGetCode(),

    otcDetail.requestOtcList(),
    otcDetail.requestGetCode(),
    otcDetail.requestConfirmPay(),
    otcDetail.requestHavedPay(),
    otcDetail.requestCancel(),
    otcDetail.requestAllege(),

    recharge.requestCoinList(),
    recharge.requestRechargeAddress(),
    recharge.requestCreateAddress(),

    addressAdd.requestAddressAdd(),
    addressAdd.requestGetCode(),

    history.requestDeposit(),
    history.requestWithdraw(),
    history.requestOtc(),
    history.withdrawCancel(),

    system.requestUpdateRemoteLanguage(),

    watcherRequestReceiverInfo(),
    watchGetFavorite(),
    watchSetFavorite(),
  ]
}
