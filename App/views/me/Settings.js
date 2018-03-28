import React, { Component } from 'react'
import {
  View,
  StatusBar,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native'
import { common, styles } from './common'
import Navigator from './Navigator'

export default class Settings extends Component {
  componentDidMount() { }
  changePwd() {
    this.props.navigation.navigate('SetPwd')
  }
  render() {
    return (
      <View style={styles.viewStyle} >
        <StatusBar
          barStyle={'light-content'}
        />
        <Navigator
          headerTitle='设置'
          leftImagePress={() => this.props.navigation.goBack()} />
        <ScrollView >
          <TouchableOpacity
           activeOpacity={common.activeOpacity}
          onPress={() => this.changePwd()} >
            <View style={[styles.cellViewStyle, { marginTop: common.firstCellMarginTop, justifyContent: 'space-between' }]} >
              <Text style={styles.cellTextStyle} >修改密码</Text>
              <Image style={styles.cellRightImageStyle}
                source={require('../../assets/下拉copy.png')} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={common.activeOpacity} >
            <View style={[styles.cellViewStyle, { justifyContent: 'space-between' }]} >
              <Text style={styles.cellTextStyle} >语言选择</Text>
              <Image style={styles.cellRightImageStyle}
                source={require('../../assets/下拉copy.png')} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={common.activeOpacity} >
            <View style={[styles.cellViewStyle, { justifyContent: 'space-between' }]} >
              <Text style={styles.cellTextStyle} >版本显示</Text>
              <Image style={styles.cellRightImageStyle}
                source={require('../../assets/下拉copy.png')} />
            </View>
          </TouchableOpacity>

        </ScrollView>
      </View>
    )
  }
}
