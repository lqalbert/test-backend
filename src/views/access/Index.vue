<template>
    <div class="hello">

        <el-row>
            <el-col>
                <TableProxy :url="mainurl" :param="mainparam" :reload="dataTableReload" :page-size="15">

                    <el-table-column label="序号" align="center" type="index" width="65"></el-table-column>

                    <el-table-column prop="role.role_name" label="角色名字" align="center"></el-table-column>

                    <el-table-column prop="role.role_comment" label="角色说明"  align="center"></el-table-column>

                    <el-table-column prop="role.role_mark" label="角色标签"  align="center"></el-table-column>

                    <el-table-column  fixed="right"  label="操作" align="center" width="220">
                        <template slot-scope="scope">
                            <el-button type="danger" size="small" @click="showEdit(scope.row)">授权</el-button>
                        </template>
                    </el-table-column>

                </TableProxy>
            </el-col>
        </el-row>

        <Edit name="edit-list"
             :ajax-proxy="ajaxProxy"
             :colleges="colleges"
             :showCollege="showCollege"
             @submit-success="handleReload"/>

    </div>
</template>

<script>
    import Edit from './Edit'
    import TableProxy from '../../components/Commontable/Table'
    import config from '../../mix/Delete'
    import SearchTool from '../../mix/SearchTool';
    import DataTable from '../../mix/DataTable';
    import PageMix from '../../mix/Page';
    import AccessProxy from '../../packages/AccessProxy';
    import AccessAjaxProxy from '../../api/access';
    import CollegeProxy from '../../packages/CollegeProxy';
    import CollegeAjaxProxy from '../../api/college';
    import { mapActions,mapGetters } from 'vuex';

    export default {
        name:'Access',
        mixins: [SearchTool, DataTable, PageMix, config],
        components: {  Edit, TableProxy },
        data(){
            return{
                ajaxProxy:AccessAjaxProxy,
                mainurl:AccessAjaxProxy.getUrl(),
                colleges: [],
                showCollege:false,
                mainparam:''
            }
        },

        methods:{
            getAjaxProxy(){
                return this.ajaxProxy;
            },
            onSearchChange(param) {
                this.mainparam = JSON.stringify(param);
            },
            showEdit(row) {
                this.$modal.show('edit-list', { model: row })
            },
            loadColleges(data) {
                this.colleges = data.items
                console.log(this.colleges)
            },
            getCanAddColleges() {
                const canAddColleges = new CollegeProxy({}, this.loadColleges, this)
                canAddColleges.load()
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