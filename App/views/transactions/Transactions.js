import React, { Component } from 'react'
import {
  View,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { common } from '../../constants/common'
import Depth from './Depth'
import DelegateShelves from './DelegateShelves'
import LatestDealList from './LatestDealList'
import TransactionsTopBar from './TransactionsTopBar'

export default class Transactions extends Component {
  static navigationOptions(props) {
    const { navigation } = props
    return {
      headerTitle: '交易',
      headerStyle: {
        backgroundColor: common.navBgColor,
        borderBottomWidth: 0,
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontSize: common.font16,
      },
      headerLeft:
        (
          (navigation.state.params && navigation.state.params.type)
            ? <TouchableOpacity
              style={{
                height: common.w40,
                width: common.w40,
                justifyContent: 'center',
              }}
              activeOpacity={common.activeOpacity}
              onPress={() => props.navigation.goBack()}
            >
              <Image
                style={{
                  marginLeft: common.margin10,
                  width: common.w10,
                  height: common.h20,
                }}
                source={require('../../assets/下拉copy.png')}
              />
            </TouchableOpacity>
            : <TouchableOpacity
              activeOpacity={common.activeOpacity}
              onPress={() => {
                navigation.navigate('Detail')
              }}
            >
              <Image
                style={{
                  marginLeft: common.margin10,
                  width: common.w20,
                  height: common.h20,
                }}
                source={require('../../assets/市场分析.png')}
              />
            </TouchableOpacity>
        ),
    }
  }
  componentDidMount() { }

  render() {
    const { navigation } = this.props

    return (
      <View style={{
        flex: 1,
        backgroundColor: common.bgColor,
      }}
      >
        <StatusBar
          barStyle={'light-content'}
        />
        <TransactionsTopBar
          navigation={navigation}
        />

        <ScrollView
          // refreshControl={
          //   <RefreshControl
          //     onRefresh={() => {
          //       if (homeRoseSelected) {
          //         this.getUIData(homeRoseSelected.goods.id, homeRoseSelected.currency.id)
          //       }
          //     }}
          //     refreshing={
          //       !(!latestDealsVisible && !getShelvesVisible && !getDepthMapVisible)
          //     }
          //     colors={[common.textColor]}
          //     progressBackgroundColor={common.navBgColor}
          //     progressViewOffset={0}
          //     tintColor={common.textColor}
          //   />
          // }
          removeClippedSubviews={false}
          showsVerticalScrollIndicator={false}
        >
          <DelegateShelves
            navigation={navigation}
          />

          <Depth />

          <LatestDealList />
        </ScrollView>
      </View>
    )
  }
}
