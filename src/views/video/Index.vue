<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline" size="small">
                    <el-form-item label="房间名" prop="name">
                        <el-input v-model="searchForm.name" placeholder="请输入房间名"></el-input>
                    </el-form-item>
                    <el-form-item label="房间号" prop="room_number" >
                        <el-input v-model="searchForm.room_number" placeholder="请输入房间号"></el-input>
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
            <el-col :span="24" style="margin-bottom: 15px">
                <el-button type="primary" @click="addRoom" v-if="role" size="small">创建直播间</el-button>
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
                    <el-table-column prop="name" label="直播间标题" width="120px" align="center"></el-table-column>
                    <el-table-column prop="describe" width="150px" label="直播间简介" align="center"></el-table-column>
                    <el-table-column prop="room_number" label="直播房间号" width="120px" align="center"></el-table-column>
                    <el-table-column prop="img_url" label="直播间封面" width="120px" align="center">
                        <template slot-scope="scope">
                            <img :src="imgLink+scope.row.img_url" alt="" width="100px">
                        </template>
                    </el-table-column>
                    <el-table-column prop="company" label="所属公司" align="center">
                        <template slot-scope="scope">
                            <div>{{scope.row.company.name}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="user_number" label="在线人数" align="center"></el-table-column>
                    <el-table-column prop="base_number" label="基准人数" align="center"></el-table-column>
                    <el-table-column prop="active_number" label="动态增减" align="center"></el-table-column>
                    <el-table-column prop="status" label="直播间启用" width="120px" align="center">
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
                    <el-table-column prop="open_status" label="聊天合流" width="120px" align="center">
                        <template slot-scope="scope">
                            <el-switch
                                    v-model="scope.row.open_status"
                                    active-value="y"
                                    inactive-value="n"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                                    @change="changeStatus(scope.row)"
                            >
                            </el-switch>
                        </template>
                    </el-table-column>
                    <!--<el-table-column prop="live_status" label="直播间状态" width="120px" align="center">-->
                        <!--<span v-if="1">正在直播</span>-->
                        <!--<span v-else>停止直播</span>-->
                    <!--</el-table-column>-->
                    <el-table-column prop="update_time" width="100px" label="修改时间" align="center"></el-table-column>
                    <el-table-column prop="create_time" width="100px" label="创建时间" align="center"></el-table-column>

                    <el-table-column label="操作" align="center" width="200">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" round @click="editRoom(scope.row)">编辑</el-button>
                            <el-button type="danger" size="mini" v-if="role" round @click="handleDelete(scope.row.id)">删除</el-button>
                            <!--<el-button type="danger" size="mini" round @click="deleteRoom(scope.row)">删除</el-button>-->
                        </template>
                    </el-table-column>
                </TableProxy>
            </el-col>
        </el-row>
        <Edit name="edit-list"
              :ajax-proxy="ajaxProxy"
              @submit-success="handleReload"/>
        <Add name="add-list"
             :ajax-proxy="ajaxProxy"
             :user-array="users"
             :college-array="college"
             @submit-success="handleReload"/>
    </div>
</template>

<script>
  /* eslint-disable indent */
  import PageMix from '../../mix/Page'
  import config from '../../mix/Delete'
  import SearchTool from '../../mix/SearchTool'
  import DataTable from '../../mix/DataTable'
  import TableProxy from '../../components/Commontable/Table'
  import VideoAjaxProxy from '../../api/Video'
  import Edit from './Edit'
  import Add from './Add'
  import APP_CONST from '../../config/index'
  import UserProxy from '../../packages/UserProxy'
  import CollegeArray from '../../packages/CollegeProxy'
export default {
  name: 'Videos',
  mixins: [PageMix, DataTable, config, SearchTool, VideoAjaxProxy],
  components: { TableProxy, Edit, Add },
  data() {
      return {
        ajaxProxy: VideoAjaxProxy,
        mainurl: VideoAjaxProxy.getUrl(),
        mainparam: '{"college_id": ' + this.$store.getters.company_id + '}',
        total: '100',
        dataLoad: false,
        searchForm: {
          name: '',
          room_number: ''
        },
        imgLink: APP_CONST.BASE_URL,
        users: [],
        college: [],
        role: false
      }
  },
  methods: {
      getAjaxProxy() {
        return this.ajaxProxy
      },
      actionThis(row) {
        this.$modal.show('edit-list', { model: row })
      },
    changeStatus(data) {
      const vmthis = this
      this.ajaxProxy.update(data.id, data).then(function(response) {
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
    editRoom(row) {
      this.$modal.show('edit-list', { model: row })
    },
    deleteRoom(row) {
      console.log(row)
    },
    onSearchChange(param) {
      this.mainparam = JSON.stringify(param)
    },
    onSearchReset() {
      this.videoProxy.load()
    },
    addRoom() {
      this.$modal.show('add-list')
    },
    initUser(data) {
      this.users = data.items
    },
    loadUser() {
      const user = new UserProxy({ pid: this.$store.getters.company_id }, this.initUser, this)
      this.usersProxy = user
      this.usersProxy.load()
    },
    initCollege(data) {
      this.college = data.items
    },
    loadCollege() {
      const college = new CollegeArray({}, this.initCollege, this)
      this.collegeProxy = college
      this.collegeProxy.load()
    }
  },
  created() {
  	if (this.$store.getters.roles[0] == 'administrator') {
  		this.role = true
    }
  	this.$on('search-tool-change', this.onSearchChange)
    this.loadUser()
    this.loadCollege()
  },
  mounted() {
  }
  }
</script>

<style>
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    input[type="number"]{
        -moz-appearance: textfield;
    }
</style>