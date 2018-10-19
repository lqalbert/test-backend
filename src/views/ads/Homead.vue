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
                                   @click="createPacket">添加广告
                        </el-button>
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
                    <el-table-column prop="home_ad_name" label="名称" align="center" width="200px"> </el-table-column>
                    <el-table-column prop="url_addr" label="跳转链接" align="center" width="200px"> </el-table-column>
                    <el-table-column prop="url_img" label="广告图"  align="center">
                        <template slot-scope="scope">
                            <img :src="imgLink+scope.row.url_img" alt="" width="100px">
                        </template>
                    </el-table-column>
                    

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
                    <el-table-column prop="name" label="名称" align="center" width="200px" v-if="showCollege"> </el-table-column>
                    
                   
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
    import PacketAjaxProxy from '@/api/homead'
    import Edit from './EditHomead'
    import Add from './AddHomead'
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
          statusList: {
            y: '启用中',
            n: '未启用',
          },
          imgLink: APP_CONST.BASE_URL,
          showCollege:false

        }
      },
      methods: {
        getAjaxProxy() {
          return this.ajaxProxy
        },
        createPacket() {
          this.$modal.show('add-list', { List:[]})
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
        editCourse(row) {
          this.$modal.show('edit-list', {List:[row,this.typeList,this.branchList,this.teacherList]})
          
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
              // this.alertShow(pro.msg)
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
        addCourseSucess() {
            this.refresh();
        },
        editCourseSucess() {
            this.refresh();
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


      },
      mounted() {

      }

    }
</script>

<style>
</style>