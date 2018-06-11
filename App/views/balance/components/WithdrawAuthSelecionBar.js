import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'
import { common } from '../../../constants/common'
import NextTouchableOpacity from '../../../components/NextTouchableOpacity'

const styles = StyleSheet.create({
  container: {
    marginTop: common.margin10,
    height: common.h36,
    flexDirection: 'row',
    justifyContent: 'center',
  },
})

class BalanceAuthSelectionBar extends Component {
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
    const borderRightWidth = (index === 0) ? 0.2 : 0
    return (
      <NextTouchableOpacity
        key={index}
        style={[{
          marginRight: 1,
          flex: 1,
          backgroundColor: '#fff',
          justifyContent: 'center',
          borderRightWidth,
          borderBottomWidth: 0.2,
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

  renderTitles = () => {
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

  renderContent = () => {
    const { renderItem } = this.props
    const { selectedIdx } = this.state

    return renderItem(selectedIdx)
  }

  render() {
    return (
      <View>
        {this.renderTitles()}
        {this.renderContent()}
      </View>

    )
  }
}

export default BalanceAuthSelectionBar

