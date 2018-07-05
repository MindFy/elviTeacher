import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native'
import NextTouchableOpacity from '../../../components/NextTouchableOpacity'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',

    alignItems: 'center',
    backgroundColor: '#343c5c',
    borderRadius: 6,
  },
  icon: {
    width: 20,
    height: 20,

    marginLeft: 10,
    marginRight: 5,
  },
  titleContainer: {
    flexDirection: 'row',
    width: '30%',
  },
  title: {
    fontSize: 14,
    color: '#dfe4ff',
  },
  subtitle: {
    fontSize: 12,
    color: '#616989',
  },
  detail: {
    marginRight: 30,
    textAlign: 'center',
    flex: 1,
    fontSize: 14,
    color: '#dfe4ff',
  },
  extra: {
    marginRight: 10,
    color: '#24c78c',
  },
})

class BalanceDetailTradeCell extends Component {
  handlePress = () => {
    if (this.props.onPress) {
      this.props.onPress()
    }
  }

  renderTitle = () => (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{this.props.title}</Text>
      <Text style={styles.subtitle}>{`/${this.props.subtitle}`}</Text>
    </View>
  )

  render() {
    const container = [styles.container, this.props.style]
    const extarStyle = [styles.extra, this.props.extraStyle]
    return (
      <NextTouchableOpacity style={container} onPress={this.handlePress} activeOpacity={0.7}>
        <Image style={styles.icon} source={this.props.icon} />
        <Text style={styles.title}>{this.props.title}</Text>
        <Text style={styles.subtitle}>{`/${this.props.subtitle}`}</Text>
        <Text style={styles.detail}>{this.props.detail}</Text>
        <Text style={extarStyle}>{this.props.extra}</Text>
      </NextTouchableOpacity>
    )
  }
}

export default BalanceDetailTradeCell
