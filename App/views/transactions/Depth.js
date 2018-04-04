import React, { Component } from 'react'
import Echarts from 'native-echarts'
import { common } from '../common'

export default class Depth extends Component {
  constructor(props) {
    super(props)
    this.state = {
      arr: [],
      xArr: [], // 存放坐标
      bids: [], // 存放买入累积数量
      asks: [], // 存放卖出累积数量
      resp: {
        asks: [
          ['0.07368599', 0.13293539],
          ['0.07368600', 17.1077],
          ['0.07369099', 27.5278],
          ['0.07370093', 5.69607974],
          ['0.07370097', 1.10047889],
          ['0.07370594', 60.75009399],
          ['0.07370595', 10],
          ['0.07371098', 0.5],
          ['0.07373610', 6.80674453],
          ['0.07374623', 0.31953083],
          ['0.07376099', 77.001],
          ['0.07380431', 0.01056541],
          ['0.07380983', 0.08],
          ['0.07383580', 0.94782],
          ['0.07387860', 0.97393],
          ['0.07388459', 0.01421125],
          ['0.07388840', 0.95597],
          ['0.07389500', 4],
          ['0.07389571', 11.34],
          ['0.07389656', 0.00884755],
          ['0.07391330', 0.97276],
          ['0.07392000', 27],
          ['0.07395960', 0.99102],
          ['0.07396140', 0.90226],
          ['0.07397148', 129.9859049],
          ['0.07397150', 0.91633],
          ['0.07397281', 275.278],
          ['0.07397900', 0.93206],
          ['0.07398447', 0.021],
          ['0.07398535', 0.48138905],
          ['0.07399379', 0.0014478],
          ['0.07399380', 0.90759],
          ['0.07399830', 0.97464],
          ['0.07400000', 0.01997],
          ['0.07401126', 12.7],
          ['0.07401755', 1.15194761],
          ['0.07404021', 0.00149681],
          ['0.07404502', 6.77525136],
          ['0.07407946', 0.13634009],
          ['0.07410173', 6.06833208],
          ['0.07410558', 0.01408034],
          ['0.07413427', 0.52952796],
          ['0.07413922', 10.64],
          ['0.07414804', 0.24635067],
          ['0.07414957', 4.8468],
          ['0.07416670', 0.549],
          ['0.07416985', 0.136616],
          ['0.07417729', 0.01280715],
          ['0.07417943', 7.40408675],
          ['0.07418300', 0.76]],
        bids: [
          ['0.07360180', 0.31348365],
          ['0.07358870', 0.75535],
          ['0.07358490', 0.81926],
          ['0.07356800', 0.8353],
          ['0.07355000', 17.1076],
          ['0.07354510', 0.8078],
          ['0.07353012', 2.60674753],
          ['0.07353010', 0.77529],
          ['0.07352260', 0.81272],
          ['0.07343002', 9.23597029],
          ['0.07342490', 3.19233448],
          ['0.07332258', 0.00218589],
          ['0.07327280', 6.77525136],
          ['0.07326292', 0.26600526],
          ['0.07323395', 1.098741],
          ['0.07319022', 120.41730875],
          ['0.07319021', 65.34847053],
          ['0.07319008', 10],
          ['0.07319000', 1.995],
          ['0.07317937', 0.17375792],
          ['0.07313660', 0.95711312],
          ['0.07310436', 27.5278],
          ['0.07310000', 3.91987813],
          ['0.07308814', 0.00886966],
          ['0.07308199', 0.00813206],
          ['0.07308026', 0.281098],
          ['0.07307310', 0.02921604],
          ['0.07306000', 0.05],
          ['0.07304149', 0.020461],
          ['0.07303584', 0.033],
          ['0.07303219', 6.79674778],
          ['0.07302907', 0.018156],
          ['0.07300001', 23.0583516],
          ['0.07300000', 97.90037672],
          ['0.07299929', 0.06982499],
          ['0.07299584', 11],
          ['0.07299504', 1],
          ['0.07298665', 0.82103357],
          ['0.07298573', 0.02577727],
          ['0.07298466', 0.54806037],
          ['0.07298000', 0.00685119],
          ['0.07297908', 0.02156931],
          ['0.07297782', 0.00137233],
          ['0.07297304', 0.23129068],
          ['0.07297066', 0.29155116],
          ['0.07297016', 0.247375],
          ['0.07296962', 0.03468909],
          ['0.07296920', 0.007598],
          ['0.07296900', 0.27916192],
          ['0.07296711', 0.01799715],
        ],
        isFrozen: '0',
        seq: 505303030,
      }, // 存放请求数据
    }
    this.processData(this.state.resp.bids, 'bids', true)
    this.processData(this.state.resp.asks, 'asks', false)
  }

  /* 逻辑处理 */
  processData(data, type, desc) {
    const list = data
    for (let i = 0; i < list.length; i++) {
      list[i] = {
        value: Number(list[i][0]),
        volume: Number(list[i][1]),
      }
    }

    list.sort((a, b) => {
      if (a.value > b.value) {
        return 1
      } else if (a.value < b.value) {
        return -1
      }
      return 0
    })

    if (desc) {
      for (let i = list.length - 1; i >= 0; i--) {
        if (i < (list.length - 1)) {
          list[i].totalvolume = list[i + 1].totalvolume + list[i].volume
        } else {
          list[i].totalvolume = list[i].volume
        }

        const dp = {}
        dp.value = list[i].value
        dp[`${type}volume`] = list[i].volume
        dp[`${type}totalvolume`] = list[i].totalvolume
        this.state.xArr.unshift(list[i].value)
        this.state.bids.unshift(list[i].totalvolume)
        this.state.asks.unshift('-')
        this.state.arr.unshift(dp)
      }
    } else {
      for (let i = 0; i < list.length; i++) {
        if (i > 0) {
          list[i].totalvolume = list[i - 1].totalvolume + list[i].volume
        } else {
          list[i].totalvolume = list[i].volume
        }

        const dp = {}
        dp.value = list[i].value
        dp[`${type}volume`] = list[i].volume
        dp[`${type}totalvolume`] = list[i].totalvolume
        this.state.xArr.push(list[i].value)
        this.state.asks.push(list[i].totalvolume)
        this.state.bids.push('-')
        this.state.arr.push(dp)
      }
    }
  }

  render() {
    if (!this.state.resp.bids) {
      return null
    }
    const option = {
      title: {
        show: false,
      },
      color: [common.bidColor, common.askColor],
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
        scale: false,
        slient: false,
        data: this.state.xArr,
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
          interval: 254,
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
          // axisPointer: {
          //   show: true,
          //   type: 'line',
          //   snap: true,
          //   label: {
          //     show: true,
          //   },
          //   triggerTooltip: true,
          // },
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
            type: 'dashed',
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
        formatter: (params) => {
          if (params[0].data !== '-') {
            const name = params[0].name
            const data = Number(params[0].data).toFixed(3)
            const str = `价格: ${name}+<br />+数量: ${data}`
            return str
          }
          const name = params[1].name
          const data = Number(params[1].data).toFixed(3)
          const str = `价格: ${name}+<br />+数量: ${data}`
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
            color: common.bidColor,
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
            origin: 'auto',
          },
        },
        smooth: true,
        data: this.state.bids,
        animation: false,
      }, {
        name: '卖出',
        type: 'line',
        smooth: true,

        lineStyle: {
          normal: {
            color: common.askColor,
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
          },
        },
        data: this.state.asks,
        animation: false,
      }],
    }
    return (
      <Echarts option={option} height={this.props.height} width={this.props.width} />
    )
  }
}
