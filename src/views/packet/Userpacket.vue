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
                    <el-form-item label="红包状态" prop="status">
                        <el-select v-model="searchForm.status">
                            <el-option v-for="(item,index) in statusList" :key="index" :label="item" :value="index"> 
                            <!-- {{index}} -->
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="红包编号" prop="packetNum">
                        <el-input v-model="searchForm.packetNum" placeholder="请输入红包编号"></el-input>
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
                    <el-table-column prop="packet_num" label="红包编号" align="center"></el-table-column>
                    <el-table-column prop="nickname" label="用户" align="center"></el-table-column>
                    <el-table-column prop="name" label="所属学院" align="center" v-if="showCollege"></el-table-column>

                    <el-table-column prop="money" label="抢到红包金额" align="center"></el-table-column>
                    <el-table-column prop="get_time" label="抢到时间" align="center"></el-table-column>
                    <el-table-column prop="cash_time" label="兑现时间" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.packet_type=='1'">积分红包，直接到账</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="cash_code" label="兑换码" align="center"></el-table-column>
                    <el-table-column prop="cash_wx" label="兑换微信号码" align="center"></el-table-column>
                    <el-table-column prop="end_time" label="结束时间" align="center"></el-table-column>

                    <el-table-column  label="操作" align="center" width="200">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" round @click="setCash(scope.row.id)"  v-if="scope.row.user_packet_status==1">兑现</el-button>
                            <!-- <el-button type="danger" size="mini" round @click="deleCash(scope.row.id)" v-if="scope.row.user_packet_status==1">结束</el-button> -->
                            <span v-if="scope.row.user_packet_status==2">已兑换</span>
                            <!-- <span v-if="scope.row.user_packet_status==3">异常,取消</span> -->
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
    import UserPacketAjaxProxy from '@/api/userpacket'
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
                    status:'',
                    packetNum:'',
                },
                statusList:{
                    1: '未兑换',
                    2: '已兑现',
                    3: '异常,取消',
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
                this.$modal.show('edit-list', { model: id })
                // this.$msgbox({
                //     title: '消息',
                //     message: '确定发放红包？？',
                //     showCancelButton: true,
                //     confirmButtonText: '确定',
                //     cancelButtonText: '取消'
                // }).then(action => {
                //     UserPacketAjaxProxy.find(id)
                //     // .then(pro=>{
                //     //     this.alertShow(pro.msg);
                //     //     this.refresh();
                //     // });
                // });
            },
            deleCash(id) {
                this.$msgbox({
                    title: '消息',
                    message: '确定由于该红包异常要提前结束？？',
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(action => {
                    UserPacketAjaxProxy.delete(id)
                    .then(pro=>{
                        this.alertShow(pro.msg);
                        this.refresh();
                    });
                });
            },
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