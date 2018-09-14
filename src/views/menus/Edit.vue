<template>
    <div>
        <myDialog title="编辑角色" :name="name" :width="width" :height="height" @before-open="onOpen">

            <el-form :model="editForm" ref="editForm" :rules="rules" :label-width="labelWidth" :label-position="labelPosition">
                <el-form-item label="角色名字" prop="name">
                    <el-input v-model="editForm.name" placeholder="只能由中文组成"></el-input>
                    <!-- <el-input articleType="hidden" v-model="addForm.id"></el-input>-->
                </el-form-item>

                <el-form-item label="路径" prop="path">
                    <el-input v-model="editForm.path"></el-input>
                </el-form-item>

                <el-form-item label="重定向" prop="redirect">
                    <el-input v-model="editForm.redirect"></el-input>
                </el-form-item>

                <el-form-item label="组件" prop="component">
                    <el-input v-model="editForm.component"></el-input>
                </el-form-item>


                <el-form-item label="父级菜单" prop="parent_id">
                    <el-select  v-model="editForm.parent_id">
                        <el-option
                                v-for="item in options"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>


                <el-form-item label="是否启用" prop="hidden">
                    <el-radio-group v-model="editForm.hidden">
                        <el-radio label="y" border>隐藏</el-radio>
                        <el-radio label="n" border>显示</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="最后一级菜单" prop="is_last">
                    <el-radio-group v-model="editForm.is_last">
                        <el-radio label="y" border>是</el-radio>
                        <el-radio label="n" border>否</el-radio>
                    </el-radio-group>
                </el-form-item>

            </el-form>
            <div slot="dialog-foot" class="dialog-footer">
                <el-button  @click="handleClose">取消</el-button>
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
        props:{
                options:{
                    type:Array,
                    default:[]
                }
            },

        data() {
            return {
                dialogThis: this,
                labelPosition: 'right',
                labelWidth: '120px',
                editForm: {
                    id:'',
                    name: '',
                    path: '',
                    component: '',
                    parent_id: '',
                    hidden: '',
                    is_last: '',
                    redirect: ''
                },
                rules: {
                    /*role_name:[
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
                    is_robot:[
                        { required: true, message: '请选择是否机器人', trigger: 'change' }
                    ],
                    is_backend:[
                        { required: true, message: '请选择是否可登录后台', trigger: 'change' }
                    ]*/
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
