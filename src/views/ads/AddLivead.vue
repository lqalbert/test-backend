<template>
    <div>
        <myDialog title="添加直播间广告" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-form :model="addForm" ref="addForm" :rules="rules" :label-width="labelWidth" :label-position="labelPosition">
                <el-form-item label="名称" prop="live_ad_name">
                    <el-input size="small" placeholder="名称" v-model="addForm.live_ad_name"></el-input>
                </el-form-item>
               <!--  
                <el-form-item label="跳转链接" prop="url_addr">
                    <el-input size="small" placeholder="名称" v-model="addForm.url_addr"></el-input>
                </el-form-item> -->

                <el-form-item label="直播间" prop="room_number">
                    <el-select v-model="addForm.room_number" placeholder="请选择">
                        <el-option
                          v-for="(item,index) of roomList"
                          :key="item.room_number"
                          :label="item.room_number"
                          :value="item.room_number">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="广告图" prop="url_img">
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
                <span>请注意图片规格最好为：1400x170</span>
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
                live_ad_name: '',
                room_number:'',
                url_img: '',
                url_addr:'',
            },
            roomList:[],
            rules: {
                live_ad_name: [
                    { required: true, message: '必须填写', trigger: 'blur' },
                    { max: 10, message: '最长10位' }
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
        vmthis.addForm.url_img = res.data.url
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
    },
    uploadError(err, file, fileList) {
        this.submit_state = -1
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
        this.roomList=model.params.List[0];
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
                vmthis.addForm.url_img = vmthis.uploadImg
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