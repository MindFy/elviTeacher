import React, { Component } from 'react'
import { connect } from 'react-redux'
import Echarts from 'native-echarts'
import { common } from '../../constants/common'

class Depth extends Component {
  componentDidMount() { }

  processData() {
    const { depthMap } = this.props
    const prices = [] // 存放坐标
    const amountsBuy = [] // 存放买入
    const amountsSell = [] // 存放卖出
    if (!depthMap) {
      return { prices, amountsBuy, amountsSell }
    }

    for (let i = 0; i < depthMap.buy.length; i++) {
      prices.push(depthMap.buy[i].price)
      amountsBuy.push(depthMap.buy[i].totalamount)
      amountsSell.unshift('-')
    }

    prices.push(depthMap.lastprice)
    amountsBuy.push(0)
    amountsSell.push(0)

    for (let i = 0; i < depthMap.sell.length; i++) {
      prices.push(depthMap.sell[i].price)
      amountsSell.push(depthMap.sell[i].totalamount)
      amountsBuy.push('-')
    }

    return { prices, amountsBuy, amountsSell }
  }

  render() {
    const { prices, amountsBuy, amountsSell } = this.processData()

    const option = {
      title: {
        show: false,
      },
      color: [common.askColor, common.bidColor],
      backgroundColor: 'transparent',
      legend: {
        show: true,
        type: 'plain',
        top: 10,
        padding: [0, 0, 0, 0],
        itemGap: 40,
        itemWidth: 13,
        selectedMode: false,
        backgroundColor: 'transparent',
        data: [{
          name: '买入',
          icon: 'rect',
          textStyle: {
            color: common.placeholderColor,
          },
        }, {
          name: '卖出',
          icon: 'rect',
          textStyle: {
            color: common.placeholderColor,
          },
        }],
      },
      grid: {
        show: true,
        left: common.margin10,
        top: common.margin10,
        right: common.margin10,
        bottom: 1,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderWidth: 0,
        tooltip: {
          show: true,
          trigger: 'item',
          position: 'inside',
          backgroundColor: 'red',
        },
      },
      xAxis: {
        show: true,
        gridIndex: 0,
        position: 'bottom',
        offset: 0,
        type: 'category',
        inverse: false,
        boundaryGap: false,
        min: 92,
        max: 100,
        slient: false,
        data: prices,
        axisLine: {
          show: true,
          symbol: 'arrow',
          lineStyle: {
            color: common.placeholderColor,
          },
        },
        axisTick: {
          show: true,
          inside: true,
          length: 0,
        },
        axisLabel: {
          show: true,
          interval: () => false,
          inside: true,
        },
        splitLine: {
          show: false,
        },
      },
      yAxis: [
        {
          show: true,
          position: 'left',
          offset: 0,
          type: 'value',
          boundaryGap: false,
          scale: true,
          minInterval: 1,
          maxInterval: 3600 * 24 * 1000,
          // interval: 254,
          silent: false,
          axisLine: {
            show: true,
            onZero: true,
            lineStyle: {
              color: common.placeholderColor,
            },
          },
          axisTick: {
            show: true,
            inside: true,
            lineStyle: {
              type: 'dashed',
              width: 0,
            },
          },
          axisLabel: {
            show: true,
            inside: true,
            margin: 5,
            formatter: '{value}',
            showMinLabel: true,
            showMaxLabel: true,
            color: common.placeholderColor,
            fontSize: 14,
          },
          splitLine: {
            show: false,
          },
        }, {
          show: true,
          position: 'right',
          axisLine: {
            show: true,
            onZero: true,
            lineStyle: {
              color: common.placeholderColor,
            },
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
        },
      ],
      tooltip: {
        show: true,
        trigger: 'axis',
        axisPointer: {
          show: true,
          type: 'line',
          axis: 'x',
          snap: true,
          label: {
            show: true,
            precision: 2,
            formatter: 'useless....',
            margin: 0,
            color: 'red',
          },
          lineStyle: {
            color: 'transparent',
            width: 0,
          },
        },
        showContent: true,
        alwaysShowContent: false,
        triggerOn: 'mousemove|click',
        hideDelay: 5,
        enterable: false,
        snapshot: true,
        confine: true,
        transitionDuration: 0.3,
        formatter: params => {
          if (params[0].data !== '-') {
            const name = Number(params[0].name).toString()
            const data = params[0].data
            const str = '价格: ' + name + '<br />数量: ' + data
            return str
          }
          const name = Number(params[1].name).toString()
          const data = params[1].data
          const str = '价格: ' + name + '<br />数量: ' + data
          return str
        },
        data: [{
          name: 'aa',
          icon: 'circle',
          textStyle: {
            color: 'red',
          },
        }],
      },
      series: [{
        type: 'line',
        name: '买入',
        coordinateSystem: 'cartesian2d',
        hoverAnimation: true,
        legendHoverLink: true,
        cursor: 'pointer',
        connectNulls: true,
        clipOverflow: true,
        lineStyle: {
          normal: {
            color: common.redColor,
            width: 1,
          },
        },
        areaStyle: {
          normal: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'rgba(205,0,0,0.9)',
              }, {
                offset: 0.5, color: 'rgba(205,0,0,0.6)',
              }, {
                offset: 1, color: 'rgba(205,0,0,0.3)',
              }],
            },
            origin: 'auto',
          },
        },
        smooth: true,
        data: amountsBuy,
        animation: false,
      }, {
        name: '卖出',
        type: 'line',
        smooth: true,

        lineStyle: {
          normal: {
            color: common.greenColor,
            width: 1,
          },
        },
        areaStyle: {
          normal: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'rgba(0,205,0,0.9)',
              }, {
                offset: 0.5, color: 'rgba(0,205,0,0.6)',
              }, {
                offset: 1, color: 'rgba(0,205,0,0.3)',
              }],
            },
          },
        },
        data: amountsSell,
        animation: false,
      }],
    }
    return (
      <Echarts
        option={option}
        width={common.sw}
        height={common.sw * common.sw / common.sh}
      />
    )
  }
}

function mapStateToProps(store) {
  return {
    depthMap: store.delegate.depthMap,
  }
}

export default connect(
  mapStateToProps,
)(Depth)