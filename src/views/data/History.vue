<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline" size="small">
                    <el-form-item v-if="role=='administrator'" label="公司名" prop="name">
                        <el-select v-model="searchForm.college_id" placeholder="请选择">
                            <el-option key="0" label="全部" value="0"></el-option>
                            <el-option
                                    v-for="item in college"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="月份" prop="month" >
                        <el-date-picker
                                v-model="searchForm.date"
                                type="month"
                                :clearable="false"
                                value-format="yyyy-MM"
                                placeholder="选择月">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="small" icon="search"
                                   @click="searchData()">查询
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <div id="myChart" :style="{width: '100%',height: '600px'}"></div>
    </div>
</template>

<script>/* eslint-disable no-mixed-spaces-and-tabs */
import PageMix from '../../mix/Page'
import config from '../../mix/Delete'
import SearchTool from '../../mix/SearchTool'
import DataTable from '../../mix/DataTable'
import CollegeArray from '../../packages/CollegeProxy'
import UserDataProxy from '../../packages/UserDataProxy'
export default {
  name: 'History',
  mixins: [PageMix, DataTable, config, SearchTool],
  data() {
    return {
      ajaxProxy: '',
      mainurl: '',
      mainparam: '',
      total: '100',
      dataLoad: false,
      searchForm: {
        college_id: '0',
        date: ''
      },
      college: [],
      dataLists: [],
      role: '',
      cid: '',
      userID: ''
    }
  },
  methods: {
    getAjaxProxy() {
      return this.ajaxProxy
    },
    drawLine() {
      const data = this.dataLists
      const dataList = []
      const valueList = []
      for (let i = 0; i < data.length; i++) {
        dataList.push(data[i][1])
        valueList.push(data[i][0])
      }
      const myChart = this.$echarts.init(document.getElementById('myChart'))
      myChart.setOption({
        title: { left: 'center', text: '用户登录数据统计' },
        grid: {
          left: 40,
          right: 30
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        xAxis: {
          type: 'category',
          data: dataList,
          axisPointer: {
            type: 'shadow'
          },
          boundaryGap: false
        },
        yAxis: [
          {
            type: 'value',
            name: '会员'
          }
        ],
        series: [{
          name: '登录会员',
          type: 'line',
          data: valueList
        }]
      })
    },
    initCollege(data) {
      this.college = data.items
    },
    loadCollege() {
      const college = new CollegeArray({}, this.initCollege, this)
      this.collegeProxy = college
      this.collegeProxy.load()
    },
    initUserData(param) {
      this.dataLists = param.items
      this.drawLine()
    },
    loadUserData() {
      const userData = new UserDataProxy({ date: this.searchForm.date, cid: this.cid, role: this.role, userID: this.userID }, this.initUserData, this)
      this.userDataProxy = userData
      this.userDataProxy.load()
    },
    searchData() {
      const userData = new UserDataProxy({ date: this.searchForm.date, cid: this.searchForm.college_id, role: this.role, userID: this.userID }, this.initUserData, this)
      this.userDataProxy = userData
      this.userDataProxy.load()
    },
    initMonth() {
      this.role = this.$store.getters.roles[0]
      if (this.role == 'administrator') {
      	this.cid = 0
      } else {
        this.cid = this.$store.getters.company_id
      }
      this.userID = this.$store.getters.user_id
      const date = new Date()
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      if (month < 10) {
        this.searchForm.date = year.toString() + '-0' + month.toString()
      } else {
        this.searchForm.date = year.toString() + '-' + month.toString()
      }
    }
  },
  created() {
  },
  mounted() {
    // 初始化本月时间
    this.initMonth()
    // 加载公司列表
    this.loadCollege()
    // 加载数据
    this.loadUserData()
  }
}
</script>

<style scoped>

</style>