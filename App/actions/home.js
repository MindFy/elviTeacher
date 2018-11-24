export function requestBanners(payload) {
  return {
    type: 'home/request_banners',
    payload,
  }
}

export function requestBannersSucceed(payload) {
  return {
    type: 'home/request_banners_succeed',
    payload,
  }
}

export function requestBannersFailed(payload) {
  return {
    type: 'home/request_banners_failed',
    payload,
  }
}

export function requestAnnouncements(payload) {
  return {
    type: 'home/request_announcements',
    payload,
  }
}

export function requestAnnouncementsSucceed(payload) {
  return {
    type: 'home/request_announcements_succeed',
    payload,
  }
}

export function requestAnnouncementsFailed(payload) {
  return {
    type: 'home/request_announcements_failed',
    payload,
  }
}

export function requestMarket(payload) {
  return {
    type: 'home/request_market',
    payload,
  }
}

export function requestMarketSucceed(payload) {
  return {
    type: 'home/request_market_succeed',
    payload,
  }
}

export function modifyLastPriceSort(payload) {
  return {
    type: 'home/modify_lastPrice_sort',
    payload,
  }
}

export function modifyChangeSort(payload) {
  return {
    type: 'home/modify_change_sort',
    payload,
  }
}

export function requestPairs() {
  return {
    type: 'home/request_pair_request',
  }
}

export function requestShowPairs() {
  return {
    type: 'home/request_show_pair_request',
  }
}
