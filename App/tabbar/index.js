import React, { Component } from 'react'
import TabNavigator from 'react-native-tab-navigator'
import Home from '../views/home'
import Balance from '../views/balance'
import Market from '../views/market'
import Transactions from '../views/transactions'
import Me from '../views/me'

export default class Tabbar extends Component {
  constructor() {
    super()
    this.state = {
      selectedTab: 'home',
    }
  }

  render() {
    return (
      <TabNavigator>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'home'}
          title="Home"
          // renderIcon={() => <Image source={...} />}
          // renderSelectedIcon={() => <Image source={...} />}
          // badgeText="1"
          onPress={() => this.setState({ selectedTab: 'home' })}
        >
          <Home />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'market'}
          title="Market"
          // renderIcon={() => <Image source={...} />}
          // renderSelectedIcon={() => <Image source={...} />}
          // renderBadge={() => <CustomBadgeView />}
          onPress={() => this.setState({ selectedTab: 'market' })}
        >
          <Market />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'transactions'}
          title="Transactions"
          // renderIcon={() => <Image source={...} />}
          // renderSelectedIcon={() => <Image source={...} />}
          // badgeText="1"
          onPress={() => this.setState({ selectedTab: 'transactions' })}
        >
          <Transactions />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'balance'}
          title="Balance"
          // renderIcon={() => <Image source={...} />}
          // renderSelectedIcon={() => <Image source={...} />}
          // renderBadge={() => <CustomBadgeView />}
          onPress={() => this.setState({ selectedTab: 'balance' })}
        >
          <Balance />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'me'}
          title="Me"
          // renderIcon={() => <Image source={...} />}
          // renderSelectedIcon={() => <Image source={...} />}
          // renderBadge={() => <CustomBadgeView />}
          onPress={() => this.setState({ selectedTab: 'me' })}
        >
          <Me />
        </TabNavigator.Item>
      </TabNavigator>
    )
  }
}
