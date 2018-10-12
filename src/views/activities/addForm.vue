<template>
    <div>
        <myDialog title="添加活动" :name="name" :width="width" :height="height">
            <el-form :model="addForm" ref="addForm" :rules="rules" :label-width="labelWidth" :label-position="labelPosition">


                <el-form-item label="活动首页" prop="index_act">
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

                <el-form-item label="活动详情" prop="detail_act">
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
                        :on-success="handleAvatarSuccess1"
                        :on-error="uploadError"
                        :before-upload="beforeAvatarUpload"
                        :on-change="changefileList1">
                    <img v-if="imgURL1" :src="imgURL1" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>

            </el-form>
            <div slot="dialog-foot" class="dialog-footer">
                <el-button  @click="handleClose">取消</el-button>
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
    import { getToken } from '../../utils/auth'
    import APP_CONST from '../../config/index'
    export default {
        name: 'addList',
        mixins: [DialogForm],

        data() {
            return {
                dialogThis: this,
                labelPosition: 'right',
                labelWidth: '120px',
                addForm: {
                    index_act: '',
                    detail_act:''
                },
                url: APP_CONST.UPLOAD_BASE_URL,
                rules: {},
                imgURL: '',
                imgURL1: '',
                liveDir: {
                    base: 'live'
                },
                myHeader: {
                    'Authorization': 'Bearer ' + getToken()
                },
                fileList: [],
                fileList1: []
            }
        },
        methods: {
            getAjaxPromise(model){
                return this.ajaxProxy.create(model);
            },
            handleAvatarSuccess(res, file) {
                const vmthis = this
                if (res.code === 200) {
                    vmthis.addForm.index_act = res.data.url
                    console.log(1111111111)
                    console.log(res.data.url)
                    this.formSubmit('addForm')
                } else {
                    console.log(33333333333)
                    this.$message.error(res.data.msg)
                }
            },
            /*handleAvatarSuccess1(res, file) {
                const vmthis = this
                if (res.code === 200) {
                    vmthis.addForm.detail_act = res.data.url
                    console.log(22222222222)
                    console.log(res.data.url)
                    this.formSubmit('addForm')
                } else {
                    this.$message.error(res.data.msg)
                }
            },*/
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
            changefileList1(file, fileList) {
                this.fileList1 = fileList
                this.imgURL1 = URL.createObjectURL(file.raw)
            },
            handleRemove(file, fileList) {},
            beforeFormSubmit(name) {
                if (this.fileList.length === 0) {
                    this.formSubmit('addForm')
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
            }
        },



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
