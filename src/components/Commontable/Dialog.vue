<template>
    <div>
        <modal
                transition="slide-fade"
                :pivot-y="0.3"
                :width="width"
                :height="height"
                :name="name"
                :draggable="true"
                :reset="true"
                :click-to-close="false"
                :resizable="true"
                @closed="handleClose"
                @before-open="onBeforeOpen"
                @opened="onOpened"
                @before-close="onBeforeClose"
        >
            <div class="dialog-head">
                <span class="dialog-closebutton" @click.stop="$modal.hide(name)">
                    <i class="el-icon-close pull-right"></i>
                </span>
                <h4>{{title}}</h4>
            </div>
            <div class="dialog-content padding" @mousedown.stop="onKeyDown">
                <slot/>
            </div>
            <div class="dialog-foot padding" @mousedown.stop="onKeyDown">
                <slot name="dialog-foot"/>
            </div>
        </modal>
    </div>
</template>

<script>
	export default {
	  name: 'MyDialog',
  props: {
    name: {
      required: true,
      type: String,
      default: 'unname'
    },
    title: {
      type: String,
      default: 'Dialog'
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
      this.$emit('close', this.name)
    },
    onBeforeOpen(param) {
      this.$emit('before-open', param)
    },
    onOpened(param) {
      this.$emit('opened', param)
    },
    onBeforeClose(param) {
      this.$emit('before-close', param)
    },
    onKeyDown() {

    }
  },
  watch: {
    width(val, oldVal) {
      console.log(val)
    },
    height(val, oldVal) {
      console.log(val)
    }
  },
  created() {

  },
  mounted() {

  }
}
</script>

<style scoped>
    h4{
        margin: 0;
    }
    .padding{
        padding:15px
    }
    .dialog-head{
        padding:15px;
        border-bottom: 1px solid #e5e5e5;
        cursor: all-scroll;
    }
    .dialog-closebutton{
        cursor: pointer;
        color: #bfcbd9;
        position: absolute;
        right: 10px;
        top: 10px;
        font-size: 24px;
    }
    .dialog-closebutton:hover{
        color:black;
    }
    .dialog-foot{
        text-align: right;
    }
</style>