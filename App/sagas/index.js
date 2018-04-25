import { fork } from 'redux-saga/effects'
import * as user from './user'
import * as payment from './payment'
import * as legalDeal from './legalDeal'
import * as delegate from './delegate'
import getRose from './dealstat'
import * as deal from './deal'
import findBanners from './banners'
import * as asset from './asset'
import findAnnouncement from './announcement'
import * as address from './address'

export default function* rootSaga() {
  yield [
    fork(user.checkVerificateCode),
    fork(user.getVerificateCode),
    fork(user.findUser),
    fork(user.idCardAuth),
    fork(user.isExist),
    fork(user.login),
    fork(user.logout),
    fork(user.register),
    fork(user.resetPassword),
    fork(user.sync),
    fork(user.updatePassword),
    fork(user.updateBank),

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

    fork(delegate.allCancel),
    fork(delegate.cancel),
    fork(delegate.create),
    fork(delegate.getDepthMap),
    fork(delegate.getShelves),
    fork(delegate.findDelegateList),
    fork(delegate.findDelegateSelf),

    fork(getRose),

    fork(deal.findListSelf),
    fork(deal.latestDeals),

    fork(findBanners),

    fork(asset.createAddress),
    fork(asset.getAssets),
    fork(asset.findAssetList),

    fork(findAnnouncement),

    fork(address.add),
    fork(address.findAddress),
  ]
}
