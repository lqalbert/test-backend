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
                                   @click="createPacket">添加类型
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
                    <el-table-column prop="type_name" label="类型名称" align="center" ></el-table-column>
                    <el-table-column prop="nickname" label="创建人" align="center" ></el-table-column>
                    
                    <el-table-column  label="操作" align="center" width="200">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" round @click="editType(scope.row)" >修改</el-button>
                            <el-button type="danger" size="mini" round @click="deleteType(scope.row.id)" >删除</el-button>
                        </template>
                    </el-table-column>
                </TableProxy>
            </el-col>
        </el-row>


        <Add name="add-list"
             :ajax-proxy="ajaxProxy"
             @submit-success="addTypeSuccess"/>

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
    import PacketAjaxProxy from '@/api/coursetype'
    import Edit from './EditType'
    import Add from './AddType'
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
        editType(row) {
          this.$modal.show('edit-list', { model:row })
            
        },
        deleteType(id) {
          this.$msgbox({
            title: '消息',
            message: '删除？？',
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(action => {
            PacketAjaxProxy.delete(id).then(pro => {
              this.alertShow(pro.data.msg)
              this.refresh()
            })
          })
        },
        refresh() {
          this.dataTableReload++
        },
        addTypeSuccess() {
          this.refresh();
        },
      },
      created() {
        this.$on('search-tool-change', this.onSearchChange)
      },
      mounted() {

      }

    }
</script>

<style>
</style>