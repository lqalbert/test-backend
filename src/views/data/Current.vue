<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline" size="small">
                    <el-form-item label="房间名" prop="name">
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
                    <el-form-item>
                        <el-button type="primary" size="small" icon="search"
                                   @click="searchData()">查询
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <div id="myChart" :style="{width: '60%',height: '400px'}"></div>
        <div  style="width:60%">
	       	<el-table
				:data="tableData3"
				
				border
				style="width: 100%">
				<el-table-column
				prop="nickname"
				label="用户"
				width="180">
				</el-table-column>
				<el-table-column
				prop="role_comment"
				label="身份"
				width="180">
				</el-table-column>
				<el-table-column
				prop="cid_name"
				label="所属公司">
				</el-table-column>
	       	</el-table>
        	<el-pagination
        		background
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="searchForm.currentPage"
				:page-sizes="[5, 10, 20, 50]"
				:page-size="searchForm.pagezise"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total">
    	    </el-pagination>
        </div>
    </div>
</template>

<script>/* eslint-disable no-mixed-spaces-and-tabs */
import PageMix from '../../mix/Page'
import config from '../../mix/Delete'
import SearchTool from '../../mix/SearchTool'
import DataTable from '../../mix/DataTable'
import CollegeArray from '../../packages/CollegeProxy'
import OnlineProxy from '../../packages/OnlineProxy'
export default {
	name: 'current',
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
				currentPage:1,
				pagezise:5,
			    
			},
			college: [],
			dataLists: [],
			tableData3: [
		    ],
		    total:0,

		}
	},
  	methods: {
	    getAjaxProxy() {
	      return this.ajaxProxy
	    },
	    drawLine() {
	      const valueList = this.dataLists
	      // console.log(valueList)

	      // const dataList = []
	      // const valueList = [0,0,0,0,0]
	      // for (let i = 0; i < data.length; i++) {
	      // 	dataList.push(data[i][1])
	      //   valueList.push(data[i][0])
	      // }
	      const myChart = this.$echarts.init(document.getElementById('myChart'))
	      myChart.setOption({
	        title: { left: 'center', text: '在线用户' },
	        grid: {
	          	left: 40,
	          	right: 30,
	           	containLabel: true
	        },
	        tooltip: {
	          	trigger: 'axis',
	          	axisPointer: {
		          	type: 'shadow',
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
	          // data: dataList,
	          	data: ['总人数','公司管理员', '房间管理者', '组长','业务员', '会员'],
	          	axisTick: {
	                alignWithLabel: true
	            },
	          	axisPointer: {
	          		type: 'shadow'
	          	},
	          	// boundaryGap: false,
	          	axisTick: {
	                alignWithLabel: true
	            }
	        },
	        yAxis: [
	          	{
	          		type: 'value',
	            	name: '在线人数'
	          	}
	        ],
	        series: [{
	          	name: '在线人数',
	          	type: 'bar',
	          	barWidth:'40%',
	          	data: valueList
	          	// data: [400,10, 52, 200, 334]
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
			// console.log(param.data,222)
			this.dataLists = param.data
			this.total=param.total
			this.tableData3=param.items

			this.drawLine()
	    },
	    loadUserData() {
			const userData = new OnlineProxy({ currentPage: this.searchForm.currentPage,pagezise: this.searchForm.pagezise }, this.initUserData, this)
			// console.log(userData)
			this.OnlineProxy = userData
			this.OnlineProxy.load()
	    },
	    searchData() {
			const userData = new OnlineProxy({ currentPage: this.searchForm.currentPage,pagezise: this.searchForm.pagezise, cid: this.searchForm.college_id }, this.initUserData, this)
			this.OnlineProxy = userData
			this.OnlineProxy.load()
	    },
	    handleSizeChange(value){
	    	this.searchForm.pagezise=value
	    	this.searchData()
	    },
	    handleCurrentChange(){
	    	this.searchData()
	    }
	    
  	},
  	created() {
  	},
  	mounted() {
	    // 加载公司列表
	    this.loadCollege()
	    // 加载数据
	    this.loadUserData()
  	}
}
</script>

<style scoped>
 	el-pagination{
 		margin-top: 20px;
 	}
</style>