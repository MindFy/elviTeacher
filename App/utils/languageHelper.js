import fs from 'rn-fs-d3j'
import deviceInfo from 'react-native-device-info'

// import { getObject, setObject } from './cache'
import cache from './cache'

export const defaultSysLanguage = 'languageSet'

export const getDefaultLanguage = () => {
  const languageFromCache = cache.getObject(defaultSysLanguage)
  if (languageFromCache) {
    return languageFromCache
  }

  if (fs.userDefaultSysLang) {
    cache.setObject(defaultSysLanguage, fs.userDefaultSysLang)
    return fs.userDefaultSysLang
  }

  let defaultLanguage = 'en'
  const evt = deviceInfo.getDeviceLocale().toLocaleLowerCase()
  // en(英文) zh-Hans-US(简体) zh-Hant-US(繁体) ja-US(日文) ja-US(韩文) 【IOS】
  // zh-Hans-CN(简体)  zh-Hant-TW(繁体) en-GB(英文) ja-JP(日本) ko-KR(韩文) 【ANDROID】
  if (evt.indexOf('zh-hans-') > -1) {
    defaultLanguage = 'zh_hans'
  } else if (evt.indexOf('zh-hant-') > -1) {
    defaultLanguage = 'zh_hant'
  } else if (evt.indexOf('ja-') > -1) {
    defaultLanguage = 'ja'
  } else if (evt.indexOf('ko-') > -1) {
    defaultLanguage = 'ko'
  } else {
    defaultLanguage = 'en'
  }
  return defaultLanguage
}

export const storeSysterLanguage = (language) => {
  cache.removeObject(defaultSysLanguage)
  cache.setObject(defaultSysLanguage, language)
  fs.setValueByKey(defaultSysLanguage, language)
}

