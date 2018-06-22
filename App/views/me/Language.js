import React, { Component } from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native'
import { connect } from 'react-redux'
import { common } from '../../constants/common'
import MeCell from './MeCell'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import * as system from '../../actions/system'
import transfer from '../../localization/utils'

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
    return {
      headerTitle: '语言',
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
    this.language = ['zh_cn', 'en']
  }

  setLanguage(launageEvt) {
    const { dispatch, language } = this.props
    if (launageEvt !== language) {
      dispatch(system.updateLanguage(launageEvt))
    }
  }

  render() {
    const languageIndex = this.language.indexOf(this.props.language)
    const { language } = this.props
    const rightImage = (<Image
      style={styles.checkBox}
      source={require('../../assets/check_box.png')}
    />)
    return (
      <ScrollView style={styles.container}>
        <MeCell
          viewStyle={styles.topCell}
          leftImageHide
          rightImageHide={languageIndex}
          rightImage={!languageIndex ? rightImage : null}
          onPress={() => this.setLanguage('zh_cn')}
          title={transfer(language, 'me_settings_languageChinese')}
          delay={500}
        />
        <MeCell
          leftImageHide
          rightImageHide={!languageIndex}
          rightImage={languageIndex ? rightImage : null}
          onPress={() => this.setLanguage('en')}
          title={transfer(language, 'me_settings_languageEnglish')}
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
