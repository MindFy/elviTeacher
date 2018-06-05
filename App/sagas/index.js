import { fork } from 'redux-saga/effects'
import * as user from './user'
import * as rebates from './rebates'
import * as payment from './payment'
import * as legalDeal from './legalDeal'
import invitationTotalCount from './invitation'
import * as delegate from './delegate'
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
} from './withdraw'
import { requestAddressAdd } from './addressAdd'
import * as home from './home'
import { requestPairInfo } from './market'
import { submitRequest } from './otc'
import * as exchanges from './exchange'

import * as updateBank from './updateBank'

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
    fork(user.register),
    fork(user.resetPassword),
    fork(user.updateEmail),
    fork(user.updatePassword),

    fork(rebates.rebatesCount),
    fork(rebates.rebatesCountTK),
    fork(rebates.rebateCountBTC),

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

    fork(invitationTotalCount),

    fork(delegate.allCancel),
    fork(delegate.cancel),
    fork(delegate.create),
    fork(delegate.getDepthMap),
    fork(delegate.getShelves),
    fork(delegate.findDelegateSelfCurrent),
    fork(delegate.findDelegateSelfCurrentWithGoodsId),
    fork(delegate.findDelegateSelfHistory),

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

    updateBank.requestUpdateBank(),
    updateBank.requestGetCode(),
  ]
}
