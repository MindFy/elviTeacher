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
import { common } from '../common'
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

    // dispatch(actions.findDelegateList(schemas.findDelegateList(user.id, goods.id, currency.id, ['waiting', 'dealing'])))
    // dispatch(actions.findDelegateSelf(schemas.findDelegateSelf(user.id, ['complete', 'cancel'])))
  }

  componentDidMount() { }

  topBarPress(tag) {
    const { dispatch, currentOrHistory } = this.props
    if (currentOrHistory !== tag) {
      dispatch(actions.currentOrHistoryUpdate({
        currentOrHistory: tag,
      }))
    }
  }

  renderHeader() {
    const { currentOrHistory } = this.props
    if (currentOrHistory === common.current) {
      return (
        <TouchableOpacity
          activeOpacity={common.activeOpacity}
          onPress={() => { }}
        >
          <Text
            style={{
              marginTop: common.margin10,
              marginRight: common.margin10,
              fontSize: common.font12,
              color: common.btnTextColor,
              textAlign: 'right',
            }}
          >全部撤单</Text>
        </TouchableOpacity>
      )
    }

    return (
      <View
        style={{
          marginTop: common.margin10,
          marginLeft: common.margin10,
          marginRight: common.margin10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text
          style={{
            color: common.placeholderColor,
            fontSize: common.font12,
          }}
        >市场</Text>
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <Text
            style={{
              color: common.btnTextColor,
              fontSize: common.font12,
            }}
          >均价</Text>
          <Text
            style={{
              color: common.placeholderColor,
              fontSize: common.font12,
            }}
          > / 价格</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <Text
            style={{
              color: common.btnTextColor,
              fontSize: common.font12,
            }}
          >成交数量</Text>
          <Text
            style={{
              color: common.placeholderColor,
              fontSize: common.font12,
            }}
          > / 数量</Text>
        </View>
      </View>
    )
  }

  renderRow(rd) {
    const { currentOrHistory } = this.props
    if (currentOrHistory === common.current) {
      return (
        <View
          style={{
            marginTop: common.margin10,
            marginLeft: common.margin10,
            marginRight: common.margin10,
            height: common.h60,
            backgroundColor: common.navBgColor,
            borderColor: common.borderColor,
            borderWidth: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              borderBottomColor: common.borderColor,
              borderBottomWidth: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
              }}
            >
              <Text
                style={{
                  marginLeft: common.margin5,
                  color: common.textColor,
                  fontSize: common.font12,
                  alignSelf: 'center',
                }}
              >{`${rd.goods.name}/${rd.currency.name}`}</Text>
              <Text
                style={{
                  marginLeft: common.margin10,
                  color: rd.direct === 'sell' ? common.redColor : common.greenColor,
                  fontSize: common.font12,
                  alignSelf: 'center',
                }}
              >{rd.direct === 'sell' ? '买入' : '卖出'}</Text>
              <Text
                style={{
                  marginLeft: common.margin10,
                  color: common.textColor,
                  fontSize: common.font12,
                  alignSelf: 'center',
                }}
              >{rd.createdAt}</Text>
            </View>
            <TouchableOpacity
              style={{
                alignSelf: 'center',
              }}
              activeOpacity={common.activeOpacity}
            >
              <Text
                style={{
                  marginRight: common.margin5,
                  color: common.btnTextColor,
                  fontSize: common.font12,
                  paddingRight: 5,
                }}
              >撤单</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                marginLeft: common.margin5,
                color: common.textColor,
                fontSize: common.font10,
                alignSelf: 'center',
              }}
            >{`价格:${rd.price}`}</Text>
            <Text
              style={{
                marginLeft: common.margin5,
                color: common.textColor,
                fontSize: common.font10,
                alignSelf: 'center',
              }}
            >{`数量:${rd.quantity}`}</Text>
            <Text
              style={{
                marginLeft: common.margin5,
                color: common.textColor,
                fontSize: common.font10,
                alignSelf: 'center',
              }}
            >{`已成交:${rd.dealled}`}</Text>
          </View>
        </View >
      )
    }
    return (
      <View
        style={{
          marginTop: common.margin10,
          marginLeft: common.margin10,
          marginRight: common.margin10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text
          style={{
            fontSize: common.font10,
            color: common.textColor,
          }}
        >{`${rd.goods.name}/${rd.currency.name}`}</Text>
        <Text
          style={{
            fontSize: common.font10,
            color: common.textColor,
          }}
        >{rd.price}</Text>
        <Text
          style={{
            fontSize: common.font10,
            color: common.textColor,
          }}
        >{rd.dealamount}</Text>
      </View>
    )
  }

  render() {
    const { currentOrHistory, delegateList, delegateSelf } = this.props
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
                backgroundColor: currentOrHistory === common.current ? common.borderColor : common.navBgColor,
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
              >我的委托</Text>
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
                backgroundColor: currentOrHistory === common.current ?
                  common.borderColor :
                  common.navBgColor,
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
              >历史委托</Text>
            </View>
          </TouchableOpacity>
        </View>

        <ListView
          dataSource={this.dataSource(currentOrHistory ? delegateList : delegateSelf)}
          renderHeader={() => this.renderHeader()}
          renderRow={rd => this.renderRow(rd)}
          enableEmptySections
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

    user: store.user.user,

    goods: store.deal.goods,
    currency: store.deal.currency,
  }
}

export default connect(
  mapStateToProps,
)(Delegate)
