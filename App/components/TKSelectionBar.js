import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import {
  common,
} from '../constants/common'
import actions from '../actions/index'

class TKSelectionBar extends Component {
  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(actions.selectionBarUpdate(common.selectionBar.left))
  }

  onPress(type) {
    const { dispatch, leftBlock, rightBlock, thirdBlock } = this.props
    dispatch(actions.selectionBarUpdate(type))
    if (type === common.selectionBar.left) {
      leftBlock()
    } else if (type === common.selectionBar.right) {
      rightBlock()
    } else if (type === common.selectionBar.third) {
      thirdBlock()
    }
  }

  render() {
    const { selectionBarSelected, leftTitle, rightTitle, thirdTitle, rightViewStyle } = this.props
    const width = thirdTitle ? ((common.sw - common.margin15 * 2) / 3)
      : ((common.sw - common.margin10 * 2) / 2)
    return (
      <View
        style={{
          marginTop: common.margin10,
          marginLeft: common.margin15,
          marginRight: common.margin15,
          height: common.h36,
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity
          activeOpacity={common.activeOpacity}
          onPress={() => this.onPress(common.selectionBar.left)}
        >
          <View
            style={{
              flex: 1,
              width,
              backgroundColor: selectionBarSelected === common.selectionBar.left
                ? common.borderColor : common.navBgColor,
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontSize: common.font14,
                color: selectionBarSelected === common.selectionBar.left
                  ? common.btnTextColor : common.textColor,
                alignSelf: 'center',
              }}
            >{leftTitle}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={common.activeOpacity}
          onPress={() => this.onPress(common.selectionBar.right)}
        >
          <View
            style={[{
              flex: 1,
              width,
              backgroundColor: selectionBarSelected === common.selectionBar.right
                ? common.borderColor : common.navBgColor,
              justifyContent: 'center',
            }, rightViewStyle]}
          >
            <Text
              style={{
                fontSize: common.font14,
                color: selectionBarSelected === common.selectionBar.right
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
              onPress={() => this.onPress(common.selectionBar.third)}
            >
              <View
                style={[{
                  flex: 1,
                  width,
                  backgroundColor: selectionBarSelected === common.selectionBar.third
                    ? common.borderColor : common.navBgColor,
                  justifyContent: 'center',
                }, rightViewStyle]}
              >
                <Text
                  style={{
                    fontSize: common.font14,
                    color: selectionBarSelected === common.selectionBar.third
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

function mapStateToProps(store) {
  return {
    selectionBarSelected: store.ui.selectionBarSelected,
  }
}

export default connect(
  mapStateToProps,
)(TKSelectionBar)
