import React, { PureComponent } from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet,
} from 'react-native'
import { BigNumber } from 'bignumber.js'
import { common } from '../../constants/common'

const styles = StyleSheet.create({
  container: {
    marginTop: common.margin15,
    marginLeft: common.margin10,
    marginRight: common.margin10,
    flexDirection: 'row',
  },
  cprice: {
    fontSize: common.font16,
    alignSelf: 'flex-end',
  },
  dirImage: {
    marginLeft: common.margin5,
    marginBottom: 2,
    height: common.h13,
    width: common.w10,
    alignSelf: 'flex-end',
  },
  rmb: {
    marginLeft: common.margin5,
    fontSize: common.font12,
    color: common.textColor,
    alignSelf: 'flex-end',
  },
  quantityTitle: {
    fontSize: common.font10,
    color: common.placeholderColor,
    alignSelf: 'flex-end',
    textAlign: 'right',
  },
  quantity: {
    marginLeft: common.margin5,
    fontSize: common.font10,
    color: common.textColor,
    alignSelf: 'flex-end',
    textAlign: 'right',
  },
})

export default class DealMarket extends PureComponent {
  render() {
    const {
      rose,
      cprice,
      quantity,
      rmb,
    } = this.props
    let cpriceColor
    let dirImageSource
    let newRose = new BigNumber(rose)
    if (newRose.gt(0)) {
      cpriceColor = common.redColor
      dirImageSource = require('../../assets/箭头.png')
    } else if (newRose.lt(0)) {
      cpriceColor = common.greenColor
      dirImageSource = require('../../assets/箭头copy.png')
    } else {
      cpriceColor = common.textColor
    }
    newRose = newRose.multipliedBy(100).toFixed(2, 1)
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Text style={[styles.cprice, { color: cpriceColor }]}>
            {`${cprice}`}
          </Text>
          {dirImageSource
            ? <Image
              style={styles.dirImage}
              source={dirImageSource}
            />
            : null}
          <Text style={styles.rmb}>
            {`¥ ${rmb}`}
          </Text>
          <Text
            style={[styles.rmb, { color: cpriceColor }]}
          >{`${rose}%`}</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.quantityTitle}>
            24小时成交量
          </Text>
          <Text style={styles.quantity}>
            {quantity}
          </Text>
        </View>
      </View>
    )
  }
}
