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
                                   @click="createPacket">添加讲师
                        </el-button>
                    </el-form-item>

                    <el-form-item label="称号" prop="teacher_title">
                        <el-select v-model="searchForm.teacher_title" placeholder="请选择">
                            <el-option
                              v-for="item in teacherTitleList"
                              :key="item"
                              :label="item"
                              :value="item">
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
                    <el-table-column prop="teacher_name" label="讲师" align="center" width="200px"> </el-table-column>
                    <el-table-column prop="introduction" label="简介" align="center" width="200px"> </el-table-column>
                    <el-table-column prop="code_book" label="证书编号" align="center" width="200px"> </el-table-column>
                    <el-table-column prop="teacher_title" label="老师称号" align="center" > </el-table-column>
                    <el-table-column prop="focus_number" label="关注的人数" align="center" > </el-table-column>
                    <el-table-column prop="teacher_img" label="照片"  align="center">
                        <template slot-scope="scope">
                            <img :src="imgLink+scope.row.teacher_img" alt="" width="100px">
                        </template>
                    </el-table-column>

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
    import PacketAjaxProxy from '@/api/teacher'
    import Edit from './EditTeacher'
    import Add from './AddTeacher'
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
              teacher_title: '',
          },
          teacherTitleList: ['普通讲师','金牌讲师'],
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
          this.$modal.show('add-list', { List:[this.teacherTitleList]})
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
          this.$modal.show('edit-list', {List:[row,this.teacherTitleList]})
          
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