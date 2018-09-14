
<script>
	/* eslint-disable no-mixed-spaces-and-tabs */

	import StateButton from './StateButton'
export default {
  name: 'SubmitButton',
  props: {
    observer: {
      	required: true,
      type: Object
    },
    buttonState: {
      	type: Boolean,
      default: true
    }
  },
  extends: StateButton,
  created() {
    this.observer.$on('valid-error', this.setLoaded)
    this.observer.$on('submit-final', this.setLoaded)
    this.$on('submit-ing', this.setLoading)
  }
}
</script>

<style>
</style>