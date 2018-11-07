<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline" size="small">
                    <el-form-item>
                        <el-button type="primary" size="small" icon="el-icon-refresh"
                                   @click="refresh">
                        </el-button>
                    </el-form-item>
                    <el-form-item label="兑奖状态" prop="lottery_history_status">
                        <el-select v-model="searchForm.lottery_history_status">
                            <el-option v-for="(item,index) in statusList" :key="index" :label="item" :value="index"> 
                            <!-- {{index}} -->
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="奖品编号" prop="history_num">
                        <el-input v-model="searchForm.history_num" placeholder="请输入奖品编号"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="small" icon="search"
                                   @click="searchToolChange('searchForm')">查询
                        </el-button>
                        <el-button @click="searchToolReset('searchForm')"
                                   size="small" type="primary">重置
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        
        <el-row>
            <el-col :span="24">
                <TableProxy
                    :url="mainurl"
                    :param="mainparam"
                    :reload="dataTableReload"
                    height="600px"
                    @dbclick="actionThis"
                >
                    <el-table-column label="序号" align="center" type="index" width="65px"></el-table-column>
                    <el-table-column prop="history_num" label="奖励编号" align="center"></el-table-column>
                    <el-table-column prop="content" label="中奖内容" align="center"></el-table-column>
                    <el-table-column prop="lottery_history_status" label="兑奖状态" align="center">
                        <template slot-scope="scope">
                            <div>{{statusList[scope.row.lottery_history_status]}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="cash_code" label="兑换码" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.cash_code">{{scope.row.cash_code}}</span>
                            <span v-if="!scope.row.cash_code">-</span>
                        </template>
                    </el-table-column>

                    <el-table-column prop="nickname" label="所属用户" align="center"></el-table-column>
                    <el-table-column prop="name" label="所属学院" align="center" v-if="showCollege"></el-table-column>
                    <el-table-column prop="created_at" label="抢到时间" align="center"></el-table-column>

                    <el-table-column  label="操作" align="center" width="200">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" round @click="setCash(scope.row.id)"  v-if="scope.row.lottery_history_status==1">兑现</el-button>
                            <!-- <el-button type="danger" size="mini" round @click="deleCash(scope.row.id)" v-if="scope.row.lottery_history_status==1">结束</el-button> -->
                            <span v-if="scope.row.lottery_history_status==2">已兑换</span>
                            <span v-if="scope.row.lottery_history_status==3">异常,取消</span>
                            <span v-if="scope.row.lottery_history_status==4">未中奖</span>
                        </template>
                    </el-table-column>
                </TableProxy>
            </el-col>
        </el-row>

        <Edit name="edit-list"
              :ajax-proxy="ajaxProxy"
              @submit-success="handleReload"/>

    </div>
</template>

<script>
    import PageMix from '@/mix/Page'
    import config from '@/mix/Delete'
    import SearchTool from '@/mix/SearchTool'
    import DataTable from '@/mix/DataTable'
    import TableProxy from '@/components/Commontable/Table'
    import UserPacketAjaxProxy from '@/api/lottery_history'
    import Edit from './Edit'

    export default {
        name: 'Videos',
        mixins: [PageMix, DataTable, config, SearchTool, UserPacketAjaxProxy],
        components: { TableProxy,Edit },
        data() {
            return {
                ajaxProxy: UserPacketAjaxProxy,
                mainurl: UserPacketAjaxProxy.getUrl(),
                mainparam: '',
                total: '100',
                dataLoad: false,
                searchForm: {
                    lottery_history_status:'',
                    history_num:'',
                },
                statusList:{
                    1: '未兑换',
                    2: '已兑现',
                    3: '异常,取消',
                    4: '未中奖',
                },
                showCollege:false

            }
        },
        methods:{
            getAjaxProxy() {
                return this.ajaxProxy
            },
            actionThis(row) {
                // this.$modal.show('edit-list', { model: row })
            },
            onSearchChange(param) {
                this.mainparam = JSON.stringify(param)
            },
            onSearchReset() {
                this.videoProxy.load()
            },
            alertShow(msg){
                this.$message({
                    message: msg,
                    type: 'success'
                });
            },
            setCash(id) {
                this.$msgbox({
                    title: '消息',
                    message: '确定兑换？？',
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(action => {
                    UserPacketAjaxProxy.find(id)
                    .then(pro=>{
                        this.alertShow(pro.msg);
                        this.refresh();
                    }).catch(error=>{
                        this.$message({
                            message:'兑换失败',
                            type: 'error'
                        });
                    })
                });
            },
            // deleCash(id) {
            //     // return this.alertShow('待写');
            //     this.$msgbox({
            //         title: '消息',
            //         message: '确定该',
            //         showCancelButton: true,
            //         confirmButtonText: '确定',
            //         cancelButtonText: '取消'
            //     }).then(action => {
            //         UserPacketAjaxProxy.delete(id)
            //         .then(pro=>{
            //             this.alertShow(pro.msg);
            //             this.refresh();
            //         });
            //     });
            // },
            refresh(){
                this.dataTableReload++;
            },
            addPacket(){
                console.log('dsad');
            },
            getShowCollege(){
                if(this.$store.getters.roles['0']=='administrator'){
                    return this.showCollege=true;
                }
            }
            // searchToolReset(){
            //  this.searchForm={}
            //  this.refresh()
            // }
        },
        created() {
            this.$on('search-tool-change', this.onSearchChange)
            this.getShowCollege()
        },
        mounted() {

        },

    }
</script>

<style>
</style>