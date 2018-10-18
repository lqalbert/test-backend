<template>
    <div class="hello">
        <!--<el-row>
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline" size="small">
                <el-form-item prop="content">
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

                    <el-table-column prop="live_title" label="直播标题"  align="center"></el-table-column>
                    <el-table-column prop="live_time" label="直播日期"  align="center">
                        <template scope="scope">
                            {{ getTime(scope.row.live_time) }}
                        </template>
                    </el-table-column>

                    <el-table-column  align="center" prop="cid" label="所属学院" v-if="showCollege">
                        <template scope="scope">
                            {{ getCollege(scope.row.cid, colleges) }}
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
    import CurriculumProxy from '../../packages/CurriculumProxy';
    import CollegeProxy from '../../packages/CollegeProxy';
    import CurriculumAjaxProxy from '../../api/curriculum';
    import APP_CONST from '../../config/index'

    export default {
        name:'curriculum',
        mixins: [SearchTool, DataTable, PageMix, config],
        components: {  Add, Edit, TableProxy },
        data(){
            return{
                ajaxProxy:CurriculumAjaxProxy,
                mainurl:CurriculumAjaxProxy.getUrl(),
                mainparam:'',
                colleges: [],
                showCollege:false
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
            getTime(time){
                let s_date = new Date(time['0']);
                let e_date = new Date(time['1']);
                let hour=s_date.getHours();
                let minute=s_date.getMinutes();
                if(hour<10){
                    hour = "0" + hour;
                }
                if(minute<10){
                    minute = "0" + minute;
                }

                let hour1=e_date.getHours();
                let minute1=e_date.getMinutes();
                if(hour1<10){
                    hour1 = "0" + hour1;
                }
                if(minute1<10){
                    minute1 = "0" + minute1;
                }

                let start_time = hour + ':' + minute;
                let end_time = hour1 + ':' + minute1;

                return start_time + ' - ' + end_time;
            },
            loadColleges(data) {
                this.colleges = data.items
                console.log(this.colleges)
            },
            getCanAddColleges() {
                const canAddColleges = new CollegeProxy({}, this.loadColleges, this)
                canAddColleges.load()
            },
            getCollege(id, arr){
                for ( let i = 0; i <arr.length; i++){
                    if (arr[i]['id']==id){
                        return arr[i]['name'];
                    }
                }
            },
            getShowCollege(){
                if(this.$store.getters.roles['0']=='administrator'){
                    return this.showCollege=true;
                }

            }
        },

        created() {
            this.$on('search-tool-change', this.onSearchChange);
            this.getCanAddColleges()
            this.getShowCollege()
        }


    }
</script>

<style>
    .hello{
        margin: 20px 5px;
    }
</style>