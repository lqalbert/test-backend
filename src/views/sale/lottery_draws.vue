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
                                   @click="createLotteryDraw">添加奖品
                        </el-button>
                    </el-form-item>                    
                    <el-form-item>
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
                    <el-table-column prop="content" label="奖励文字" align="center" ></el-table-column>
                    <el-table-column prop="img_url" label="奖励配图" align="center">
                        <template slot-scope="scope">
                            <img :src="imgLink+scope.row.img_url" alt="" width="100px" >
                            <!-- <img style="height:20px;" src="http://www.boroboromi.com/images/qr-code.png" alt=""> -->
                        </template>
                    </el-table-column>
                    <el-table-column prop="scores" label="积分" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.lottery_draws_type=='1'">{{scope.row.scores}}</span>
                            <span v-if="scope.row.lottery_draws_type=='2'">-</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="lottery_draws_type" label="奖品类型" align="center" width="104px">
                        <template slot-scope="scope">
                            <div>{{typeList[scope.row.lottery_draws_type]}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="所属学院" align="center" v-if="showCollege"></el-table-column>
                    <el-table-column prop="created_at" label="创建时间" align="center" width="101px"></el-table-column>
                    
                    <el-table-column  label="操作" align="center" width="200">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" round @click="editLotteryDraw(scope.row)" >修改</el-button>
                            <el-button type="danger" size="mini" round @click="deleteLotteryDraw(scope.row.id)" >删除</el-button>
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
    import PacketAjaxProxy from '@/api/lottery_draws'
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
          typeList:{
                1: '积分',
                2: '物品',
          },
          imgLink: APP_CONST.BASE_URL,
          showCollege:false
        }
      },
      methods: {
        getAjaxProxy() {
          return this.ajaxProxy
        },
        createLotteryDraw() {
          this.$modal.show('add-list', { roomList: this.roomList })
        },
        editLotteryDraw(row) {
          this.$modal.show('edit-list', { row: row})
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
        deleteLotteryDraw(id) {
          var self=this;
          this.$msgbox({
            title: '消息',
            message: '删除该奖品',
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
        /*获取直播间列表  弃用*/
        getRoomList() {
          // console.log('getRoomList')
          // PacketAjaxProxy.find('1').then(response => {
          //     console.log()
          //   this.roomList = response.data
          // }).catch(error => {

          // })
        },
        getShowCollege(){
            if(this.$store.getters.roles['0']=='administrator'){
                return this.showCollege=true;
            }
        }
      },
      created() {
        this.$on('search-tool-change', this.onSearchChange)
        this.getShowCollege()
        // this.searchForm.user_id=this.$store.getters.user_id;
        // this.getRoomList()
      },
      mounted() {

      }

    }
</script>

<style>
</style>