<template>
    <div>
        <myDialog title="增加类型" :name="name" :width="width" :height="height" @before-open="onOpen" >
            <el-form :model="addForm" ref="addForm" :rules="rules" :label-width="labelWidth" :label-position="labelPosition">
                <el-form-item label="课程名称" prop="lesson_name">
                    <el-input size="small" placeholder="课程名称" v-model="addForm.lesson_name"></el-input>
                </el-form-item>
                <el-form-item label="简介" prop="introduce">
                    <el-input size="small" type="textarea" :autosize="{ minRows:3, maxRows:20}" placeholder="简介" v-model="addForm.introduce"></el-input>
                </el-form-item>

                <el-form-item :span="12" label="系列" prop="course_id" >
                        <el-select v-model="addForm.course_id" placeholder="请选择">
                            <el-option
                              v-for="item in courseList"
                              :key="item.course_name"
                              :label="item.course_name"
                              :value="item.id">
                            </el-option>
                        </el-select>
                </el-form-item>               
                <el-form-item label="课程地址" prop="url">
                    <el-input size="small" placeholder="总课数" v-model="addForm.url"></el-input>
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
                lesson_name:'',
                introduce:'',
                course_id:'',
                url:'',
            },
            courseList: [],
            rules: {
                lesson_name: [
                    { required: true, message: '必须填写', trigger: 'blur' },
                ],
                introduce: [
                    { required: true, message: '必须填写', trigger: 'blur' },
                ],
                course_id: [
                    { required: true, message: '必须填写', trigger: 'blur' },
                ],
                url: [
                    { required: true, message: '必须填写', trigger: 'blur' },
                ],
            },
            liveDir: {
                base: 'live'
            },
            myHeader: {
                'Authorization': 'Bearer ' + getToken()
            },
                actionUrl: APP_CONST.UPLOAD_BASE_URL
        }
  },
  methods: {
    getAjaxPromise() {
        return this.ajaxProxy.create(this.addForm)
    },
    handleAvatarSuccess(res, file) {
        const vmthis = this
        if (res.code === 200) {
            vmthis.addForm.wx_code = res.data.url
            this.formSubmit('addForm')
        } else {
            this.$message.error(res.data.msg)
        }
    },
    beforeFormSubmit(name) {
        this.formSubmit(name)
    },
    onOpen(model){
        this.courseList=model.params.List[0];
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

