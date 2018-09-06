import React, { Component } from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native'
import { Toast } from 'teaset'
import { connect } from 'react-redux'
import { common } from '../../constants/common'
import MeCell from './MeCell'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import * as system from '../../actions/system'
import transfer from '../../localization/utils'
import { storeSysterLanguage } from '../../utils/languageHelper'
import cache from '../../utils/cache'

const styles = StyleSheet.create({
  headerLeft: {
    height: common.getH(40),
    width: common.getH(40),
    justifyContent: 'center',
  },
  headerLeftImge: {
    marginLeft: common.getH(10),
    width: common.getH(10),
    height: common.getH(20),
  },
  container: {
    flex: 1,
    backgroundColor: common.bgColor,
  },
  topCell: {
    marginTop: common.getH(10),
  },
  checkBox: {
    marginRight: common.getH(10),
    width: common.getH(20),
    height: common.getH(14),
  },
})

class Language extends Component {
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
  constructor() {
    super()
    this.language = ['zh_hans', 'zh_hant', 'en', 'ja', 'ko']
  }

  componentWillMount() {
    const { navigation, language } = this.props
    navigation.setParams({
      title: transfer(language, 'me_settings_language'),
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.language !== this.props.language) {
      const { navigation, language } = nextProps
      Toast.success(transfer(language, 'me_changeLanguageSuccess'))
      navigation.setParams({
        title: transfer(language, 'me_settings_language'),
      })
    }
  }

  setLanguage(launageEvt) {
    const { dispatch, language } = this.props
    if (launageEvt !== language) {
      dispatch(system.updateLanguage(launageEvt))
      storeSysterLanguage(launageEvt)
      this.props.navigation.popToTop()
      cache.setObject('duration', '10')
      this.props.navigation.navigate('Home')
    }
  }

  render() {
    const languageIndex = this.language.indexOf(this.props.language)
    const rightImage = (<Image
      style={styles.checkBox}
      source={require('../../assets/check_box.png')}
    />)
    return (
      <ScrollView style={styles.container}>
        <MeCell
          viewStyle={styles.topCell}
          leftImageHide
          rightImageHide={languageIndex !== 0}
          rightImage={rightImage}
          onPress={() => this.setLanguage('zh_hans')}
          title="简体中文"
          delay={500}
        />
        <MeCell
          leftImageHide
          rightImageHide={languageIndex !== 1}
          rightImage={rightImage}
          onPress={() => this.setLanguage('zh_hant')}
          title="繁體中文"
          delay={500}
        />
        <MeCell
          leftImageHide
          rightImageHide={languageIndex !== 2}
          rightImage={rightImage}
          onPress={() => this.setLanguage('en')}
          title="English"
          delay={500}
        />
        <MeCell
          leftImageHide
          rightImageHide={languageIndex !== 3}
          rightImage={rightImage}
          onPress={() => this.setLanguage('ja')}
          title="日本語"
          delay={500}
        />
        <MeCell
          leftImageHide
          rightImageHide={languageIndex !== 4}
          rightImage={rightImage}
          onPress={() => this.setLanguage('ko')}
          title="한국어"
          delay={500}
        />
      </ScrollView>
    )
  }
}

function mapStateToProps(state) {
  return {
    language: state.system.language,
  }
}

export default connect(mapStateToProps)(Language)
