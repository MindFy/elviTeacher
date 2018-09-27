import {
    takeLatest, call,
} from 'redux-saga/effects'
import * as api from '../services/api'

export function* requestUpdateRemoteLanguageWorker(action) {
    const { payload } = action
    const response = yield call(api.updateRemoteLanguage, payload)
}

export function* requestUpdateRemoteLanguage() {
    yield takeLatest('system/update_remote_language', requestUpdateRemoteLanguageWorker)
}