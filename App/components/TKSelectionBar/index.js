import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'
import { common } from '../../constants/common'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'

const styles = StyleSheet.create({
  container: {
    marginTop: common.margin10,
    height: common.h36,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: common.margin10,
  },
})

class TKSelectionBar extends Component {
  constructor(props) {
    super(props)


    this.state = {
      selectedIdx: props.initialIndexSelected || 0,
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
    const { barItemStyle } = this.props
    return (
      <NextTouchableOpacity
        key={index}
        style={[{
          width,
          marginRight: 1,
          backgroundColor: selected ? common.borderColor : common.navBgColor,
          justifyContent: 'center',
        }, barItemStyle]}
        activeOpacity={common.activeOpacity}
        onPress={() => this.itemOnPress(index)}
      >
        <Text
          style={{
            fontSize: common.font14,
            color: selected ? common.btnTextColor : common.textColor,
            alignSelf: 'center',
          }}
        >{title}</Text>
      </NextTouchableOpacity>
    )
  }

  render() {
    const { titles } = this.props
    const width = (common.sw - 2 * common.margin15) / titles.length

    return (
      <View style={styles.container}>
        {titles.map((title, index) => (
          this.item(index, title, width, this.state.selectedIdx === index)
        ))}
      </View>
    )
  }
}

export default TKSelectionBar
