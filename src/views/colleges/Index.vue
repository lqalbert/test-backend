<template>
    <div class="hello">
        <el-row>
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline" size="small">
                <el-form-item prop="name">
                    <el-input v-model="searchForm.name" size="small" placeholder="请输入学院名称"></el-input>
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

                    <el-table-column prop="name" label="学院名称"  align="center"></el-table-column>

                    <el-table-column prop="address" label="学院域名"  align="center"></el-table-column>

                    <el-table-column prop="contact" label="负责人" width="180" align="center"></el-table-column>

                    <el-table-column prop="created_at" label="创建时间" width="180" align="center"></el-table-column>

                    <el-table-column prop="updated_at" label="修改时间" width="180" align="center"></el-table-column>


                    <el-table-column  fixed="right"  label="操作" align="center" width="180">
                        <template slot-scope="scope">
                            <el-button type="info" size="small" @click="showEdit(scope.row)">编辑</el-button>
                            <el-button type="danger" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>

                    <div slot="buttonbar">
                        <el-button size="small" type="primary" @click="showAdd">添加学院</el-button>
                    </div>
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
    import CollegeProxy from '../../packages/CollegeProxy';
    import CollegeAjaxProxy from '../../api/college';
    import APP_CONST from '../../config/index'


    export default {
        name:'college',
        mixins: [SearchTool, DataTable, PageMix, config],
        components: { Add, Edit, TableProxy },
        data(){
            return{
                searchForm: {
                    name: '',
                },
                ajaxProxy:CollegeAjaxProxy,
                mainurl:CollegeAjaxProxy.getUrl(),
                mainparam:'',


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