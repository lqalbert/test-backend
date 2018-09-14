<template>
    <div class="hello">
        <el-row>
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline" size="small">
                <el-form-item prop="title">
                    <el-input v-model="searchForm.title" size="small" placeholder="请输入标题"></el-input>
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

                    <el-table-column prop="title" label="文章标题" width="180" align="center"></el-table-column>

                    <el-table-column prop="author" label="作者" width="180" align="center"></el-table-column>

                    <el-table-column prop="from" label="文章来源" width="180" align="center"></el-table-column>

                    <el-table-column prop="create_time" label="日期" width="180" align="center"></el-table-column>

                    <el-table-column prop="times" label="浏览次数" width="180" align="center"></el-table-column>

                    <el-table-column  align="center" prop="type_id" label="文章类型" width="100">
                        <template scope="scope">
                            {{ getType(scope.row.type_id, options) }}
                        </template>
                    </el-table-column>

                    <el-table-column prop="article_img" label="文章封面" width="120" align="center">
                        <template slot-scope="scope">
                            <img :src="imgLink+scope.row.article_img" alt="" width="100px">
                        </template>
                    </el-table-column>

                    <el-table-column prop="publish" label="是否发布" align="center">
                        <template slot-scope="scope">
                            <el-switch
                                    v-model="scope.row.publish"
                                    active-value="y"
                                    inactive-value="n"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                                    @change="switchHandle1(scope.row)">
                            </el-switch>

                        </template>
                    </el-table-column>


                    <el-table-column  fixed="right"  label="操作" align="center" width="180">
                        <template slot-scope="scope">
                            <el-button type="info" size="small" @click="showEdit(scope.row)">编辑</el-button>
                            <el-button type="danger" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>

                    <div slot="buttonbar">
                        <el-button size="small" type="primary" @click="showAdd">添加文章</el-button>
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
    import ArticleProxy from '../../packages/ArticleProxy';
    import ArticleAjaxProxy from '../../api/article';
    import ArticleTypeProxy from '../../packages/ArticleTypeProxy';
    import ArticleTypeAjaxProxy from '../../api/articleType';
    import APP_CONST from '../../config/index'


    export default {
        name:'Wenzhang',
        mixins: [SearchTool, DataTable, PageMix, config],
        components: {  Add, Edit, TableProxy },
        data(){
            return{
                searchForm: {
                    title: '',
                    author:'',
                    type_id:''
                },
                ajaxProxy:ArticleAjaxProxy,
                mainurl:ArticleAjaxProxy.getUrl(),
                mainparam:'',
                options: [],
                imgLink: APP_CONST.BASE_URL
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
            loadTypes(data){
                this.options = data.items;
                console.log(this.options)
            },
            getCanAddTypes(){
                let canAddTypes = new ArticleTypeProxy({}, this.loadTypes, this);
                canAddTypes.load();
            },

            switchHandle1(row){
                this.ajaxProxy.update(row.id, {publish:row.publish}).then((response)=>{
                    this.$message.success('设置成功');
                }).catch((response)=>{
                    this.$message.error('更新失败');
                    row.publish = row.publish == 'y' ? 'n' : 'y' ;
                });
            },

            getType(id, arr){
                for ( var i = 0; i <arr.length; i++){
                    if (arr[i]['id']==id){
                        return arr[i]['name'];
                    }
                }
            },



        },

        created() {
            this.$on('search-tool-change', this.onSearchChange);
            this.getCanAddTypes();
        }


    }
</script>

<style>
    .hello{
        margin: 20px 5px;
    }
</style>