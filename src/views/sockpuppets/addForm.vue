<template>
    <div>
        <myDialog title="添加马甲" :name="name" :width="width" :height="height">
            <el-form :model="addForm" ref="addForm" :rules="rules" :label-width="labelWidth" :label-position="labelPosition">
                <el-form-item label="马甲名称" prop="nickname">
                    <el-input v-model="addForm.nickname"></el-input>
                </el-form-item>

                <el-form-item label="马甲等级" prop="level">
                    <el-select  clearable placeholder="请选择" v-model="addForm.level">
                        <el-option
                                v-for="item in leveloption"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
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
        //props:['pid'],
        props: {
            pid: {
                type: String,
                default: []
            },
            cid: {
                type: Number,
                default: []
            },
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
                addForm: {
                    nickname: '',
                    level: '',
                    sockpuppet: 'y',
                    pid: this.pid,
                    cid: this.cid
                },
                rules: {
                    nickname: [
                        { required: true, message: '长度在 1 到 10个字符', trigger: 'blur' },
                        { min: 1, max: 10, message: '长度在 1 到 10个字符', trigger: 'blur' }
                    ],
                    level: [
                        { required: true, message: '请选择马甲等级', trigger: 'change' }
                    ],
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
