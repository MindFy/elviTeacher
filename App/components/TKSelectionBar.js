import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import {
  common,
} from '../constants/common'
import actions from '../actions/index'

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

class TKSelectionBar extends Component {
  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(actions.selectionBarUpdate(common.selectionBar.left))
  }

  onPress(type) {
    const { dispatch, leftBlock, rightBlock } = this.props
    dispatch(actions.selectionBarUpdate(type))
    if (type === common.selectionBar.left) {
      leftBlock()
    } else if (type === common.selectionBar.right) {
      rightBlock()
    }
  }

  render() {
    const { selectionBarSelected, leftTitle, rightTitle } = this.props
    return (
      <View style={styles.style} >
        <TouchableOpacity
          activeOpacity={common.activeOpacity}
          onPress={() => this.onPress(common.selectionBar.left)}
        >
          <View style={[styles.leftViewStyle, {
            backgroundColor: selectionBarSelected === common.selectionBar.left
              ? common.borderColor : common.navBgColor,
          }]}
          >
            <Text style={[styles.leftTitleStyle, {
              color: selectionBarSelected === common.selectionBar.left
                ? common.btnTextColor : common.textColor,
            }]}
            >{leftTitle}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={common.activeOpacity}
          onPress={() => this.onPress(common.selectionBar.right)}
        >
          <View style={[styles.leftViewStyle, {
            backgroundColor: selectionBarSelected === common.selectionBar.right
              ? common.borderColor : common.navBgColor,
          }]}
          >
            <Text style={[styles.leftTitleStyle, {
              color: selectionBarSelected === common.selectionBar.right
                ? common.btnTextColor : common.textColor,
            }]}
            >{rightTitle}</Text>
          </View>
        </TouchableOpacity>
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
