import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  StatusBar,
  ListView,
} from 'react-native'
import ScrollableTab from 'react-native-scrollable-tab-view'
import {
  getRoseRequest,
} from '../../actions/market'
import { common } from '../common'
import MarketCell from './MarketCell'

class Market extends Component {
  static navigationOptions() {
    return {
      headerTitle: '市场',
      headerStyle: {
        backgroundColor: common.navBgColor,
        borderBottomWidth: 0,
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontSize: common.font16,
      },
      headerLeft: null,
    }
  }

  constructor(props) {
    super(props)
    const { dispatch } = props

    this.listDS = data => new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(data)

    dispatch(getRoseRequest())
  }

  componentDidMount() { }

  renderRow(rd) {
    return (
      <MarketCell rd={rd} />
    )
  }

  renderHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <Text
          style={{
            flex: 1,
            paddingTop: common.margin20,
            paddingBottom: common.margin5,
            fontSize: common.font14,
            color: common.placeholderColor,
            textAlign: 'center',
          }}
        >名称</Text>
        <Text
          style={{
            flex: 1,
            paddingTop: common.margin20,
            paddingBottom: common.margin5,
            fontSize: common.font14,
            color: common.placeholderColor,
            textAlign: 'center',
          }}
        >成交量</Text>
        <Text
          style={{
            flex: 1,
            paddingTop: common.margin20,
            paddingBottom: common.margin5,
            fontSize: common.font14,
            color: common.placeholderColor,
            textAlign: 'center',
          }}
        >最新价</Text>
        <Text
          style={{
            flex: 1,
            paddingTop: common.margin20,
            paddingBottom: common.margin5,
            fontSize: common.font14,
            color: common.placeholderColor,
            textAlign: 'center',
          }}
        >24h涨跌</Text>
      </View>
    )
  }

  render() {
    const { rose } = this.props
    const tabViews = []
    if (rose.length) {
      for (let i = 0; i < rose.length; i++) {
        const element = rose[i]
        tabViews.push(
          <ListView
            key={element.id}
            tabLabel={element.name}
            dataSource={this.listDS(element.sub)}
            renderRow={(rd, sid, rid) => this.renderRow(rd, sid, rid)}
            renderHeader={() => this.renderHeader()}
            enableEmptySections
          />,
        )
      }
    }

    return (
      <View style={{
        flex: 1,
        backgroundColor: common.bgColor,
      }}
      >
        <StatusBar
          barStyle={'light-content'}
        />

        {
          tabViews.length ?
            <ScrollableTab
              style={{
                backgroundColor: common.navBgColor,
              }}
              tabBarUnderlineStyle={{
                height: 0,
              }}
              tabBarTextStyle={{
                fontSize: common.font14,
              }}
              tabBarActiveTextColor={common.btnTextColor}
              tabBarInactiveTextColor={common.textColor}
            >
              {tabViews}
            </ScrollableTab> : null
        }
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    rose: state.dealstat.rose,
  }
}

export default connect(
  mapStateToProps,
)(Market)
