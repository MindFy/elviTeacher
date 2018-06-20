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
    top: common.margin20,
    left: 0,
    height: common.w40,
    width: common.w40,
    justifyContent: 'center',
  },
  leftImage: {
    marginLeft: common.margin10,
    width: common.w10,
    height: common.h20,
  },
  titleView: {
    marginTop: common.margin20,
    height: common.h44,
    alignSelf: 'center',
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
    top: common.margin20,
    right: common.margin10,
    height: common.h44,
    justifyContent: 'center',
  },
})

export default class DealNavigator extends Component {
  types = {
    leftBtn: 'leftBtn',
    title: 'title',
    rightBtn: 'rightBtn',
  }

  render() {
    const { titles, onPress } = this.props

    const title = titles[0] || ''
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
