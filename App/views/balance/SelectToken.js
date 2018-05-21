import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ListView,
} from 'react-native'
import { common } from '../../constants/common'
import actions from '../../actions/index'

class SelectToken extends Component {
  constructor() {
    super()
    this.dataSource = data => new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(data)
  }

  componentDidMount() { }

  cellRightImagePress() {
    const { dispatch, selectedToken, tokenListSelected, selectedIndex } = this.props
    dispatch(actions.selectTokenUpdate({
      selectedToken,
      tokenListSelected: !tokenListSelected,
      selectedIndex,
    }))
  }

  /* 根据选中状态修改单元格右侧箭头宽高 */
  changeCellRightImageSize() {
    const { tokenListSelected } = this.props
    if (tokenListSelected) {
      return {
        width: common.h20,
        height: common.w10,
      }
    }
    return {
      width: common.w10,
      height: common.h20,
    }
  }

  rowPress(rd, rid) {
    const { dispatch, tokenListSelected, selectedTokenBlock } = this.props
    dispatch(actions.selectTokenUpdate({
      selectedToken: rd,
      tokenListSelected: !tokenListSelected,
      selectedIndex: rid,
    }))
    selectedTokenBlock(rd.id)
  }

  renderRow(rd, rid) {
    return (
      <TouchableOpacity
        activeOpacity={common.activeOpacity}
        onPress={() => this.rowPress(rd, rid)}
      >
        <View
          style={{
            marginTop: common.margin5,
            height: common.h40,
            backgroundColor: common.navBgColor,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              marginLeft: common.margin10,
              fontSize: common.font14,
              color: common.textColor,
              alignSelf: 'center',
            }}
          >{rd.token.name}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderTokenList() {
    const { asset, tokenListSelected } = this.props
    if (tokenListSelected) {
      return (
        <ListView
          dataSource={this.dataSource(asset)}
          renderRow={(rd, sid, rid) => this.renderRow(rd, rid)}
          enableEmptySections
        />
      )
    }
    return null
  }
  render() {
    const { selectedToken, tokenListSelected } = this.props
    return (
      <View>
        <TouchableOpacity
          activeOpacity={common.activeOpacity}
          onPress={() => this.cellRightImagePress()}
        >
          <View
            style={{
              marginTop: common.margin10,
              height: common.h40,
              backgroundColor: common.navBgColor,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                marginLeft: common.margin10,
                fontSize: common.font14,
                color: common.textColor,
                alignSelf: 'center',
              }}
            >{
                selectedToken === common.selectedTokenDefault ?
                  common.selectedTokenDefault : selectedToken.token.name
              }</Text>
            <View
              style={{
                alignSelf: 'center',
              }}
            >
              <Image
                style={[{
                  marginRight: common.margin10,
                  height: common.h20,
                  width: common.w10,
                },
                this.changeCellRightImageSize(tokenListSelected)]}
                source={(tokenListSelected ?
                  require('../../assets/下拉--向下.png') :
                  require('../../assets/下拉--向右.png'))}
              />
            </View>
          </View>
        </TouchableOpacity>

        {this.renderTokenList()}
      </View>
    )
  }
}

function mapStateToProps(store) {
  return {
    selectedToken: store.address.selectedToken,
    selectedIndex: store.address.selectedIndex,
    asset: store.asset.asset,
  }
}

export default connect(
  mapStateToProps,
)(SelectToken)
