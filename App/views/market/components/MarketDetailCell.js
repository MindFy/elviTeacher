import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { common } from '../../../constants/common'
import NextTouchableOpacity from '../../../components/NextTouchableOpacity'

const styles = StyleSheet.create({
  container: {
    marginHorizontal: common.getH(10),
  },
  contentContainer: {
    flexDirection: 'row',
    height: common.getH(40),
  },
  nameContainer: {
    width: common.getH(66),
    flexDirection: 'row',
    alignSelf: 'center',
  },
  name1: {
    fontSize: common.getH(12),
    color: common.textColor,
  },
  name2: {
    fontSize: common.getH(8),
    color: common.textColor,
    paddingBottom: common.getH(2),
    alignSelf: 'flex-end',
  },
  volume: {
    flex: 1,
    fontSize: common.getH(12),
    color: common.textColor,
    textAlign: 'right',
    alignSelf: 'center',
  },
  lastPrice: {
    flex: 1,
    fontSize: common.getH(12),
    color: common.textColor,
    textAlign: 'right',
    alignSelf: 'center',
  },
  dailyChange: {
    flex: 1,
    fontSize: common.getH(12),
    color: common.textColor,
    textAlign: 'right',
    alignSelf: 'center',
  },
  line: {
    height: 0.5,
    backgroundColor: common.placeholderColor,
  },
})

class MarketDetailCell extends Component {
  handlePressCell = () => {
    if (this.props.onPressCell) {
      this.props.onPressCell()
    }
  }

  render() {
    const {
      name,
      subName,
      volume,
      lastPrice,
      lastPriceTextStyle,
      dailyChange,
      dailyChangeTextStyle,
    } = this.props

    return (
      <NextTouchableOpacity
        style={styles.container}
        onPress={this.handlePressCell}
        activeOpacity={common.activeOpacity}
        delay={200}
      >
        <View style={styles.contentContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.name1}>{name}</Text>
            <Text style={styles.name2}>{subName}</Text>
          </View>
          <Text style={styles.volume}>{volume}</Text>
          <Text style={[styles.lastPrice, lastPriceTextStyle]}>{lastPrice}</Text>
          <Text style={[styles.dailyChange, dailyChangeTextStyle]}>{dailyChange}</Text>
        </View>
        <View style={styles.line} />
      </NextTouchableOpacity>
    )
  }
}

export default MarketDetailCell
