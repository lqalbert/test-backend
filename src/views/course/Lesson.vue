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
                                   @click="createPacket">添加系列
                        </el-button>
                    </el-form-item>
                    
                    <el-form-item label="系列" prop="course_id">
                        <el-select v-model="searchForm.course_id" placeholder="请选择">
                            <el-option
                              v-for="item in courseList"
                              :key="item.course_name"
                              :label="item.course_name"
                              :value="item.id">
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
                    <el-table-column prop="lesson_name" label="课程名称" align="center"></el-table-column>
                    <el-table-column prop="course_name" label="所属系列" align="center" width="100px"></el-table-column>
                    <el-table-column prop="introduce" label="简介" align="center"></el-table-column>
                    <el-table-column prop="url" label="课程地址" align="center"></el-table-column>
                    

                    <el-table-column  label="操作" align="center" width="200">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" round @click="editCourse(scope.row)" >修改</el-button>
                            <el-button type="danger" size="mini" round @click="deleCourse(scope.row.id)" >删除</el-button>
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
    import PacketAjaxProxy from '@/api/lesson'
    import Edit from './EditLesson'
    import Add from './AddLesson'
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
            course_id: '',
          },
          statusList: {
            1: '未发送',
            2: '抢包中',
            3: '已结束'
          },
          courseList: [],
          imgLink: APP_CONST.BASE_URL
        }
      },
      methods: {
        getAjaxProxy() {
          return this.ajaxProxy
        },
        createPacket() {
          this.$modal.show('add-list', { List:[this.courseList]})
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
          this.$modal.show('edit-list', {List:[row,this.courseList]})
          
        },
        deleCourse(id) {
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
              // return;
            })
          })
        },
        refresh() {
          this.dataTableReload++
        },
        getList(){
          PacketAjaxProxy.find('1').then(response => {
            this.courseList = response.data.courses
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
        this.getList()

      },
      mounted() {

      }

    }
</script>

<style>
</style>