<template>
    <div>
        <MyDialog  title="添加账号" :name='name'  :width="width" :height="height" @before-open="onOpen">
            <el-form
                    ref="addForm"
                    :rules='rules'
                    :model="addForm"
                    :label-width="labelWidth"
                    :label-position="labelPosition">
                <el-tabs  type="card" v-model="activeName">
                    <el-tab-pane label="账号" name="first">
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="账号" prop="username">
                                    <el-input class="name-input" v-model="addForm.username"  auto-complete="off"></el-input>
                                </el-form-item>
                            </el-col>

                            <el-col :span="12">
                                <el-form-item label="密码" prop="password">
                                    <el-input class="name-input" type="password" v-model="addForm.password" auto-complete="off"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <!--<el-col :span="12">
                                <el-form-item label="邀请码" prop="invitation_code">
                                    <el-input class="name-input" v-model="addForm.invitation_code"></el-input>
                                </el-form-item>
                            </el-col>-->
                            <el-col :span="12">
                                <el-form-item label="昵称" prop="nickname">
                                    <el-input class="name-input" v-model="addForm.nickname" auto-complet="off"></el-input>
                                </el-form-item>
                            </el-col>

                            <el-col :span="12">
                                <el-form-item label="角色" prop="role_id">
                                    <el-select  clearable placeholder="请选择" v-model="addForm.role_id">
                                        <el-option
                                                v-for="item in options"
                                                :key="item.id"
                                                :label="item.role_comment"
                                                :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>


                        </el-row>

                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="所属学院" prop="cid" v-if="showCollege">
                                    <el-select  clearable placeholder="请选择" v-model="addForm.cid">
                                        <el-option
                                                v-for="item in colleges"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>

                            <el-col :span="12">
                                <el-form-item label="用户等级" prop="level">
                                    <el-select  clearable placeholder="请选择" v-model="addForm.level">
                                        <el-option
                                                v-for="item in leveloption"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>

                            <!--<el-col :span="12">
                                <el-form-item label="是否启用" prop="is_use">
                                    <el-radio-group v-model="addForm.is_use">
                                        <el-radio label="y" border>是</el-radio>
                                        <el-radio label="n" border>否</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>-->
                        </el-row>

                    </el-tab-pane>

                    <el-tab-pane label="其它信息" name="second">
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="头像" prop="user_img">
                                    <el-upload
                                            ref="upload"
                                            name="avatar"
                                            :data="liveDir"
                                            :auto-upload="false"
                                            class="avatar-uploader"
                                            :show-file-list="false"
                                            :action="url"
                                            accept="image/gif, image/jpeg,image/jpg,image/png"
                                            :headers='myHeader'
                                            :on-preview="handlePictureCardPreview"
                                            :on-success="handleAvatarSuccess"
                                            :on-error="uploadError"
                                            :before-upload="beforeAvatarUpload"
                                            :on-change="changefileList">
                                        <img v-if="imgURL" :src="imgURL" class="avatar">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="邮箱" prop="email">
                                    <el-input class="name-input" v-model="addForm.email"  auto-complete="off"></el-input>
                                </el-form-item>
                            </el-col>
                            <!--<el-col :span="12">
                                <el-form-item label="昵称" prop="nickname">
                                    <el-input class="name-input" v-model="addForm.nickname" auto-complet="off"></el-input>
                                </el-form-item>
                            </el-col>-->
                            <el-col :span="12">
                                <el-form-item label="手机" prop="phone">
                                    <el-input class="name-input" v-model="addForm.phone"  auto-complete="off"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>

                            <el-col :span="12">
                                <el-form-item label="地址" prop="address">
                                    <el-input class="name-input" v-model="addForm.address" auto-complet="off"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                    </el-tab-pane>
                </el-tabs>
            </el-form>
            <div slot="dialog-foot" >
                <el-button @click="handleClose()">取 消</el-button>
                <SubmitButton
                        @click="beforeFormSubmit('addForm')"
                        :observer="dialogThis" ></SubmitButton>
            </div>
        </MyDialog>
    </div>
</template>

<script>
    /* eslint-disable no-mixed-spaces-and-tabs */

    import DialogForm from '../../mix/DialogForm'
    import { getToken } from '../../utils/auth'
    import APP_CONST from '../../config/index'
    import { mapActions, mapGetters } from 'vuex'
