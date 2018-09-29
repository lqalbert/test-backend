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
                                   @click="createPacket">添加直播间广告
                        </el-button>
                    </el-form-item>

                    <el-form-item label="直播间" prop="room_number">
                        <el-select v-model="searchForm.room_number" placeholder="请选择">
                            <el-option
                              v-for="(item,index) of roomList"
                              :key="item.room_number"
                              :label="item.room_number"
                              :value="item.room_number">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="状态" prop="status">
                        <el-select v-model="searchForm.status" placeholder="请选择">
                            <el-option
                              v-for="(item,index) of  statusList"
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
                    <el-table-column prop="live_ad_name" label="名称" align="center" width="200px"> </el-table-column>
                    <el-table-column prop="url_addr" label="名称" align="center" width="200px"> </el-table-column>
                    <el-table-column prop="url_img" label="广告图"  align="center">
                        <template slot-scope="scope">
                            <img :src="imgLink+scope.row.url_img" alt="" width="100px">
                        </template>
                    </el-table-column>
                    <el-table-column prop="room_number" label="直播间" align="center" width="200px"> </el-table-column>
  
                    <el-table-column prop="status" label="广告启用" align="center" width="100px">
                      <template slot-scope="scope">
                          <el-switch
                                  v-model="scope.row.status"
                                  active-value="y"
                                  inactive-value="n"
                                  active-color="#13ce66"
                                  inactive-color="#ff4949"
                                  @change="changeStatus(scope.row)"
                          >
                          </el-switch>
                      </template>

                    </el-table-column>
                    
                   
                    <el-table-column  label="操作" align="center" width="200">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" round @click="editCourse(scope.row)" >修改</el-button>
                            <el-button type="danger" size="mini" round @click="deleCourse(scope.row.id,scope.row.status)" >删除</el-button>
                            <span  v-if="scope.row.packet_status==3">已结束</span>
                        </template>
                    </el-table-column>
                </TableProxy>
            </el-col>
        </el-row>


        <Add name="add-list"
             :ajax-proxy="ajaxProxy"
             @submit-success="addCourseSucess"/>

        <Edit name="edit-list"
              :ajax-proxy="ajaxProxy"
              @submit-success="editCourseSucess"/>

    </div>
</template>

<script>
    import PageMix from '@/mix/Page'
    import config from '@/mix/Delete'
    import SearchTool from '@/mix/SearchTool'
    import DataTable from '@/mix/DataTable'
    import TableProxy from '@/components/Commontable/Table'
    import PacketAjaxProxy from '@/api/livead'
    import Edit from './EditLivead'
    import Add from './AddLivead'
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
          },
          roomList: [],
          statusList: {
            y: '启用中',
            n: '未启用',
          },
          imgLink: APP_CONST.BASE_URL
        }
      },
      methods: {
        getAjaxProxy() {
          return this.ajaxProxy
        },
        createPacket() {
          this.$modal.show('add-list', { List:[this.roomList]})
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
        editCourse(row) {
          this.$modal.show('edit-list', {List:[row,this.roomList,]})
        },
        deleCourse(id,status) {
          if(status=='y')return this.$message.error('该广告启动中，不能删除');
          this.$msgbox({
            title: '消息',
            message: '确定结束红包状态？？',
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(action => {
            PacketAjaxProxy.delete(id).then(pro => {
              this.$message.success('删除成功');              
              this.refresh()
              // return;
            }).catch(error=>{
              // console.log(error.code)
              this.$message.error('删除失败');
            })
          })
        },
        /*广告启用*/
        changeStatus(data) {
          const vmthis = this;
          const data1={type:'status',status:data.status};
          this.ajaxProxy.update(data.id, data1).then(function(response) {
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
        refresh() {
          this.dataTableReload++
        },
        getRoomList() {
          // console.log('getRoomList')
          PacketAjaxProxy.find('1').then(response => {
              console.log()
            this.roomList = response.data
          }).catch(error => {

          })
        },
        addCourseSucess() {
            this.refresh();
        },
        editCourseSucess() {
            this.refresh();
        },
      },
      created() {
        this.$on('search-tool-change', this.onSearchChange)
        this.getRoomList();

      },
      mounted() {

      }

    }
</script>

<style>
</style>