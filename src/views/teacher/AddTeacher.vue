<template>
    <div>
        <myDialog title="添加讲师" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-form :model="addForm" ref="addForm" :rules="rules" :label-width="labelWidth" :label-position="labelPosition">
                <el-form-item label="讲师" prop="teacher_name">
                    <el-input size="small" placeholder="讲师" v-model="addForm.teacher_name"></el-input>
                </el-form-item>
                <el-form-item label="简介" prop="introduction">
                    <el-input size="small" placeholder="简介" v-model="addForm.introduction"></el-input>
                </el-form-item>
                <el-form-item label="证书编号" prop="code_book">
                    <el-input size="small" placeholder="证书编号" v-model="addForm.code_book"></el-input>
                </el-form-item>

                <el-form-item label="称号" prop="teacher_title">
                    <el-select v-model="addForm.teacher_title" placeholder="请选择">
                        <el-option
                          v-for="item in teacherTitleList"
                          :key="item"
                          :label="item"
                          :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="照片" prop="teacher_img">
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
                        <img v-if="url_img" :src="url_img" class="avatar" style="max-width:300px">
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
                teacher_name: '',
                introduction:'',
                code_book: '',
                teacher_title:'',
            },
            teacherTitleList:[],
            rules: {
                teacher_name: [
                    { required: true, message: '必须填写', trigger: 'blur' },
                    { max: 10, message: '最长10位' }
                ],
                introduction: [
                    { required: true, message: '必须填写', trigger: 'blur' },
                ],
                code_book: [
                    { required: true, message: '必须填写', trigger: 'blur' },
                ],
                teacher_title: [
                    { required: true, message: '必须填写', trigger: 'blur' },
                ],
                // url_img: [
                //     { required: true, message: '必须填写', trigger: 'blur' },
                // ],
            },
            url_img: '',
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
        vmthis.addForm.teacher_img = res.data.url
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
    },
    uploadError(err, file, fileList) {
      this.$message.error('上传出错：' + err.msg)
    },
    changefileList(file, fileList) {
      this.fileList = fileList
      this.url_img = URL.createObjectURL(file.raw)
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
        this.teacherTitleList=model.params.List[0];
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