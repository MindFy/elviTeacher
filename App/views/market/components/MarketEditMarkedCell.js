import React, { Component } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

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
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 25,
  },
  icon: {
    width: 12,
    height: 12,
  },
  nameContainer: {
    width: common.getH(66),
    flexDirection: 'row',
    alignSelf: 'center',
  },
  tokenName: {
    fontSize: common.getH(12),
    color: common.textColor,
  },
  tokenSubname: {
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

class MarkeEdittDetailCell extends Component {
  handlePressMarked = () => {
    if (this.props.onPressMarked) {
      this.props.onPressMarked()
    }
  }

  render() {
    const {
      goodsName,
      currencyName,
      volume,
      lastPrice,
      lastPriceTextStyle,
      dailyChange,
      dailyChangeTextStyle,
      isFavorited,
    } = this.props

    const icon = isFavorited
      ? require('../../../assets/icon_star_selected.png')
      : require('../../../assets/icon_star.png')

    return (
      <View
        style={styles.container}
        onPress={this.handlePressCell}
        activeOpacity={common.activeOpacity}
      >
        <View style={styles.contentContainer}>
          <NextTouchableOpacity
            style={styles.iconContainer}
            onPress={this.handlePressMarked}
            delay={200}
          >
            <Image style={styles.icon} source={icon} />
          </NextTouchableOpacity>
          <View style={styles.nameContainer}>
            <Text style={styles.tokenName}>{goodsName}</Text>
            <Text style={styles.tokenSubname}>{`/${currencyName}`}</Text>
          </View>
          <Text style={styles.volume}>{volume}</Text>
          <Text style={[styles.lastPrice, lastPriceTextStyle]}>{lastPrice}</Text>
          <Text style={[styles.dailyChange, dailyChangeTextStyle]}>{dailyChange}</Text>
        </View>
        <View style={styles.line} />
      </View>
    )
  }
}

export default MarkeEdittDetailCell
