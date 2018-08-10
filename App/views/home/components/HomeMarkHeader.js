import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import NextTouchableOpacity from '../../../components/NextTouchableOpacity'

const styles = StyleSheet.create({
  contaniner: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTitle: {
    color: '#616989',
    fontSize: 13,
    textAlign: 'center',
  },
  itemIcon: {
    width: 8,
    height: 12,
    margin: 6,
  },
})

class HomeMarkHeader extends PureComponent {
  render() {
    const {
      lastPrice,
      lastPriceIcon,
      onPressLastPrice,
      change,
      changeIcon,
      onPressChange } = this.props

    return (
      <View style={styles.contaniner}>
        <Text style={{ width: '30%' }} />
        <NextTouchableOpacity
          style={[styles.itemContainer, { width: '45%' }]}
          activeOpacity={0.7}
          delay={200}
          onPress={() => { if (onPressLastPrice) { onPressLastPrice() } }}
        >
          <Text style={styles.itemTitle}>{lastPrice}</Text>
          <Image style={styles.itemIcon} source={lastPriceIcon} />
        </NextTouchableOpacity>

        <NextTouchableOpacity
          style={[styles.itemContainer, { width: '25%' }]}
          activeOpacity={0.7}
          delay={200}
          onPress={() => { if (onPressChange) { onPressChange() } }}
        >
          <Text style={styles.itemTitle}>{change}</Text>
          <Image style={styles.itemIcon} source={changeIcon} />
        </NextTouchableOpacity>
      </View>
    )
  }
}

export default HomeMarkHeader
