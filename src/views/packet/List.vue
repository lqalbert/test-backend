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
                                   @click="createPacket">添加红包
                        </el-button>
                    </el-form-item>
                    
                    <el-form-item label="红包状态" prop="status">
                        <el-select v-model="searchForm.status">
                            <el-option v-for="(item,index) in statusList" :key="index" :label="item" :value="index"> 
                            <!-- {{index}} -->
                            </el-option>
                        </el-select>
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
                    <el-table-column prop="total_num" label="总个数" align="center" ></el-table-column>
                    <el-table-column prop="off_num" label="剩余数目" align="center" ></el-table-column>
                    <el-table-column prop="total_money" label="总金额" align="center"></el-table-column>
                    <el-table-column prop="off_money" label="剩余金额" align="center"></el-table-column>
                    <el-table-column prop="max_money" label="最大金额" align="center"></el-table-column>
                    <el-table-column prop="min_money" label="最小金额" align="center"></el-table-column>
                    
                    <el-table-column prop="nickname" label="创建人" align="center"></el-table-column>
                    <el-table-column prop="wx_code" label="客服二维码" align="center">
                        <template slot-scope="scope">
                            <img :src="imgLink+scope.row.wx_code" alt="" width="100px" >
                            <!-- <img style="height:20px;" src="http://www.boroboromi.com/images/qr-code.png" alt=""> -->
                        </template>
                    </el-table-column>
                    <el-table-column prop="room_number" label="直播间号" align="center"></el-table-column>
                    <!-- <el-table-column prop="create_time" label="创建时间" align="center" width="100px"></el-table-column> -->
                    <!-- <el-table-column prop="start_time" label="开始时间" align="center" width="100px"></el-table-column> -->
                    <el-table-column prop="end_time" label="结束时间" align="center" width="100px">
                        <template slot-scope="scope">
                            <span v-if="scope.row.packet_status!=3">未结束</span>
                            <span v-if="scope.row.packet_status==3">{{scope.row.end_time}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="packet_status" label="状态" align="center">
                        <template slot-scope="scope">
                            <el-switch v-if="scope.row.packet_status!=3"
                                    v-model="scope.row.packet_status"
                                    active-value="2"
                                    inactive-value="1"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                                    @change="changeStatus(scope.row)"
                            >
                            </el-switch>
                            <span v-if="scope.row.packet_status==3">已结束</span>


                        </template>
                    </el-table-column>
                    <el-table-column  label="操作" align="center" width="200">
                        <template slot-scope="scope">
                            <el-button type="danger" size="mini" round @click="endPacket(scope.row.id)" v-if="scope.row.packet_status!=3">结束红包</el-button>
                            <span  v-if="scope.row.packet_status==3">已结束</span>
                        </template>
                    </el-table-column>
                </TableProxy>
            </el-col>
        </el-row>


        <Add name="add-list"
             :ajax-proxy="ajaxProxy"
             @submit-success="addPacket"/>

        <Edit name="edit-list"
              :ajax-proxy="ajaxProxy"
              @submit-success="handleReload"/>

    </div>
</template>

<script>
    import PageMix from '@/mix/Page'
    import config from '@/mix/Delete'
    import SearchTool from '@/mix/SearchTool'
    import DataTable from '@/mix/DataTable'
    import TableProxy from '@/components/Commontable/Table'
    import PacketAjaxProxy from '@/api/packet'
    import Edit from './Edit'
    import Add from './Add'
    import APP_CONST from '@/config/index'

    export default {
      name: 'Videos',
      mixins: [PageMix, DataTable, config, SearchTool, PacketAjaxProxy],
      components: { TableProxy, Add, Edit },
      data() {
        return {
          ajaxProxy: PacketAjaxProxy,
          mainurl: PacketAjaxProxy.getUrl(),
          mainparam: '',
          total: '100',
          dataLoad: false,
          searchForm: {
            status: '',
            room_number: ''
            // user_id:'',
          },
          statusList: {
            1: '关闭中',
            2: '开启中',
            3: '已结束'
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
        changeStatus(data) {
          const vmthis = this
          this.ajaxProxy.update(data.id,'').then(function(response) {
              vmthis.$message.success('操作成功')
          }).catch(function(error) {
              vmthis.$message.error('操作失败')
          })
        },
        endPacket(id) {
          var self=this;
          this.$msgbox({
            title: '消息',
            message: '确定结束红包状态？？',
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(action => {
            PacketAjaxProxy.delete(id).then(pro => {
              self.$message.success('结束成功');

              this.refresh()
            }).catch(error=>{
              self.$message.error('结束失败');
            })
          })
        },
        refresh() {
          this.dataTableReload++
        },
        addPacket() {
          this.refresh();
        },
        getRoomList() {
          // console.log('getRoomList')
          PacketAjaxProxy.find('1').then(response => {
              // console.log()
            this.roomList = response.data
          }).catch(error => {

          })
        }
      },
      created() {
        this.$on('search-tool-change', this.onSearchChange)
        // this.searchForm.user_id=this.$store.getters.user_id;
        this.getRoomList()
      },
      mounted() {

      }

    }
</script>

<style>
</style>