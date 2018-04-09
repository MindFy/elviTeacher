import React, { Component } from 'react'
import Echarts from 'native-echarts'
import { common } from '../common'

export default class KLine extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timeNum: 1,
      timeUnit: 'minute',
      // 数组元素内容：[日期，开盘价，收盘价，最低价，最高价，成交量，？？？]
      // respResult: ['2017-01-03', 17.6, 17.92, 17.57, 17.98, 28.00, 1, 0.00, 0.00, 0.00],
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
        o: [7888, 7594, 7593, 5429, 9418, 9159, 5258, 5085, 2953, 9230,
          4581, 4460, 4874, 5091, 9221, 2882, 1618, 3647, 6190, 9483],
        h: [7805, 6293, 1870, 1826, 9772, 5578, 1496, 2180, 6689, 6849,
          6211, 4110, 1893, 7575, 9527, 2484, 8188, 6235, 3545, 6698],
        l: [7629, 2406, 8194, 2402, 5622, 3270, 5615, 5903, 8905, 1110,
          4357, 3626, 1507, 8926, 4113, 6205, 1693, 5834, 7368, 6982],
        c: [3006, 6516, 4028, 8080, 3159, 4157, 3196, 6461, 2556, 7948,
          7949, 8715, 5706, 7609, 3084, 7924, 3008, 9836, 9518, 2830],
        v: [4459, 8290, 1345, 1864, 4847, 4409, 2139, 2604, 2716, 6289,
          7315, 4854, 3402, 2819, 7339, 2126, 5126, 9481, 4649, 4907],
        s: 'ok',
      },
    }
  }
  componentDidMount() {
    // this.timer = setInterval(() => {
    //   this.fetchData()
    // }, 5000)
  }

  getOption(optionData) {
    return {
      title: {
        show: false,
      },
      legend: {
        show: false,
      },
      backgroundColor: common.navBgColor,
      grid: [{
        left: common.margin10,
        top: 0,
        right: '12%',
        bottom: 10,
        height: '77%',
      }, {
        left: common.margin10,
        top: '80%',
        right: '12%',
        height: '20%',
      }],
      xAxis: [{
        position: 'bottom',
        type: 'category',
        min: 'dataMin',
        max: 'dataMax',
        axisLine: {
          lineStyle: {
            color: 'rgba(255,255,255,0.1)',
            width: 1,
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          margin: 0,
          // interval: 50,
          formatter: (value) => {
            const mm = value.substring(5, 7)
            const dd = value.substring(8, 10)
            return `${mm}/${dd}`
          },
          textStyle: {
            color: 'rgba(255,255,255,0.4)',
            fontSize: common.font10,
            align: 'center',
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255,255,255,0.1)',
            type: 'solid',
          },
        },
        axisPointer: {
          label: {
            formatter: '{value} xxx',
            margin: 0,
            color: 'red',
          },
        },
        data: optionData.categoryData,
      }, {
        gridIndex: 1,
        type: 'category',
        min: 'dataMin',
        max: 'dataMax',
        axisLine: {
          onZero: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        data: optionData.categoryData,
      }],
      yAxis: [{
        gridIndex: 0,
        position: 'right',
        scale: true,
        splitNumber: 4,
        axisLine: {
          onZeroAxisIndex: 0,
          lineStyle: {
            color: 'rgba(255,255,255,0.1)',
            width: 1,
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          margin: 0,
          formatter: value => Number(value).toFixed(2),
          textStyle: {
            color: 'rgba(255,255,255,0.4)',
            fontSize: common.font10,
            // verticalAlign: 'middle',
            // textAlign: '',
          },
          verticalAlign: 'bottom',
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(255,255,255,0.1)',
          },
        },
      }, {
        gridIndex: 1,
        position: 'left',
        axisLine: {
          show: true,
          onZeroAxisIndex: 0,
          lineStyle: {
            color: 'rgba(255,255,255,0.1)',
            width: 1,
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      }, {
        gridIndex: 1,
        position: 'right',
        scale: true,
        splitNumber: 2,
        axisLine: {
          show: true,
          onZeroAxisIndex: 0,
          lineStyle: {
            color: 'rgba(255,255,255,0.1)',
            width: 1,
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          margin: 0,
          formatter: (value, index) => {
            if (index === 2) {
              return ''
            }
            return `${Number(value / 1000).toFixed(1)}K`
          },
          textStyle: {
            color: 'rgba(255,255,255,0.4)',
            fontSize: common.font10,
          },
        },
        splitLine: {
          show: false,
        },
      }],
      dataZoom: [{
        type: 'inside',
        xAxisIndex: [0, 1],
      }, {
        type: 'inside',
      }],
      tooltip: {
        trigger: 'axis',
        showContent: false,
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: 'rgba(255,255,255,1)',
          },
        },
      },
      toolbox: {
        show: false,
      },
      visualMap: {
        show: false,
        seriesIndex: 3,
        dimension: 2,
        pieces: [{
          value: 1,
          color: common.greenColor,
        }, {
          value: -1,
          color: common.redColor,
        }],
      },
      series: [{
        type: 'candlestick',
        name: '日K图',
        hoverAnimation: false,
        barMinWidth: '50%',
        barMaxWidth: '50%',
        data: optionData.values,
        itemStyle: {
          normal: {
            color: common.redColor,
            color0: common.greenColor,
            borderColor: null,
            borderColor0: null,
          },
        },
        barWidth: '30%',
      }, {
        name: 'MA5',
        type: 'line',
        data: this.calculateMA(5, optionData),
        smooth: true,
        lineStyle: {
          normal: {
            color: 'white',
          },
        },
      }, {
        name: 'MA10',
        type: 'line',
        data: this.calculateMA(10, optionData),
        smooth: true,
        lineStyle: {
          normal: {
            color: 'yellow',
          },
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

  // 数据处理
  splitData(result) {
    const categoryData = []
    const values = []
    const volumes = []
    if (result.t) {
      for (let i = 0; i < result.t.length; i++) {
        const date = new Date(result.t[i] * 1000)
        categoryData.push(`${date.getDate()}/${date.getDay()}`)
        // oclh
        const value = [result.o[i], result.c[i], result.l[i], result.h[i]]
        values.push(value)
        // 如果开盘价 > 收盘价，则表示阴线记为1，否则记为-1表示阳线
        const volume = [i, result.v[i], result.o[i] > result.c[i] ? 1 : -1]
        volumes.push(volume)
      }
    }

    return {
      categoryData,
      values,
      volumes,
    }
  }

  // 收盘价平均价格
  calculateMA(dayCount, optionData) {
    const result = []
    if (optionData.values) {
      for (let i = 0; i < optionData.values.length; i++) {
        if (i < dayCount) {
          result.push('-')
        } else {
          let sum = 0
          for (let j = 0; j < dayCount; j++) {
            sum += optionData.values[i - j][1]
          }
          // toFixed:四舍五入保留3位小数
          result.push(+(sum / dayCount).toFixed(3))
        }
      }
    }
    return result
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
