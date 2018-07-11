import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native'
import { common } from '../../constants/common'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'

const styles = StyleSheet.create({
  container: {
    height: common.navHeight,
    backgroundColor: common.navBgColor,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  leftBtn: {
    position: 'absolute',
    top: common.navHeight - common.h44,
    left: 0,
    height: common.h44,
    width: common.h44,
    justifyContent: 'center',
  },
  leftImage: {
    marginLeft: common.margin10,
    width: common.w10,
    height: common.h20,
  },
  titleViewContainer: {
    marginTop: common.navHeight - common.h44,
    height: common.h44,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  titleView: {
    // marginTop: common.navHeight - common.h44,
    // height: common.h44,
    // alignSelf: 'center',
    flexDirection: 'row',
  },
  title: {
    fontSize: common.font16,
    alignSelf: 'center',
    color: 'white',
  },
  titleImage: {
    marginLeft: common.margin5,
    height: common.h5,
    width: common.w10,
    alignSelf: 'center',
  },
  rightBtn: {
    position: 'absolute',
    top: common.navHeight - common.h44,
    right: common.margin10,
    height: common.h44,
    justifyContent: 'center',
  },
  isSelectedIconContainer: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  isSelectedIcon: {
    width: 12,
    height: 12,
  },
})

export default class DealNavigator extends Component {
  types = {
    leftBtn: 'leftBtn',
    title: 'title',
    rightBtn: 'rightBtn',
  }

  handlePressSelected = () => {
    if (this.props.onPressSelected) {
      this.props.onPressSelected()
    }
  }

  renderTitleView = () => {
    const { titles, onPress, isFavorited } = this.props

    const title = titles[0] || ''
    const isSelectedIcon = isFavorited
      ? require('../../assets/icon_star_selected.png')
      : require('../../assets/icon_star.png')

    return (
      <View style={styles.titleViewContainer}>
        <NextTouchableOpacity
          style={styles.isSelectedIconContainer}
          onPress={this.handlePressSelected}
        >
          <Image source={isSelectedIcon} style={styles.isSelectedIcon} />
        </NextTouchableOpacity>
        <NextTouchableOpacity
          style={styles.titleView}
          activeOpacity={common.activeOpacity}
          onPress={() => onPress(this.types.title)}
        >
          <Text style={styles.title}>
            {title}
          </Text>
          <Image
            style={styles.titleImage}
            source={require('../../assets/arrow_down_yellow.png')}
          />
        </NextTouchableOpacity>
      </View>
    )
  }

  render() {
    const { titles, onPress } = this.props

    const rightBtnTitle = titles[1] || ''

    return (
      <View
        style={styles.container}
      >
        <NextTouchableOpacity
          style={styles.leftBtn}
          activeOpacity={common.activeOpacity}
          onPress={() => onPress(this.types.leftBtn)}
        >
          <Image
            style={styles.leftImage}
            source={require('../../assets/arrow_left_left.png')}
          />
        </NextTouchableOpacity>

        {this.renderTitleView()}

        <NextTouchableOpacity
          style={styles.rightBtn}
          activeOpacity={common.activeOpacity}
          onPress={() => onPress(this.types.rightBtn)}
        >
          <Text style={styles.title}>
            {rightBtnTitle}
          </Text>
        </NextTouchableOpacity>
      </View>
    )
  }
}
