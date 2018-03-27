import React, { Component } from 'react'
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { common } from './common'

const styles = StyleSheet.create({
  //导航栏样式
  navigatorStyle: {
    marginTop: common.navigatorMarginTop,
    height: common.navigatorH,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: common.navigatorBgColor,
  },
  //导航栏左侧视图样式
  navigatorLeftImageStyle: {
    marginLeft: common.navigatorLeftViewMarginLeft,
    width: common.navigatorLeftImageW,
    height: common.navigatorLeftImageH,
  },
  //导航栏头部视图样式
  navigatorHeaderViewStyle: {
    alignSelf: 'center',
  },
  //导航栏标题样式
  navigatorHeaderTitleStyle: {
    color: 'white',
    fontSize: common.navigatorTitleFont,
  }
})

export default class Navigator extends Component {
  componentDidMount() { }
  render() {
    return (
      <View style={styles.navigatorStyle} >
        <TouchableOpacity style={{ alignSelf: 'center' }} onPress={this.props.leftImagePress} >
          <Image style={styles.navigatorLeftImageStyle}
            source={require('../assets/下拉copy.png')} />
        </TouchableOpacity>

        <View style={styles.navigatorHeaderViewStyle}>
          <Text style={styles.navigatorHeaderTitleStyle} >{this.props.headerTitle}</Text>
        </View>

        <View style={styles.navigatorLeftImageStyle} />
      </View>
    )
  }
}