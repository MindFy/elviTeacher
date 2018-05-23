import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import Swiper from 'react-native-swiper'
import { common } from '../../constants/common'

const styles = StyleSheet.create({
  swiper: {
    height: common.h234,
  },
  dot: {
    marginBottom: common.margin15,
  },
  noticeView: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    height: common.h32,
    backgroundColor: common.borderColor05,
  },
  noticeTitle: {
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
    this.bannerIndex = 0
    this.titleIndex = 0
  }

  render() {
    const images = []
    const titles = []
    const { banners, announcement, imgHashApi, bannerBlock, announcementBlock } = this.props
    for (let i = 0; i < banners.length; i++) {
      const element = banners[i]
      images.push(
        <TouchableOpacity
          key={element.id}
          activeOpacity={1}
          onPress={() => bannerBlock(element)}
        >
          <Image
            style={{
              width: common.sw,
              height: common.h234,
            }}
            resizeMode="contain" // "cover" | "contain" | "stretch" | "cover" | "center";
            // resizeMethod="resize" // "auto" | "resize" | "scale"
            source={{ uri: `${imgHashApi}${element.imghash}` }}
          />
        </TouchableOpacity>,
      )
    }
    for (let i = 0; i < announcement.length; i++) {
      const element = announcement[i]
      titles.push(
        <TouchableOpacity
          key={element.id}
          activeOpacity={1}
          onPress={() => announcementBlock(element)}
        >
          <Text
            style={styles.noticeTitle}
            numberOfLines={1}
          >{element.title}</Text>
        </TouchableOpacity>,
      )
    }

    return (
      <View style={styles.swiper}>
        {
          images.length ?
            <Swiper
              style={styles.swiper}
              index={this.bannerIndex}
              showsButtons={false}
              autoplay
              dotStyle={styles.dot}
              onIndexChanged={(i) => {
                this.bannerIndex = i
              }}
              activeDotStyle={styles.dot}
              dotColor={common.borderColor}
              activeDotColor={common.placeholderColor}
            >
              {images}
            </Swiper> : null
        }
        {
          titles.length ?
            <View
              style={styles.noticeView}
            >
              <Swiper
                index={this.titleIndex}
                showsButtons={false}
                autoplay
                scrollEnabled={false}
                onIndexChanged={(i) => {
                  this.titleIndex = i
                }}
                dotColor={'transparent'}
                activeDotColor={'transparent'}
              >
                {titles}
              </Swiper>
            </View> : null
        }
      </View>
    )
  }
}
