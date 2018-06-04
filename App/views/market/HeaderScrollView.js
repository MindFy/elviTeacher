import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import { common } from '../../constants/common'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: common.h32,
    backgroundColor: common.navBgColor,
  },
  itemContainer: {
    width: common.sw / 4,
    justifyContent: 'center',
  },
  item: {
    fontSize: common.font14,
  },
})

class HeaderScrollView extends Component {
  state = {
    indexSelected: 0,
  }

  renderHeaderItem = (item, index, selected, onClickItem) => {
    const textColor =
      selected ? { color: common.btnTextColor } : { color: common.textColor }
    return (
      <View
        style={styles.itemContainer}
        key={index}
      >
        <NextTouchableOpacity
          activeOpacity={common.activeOpacity}
          disabled={selected}
          onPress={() => {
            this.setState({
              indexSelected: index,
            })
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
          this.renderHeaderItem(item, index, index === this.state.indexSelected, onClickItem)
        ))}
      </View>
    )
  }
}

export default HeaderScrollView
