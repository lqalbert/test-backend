<template>
    <div class="hello">
        <el-row>
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline" size="small">
                <el-form-item prop="username">
                    <el-input v-model="searchForm.username" size="small" placeholder="用户名"></el-input>
                </el-form-item>

                <el-form-item label="学院" prop="cid" v-if="showCollege">
                    <el-select v-model="searchForm.cid" placeholder="请选择">
                        <el-option
                                v-for="item in colleges"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="角色" prop="role_id">
                    <el-select v-model="searchForm.role_id" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.id"
                                :label="item.role_comment"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="等级" prop="level">
                    <el-select v-model="searchForm.level" placeholder="请选择">
                        <el-option
                                v-for="item in leveloption"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" size="small" icon="search" @click="searchToolChange('searchForm')">查询
                    </el-button>
                    <el-button type="primary" size="small" @click="searchToolReset('searchForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <el-row>
            <el-col>
                <TableProxy :url="mainurl" :param="mainparam" :reload="dataTableReload" :page-size="15">

                    <el-table-column label="序号" align="center" type="index" width="65"></el-table-column>
                    <el-table-column prop="is_use" label="是否启用" align="center">
                        <template slot-scope="scope">
                            <el-switch
                                    v-model="scope.row.is_use"
                                    active-value="y"
                                    inactive-value="n"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                                    @change="switchHandle1(scope.row)">
                            </el-switch>

                        </template>
                    </el-table-column>
                    <el-table-column prop="username" label="用户名" width="180" align="center"></el-table-column>
                    <el-table-column prop="nickname" label="昵称" width="180" align="center"></el-table-column>
                    <el-table-column prop="level" label="等级" width="180" align="center">
                        <template scope="scope">
                            {{ getLevel(scope.row.level, scope.row.cid, levels, colleges) }}
                        </template>
                    </el-table-column>
                    <!--<el-table-column prop="invitation_code" label="邀请码" width="180" align="center"></el-table-column>-->
                    <el-table-column  align="center" prop="cid" label="用户所属学院" width="180" v-if="showCollege">
                        <template scope="scope">
                            {{ getCollege(scope.row.cid, colleges) }}
                        </template>
                    </el-table-column>
                    <el-table-column  align="center" prop="role_id" label="角色" width="180">
                        <template scope="scope">
                            {{ getRole(scope.row.role_id, options) }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="pid" label="账号创建者" width="180" align="center">
                        <template scope="scope">
                            {{ getUserName(scope.row.pid, users)? getUserName(scope.row.pid, users):username }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="watch_time_total" label="观看总时长" width="180" align="center"></el-table-column>
                    <el-table-column prop="watch_time_today" label="今日观看时长" width="180" align="center">
                        <template scope="scope">
                            {{ getTime(scope.row.watch_time_today,scope.row.last_watch_date) }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="last_watch_date" label="上次观看日期" width="180" align="center"></el-table-column>
                    <el-table-column prop="status" label="账号状态" width="180" align="center">
                        <template scope="scope">
                            {{ getStatus(scope.row.status) }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="email" label="用户邮箱" width="180" align="center"></el-table-column>
                    <el-table-column prop="phone" label="用户手机" width="180" align="center"></el-table-column>
                    <el-table-column prop="address" label="用户地址" width="180" align="center"></el-table-column>
                    <!--<el-table-column prop="user_img" label="头像" width="120" align="center">
                        <template slot-scope="scope">
                            <img :src="url+scope.row.user_img" alt="" width="100px">
                        </template>
                    </el-table-column>-->
                    <el-table-column prop="front_login" label="前台登录时间" width="180" align="center"></el-table-column>
                    <el-table-column prop="login_time" label="后台登录时间" width="180" align="center"></el-table-column>

                    <el-table-column prop="created_at" label="注册时间" align="center" width="180"></el-table-column>

                    <el-table-column prop="updated_at" label="更新时间" align="center" width="180">
                        <!--<template scope="scope">
                            {{ scope.row.update_time | moment }}
                        </template>-->
                    </el-table-column>

                    <!--<el-table-column prop="is_use" label="是否启用" align="center">
                        <template slot-scope="scope">
                            <el-switch
                                    v-model="scope.row.is_use"
                                    active-value="y"
                                    inactive-value="n"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                                    @change="switchHandle1(scope.row)">
                            </el-switch>

                        </template>
                    </el-table-column>-->

                    <el-table-column  fixed="right" label="操作" align="center" width="220">
                        <template slot-scope="scope">
                            <el-button type="info" size="small" @click="showEdit(scope.row)">编辑</el-button>
                            <el-button type="danger" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
                            <router-link :to="'/system/sockpuppet?pid='+scope.row.id"><el-button type="success" size="small" v-show=scope.row.show>马甲</el-button></router-link>
                        </template>
                    </el-table-column>

                    <div slot="buttonbar">
                        <el-button size="small" type="primary" @click="showAdd">添加账号</el-button>

                    </div>
                </TableProxy>
            </el-col>
        </el-row>

        <Add name="add-list"
             :ajax-proxy="ajaxProxy"
             @submit-success="handleReload"
             :options="options"
             :colleges="colleges"
             :showCollege="showCollege"
             :leveloption="leveloption"/>

        <Edit name="edit-list"
              :ajax-proxy="ajaxProxy"
              @submit-success="handleReload"
              :options="options"
              :colleges="colleges"
              :leveloption="leveloption"/>

    </div>
</template>

<script>
    import Add from './addForm'
    import Edit from './Edit'
    import TableProxy from '../../components/Commontable/Table'
    import config from '../../mix/Delete'
    import SearchTool from '../../mix/SearchTool'
    import DataTable from '../../mix/DataTable'
    import PageMix from '../../mix/Page'
    import UserProxy from '../../packages/UserProxy'
    import RoleProxy from '../../packages/RoleProxy'
    import LevelProxy from '../../packages/LevelProxy'
    import UserAjaxProxy from '../../api/user'
    import RoleAjaxProxy from '../../api/role'
    import LevelAjaxProxy from '../../api/level'
    import CollegeProxy from '../../packages/CollegeProxy';
    import CollegeAjaxProxy from '../../api/college';
    import APP_CONST from '../../config/index'
    import { mapActions,mapGetters } from 'vuex';

export default {
      name: 'User',
      mixins: [SearchTool, DataTable, PageMix, config],
      components: { Add, Edit, TableProxy },
      data() {
        return {
          searchForm: {
            cid: this.$store.getters.company_id,
            username: '',
            role_id: '',
            level: '',
            sockpuppet:"n"
          },
          ajaxProxy: UserAjaxProxy,
          mainurl: UserAjaxProxy.getUrl(),
          mainparam: '{"sockpuppet":"n","cid":' + this.$store.getters.company_id + '}',
          show:false,
          showCollege:false,
          options: [],
          colleges: [],
          levels: [],
          users: [],
          username: this.$store.getters.name,
          leveloption: [],
          status:
          [
              {
                  id:1,
                  item:'正常'
              },
              {
                  id:2,
                  item:'禁言'
              },
              {
                  id:3,
                  item:'封号'
              }
          ],
          url: APP_CONST.BASE_URL
        }
      },

      methods: {
        getAjaxProxy() {
          return this.ajaxProxy
        },
        onSearchChange(param) {
          this.mainparam = JSON.stringify(param)
        },
        showAdd() {
          this.$modal.show('add-list')
        },
        showEdit(row) {
          this.$modal.show('edit-list', { model: row })
        },
        loadRoles(data) {
          this.options = data.items
          console.log(this.options)
        },
        loadUsers(data) {
            this.users = data.items
            console.log(this.users)
        },
        loadColleges(data) {
          this.colleges = data.items
          console.log(this.colleges)
        },
          loadLevels(data) {
              this.levels = data.items
              console.log(this.levels)
          },
        // 获取options的数据，即获取可以添加的角色数据，要根据当前的角色判断，不能添加比当前角色权限更高的角色
        getCanAddRoles() {
          const canAddRoles = new RoleProxy({}, this.loadRoles, this)
          canAddRoles.load()
        },
        //根据当前用户，获取用户所在学院
        getCanAddColleges() {
          const canAddColleges = new CollegeProxy({}, this.loadColleges, this)
          canAddColleges.load()
        },
          getCanAddLevels() {
              const canAddLevels = new LevelProxy({}, this.loadLevels, this)
              canAddLevels.load()
          },
          getCanAddUsers() {
              const canAddUsers = new UserProxy({}, this.loadUsers, this)
              canAddUsers.load()
          },

        switchHandle1(row) {
          this.ajaxProxy.update(row.id, { is_use: row.is_use }).then((response) => {
            this.$message.success('设置成功')
          }).catch((response) => {
            this.$message.error('更新失败')
            row.is_use = row.is_use == 'y' ? 'n' : 'y'
          })
        },

        getCollege(id, arr){
          for ( let i = 0; i <arr.length; i++){
              if (arr[i]['id']==id){
                  return arr[i]['name'];
              }
          }
        },
          getUserName(id, arr){

              for ( let i = 0; i <arr.length; i++){
                  if (id==arr[i]['id']){
                      return arr[i]['username'];
                  }
              }
              if(id==1){
                  return "超级管理员";
              }
          },
          getLevel(level, cid, levels, colleges){
              let level_type = '';
              let res = '';
              for ( let i = 0; i <colleges.length; i++){
                  if (colleges[i]['id']==cid){
                      level_type = colleges[i]['level_type'];
                      for ( let j = 0; j <levels.length; j++){
                          if (levels[j]['id']==level_type){
                              return levels[j]['name'+level]
                          }
                      }
                      return res;
                  }
              }
          },

        getRole(id, arr){
          for ( let i = 0; i <arr.length; i++){
              if (arr[i]['id']==id){
                  return arr[i]['role_comment'];
              }
          }
        },

          getStatus(status){
              if(status==1){
                  return '正常'
              }
              if(status==2){
                  return '禁言'
              }
              if(status==3){
                  return '封号'
              }
          },
          getCanAddLevelOptions(){
            if(this.$store.getters.level_type==1){
                this.leveloption=[
                    {
                        id:1,
                        name:'普通'
                    },
                    {
                        id:2,
                        name:'中级'
                    },
                    {
                        id:3,
                        name:'高级'
                    }
                ]
            }else if(this.$store.getters.level_type==2){
                  this.leveloption=[
                      {
                          id:1,
                          name:'白银'
                      },
                      {
                          id:2,
                          name:'黄金'
                      },
                      {
                          id:3,
                          name:'砖石'
                      }
                  ]
              }
          },
          getTime(watch_time_today,last_watch_date)
          {
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            if (month < 10) {
              month = "0" + month;
            }
            if (day < 10) {
              day = "0" + day;
            }
            let today = year + "-" + month + "-" + day;
            if(last_watch_date==today){
                return watch_time_today;
            }else{
                return 0;
            }
          },
          getShowCollege(){
            if(this.$store.getters.roles['0']=='administrator'){
                return this.showCollege=true;
            }

          }


      },

      created() {
        this.$on('search-tool-change', this.onSearchChange)
        this.getCanAddRoles()
        this.getCanAddColleges()
        this.getCanAddLevels()
        this.getCanAddLevelOptions()
        this.getCanAddUsers()
        this.getShowCollege()
    }

    }
</script>

<style>
    .hello{
        margin: 20px 5px;
    }
</style>