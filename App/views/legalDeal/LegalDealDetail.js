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
  constructor(props) {
    super(props)
    const { dispatch, user } = props
    this.dataSource = data => new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(data)

    if (user) {
      dispatch(actions.findLegalDeal(schemas.findLegalDeal(user.id)))
    }
  }

  paymentPress() {
    const { navigation } = this.props
    navigation.navigate('Payment')
  }

  renderRow() {
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
          >CNYT</Text>
          <TouchableOpacity
            style={{
              marginLeft: common.margin20,
            }}
            activeOpacity={common.activeOpacity}
          >
            <Text
              style={{
                color: common.redColor,
                fontSize: common.font12,
              }}
            >买入</Text>
          </TouchableOpacity>
          <Text
            style={{
              marginLeft: common.margin20,
              color: common.textColor,
              fontSize: common.font10,
            }}
          >2018/02/02 18:00:00</Text>
          <Text
            style={{
              position: 'absolute',
              right: common.margin5,
              color: common.textColor,
              fontSize: common.font12,
            }}
          >待付款</Text>
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
            >价格:¥1</Text>
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
            >数量:100 CNYT</Text>
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
            >总价:¥1.00</Text>
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
              onPress={() => this.paymentPress()}
            >
              <Text
                style={{
                  color: common.btnTextColor,
                  fontSize: common.font10,
                }}
              >付款信息</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={common.activeOpacity}
              style={{
                marginTop: common.margin8,
                alignSelf: 'center',
              }}
            >
              <Text
                style={{
                  color: common.btnTextColor,
                  fontSize: common.font10,
                }}
              >撤单</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={common.activeOpacity}
              style={{
                marginTop: common.margin8,
                alignSelf: 'center',
                marginBottom: common.margin10,
              }}
            >
              <Text
                style={{
                  color: common.btnTextColor,
                  fontSize: common.font10,
                }}
              >确认付款</Text>
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
        renderRow={() => this.renderRow()}
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
