<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name:{{name}}</div>
    <div class="dashboard-text">roles:<span v-for='role in roles' :key='role'>{{role}}</span></div>
    <el-form ref="editForm" v-loading="dataLoad" :model="editForm" label-width="140px">
      <el-form-item label="">
        <div style="height: 40px;line-height: 40px"></div>
      </el-form-item>
      <el-form-item label="直播推流地址" prop="pushUrl">
        <div>{{editForm.push_url}}</div>
      </el-form-item>
      <el-form-item label="直播推流名称" prop="pushName">
        <div>{{editForm.pushName}}</div>
      </el-form-item>
      <el-form-item label="企业宣传片地址" prop="videoUrl">
        <el-input
                style="width: 500px"
                placeholder="请输入内容"
                v-model="editForm.videoUrl"
                clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="观看码设置" prop="liveCode">
        <el-input
                style="width: 200px"
                placeholder="请输入内容"
                v-model="editForm.live_code">
        </el-input>
      </el-form-item>
      <el-form-item label="是否直播" prop="isLive">
        <el-switch
                v-model="editForm.status"
                active-value="y"
                inactive-value="n"
                active-color="#13ce66"
                inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
      <el-form-item label="直播弹窗时间" prop="liveTime">
        <el-input-number v-model="editForm.pop_time" @change="handleChanges" :min="0" :max="10" label="描述文字"></el-input-number>&nbsp;&nbsp;分钟
        <span style="color: red;font-size: 14px">*设置为0则不出现弹窗</span>
      </el-form-item>
      <el-form-item label="弹窗图片" prop="pop_url">
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
        <submit-button @click="beforeFormSubmit" :observer="dialogThis">
          保存
        </submit-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>/* eslint-disable no-mixed-spaces-and-tabs */
import { mapGetters } from 'vuex'
import APP_CONST from '../../config/index'
import { getToken } from '../../utils/auth'
import VideoProxy from '../../packages/VideoProxy'
import SubmitButton from '../../components/Commontable/SubmitButton'
import HomeProxy from '../../api/Home'
export default {
  inject: ['reload'],
  name: 'dashboard',
  components: {
  	SubmitButton
  },
  data() {
    return {
      dialogThis: this,
      dataLoad: true,
      editForm: {
      	id: '',
      	push_url: '',
        pushName: '',
        videoUrl: '',
        pop_url: '',
        status: '',
        pop_time: '',
        live_code: '',
        college_id: ''
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
    handleChanges(value) {
    },
    handleAvatarSuccess(res, file) {
      const vmthis = this
      if (res.code === 200) {
        vmthis.editForm.pop_url = res.data.url
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
        this.formSubmit('editForm')
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
      const vmthis = this
      const home = HomeProxy.update(this[name].id, this[name])
      home.then(function(response) {
        if (response.data.code !== 200) {
          vmthis.$message.error(response.data.msg ? response.data.msg : '操作失败')
        } else {
          vmthis.$message.success(response.data.msg)
          vmthis.reload()
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
      // const model = this[name]
    },
    loadMsg() {
      const video = new VideoProxy({ userMessage: this.$store.getters.user_id }, this.initMsg, this)
      this.videoProxy = video
      this.videoProxy.load()
    },
    initMsg(data) {
      const msg = data.items[0]
      for (const x in this.editForm) {
      	if (this.editForm.hasOwnProperty(x) && msg.hasOwnProperty(x)) {
          this.editForm[x] = msg[x]
        }
      }
      this.editForm.videoUrl = msg.company.address
      this.editForm.pushName = msg.users.username
      if (msg.pop_url !== '') {
        this.imgURL = this.url + msg.pop_url
      }
      this.dataLoad = false
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  created() {
    this.loadMsg()
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
.el-form-item{
  margin-bottom: 15px;
}
#avatar-uploader .el-upload{
  width: 100%;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader-icon {
  border: 1px dashed #d9d9d9;
  font-size: 28px;
  color: #8c939d;
  min-width: 178px;
  max-width: 100%;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border-radius: 6px;
}
.avatar-uploader-icon:hover {
  border-color: #409EFF;
}
.avatar {
  min-width: 178px;
  max-width: 100%;
  min-height: 178px;
  max-height: 300px;
  display: block;
}
</style>
