import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import { common } from '../constants/common'

class TKSelectionBar extends Component {
  constructor() {
    super()

    this.state = {
      selectedIdx: 0,
    }
  }

  onPress(selectedIdx) {
    const {
      leftBlock,
      rightBlock,
      thirdBlock,
    } = this.props

    this.setState({
      selectedIdx,
    })

    if (selectedIdx === 0) {
      leftBlock()
    } else if (selectedIdx === 1) {
      rightBlock()
    } else if (selectedIdx === 2) {
      thirdBlock()
    }
  }

  render() {
    const {
      leftTitle,
      rightTitle,
      thirdTitle,
      rightViewStyle,
    } = this.props

    const width = thirdTitle ? ((common.sw - common.margin15 * 2) / 3)
      : ((common.sw - common.margin10 * 2) / 2)

    return (
      <View
        style={{
          marginTop: common.margin10,
          height: common.h36,
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity
          activeOpacity={common.activeOpacity}
          onPress={() => this.onPress(0)}
        >
          <View
            style={{
              flex: 1,
              width,
              backgroundColor: this.state.selectedIdx === 0
                ? common.borderColor : common.navBgColor,
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontSize: common.font14,
                color: this.state.selectedIdx === 0
                  ? common.btnTextColor : common.textColor,
                alignSelf: 'center',
              }}
            >{leftTitle}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={common.activeOpacity}
          onPress={() => this.onPress(1)}
        >
          <View
            style={[{
              flex: 1,
              width,
              backgroundColor: this.state.selectedIdx === 1
                ? common.borderColor : common.navBgColor,
              justifyContent: 'center',
            }, rightViewStyle]}
          >
            <Text
              style={{
                fontSize: common.font14,
                color: this.state.selectedIdx === 1
                  ? common.btnTextColor : common.textColor,
                alignSelf: 'center',
              }}
            >{rightTitle}</Text>
          </View>
        </TouchableOpacity>
        {
          thirdTitle
            ? <TouchableOpacity
              activeOpacity={common.activeOpacity}
              onPress={() => this.onPress(2)}
            >
              <View
                style={[{
                  flex: 1,
                  width,
                  backgroundColor: this.state.selectedIdx === 2
                    ? common.borderColor : common.navBgColor,
                  justifyContent: 'center',
                }, rightViewStyle]}
              >
                <Text
                  style={{
                    fontSize: common.font14,
                    color: this.state.selectedIdx === 2
                      ? common.btnTextColor : common.textColor,
                    alignSelf: 'center',
                  }}
                >{thirdTitle}</Text>
              </View>
            </TouchableOpacity> : null
        }
      </View>
    )
  }
}

export default TKSelectionBar
