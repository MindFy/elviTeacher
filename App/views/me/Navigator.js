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
  // 导航栏样式
  navigatorStyle: {
    marginTop: common.navigatorMarginTop,
    height: common.navigatorH,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: common.navigatorBgColor,
  },
  // 导航栏左侧视图样式
  navigatorLeftImageViewStyle: {
    width: common.screenW / 3,
    alignSelf: 'center',
  },
  navigatorLeftImageStyle: {
    marginLeft: common.navigatorLeftViewMarginLeft,
    width: common.navigatorLeftImageW,
    height: common.navigatorLeftImageH,
  },
  // 导航栏右侧文字样式
  navigatorRightTextStyle: {
    width: common.screenW / 3 - common.navigatorLeftViewMarginLeft,
    alignSelf: 'center',
    color: 'white',
    marginRight: common.navigatorLeftViewMarginLeft,
    textAlign: 'right',
    fontSize: common.navigatorTitleFont,
  },
  // 导航栏标题样式
  navigatorHeaderTitleStyle: {
    alignSelf: 'center',
    color: 'white',
    fontSize: common.navigatorTitleFont,
  },
})

export default class Navigator extends Component {
  componentDidMount() { }
  render() {
    return (
      <View style={styles.navigatorStyle} >
        <View style={styles.navigatorLeftImageViewStyle} >
          <TouchableOpacity onPress={this.props.leftImagePress} >
            <Image
              style={styles.navigatorLeftImageStyle}
              source={require('../../assets/下拉copy.png')}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.navigatorHeaderTitleStyle} >{this.props.headerTitle}</Text>

        <TouchableOpacity onPress={this.props.rightTitlePress} >
          <Text style={styles.navigatorRightTextStyle} >{this.props.rightTitle}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
