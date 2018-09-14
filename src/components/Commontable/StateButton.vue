<template>
    <span>
        <el-button size="small" v-if="!loading" @click="triggerClick" type="primary">
            <slot>
                确定
            </slot>
        </el-button>
        <el-button v-else type="primary" :loading="true">
            <slot name="ing">提交中</slot>
        </el-button>
    </span>
</template>

<script>
  export default {
    name: 'StateButton',
    props: {
      is_load: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        loading: false
      }
    },
    methods: {
      triggerClick() {
        this.loading = this.is_load
        this.$emit('click')
      },
      setLoaded() {
        this.loading = false
      },
      setLoading() {
        this.loading = true
      }
    },
    watch: {
      state: function(val, oldVal) {
        this.loading = val
      },
      buttonState: function(val, oldVal) {
        this.loading = val
      }
    },
    created() {
      this.$on('reset', this.setLoaded)
      this.$on('ing', this.setLoading)
    }
  }
</script>

<style>
</style>