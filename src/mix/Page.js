const PageMix = {
  created: function() {
    console.log(this.$options.name)
    this.$on('page-reset', function() {
      console.log('todo reseting', '强制重新渲染组件')
    })
  },
  activated: function() {
    console.log(this.$options.name, 'activated')
    this.$emit('page-loaded', { 'name': this.$options.name || '未定义name', 'title': this.$options.pageTitle || '未定义pageTitle' })
  },
  deactivated: function() {
    console.log(this.$options.name, 'deactivated')
    this.$emit('deactivated', this)
  },
  beforeDestroy: function() {

  },
  destroy: function() {

  }
}

export default PageMix
