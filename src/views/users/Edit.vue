<template>
    <div>
        <myDialog title="编辑用户信息" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-form :model="editForm" ref="editForm" :rules="rules" :label-width="labelWidth" :label-position="labelPosition">
                <el-form-item label="账户" prop="username" >
                    <el-input disabled class="name-input" size="small" v-model="editForm.username" ></el-input>
                </el-form-item>

                <el-form-item label="头像" prop="user_img">
                    <el-upload
                            ref="upload"
                            name="avatar"
                            :data="liveDir"
                            :auto-upload="false"
                            class="avatar-uploader"
                            :show-file-list="false"
                            :action="uploadUrl"
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
                <el-form-item label="用户等级" prop="level">
                    <el-select  v-model="editForm.level">
                        <el-option
                                v-for="item in leveloption"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!--<el-form-item label="邀请码" prop="invitation_code">
                    <el-input class="name-input" v-model="editForm.invitation_code"></el-input>
                </el-form-item>-->
                <el-form-item label="邮箱" prop="email">
                    <el-input size="small"  v-model="editForm.email"></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="nickname">
                    <el-input size="small" v-model="editForm.nickname"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="phone">
                    <el-input size="small"  v-model="editForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-input size="small" v-model="editForm.address"></el-input>
                </el-form-item>
                <el-form-item label="是否启用" prop="is_use">
                    <el-radio-group v-model="editForm.is_use">
                        <el-radio label="y" border>是</el-radio>
                        <el-radio label="n" border>否</el-radio>
                    </el-radio-group>
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
        props: {
            leveloption: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                dialogThis: this,
                labelPosition: 'right',
                labelWidth: '120px',
                uploadUrl: APP_CONST.UPLOAD_BASE_URL,
                url: APP_CONST.BASE_URL,
                myHeader: {
                    'Authorization': 'Bearer ' + getToken()
                },
                liveDir: {
                    base: 'live'
                },
                editForm: {
                    id: '',
                    username: '',
                    user_img: '',
                    email: '',
                    nickname: '',
                    phone: '',
                    level: '',
                    address: '',
                    /*invitation_code: '',*/
                    is_use: ''
                },
                rules: {
                    username:[
                        { required: true, message: '只能输入字母、数字、下划线', trigger: 'blur' },
                        { min: 1, max: 32, message: '长度在 1 到 32个字符', trigger: 'blur' },
                        //{ pattern: /^[\u4E00-\u9FA5]+$/, message: '用户名只能为中文'}
                        { pattern: /^([A-Za-z0-9_-]){1,32}$/, message: '只能输入1-32个字母、数字、下划线'}
                    ],
                    /*invitation_code: [
                        { required: true, message: '请输入1-6个数字或字母', trigger: 'blur' },
                        { min: 1, max: 6, message: '长度在 1 到 6个字符', trigger: 'blur' },
                        { pattern: /^([A-Za-z0-9]){1,6}$/, message: '只能输入1-6个数字或字母' }
                    ],*/
                    is_use: [
                        { required: true, message: '请选择是否启用', trigger: 'change' }
                    ],
                },
                model: '',
                fileList: [],
                imgURL: '',
                submit_stat: '',
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
                    vmthis.editForm.user_img = res.data.url
                    this.formSubmit('editForm')
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
                this.imgURL = this.url + this.editForm.user_img
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