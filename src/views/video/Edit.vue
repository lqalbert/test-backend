<template>
    <div>
        <myDialog title="编辑直播间" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-form :model="editForm" ref="editForm" :rules="rules" :label-width="labelWidth" :label-position="labelPosition">
                <el-form-item label="直播间标题" prop="name">
                    <el-input class="name-input" size="small" placeholder="直播间名字" v-model="editForm.name" ></el-input>
                </el-form-item>
                <el-form-item label="直播间房间号" prop="room_number">
                    <el-input size="small" :disabled="true" placeholder="直播间房间号" v-model="editForm.room_number" ></el-input>
                </el-form-item>
                <el-form-item label="直播间描述" prop="describe">
                    <el-input type="textarea" size="small" :autosize="{ minRows:3, maxRows:20}" placeholder="请输入内容" v-model="editForm.describe"></el-input>
                </el-form-item>
                <el-form-item label="直播间封面" prop="img_url">
                    <el-upload
                            ref="upload"
                            name="avatar"
                            :data="liveDir"
                            :auto-upload="false"
                            class="avatar-uploader"
                            :show-file-list="false"
                            :action='actionUrl'
                            accept="image/gif, image/jpeg,image/jpg,image/png"
                            :headers='myHeader'
                            :on-preview="handlePictureCardPreview"
                            :on-success="handleAvatarSuccess"
                            :on-error="uploadError"
                            :before-upload="beforeAvatarUpload"
                            :on-change="changefileList"
                    >
                        <img v-if="imgURL" :src="imgURL" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <!--<el-form-item label="所属公司" prop="college_id">
                    <el-input size="small" placeholder="所属公司" v-model="editForm.company.name" disabled></el-input>
                </el-form-item>-->
                <el-form-item label="基准人数" prop="base_number">
                    <el-input size="small" placeholder="基准人数" v-model="editForm.base_number"></el-input>
                </el-form-item>
                <el-form-item label="增减人数" prop="active_number">
                    <el-input size="small" placeholder="增减人数" v-model="editForm.active_number"></el-input>
                </el-form-item>
            </el-form>
            <div slot="dialog-foot" class="dialog-footer">
                <el-button size="small" @click="handleClose">取消</el-button>
                <submit-button @click="beforeFormSubmit('editForm')"
                               :observer="dialogThis">
                    保存
                </submit-button>
            </div>
        </myDialog>
    </div>
</template>

<script>
	/* eslint-disable indent,no-mixed-spaces-and-tabs */
    import { getToken } from '../../utils/auth'
	import DialogForm from '../../mix/DialogForm'
    import APP_CONST from '../../config/index'
export default {
  name: 'editList',
  mixins: [DialogForm],
  data() {
      return {
        dialogThis: this,
        labelPosition: 'right',
        labelWidth: '120px',
        actionUrl: APP_CONST.UPLOAD_BASE_URL,
        url: APP_CONST.BASE_URL,
        myHeader: {
	        'Authorization': 'Bearer ' + getToken()
        },
        liveDir: {
          base: 'live'
        },
        editForm: {
          id: '',
          name: '',
          describe: '',
          room_number: '',
          img_url: '',
          company: '',
          college_id: '',
          base_number: '',
          active_number: '',
          user_number: ''
        },
        rules: {},
        model: '',
        fileList: [],
        imgURL: '',
        submit_stat: ''
      }
  },
  methods: {
      onOpen(param) {
        this.model = param.params.model
      },
      getAjaxPromise(model) {
        return this.ajaxProxy.update(model.id, model)
      },
	  handleAvatarSuccess(res, file) {
      	const vmthis = this
      	if (res.code === 200) {
          vmthis.editForm.img_url = res.data.url
          this.formSubmit('editForm')
        } else {
          this.$message.error(res.data.msg)
        }
	  },
	  beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
	  },
    handlePictureCardPreview(file) {
      // this.editForm.img_url = file
    },
    uploadError(err, file, fileList) {
	    this.$message.error('上传出错：' + err.msg)
	    this.submit_state = -1
	    this.$refs['submit-button'].$emit('reset')
    },
    changefileList(file, fileList) {
      this.fileList = fileList
      this.imgURL = URL.createObjectURL(file.raw)
    },
    handleRemove(file, fileList) {},
    beforeFormSubmit(name) {
      this.submitUpload()
      this.reals(name)
    },
    submitUpload() {
      if (this.fileList.length === 0) {
      	this.submit_stat = 2
      } else {
      	this.submit_stat = 1
      	this.$refs.upload.submit()
      }
      // this.$refs.upload.submit()
    },
    reals(name) {
      const vmthis = this
      if (vmthis.d) {
      	clearTimeout(vmthis.d)
      }
      if (vmthis.submit_stat === -1 || vmthis.submit_stat === 1) {
      	return
      }
      vmthis.d = setTimeout(function() {
        if (vmthis.submit_stat === 2) {
          vmthis.formSubmit(name)
        } else {
        	vmthis.reals(name)
        }
      }, 2000)
    }
  },
  watch: {
      model: function(val, oldVal) {
        for (const key in this.editForm) {
          if (this.editForm.hasOwnProperty(key)) {
            this.editForm[key] = val[key]
          }
        }
        this.imgURL = this.url + this.editForm.img_url
      }
  },
  created() {
  }
}
</script>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        min-width: 100px;
        min-height: 60px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        min-width: 100px;
        max-width: 100%;
        min-height: 60px;
        max-height: 200px;
        display: block;
    }
</style>