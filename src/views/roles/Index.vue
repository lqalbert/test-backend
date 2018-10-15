<template>
    <div class="hello">
        <el-row>
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline" size="small">
                <el-form-item prop="role_comment">
                    <el-input v-model="searchForm.role_comment" size="small" placeholder="请输入角色说明"></el-input>
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

                    <el-table-column prop="role_name" label="角色名字" width="220" align="center"></el-table-column>

                    <el-table-column prop="role_comment" label="角色说明" width="220" align="center"></el-table-column>

                    <el-table-column prop="role_mark" label="角色标签" width="220" align="center"></el-table-column>

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

                    <el-table-column prop="is_backend" label="是否可登录后台" align="center">
                        <template slot-scope="scope">
                            <el-switch
                                    v-model="scope.row.is_backend"
                                    active-value="y"
                                    inactive-value="n"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                                    @change="switchHandle2(scope.row)">
                            </el-switch>
                        </template>
                    </el-table-column>

                    <el-table-column  fixed="right"  label="操作" align="center" width="220">
                        <template slot-scope="scope">
                            <el-button type="info" size="small" @click="showEdit(scope.row)">编辑</el-button>
                            <!--<el-button type="danger" size="small" @click="handleDelete(scope.row.id)">删除</el-button>-->
                        </template>
                    </el-table-column>

                    <!--<div slot="buttonbar">
                        <el-button size="small" type="primary" @click="showAdd">添加角色</el-button>
                    </div>-->
                </TableProxy>
            </el-col>
        </el-row>

        <Add name="add-list"
             :ajax-proxy="ajaxProxy"
             @submit-success="handleReload"/>

        <Edit name="edit-list"
             :ajax-proxy="ajaxProxy"
             @submit-success="handleReload"/>

    </div>
</template>

<script>
    import Add from './addForm'
    import Edit from './Edit'
    import TableProxy from '../../components/Commontable/Table'
    import config from '../../mix/Delete'
    import SearchTool from '../../mix/SearchTool';
    import DataTable from '../../mix/DataTable';
    import PageMix from '../../mix/Page';
    import RoleProxy from '../../packages/RoleProxy';
    import RoleAjaxProxy from '../../api/role';

    export default {
        name:'Role',
        mixins: [SearchTool, DataTable, PageMix, config],
        components: {  Add, Edit, TableProxy },
        data(){
            return{
                searchForm: {
                    role_comment: '',
                },
                ajaxProxy:RoleAjaxProxy,
                mainurl:RoleAjaxProxy.getUrl(),
                mainparam:''
            }
        },

        methods:{
            getAjaxProxy(){
                return this.ajaxProxy;
            },
            onSearchChange(param) {
                this.mainparam = JSON.stringify(param);
            },
            showAdd() {
                this.$modal.show('add-list')
            },
            showEdit(row) {
                this.$modal.show('edit-list', { model: row })
            },

            switchHandle1(row){
                this.ajaxProxy.update(row.id, {is_use:row.is_use}).then((response)=>{
                    this.$message.success('设置成功');
                }).catch((response)=>{
                    this.$message.error('更新失败');
                    row.is_use = row.is_use == 'y' ? 'n' : 'y' ;
                });
            },
            switchHandle2(row){
                this.ajaxProxy.update(row.id, {is_backend:row.is_backend}).then((response)=>{
                    this.$message.success('设置成功');
                }).catch((response)=>{
                    this.$message.error('更新失败');
                    row.is_backend = row.is_backend == 'y' ? 'n' : 'y' ;
                });
            }
        },

        created() {
            this.$on('search-tool-change', this.onSearchChange);
        }


    }
</script>

<style>
    .hello{
        margin: 20px 5px;
    }
</style>