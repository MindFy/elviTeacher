import {
    take, call, put,
} from 'redux-saga/effects'
import * as api from '../services/api'

/* 获取谷歌验证信息 */
export function* getGoogleAuth() {
    while (true) {
        const request = yield take('securityCenter/get_google_auth')
        const response = yield call(api.graphql, request.schema)
        if (response.success && response.result.data.user.googleSecret) {
            yield put({ type: 'securityCenter/get_google_auth_succeed', })
        } else {
            yield put({ type: 'securityCenter/get_google_auth_failed', })
        }
    }
}


