import React, { Component } from 'react'
import {
  View,
  StatusBar,
  ScrollView,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native'
import { common, styles } from './common'
import Navigator from './Navigator'

export default class Authentication extends Component {
  constructor() {
    super()
    this.state = {
      authenticationState: -1, //-1普通状态，1成功，0失败
    }
  }
  componentDidMount() { }
  confirmPress(authenticationState) {
    this.setState({
      authenticationState: authenticationState,
    })
  }
  render() {
    return (
      <View style={styles.viewStyle} >
        <StatusBar barStyle={'light-content'} />
        <Navigator
          headerTitle='身份认证'
          leftImagePress={() => this.props.navigation.goBack()} />
        {this.renderScrollView(this.state.authenticationState)}
      </View>
    )
  }

  /*  */
  renderScrollView(state) {
    switch (state) {
      case -1:
        return (
          <ScrollView>
            <View style={styles.inputViewStyle} >
              <TextInput style={styles.inputStyle}
                placeholder={'姓名'}
                placeholderTextColor={common.placeholderTextColor} />
            </View>

            <View style={styles.inputViewStyle} >
              <TextInput style={styles.inputStyle}
                placeholder={'身份证号'}
                placeholderTextColor={common.placeholderTextColor} />
            </View>

            <View style={[styles.inputViewStyle, {justifyContent: 'flex-start', height: common.loadPhotoViewH}]} >
              <TouchableOpacity activeOpacity={common.activeOpacity} >
                <Image style={styles.loadPhotoImageStyle}
                  source={require('../assets/添加copy2.png')} />
              </TouchableOpacity>
              <Text style={styles.loadPhotoTextStyle} >请上传身份证正面照片</Text>
            </View>

            <View style={[styles.inputViewStyle, {justifyContent: 'flex-start', height: common.loadPhotoViewH}]} >

              <TouchableOpacity activeOpacity={common.activeOpacity} >
                <Image style={styles.loadPhotoImageStyle}
                  source={require('../assets/添加copy2.png')} />
              </TouchableOpacity>
              <Text style={styles.loadPhotoTextStyle} >请上传身份证反面照片</Text>
            </View>

            <View style={[styles.inputViewStyle, {justifyContent: 'flex-start', height: common.loadPhotoViewH}]} >

              <TouchableOpacity activeOpacity={common.activeOpacity} >
                <Image style={styles.loadPhotoImageStyle}
                  source={require('../assets/添加copy2.png')} />
              </TouchableOpacity>
              <Text style={styles.loadPhotoTextStyle} >请上传手持身份证照片</Text>
            </View>

            <TouchableOpacity
              activeOpacity={common.activeOpacity}
              onPress={() => this.confirmPress(0)} >
              <View style={styles.bottomBtnViewStyle} >
                <Text style={styles.bottomBtnTextStyle} >确认</Text>
              </View>
            </TouchableOpacity>

          </ScrollView>
        )
      case 1:
        return (
          <ScrollView>
            <Image style={styles.successfulImageStyle}
              source={require('../assets/成功.png')} />
            <Text style={styles.successfulTextStyle} >恭喜！身份认证成功！</Text>
          </ScrollView>
        )
      case 0:
        return (
          <ScrollView>
            <Image style={styles.successfulImageStyle}
              source={require('../assets/失败.png')} />
            <Text style={styles.successfulTextStyle} >抱歉！您的身份认证未通过审核！</Text>
            <Text style={styles.successfulTextStyle} >失败原因：照片不清晰</Text>
            <TouchableOpacity style={{ marginTop: common.firstCellMarginTop}}
              activeOpacity={common.activeOpacity}
              onPress={() => this.confirmPress(1)} >
              <Text style={styles.confirmAgainTextStyle} >再次认证</Text>
            </TouchableOpacity>
          </ScrollView>
        )
    }
  }
}