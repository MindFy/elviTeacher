import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
} from 'react-native'
import { styles } from './common'

export default class BalanceCell extends Component {
  componentDidMount() { }
  render() {
    return (
      <View style={styles.cellStyle} >
        <View style={{ flexDirection: 'row' }} >
          <Image
            style={styles.cellLeftImageStyle}
            source={this.props.leftImageSource}
          />
          <Text style={styles.cellTitleStyle} >{this.props.title}</Text>
        </View>

        <Text style={styles.cellDetailStyle} >{this.props.detail}</Text>
      </View>
    )
  }
}
