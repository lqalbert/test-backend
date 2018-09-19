<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name:{{name}}</div>
    <div class="dashboard-text">roles:<span v-for='role in roles' :key='role'>{{role}}</span></div>
    <el-form ref="editForm" :model="editForm" label-width="140px">
      <el-form-item label="">
        <div style="height: 40px;line-height: 40px"></div>
      </el-form-item>
      <el-form-item label="直播推流地址" prop="pushUrl">
        <div>{{editForm.pushUrl}}</div>
      </el-form-item>
      <el-form-item label="直播推流名称" prop="pushName">
        <div>{{editForm.pushName}}</div>
      </el-form-item>
      <el-form-item label="企业宣传片地址" prop="videoUrl">
        <el-input
                placeholder="请输入内容"
                v-model="editForm.videoUrl"
                clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="观看码设置" prop="liveCode">
        <el-input
                placeholder="请输入内容"
                v-model="editForm.liveCode"
                clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="是否直播" prop="isLive">
        <el-switch
                v-model="editForm.isLive"
                active-value="n"
                inactive-value="y"
                active-color="#13ce66"
                inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
      <el-form-item label="直播弹窗时间" prop="liveTime">
        <el-input-number v-model="editForm.liveTime" @change="handleChanges" :min="0" :max="10" label="描述文字"></el-input-number>分钟
        <span style="color: red;font-size: 14px">*设置为0则不出现弹窗</span>
      </el-form-item>
      <el-form-item label="弹窗图片" prop="img_url">
        <el-upload
                ref="upload"
                name="avatar"
                :data="liveDir"
                :auto-upload="false"
                id="avatar-upload"
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
      <el-form-item>
        <el-button type="primary" @click="beforeFormSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
	/* eslint-disable no-mixed-spaces-and-tabs */
	import { mapGetters } from 'vuex'
import APP_CONST from '../../config/index'
import { getToken } from '../../utils/auth'
import VideoAjaxProxy from '../../api/Video'
export default {
  name: 'dashboard',
  data() {
    return {
      editForm: {
      	pushUrl: 'www.baidu.com',
        pushName: 'dml',
        videoUrl: 'www.bilibili.com',
        isLive: 'n',
        liveTime: '1',
        liveCode: ''
      },
      inputs: 'www.baidu.com',
      url: APP_CONST.BASE_URL,
      imgURL: '',
      liveDir: {
        base: 'live'
      },
      myHeader: {
        'Authorization': 'Bearer ' + getToken()
      },
      actionUrl: APP_CONST.UPLOAD_BASE_URL,
      fileList: [],
      unChange: true,
      arr: {}
    }
  },
  methods: {
    getAjaxPromise(model) {
      return VideoAjaxProxy.create(model)
    },
  	handleChanges(value) {
      console.log(value)
    },
    handleAvatarSuccess(res, file) {
      const vmthis = this
      if (res.code === 200) {
        vmthis.addForm.img_url = res.data.url
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
        this.$refs['editForm'].validate((valid) => {
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
    formSubmit(name) {
      //const model = this[name]
    },
    formChange() {
      this.unChange = false
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.liveMsg{
  line-height: 30px;
  color: #666;
}
.liveMsg img{
  max-width: 100%;
}
#avatar-uploader .el-upload--text {
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader-icon {
  border: 1px dashed #d9d9d9;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border-radius: 6px;
}
.avatar-uploader-icon:hover {
  border-color: #409EFF;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
