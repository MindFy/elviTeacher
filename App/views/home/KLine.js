import React, { Component } from 'react'
import Echarts from 'native-echarts'
import { common } from '../common'

export default class KLine extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // 日期，开盘价，最高价，最低价，收盘价，成交量，成功
      respResult: {
        t: [
          1521788400,
          1521874800,
          1521961200,
          1522047600,
          1522134000,
          1522220400,
          1522306800,
          1522393200,
          1522479600,
          1522566000,
        ],
        o: [7888, 7594, 7593, 5429, 9418, 9159, 5258, 5085, 2953, 9230],
        h: [7805, 6293, 1870, 1826, 9772, 5578, 1496, 2180, 6689, 6849],
        l: [7629, 2406, 8194, 2402, 5622, 3270, 5615, 5903, 8905, 1110],
        c: [3006, 6516, 4028, 8080, 3159, 4157, 3196, 6461, 2556, 7948],
        v: [4459, 8290, 1345, 1864, 4847, 4409, 2139, 2604, 2716, 6289],
        s: 'ok',
      },
    }
  }

  getOption(optionData) {
    return {
      backgroundColor: '#fff',
      title: {
        show: false,
      },
      animation: true,
      legend: {
        top: 10,
        left: 'center',
        data: ['MA5', 'MA10', 'MA20', 'MA30'],
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
      },
      axisPointer: {
        link: { xAxisIndex: 'all' },
        label: {
          backgroundColor: '#777',
        },
      },
      toolbox: {
        show: false,
      },
      brush: {
        xAxisIndex: 'all',
        brushLink: 'all',
        outOfBrush: {
          colorAlpha: 0.1,
        },
      },
      visualMap: {
        show: false,
        seriesIndex: 5,
        dimension: 2,
        pieces: [{
          value: 1,
          color: common.greenColor,
        }, {
          value: -1,
          color: common.redColor,
        }],
      },
      grid: [{
        left: '10%',
        right: '8%',
        height: '50%',
      }, {
        left: '10%',
        right: '8%',
        top: '63%',
        height: '16%',
      }],
      xAxis: [{
        type: 'category',
        data: optionData.categoryData,
        axisLine: { onZero: false },
        splitLine: { show: false },
        min: 'dataMin',
        max: 'dataMax',
        axisPointer: {
          z: 100,
        },
      }, {
        type: 'category',
        gridIndex: 1,
        data: optionData.categoryData,
        axisLine: { onZero: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        min: 'dataMin',
        max: 'dataMax',
        axisPointer: {
          label: {
            formatter(params) {
              return params.value
            },
          },
        },
      }],
      yAxis: [{
        scale: true,
        splitArea: {
          show: true,
        },
      }, {
        scale: true,
        gridIndex: 1,
        splitNumber: 2,
        axisLabel: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
      }],
      dataZoom: [{
        type: 'inside',
        xAxisIndex: [0, 1],
        minSpan: 20,
      }, {
        show: true,
        xAxisIndex: [0, 1],
        type: 'slider',
        top: '85%',
        start: 98,
        end: 100,
      }],
      series: [{
        name: '日K图',
        type: 'candlestick',
        data: optionData.values,
        itemStyle: {
          normal: {
            color: common.redColor,
            color0: common.greenColor,
            borderColor: null,
            borderColor0: null,
          },
        },
        barWidth: '80%',
        tooltip: {
          formatter(params) {
            const param = params[0]
            return [
              `Date: ${param.name}<hr size=1 style="margin: 3px 0">`,
              `Open: ${param.data[0]}<br/>`,
              `Close: ${param.data[1]}<br/>`,
              `Lowest: ${param.data[2]}<br/>`,
              `Highest: ${param.data[3]}<br/>`,
            ].join('')
          },
        },
      }, {
        name: 'MA5',
        type: 'line',
        data: this.calculateMA(5, optionData),
        smooth: true,
        lineStyle: {
          normal: { opacity: 0.5 },
        },
      }, {
        name: 'MA10',
        type: 'line',
        data: this.calculateMA(10, optionData),
        smooth: true,
        lineStyle: {
          normal: { opacity: 0.5 },
        },
      }, {
        name: 'MA20',
        type: 'line',
        data: this.calculateMA(20, optionData),
        smooth: true,
        lineStyle: {
          normal: { opacity: 0.5 },
        },
      }, {
        name: 'MA30',
        type: 'line',
        data: this.calculateMA(30, optionData),
        smooth: true,
        lineStyle: {
          normal: { opacity: 0.5 },
        },
      }, {
        name: 'Volume',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: optionData.volumes,
        barWidth: '80%',
      }],
    }
  }

  // 收盘价平均价格
  calculateMA(dayCount, optionData) {
    const result = []
    for (let i = 0; i < optionData.values.length; i += 1) {
      if (i < dayCount) {
        result.push('-')
      }
      let sum = 0
      for (let j = 0; j < dayCount; j++) {
        sum += optionData.values[i - j][1]
      }
      // toFixed:四舍五入保留3位小数
      result.push(+(sum / dayCount).toFixed(3))
    }
    return result
  }

  // 数据处理
  splitData(result) {
    const categoryData = []
    const values = []
    const volumes = []
    for (let i = 0; i < result.length; i += 1) {
      // splice做了两件事：
      // 1.移除数组第一个元素；
      // 2.以数组的形式返回数组第一个元素（还是一个数组，里面的第一个元素为日期）
      categoryData.push(result[i].splice(0, 1)[0])
      // slice：从数组中获取K线所需要的四个数据（o,c,l,h）(原数组不变，返回拷贝数组)
      values.push(result[i].slice(0, 4))
      // 三木运算逻辑：如果开盘价 > 开盘价，则表示阴线记为1，否则记为-1表示阳线
      volumes.push([i, result[i][4], result[i][0] > result[i][1] ? 1 : -1])
    }
    return {
      categoryData,
      values,
      volumes,
    }
  }

  render() {
    return (
      <Echarts
        option={this.getOption(this.splitData(this.state.respResult))}
        height={this.props.height}
        width={this.props.width}
      />
    )
  }
}
