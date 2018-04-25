import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Text,
  View,
  Image,
  ListView,
  TouchableOpacity,
} from 'react-native'
import {
  common,
} from '../../constants/common'
import actions from '../../actions/index'
import schemas from '../../schemas/index'

class LegalDealDetail extends Component {
  static navigationOptions(props) {
    return {
      headerTitle: '交易订单',
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
      dispatch(actions.findLegalDeal(schemas.findLegalDeal(user.id)))
    }
  }

  renderRow(rd, sid, rid) {
    const { navigation, dispatch, legalDeal } = this.props
    const createdAt = common.df(rd.createdAt)
    let textColor = 'white'
    let status = ''
    let direct = ''
    let firBtnTitle = ''
    let secBtnTitle = ''
    let cancelBtnDisabled = true
    let confirmBtnDisabled = true
    if (rd.direct === common.buy) {
      textColor = common.redColor
      direct = '买入'
      firBtnTitle = '付款信息'
      secBtnTitle = '确认付款'
    } else if (rd.direct === common.sell) {
      textColor = common.greenColor
      direct = '卖出'
      firBtnTitle = '收款信息'
      secBtnTitle = '我已收款'
    }
    switch (rd.status) {
      case common.legalDeal.status.waitpay:
        status = '待付款'
        cancelBtnDisabled = false
        break
      case common.legalDeal.status.waitconfirm:
        status = '待确认'
        confirmBtnDisabled = false
        break
      case common.legalDeal.status.complete:
        status = '已完成'
        break
      case common.legalDeal.status.cancel:
        status = '已取消'
        break
      default:
        break
    }
    return (
      <View
        style={{
          marginTop: common.margin10,
          marginLeft: common.margin10,
          marginRight: common.margin10,
          backgroundColor: common.navBgColor,
        }}
      >
        <View
          style={{
            height: common.h30,
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: common.borderColor,
            borderBottomWidth: 0,
          }}
        >
          <Text
            style={{
              marginLeft: common.margin5,
              color: common.textColor,
              fontSize: common.font12,
            }}
          >{common.legalDeal.token}</Text>
          <TouchableOpacity
            style={{
              marginLeft: common.margin20,
            }}
            activeOpacity={common.activeOpacity}
          >
            <Text
              style={{
                color: textColor,
                fontSize: common.font12,
              }}
            >{direct}</Text>
          </TouchableOpacity>
          <Text
            style={{
              marginLeft: common.margin20,
              color: common.textColor,
              fontSize: common.font10,
            }}
          >{createdAt}</Text>
          <Text
            style={{
              position: 'absolute',
              right: common.margin5,
              color: common.textColor,
              fontSize: common.font12,
            }}
          >{status}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'stretch',
          }}
        >
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: common.borderColor,
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                color: common.textColor,
                fontSize: common.font10,
                textAlign: 'center',
              }}
            >{`价格:¥${rd.dealPrice}`}</Text>
          </View>
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: common.borderColor,
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                color: common.textColor,
                fontSize: common.font10,
                textAlign: 'center',
              }}
            >{`数量:${rd.quantity} ${common.legalDeal.token}`}</Text>
          </View>
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: common.borderColor,
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                color: common.textColor,
                fontSize: common.font10,
                textAlign: 'center',
              }}
            >{`总价:¥${Number(rd.dealPrice * rd.quantity).toFixed(2)}`}</Text>
          </View>
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: common.borderColor,
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity
              style={{
                marginTop: common.margin10,
                alignSelf: 'center',
              }}
              activeOpacity={common.activeOpacity}
              onPress={() => {
                navigation.navigate('Payment', {
                  data: rd,
                })
              }}
            >
              <Text
                style={{
                  color: common.btnTextColor,
                  fontSize: common.font10,
                }}
              >{firBtnTitle}</Text>
            </TouchableOpacity>
            {
              rd.direct === common.buy ?
                <TouchableOpacity
                  activeOpacity={common.activeOpacity}
                  style={{
                    marginTop: common.margin8,
                    alignSelf: 'center',
                  }}
                  disabled={cancelBtnDisabled}
                  onPress={() => {
                    legalDeal[rid].status = common.legalDeal.status.cancel
                    dispatch(actions.legalDealCancel({ id: rd.id }, legalDeal.concat()))
                  }}
                >
                  <Text
                    style={{
                      color: cancelBtnDisabled ? common.placeholderColor : common.btnTextColor,
                      fontSize: common.font10,
                    }}
                  >撤单</Text>
                </TouchableOpacity> : null
            }
            <TouchableOpacity
              activeOpacity={common.activeOpacity}
              style={{
                marginTop: common.margin8,
                alignSelf: 'center',
                marginBottom: common.margin10,
              }}
              disabled={confirmBtnDisabled}
            >
              <Text
                style={{
                  color: confirmBtnDisabled ? common.placeholderColor : common.btnTextColor,
                  fontSize: common.font10,
                }}
              >{secBtnTitle}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  render() {
    const { legalDeal } = this.props
    return (
      <ListView
        style={{
          backgroundColor: common.blackColor,
        }}
        dataSource={this.dataSource(legalDeal)}
        renderRow={(rd, sid, rid) => this.renderRow(rd, sid, rid)}
        enableEmptySections
      />
    )
  }
}

function mapStateToProps(store) {
  return {
    legalDeal: store.legalDeal.legalDeal,

    user: store.user.user,
  }
}

export default connect(
  mapStateToProps,
)(LegalDealDetail)
