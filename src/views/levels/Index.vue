<template>
    <div class="hello">
        <el-row>
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline" size="small">
                <el-form-item prop="name">
                    <el-input v-model="searchForm.name" size="small" placeholder="请输入名称"></el-input>
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
                    <el-table-column prop="type_name" label="等级类型"  align="center"></el-table-column>
                    <el-table-column prop="level_id" label="等级级别"  align="center"></el-table-column>
                    <el-table-column prop="name" label="等级名称"  align="center"></el-table-column>

                    <el-table-column  fixed="right"  label="操作" align="center" width="180">
                        <template slot-scope="scope">
                            <el-button type="info" size="small" @click="showEdit(scope.row)">编辑</el-button>
                            <el-button type="danger" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>

                    <div slot="buttonbar">
                        <el-button size="small" type="primary" @click="showAdd">添加</el-button>
                    </div>
                </TableProxy>
            </el-col>
        </el-row>

        <Add name="add-list"
             :ajax-proxy="ajaxProxy"
             @submit-success="handleReload"
             :type-name="type-name"/>

        <Edit name="edit-list"
              :ajax-proxy="ajaxProxy"
              @submit-success="handleReload"
              :type-name="type-name"/>

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
    import LevelProxy from '../../packages/LevelProxy';
    import LevelAjaxProxy from '../../api/level';
    import APP_CONST from '../../config/index'


    export default {
        name:'levels',
        mixins: [SearchTool, DataTable, PageMix, config],
        components: {  Add, Edit, TableProxy },
        data(){
            return{
                searchForm: {
                    name: ''
                },
                ajaxProxy:LevelAjaxProxy,
                mainurl:LevelAjaxProxy.getUrl(),
                typeName:[],
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