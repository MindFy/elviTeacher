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
    justifyContent: 'center',
  },
  noticeTitle: {
    marginLeft: common.margin10,
    color: common.placeholderColor,
    fontSize: common.font12,
  },
})

export default class HomeSwiper extends Component {
  componentDidMount() { }

  render() {
    const images = []
    const { announcement, imgHashApi } = this.props
    for (let i = 0; i < announcement.length; i++) {
      const element = announcement[i]
      images.push(
        <View
          key={element.id}
        >
          <Image
            style={{
              width: common.sw,
              height: common.h234,
            }}
            resizeMode="stretch"
            resizeMethod="scale"
            source={{ uri: `${imgHashApi}${element.imghash}` }}
          />
          <View
            style={styles.noticeView}
          >
            <Text
              style={styles.noticeTitle}
            >{`公告: ${element.title}`}</Text>
          </View>
        </View>,
      )
    }

    return (
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
        </Swiper> : <View style={styles.swiper} />
    )
  }
}
