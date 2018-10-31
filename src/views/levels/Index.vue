<template>
    <div class="hello">
        <!--<el-row>
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
        </el-row>-->
        <el-row>
            <el-col>
                <TableProxy :url="mainurl" :param="mainparam" :reload="dataTableReload" :page-size="15">
                    <el-table-column label="序号" align="center" type="index" width="65"></el-table-column>
                    <el-table-column prop="type_name" label="等级类型"  align="center"></el-table-column>
                    <el-table-column prop="name1" label="等级一名称"  align="center"></el-table-column>
                    <el-table-column prop="name2" label="等级二名称"  align="center"></el-table-column>
                    <el-table-column prop="name3" label="等级三名称"  align="center"></el-table-column>
                    <el-table-column prop="name4" label="等级四名称"  align="center"></el-table-column>
                    <el-table-column prop="name5" label="等级五名称"  align="center"></el-table-column>



                   <!-- <el-table-column  fixed="right"  label="操作" align="center" width="180">
                        <template slot-scope="scope">
                            <el-button type="info" size="small" @click="showEdit(scope.row)">编辑</el-button>
                            <el-button type="danger" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>-->

                    <div slot="buttonbar">
                        <el-button size="small" type="primary" @click="showAdd">设置等级类型</el-button>
                    </div>
                </TableProxy>
            </el-col>
        </el-row>

        <Add name="add-list"
             :ajax-proxy="ajaxProxy"
             :type-id="typeId"
             @submit-success="handleReload"/>

    </div>
</template>

<script>
    import Add from './addForm'
    import TableProxy from '../../components/Commontable/Table'
    import config from '../../mix/Delete'
    import SearchTool from '../../mix/SearchTool';
    import DataTable from '../../mix/DataTable';
    import PageMix from '../../mix/Page';
    import LevelProxy from '../../packages/LevelProxy';
    import LevelAjaxProxy from '../../api/Level';
    import APP_CONST from '../../config/index'
    import { mapActions,mapGetters } from 'vuex';

    export default {
        name:'Level',
        mixins: [SearchTool, DataTable, PageMix, config],
        components: {  Add, TableProxy },
        data(){
            return{
                index:1,
                ajaxProxy:LevelAjaxProxy,
                mainurl:LevelAjaxProxy.getUrl(),
                mainparam:'',
                typeId:this.$store.getters.level_type
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
            }

        },

        created() {
            this.$on('search-tool-change', this.onSearchChange);
            console.log(this.$store.getters.level_type)
        }


    }
</script>

<style>
    .hello{
        margin: 20px 5px;
    }
</style>