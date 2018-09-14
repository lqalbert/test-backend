<template>
    <div>
        <myDialog title="编辑学院" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-form :model="editForm" ref="editForm" :rules="rules" :label-width="labelWidth" :label-position="labelPosition">
                <el-form-item label="学院名称" prop="name">
                    <el-input class="name-input" size="small" v-model="editForm.name" ></el-input>
                </el-form-item>

                <el-form-item label="学院域名" prop="address">
                    <el-input class="name-input" size="small" v-model="editForm.address" ></el-input>
                </el-form-item>

                <el-form-item label="负责人" prop="contact">
                    <el-input class="name-input" size="small" v-model="editForm.contact" ></el-input>
                </el-form-item>

            </el-form>
            <div slot="dialog-foot" class="dialog-footer">
                <el-button size="small" @click="handleClose">取消</el-button>
                <submit-button @click="formSubmit('editForm')"
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
        name: 'editList',
        mixins: [DialogForm],

        data() {
            return {
                dialogThis: this,
                labelPosition: 'right',
                labelWidth: '120px',
                editForm: {
                    id:'',
                    name: '',
                    address: '',
                    contact: '',
                    created_at: '',
                    updated_at: ''
                },
                rules: {
                    name:[
                        { required: true, min: 1, max: 32, message: '长度在 1 到 32个字符', trigger: 'blur' },
                    ],
                    address:[
                        { required: true, min: 1, max: 32, message: '长度在 1 到 32个字符', trigger: 'blur' },
                    ],
                    contact:[
                        { required: true, min: 1, max: 32, message: '长度在 1 到 32个字符', trigger: 'blur' },
                    ],

                },
                model:''
            }
        },
        methods: {
            getAjaxPromise(model){
                return this.ajaxProxy.update(model.id, model);
            },
            onOpen(param) {
                this.model = param.params.model
                console.log(this.model);
            },
        },
        watch: {
            model: function(val, oldVal) {
                for (const key in this.editForm) {
                    if (this.editForm.hasOwnProperty(key)) {
                        this.editForm[key] = val[key]
                    }
                }
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
