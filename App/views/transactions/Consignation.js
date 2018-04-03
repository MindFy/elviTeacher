import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StatusBar,
  ListView,
  TouchableOpacity,
} from 'react-native'
import { common } from '../common'

export default class Consignation extends Component {
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
    }
  }
  constructor() {
    super()
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      dataSource: this.ds.cloneWithRows([
        ['TK/BTC', '2018/02/02 18:00:00', '0.09999999', '1.5555555', '1.2222', 1],
        ['TK/BTC', '2018/02/02 18:00:00', '0.09999999', '1.5555555', '1.2222', 0],
      ]),
      isCurrentPress: true,
    }
  }
  componentDidMount() { }
  topBarPress(isCurrentPress) {
    let data = null
    if (isCurrentPress) {
      data = [
        ['TK/BTC', '2018/02/02 18:00:00', '0.09999999', '1.5555555', '1.2222', 1],
        ['TK/BTC', '2018/02/02 18:00:00', '0.09999999', '1.5555555', '1.2222', 0],
      ]
    } else {
      data = [
        ['TK / BTC', '0.012345678', '2345.35'],
      ]
    }
    this.setState({
      isCurrentPress,
      dataSource: this.ds.cloneWithRows(data),
    })
  }
  renderHeader(isCurrentPress) {
    if (isCurrentPress) {
      return (
        <TouchableOpacity
          activeOpacity={common.activeOpacity}
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
  renderRow(rd, isCurrentPress) {
    if (isCurrentPress) {
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
              >{rd[0]}</Text>
              <Text
                style={{
                  marginLeft: common.margin10,
                  color: rd[5] === 1 ? common.redColor : common.greenColor,
                  fontSize: common.font12,
                  alignSelf: 'center',
                }}
              >{rd[5] ? '买入' : '卖出'}</Text>
              <Text
                style={{
                  marginLeft: common.margin10,
                  color: common.textColor,
                  fontSize: common.font12,
                  alignSelf: 'center',
                }}
              >{rd[1]}</Text>
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
            >{`价格:${rd[2]}`}</Text>
            <Text
              style={{
                marginLeft: common.margin5,
                color: common.textColor,
                fontSize: common.font10,
                alignSelf: 'center',
              }}
            >{`数量:${rd[3]}`}</Text>
            <Text
              style={{
                marginLeft: common.margin5,
                color: common.textColor,
                fontSize: common.font10,
                alignSelf: 'center',
              }}
            >{`已成交:${rd[4]}`}</Text>
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
        >{rd[0]}</Text>
        <Text
          style={{
            fontSize: common.font10,
            color: common.textColor,
          }}
        >{rd[1]}</Text>
        <Text
          style={{
            fontSize: common.font10,
            color: common.textColor,
          }}
        >{rd[2]}</Text>
      </View>
    )
  }
  render() {
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
            onPress={() => this.topBarPress(true)}
          >
            <View
              style={{
                flex: 1,
                width: (common.sw - common.margin10 * 2) / 2,
                backgroundColor: this.state.isCurrentPress ? common.borderColor : common.navBgColor,
                alignSelf: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: common.font14,
                  alignSelf: 'center',
                  color: this.state.isCurrentPress ? common.btnTextColor : common.textColor,
                }}
              >我的委托</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={common.activeOpacity}
            onPress={() => this.topBarPress(false)}
          >
            <View
              style={{
                flex: 1,
                width: (common.sw - common.margin10 * 2) / 2,
                backgroundColor: !this.state.isCurrentPress ?
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
                  color: !this.state.isCurrentPress ? common.btnTextColor : common.textColor,
                }}
              >历史委托</Text>
            </View>
          </TouchableOpacity>
        </View>

        <ListView
          dataSource={this.state.dataSource}
          renderHeader={() => this.renderHeader(this.state.isCurrentPress)}
          renderRow={rd => this.renderRow(rd, this.state.isCurrentPress)}
          enableEmptySections
        />
      </View>
    )
  }
}
