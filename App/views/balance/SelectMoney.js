import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ListView,
} from 'react-native'
import { common, styles } from './common'

export default class SelectMoney extends Component {
  constructor() {
    super()
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      title: '选择币种',
      selected: false,
      dataSource: this.ds.cloneWithRows(['BTC', 'CNYT', 'KT']),
    }
  }
  componentDidMount() { }
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
  rowPress(rd, selected) {
    this.setState({
      title: rd,
      selected: !selected,
    })
    this.props.selectedMoney(rd)
  }
  renderRow(rd, selected) {
    return (
      <TouchableOpacity
        activeOpacity={common.activeOpacity}
        onPress={() => this.rowPress(rd, selected)}
      >
        <View style={styles.rechargeCellStyle} >
          <Text style={styles.cellTitleStyle} >{rd}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderMoneyList(selected) {
    if (selected) {
      return (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={rd => this.renderRow(rd, selected)}
          enableEmptySections
        />
      )
    }
    return null
  }
  render() {
    return (
      <View>
        <TouchableOpacity
          activeOpacity={common.activeOpacity}
          onPress={() => this.cellRightImagePress(!this.state.selected)}
        >
          <View style={[styles.rechargeCellStyle,
            { marginTop: common.balanceImageTitleMarginTop }]}
          >
            <Text style={styles.cellTitleStyle} >{this.state.title}</Text>
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

        {this.renderMoneyList(this.state.selected)}
      </View>
    )
  }
}
