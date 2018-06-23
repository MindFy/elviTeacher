import React, { Component } from 'react'
import {
  Image,
  WebView,
} from 'react-native'
import { connect } from 'react-redux'
import {
  common,
} from '../../constants/common'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import transfer from '../../localization/utils'

class Banner extends Component {
  static navigationOptions(props) {
    let title = ''
    if (props.navigation.state.params) {
      title = props.navigation.state.params.title
    }
    return {
      headerTitle: title,
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

  componentWillMount() {
    const { navigation, language } = this.props
    navigation.setParams({
      title: transfer(language, 'home_activeCenter'),
    })
  }

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

function mapStateToProps(state) {
  return {
    language: state.system.language,
  }
}

export default connect(mapStateToProps)(Banner)
