<template>
    <div>
        <!--数据展示-->
        <commontable @addRow="openDialog" @handleDelete="handleDelete" @reload="reload" @handleEdit="handleEdit"
                     @search="search" @changeCurrent="handleCurrentChange" @changePagesize="handleSizeChange"
                     :ban-fields="banFields" :table-data="tableData" :table-title="tableTitle" :perpages="perpages"
                     :total="total">
        </commontable>

        <!--添加和编辑的对话框-->
        <div class="components-container">
            <el-dialog v-el-drag-dialog @dragDialog="handleDrag" title="直播间设置" :visible.sync="dialogTableVisible">
                <el-form :rules="rules" ref="addForm" :model="addForm" label-position="left" label-width="150px"
                         style='width: 400px; margin-left:50px;'>

                    <el-form-item :label="name" prop="name">
                        <el-input v-model="addForm.name" ></el-input>
                    </el-form-item>

                    <el-form-item :label="describe" prop="describe">
                        <el-input v-model="addForm.describe"></el-input>
                    </el-form-item>

                    <!--<el-form-item :label="img_url" prop="img_url">
                        <el-upload
                                class="upload-demo"
                                :action="url"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :before-remove="beforeRemove"
                                multiple
                                :limit="3"
                                :on-exceed="handleExceed"
                                :file-list="fileList">
                            <el-button size="small" articleType="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2000kb</div>
                        </el-upload>
                    </el-form-item>-->

                    <el-form-item :label="room_number" prop="room_number">
                        <el-input v-model="addForm.room_number"></el-input>
                    </el-form-item>

                    <el-form-item :label="college_id" prop="college_id">
                        <el-input v-model="addForm.college_id"></el-input>
                    </el-form-item>

                    <el-form-item :label="user_id" prop="user_id">
                        <el-input v-model="addForm.user_id"></el-input>
                    </el-form-item>

                    <el-form-item :label="status" prop="status">
                        <el-radio-group v-model="addForm.status">
                            <el-radio label="0" border>关闭</el-radio>
                            <el-radio label="1" border>启用</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>

                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible">取消</el-button>
                    <el-button type="primary" @click="confirms">确定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import { getData, handleDelete } from '@/api/table'
    import Commontable from '@/components/Commontable'
    import elDragDialog from '@/directive/el-dragDialog'
    import { create, show, findOne } from '@/api/studio'

    export default {
      name: 'studios',
      directives: { elDragDialog },
      dialogFormVisible: false,
      components: {
        Commontable
      },

      data() {
        return {
          url: '',
          dialogTableVisible: false,
          name: '直播间标题',
          describe: '直播间描述',
          room_number: '直播房间号',
          img_url: '直播封面图',
          college_id: '所属学院',
          user_id: '所属直播人',
          status: '是否启用',
          perpages: 0,
          cur_page: 0,
          total: 1,
          tableTitle: [],
          tableData: [],
          banFields: [],
          rules: {
            name: [{ required: true, message: '直播间标题必须填写', trigger: 'blur' }],
            room_number: [{ required: true, message: '直播房间号必须填写', trigger: 'blur' }],
            college_id: [{ required: true, message: '所属学院必须填写', trigger: 'blur' }],
            user_id: [{ required: true, message: '所属直播人必须填写', trigger: 'blur' }],
            status: [{ required: true, message: '请选择是否启用', trigger: 'blur' }]
          },
          addForm: {},
          options: [],
          fileList: []

        }
      },
      mounted() {
        this.getData()
      },
      computed: {},
      methods: {
        handleDrag() {
          // this.$refs.select.blur()
        },

        // 请求可添加的角色类型
        canHandle() {
          getRoles().then(response => {
            this.options = response.data
          }).catch(error => {
            console.log(error)
          })
        },

        // 确认提交
        confirms() {
          create(this.addForm).then(response => {
            this.getData()
          }).catch(error => {
            console.log(error)
          })

          this.dialogTableVisible = false
        },
        dialogFormVisible() {
          this.dialogTableVisible = false
        },
        openDialog() {
          this.dialogTableVisible = true
          this.addForm = {
            status: '0'
          }
          this.canHandle()
        },
        // 当前页码
        handleCurrentChange: function(val) {
          this.cur_page = val
          this.getData()
        },
        // 每页条数
        handleSizeChange: function(val) {
          this.perpages = val
          this.getData()
        },
        // 查询搜索
        search: function(val) {
          this.cur_page = 0
          this.searchForm = JSON.stringify(val)
          console.log(val)
          this.getData()
        },
        // 编辑
        handleEdit: function(row) {
          this.dialogTableVisible = true
          findOne(row.id).then(response => {
            this.addForm = response.data
            this.addForm.password = ''
            // this.addForm.parent_id=undefined
          }).catch(error => {
            console.log(error)
          })
          this.canHandle()
        },
        // 删除一条
        handleDelete(ids) {
          if (ids.length < 1) {
            alert('请先选择一条数据！')
          } else {
            if (confirm('确认删除？')) {
              handleDelete('/studios/delete', JSON.stringify(ids)).then(response => {
                this.searchForm = ''
                this.cur_page = 0
                this.getData()
              }).catch(error => {
                console.log(error)
              })
            }
          }
        },
        // 重置
        reload() {
          this.searchForm = ''
          this.getData()
        },
        // 获取数据
        getData() {
          getData('/studios/show', this.perpages, this.cur_page, this.searchForm).then(response => {
            this.tableTitle = response.fields
            this.tableData = response.data.data
            this.perpages = response.data.per_page
            this.total = response.data.total
          }).catch(error => {
            console.log(error)
          })
        },
        handleRemove(file, fileList) {
          console.log(file, fileList)
        },
        handlePreview(file) {
          console.log(file)
        },
        handleExceed(files, fileList) {
          this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
        },
        beforeRemove(file, fileList) {
          return this.$confirm(`确定移除 ${file.name}？`)
        }
      }
    }
</script>
<style scoped>


</style>


