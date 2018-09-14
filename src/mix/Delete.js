/* eslint-disable handle-callback-err */
const config = {
  methods: {
    getAjaxProxy() {
      this.$alert('你需要定义一个 getAjaxProxy方法，详见mix/Delete.js', '错误', {
        confirmButtonText: '确定'
      })
      return false
    },
    handleDelete(id) {
      const vmthis = this
      const ajaxProxy = this.getAjaxProxy()
      if (!ajaxProxy) {
        return
      }
      this.$confirm('确定删除', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        ajaxProxy.delete(id).then(function(response) {
          vmthis.$message.success('操作成功')
          vmthis.$emit('delete-success')
        }).catch(function(error) {
          vmthis.$message.error('出错了')
        })
      })
    },

  },
  created() {
    if (typeof this.handleReload === 'function') {
      this.$on('delete-success', this.handleReload)
    }
  }
}
export default config
