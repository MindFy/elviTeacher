import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  ListView,
  StyleSheet,
} from 'react-native'
import { BigNumber } from 'bignumber.js'
import { common } from '../../constants/common'
import TKSelectionBar from '../../components/TKSelectionBar'
import actions from '../../actions/index'

const styles = StyleSheet.create({
  shelvesList: {
    flexDirection: 'row',
    marginLeft: common.margin15,
    marginRight: common.margin15,
  },
  shelvesListHeaderView: {
    marginTop: common.margin10,
    borderBottomColor: common.placeholderColor,
    borderBottomWidth: 1,
  },
  shelvesListHeaderTitle: {
    color: common.placeholderColor,
    fontSize: common.font12,
    paddingBottom: common.margin5,
  },
  shelvesListRowView: {
    marginTop: common.margin5,
    marginLeft: 1,
    marginRight: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

class ShelvesList extends Component {
  constructor() {
    super()
    this.dataSource = data => new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(data)
  }

  selectionBarPress = (e) => {
    const { dispatch, navigation, user } = this.props
    if (e.title === '盘口五档') {
      dispatch(actions.selectionBarUpdate(common.selectionBar.left))
    } else if (e.title === '当前委托') {
      dispatch(actions.selectionBarUpdate(common.selectionBar.right))
      if (!user) navigation.navigate('LoginStack')
    }
  }

  renderHeader(type) {
    let text = ''
    if (type === common.buy) {
      text = '买'
    } else if (type === common.sell) {
      text = '卖'
    }
    return (
      <View style={styles.shelvesListHeaderView}>
        <Text style={styles.shelvesListHeaderTitle}>
          {text}
        </Text>
      </View>
    )
  }

  renderShelvesRow(rd, rid, type) {
    const { homeRoseSelected } = this.props
    let price
    let sumQuantity
    let title
    let titleColor
    let detail
    let detailColor
    common.precision(homeRoseSelected.goods.name, homeRoseSelected.currency.name, (p, q) => {
      price = new BigNumber(rd.price).toFixed(p, 1)
      sumQuantity = new BigNumber(rd.sum_quantity).toFixed(q, 1)
    })
    if (type === common.buy) {
      title = sumQuantity
      titleColor = common.textColor
      detail = price
      detailColor = common.redColor
    } else if (type === common.sell) {
      title = price
      titleColor = common.greenColor
      detail = sumQuantity
      detailColor = common.textColor
    }
    return (
      <View style={styles.shelvesListRowView}>
        <Text
          style={{
            fontSize: common.font12,
            color: titleColor,
          }}
        >{title}</Text>
        <Text
          style={{
            fontSize: common.font12,
            color: detailColor,
          }}
        >{detail}</Text>
      </View>
    )
  }

  renderList() {
    const { selectionBarSelected, shelvesBuy, shelvesSell } = this.props
    if (selectionBarSelected === common.selectionBar.left) {
      return (
        <View style={styles.shelvesList}>
          <ListView
            style={{ width: '50%' }}
            dataSource={this.dataSource(shelvesBuy)}
            renderHeader={() => this.renderHeader(common.buy)}
            renderRow={(rd, sid, rid) => this.renderShelvesRow(rd, rid, common.buy)}
            enableEmptySections
            removeClippedSubviews={false}
          />
          <ListView
            style={{ width: '50%' }}
            dataSource={this.dataSource(shelvesSell)}
            renderHeader={() => this.renderHeader(common.sell)}
            renderRow={(rd, sid, rid) => this.renderShelvesRow(rd, rid, common.sell)}
            enableEmptySections
            removeClippedSubviews={false}
          />
        </View>
      )
    }
    return null
  }

  render() {
    return (
      <View>
        <TKSelectionBar
          titles={['盘口五档', '当前委托']}
          onPress={e => this.selectionBarPress(e)}
        />
        {this.renderList()}
      </View>
    )
  }
}

function mapStateToProps(store) {
  return {
    user: store.user.user,

    shelvesBuy: store.delegate.shelvesBuy,
    shelvesSell: store.delegate.shelvesSell,

    homeRoseSelected: store.dealstat.homeRoseSelected,

    selectionBarSelected: store.ui.selectionBarSelected,
  }
}

export default connect(
  mapStateToProps,
)(ShelvesList)
