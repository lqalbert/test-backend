<template>
    <div>
        <el-row>
            <el-col :span="24">
                <TableProxy
                        :url="mainurl"
                        :param="mainparam"
                        :reload="dataTableReload"
                        height="600px">
                    <el-table-column label="序号" align="center" type="index" width="65px"></el-table-column>
                    <el-table-column prop="name" label="直播间标题" align="center"></el-table-column>
                    <el-table-column prop="describe" width="150px" label="直播间简介" align="center"></el-table-column>
                    <el-table-column prop="room_number" label="直播房间号" align="center"></el-table-column>
                    <el-table-column prop="img_url" label="直播间封面" width="120px" align="center">
                        <template slot-scope="scope">
                            <img :src="url+scope.row.img_url" alt="" width="100px">
                        </template>
                    </el-table-column>
                    <el-table-column prop="user_number" label="在线人数" align="center"></el-table-column>
                    <el-table-column prop="focus_number" label="关注人数" align="center"></el-table-column>
                    <el-table-column prop="status" label="直播间启用" align="center">
                        <template slot-scope="scope">
                            <el-switch
                                    v-model="scope.row.status"
                                    active-value="1"
                                    inactive-value="0"
                                    disabled
                                    active-color="#13ce66"
                                    inactive-color="#ff4949">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column prop="update_time" width="100px" label="修改时间" align="center"></el-table-column>
                    <el-table-column prop="create_time" width="100px" label="创建时间" align="center"></el-table-column>

                    <el-table-column  label="操作" align="center" width="200">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" round @click="editLive(scope.row)">开始直播</el-button>
                        </template>
                    </el-table-column>
                </TableProxy>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div class="liveMessage">
                    直播推流地址：<span class="liveUrl">{{this.$store.getters.live_url}}</span>
                </div>
            </el-col>
            <el-col :span="24">
                <div class="liveMessage">
                    直播流名称：<span class="liveName">{{this.$store.getters.name}}</span>
                </div>
            </el-col>
            <el-col :span="24">
                <div class="liveMessage">
                    直播流密匙：<span class="livePass">{{this.$store.getters.live_key}}</span>
                </div>
            </el-col>
            <el-col :span="24">
                <div class="liveMessage">
                    示意图：<br>
                    <img :src="url+'/images/home/live0.jpg'" alt="">
                    <br><img :src="url+'/images/home/live1.jpg'" alt="">
                </div>
            </el-col>
            <el-col :span="24">
                <div class="liveMessage">
                    注意：<br>
                    1、每次点击开始直播后都会重新生成直播密匙，每个直播密匙有效期为10分钟。
                    2、只有切换直播房间才会导致rtmp地址发生变化
                </div>
            </el-col>
        </el-row>
        <Live name="edit-live"
              :ajax-proxy="ajaxProxy"
              @submit-success="handleReload"
        />
    </div>
</template>

<script>
  /* eslint-disable indent,no-mixed-spaces-and-tabs */
  import Config from '../../mix/Delete'
    import SearchTool from '../../mix/SearchTool'
    import DataTable from '../../mix/DataTable'
    import TableProxy from '../../components/Commontable/Table'
    import LiveAjaxProxy from '../../api/Live'
    import VideoAjaxProxy from '../../api/Video'
    import Live from './Live'
    import APP_CONST from '../../config/index'
export default {
  name: 'Lives',
  mixins: [Config, DataTable, SearchTool, LiveAjaxProxy, VideoAjaxProxy],
  components: { TableProxy, Live },
  data() {
    return {
      ajaxProxy: LiveAjaxProxy,
      mainurl: VideoAjaxProxy.getUrl(),
      mainparam: '{"user": ' + this.$store.getters.user_id + '}',
      total: '100',
      dataLoad: false,
      searchForm: {
      	name: '',
        room_number: ''
      },
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
    editLive(row) {
      this.$modal.show('edit-live', { model: row })
    }
  },
  created() {
    this.$on('search-tool-change', this.onSearchChange)
  },
  mounted() {}
}
</script>

<style>
    .liveMessage{
        line-height: 30px;
        color: #666;
    }
</style>