<template>
    <div>
        <myDialog title="添加角色" :name="name" :width="width" :height="height">
            <el-form :model="addForm" ref="addForm" :rules="rules" :label-width="labelWidth" :label-position="labelPosition">
                <el-form-item label="角色名字" prop="role_name">
                    <el-input v-model="addForm.role_name" placeholder="只能输入数字、字母、下划线"></el-input>
                </el-form-item>

                <el-form-item label="角色说明" prop="role_comment">
                    <el-input v-model="addForm.role_comment"></el-input>
                </el-form-item>

                <el-form-item label="角色标签" prop="role_mark">
                    <el-input v-model="addForm.role_mark"></el-input>
                </el-form-item>

                <el-form-item label="是否启用" prop="is_use">
                    <el-radio-group v-model="addForm.is_use">
                        <el-radio label="y" border>是</el-radio>
                        <el-radio label="n" border>否</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="是否可登录后台" prop="is_backend">
                    <el-radio-group v-model="addForm.is_backend">
                        <el-radio label="y" border>是</el-radio>
                        <el-radio label="n" border>否</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="dialog-foot" class="dialog-footer">
                <el-button  @click="handleClose">取消</el-button>
                <submit-button @click="formSubmit('addForm')"
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
    export default {
        name: 'addList',
        mixins: [DialogForm],
        data() {
            return {
                dialogThis: this,
                labelPosition: 'right',
                labelWidth: '120px',
                addForm: {
                    role_name: '',
                    role_comment: '',
                    role_mark: '',
                    is_use: '',
                    is_backend: ''
                },
                rules: {
                    role_name:[
                        { required: true, message: '只能输入字母、数字、下划线', trigger: 'blur' },
                        { min: 1, max: 32, message: '长度在 1 到 32个字符', trigger: 'blur' },
                        //{ pattern: /^[\u4E00-\u9FA5]+$/, message: '用户名只能为中文'}
                        { pattern: /^([A-Za-z0-9_-]){1,32}$/, message: '只能输入1-32个字母、数字、下划线'}
                    ],
                    role_comment:[
                        { required: true, message: '只能输入中文', trigger: 'blur' },
                        { min: 1, max: 10, message: '长度在 1 到 10个字符', trigger: 'blur' },
                        { pattern: /^[\u4E00-\u9FA5]+$/, message: '只能为中文'}
                    ],
                    role_mark:[
                        { required: true, message: '只能输入中文', trigger: 'blur' },
                        { min: 1, max: 10, message: '长度在 1 到 10个字符', trigger: 'blur' },
                        { pattern: /^[\u4E00-\u9FA5]+$/, message: '只能为中文'}
                    ],

                    is_use:[
                        { required: true, message: '请选择是否启用', trigger: 'change' }
                    ],

                    is_backend:[
                        { required: true, message: '请选择是否可登录后台', trigger: 'change' }
                    ]
                }
            }
        },
        methods: {
            getAjaxPromise(model){
                return this.ajaxProxy.create(model);
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
        min-width: 150px;
        min-height: 100px;
        display: block;
    }
    .pull-right {
        float:right
    }
</style>
