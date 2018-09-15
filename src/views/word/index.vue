<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-form :inline="true" ref="searchForm" class="demo-form-inline" size="small">
                    <el-form-item>
                        <el-button type="primary" size="small" icon="el-icon-refresh"
                                   @click="refresh">
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
                    <el-table-column prop="robots" label="词汇" align="center" width="">
                      <template slot-scope="scope">
                        <el-tag class="el-tag" v-for="(item, index) of scope.row.search_keys ">{{item}}</el-tag>
                        </template>
                    </el-table-column>                    
                    <el-table-column  label="操作" align="center" width="300">
                        <template slot-scope="scope">
                            <el-button type="success" size="mini" round @click="editWord(scope.row)" >修改</el-button>
                            <!-- <el-button type="primary" size="mini" round @click="deleWord(scope.row.id)" >删除</el-button> -->
                        </template>
                    </el-table-column>
                </TableProxy>
            </el-col>
        </el-row>

        <Edit name="edit-list"
              :ajax-proxy="ajaxProxy"
              @submit-success="editWordSucess"/>
      </div>
</template>

<script>
    import PageMix from '@/mix/Page'
    import config from '@/mix/Delete'
    import SearchTool from '@/mix/SearchTool'
    import DataTable from '@/mix/DataTable'
    import TableProxy from '@/components/Commontable/Table'
    import WordAjaxProxy from '@/api/word'
    import Edit from './EditWord'

    import APP_CONST from '@/config/index'

    export default {
        name: 'Videos',
        mixins: [PageMix, DataTable, config, SearchTool, WordAjaxProxy],
        components: { TableProxy,Edit},
        data() {
            return {
                ajaxProxy: WordAjaxProxy,
                mainurl: WordAjaxProxy.getUrl(),
                mainparam: '',
                total: '100',
                dataLoad: false,
                searchForm:[],
                imgLink: APP_CONST.BASE_URL
            }
        },
        methods:{
            getAjaxProxy() {
                return this.ajaxProxy
            },
            editWord(row) {
                this.$modal.show('edit-list', { model: row })
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
            
            refresh(){
                this.dataTableReload++;
            },
            /*关于机器人的四种操作*/
            editWordSucess(){
              this.refresh()
            },
        },
        created() {
            this.$on('search-tool-change', this.onSearchChange)
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