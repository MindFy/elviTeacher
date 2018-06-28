import React, { Component } from 'react'
import Echarts from 'native-echarts'
import { common } from '../../constants/common'
import transfer from '../../localization/utils'
import BigNumber from 'bignumber.js';

export default class Depth extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.depthMap !== nextProps.depthMap) {
      return true
    } else {
      return false
    }
  }

  processData(data) {
    const prices = [] // 存放坐标
    const amountsBuy = [] // 存放买入
    const amountsSell = [] // 存放卖出
    if (!data) {
      return { prices, amountsBuy, amountsSell }
    }

    for (let i = 0; i < data.buy.length; i++) {
      prices.push(new BigNumber(data.buy[i].price).toFixed())
      amountsBuy.push(new BigNumber(data.buy[i].totalamount).toFixed())
      amountsSell.unshift('-')
    }

    prices.push(new BigNumber(data.lastprice).toFixed())
    amountsBuy.push(0)
    amountsSell.push(0)

    for (let i = 0; i < data.sell.length; i++) {
      prices.push(new BigNumber(data.sell[i].price).toFixed())
      amountsSell.push(new BigNumber(data.sell[i].totalamount).toFixed())
      amountsBuy.push('-')
    }

    return { prices, amountsBuy, amountsSell }
  }

  caculateOptions(data) {
    const { prices, amountsBuy, amountsSell } = this.processData(data)
    const { language } = this.props
    return {
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
          name: transfer(language, 'history_buy'),
          icon: 'rect',
          textStyle: {
            color: common.placeholderColor,
          },
        }, {
          name: transfer(language, 'history_sell'),
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
          const seriesName = params[0].seriesName
          let price = ''
          let quality = ''
          if (seriesName === '买入') {
            price = '价格'
            quality = '数量'
          } else {
            price = 'Price'
            quality = 'Amount'
          }
          if (params[0].data !== '-') {
            const name = params[0].name
            const data = params[0].data
            return `${price}: ${name}<br />${quality}: ${data}`
          }
          const name = params[1].name
          const data = params[1].data
          return `${price}: ${name}<br />${quality}: ${data}`
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
        name: transfer(language, 'history_buy'),
        coordinateSystem: 'cartesian2d',
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
        data: amountsBuy,
        animation: false,
        smooth: 0.05,
      }, {
        name: transfer(language, 'history_sell'),
        type: 'line',
        smooth: 0.05,
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
  }

  render() {
    const { depthMap } = this.props
    const opts = this.caculateOptions(depthMap)
    return (
      <Echarts
        option={opts}
        width={common.sw}
        height={common.getH(263)}
        backgroundColor={"transparent"}
      />
    )
  }
}
