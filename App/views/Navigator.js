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
    marginTop: 20,
    height: common.h44,               
    backgroundColor: common.navBgColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
  },
  // 导航栏左侧视图样式
  navigatorLeftImageViewStyle: {
    width: common.sw / 3,
    alignSelf: 'center',
  },
  navigatorLeftImageStyle: {
    marginLeft: common.margin10,
    width: common.w10,
    height: common.h20,
  },
  // 导航栏右侧文字样式
  navigatorRightTextStyle: {
    width: common.sw / 3 - common.margin10,
    marginRight: common.margin10,
    fontSize: common.font14,
    alignSelf: 'center',
    color: 'white',
    textAlign: 'right',
  },
  // 导航栏标题样式
  headerTitleStyle: {
    fontSize: common.font14,
    alignSelf: 'center',
    color: 'white',
  },
})

export default class Navigator extends Component {
  componentDidMount() { }
  render() {
    return (
      <View style={styles.navigatorStyle} >
        <View style={styles.navigatorLeftImageViewStyle} >
          <TouchableOpacity
            activeOpacity={common.activeOpacity}
            onPress={this.props.leftImagePress}
          >
            <Image
              style={styles.navigatorLeftImageStyle}
              source={require('../assets/下拉copy.png')}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.headerTitleStyle} >{this.props.headerTitle}</Text>

        <TouchableOpacity
          activeOpacity={common.activeOpacity}
          onPress={this.props.rightTitlePress}
        >
          <Text style={styles.navigatorRightTextStyle} >{this.props.rightTitle}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
