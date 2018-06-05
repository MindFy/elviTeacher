import React, { PureComponent } from 'react'
import { View } from 'react-native'
import TKSelectionBar from '../../components/TKSelectionBar'

class ShelvesList extends PureComponent {
  render() {
    const { titles, segmentIndex, segmentValueChanged, renderChildComponent } = this.props
    return (
      <View>
        <TKSelectionBar
          initialIndexSelected={segmentIndex}
          titles={titles}
          onPress={(e) => {
            if (segmentValueChanged) {
              segmentValueChanged(e.index)
            }
          }}
        />
        {renderChildComponent(segmentIndex)}
      </View>
    )
  }
}

export default ShelvesList
