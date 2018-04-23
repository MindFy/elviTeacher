import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { common } from '../../constants/common'

const styles = StyleSheet.create({
  viewStyle: {
    marginTop: common.margin5,
    height: common.h40,
    backgroundColor: common.navBgColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftImageStyle: {
    marginLeft: common.margin10,
    width: common.w20,
    height: common.w20,
    alignSelf: 'center',
  },
  titleStyle: {
    marginLeft: common.margin10,
    fontSize: common.font14,
    color: common.textColor,
    alignSelf: 'center',
  },
  rightDir: {
    marginRight: common.margin10,
    width: common.w10,
    height: common.h20,
  },
})

export default class MeCell extends Component {
  componentDidMount() { }
  render() {
    return (
      <TouchableOpacity
        style={[styles.viewStyle, this.props.viewStyle]}
        activeOpacity={common.activeOpacity}
        onPress={this.props.onPress}
      >
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          {
            this.props.leftImageHide ? null :
              (<Image
                style={[styles.leftImageStyle, this.props.leftImageStyle]}
                source={this.props.leftImageSource}
              />)
          }
          <Text
            style={[styles.titleStyle, this.props.titleStyle]}
          >{this.props.title}</Text>
        </View>
        {
          this.props.rightImageHide ? null :
            (<Image
              style={styles.rightDir}
              source={require('../../assets/下拉--向右.png')}
            />)
        }
      </TouchableOpacity>
    )
  }
}
