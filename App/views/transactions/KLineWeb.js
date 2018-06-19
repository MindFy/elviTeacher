import React, { Component } from 'react'
import { WebView } from 'react-native'
import { common } from '../../constants/common'
import * as api from '../../services/api'

export default class KLine extends Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.goodsName === this.props.goodsName &&
      nextProps.currencyName === this.props.currencyName
    ) {
      return false
    }
    return true
  }

  render() {
    const { goodsName, currencyName } = this.props
    return (
      <WebView
        style={{
          width: common.sw,
          height: common.sw * common.sw / common.sh,
          backgroundColor: 'transparent',
        }}
        source={{ uri: `${api.API_ROOT}/mobile_black.html#${goodsName}/${currencyName}` }}
      />
    )
  }
}
