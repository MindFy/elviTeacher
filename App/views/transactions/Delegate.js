import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Image,
  StatusBar,
  ListView,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native'
import Toast from 'teaset/components/Toast/Toast'
import Spinner from 'react-native-spinkit'
import { common } from '../../constants/common'
import TKSelectionBar from '../../components/TKSelectionBar'
import DelegateListView from './DelegateListView'
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

  constructor() {
    super()
    this.dataSource = data => new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(data)
  }

  componentDidMount() {
    const { dispatch, user } = this.props
    if (user) {
      dispatch(actions.findDelegateSelfCurrent(schemas.findDelegateSelfCurrent(user.id)))
      dispatch(actions.findDelegateSelfHistory(schemas.findDelegateSelfHistory(user.id)))
    }
    this.listener = DeviceEventEmitter.addListener(common.delegateListenerNoti, () => {
      dispatch(actions.findDelegateSelfHistory(schemas.findDelegateSelfHistory(user.id)))
    })
  }

  componentWillUnmount() {
    const { dispatch, currentOrHistory } = this.props
    if (currentOrHistory !== common.current) {
      dispatch(actions.currentOrHistoryUpdate({
        currentOrHistory: common.current,
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
    const { dispatch, currentOrHistory, delegateSelfCurrent,
      delegateSelfHistory, allCancelVisible } = this.props

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
          leftBlock={() => this.topBarPress(common.current)}
          rightBlock={() => this.topBarPress(common.history)}
        />

        <DelegateListView
          currentOrHistory={currentOrHistory}
          dataSource={this.dataSource(currentOrHistory === common.current ?
            delegateSelfCurrent : delegateSelfHistory)}
          cancelAllBlock={() => {
            dispatch(actions.allCancel())
          }}
          cancelBlock={(rd, rid) => {
            const temp = delegateSelfCurrent.concat()
            temp.splice(rid, 1)
            dispatch(actions.cancel({ id: rd.id }, temp))
          }}
        />


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
    delegateSelfCurrent: store.delegate.delegateSelfCurrent,
    delegateSelfHistory: store.delegate.delegateSelfHistory,
    currentOrHistory: store.delegate.currentOrHistory,

    allCancelVisible: store.delegate.allCancelVisible,
    allCancelResponse: store.delegate.allCancelResponse,

    cancelVisible: store.delegate.cancelVisible,
    cancelResponse: store.delegate.cancelResponse,

    user: store.user.user,
  }
}

export default connect(
  mapStateToProps,
)(Delegate)
