<template>
    <div>
        <el-table
                ref="proxyTable"
                :data="mainData"
                v-loading="dataLoad"
                border
                highlight-current-row
                style="width: 100%"
                @sort-change="sortChange"
                @cell-dblclick="dbclick"
                @cell-click="cellclick"
                element-loading-text="拼命加载中"
                :row-class-name="rowClassName"
                :default-sort="defaultSort"
                :show-summary="showSummary">
            <slot></slot>
        </el-table>
        <br>
        <el-row type="flex" justify="end">
            <el-col :span="12">
                <slot name="buttonbar"></slot>
            </el-col>
            <el-col :span="12">
                <div class="pull-right">
                    <el-pagination
                            :current-page="currentPage"
                            :page-size="dpagesize"
                            :page-sizes="[15,20,30,40,50,100,200]"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total"
                            @current-change="currentChange"
                            @size-change="handleSizeChange"
                    >
                    </el-pagination>

                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
  /* eslint-disable no-mixed-spaces-and-tabs */
  import DataProxy from '../../utils/DataProxy'
  export default {
    name: 'TableProxy',
    props: {
      param: {
        type: String,
        default: ''
      },
      url: {
        type: [String, Object],
        default: ''
      },
      pageSize: {
        type: Number,
        default: 15
      },
      bubble: {
        type: Object,
        default: function() {
          return null
        }
      },
      reload: {
        type: Number,
        default: 0
      },
      height: {
        type: [String, Number],
        default: 'auto'
      },
      rowClassName: [String, Function],
      defaultSort: Object,
      showSummary: {
        type: Boolean,
        default: false
      },
      pageSizes: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        currentPage: 1,
        msg: 'adsf',
        mainData: [],
        dataLoad: false,
        realParam: null,
        total: 0,
        multipleSelection: [],
        dpagesize: 0,
        layout: ['total', 'prev', 'pager', 'next', 'jumper']
      }
    },
    computed: {
      layoutstr() {
        return this.layout.join(',')
      }
    },
    methods: {
      dataLoaded(data) {
        this.dataLoad = false
        this.mainData = data.items
        this.total = data.total
      },
      toggleTableLoad() {
        this.dataLoad = !this.dataLoad
      },
      currentChange(v) {
        this.dataLoad = true
        this.mainProxy.setPage(v).load()
      },
      sortChange(prop) {
        this.dataLoad = true
        this.mianProxy.setOrder(prop.prop, prop.order).load()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
        this.$emit('selection-change', this.multipleSelection)
      },
      dbclick(row) {
        this.$emit('dbclick', row)
      },
      cellclick(row) {
        this.$emit('cellclick', row)
      },
      bubleEvents() {
        console.log(arguments)
      },
      onError() {
        this.dataLoad = true
      },
      setParamAndLoad() {
        if (this.realParam) {
          this.mainProxy.setExtraParam(this.realParam)
        }
        this.toggleTableLoad()
        this.mainProxy.load()
      },
      handleSizeChange(v) {
        this.dpageszie = v
        this.dataLoad = true
        this.mainProxy.setPageSize(this.dpageszie)
        this.mainProxy.load()
      }
    },
    watch: {
      param: function(val, oldVal) {
        this.realParam = JSON.parse(val)
        if (this.realParam) {
      	this.mainProxy.setExtraParam(this.realParam)
        }
        this.toggleTableLoad()
        this.mainProxy.load()
      },
      reload: function(val, oldVal) {
        this.dataLoad = true
        this.mainProxy.load()
      }
    },
    created() {
      if (this.param) {
        this.realParam = JSON.parse(this.param)
      }
      this.dpageszie = this.pageSize
      const mainProxy = new DataProxy(this.url, this.dpageszie, this.dataLoaded, this, this.onError)
      this.mainProxy = mainProxy
      this.setParamAndLoad()
      if (this.pageSizes) {
        this.layout.splice(1, 0, 'sizes')
      }
    },
    mounted() {
      if (this.bubble) {
        for (const key in this.bubble) {
          if (this.bubble.hasOwnProperty(key)) {
            this.$refs.proxyTable.$on(key, this.bubble[key])
          }
        }
      }
    }
}
</script>

<style scoped>
    .pull-right{
        float: right;
    }
</style>