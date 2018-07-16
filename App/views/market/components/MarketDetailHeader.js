import React, { PureComponent } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { common } from '../../../constants/common'

const styles = StyleSheet.create({
  header: {
    height: common.getH(48),
    marginHorizontal: common.getH(10),
  },
  headerTextView: {
    flexDirection: 'row',
    marginTop: common.getH(20),
    marginBottom: common.getH(10),
  },
  underLine: {
    height: 0.5,
    backgroundColor: common.placeholderColor,
  },
  headerName: {
    width: common.getH(66),
    fontSize: common.getH(12),
    color: common.placeholderColor,
    textAlign: 'left',
  },
  headerPrice: {
    flex: 1,
    fontSize: common.getH(12),
    color: common.placeholderColor,
    textAlign: 'right',
  },
})

class MarketDetailHeader extends PureComponent {
  render() {
    const {
      name,
      volume,
      lastPrice,
      dailyChange,
    } = this.props
    return (
      <View style={styles.header}>
        <View style={styles.headerTextView}>
          <Text style={styles.headerName}>{name}</Text>
          <Text style={styles.headerPrice}>{volume}</Text>
          <Text style={styles.headerPrice}>{lastPrice}</Text>
          <Text style={styles.headerPrice}>{dailyChange}</Text>
        </View>
        <View style={styles.underLine} />
      </View>
    )
  }
}

export default MarketDetailHeader

