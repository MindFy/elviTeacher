import React, { Component } from 'react'
import {
  View,
  Text,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { common, styles } from './common'
import Navigator from '../me/Navigator'

export default class Recharge extends Component {
  constructor() {
    super()
    this.state = {
      selected: false,
    }
  }
  componentDidMount() { }
  leftImagePress() {
    this.props.navigation.goBack()
  }
  rightTitlePress() {
    this.props.navigation.navigate('History')
  }
  cellRightImagePress(selected) {
    this.setState({
      selected,
    })
  }
  /* 根据选中状态修改单元格右侧箭头宽高 */
  changeCellRightImageSize(selected) {
    if (selected) {
      return {
        width: common.rechargeCellRightImageH,
        height: common.rechargeCellRightImageW,
      }
    }
    return {
      width: common.rechargeCellRightImageW,
      height: common.rechargeCellRightImageH,
    }
  }
  renderMoneyList(selected) {
    if (selected) {
      return (
        <View>
          <View style={[styles.rechargeCellStyle,
            { marginTop: common.balanceImageTitleMarginTop }]}
          >
            <Text style={styles.cellTitleStyle} >BTC</Text>
          </View>
          <View style={styles.rechargeCellStyle} >
            <Text style={styles.cellTitleStyle} >CNYT</Text>
          </View>
          <View style={styles.rechargeCellStyle} >
            <Text style={styles.cellTitleStyle} >KT</Text>
          </View>
        </View>
      )
    }
    return null
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: common.bgColor }}>
        <StatusBar barStyle={'light-content'} />
        <Navigator
          headerTitle="充值"
          leftImagePress={() => this.leftImagePress()}
          rightTitle="历史记录"
          rightTitlePress={() => this.rightTitlePress()}
        />

        <TouchableOpacity
          activeOpacity={common.activeOpacity}
          onPress={() => this.cellRightImagePress(!this.state.selected)}
        >
          <View style={[styles.rechargeCellStyle,
            { marginTop: common.balanceImageTitleMarginTop }]}
          >
            <Text style={styles.cellTitleStyle} >选择币种</Text>
            <View style={{ alignSelf: 'center' }} >
              <Image
                style={[styles.rechargeCellRightImageStyle,
                  this.changeCellRightImageSize(this.state.selected)]}
                source={(this.state.selected ?
                  require('../../assets/下拉--向下.png') :
                  require('../../assets/下拉--向右.png'))}
              />
            </View>
          </View>
        </TouchableOpacity>

        <ScrollView>
          {this.renderMoneyList(this.state.selected)}
        </ScrollView>
      </View>
    )
  }
}
