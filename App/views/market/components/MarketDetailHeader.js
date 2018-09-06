import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import NextTouchableOpacity from '../../../components/NextTouchableOpacity'

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
    textAlign: 'left',
  },
  headerPrice: {
    textAlign: 'right',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemTitle: {
    color: '#616989',
    fontSize: 12,
  },
  itemIcon: {
    width: 8,
    height: 12,
    margin: 6,
  },
})

class MarketDetailHeader extends PureComponent {
  renderItem = (style, textStyle, title, icon, onPress) => {
    const { disabled } = this.props
    return (
      <NextTouchableOpacity
        style={[styles.itemContainer, style]}
        activeOpacity={0.7}
        delay={200}
        disabled={disabled}
        onPress={() => { if (onPress) { onPress() } }}
      >
        <Text style={[styles.itemTitle, textStyle]}>{title}</Text>
        <Image style={styles.itemIcon} source={icon} />
      </NextTouchableOpacity>
    )
  }

  render() {
    const {
      name,
      nameIcon,
      onPressName,

      volume,
      volumeIcon,
      onPressVolume,

      lastPrice,
      lastPriceIcon,
      onPressLastPrice,

      dailyChange,
      dailyChangeIcon,
      onPressDailyChange,
    } = this.props
    return (
      <View style={styles.header}>
        <View style={styles.headerTextView}>
          {this.renderItem({ width: 80 }, styles.headerName, name, nameIcon, onPressName)}
          {this.renderItem({ flex: 1, justifyContent: 'flex-end' }, styles.headerPrice, volume, volumeIcon, onPressVolume)}
          {this.renderItem({ flex: 1, justifyContent: 'flex-end' }, styles.headerPrice, lastPrice, lastPriceIcon, onPressLastPrice)}
          {this.renderItem({ flex: 1, justifyContent: 'flex-end' }, styles.headerPrice, dailyChange, dailyChangeIcon, onPressDailyChange)}
        </View>
        <View style={styles.underLine} />
      </View>
    )
  }
}

export default MarketDetailHeader

