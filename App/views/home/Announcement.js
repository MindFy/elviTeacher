import React, { Component } from 'react'
import {
  Image,
  StyleSheet,
  WebView,
} from 'react-native'
import { connect } from 'react-redux'
import {
  common,
} from '../../constants/common'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import transfer from '../../localization/utils'

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

class Announcement extends Component {
  static navigationOptions(props) {
    let title = ''
    if (props.navigation.state.params) {
      title = props.navigation.state.params.title
    }
    return {
      headerTitle: title,
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

  componentWillMount() {
    const { navigation, language } = this.props
    navigation.setParams({
      title: transfer(language, 'home_bullCenter'),
    })
  }

  render() {
    const { navigation } = this.props
    const imghash = navigation.state.params.element.imghash
    return (
      <WebView
        source={{ uri: imghash }}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    language: state.system.language,
  }
}

export default connect(mapStateToProps)(Announcement)
