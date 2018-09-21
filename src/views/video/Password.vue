<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline" size="small">
                    <el-form-item>
                        <el-button type="primary" size="small" icon="el-icon-refresh"
                                   @click="refresh">
                        </el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="small" icon="search"
                                   @click="createPacket">添加密码
                        </el-button>
                    </el-form-item>
                    <el-form-item label="直播间房间号" prop="room_number">
                        <!-- <el-input size="small" placeholder="S000001"   disabled ></el-input> -->
                        <el-select v-model="searchForm.room_number" placeholder="请选择">
                            <el-option
                              v-for="item in roomList"
                              :key="item.room_number"
                              :label="item.room_number"
                              :value="item.room_number">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="密码状态" prop="status">
                        <!-- <el-input size="small" placeholder="S000001"   disabled ></el-input> -->
                        <el-select v-model="searchForm.status" placeholder="请选择">
                            <el-option
                              v-for="(item,index) in statusList"
                              :key="index"
                              :label="item"
                              :value="index">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="计时类型" prop="time_type">
                        <!-- <el-input size="small" placeholder="S000001"   disabled ></el-input> -->
                        <el-select v-model="searchForm.time_type" placeholder="请选择">
                            <el-option
                              v-for="(item,index) in timeTypeList"
                              :key="index"
                              :label="item"
                              :value="index">
                            </el-option>
                        </el-select>
                    </el-form-item>


                    <el-form-item>
                        <el-button type="primary" size="small" icon="search"
                                   @click="searchToolChange('searchForm')">查询
                        </el-button>
                        <el-button @click="searchToolReset('searchForm')"
                                   size="small" type="primary">重置
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        
        <el-row>
            <el-col :span="24">
                <TableProxy
                    :url="mainurl"
                    :param="mainparam"
                    :reload="dataTableReload"
                    height="600px"
                    @dbclick="actionThis"
                >
                    <el-table-column label="序号" align="center" type="index" width="65px"></el-table-column>
                    <el-table-column prop="room_number" label="直播间房间号" align="center" ></el-table-column>
                    <el-table-column prop="pwd_num" label="密码编号" align="center" ></el-table-column>

                    <el-table-column prop="time_type" label="时长" align="center"  width="320px">
                    	<template slot-scope="scope">
							<span v-if="scope.row.time_type==1">自领取开始计时{{scope.row.time_long}}小时</span>
							<div v-if="scope.row.time_type==2">
								<span>{{scope.row.start_time}}</span>
	                    		<!-- <br>至<br> -->至
	                    		<span>{{scope.row.end_time}}</span>
							</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="start_time" label="有效期" align="center" width="320px">
                    	<template slot-scope="scope">
                    		<span>{{scope.row.start_time}}</span>
                    		<!-- <br>至<br> -->至
                    		<span>{{scope.row.end_time}}</span>
							<!-- <span>{{scope.row.end_time}}</span> -->
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="nickname" label="用户" align="center" ></el-table-column> -->
                    <el-table-column prop="create_time" label="创建时间" align="center" width="100px"></el-table-column>

                    <el-table-column prop="pwd_status" label="密码状态" align="center" >
                        <template slot-scope="scope">
							<span>{{statusList[scope.row.pwd_status]}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column  label="操作" align="center" width="200">
                        <template slot-scope="scope">
                            <el-button type="danger" size="mini" round @click="endPacket(scope.row.id)" v-if="scope.row.pwd_status==1">提前结束</el-button>
                            <span  v-if="scope.row.pwd_status==2">已到期</span>
                            <span  v-if="scope.row.pwd_status==3">提前到期</span>
                        </template>
                    </el-table-column>
                </TableProxy>
            </el-col>
        </el-row>


        <Add name="add-list"
             :ajax-proxy="ajaxProxy"
             @submit-success="addPassword"/>

   
    </div>
</template>

<script>
    import PageMix from '@/mix/Page'
    import config from '@/mix/Delete'
    import SearchTool from '@/mix/SearchTool'
    import DataTable from '@/mix/DataTable'
    import TableProxy from '@/components/Commontable/Table'
    import LivePasswordAjaxProxy from '@/api/livepassword'
    import Add from './Add2'
    import APP_CONST from '@/config/index'

    export default {
      name: 'Videos',
      mixins: [PageMix, DataTable, config, SearchTool, LivePasswordAjaxProxy],
      components: { TableProxy, Add },
      data() {
        return {
          ajaxProxy: LivePasswordAjaxProxy,
          mainurl: LivePasswordAjaxProxy.getUrl(),
          mainparam: '',
          total: '100',
          dataLoad: false,
          searchForm: {
            status: '',
            room_number: '',
            time_type: ''
          },
          timeTypeList: {
            1: '固定时长',
            2: '固定日期'
          },
          statusList: {
            1: '正常状态',
            2: '已经过期',
            3: '提前到期'
          },
          roomList: [],
          imgLink: APP_CONST.BASE_URL
        }
      },
      methods: {
        getAjaxProxy() {
          return this.ajaxProxy
        },
        createPacket() {
          this.$modal.show('add-list', { roomList: this.roomList })
        },
        actionThis(row) {
          // this.$modal.show('edit-list', { model: row })
        },
        onSearchChange(param) {
          this.mainparam = JSON.stringify(param)
        },
        onSearchReset() {
          this.videoProxy.load()
        },
        alertShow(msg) {
          this.$message({
            message: msg,
            type: 'success'
          })
        },
        sendPacket(id) {
          this.$msgbox({
            title: '消息',
            message: '确定发放红包？？',
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(action => {
            LivePasswordAjaxProxy.update(id, '').then(pro => {
              this.alertShow(pro.msg)
              this.refresh()
            })
          })
        },
        endPacket(id) {
          this.$msgbox({
            title: '消息',
            message: '确定结束红包状态？？',
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(action => {
            LivePasswordAjaxProxy.delete(id).then(pro => {
              this.alertShow(pro.msg)
              this.refresh()
              // return;
            })
          })
        },
        refresh() {
          this.dataTableReload++
        },
        addPassword() {
          this.refresh()
        },
        getRoomList() {
          // console.log('getRoomList')
          LivePasswordAjaxProxy.find('1').then(response => {
            this.roomList = response.data
          }).catch(error => {

          })
        }
      },
      created() {
        this.$on('search-tool-change', this.onSearchChange)
        this.getRoomList()
      },
      mounted() {

      }

    }
</script>

<style>
</style>