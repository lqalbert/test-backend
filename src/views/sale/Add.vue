<template>
    <div>
        <myDialog title="增加奖品" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-form :model="addForm" ref="addForm" :rules="rules" :label-width="labelWidth" :label-position="labelPosition">
                <el-form-item label="奖品文字" prop="content">
                    <el-input size="small" placeholder="红包总金额" v-model="addForm.content"></el-input>
                </el-form-item>
                <el-form-item label="类型" prop="lottery_draws_type">
                    <el-radio v-model="addForm.lottery_draws_type" label="1" border>积分</el-radio>
                    <el-radio v-model="addForm.lottery_draws_type" label="2" border>物品</el-radio>
                </el-form-item>
                <el-form-item label="积分" prop="scores" v-if="addForm.lottery_draws_type=='1'">
                    <el-input size="small" placeholder="积分" v-model="addForm.scores"></el-input>
                </el-form-item>

                <el-form-item label="奖品配图" prop="img_url">
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
                        <img v-if="imgURL" :src="imgURL" class="avatar" style="max-width:300px">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="dialog-foot" class="dialog-footer">
                <el-button size="small" @click="handleClose">取消</el-button>
                <submit-button @click="beforeFormSubmit('addForm')"
                               :observer="dialogThis">
                    保存
                </submit-button>
            </div>
        </myDialog>
    </div>
</template>

<script>
	/* eslint-disable no-mixed-spaces-and-tabs */
import { getToken } from '@/utils/auth'
import APP_CONST from '@/config/index'
	import DialogForm from '@/mix/DialogForm'
export default {
  name: 'addList',
  mixins: [DialogForm],
  data() {
      	return {
      dialogThis: this,
      labelPosition: 'right',
      labelWidth: '120px',
      addForm: {
        content: '',
        img_url: '',
        lottery_draws_type:'1',
        scores:0,
      },
      roomList: [],
      rules: {
        content: [
          { required: true, message: '必须填写', trigger: 'blur' },
          { min: 1, max: 12, message: '必须填写' }
        ],
      },
      imgURL: '',
      liveDir: {
        base: 'live'
      },
      myHeader: {
        'Authorization': 'Bearer ' + getToken()
      },
      actionUrl: APP_CONST.UPLOAD_BASE_URL,
      submit_state: '1',
      fileList:[],
      uploadImg: ''
    }
  },
  methods: {
    getAjaxPromise() {
        return this.ajaxProxy.create(this.addForm)
    },
    alertShowSuccess(msg) {
      this.$message({
        message: msg,
        type: 'success'
      })
    },
    alertShowError(msg) {
      this.$message({
        message: msg,
        type: 'error'
      })
    },
    handleAvatarSuccess(res, file) {
      const vmthis = this
      if (res.code === 200) {
        vmthis.addForm.img_url = res.data.url
        this.formSubmit('addForm')
        this.uploadImg = res.data.url
        this.submit_state = 2
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
      this.url = ''
      // this.editForm.img_url = file
    },
    uploadError(err, file, fileList) {
      this.$message.error('上传出错：' + err.msg)
    },
    changefileList(file, fileList) {
      this.fileList = fileList
      this.imgURL = URL.createObjectURL(file.raw)
    },
    handleRemove(file, fileList) {},
    beforeFormSubmit(name) {
      if (this.fileList.length === 0) {
        this.$message.error('未上传新图片')
            this.$emit('submit-final', name)
        
        return
      } else {
        this.$refs['addForm'].validate((valid) => {
          if (valid) {
                if (this.submit_state === 2) {
                    this.real(name)
                } else {
                    this.submitUpload()
                }
          } else {
            this.$emit('submit-final', name)
            console.log('error submit!!')
            return false
          }
        })
      }
    },
    submitUpload() {
        this.submit_state = 1
      this.$refs.upload.submit()
    },
    onOpen(model){
        this.roomList=model.params.roomList;
    },
    real(name) {
        const vmthis = this
        if (vmthis.d) {
            clearTimeout(vmthis.d)
        }
        if (vmthis.submit_state === -1 || vmthis.submit_state === 1) {
            return
        }
        vmthis.d = setTimeout(function() {
            if (vmthis.submit_state === 2) {
                vmthis.addForm.img_url = vmthis.uploadImg
                vmthis.formSubmit('addForm')
            } else {
                vmthis.real(name)
            }
        },1000)
    }

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
        min-width: 150px;
        min-height: 100px;
        line-height: 100px;
        text-align: center;
    }
    .avatar {
        min-width: 150px;
        min-height: 100px;
        display: block;
    }
</style>