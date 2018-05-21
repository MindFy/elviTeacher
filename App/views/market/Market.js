import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { common } from '../../constants/common'
import MarketList from './MarketList'
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

  componentDidMount() { }

  tabBarPress(selectedIndex) {
    const { dispatch } = this.props
    dispatch(actions.marketListUpdate({ selectedIndex }))
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
      <View
        style={{
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
        <MarketList
          data={rose.length === 0 ? [] : rose[selectedIndex].sub}
          currencyName={rose.length === 0 ? '' : rose[selectedIndex].name}
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
