<template>
    <div class="hello">
        <el-row>
            <el-col>
                <TableProxy :url="mainurl" :param="mainparam" :reload="dataTableReload" :page-size="15">
                    <!--<el-table-column articleTypes="selection" align="center" width="50"></el-table-column>-->

                    <el-table-column label="序号" align="center" type="index" width="65"></el-table-column>

                    <el-table-column prop="index_act" label="活动首页" width="120" align="center">
                        <template slot-scope="scope">
                            <img :src="url+scope.row.index_act" alt="" width="100px">
                        </template>
                    </el-table-column>

                    <el-table-column prop="detail_act" label="活动详情" width="120" align="center">
                        <template slot-scope="scope">
                            <img :src="url+scope.row.detail_act" alt="" width="100px">
                        </template>
                    </el-table-column>
                    <el-table-column  align="center" prop="cid" label="所属学院" v-if="showCollege">
                        <template scope="scope">
                            {{ getCollege(scope.row.cid, colleges) }}
                        </template>
                    </el-table-column>

                    <el-table-column  fixed="right"  label="操作" align="center" >
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
    import SearchTool from '../../mix/SearchTool'
    import DataTable from '../../mix/DataTable'
    import PageMix from '../../mix/Page'
    import ActivityProxy from '../../packages/ActivityProxy'
    import CollegeProxy from '../../packages/CollegeProxy';
    import ActivityAjaxProxy from '../../api/activity'
    import APP_CONST from '../../config/index'
    export default {
      name: 'activities',
      mixins: [SearchTool, DataTable, PageMix, config],
      components: { Add, Edit, TableProxy },
      data() {
        return {
          ajaxProxy: ActivityAjaxProxy,
          mainurl: ActivityAjaxProxy.getUrl(),
          mainparam: '',
          colleges: [],
          showCollege:false,
          url: APP_CONST.BASE_URL
        }
      },
      methods: {
        getAjaxProxy() {
          return this.ajaxProxy
        },
        onSearchChange(param) {
          this.mainparam = JSON.stringify(param)
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
        this.$on('search-tool-change', this.onSearchChange)
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