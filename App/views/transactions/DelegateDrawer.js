import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Text,
  View,
  Image,
  Switch,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { common } from '../../constants/common'
// import actions from '../../actions/index'

class DelegateDrawer extends Component {
  componentDidMount() { }

  render() {
    const { close } = this.props

    const timeBtns = []
    const typeBtns = []
    const times = ['一天', '一周', '一月', '全部']
    for (let i = 0; i < times.length; i++) {
      const element = times[i]
      const marginLeft = i === 0 ? common.margin10 : common.margin12
      const marginRight = i === (times.length - 1) ? common.margin10 : 0
      timeBtns.push(
        <TouchableOpacity
          key={i}
          style={{
            flex: 1,
            marginLeft,
            marginRight,
            height: common.h36,
            backgroundColor: common.rgb242,
            justifyContent: 'center',
          }}
          activeOpacity={common.activeOpacity}
          onPress={() => {

          }}
        >
          <Text
            style={{
              color: common.blackColor,
              fontSize: common.font14,
              textAlign: 'center',
            }}
          >{element}</Text>
        </TouchableOpacity>,
      )
    }
    const types = ['买入', '卖出', '全部', '']
    for (let i = 0; i < types.length; i++) {
      const element = types[i]
      const marginLeft = i === 0 ? common.margin10 : common.margin12
      const marginRight = i === (types.length - 1) ? common.margin10 : 0
      const backgroundColor = i === (types.length - 1) ? 'white' : common.rgb242
      typeBtns.push(
        <TouchableOpacity
          key={i}
          style={{
            flex: 1,
            marginLeft,
            marginRight,
            height: common.h36,
            backgroundColor,
            justifyContent: 'center',
          }}
          activeOpacity={common.activeOpacity}
          onPress={() => {

          }}
        >
          <Text
            style={{
              color: common.blackColor,
              fontSize: common.font14,
              textAlign: 'center',
            }}
          >{element}</Text>
        </TouchableOpacity>,
      )
    }

    return (
      <View
        style={{
          backgroundColor: 'white',
          width: common.sw * 0.85,
          height: '100%',
        }}
      >
        <View
          style={{
            marginTop: common.margin20,
            height: common.h44,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <TouchableOpacity
            style={{
              height: common.w40,
              width: common.w40,
              justifyContent: 'center',
              alignSelf: 'center',
            }}
            activeOpacity={common.activeOpacity}
            onPress={() => close()}
          >
            <Image
              style={{
                marginLeft: common.margin10,
                width: common.w10,
                height: common.h20,
              }}
              source={require('../../assets/下拉copy2.png')}
            />
          </TouchableOpacity>
          <Text
            style={{
              alignSelf: 'center',
              color: common.blackColor,
              fontSize: common.font16,
              textAlign: 'center',
            }}
          >筛选</Text>
          <View
            style={{
              width: common.w40,
            }}
          />
        </View>
        <ScrollView>
          <Text
            style={{
              marginTop: common.margin10,
              marginLeft: common.margin10,
              color: common.blackColor,
              fontSize: common.font16,
            }}
          >日期</Text>
          <View
            style={{
              marginTop: common.margin20,
              flexDirection: 'row',
            }}
          >
            {timeBtns}
          </View>
          <View
            style={{
              marginTop: common.margin20,
              marginLeft: common.margin10,
              marginRight: common.margin10,
              backgroundColor: common.rgb223,
              height: 1,
            }}
          />

          <Text
            style={{
              marginTop: common.margin20,
              marginLeft: common.margin10,
              color: common.blackColor,
              fontSize: common.font16,
            }}
          >类型</Text>
          <View
            style={{
              marginTop: common.margin20,
              flexDirection: 'row',
            }}
          >
            {typeBtns}
          </View>
          <View
            style={{
              marginTop: common.margin20,
              marginLeft: common.margin10,
              marginRight: common.margin10,
              backgroundColor: common.rgb223,
              height: 1,
            }}
          />

          <View
            style={{
              marginTop: common.margin25,
              marginLeft: common.margin10,
              marginRight: common.margin10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                color: common.blackColor,
                fontSize: common.font16,
                alignSelf: 'center',
              }}
            >隐藏已撤销</Text>
            <Switch
              style={{
                alignSelf: 'center',
              }}
            />
          </View>
        </ScrollView>

        <View
          style={{
            position: 'absolute',
            height: common.h50,
            bottom: 0,
            left: 0,
            right: 0,
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity
            activeOpacity={common.activeOpacity}
            onPress={() => {

            }}
            style={{
              flex: 1,
              justifyContent: 'center',
              borderTopWidth: 1,
              borderTopColor: common.rgb242,
            }}
          >
            <Text
              style={{
                color: common.blackColor,
                fontSize: common.font16,
                textAlign: 'center',
              }}
            >重置</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={common.activeOpacity}
            onPress={() => {
              close()
            }}
            style={{
              flex: 2,
              justifyContent: 'center',
              backgroundColor: common.btnTextColor,
            }}
          >
            <Text
              style={{
                color: common.blackColor,
                fontSize: common.font16,
                textAlign: 'center',
              }}
            >完成</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

function mapStateToProps(store) {
  return {
    drawerOpen: store.ui.drawerOpen,
  }
}

export default connect(
  mapStateToProps,
)(DelegateDrawer)
