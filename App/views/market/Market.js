import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  ListView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { common } from '../../constants/common'
import MarketCell from './MarketCell'
import actions from '../../actions/index'

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

    dispatch(actions.getRose())
  }

  componentDidMount() { }

  tabBarPress(selectedIndex) {
    const { dispatch } = this.props
    dispatch(actions.marketListUpdate({ selectedIndex }))
  }

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
    const { rose, selectedIndex } = this.props
    const tabViews = []
    if (rose.length) {
      for (let i = 0; i < rose.length; i++) {
        const element = rose[i]
        const textColor = selectedIndex === i ? common.btnTextColor : common.textColor
        tabViews.push(
          <View
            style={{
              width: common.sw / 4,
              justifyContent: 'center',
            }}
            key={element.id}
          >
            <TouchableOpacity
              style={{
                alignSelf: 'center',
              }}
              activeOpacity={common.activeOpacity}
              onPress={() => this.tabBarPress(i)}
            >
              <Text
                style={{
                  color: textColor,
                  fontSize: common.font14,
                }}
              >{element.name}</Text>
            </TouchableOpacity>
          </View>,
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

        <View
          style={{
            backgroundColor: common.navBgColor,
            height: common.h32,
          }}
        >
          <ScrollView
            horizontal
            alwaysBounceHorizontal={false}
          >
            {tabViews}
          </ScrollView>
        </View>
        <ListView
          dataSource={this.listDS(rose.length === 0 ? [] : rose[selectedIndex].sub)}
          renderRow={(rd, sid, rid) => this.renderRow(rd, sid, rid)}
          renderHeader={() => this.renderHeader()}
          enableEmptySections
        />
      </View>
    )
  }
}

function mapStateToProps(store) {
  return {
    rose: store.dealstat.rose,
    selectedIndex: store.dealstat.selectedIndex,
  }
}

export default connect(
  mapStateToProps,
)(Market)
