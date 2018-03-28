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

export default class Me extends Component {
  componentDidMount() { }
  settingsPress() {
    this.props.navigation.navigate('Settings')
  }
  authenticationPress() {
    this.props.navigation.navigate('Authentication')
  }
  render() {
    return (
      <View style={styles.viewStyle} >
        <StatusBar barStyle={'light-content'} />
        <Navigator
          headerTitle="我的"
          leftImage={(
            <Image />
          )}
        />
        <ScrollView>
          <TouchableOpacity activeOpacity={common.activeOpacity} >
            <View style={[styles.cellViewStyle,
              { height: common.firstCellH,
                marginTop: common.firstCellMarginTop,
              }]}
            >
              <Image
                style={styles.cellLeftImageStyle}
                source={require('../../assets/我的.png')}
              />
              <Text style={[styles.cellTextStyle, { fontSize: common.firstCellFontSize }]}>
                13899993333
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={common.activeOpacity}
            onPress={() => this.authenticationPress()}
          >
            <View style={[styles.cellViewStyle, { justifyContent: 'space-between' }]}>
              <View style={{ flexDirection: 'row' }} >
                <Image
                  style={styles.cellLeftImageStyle}
                  source={require('../../assets/手机认证copy.png')}
                />
                <Text style={styles.cellTextStyle}>身份认证</Text>
              </View>
              <Image
                style={styles.cellRightImageStyle}
                source={require('../../assets/下拉copy.png')}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={common.activeOpacity} >
            <View style={[styles.cellViewStyle, { justifyContent: 'space-between' }]}>
              <View style={{ flexDirection: 'row' }} >
                <Image
                  style={styles.cellLeftImageStyle}
                  source={require('../../assets/手机认证.png')}
                />
                <Text style={styles.cellTextStyle}>手机认证</Text>
              </View>
              <Image
                style={styles.cellRightImageStyle}
                source={require('../../assets/下拉copy.png')}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={common.activeOpacity} >
            <View style={[styles.cellViewStyle, { justifyContent: 'space-between' }]}>
              <View style={{ flexDirection: 'row' }} >
                <Image
                  style={styles.cellLeftImageStyle}
                  source={require('../../assets/手机认证copy3.png')}
                />
                <Text style={styles.cellTextStyle}>超级返利</Text>
              </View>
              <Image
                style={styles.cellRightImageStyle}
                source={require('../../assets/下拉copy.png')}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={common.activeOpacity}
            onPress={() => this.settingsPress()}
          >
            <View style={[styles.cellViewStyle, { justifyContent: 'space-between' }]}>
              <View style={{ flexDirection: 'row' }} >
                <Image
                  style={styles.cellLeftImageStyle}
                  source={require('../../assets/手机认证copy4.png')}
                />
                <Text style={styles.cellTextStyle}>设置</Text>
              </View>
              <Image
                style={styles.cellRightImageStyle}
                source={require('../../assets/下拉copy.png')}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={common.activeOpacity}
            onPress={() => this.props.navigation.goBack()}
          >
            <View style={styles.bottomBtnViewStyle} >
              <Text style={styles.bottomBtnTextStyle} >退出登录</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}
