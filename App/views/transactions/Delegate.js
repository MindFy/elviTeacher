import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Image,
  StatusBar,
  ListView,
  TouchableOpacity,
} from 'react-native'
import Toast from 'teaset/components/Toast/Toast'
import Spinner from 'react-native-spinkit'
import { common } from '../common'
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

  constructor(props) {
    super(props)
    const { dispatch, user, goods, currency } = this.props
    this.dataSource = data => new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(data)

    this.showAllCancelResponse = false
    this.showCancelResponse = false

    if (user) {
      dispatch(actions.findDelegateList(schemas.findDelegateList(
        user.id,
        goods.id,
        currency.id,
      )))
      dispatch(actions.findDelegateSelf(schemas.findDelegateSelf(
        user.id,
      )))
    }
  }

  topBarPress(tag) {
    const { dispatch, currentOrHistory } = this.props
    if (currentOrHistory !== tag) {
      dispatch(actions.currentOrHistoryUpdate({
        currentOrHistory: tag,
      }))
    }
  }

  handleAllCancelResponse() {
    const { allCancelVisible, allCancelResponse } = this.props
    if (!allCancelVisible && !this.showAllCancelResponse) return

    if (allCancelVisible) {
      this.showAllCancelResponse = true
    } else {
      this.showAllCancelResponse = false
      if (allCancelResponse.success) {
        Toast.success(allCancelResponse.result)
      } else {
        Toast.fail(allCancelResponse.error.message)
      }
    }
  }

  handleCancelResponse() {
    const { cancelVisible, cancelResponse } = this.props
    if (!cancelVisible && !this.showCancelResponse) return

    if (cancelVisible) {
      this.showCancelResponse = true
    } else {
      this.showCancelResponse = false
      if (cancelResponse.success) {
        Toast.success(cancelResponse.result)
      } else {
        Toast.fail(cancelResponse.error.message)
      }
    }
  }

  render() {
    const { dispatch, currentOrHistory, delegateList,
      delegateSelf, allCancelVisible } = this.props
    this.handleAllCancelResponse()
    this.handleCancelResponse()

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
            marginTop: common.margin10,
            marginLeft: common.margin15,
            marginRight: common.margin15,
            height: common.h35,
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <TouchableOpacity
            activeOpacity={common.activeOpacity}
            onPress={() => this.topBarPress(common.current)}
          >
            <View
              style={{
                flex: 1,
                width: (common.sw - common.margin10 * 2) / 2,
                backgroundColor: currentOrHistory === common.current ?
                  common.borderColor : common.navBgColor,
                alignSelf: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: common.font14,
                  alignSelf: 'center',
                  color: currentOrHistory === common.current ?
                    common.btnTextColor : common.textColor,
                }}
              >当前委托</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={common.activeOpacity}
            onPress={() => this.topBarPress(common.history)}
          >
            <View
              style={{
                flex: 1,
                width: (common.sw - common.margin10 * 2) / 2,
                backgroundColor: currentOrHistory === common.history ?
                  common.borderColor : common.navBgColor,
                alignSelf: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: common.font14,
                  alignSelf: 'center',
                  color: currentOrHistory === common.history ?
                    common.btnTextColor : common.textColor,
                }}
              >历史委托</Text>
            </View>
          </TouchableOpacity>
        </View>

        <DelegateListView
          currentOrHistory={currentOrHistory}
          dataSource={this.dataSource(currentOrHistory === common.current ?
            delegateList : delegateSelf)}
          cancelAllBlock={() => {
            dispatch(actions.allCancel())
          }}
          cancelBlock={(rd, rid) => {
            dispatch(actions.cancel({ id: rd.id }, rid))
          }}
        />

        <Spinner
          style={{
            position: 'absolute',
            alignSelf: 'center',
            marginTop: common.sh / 2 - common.h50 / 2,
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
    delegateList: store.delegate.delegateList,
    delegateSelf: store.delegate.delegateSelf,
    currentOrHistory: store.delegate.currentOrHistory,

    allCancelVisible: store.delegate.allCancelVisible,
    allCancelResponse: store.delegate.allCancelResponse,

    cancelVisible: store.delegate.cancelVisible,
    cancelResponse: store.delegate.cancelResponse,

    user: store.user.user,

    goods: store.deal.goods,
    currency: store.deal.currency,
  }
}

export default connect(
  mapStateToProps,
)(Delegate)
