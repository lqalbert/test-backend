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
                    <!-- <el-table-column prop="wx_code" label="详情" align="center">
                        <template slot-scope="scope">
                            <el-popover
                                placement="top-start"
                                title="标题"
                                width="200"
                                trigger="hover"
                                :content="'最大金额：'+scope.row.max_money+' 最大金额：'+scope.row.max_money+' 最大金额：'+scope.row.max_money">
                                <el-button type="primary" icon="el-icon-tickets" slot="reference">详情</el-button>
                            </el-popover>
                        </template>
                    </el-table-column> -->
                    <el-table-column prop="packet_type" label="红包类别" align="center" width="104px">
                        <template slot-scope="scope">
                            <div>{{typeList[scope.row.packet_type]}}</div>
                        </template>
                    </el-table-column>
                    
                    <!-- <el-table-column prop="nickname" label="创建人" align="center"></el-table-column> -->
                    <el-table-column prop="wx_code" label="客服二维码" align="center">
                        <template slot-scope="scope">
                            <img :src="imgLink+scope.row.wx_code" alt="" width="100px" >
                            <!-- <img style="height:20px;" src="http://www.boroboromi.com/images/qr-code.png" alt=""> -->
                        </template>
                    </el-table-column>
                    <el-table-column prop="room_number" label="直播间号" align="center"></el-table-column>
                    <el-table-column prop="name" label="所属学院" align="center" v-if="showCollege"></el-table-column>
                    
                    <el-table-column prop="create_time" label="创建时间" align="center" width="104px"></el-table-column>
                    <el-table-column prop="start_time" label="开始时间" align="center" width="104px">
                        <template slot-scope="scope">
                            <div v-if="scope.row.start_time">{{scope.row.start_time}}</div>
                            <div v-if="!scope.row.start_time">-</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="end_time" label="结束时间" align="center" width="104px">
                        <template slot-scope="scope">
                            <div v-if="scope.row.end_time">{{scope.row.end_time}}</div>
                            <div v-if="!scope.row.end_time">-</div>                    
                        </template>
                    </el-table-column>
                    <el-table-column prop="packet_status" label="状态" align="center">
                        <template slot-scope="scope">
                            <div>{{statusList[scope.row.packet_status]}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column  label="操作" align="center" width="200">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" round @click="sendPacket(scope.row.id)" v-if="scope.row.packet_status==1">发放红包</el-button>
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
            1: '未发送',
            2: '抢包中',
            3: '已结束'
          },
          typeList:{
                1: '积分红包',
                2: '现金红包',
          },
          roomList: [],
          imgLink: APP_CONST.BASE_URL,
          showCollege:false

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
          var self=this;
          // self.$message.error('pro.msg');
          // return;
          this.$msgbox({
            title: '消息',
            message: '确定发放红包？？',
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(action => {
            PacketAjaxProxy.update(id, '').then(pro => {
              this.alertShow(pro.msg)
              this.refresh()
            }).catch(error=>{
              self.$message.error('发送失败');
            })
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
              this.alertShow(pro.msg)
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
              console.log()
            this.roomList = response.data
          }).catch(error => {

          })
        },
        getShowCollege(){
            if(this.$store.getters.roles['0']=='administrator'){
                return this.showCollege=true;
            }
        }
      },
      created() {
        this.$on('search-tool-change', this.onSearchChange)
        // this.searchForm.user_id=this.$store.getters.user_id;
        this.getRoomList()
        this.getShowCollege()
      },
      mounted() {

      }

    }
</script>

<style>
</style>