import React, { Component } from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native'
import { common } from '../../constants/common'
import MeCell from './MeCell'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'

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

export default class Language extends Component {
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
    this.state = {
      languageIndex: 0,
    }
  }

  setLanguage(languageIndex) {
    this.setState({ languageIndex })
  }

  render() {
    const { languageIndex } = this.state
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
          onPress={() => this.setLanguage(0)}
          title="中文"
        />
        <MeCell
          leftImageHide
          rightImageHide={!languageIndex}
          rightImage={languageIndex ? rightImage : null}
          onPress={() => this.setLanguage(1)}
          title="English"
        />
      </ScrollView>
    )
  }
}
