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
                    <el-form-item>
                        <el-button type="primary" size="small" icon="search"
                                   @click="createPacket">添加房间列表
                        </el-button>
                    </el-form-item>                    
                    
                    <el-form-item label="直播间房间号" prop="room_number">
                        <!-- <el-input size="small" placeholder="S000001"   disabled ></el-input> -->
                        <el-select v-model="searchForm.room_number" placeholder="请选择">
                            <el-option
                              v-for="item in roomList"
                              :key="item.room_number"
                              :label="item.room_number"
                              :value="item.room_number">
                            </el-option>
                        </el-select>

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
                    <el-table-column prop="room_number" label="直播间号" align="center" width="120px"></el-table-column>

                    <el-table-column prop="robots" label="机器人列表" align="left" width="">
                    	<template slot-scope="scope">
                    		<el-tag class="el-tag" v-for="(item, index) of scope.row.robots ">{{item}}</el-tag>
                        </template>
                    </el-table-column>
                    
                    <el-table-column prop="nickname" label="创建人" align="center" width="100px"></el-table-column>
                    <el-table-column prop="create_time" label="创建时间" align="center" width="100px"></el-table-column>
                    <el-table-column  label="操作" align="center" width="300">
                        <template slot-scope="scope">
                            <el-button type="success" size="mini" round @click="sayRobot(scope.row)" >用户发言</el-button>
                            <el-button type="primary" size="mini" round @click="sayAllRobot(scope.row)" >批量发言</el-button>

                            <el-button type="danger" size="mini" round @click="editRobot(scope.row)" >修改列表</el-button>
                            <!-- <el-button articleType="danger" size="mini" round @click="endPacket(scope.row.id)" >结束红包</el-button> -->
                        </template>
                    </el-table-column>
                </TableProxy>
            </el-col>
        </el-row>


        <Add name="add-list"
             :ajax-proxy="ajaxProxy"
             @submit-success="addRobot"/>

        <Edit name="edit-list"
              :ajax-proxy="ajaxProxy"
              @submit-success="editRobotSuccess"/>
        <Say name="say-list"
              :ajax-proxy="ajaxProxy"
              @submit-success="sayRobotSuccess"/>
		
		<SayAll name="say-all-list"
              :ajax-proxy="ajaxProxy"
              @submit-success="sayAllRobotSuccess"/>
    </div>
</template>

<script>
    import PageMix from '@/mix/Page'
    import config from '@/mix/Delete'
    import SearchTool from '@/mix/SearchTool'
    import DataTable from '@/mix/DataTable'
    import TableProxy from '@/components/Commontable/Table'
    import LiveRobotAjaxProxy from '@/api/liverobot'
    import Edit from './Edit'
    import Add from './Add'
    import Say from './Say'
    import SayAll from './SayAll'
    import APP_CONST from '@/config/index'




    export default {
        name: 'Videos',
        mixins: [PageMix, DataTable, config, SearchTool, LiveRobotAjaxProxy],
        components: { TableProxy,Add,Edit,Say,SayAll},
        data() {
            return {
                ajaxProxy: LiveRobotAjaxProxy,
                mainurl: LiveRobotAjaxProxy.getUrl(),
                mainparam: '',
                total: '100',
                dataLoad: false,
                searchForm: {
                    status:'',
                    room_number:'',
                    // user_id:'',
                },
                statusList:{
                    1: '未发送',
                    2: '抢包中',
                    3: '已结束',
                },
                roomList:[],
                imgLink: APP_CONST.BASE_URL
            }
        },
        methods:{
            getAjaxProxy() {
                return this.ajaxProxy
            },
            createPacket(){
                this.$modal.show('add-list', { roomList:this.roomList })
            },
            actionThis(row) {
                // this.$modal.show('edit-list', { model: row })
            },
            onSearchChange(param) {
                this.mainparam = JSON.stringify(param);
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
            editRobot(row) {
                this.$modal.show('edit-list', { model: row })
            },
            sayRobot(row) {
                this.$modal.show('say-list', { model: row })
            },
            sayAllRobot(row) {
            	// console.log()
                this.$modal.show('say-all-list', { model: row })
            },
            refresh(){
                this.dataTableReload++;
            },
            /*关于机器人的四种操作*/
            addRobot(){
            	this.refresh()
            },
            editRobotSuccess(){
            	this.refresh()
            },
			sayRobotSuccess(){
				this.refresh()
			},
			sayAllRobotSuccess(){
				this.refresh()
			},
            getRoomList(){
                // console.log('getRoomList')
                LiveRobotAjaxProxy.find('1').then(response=>{
                    this.roomList=response.data;
                }).catch(error=>{

                });
            }
        },
        created() {
            this.$on('search-tool-change', this.onSearchChange)
            // this.searchForm.user_id=this.$store.getters.user_id;
            this.getRoomList();

        },
        mounted() {

        },

    }
</script>

<style>
	.el-tag{
		margin-left: 10px;
	}
</style>