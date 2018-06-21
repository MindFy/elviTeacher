import React, { Component } from 'react'
import {
  Text,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import {
  common,
} from '../../constants/common'
import { imgHashApi } from '../../services/api'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'

const styles = StyleSheet.create({
  headerLeft: {
    height: common.getH(40),
    width: common.getH(40),
    justifyContent: 'center',
  },
  headerLeftImage: {
    marginLeft: common.getH(10),
    width: common.getH(10),
    height: common.getH(20),
  },
  container: {
    flex: 1,
    backgroundColor: common.bgColor,
  },
  title: {
    marginTop: common.getH(20),
    color: common.textColor,
    fontSize: common.font14,
    textAlign: 'center',
    width: '100%',
  },
  createdAt: {
    marginTop: common.getH(10),
    color: common.textColor,
    fontSize: common.font14,
    textAlign: 'center',
    width: '100%',
  },
  picture: {
    marginTop: common.getH(30),
    marginLeft: common.getH(20),
    marginRight: common.getH(20),
  },
  content: {
    marginTop: common.getH(20),
    marginLeft: common.getH(20),
    marginRight: common.getH(20),
    color: common.textColor,
    fontSize: common.font14,
    textAlign: 'left',
  },
})

export default class Announcement extends Component {
  static navigationOptions(props) {
    return {
      headerTitle: '公告中心',
      headerLeft: (
        <NextTouchableOpacity
          style={styles.headerLeft}
          activeOpacity={common.activeOpacity}
          onPress={() => props.navigation.goBack()}
        >
          <Image
            style={styles.headerLeftImage}
            source={require('../../assets/arrow_left_left.png')}
          />
        </NextTouchableOpacity>
      ),
    }
  }
  constructor() {
    super()
    this.state = {
      pictureHeight: 0,
    }
  }

  componentDidMount() {
    const { navigation } = this.props
    const imghash = navigation.state.params.element.imghash
    if (imghash && imghash.length) {
      const uri = `${imgHashApi}${imghash}`
      Image.getSize(uri, (w, h) => {
        this.setState({ pictureHeight: (common.sw - common.getH(40)) / w * h })
      })
    }
  }

  render() {
    const { navigation } = this.props

    const createdAt = common.dfFullDate(navigation.state.params.element.createdAt)
    const title = navigation.state.params.element.title
    const content = `        ${navigation.state.params.element.content}`
    const imghash = navigation.state.params.element.imghash
    const { pictureHeight } = this.state
    let picture = null
    if (imghash && imghash.length) {
      const uri = `${imgHashApi}${imghash}`
      picture = (<FastImage
        style={[styles.picture, {
          height: pictureHeight,
        }]}
        resizeMode={'contain'}
        source={{ uri }}
      />)
    }
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.createdAt}>{createdAt}</Text>
        {picture}
        <Text style={styles.content}>{content}</Text>
      </ScrollView>
    )
  }
}
