import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
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
    height: common.h32,
    width: '100%',
    bottom: 0,
    backgroundColor: common.borderColor05,
  },
  noticeTitle: {
    marginTop: common.margin10,
    marginLeft: common.margin10,
    marginRight: common.margin10,
    height: common.h32,
    color: common.placeholderColor,
    fontSize: common.font12,
  },
})

export default class HomeSwiper extends Component {
  componentDidMount() { }

  render() {
    const images = []
    const titles = []
    const { banners, announcement, imgHashApi } = this.props
    for (let i = 0; i < banners.length; i++) {
      const element = banners[i]
      images.push(
        <Image
          key={element.id}
          style={{
            width: common.sw,
            height: common.h234,
          }}
          resizeMode="stretch"
          resizeMethod="scale"
          source={{ uri: `${imgHashApi}${element.imghash}` }}
        />,
      )
    }
    for (let i = 0; i < announcement.length; i++) {
      const element = announcement[i]
      titles.push(
        <Text
          key={element.id}
          style={styles.noticeTitle}
        >{`公告: ${element.title}`}</Text>,
      )
    }

    return (
      <View style={styles.swiper}>
        {
          images.length ?
            <Swiper
              style={styles.swiper}
              showsButtons={false}
              dotStyle={styles.dot}
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
                showsButtons={false}
                autoplay
                scrollEnabled={false}
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
