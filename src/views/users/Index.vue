<template>
    <div class="hello">
        <el-row>
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline" size="small">
                <el-form-item prop="username">
                    <el-input v-model="searchForm.username" size="small" placeholder="用户名"></el-input>
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
                    <!--<el-table-column articleType="selection" align="center" width="50"></el-table-column>-->

                    <el-table-column label="序号" align="center" type="index" width="65"></el-table-column>
                    <el-table-column prop="username" label="用户名" width="180" align="center"></el-table-column>
                    <el-table-column prop="nickname" label="昵称" width="180" align="center"></el-table-column>
                    <el-table-column prop="level" label="等级" width="180" align="center"></el-table-column>
                    <el-table-column  align="center" prop="cid" label="用户所属学院" width="180">
                        <template scope="scope">
                            {{ getCollege(scope.row.cid, colleges) }}
                        </template>
                    </el-table-column>
                    <el-table-column  align="center" prop="role_id" label="账号类型" width="180">
                        <template scope="scope">
                            {{ getRole(scope.row.role_id, options) }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="watch_time_total" label="观看总时长" width="180" align="center"></el-table-column>
                    <el-table-column prop="watch_time_today" label="今日观看时长" width="180" align="center"></el-table-column>
                    <el-table-column prop="status" label="账号状态" width="180" align="center"></el-table-column>
                    <el-table-column prop="email" label="用户邮箱" width="180" align="center"></el-table-column>
                    <el-table-column prop="phone" label="用户手机" width="180" align="center"></el-table-column>
                    <el-table-column prop="address" label="用户地址" width="180" align="center"></el-table-column>
                    <el-table-column prop="user_img" label="头像" width="120" align="center">
                        <template slot-scope="scope">
                            <img :src="url+scope.row.user_img" alt="" width="100px">
                        </template>
                    </el-table-column>
                    <el-table-column prop="front_login" label="前台登录时间" width="180" align="center"></el-table-column>
                    <el-table-column prop="front_logout" label="前台登出时间" width="180" align="center"></el-table-column>
                    <el-table-column prop="login_time" label="后台登录时间" width="180" align="center"></el-table-column>
                    <el-table-column prop="logout_time" label="后台登出时间" width="180" align="center"></el-table-column>

                    <el-table-column prop="created_at" label="注册时间" align="center" width="180"></el-table-column>

                    <el-table-column prop="updated_at" label="更新时间" align="center" width="180">
                        <!--<template scope="scope">
                            {{ scope.row.update_time | moment }}
                        </template>-->
                    </el-table-column>

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

                    <el-table-column  fixed="right" label="操作" align="center" width="220">
                        <template slot-scope="scope">
                            <el-button type="info" size="small" @click="showEdit(scope.row)">编辑</el-button>
                            <el-button type="danger" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
                            <router-link :to="'/system/sockpuppet?id='+scope.row.id"><el-button type="success" size="small" v-show=show >马甲</el-button></router-link>
                            <!--<el-button type="success" size="small" v-show=show @click="handleDelete(scope.row.id)">马甲</el-button>-->
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
             :colleges="colleges"/>

        <Edit name="edit-list"
              :ajax-proxy="ajaxProxy"
              @submit-success="handleReload"
              :options="options"
              :colleges="colleges"/>

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
    import UserAjaxProxy from '../../api/user'
    import RoleAjaxProxy from '../../api/role'
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
            username: ''
          },
          ajaxProxy: UserAjaxProxy,
          mainurl: UserAjaxProxy.getUrl(),
          mainparam: '',
          show:false,
          options: [],
          colleges: [],
          teachers: [],
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
        loadColleges(data) {
          this.colleges = data.items
          console.log(this.colleges)
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
        getRole(id, arr){
          for ( let i = 0; i <arr.length; i++){
              if (arr[i]['id']==id){
                  return arr[i]['role_comment'];
              }
          }
        },
          setSockpuppet(){
            let $role=this.$store.getters;
            if($role['roles']=='salesman'){
                return this.show = true;
            }
          }

      },

      created() {
        this.$on('search-tool-change', this.onSearchChange)
        this.getCanAddRoles()
        this.getCanAddColleges()
        this.setSockpuppet();
    }

    }
</script>

<style>
    .hello{
        margin: 20px 5px;
    }
</style>