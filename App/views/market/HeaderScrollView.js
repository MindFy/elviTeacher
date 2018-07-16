import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import { common } from '../../constants/common'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // justifyContent: 'center',
    height: common.h32,
    backgroundColor: common.navBgColor,
  },
  itemContainer: {
    width: common.sw / 6,
    justifyContent: 'center',
  },
  item: {
    fontSize: common.font14,
    textAlign: 'center',
  },
})

class HeaderScrollView extends Component {
  renderHeaderItem = (item, index, selected, onClickItem) => {
    const textColor =
      selected ? { color: common.btnTextColor } : { color: common.textColor }

    let itemWith = {}
    if (item.length > 6) {
      itemWith = { width: common.sw / 5 }
    }
    return (
      <View
        style={[styles.itemContainer, itemWith]}
        key={index}
      >
        <NextTouchableOpacity
          activeOpacity={common.activeOpacity}
          disabled={selected}
          onPress={() => {
            if (onClickItem) {
              onClickItem({
                title: item,
                index,
              })
            }
          }}
        >
          <Text style={[styles.item, textColor]}>
            {item}
          </Text>
        </NextTouchableOpacity>
      </View>
    )
  }

  render() {
    const { titles, onClickItem } = this.props
    return (
      <View style={styles.container}>
        {titles.map((item, index) => (
          this.renderHeaderItem(item, index, index === this.props.indexSelected, onClickItem)
        ))}
      </View>
    )
  }
}

export default HeaderScrollView
