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
                                   @click="addAnswer">添加问题
                        </el-button>
                    </el-form-item>                    
                    
                    <el-form-item label="搜索" prop="search_keys">
                        <el-input size="small" placeholder="关键词"   v-model="searchForm.search_keys"  ></el-input>
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
                    <el-table-column prop="title" label="标题" align="center" width="120px"></el-table-column>
                    <el-table-column prop="content" label="内容" align="center" ></el-table-column>
                    <el-table-column prop="robots" label="关键词" align="left" width="">
                    	<template slot-scope="scope">
                    		<el-tag class="el-tag" v-for="(item, index) of scope.row.search_keys ">{{item}}</el-tag>
                        </template>
                    </el-table-column>                    
                    <el-table-column prop="name" label="名称" align="center" width="200px" v-if="showCollege"> </el-table-column>

                    <el-table-column  label="操作" align="center" width="300">
                        <template slot-scope="scope">
                            <el-button type="success" size="mini" round @click="editAnswer(scope.row)" >修改</el-button>
                            <el-button type="primary" size="mini" round @click="deleAnswer(scope.row.id)" >删除</el-button>
                        </template>
                    </el-table-column>
                </TableProxy>
            </el-col>
        </el-row>


        <Add name="add-list"
             :ajax-proxy="ajaxProxy"
             @submit-success="addAnswerSucess"/>

        <Edit name="edit-list"
              :ajax-proxy="ajaxProxy"
              @submit-success="editAnswerSucess"/>
	    </div>
</template>

<script>
    import PageMix from '@/mix/Page'
    import config from '@/mix/Delete'
    import SearchTool from '@/mix/SearchTool'
    import DataTable from '@/mix/DataTable'
    import TableProxy from '@/components/Commontable/Table'
    import AnswerAjaxProxy from '@/api/answer'
    import Edit from './Editanswer'
    import Add from './Addanswer'

    import APP_CONST from '@/config/index'




    export default {
        name: 'Videos',
        mixins: [PageMix, DataTable, config, SearchTool, AnswerAjaxProxy],
        components: { TableProxy,Add,Edit},
        data() {
            return {
                ajaxProxy: AnswerAjaxProxy,
                mainurl: AnswerAjaxProxy.getUrl(),
                mainparam: '',
                total: '100',
                dataLoad: false,
                searchForm: {
                    search_keys:'',
                },
                statusList:{
                    1: '未发送',
                    2: '抢包中',
                    3: '已结束',
                },
                roomList:[],
                imgLink: APP_CONST.BASE_URL,
                showCollege:false
            }
        },
        methods:{
            getAjaxProxy() {
                return this.ajaxProxy
            },
            addAnswer(){
                this.$modal.show('add-list', { roomList:this.roomList })
            },
            editAnswer(row) {
                this.$modal.show('edit-list', { model: row })
            },
            deleAnswer(id) {
                this.$msgbox({
		            title: '消息',
		            message: '确定删除？？',
		            showCancelButton: true,
		            confirmButtonText: '确定',
		            cancelButtonText: '取消'
		        }).then(action => {
		            AnswerAjaxProxy.delete(id).then(pro => {
		              this.alertShow(pro.data)
		              this.refresh()
		              // return;
		            })
		        })
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
            
            refresh(){
                this.dataTableReload++;
            },
            /*关于机器人的四种操作*/
            addAnswerSucess(){
            	this.refresh()
            },
            editAnswerSucess(){
            	this.refresh()
            },
            getShowCollege(){
                if(this.$store.getters.roles['0']=='administrator'){
                    return this.showCollege=true;
                }
            }
        },
        created() {
            this.$on('search-tool-change', this.onSearchChange)
            this.getShowCollege();
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