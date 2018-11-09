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
                    <!--<el-table-column articleTypes="selection" align="center" width="50"></el-table-column>-->

                    <el-table-column label="序号" align="center" type="index" width="65"></el-table-column>

                    <el-table-column prop="nickname" label="马甲名称"  align="center"></el-table-column>
                    <el-table-column prop="level" label="马甲等级"  align="center">
                        <template scope="scope">
                            {{ getLevel(scope.row.level, leveloption) }}
                        </template>
                    </el-table-column>


                    <el-table-column  fixed="right"  label="操作" align="center" width="180">
                        <template slot-scope="scope">
                            <el-button type="info" size="small" @click="showEdit(scope.row)">编辑</el-button>
                            <el-button type="danger" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>

                    <div slot="buttonbar">
                        <el-button size="small" type="primary" @click="showAdd">添加</el-button>
                        <el-button size="small" type="primary" @click="showAll">批量添加</el-button>
                        <el-button size="small" type="primary" @click="exportxls">模板下载</el-button>
                        <router-link :to="'/system/user'"><el-button type="success" size="small">返回用户列表</el-button></router-link>
                    </div>
                </TableProxy>
            </el-col>
        </el-row>

        <Add name="add-list"
             :ajax-proxy="ajaxProxy"
             @submit-success="handleReload"
             :pid="pid"
             :cid="cid"
             :leveloption="leveloption"/>

        <Edit name="edit-list"
              :ajax-proxy="ajaxProxy"
              @submit-success="handleReload"
              :leveloption="leveloption"/>

        <Import name="import-list"
                :ajax-proxy="ajaxProxy"
                @submit-success="handleReload"
        />

    </div>
</template>

<script>
    import Add from './addForm'
    import Edit from './Edit'
    import Import from './Import'
    import TableProxy from '../../components/Commontable/Table'
    import config from '../../mix/Delete'
    import SearchTool from '../../mix/SearchTool'
    import DataTable from '../../mix/DataTable'
    import PageMix from '../../mix/Page'
    import UserProxy from '../../packages/UserProxy'
    import UserAjaxProxy from '../../api/user'
    import APP_CONST from '../../config/index'
    import { mapActions,mapGetters } from 'vuex';
    import LevelProxy from '../../packages/LevelProxy'
    import CollegeProxy from '../../packages/CollegeProxy';

    export default {
        name:'Sockpuppet',
        mixins: [SearchTool, DataTable, PageMix, config],
        components: {  Add, Edit,Import, TableProxy },
        data(){
            return{

                ajaxProxy:UserAjaxProxy,
                mainurl:UserAjaxProxy.getUrl(),
                mainparam:'{"sockpuppet":"y", "pid": ' + this.$route.query.pid + '}',
                pid:'',
                cid:'',
                levels:[],
                colleges:[],
                leveloption: []
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
            showAll() {
                this.$modal.show('import-list')
            },
            showEdit(row) {
                this.$modal.show('edit-list', { model: row })
            },
            loadColleges(data) {
                this.colleges = data.items
                console.log(this.colleges)
            },
            loadLevels(data) {
                this.levels = data.items
                console.log(this.levels)
            },
            getId(){
                 return this.pid = this.$route.query.pid;
            },
            getCid(){
                return this.cid = this.$store.getters.company_id;
            },
            getCanAddColleges() {
                const canAddColleges = new CollegeProxy({}, this.loadColleges, this)
                canAddColleges.load()
            },
            getCanAddLevels() {
                const canAddLevels = new LevelProxy({}, this.loadLevels, this)
                canAddLevels.load()
            },
            getCanAddLevelOption(){
                if(this.$store.getters.level_type==1){
                    this.leveloption=[
                        {
                            id:1,
                            name:'普通'
                        },
                        {
                            id:2,
                            name:'初级'
                        }
                    ]
                }else if(this.$store.getters.level_type==2){
                    this.leveloption=[
                        {
                            id:1,
                            name:'青铜'
                        },
                        {
                            id:2,
                            name:'白银'
                        }
                    ]
                }
            },
            /*getLevel(level, cid, levels, colleges){
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
            },*/
            getLevel(level,leveloption){
              if(level ==1){
                  return leveloption['0']['name'];
              }
                if(level ==2){
                    return leveloption['1']['name'];
                }
            },
            exportxls() {
                window.open(APP_CONST.BASE_URL + '/admin/example-sockpuppet')
            }

        },

        created() {
            this.$on('search-tool-change', this.onSearchChange);
            this.getId();
            this.getCid();
            this.getCanAddColleges()
            this.getCanAddLevels()
            this.getCanAddLevelOption()
        }


    }
</script>

<style>
    .hello{
        margin: 20px 5px;
    }
</style>