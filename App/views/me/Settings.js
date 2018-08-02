import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Image,
  StatusBar,
  ScrollView,
  StyleSheet,
} from 'react-native'
import { common } from '../../constants/common'
import MeCell from './MeCell'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import packageJson from '../../../package.json'
import transfer from '../../localization/utils'

const styles = StyleSheet.create({
  headerLeft: {
    height: common.w40,
    width: common.w40,
    justifyContent: 'center',
  },
  headerLeftImge: {
    marginLeft: common.margin10,
    width: common.w10,
    height: common.h20,
  },
  container: {
    flex: 1,
    backgroundColor: common.bgColor,
  },
  topCell: {
    marginTop: common.margin10,
  },
})

class Settings extends Component {
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
            style={styles.headerLeftImge}
            source={require('../../assets/arrow_left_left.png')}
          />
        </NextTouchableOpacity>
      ),
    }
  }

  componentWillMount() {
    const { navigation, language } = this.props
    navigation.setParams({
      title: transfer(language, 'me_settings'),
    })
  }

  render() {
    const { navigation, loggedIn, language } = this.props
    return (
      <ScrollView style={styles.container}>
        <StatusBar barStyle={'light-content'} />

        <MeCell
          viewStyle={styles.topCell}
          leftImageHide
          onPress={() => navigation.navigate('Language')}
          title={transfer(language, 'me_settings_language')}
        />
        <MeCell
          leftImageHide
          onPress={() => {
            if (loggedIn) navigation.navigate('UpdatePassword')
            else navigation.navigate('LoginStack')
          }}
          title={transfer(language, 'me_settings_changePW')}
        />
        <MeCell
          leftImageHide
          rightImageHide
          onPress={() => { }}
          title={`V ${packageJson.jsVersion}`}
        />

      </ScrollView>
    )
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.authorize.loggedIn,
    language: state.system.language,
  }
}

export default connect(
  mapStateToProps,
)(Settings)
