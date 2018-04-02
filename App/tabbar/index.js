import React, { Component } from 'react'
import {
  Image,
  StyleSheet,
} from 'react-native'
import TabNavigator from 'react-native-tab-navigator'
import Home from '../views/home/Home'
import Balance from '../views/balance/Balance'
import Market from '../views/market/Market'
import Transactions from '../views/transactions/Transactions'
import Me from '../views/me/Me'

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 49,
    backgroundColor: 'rgb(38,42,65)',
  },
  tabStyle: {
    paddingTop: 5,
    alignSelf: 'flex-start',
  },
  titleStyle: {
    marginTop: 5,
  },
  selectedTitleStyle: {
    color: 'rgb(255,213,2)',
  },
  icon: {
    height: 20,
    width: 20,
  },
})
export default class TabBar extends Component {
  constructor() {
    super()
    this.state = {
      selectedTab: 'home',
    }
  }

  render() {
    return (
      <TabNavigator
        tabBarStyle={styles.tabBarStyle} >
        <TabNavigator.Item
          tabStyle={styles.tabStyle}
          titleStyle={styles.titleStyle}
          selectedTitleStyle={styles.selectedTitleStyle}
          selected={this.state.selectedTab === 'home'}
          title="首页"
          renderIcon={() => <Image
            style={styles.icon}
            source={require('../assets/首页copy2.png')}
          />}
          renderSelectedIcon={() => <Image
            style={styles.icon}
            source={require('../assets/首页.png')}
          />}
          // badgeText="1"
          onPress={() => this.setState({ selectedTab: 'home' })}
        >
          <Home />
        </TabNavigator.Item>
        <TabNavigator.Item
          tabStyle={styles.tabStyle}
          titleStyle={styles.titleStyle}
          selectedTitleStyle={styles.selectedTitleStyle}
          selected={this.state.selectedTab === 'market'}
          title="市场"
          renderIcon={() => <Image
            style={styles.icon}
            source={require('../assets/市场分析.png')}
          />}
          renderSelectedIcon={() => <Image
            style={styles.icon}
            source={require('../assets/市场分析.png')}
          />}
          // renderBadge={() => <CustomBadgeView />}
          onPress={() => this.setState({ selectedTab: 'market' })}
        >
          <Market />
        </TabNavigator.Item>
        <TabNavigator.Item
          tabStyle={styles.tabStyle}
          titleStyle={styles.titleStyle}
          selectedTitleStyle={styles.selectedTitleStyle}
          selected={this.state.selectedTab === 'transactions'}
          title="交易"
          renderIcon={() => <Image
            style={styles.icon}
            source={require('../assets/交易.png')}
          />}
          renderSelectedIcon={() => <Image
            style={styles.icon}
            source={require('../assets/交易copy2.png')}
          />}
          // badgeText="1"
          onPress={() => this.setState({ selectedTab: 'transactions' })}
        >
          <Transactions />
        </TabNavigator.Item>
        <TabNavigator.Item
          tabStyle={styles.tabStyle}
          titleStyle={styles.titleStyle}
          selectedTitleStyle={styles.selectedTitleStyle}
          selected={this.state.selectedTab === 'balance'}
          title="资金"
          renderIcon={() => <Image
            style={styles.icon}
            source={require('../assets/个人资金.png')}
          />}
          renderSelectedIcon={() => <Image
            style={styles.icon}
            source={require('../assets/个人资金copy.png')}
          />}
          // renderBadge={() => <CustomBadgeView />}
          onPress={() => this.setState({ selectedTab: 'balance' })}
        >
          <Balance navigation={this.props.navigation} />
        </TabNavigator.Item>
        <TabNavigator.Item
          tabStyle={styles.tabStyle}
          titleStyle={styles.titleStyle}
          selectedTitleStyle={styles.selectedTitleStyle}
          selected={this.state.selectedTab === 'me'}
          title="我的"
          renderIcon={() => <Image
            style={styles.icon}
            source={require('../assets/我的.png')}
          />}
          renderSelectedIcon={() => <Image
            style={styles.icon}
            source={require('../assets/我的copy4.png')}
          />}
          // renderBadge={() => <CustomBadgeView />}
          onPress={() => this.setState({ selectedTab: 'me' })}
        >
          <Me navigation={this.props.navigation} />
        </TabNavigator.Item>
      </TabNavigator>
    )
  }
}
