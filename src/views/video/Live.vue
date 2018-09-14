<template>
    <div>
        <MyDialog title="直播设置" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-form :model="editForm" ref="editForm" :rules="rules" :label-width="labelWidth" :label-position="labelPosition">
                <el-form-item label="直播间标题" prop="name">
                    <el-input class="name-input" size="small" placeholder="直播间名字" v-model="editForm.name" ></el-input>
                </el-form-item>
                <el-form-item label="直播间房间号" prop="room_number">
                    <el-input size="small" placeholder="直播间房间号" disabled v-model="editForm.room_number" ></el-input>
                </el-form-item>
                <el-form-item label="直播间描述" prop="describe">
                    <el-input type="textarea" size="small" :autosize="{ minRows:3, maxRows:20}" placeholder="请输入内容" v-model="editForm.describe"></el-input>
                </el-form-item>
            </el-form>
            <div slot="dialog-foot" class="dialog-footer">
                <el-button size="small" @click="handleClose">取消</el-button>
                <submit-button @click="beforeSubmit('editForm')"
                               :observer="dialogThis">
                    保存
                </submit-button>
            </div>
        </MyDialog>
    </div>
</template>

<script>/* eslint-disable no-mixed-spaces-and-tabs */
import DialogForm from '../../mix/DialogForm'
export default {
  name: 'Live',
  mixins: [DialogForm],
  data() {
    return {
      dialogThis: this,
      labelPosition: 'right',
      labelWidth: '120px',
      editForm: {
      	id: '',
        name: '',
        describe: '',
        room_number: '',
        user_id: '1'
      },
      rules: {},
      model: ''
    }
  },
  methods: {
    onOpen(param) {
      this.model = param.params.model
    },
    getAjaxPromise(model) {
      return this.ajaxProxy.update(model.id, model)
    },
    beforeSubmit(name) {
      // this.formSubmit(name)
      const model = this[name]
      const ajaxPromise = this.getAjaxPromise(model)
	    const vmthis = this
	    ajaxPromise.then(function(response) {
		    if (response.data.code !== 200) {
			    vmthis.$message.error(response.data.msg ? response.data.msg : '操作失败')
			    vmthis.$emit('submit-error', name)
		    } else {
		    	vmthis.$store.dispatch('ChangeLive', ['SET_LIVE_KEY', response.data.data.key])
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
  watch: {
    model: function(val, oldVal) {
      for (const key in this.editForm) {
      	if (this.editForm.hasOwnProperty(key)) {
      		this.editForm[key] = val[key]
        }
      }
    }
  }
}
</script>

<style>
</style>