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
  constructor() {
    super()
    this.state = {
      currentIndex: 0,
    }
  }

  render() {
    const images = []
    const { announcement, imgHashApi } = this.props
    const { currentIndex } = this.state
    for (let i = 0; i < announcement.length; i++) {
      const element = announcement[i]
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

    return (
      <View
        style={styles.swiper}
      >
        {
          images.length ?
            <Swiper
              style={styles.swiper}
              showsButtons={false}
              paginationStyle
              dotStyle={styles.dot}
              activeDotStyle={styles.dot}
              dotColor={common.borderColor}
              activeDotColor={common.placeholderColor}
              onIndexChanged={(index) => {
                this.setState({
                  currentIndex: index,
                })
              }}
            >
              {images}
            </Swiper> : null
        }
        <View
          style={styles.noticeView}
        >
          <Text
            style={styles.noticeTitle}
          >{`公告: ${announcement.length ? announcement[currentIndex].title : ''}`}</Text>
        </View>
      </View>
    )
  }
}
