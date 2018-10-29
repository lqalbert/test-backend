<template>
    <div>
        <myDialog title="excel文件上传" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-form :model="addForm" ref="addForm" :rules="rules" :label-width="labelWidth" :label-position="labelPosition">

                <el-form-item label="excel文件" prop="excel_url">
                    <el-upload
                            ref="upload"
                            name="avatar"
                            :data="liveDir"
                            :auto-upload="false"
                            class="avatar-uploader"
                            :show-file-list="false"
                            :action="url"
                            accept=".csv,.xls,.xlsx"
                            :headers='myHeader'
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                            :on-success="handleAvatarSuccess"
                            :on-error="uploadError"
                            :before-upload="beforeAvatarUpload"
                            :on-change="changefileList">
                        <el-button size="small" type="primary">选择文件</el-button>
                        <div slot="tip" class="el-upload__tip">一次只能上传一个excel格式的文件</div>
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
                    excel_url: '',
                },
                url: APP_CONST.UPLOAD_BASE_URL,
                rules: {

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
                    vmthis.addForm.teacher_img = res.data.url
                    this.uploadImg = res.data.url
                    this.formSubmit('addForm')
                    this.submit_state = 2
                } else {
                    this.$message.error(res.data.msg)
                }
            },
            beforeAvatarUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 2
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!')
                }
                return isLt2M
            },
            handlePictureCardPreview(file) {
                console.log(file)
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
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
                        vmthis.addForm.excel_url = vmthis.uploadImg
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
