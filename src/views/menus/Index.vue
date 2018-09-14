<template>
    <div class="hello">
        <el-row>
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline" size="small">
                <el-form-item prop="name">
                    <el-input v-model="searchForm.name" size="small" placeholder="请输入菜单名"></el-input>
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

                    <el-table-column prop="name" label="菜单名" width="180" align="center"></el-table-column>

                    <el-table-column prop="path" label="菜单路径" width="180" align="center"></el-table-column>

                    <el-table-column prop="component" label="菜单所属组件" width="180" align="center"></el-table-column>

                    <el-table-column prop="icon" label="菜单图标" width="120" align="center">
                        <template slot-scope="scope">
                            <img :src="'http://education.io'+scope.row.icon" alt="" width="100px">
                        </template>
                    </el-table-column>

                    <el-table-column prop="parent_id" label="父级菜单ID" width="180" align="center"></el-table-column>
                    <el-table-column prop="level" label="菜单级别" width="180" align="center"></el-table-column>
                    <el-table-column prop="comment" label="菜单说明" width="180" align="center"></el-table-column>
                    <el-table-column prop="person_id" label="菜单确认人ID" width="180" align="center"></el-table-column>

                     <el-table-column prop="is_use" label="是否隐藏" align="center">
                      <template slot-scope="scope">
                          <el-switch
                                  v-model="scope.row.hidden"
                                  active-value="y"
                                  inactive-value="n"
                                  active-color="#13ce66"
                                  inactive-color="#ff4949"
                                  @change="switchHandle1(scope.row)">
                          </el-switch>

                      </template>
                    </el-table-column>

                    <el-table-column prop="is_last" label="是否最后一级菜单" align="center">
                        <template slot-scope="scope">
                            <el-switch
                                    v-model="scope.row.is_last"
                                    active-value="y"
                                    inactive-value="n"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                                    @change="switchHandle2(scope.row)">
                            </el-switch>
                        </template>
                    </el-table-column>

                    <el-table-column prop="updated_at" label="修改时间" width="180" align="center"></el-table-column>
                    <el-table-column prop="update_user" label="修改人" width="180" align="center"></el-table-column>
                    <el-table-column prop="created_at" label="创建时间" width="180" align="center"></el-table-column>
                    <el-table-column prop="create_user" label="创建人" width="180" align="center"></el-table-column>

                    <el-table-column  fixed="right"  label="操作" align="center" width="180">
                        <template slot-scope="scope">
                            <el-button type="info" size="small" @click="showEdit(scope.row)">编辑</el-button>
                            <el-button type="danger" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>

                    <div slot="buttonbar">
                        <el-button size="small" type="primary" @click="showAdd">添加菜单</el-button>
                    </div>
                </TableProxy>
            </el-col>
        </el-row>

        <Add name="add-list"
             :ajax-proxy="ajaxProxy"
             @submit-success="handleReload"
             :options="options"/>

        <Edit name="edit-list"
             :ajax-proxy="ajaxProxy"
             @submit-success="handleReload"
             :options="options"/>

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
    import MenuProxy from '../../packages/MenuProxy';
    import MenuAjaxProxy from '../../api/menu';


    export default {
        name:'Caidan',//不能使用Menu,是因为menu是内置的或者保留的HTML元素
        mixins: [SearchTool, DataTable, PageMix, config],
        components: {  Add, Edit, TableProxy },
        data(){
            return{
                searchForm: {
                    name: '',
                },
                ajaxProxy:MenuAjaxProxy,
                mainurl:MenuAjaxProxy.getUrl(),
                mainparam:'',
                options: []
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
                this.ajaxProxy.update(row.id, {hidden:row.hidden}).then((response)=>{
                    this.$message.success('设置成功');
                }).catch((response)=>{
                    this.$message.error('更新失败');
                    row.hidden = row.hidden == true ? false : true ;
                });
            },
            switchHandle2(row){
                this.ajaxProxy.update(row.id, {is_last:row.is_last}).then((response)=>{
                    this.$message.success('设置成功');
                }).catch((response)=>{
                    this.$message.error('更新失败');
                    row.is_last = row.is_last == 'y' ? 'n' : 'y' ;
                });
            },

            loadMenus(data){
                this.options = data.items;
                console.log( this.options)
            },
            //获取options的数据，即获取可以添加的父级菜单数据
            getCanAddMenus(){
                let canAddMenus = new MenuProxy({}, this.loadMenus, this);
                canAddMenus.load();
            },



        },

        created() {
            this.$on('search-tool-change', this.onSearchChange);
            this.getCanAddMenus();
        }


    }
</script>

<style>
    .hello{
        margin: 20px 5px;
    }
</style>