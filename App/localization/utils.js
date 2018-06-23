export default function (language, key) {
  let localizationJSON = {}
  switch (language) {
    case 'en':
      localizationJSON = require('./localization_en.json')
      break
    case 'zh_hk':
      localizationJSON = require('./localization_zh_hk.json')
      break
    case 'zh_tw':
      localizationJSON = require('./localization_zh_tw.json')
      break
    default:
      localizationJSON = require('./localization_zh_cn.json')
      break
  }
  return localizationJSON[key] || ''
}
