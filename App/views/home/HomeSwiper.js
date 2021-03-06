import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'
import equal from 'deep-equal'
import Swiper from 'react-native-swiper'
import FastImage from 'react-native-fast-image'
import { common } from '../../constants/common'
import { imgHashApi } from '../../services/api'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'

const styles = StyleSheet.create({
  banners: {
    height: common.h234,
  },
  bannersImage: {
    width: common.sw,
    height: common.h234,
  },
  dot: {
    marginBottom: common.margin15,
  },
  announcements: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    height: common.h32,
    backgroundColor: common.borderColor05,
  },
  announcementsTitle: {
    marginTop: common.margin10,
    marginLeft: common.margin10,
    marginRight: common.margin10,
    color: common.placeholderColor,
    fontSize: common.font12,
  },
})

export default class HomeSwiper extends Component {
  constructor() {
    super()
    this.bannersIndex = 0
    this.announcementsIndex = 0
  }

  shouldComponentUpdate(nextProps) {
    if (!equal(nextProps.banners, this.props.banners)) {
      return true
    }
    if (!equal(nextProps.announcements, this.props.announcements)) {
      return true
    }
    return false
  }

  render() {
    const { banners, announcements, onPress } = this.props
    const renderBannersSwiper = () => {
      if (!banners || !banners.length) return null
      const items = banners.map(element => (
        <NextTouchableOpacity
          key={element.id}
          activeOpacity={1}
          onPress={() => onPress({
            type: 'Banner',
            element,
          })}
        >
          <FastImage
            style={styles.bannersImage}
            // resizeMode="stretch"
            source={{ uri: `${imgHashApi}${element.imghash}.t${parseInt(common.sw * 2, 0)}x468.jpg` }}
          />
        </NextTouchableOpacity>
      ))
      return (<Swiper
        index={this.bannersIndex}
        showsButtons={false}
        autoplay
        dotStyle={styles.dot}
        onIndexChanged={(i) => { this.bannersIndex = i }}
        activeDotStyle={styles.dot}
        dotColor={common.borderColor}
        activeDotColor={common.placeholderColor}
      >
        {items}
      </Swiper>)
    }
    const renderAnnouncementsSwiper = () => {
      if (!announcements.length) return null
      const items = announcements.map(element => (
        <NextTouchableOpacity
          key={element.id}
          activeOpacity={1}
          onPress={() => onPress({
            type: 'Announcement',
            element,
          })}
        >
          <Text
            style={styles.announcementsTitle}
            numberOfLines={1}
          >{element.title}</Text>
        </NextTouchableOpacity>
      ))
      return (<View
        style={styles.announcements}
      >
        <Swiper
          index={this.announcementsIndex}
          showsButtons={false}
          autoplay
          scrollEnabled={false}
          onIndexChanged={(i) => { this.announcementsIndex = i }}
          dotColor={'transparent'}
          activeDotColor={'transparent'}
        >
          {items}
        </Swiper>
      </View>)
    }

    return (
      <View style={styles.banners}>
        {renderBannersSwiper()}
        {renderAnnouncementsSwiper()}
      </View>
    )
  }
}
