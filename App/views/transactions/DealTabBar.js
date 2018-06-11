import React, { PureComponent } from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'
import { common } from '../../constants/common'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'

const styles = StyleSheet.create({
  container: {
    height: common.h56,
    paddingLeft: common.margin15,
    paddingRight: common.margin15,
    backgroundColor: common.navBgColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  barItem: {
    height: common.h35,
    width: (common.sw - common.margin15 * 2 - common.margin15) / 2,
    borderRadius: 2,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  barItemTitle: {
    fontSize: common.font16,
    alignSelf: 'center',
    color: 'white',
  },
})

export default class DealTabBar extends PureComponent {
  render() {
    const { titles, onPress } = this.props

    const item = (title, index) => {
      let backgroundColor = common.textColor
      if (title === '买入') {
        backgroundColor = common.redColor
      } else if (title === '卖出') {
        backgroundColor = common.greenColor
      }
      return (
        <NextTouchableOpacity
          key={index}
          style={[styles.barItem, { backgroundColor }]}
          activeOpacity={common.activeOpacity}
          onPress={() => onPress(index)}
        >
          <Text style={styles.barItemTitle}>
            {title}
          </Text>
        </NextTouchableOpacity>
      )
    }

    return (
      <View style={styles.container}>
        {titles.map((value, index) => item(value, index))}
      </View>
    )
  }
}
