<template>
    <div>
        <myDialog title="编辑直播间" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-form :model="editForm" ref="editForm" :rules="rules" :label-width="labelWidth" :label-position="labelPosition">
                <el-form-item label="系列名称" prop="course_name">
                    <el-input size="small" placeholder="系列名称" v-model="editForm.course_name"></el-input>
                </el-form-item>
                <el-form-item label="简介" prop="introduce">
                    <el-input size="small" type="textarea" :autosize="{ minRows:3, maxRows:20}" placeholder="简介" v-model="editForm.introduce"></el-input>
                </el-form-item>
                <el-form-item label="类型" prop="course_type_id">
                        <el-select v-model="editForm.course_type_id" placeholder="请选择">
                            <el-option
                              v-for="item in typeList"
                              :key="item.type_name"
                              :label="item.type_name"
                              :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="分类" prop="course_branch_id">
                        <el-select v-model="editForm.course_branch_id" placeholder="请选择">
                            <el-option
                              v-for="item in branchList"
                              :key="item.branch_name"
                              :label="item.branch_name"
                              :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="讲师" prop="teacher_id">
                        <el-select v-model="editForm.teacher_id" placeholder="请选择">
                            <el-option
                              v-for="item in teacherList"
                              :key="item.teacher_name"
                              :label="item.teacher_name"
                              :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                <el-form-item label="背景图" prop="back_img">
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
               
                <el-form-item label="总课数" prop="total_num">
                    <el-input size="small" placeholder="总课数" v-model="editForm.total_num"></el-input>
                </el-form-item>
               <!--  <el-form-item label="总销量" prop="sale_num">
                    <el-input size="small" placeholder="总销量" v-model="editForm.sale_num"></el-input>
                </el-form-item> -->
                <el-form-item label="综合评价" prop="total_average">
                    <el-input size="small" placeholder="综合评价" v-model="editForm.total_average"></el-input>
                </el-form-item>
                <el-form-item label="价格" prop="price">
                    <el-input size="small" placeholder="价格" v-model="editForm.price"></el-input>
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
    data() {
        return {
            dialogThis: this,
            labelPosition: 'right',
            labelWidth: '120px',
            actionUrl: APP_CONST.UPLOAD_BASE_URL,
            url: APP_CONST.BASE_URL,
            myHeader: {
                'Authorization': 'Bearer ' + getToken()
            },
            liveDir: {
              base: 'live'
            },
            editForm: {
                course_type_id: '',
                course_branch_id: '',
                back_img: '',
                introduce: '',
                course_name: '',
                total_num: '',
                sale_num: '',
                total_average: '',
                price: '',
                teacher_id: '',
            },
            rules: {
                course_type_id: [
                    { required: true, message: '必须填写', trigger: 'blur' },
                ],
                course_branch_id: [
                    { required: true, message: '必须填写', trigger: 'blur' },
                ],
                teacher_id: [
                    { required: true, message: '必须填写', trigger: 'blur' },
                ],
                introduce: [
                    { required: true, message: '必须填写', trigger: 'blur' },
                ],
                course_name: [
                    { required: true, message: '必须填写', trigger: 'blur' },
                    { min: 2, message: '必须填写' }
                ],
                total_num: [
                    { required: true, message: '必须填写', trigger: 'blur' },
                    { pattern: /^([1-9][0-9]*)$/, message: '正整数' }
                ],
                // sale_num: [
                //     { required: true, message: '必须填写', trigger: 'blur' },
                //     { pattern: /^([1-9][0-9]*)$/, message: '正整数' }
                // ],
                total_average: [
                    { required: true, message: '必须填写', trigger: 'blur' },
                    { pattern: /^([1-9][0-9]*)$/, message: '正整数' }
                ],
                price: [
                    { required: true, message: '必须填写', trigger: 'blur' },
                    { pattern: /^[0-9]+(.[0-9]{2})?$/, message: '请精确到小数点两位' }
                ],
                
            },
            model: '',
            typeList:[],
            branchList:[],
            teacherList:[],
            imgURL: '',
            submit_stat: ''
        }
    },
    methods: {
        getAjaxPromise(model) {
            return this.ajaxProxy.update(model.id, model)
        },
        handleAvatarSuccess(res, file) {
            const vmthis = this
            if (res.code === 200) {
              vmthis.editForm.back_img = res.data.url
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
          // this.editForm.back_img = file
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
        },
        onOpen(model){
            this.editForm=model.params.List[0];
            this.typeList=model.params.List[1];
            this.branchList=model.params.List[2]
            this.teacherList=model.params.List[3]
            this.imgURL=this.editForm.back_img
        }
    },
    watch: {
        model: function(val, oldVal) {
            for (const key in this.editForm) {
                if (this.editForm.hasOwnProperty(key)) {
                    this.editForm[key] = val[key]
                }
            }
            this.imgURL = this.url + this.editForm.back_img
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