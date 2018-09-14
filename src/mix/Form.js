import SubmitButton from '../components/Commontable/SubmitButton'

const config = {
  components: {
    SubmitButton
  },
  methods: {
    formSubmit(name) {
      const model = this[name]
      if (this.$refs[name].rules) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.realSubmit(model, name)
          } else {
            console.log('error submit!!', name)
            this.$emit('valid-error', name)
            return false
          }
        })
      } else {
        this.realSubmit(model, name)
      }
    },
    getAjaxPromise(model) {
      this.$alert('你需要定义一个getAjaxPromise方法，详见mix/Form.js', '错误', {
        confirmButtonText: '确定'
      })
      return false
    },
    realSubmit(model, name) {
      const ajaxPromise = this.getAjaxPromise(model)
      const vmthis = this
      ajaxPromise.then(function(response) {
        if (response.data.code !== 200) {
          vmthis.$message.error(response.data.msg ? response.data.msg : '操作失败')
          vmthis.$emit('submit-error', name)
        } else {
          vmthis.$message.success(response.data.msg)
          vmthis.$refs[name].resetFields()
          vmthis.$emit('submit-success', name)
        }
      }).catch(function(error) {
        console.log(error)
        if (error.response.data.code && error.response.data.code === 422) {
          const x = error.response.data
          const message = []
          for (const key in x) {
            if (x.hasOwnProperty(key)) {
              const element = x[key]
              message.push(element)
            }
          }
          vmthis.$message.error(message.join())
        } else {
          console.log(error)
          vmthis.$message.error('出错了')
        }
      }).then(function() {
        vmthis.$emit('submit-final', name)
      })
    }
  },
  created() {

  }
}

export default config
