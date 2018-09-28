<template>
    <div>
        <myDialog title="编辑课程简介" :name="name" :width="width" :height="height" @before-open="onOpen">

            <el-form :model="editForm" ref="editForm" :rules="rules" :label-width="labelWidth" :label-position="labelPosition">
                <el-form-item label="所属直播间" prop="room_id">
                    <el-select  placeholder="请选择" v-model="editForm.room_id">
                        <el-option
                                v-for="item in rooms"
                                :key="item.id"
                                :label="item.room_number"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="教师简介" prop="course_img">
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
            </el-form>

            <div slot="dialog-foot" class="dialog-footer">
                <el-button  @click="handleClose">取消</el-button>
                <submit-button @click="beforeFormSubmit('editForm')"
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
        name: 'editList',
        mixins: [DialogForm],
        props: {
            rooms: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                dialogThis: this,
                labelPosition: 'right',
                labelWidth: '120px',
                editForm: {
                    id:'',
                    room_id: '',
                    course_img:''
                },
                rules: {


                },
                model:'',
                fileList: [],
                imgURL: '',
                submit_stat: '',
                uploadUrl: APP_CONST.UPLOAD_BASE_URL,
                url: APP_CONST.BASE_URL,
                myHeader: {
                    'Authorization': 'Bearer ' + getToken()
                },
                liveDir: {
                    base: 'live'
                }

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
                    vmthis.editForm.course_img = res.data.url
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
                this.imgURL = this.url + this.editForm.course_img
            }
        },
        created(){

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
    .pull-right {
        float:right
    }
</style>
