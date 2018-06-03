import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Image,
  TouchableOpacity,
} from 'react-native'
import { RefreshState } from 'react-native-refresh-list-view'
import { common } from '../../constants/common'
import DelegateListView from './DelegateListView'
import TKSelectionBar from '../../components/TKSelectionBar'
import TKSpinner from '../../components/TKSpinner'
import actions from '../../actions/index'
import schemas from '../../schemas/index'

class Orders extends Component {
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
        ),
    }
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  selectionBarPress(e) {
    const { dispatch, currentOrHistory } = this.props
    let tag
    if (e.title === '当前委托') {
      tag = common.delegate.current
    } else if (e.title === '历史委托') {
      tag = common.delegate.history
    }
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
        <TKSelectionBar
          titles={['当前委托', '历史委托']}
          onPress={e => this.selectionBarPress(e)}
        />
        {
          currentOrHistory === common.delegate.current
            ? <DelegateListView
              currentOrHistory={common.delegate.current}
              data={delegateSelfCurrent}
              refreshState={refreshStateCurrent}
              cancelAllBlock={() => {
                if (delegateSelfCurrent.length > 0) {
                  dispatch(actions.allCancel({
                    goods_id: homeRoseSelected.goods.id,
                    currency_id: homeRoseSelected.currency.id,
                  }))
                }
              }}
              cancelBlock={(rd, rid) => {
                const temp = delegateSelfCurrent.concat()
                temp[rid].status = common.delegate.status.cancel
                dispatch(actions.cancel({ id: rd.id }, temp))
              }}
              onHeaderRefresh={() => {
                if (refreshStateCurrent !== RefreshState.NoMoreData
                  || refreshStateCurrent !== RefreshState.FooterRefreshing) {
                  dispatch(actions.findDelegateSelfCurrent(schemas.findDelegateSelfCurrent(
                    user.id,
                    0,
                    common.delegate.limtCurrent,
                  ), RefreshState.HeaderRefreshing))
                }
              }}
              onFooterRefresh={() => {
                if (refreshStateCurrent !== RefreshState.NoMoreData
                  || refreshStateCurrent !== RefreshState.HeaderRefreshing) {
                  dispatch(actions.findDelegateSelfCurrent(schemas.findDelegateSelfCurrent(
                    user.id,
                    common.delegate.limtCurrent * skipCurrent,
                    common.delegate.limtCurrent,
                  ), RefreshState.FooterRefreshing))
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
                  dispatch(actions.findDelegateSelfHistory(schemas.findDelegateSelfHistory(
                    user.id,
                    0,
                    common.delegate.limtHistory,
                  ), RefreshState.HeaderRefreshing))
                }
              }}
              onFooterRefresh={() => {
                if (refreshStateHistory !== RefreshState.NoMoreData
                  || refreshStateHistory !== RefreshState.HeaderRefreshing) {
                  dispatch(actions.findDelegateSelfHistory(schemas.findDelegateSelfHistory(
                    user.id,
                    common.delegate.limtHistory * skipHistory,
                    common.delegate.limtHistory,
                  ), RefreshState.FooterRefreshing))
                }
              }}
            />
        }

        <TKSpinner isVisible={allCancelVisible} />
      </View>
    )
  }
}

function mapStateToProps(store) {
  return {
    skipCurrent: store.delegate.skipCurrent,
    skipHistory: store.delegate.skipHistory,
    refreshStateCurrent: store.delegate.refreshStateCurrent,
    refreshStateHistory: store.delegate.refreshStateHistory,
    delegateSelfCurrent: store.delegate.delegateSelfCurrent,
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
)(Orders)
