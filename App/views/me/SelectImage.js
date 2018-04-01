import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native'
import { common } from '../common'
// import ImagePicker from 'react-native-image-picker'

// const options = {
//   title: 'Select Avatar',
//   customButtons: [],
//   storageOptions: {
//     skipBackup: true,
//     path: 'images',
//   },
// }

export default class SelectImage extends Component {
  constructor() {
    super()
    this.state = {
      avatarSource: null,
    }
  }
  componentDidMount() { }
  showImagePicker() {
    // ImagePicker.showImagePicker(options, (response) => {
    //   if (response.didCancel) {
    //   } else if (response.error) {
    //   } else if (response.customButton) {
    //   } else {
    //     const source = { uri: response.uri }
    //     this.setState({
    //       avatarSource: source,
    //     })
    //   }
    // })
  }
  render() {
    if (this.state.avatarSource) {
      return (
        <TouchableOpacity
          activeOpacity={common.activeOpacity}
          onPress={() => this.showImagePicker()}
        >
          <Image
            style={{
              marginTop: common.margin10,
              marginLeft: common.margin10,
              marginRight: common.margin10,
              height: common.h120,
              backgroundColor: common.navBgColor,
              borderColor: common.borderColor,
              borderWidth: 1,
            }}
            source={this.state.avatarSource}
          />
        </TouchableOpacity>
      )
    }
    return (
      <View
        style={{
          marginTop: common.margin10,
          marginLeft: common.margin10,
          marginRight: common.margin10,
          height: common.h120,
          backgroundColor: common.navBgColor,
          borderColor: common.borderColor,
          borderWidth: 1,
        }}
      >
        <TouchableOpacity
          activeOpacity={common.activeOpacity}
          onPress={() => this.showImagePicker()}
        >
          <Image
            style={{
              marginTop: common.margin28,
              width: common.w40,
              height: common.w40,
              alignSelf: 'center',
            }}
            source={require('../../assets/添加copy2.png')}
          />
        </TouchableOpacity>
        <Text
          style={{
            marginTop: common.margin20,
            color: common.placeholderColor,
            fontSize: common.font14,
            alignSelf: 'center',
          }}
        >{this.props.title}</Text>
      </View>
    )
  }
}
