<!--suppress ALL -->
<template>
    <div class="hello">
        <el-row>
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline" size="small">
                <el-form-item prop="nickname">
                    <el-input v-model="searchForm.nickname" size="small" placeholder="请输入用户昵称"></el-input>
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

                    <el-table-column prop="nick_id" label="用户昵称" width="180" align="center"></el-table-column>

                    <el-table-column  align="center" prop="cause_id" label="处罚原因" width="100">
                        <template scope="scope">
                            {{ getType(scope.row.cause_id, causeType) }}
                        </template>
                    </el-table-column>

                    <el-table-column  align="center" prop="punishment_id" label="处罚方式" width="100">
                        <template scope="scope">
                            {{ getType(scope.row.punishment_id, punishmentType) }}
                        </template>
                    </el-table-column>

                    <el-table-column  align="center" prop="period_id" label="处罚时长" width="100">
                        <template scope="scope">
                            {{ getTimes(scope.row.period_id, periodType) }}
                        </template>
                    </el-table-column>

                    <el-table-column  align="center" prop="room_id" label="直播间房号" width="100">
                        <template scope="scope">
                            {{ getRoom(scope.row.room_id, roomType) }}
                        </template>
                    </el-table-column>

                    <el-table-column prop="expire_time" label="处罚截止日期" align="center">
                        <template scope="scope">
                            {{ scope.row.expire_time | moment }}
                        </template>
                    </el-table-column>


                    <el-table-column  fixed="right"  label="操作" align="center" width="180">
                        <template slot-scope="scope">
                            <!--<el-button articleType="info" size="small" @click="showEdit(scope.row)">编辑</el-button>-->
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
             :causeType="causeType"
             :punishmentType="punishmentType"
             :periodType="periodType"
             :roomType="roomType"/>

        <!--<Edit name="edit-list"
              :ajax-proxy="ajaxProxy"
              @submit-success="handleReload"
              :options="options"/>-->

    </div>
</template>

<script>
    import Add from './addForm'
    //import Edit from './Edit'
    import TableProxy from '../../components/Commontable/Table'
    import config from '../../mix/Delete'
    import SearchTool from '../../mix/SearchTool';
    import DataTable from '../../mix/DataTable';
    import PageMix from '../../mix/Page';
    import ViolationProxy from '../../packages/ViolationProxy';
    import VideoProxy from '../../packages/VideoProxy';
    import ViolationAjaxProxy from '../../api/violation';
    import VideoAjaxProxy from '../../api/video'


    export default {
        name:'Violation',
        mixins: [SearchTool, DataTable, PageMix, config],
        components: {  Add,  TableProxy },
        data(){
            return {
                searchForm: {
                    nickname:'',
                },
                ajaxProxy: ViolationAjaxProxy,
                mainurl: ViolationAjaxProxy.getUrl(),
                mainparam: '',
                causeType: [
                    {
                        id: 1,
                        item: '广告'
                    },
                    {
                        id: 2,
                        item: '人身攻击'
                    },
                    {
                        id: 3,
                        item: '低俗'
                    },
                    {
                        id: 4,
                        item: '政治敏感'
                    },
                    {
                        id: 5,
                        item: '违法犯罪'
                    },
                    {
                        id: 6,
                        item: '不实信息'
                    }
                ],
                punishmentType: [
                    {
                        id: 1,
                        item: '封号'
                    },
                    {
                        id: 2,
                        item: '禁言'
                    }
                ],

                periodType: [
                    {
                        id: 1,
                        item: '30秒',
                        period:'0.5'
                    },
                    {
                        id: 2,
                        item: '一分钟',
                        period:'1'
                    },
                    {
                        id: 3,
                        item: '两分钟',
                        period:'2'
                    },
                    {
                        id: 4,
                        item: '五分钟',
                        period:'5'
                    },
                    {
                        id: 5,
                        item: '十分钟',
                        period:'10'
                    },
                    {
                        id: 6,
                        item: '半小时',
                        period:'30'
                    },
                    {
                        id: 7,
                        item: '一小时',
                        period:'60'
                    },
                    {
                        id: 8,
                        item: '两小时',
                        period:'120'
                    },
                    {
                        id: 9,
                        item: '六小时',
                        period:'360'
                    },
                    {
                        id: 10,
                        item: '十二小时',
                        period:'720'
                    },
                    {
                        id: 11,
                        item: '一天',
                        period:'1440'
                    },
                    {
                        id: 12,
                        item: '两天',
                        period:'2880'
                    },
                    {
                        id: 13,
                        item: '三天',
                        period:'4320'
                    },
                    {
                        id: 14,
                        item: '一星期',
                        period:'10080'
                    },
                    {
                        id: 15,
                        item: '两星期',
                        period:'20160'
                    },
                    {
                        id: 16,
                        item: '一个月',
                        period:'43200'
                    }
                ],

                roomType: []
            }
        },

        methods: {
            getAjaxProxy(){
                return this.ajaxProxy;
            },
            onSearchChange(param) {
                this.mainparam = JSON.stringify(param);
            },
            showAdd() {
                this.$modal.show('add-list')
            },

            switchHandle1(row){
                this.ajaxProxy.update(row.id, {status:row.status}).then((response)=>{
                    this.$message.success('设置成功');
                }).catch((response)=>{
                    this.$message.error('更新失败');
                    row.status = row.status == 'y' ? 'n' : 'y' ;
                });
            },
            loadRooms(data){
                this.roomType = data.items;
            },
            getCanAddRooms(){
                let canAddRooms = new VideoProxy({}, this.loadRooms, this);
                canAddRooms.load();
            },
            getType(id, arr){
                for ( var i = 0; i <arr.length; i++){
                    if (arr[i]['id']==id){
                        return arr[i]['item'];
                    }
                }
            },

            getTimes(id, arr){
                for ( var i = 0; i <arr.length; i++){
                    if (arr[i]['period']==id){
                        return arr[i]['item'];
                    }
                }
            },

            getRoom(id, arr){
                for ( var i = 0; i <arr.length; i++){
                    if (arr[i]['id']==id){
                        return arr[i]['room_number'];
                    }
                }
            }

        },

        created() {
            this.$on('search-tool-change', this.onSearchChange);
            this.getCanAddRooms();
        },




    }
</script>

<style>
    .hello{
        margin: 20px 5px;
    }
</style>