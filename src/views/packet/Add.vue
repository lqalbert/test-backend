<template>
    <div>
        <myDialog title="增加红包" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-form :model="addForm" ref="addForm" :rules="rules" :label-width="labelWidth" :label-position="labelPosition">
                <el-form-item label="直播间房间号" prop="room_number">
                    <el-select v-model="addForm.room_number" placeholder="请选择">
                        <el-option
                          v-for="item in roomList"
                          :key="item.room_number"
                          :label="item.room_number"
                          :value="item.room_number">
                        </el-option>
                    </el-select>


                </el-form-item>
                <el-form-item label="客服二维码" prop="wx_code">
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
            
                <el-form-item label="红包总金额" prop="total_money">
                    <el-input size="small" placeholder="红包总金额" v-model="addForm.total_money"></el-input>
                </el-form-item>
                <el-form-item label="红包总个数" prop="total_num">
                    <el-input size="small" placeholder="红包总个数" v-model="addForm.total_num"></el-input>
                </el-form-item>
                <el-form-item label="最大金额" prop="max_money">
                    <el-input size="small" placeholder="最大金额" v-model="addForm.max_money"></el-input>
                </el-form-item>
                <el-form-item label="最小金额" prop="min_money">
                    <el-input size="small" placeholder="最小金额" v-model="addForm.min_money"></el-input>
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
        room_number: '',
        wx_code: '',
        total_num: '',
        total_money: '',
        max_money: '',
        min_money: ''
      },
      roomList: [],
      rules: {
        room_number: [
          { required: true, message: '必须填写', trigger: 'blur' },
          { min: 6, max: 6, message: '必须填写' }
        ],
        total_num: [
          { required: true, message: '必须填写', trigger: 'blur' },
          { min: 1, max: 3, message: '最多999' },
          { pattern: /^([1-9][0-9]*)$/, message: '正整数' }
        ],
        total_money: [
          { required: true, message: '必须填写', trigger: 'blur' },
          { min: 1, max: 3, message: '最多999' },
          { pattern: /^([1-9][0-9]*)$/, message: '正整数' }
        ],
        max_money: [
          { required: false, message: '必须填写', trigger: 'blur' },
          // {min: 1, max: 3, message: '最多999'},
          { pattern: /^[0-9]+(.[0-9]{2})?$/, message: '请精确到小数点两位' }
        ],
        min_money: [
          { required: false, message: '必须填写', trigger: 'blur' },
          // {min: 1, max: 3, message: '最多999'},
          { pattern: /^[0-9]+(.[0-9]{2})?$/, message: '请精确到小数点两位' }
        ]

      },
      imgURL: '',
      liveDir: {
        base: 'live'
      },
      myHeader: {
        'Authorization': 'Bearer ' + getToken()
      },
      actionUrl: APP_CONST.UPLOAD_BASE_URL
    }
  },
  methods: {
    getAjaxPromise() {
      // if(this.addForm.min_money*this.addForm.total_num>=this.addForm.total_money||this.addForm.max_money>this.addForm.total_money){
      //     this.alertShowError('数据错误，请重填');
      //     // return;
      // }
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
        vmthis.addForm.wx_code = res.data.url
        this.formSubmit('addForm')
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
        return
      } else {
        this.$refs['addForm'].validate((valid) => {
          if (valid) {
            this.submitUpload()
          } else {
            this.$emit('submit-final', name)
            console.log('error submit!!')
            return false
          }
        })
      }
    },
    submitUpload() {
      this.$refs.upload.submit()
    },

    onOpen(model){
        this.roomList=model.params.roomList;
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