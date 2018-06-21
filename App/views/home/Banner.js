import React, { Component } from 'react'
import {
  Image,
  WebView,
} from 'react-native'
import {
  common,
} from '../../constants/common'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'

export default class Banner extends Component {
  static navigationOptions(props) {
    return {
      headerTitle: '活动',
      headerLeft:
        (
          <NextTouchableOpacity
            style={{
              height: common.w40,
              width: common.w40,
              justifyContent: 'center',
            }}
            activeOpacity={common.activeOpacity}
            onPress={() => props.navigation.goBack()}
          >
            <Image
              style={{
                marginLeft: common.margin10,
                width: common.w10,
                height: common.h20,
              }}
              source={require('../../assets/arrow_left_left.png')}
            />
          </NextTouchableOpacity>
        ),
    }
  }
  componentDidMount() { }

  render() {
    const { navigation } = this.props
    let uri = navigation.state.params.element.hyperlink
    if (uri.indexOf('/fileProc/') > -1) {
      uri = `${uri}.wt${common.sw}.jpg`
    }
    return (
      <WebView
        source={{ uri }}
      />
    )
  }
}
