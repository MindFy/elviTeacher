import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { common } from '../../constants/common'

const styles = StyleSheet.create({
  container: {
    marginTop: common.margin10,
    height: common.h36,
    flexDirection: 'row',
    justifyContent: 'center',
  },
})

class TKSelectionBar extends Component {
  constructor() {
    super()

    this.state = {
      selectedIdx: 0,
    }
  }

  itemOnPress(selectedIdx) {
    const { onPress, titles } = this.props
    onPress({
      index: selectedIdx,
      title: titles[selectedIdx],
    })
    this.setState({
      selectedIdx,
    })
  }

  item(index, title, width, selected) {
    return (
      <TouchableOpacity
        key={index}
        activeOpacity={common.activeOpacity}
        onPress={() => this.itemOnPress(index)}
      >
        <View
          style={{
            flex: 1,
            width,
            backgroundColor: selected ? common.borderColor : common.navBgColor,
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              fontSize: common.font14,
              color: selected ? common.btnTextColor : common.textColor,
              alignSelf: 'center',
            }}
          >{title}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const { titles } = this.props
    const width = (common.sw - common.margin5 * titles.length) / titles.length

    return (
      <View
        style={styles.container}
      >
        {titles.map((title, index) => this.item(index, title, width, this.state.selectedIdx === index))}
      </View>
    )
  }
}

export default TKSelectionBar
