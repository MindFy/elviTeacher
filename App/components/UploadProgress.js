import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import transfer from '../localization/utils'

const styles = {
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 25,
    paddingBottom: 15,
    marginHorizontal: 23,
    height: 112,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  title: {
    color: '#181B2B',
    fontSize: 16,
  },
  image: {
    // width: '100%',
    marginHorizontal: 15,
    height: 30,
  },
}

export default class UploadProgress extends Component {
  constructor(props) {
    super(props)
    this.state = {
      atIndex: 0,
    }
    this.images = [
      require('../assets/zero_three.png'),
      require('../assets/one_three.png'),
      require('../assets/two_three.png'),
      require('../assets/three_three.png'),
    ]
  }

  updateIndex(idx) {
    this.setState({
      atIndex: idx,
    })
  }

  render() {
    const { atIndex } = this.state
    const { language } = this.props
    return (
      <View style={styles.container}>
        <Text>{transfer(language, 'auth_upload_ing')}</Text>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={this.images[atIndex]}
        />
      </View>
    )
  }
}
