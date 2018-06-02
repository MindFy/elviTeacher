import React, { PureComponent } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { common } from '../../constants/common'

const styles = StyleSheet.create({
  container: {
    height: common.h56,
    paddingLeft: common.margin10,
    paddingRight: common.margin10,
    backgroundColor: common.navBgColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  barItem: {
    height: common.h35,
    width: (common.sw - common.margin10 * 2 - common.margin15) / 2,
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
        <TouchableOpacity
          key={index}
          style={[styles.barItem, { backgroundColor }]}
          activeOpacity={common.activeOpacity}
          onPress={() => onPress(index)}
        >
          <Text style={styles.barItemTitle}>
            {title}
          </Text>
        </TouchableOpacity>
      )
    }

    return (
      <View style={styles.container}>
        {titles.map((value, index) => item(value, index))}
      </View>
    )
  }
}
