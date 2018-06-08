import { fork } from 'redux-saga/effects'
import * as user from './user'
import * as rebates from './rebates'
import * as payment from './payment'
import * as legalDeal from './legalDeal'
import getRose from './dealstat'
import * as deal from './deal'
import * as asset from './asset'
import * as address from './address'
import loginFlow, { syncWatcher } from './authorize'
import {
  openOrderRequest,
  orderHistoryRequest,
  requestCancelOrder,
  requestCancelAllOrder,
} from './orders'
import {
  requestCoinList,
  requestBalance,
  requestValuation,
  requestWithdraw,
  requestWithdrawAddress,
  requsetCheck2GoogleAuth,
} from './withdraw'
import { requestAddressAdd } from './addressAdd'
import * as home from './home'
import { requestPairInfo } from './market'
import { submitRequest } from './otc'
import * as exchanges from './exchange'

import * as updateBank from './updateBank'
import * as otcDetail from './otcDetail'
import {
  requestBalanceList,
  requestBalanceValuation,
} from './balance'
import * as recharge from './recharge'

export default function* rootSaga() {
  yield [
    home.requestBanners(),
    home.requestAnnouncements(),
    home.requestMarket(),

    loginFlow(),
    syncWatcher(),
    fork(user.checkVerificateCode),
    fork(user.getGoogleAuth),
    fork(user.getVerificateCode),
    fork(user.getVerificateSmtpCode),
    fork(user.findUser),
    fork(user.idCardAuth),
    fork(user.isExist),
    fork(user.findAuditmanage),
    fork(user.register),
    fork(user.resetPassword),
    fork(user.updateEmail),
    fork(user.updatePassword),

    fork(rebates.requestUser),
    fork(rebates.requestInvitationCount),
    fork(rebates.requestRebatesCountTK),
    fork(rebates.requestRebatesCountBTC),

    fork(payment.cancelWithdraw),
    fork(payment.findPaymentListRecharge),
    fork(payment.findPaymentListWithdraw),
    fork(payment.recharge),
    fork(payment.withdraw),

    fork(legalDeal.legalDealCancel),
    fork(legalDeal.confirmPay),
    fork(legalDeal.legalDealCreate),
    fork(legalDeal.findLegalDeal),
    fork(legalDeal.havedPay),

    fork(getRose),

    fork(deal.findListSelf),
    fork(deal.latestDeals),

    fork(asset.createAddress),
    fork(asset.getAssets),
    fork(asset.getValuation),
    fork(asset.findAssetList),

    fork(address.addAddress),
    fork(address.findAddress),

    fork(requestAddressAdd),
    fork(requestCoinList),
    fork(requestBalance),
    fork(requestValuation),
    fork(requestWithdraw),
    fork(requestWithdrawAddress),
    fork(requsetCheck2GoogleAuth),

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
  ]
}
