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
    return {
      headerTitle: '设置',
      headerStyle: {
        backgroundColor: common.navBgColor,
        borderBottomWidth: 0,
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontSize: common.font16,
      },
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

  render() {
    const { navigation, loggedIn } = this.props
    return (
      <ScrollView style={styles.container}>
        <StatusBar barStyle={'light-content'} />

        <MeCell
          viewStyle={styles.topCell}
          leftImageHide
          onPress={() => navigation.navigate('Language')}
          title="语言"
        />
        <MeCell
          leftImageHide
          onPress={() => {
            if (loggedIn) navigation.navigate('UpdatePassword')
            else navigation.navigate('LoginStack')
          }}
          title="修改密码"
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
  }
}

export default connect(
  mapStateToProps,
)(Settings)
