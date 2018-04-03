import React from 'react'
import { Button, Text, View, StatusBar } from 'react-native'
import { StackNavigator, TabNavigator } from 'react-navigation'
import { connect } from 'react-redux'
import NavigatorScreen from './containers/NavigatorScreen'
import HomeScreen from './views/home/Home'
import TransactionsScreen from './views/transactions/Transactions'

function Me(props) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
      <Button
        title="Go to Home"
        onPress={() => props.navigation.navigate('Home')}
      />
      <Button
        title="Go to Details"
        onPress={() => props.navigation.navigate('Details')}
      />
    </View>
  )
}

function DetailsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Details!</Text>
    </View>
  )
}

function Market() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Market</Text>
    </View>
  )
}

function Balance() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Balance</Text>
    </View>
  )
}

function Transaction() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Transaction</Text>
    </View>
  )
}

const TabBar = TabNavigator(
  {
    Home: { screen: HomeScreen, navigationOptions: { header: null } },
    Market: { screen: Market },
    Transaction: { screen: TransactionsScreen },
    Balance: { screen: Balance },
    Me: { screen: Me },
  },
)

const Details = NavigatorScreen(DetailsScreen, {
  title: 'Home',
  headerStyle: {
    backgroundColor: '#171B29',
  },
  headerTintColor: '#ffffff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerLeft: (<Button
    onPress={() => alert(1)}
    title="Info"
    color="#fff"
  />),
})

const Settings = NavigatorScreen(Me)

const RootStack = StackNavigator({
  TabBar,
  Details,
  Settings,
})

const RootNavigator = RootStack

export default RootNavigator
