<template>
    <div>
        <myDialog title="添加直播间" :name="name" :width="width" :height="height">
            <el-form :model="addForm" ref="addForm" :rules="rules" :label-width="labelWidth" :label-position="labelPosition">
                <el-form-item label="直播间标题" prop="name">
                    <el-input class="name-input" size="small" placeholder="直播间名字" v-model="addForm.name" ></el-input>
                </el-form-item>
                <el-form-item label="直播间房间号" prop="room_number">
                    <el-input size="small" placeholder="直播间房间号" v-model="addForm.room_number" ></el-input>
                </el-form-item>
                <el-form-item label="直播间描述" prop="describe">
                    <el-input type="textarea" size="small" :autosize="{ minRows:3, maxRows:20}" placeholder="请输入内容" v-model="addForm.describe"></el-input>
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
                <el-form-item label="所属公司" prop="college_id">
                    <el-select v-model="addForm.college_id" placeholder="请选择">
                        <el-option
                                v-for="item in collegeArray"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="推流地址" prop="push_url">
                    <el-input size="small" placeholder="推流地址" v-model="addForm.push_url" value="rtmp://yanggang112.51vip.biz/lives?key=asd123456"></el-input>
                </el-form-item>
                <!--<el-form-item label="在线人数" prop="user_number">
                    <el-input size="small" placeholder="在线人数" v-model="addForm.user_number" disabled></el-input>
                </el-form-item>-->
                <el-form-item label="基准人数" prop="base_number">
                    <el-input size="small" placeholder="在线人数" v-model="addForm.base_number" value="1000"></el-input>
                </el-form-item>
                <el-form-item label="增减人数" prop="active_number">
                    <el-input size="small" placeholder="在线人数" v-model="addForm.active_number" value="1000"></el-input>
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
import DialogForm from '../../mix/DialogForm'
import APP_CONST from '../../config/index'
import { getToken } from '../../utils/auth'
export default {
  name: 'addList',
  mixins: [DialogForm],
  props: {
  	userArray: {
      type: Array,
      default: null
    },
    collegeArray: {
      type: Array,
      defaule: null
    }
  },
  data() {
    return {
      dialogThis: this,
      labelPosition: 'right',
      labelWidth: '120px',
      addForm: {
        name: '',
        describe: '',
        room_number: '',
        img_url: '',
        college_id: this.$store.getters.company_id,
        user_number: '0',
        active_number: '0',
        base_number: '0',
        push_url: 'rtmp://yanggang112.51vip.biz/lives/dml?key=asd123456'
      },
      rules: {
        name: [
          { required: true, message: '房间标题必填', trigger: 'blur' },
          { max: 50, message: '最长50个字符', trigger: 'blur' }
        ],
        room_number: [
          { required: true, message: '房间号必填，列如：S00021', trigger: 'blur' },
          { min: 6, max: 6, message: '只能为6个字符', trigger: 'blur' }
        ],
        describe: [
          { required: true, message: '房间描述必填', trigger: 'blur' },
          { max: 200, message: '最长200个字符', trigger: 'blur' }
        ],
        push_url: [
          { required: true, message: '推流地址必填', trigger: 'blur' },
          { min: 10, max: 200, message: '最长200个字符', trigger: 'blur' }
        ]
      },
      imgURL: '',
      liveDir: {
        base: 'live'
      },
      myHeader: {
        'Authorization': 'Bearer ' + getToken()
      },
      actionUrl: APP_CONST.UPLOAD_BASE_URL,
      fileList: [],
      submit_state: '1',
      uploadImg: ''
    }
  },
  methods: {
    getAjaxPromise(model) {
      return this.ajaxProxy.create(model)
    },
    handleAvatarSuccess(res, file) {
      const vmthis = this
      if (res.code === 200) {
        vmthis.addForm.img_url = res.data.url
        this.uploadImg = res.data.url
        this.formSubmit('addForm')
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
    	console.log('预览')
      this.url = ''
		  // this.editForm.img_url = file
    },
    uploadError(err, file, fileList) {
      this.submit_state = -1
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