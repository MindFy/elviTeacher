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

  let defaultLanguage
  const evt = deviceInfo.getDeviceLocale()
  if (evt.indexOf('zh') > -1) {
    defaultLanguage = 'zh_cn'
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

