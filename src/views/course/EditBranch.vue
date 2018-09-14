<template>
    <div>
        <myDialog title="修改分类" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-form :model="editForm" ref="editForm" :rules="rules" :label-width="labelWidth" :label-position="labelPosition">

                <el-form-item label="分类名称" prop="branch_name">
                    <el-input class="name-input" size="small" placeholder="分类名称" v-model="editForm.branch_name" ></el-input>
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
    /* eslint-disable indent */

    import DialogForm from '@/mix/DialogForm'
    import { getToken } from '@/utils/auth'
export default {
    name: 'editList',
    mixins: [DialogForm],
    data() {
        return {
            dialogThis: this,
            labelPosition: 'right',
            labelWidth: '120px',
            editForm: {
                type_name: '',
                id: ''
            },
            rules: {
                cash_wx: [
                    { required: true, message: '必须填写', trigger: 'blur' },
                    // {min: 1, max: 3, message: '最多999'},
                    { pattern: /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/, message: '分类名称' }
                ]

            }
        }
    },
    methods: {
        onOpen(param) {
            this.editForm = param.params.model
            console.log(this.editForm)
        },
        getAjaxPromise(model) {
            return this.ajaxProxy.update(model.id, model)
        },
        beforeFormSubmit(name) {
            this.formSubmit(name)
    
        },
        alertShow(msg) {
            this.$message({
                message: msg,
                type: 'success'
            })
        }

    },
    watch: {

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
        min-height: 60px;
        display: block;
    }
</style>