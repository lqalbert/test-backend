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
                    <el-form-item label="直播间信息" prop="user_type">
                        <!-- <el-input size="small" placeholder="S000001"   disabled ></el-input> -->
                        <el-select v-model="searchForm.user_type" placeholder="请选择">
                            <el-option
                              v-for="item in typeList"
                              :key="item.name"
                              :label="item.name"
                              :value="item.item">
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
                        <el-button @click="exportxls"
                                   size="small" type="primary">导出文件
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
                    <el-table-column label="序号" align="center" type="index" width="100px"></el-table-column>
                    <!-- <el-table-column prop="room_number" label="直播间号" align="center" ></el-table-column> -->
                    <el-table-column prop="nickname" label="昵称" align="center" ></el-table-column>
                    <el-table-column prop="role_comment" label="账户类型" align="center" ></el-table-column>
                    <el-table-column prop="content" label="内容" align="center" ></el-table-column>
                    <el-table-column prop="send_time" label="发送时间" align="center" ></el-table-column>

                </TableProxy>
            </el-col>
        </el-row>



   
    </div>
</template>

<script>
    import PageMix from '@/mix/Page'
    import config from '@/mix/Delete'
    import SearchTool from '@/mix/SearchTool'
    import DataTable from '@/mix/DataTable'
    import TableProxy from '@/components/Commontable/Table'
    import LivePasswordAjaxProxy from '@/api/chatmsg'
    import APP_CONST from '@/config/index'

    export default {
      name: 'Videos',
      mixins: [PageMix, DataTable, config, SearchTool, LivePasswordAjaxProxy],
      components: { TableProxy },
      data() {
        return {
          ajaxProxy: LivePasswordAjaxProxy,
          mainurl: LivePasswordAjaxProxy.getUrl(),
          mainparam: '',
          total: '100',
          dataLoad: false,
          searchForm: {
            user_type: 'all'
          },
          typeList: [
            {name:'全部',item:'all'},
            {name:'真实用户',item:'real'},
            {name:'水军',item:'navy'},
          ],
          imgLink: APP_CONST.BASE_URL
        }
      },
      methods: {
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
        refresh() {
          this.dataTableReload++
        },
        getRoomList() {
          // console.log('getRoomList')
          LivePasswordAjaxProxy.find('1').then(response => {
            this.roomList = response.data
          }).catch(error => {

          })
        },
        exportxls() {
          // 访问export方法
          // LivePasswordAjaxProxy.exportxls()
          window.open(APP_CONST.BASE_URL + '/admin/chatmsg-exportxls?id=' + this.$store.getters.company_id + '&user_type='+this.searchForm.user_type)
        }
      },
      created() {
        this.$on('search-tool-change', this.onSearchChange)
        // this.getRoomList()
    },
      mounted() {

      }

    }
</script>

<style>
</style>