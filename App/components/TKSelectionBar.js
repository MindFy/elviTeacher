import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import {
  common,
} from '../constants/common'

const left = 'left'
const right = 'right'

const styles = StyleSheet.create({
  style: {
    marginTop: common.margin10,
    marginLeft: common.margin15,
    marginRight: common.margin15,
    height: common.h36,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  leftViewStyle: {
    flex: 1,
    width: (common.sw - common.margin10 * 2) / 2,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  leftTitleStyle: {
    fontSize: common.font14,
    alignSelf: 'center',
  },
})

export default class TKSelectionBar extends Component {
  constructor() {
    super()

    this.state = {
      leftOrRight: left,
    }
  }

  onPress(leftOrRight) {
    const { leftBlock, rightBlock } = this.props
    this.setState({
      leftOrRight,
    })
    if (leftOrRight === left) {
      leftBlock()
    } else if (leftOrRight === right) {
      rightBlock()
    }
  }

  render() {
    const { leftTitle, rightTitle } = this.props
    const { leftOrRight } = this.state
    return (
      <View style={styles.style} >
        <TouchableOpacity
          activeOpacity={common.activeOpacity}
          onPress={() => this.onPress(left)}
        >
          <View style={[styles.leftViewStyle, {
            backgroundColor: leftOrRight === left ? common.borderColor : common.navBgColor,
          }]}
          >
            <Text style={[styles.leftTitleStyle, {
              color: leftOrRight === left ? common.btnTextColor : common.textColor,
            }]}
            >{leftTitle}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={common.activeOpacity}
          onPress={() => this.onPress(right)}
        >
          <View style={[styles.leftViewStyle, {
            backgroundColor: leftOrRight === right ? common.borderColor : common.navBgColor,
          }]}
          >
            <Text style={[styles.leftTitleStyle, {
              color: leftOrRight === right ? common.btnTextColor : common.textColor,
            }]}
            >{rightTitle}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}
