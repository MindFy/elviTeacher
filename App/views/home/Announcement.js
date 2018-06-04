import React, { Component } from 'react'
import {
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import {
  common,
} from '../../constants/common'

export default class Announcement extends Component {
  static navigationOptions(props) {
    return {
      headerTitle: '公告中心',
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
  componentDidMount() { }

  render() {
    const { navigation } = this.props

    const createdAt = common.dfFullDate(navigation.state.params.element.createdAt)
    const title = navigation.state.params.element.title
    const content = navigation.state.params.element.content
    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: common.bgColor,
        }}
      >
        <Text
          style={{
            marginTop: common.margin60,
            color: common.textColor,
            fontSize: common.font14,
            textAlign: 'center',
            width: '100%',
          }}
        >{title}</Text>
        <Text
          style={{
            marginTop: common.margin10,
            color: common.textColor,
            fontSize: common.font14,
            textAlign: 'center',
            width: '100%',
          }}
        >{createdAt}</Text>
        <Text
          style={{
            marginTop: common.margin20,
            color: common.textColor,
            fontSize: common.font14,
            textAlign: 'center',
            width: '100%',
          }}
        >{content}</Text>
      </ScrollView>
    )
  }
}
