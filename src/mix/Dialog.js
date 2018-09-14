const config = {
  props: {
    name: {
      required: true,
      type: String
    },
    width: {
      type: [String, Number],
      default: '50%'
    },
    height: {
      type: [String, Number],
      default: 'auto'
    }
  },
  methods: {
    handleClose() {
      this.$modal.hide(this.name)
    }
  },
  beforeDestroy() {
    if (this.dialogThis) {
      this.dialogThis = null
    }
  }
}

export default config
