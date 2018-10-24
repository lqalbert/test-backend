<template>
    <div>
        <div id="myChart" :style="{width: '100%',height: '600px'}"></div>
    </div>
</template>

<script>/* eslint-disable no-mixed-spaces-and-tabs */
import PageMix from '../../mix/Page'
import config from '../../mix/Delete'
import SearchTool from '../../mix/SearchTool'
import DataTable from '../../mix/DataTable'
export default {
  name: 'Register',
  mixins: [PageMix, DataTable, config, SearchTool],
  data() {
    return {
      ajaxProxy: '',
      mainurl: '',
      mainparam: '',
      total: '100',
      dataLoad: false,
      searchForm: {}
    }
  },
  methods: {
    getAjaxProxy() {
      return this.ajaxProxy
    },
    drawLine() {
      const dataAxis = ['点', '击', '柱', '子', '或', '者', '两', '指', '在', '触', '屏', '上', '滑', '动', '能', '够', '自', '动', '缩', '放']
      const data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220]
      const yMax = 500
      const dataShadow = []
      for (let i = 0; i < data.length; i++) {
      	dataShadow.push(yMax)
      }
      const myChart = this.$echarts.init(document.getElementById('myChart'))
      myChart.setOption({
        title: {
          text: '特性示例：渐变色 阴影 点击缩放',
          left: 'center',
          subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
        },
        xAxis: {
          data: dataAxis,
          axisLabel: {
          	inside: true,
            textStyle: {
              color: '#fff'
            }
          },
          axisTick: {
          	show: false
          },
          axisLine: {
          	show: false
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
          	show: false
          },
          axisLabel: {
          	textStyle: {
              color: '#999'
            }
          }
        },
        dataZoom: [
          {
          	type: 'inside'
          }
        ],
        series: [
          {
          	type: 'bar',
            itemStyle: {
              normal: { color: 'rgba(0,0,0,0.05' }
            },
            barGap: '-100%',
            barCategoryGap: '40%',
            data: dataShadow,
            animation: false
          },
          {
          	type: 'bar',
            itemStyle: {
              normal: {
              	color: new this.$echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#83bff6' },
                    { offset: 0.7, color: '#2378f7' },
                    { offset: 1, color: '#83bff6' }
                  ]
                )
              },
              emphasis: {
              	color: new this.$echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#2378f7' },
                    { offset: 0.7, color: '#2378f7' },
                    { offset: 1, color: '#188df0' }
                  ]
                )
              }
            },
            data: data
          }
        ]
      })
      const zoomSize = 6
      myChart.on('click', function(params) {
        console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)])
        myChart.dispatchAction({
          type: 'dataZoom',
          startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
          endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
        })
      })
    }
  },
  created() {},
  mounted() {
  	this.drawLine()
  }
}
</script>

<style scoped>

</style>