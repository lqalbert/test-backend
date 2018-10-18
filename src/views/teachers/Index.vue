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

                    <el-table-column prop="room_id" label="所属直播间"  align="center">
                        <template scope="scope">
                            {{ getRooms(scope.row.room_id, rooms) }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="teacher_img" label="教师简介" width="120" align="center" >
                        <template slot-scope="scope">
                            <img :src="url+scope.row.teacher_img" alt="" width="100px">
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
             @submit-success="handleReload"
             :rooms="rooms"/>

        <Edit name="edit-list"
              :ajax-proxy="ajaxProxy"
              @submit-success="handleReload"
              :rooms="rooms"/>

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
    import TeacherProxy from '../../packages/TeacherProxy';
    import VideoProxy from '../../packages/VideoProxy';
    import CollegeProxy from '../../packages/CollegeProxy';
    import TeacherAjaxProxy from '../../api/teacher';
    import APP_CONST from '../../config/index'

    export default {
        name:'teachers',
        mixins: [SearchTool, DataTable, PageMix, config],
        components: {  Add, Edit, TableProxy },
        data(){
            return{
                rooms:[],
                ajaxProxy:TeacherAjaxProxy,
                mainurl:TeacherAjaxProxy.getUrl(),
                mainparam: '',
                colleges: [],
                showCollege:false,
                url: APP_CONST.BASE_URL
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
            loadColleges(data) {
                this.colleges = data.items
                console.log(this.colleges)
            },
            loadRooms(data) {
                this.rooms = data.items
                console.log(this.rooms)
            },
            getCanAddRooms() {
                const canAddRooms = new VideoProxy({ college_id: this.$store.getters.company_id }, this.loadRooms, this)
                canAddRooms.load()
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
            getRooms(id, arr){
                for ( let i = 0; i <arr.length; i++){
                    if (arr[i]['id']==id){
                        return arr[i]['room_number'];
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
            this.getCanAddRooms()
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