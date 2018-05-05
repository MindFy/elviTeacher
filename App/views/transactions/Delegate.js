import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native'
import Spinner from 'react-native-spinkit'
import { RefreshState } from 'react-native-refresh-list-view'
import { common } from '../../constants/common'
import DelegateListView from './DelegateListView'
import TKSelectionBar from '../../components/TKSelectionBar'
import actions from '../../actions/index'
import schemas from '../../schemas/index'

class Delegate extends Component {
  static navigationOptions(props) {
    return {
      headerTitle: '我的委托',
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
          <TouchableOpacity
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
        ),
      headerRight:
        (
          <TouchableOpacity
            activeOpacity={common.activeOpacity}
            onPress={() => { }}
          >
            <Image
              style={{
                marginRight: common.margin10,
                width: common.w20,
                height: common.h20,
              }}
              source={require('../../assets/筛选.png')}
            />
          </TouchableOpacity>
        ),
    }
  }

  componentDidMount() {
    const { dispatch, user } = this.props
    if (user) {
      dispatch(actions.findDelegateSelfCurrent(
        schemas.findDelegateSelfCurrent(user.id, 0, common.delegate.limtCurrent),
        RefreshState.HeaderRefreshing))
      dispatch(actions.findDelegateSelfHistory(
        schemas.findDelegateSelfHistory(user.id, 0, common.delegate.limtHistory),
        RefreshState.HeaderRefreshing))
    }
    this.listener = DeviceEventEmitter.addListener(common.delegateListenerNoti, () => {
      dispatch(actions.findDelegateSelfCurrent(
        schemas.findDelegateSelfCurrent(user.id, 0, common.delegate.limtCurrent),
        RefreshState.HeaderRefreshing))
      dispatch(actions.findDelegateSelfHistory(
        schemas.findDelegateSelfHistory(user.id, 0, common.delegate.limtHistory),
        RefreshState.HeaderRefreshing))
    })
  }

  componentWillUnmount() {
    const { dispatch, currentOrHistory } = this.props
    if (currentOrHistory !== common.delegate.current) {
      dispatch(actions.currentOrHistoryUpdate({
        currentOrHistory: common.delegate.current,
      }))
      dispatch(actions.skipUpdate({
        skipCurrent: 0,
        skipHistory: 0,
        refreshStateCurrent: RefreshState.Idle,
        refreshStateHistory: RefreshState.Idle,
      }))
    }
    this.listener.remove()
  }

  topBarPress(tag) {
    const { dispatch, currentOrHistory } = this.props
    if (currentOrHistory !== tag) {
      dispatch(actions.currentOrHistoryUpdate({
        currentOrHistory: tag,
      }))
    }
  }

  render() {
    const { dispatch, currentOrHistory, delegateSelfCurrent, delegateSelfHistory, allCancelVisible,
      skipCurrent, skipHistory, refreshStateCurrent, refreshStateHistory, user, homeRoseSelected,
    } = this.props

    return (
      <View style={{
        flex: 1,
        backgroundColor: common.bgColor,
      }}
      >
        <StatusBar
          barStyle={'light-content'}
        />

        <TKSelectionBar
          leftTitle={'当前委托'}
          rightTitle={'历史委托'}
          leftBlock={() => this.topBarPress(common.delegate.current)}
          rightBlock={() => this.topBarPress(common.delegate.history)}
        />

        {
          currentOrHistory === common.delegate.current
            ? <DelegateListView
              currentOrHistory={common.delegate.current}
              data={delegateSelfCurrent}
              refreshState={refreshStateCurrent}
              cancelAllBlock={() => {
                dispatch(actions.allCancel({
                  goods_id: homeRoseSelected.goods.id,
                  currency_id: homeRoseSelected.currency.id,
                }))
              }}
              cancelBlock={(rd, rid) => {
                const temp = delegateSelfCurrent.concat()
                temp[rid].status = common.delegate.status.cancel
                dispatch(actions.cancel({ id: rd.id }, temp))
              }}
              onHeaderRefresh={() => {
                if (refreshStateCurrent !== RefreshState.NoMoreData
                  || refreshStateCurrent !== RefreshState.FooterRefreshing) {
                  dispatch(actions.findDelegateSelfCurrent(
                    schemas.findDelegateSelfCurrent(user.id, 0, common.delegate.limtCurrent),
                    RefreshState.HeaderRefreshing))
                }
              }}
              onFooterRefresh={() => {
                if (refreshStateCurrent !== RefreshState.NoMoreData
                  || refreshStateCurrent !== RefreshState.HeaderRefreshing) {
                  dispatch(actions.findDelegateSelfCurrent(schemas.findDelegateSelfCurrent(user.id,
                    common.delegate.limtCurrent * skipCurrent, common.delegate.limtCurrent),
                  RefreshState.FooterRefreshing))
                }
              }}
            />
            : <DelegateListView
              currentOrHistory={common.delegate.history}
              data={delegateSelfHistory}
              refreshState={refreshStateHistory}
              onHeaderRefresh={() => {
                if (refreshStateHistory !== RefreshState.NoMoreData
                  || refreshStateHistory !== RefreshState.FooterRefreshing) {
                  dispatch(actions.findDelegateSelfHistory(
                    schemas.findDelegateSelfHistory(user.id, 0, common.delegate.limtHistory),
                    RefreshState.HeaderRefreshing))
                }
              }}
              onFooterRefresh={() => {
                if (refreshStateHistory !== RefreshState.NoMoreData
                  || refreshStateHistory !== RefreshState.HeaderRefreshing) {
                  dispatch(actions.findDelegateSelfHistory(schemas.findDelegateSelfHistory(user.id,
                    common.delegate.limtHistory * skipHistory, common.delegate.limtHistory),
                  RefreshState.FooterRefreshing))
                }
              }}
            />
        }

        <Spinner
          style={{
            position: 'absolute',
            alignSelf: 'center',
            marginTop: common.sh / 2 - common.h50 / 2 - 64,
          }}
          isVisible={allCancelVisible}
          size={common.h50}
          type={'Wave'}
          color={common.btnTextColor}
        />
      </View>
    )
  }
}

function mapStateToProps(store) {
  return {
    skipCurrent: store.delegate.skipCurrent,
    refreshStateCurrent: store.delegate.refreshStateCurrent,
    delegateSelfCurrent: store.delegate.delegateSelfCurrent,
    skipHistory: store.delegate.skipHistory,
    refreshStateHistory: store.delegate.refreshStateHistory,
    delegateSelfHistory: store.delegate.delegateSelfHistory,

    currentOrHistory: store.delegate.currentOrHistory,

    allCancelVisible: store.delegate.allCancelVisible,
    allCancelResponse: store.delegate.allCancelResponse,

    cancelVisible: store.delegate.cancelVisible,
    cancelResponse: store.delegate.cancelResponse,

    homeRoseSelected: store.dealstat.homeRoseSelected,

    user: store.user.user,
  }
}

export default connect(
  mapStateToProps,
)(Delegate)
