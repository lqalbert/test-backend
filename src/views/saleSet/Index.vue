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
                    <el-table-column label="序号" align="center" type="index" width="100px"></el-table-column>
                    <!-- <el-table-column prop="room_number" label="直播间号" align="center" ></el-table-column> -->
                    <el-table-column prop="room_number" label="直播间房间号" align="center" ></el-table-column>
                    <el-table-column prop="college_name" label="所属公司" align="center" ></el-table-column>
                    <el-table-column prop="draw_cores" label="抽奖消耗积分" align="center" ></el-table-column>
                    <el-table-column prop="draw_status" label="抽奖启用" width="120px" align="center">
                        <template slot-scope="scope">
                            <el-switch
                                    v-model="scope.row.draw_status"
                                    active-value="y"
                                    inactive-value="n"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                                    @change="changeStatus(scope.row,'draw_status')"
                            >
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column prop="cash_status" label="兑奖启用" width="120px" align="center">
                        <template slot-scope="scope">
                            <el-switch
                                    v-model="scope.row.cash_status"
                                    active-value="y"
                                    inactive-value="n"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                                    @change="changeStatus(scope.row,'cash_status')"
                            >
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column prop="live_wx_code" label="抽奖客服" width="120px" align="center">
                        <template slot-scope="scope">
                            <img :src="imgLink+scope.row.live_wx_code" v-if="scope.row.live_wx_code" alt="" width="100px">
                            <span v-if="!scope.row.live_wx_code">暂无二维码</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="200">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" round @click="editWxCode(scope.row)">修改</el-button>
                        </template>
                    </el-table-column>
                </TableProxy>
            </el-col>
        </el-row>
          
          <Edit name="edit-list"
              :ajax-proxy="ajaxProxy"
              @submit-success="editSucess"/>
   
    </div>
</template>

<script>
    import PageMix from '@/mix/Page'
    import config from '@/mix/Delete'
    import SearchTool from '@/mix/SearchTool'
    import DataTable from '@/mix/DataTable'
    import TableProxy from '@/components/Commontable/Table'
    import saleSetAjaxProxy from '@/api/saleSet'
    import Edit from './Edit'

    import APP_CONST from '@/config/index'

    export default {
      name: 'saleSet',
      mixins: [PageMix, DataTable, config, SearchTool, saleSetAjaxProxy],
      components: { TableProxy , Edit },
      data() {
        return {
          ajaxProxy: saleSetAjaxProxy,
          mainurl: saleSetAjaxProxy.getUrl(),
          mainparam: '',
          dataLoad: false,
          searchForm: {
            user_type: 'all'
          },
          typeList: [
            {name:'全部',item:'all'},
            {name:'真实用户',item:'real'},
            {name:'水军',item:'navy'},
          ],
          imgLink: APP_CONST.BASE_URL
        }
      },
      methods: {
          getAjaxProxy() {
               return this.ajaxProxy
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
          refresh() {
               this.dataTableReload++
          },
          changeStatus(data,name) {
               const vmthis = this
               this.ajaxProxy.update(data.id,{type:name,status:data[name]}).then(function(response) {
               if (response.data.code !== 200) {
                    vmthis.$message.error(response.data.msg ? response.data.msg : '操作失败')
               } else {
                    vmthis.$message.success(response.data.msg)
               }
               }).catch(function(error) {
                    console.log(error)
                    if (error.response.data.code && error.response.data.code === 422) {
                         const x = error.response.data
                         const message = []
                         for (const key in x) {
                              if (x.hasOwnProperty(key)) {
                                   const element = x[key]
                                   message.push(element)
                              }
                         }
                         vmthis.$message.error(message.join())
                    } else {
                         console.log(error)
                         vmthis.$message.error('出错了')
                    }
               })
          },
          editWxCode(row){
               this.$modal.show('edit-list', {List:[row]})

          },
          editSucess(){
               this.refresh()
          }
      },
      created() {
        this.$on('search-tool-change', this.onSearchChange)
        // this.getRoomList()
    },
      mounted() {

      }

    }
</script>

<style>
</style>