export default {
      name: 'addList',
      mixins: [DialogForm],
      props: {
        options: {
          type: Array,
          default: []
        },
        colleges: {
          type: Array,
          default: []
        },
        leveloption: {
          type: Array,
          default: []
        },
        showCollege: {
          type: Boolean,
          default: false
        }
      },

      data() {
        return {
          dialogThis: this,
          labelPosition: 'right',
          labelWidth: '120px',
          activeName: 'first',
          addForm: {
            username: '',
            password: '',
            role_id: '',
            level: '',
            is_use: 'y',
            user_img: '/images/home/user.jpg',
            nickname: '',
            email: '',
            phone: '',
            address: '',
            sockpuppet: 'n',
            cid: '',
            pid: this.$store.getters.user_id
          },
          url: APP_CONST.UPLOAD_BASE_URL,
          rules: {
            username: [
              { required: true, message: '只能输入字母、数字、下划线', trigger: 'blur' },
              { min: 1, max: 32, message: '长度在 1 到 32个字符', trigger: 'blur' },
              // { pattern: /^[\u4E00-\u9FA5]+$/, message: '用户名只能为中文'}
              { pattern: /^([A-Za-z0-9_-]){1,32}$/, message: '只能输入1-32个字母、数字、下划线' }
            ],
            password: [
              { required: true, message: '请设置密码6-16位，不能使用空格', trigger: 'blur' },
              { pattern: /^([^\s]){6,16}$/, message: '请设置密码6-16位，不能使用空格' }
            ],
            /* invitation_code: [
                  { required: true, message: '请输入1-6个数字或字母', trigger: 'blur' },
                  { min: 1, max: 6, message: '长度在 1 到 6个字符', trigger: 'blur' },
                  { pattern: /^([A-Za-z0-9]){1,6}$/, message: '只能输入1-6个数字或字母' }
              ],*/
            nickname: [
              { required: true, min: 1, max: 32, message: '长度在 1 到 32个字符', trigger: 'blur' }
            ],
            email: [
              { min: 1, max: 32, message: '长度在 1 到 32个字符', trigger: 'blur' }
            ],
            phone: [
              { min: 1, max: 32, message: '长度在 1 到 32个字符', trigger: 'blur' }
            ],
            address: [
              { min: 1, max: 32, message: '长度在 1 到 32个字符', trigger: 'blur' }
            ],
            role_id: [
              { required: true, message: '请选择角色', trigger: 'change' }
            ],
            level: [
              { required: true, message: '请选择用户等级', trigger: 'change' }
            ],
            is_use: [
              { required: true, message: '请选择是否启用', trigger: 'change' }
            ],
            cid: [
              { required: true, message: '请选择所属学院', trigger: 'change' }
            ]
          },
          imgURL: '',
          liveDir: {
            base: 'live'
          },
          myHeader: {
            'Authorization': 'Bearer ' + getToken()
          },
          fileList: [],
          submit_state: '1',
          uploadImg: ''
        }
      },
      methods: {
        onOpen() {
          this.imgURL = ''
        },
        getAjaxPromise(model) {
          // console.log(model);
          return this.ajaxProxy.create(model)
        },
        handleAvatarSuccess(res, file) {
          const vmthis = this
          if (res.code === 200) {
            vmthis.addForm.user_img = res.data.url
            this.uploadImg = res.data.url
            this.formSubmit('addForm')
            this.submit_state = 2
          } else {
            this.$message.error(res.data.msg)
          }
        },
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/gif'
          const isLt2M = file.size / 1024 / 1024 < 2
          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG、PNG、GIF、JPEG 格式!')
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
          this.imgURL = URL.createObjectURL(file.raw)
        },
        handleRemove(file, fileList) {},
        beforeFormSubmit(name) {
          if (this.fileList.length === 0) {
             this.formSubmit('addForm')
          } else {
            this.$refs['addForm'].validate((valid) => {
              if (valid) {
                if (this.submit_state == 2) {
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
              vmthis.addForm.user_img = vmthis.uploadImg
              vmthis.formSubmit('addForm')
            } else {
              vmthis.real(name)
            }
          }, 1000)
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
        max-width: 150px;
        max-height: 100px;
        display: block;
    }
    .pull-right {
        float:right
    }
</style>
