<template>
    <div>
        <myDialog title="添加角色" :name="name" :width="width" :height="height">
            <el-form :model="addForm" ref="addForm" :rules="rules" :label-width="labelWidth" :label-position="labelPosition">
                <el-form-item label="菜单名" prop="name">
                    <el-input v-model="addForm.name" placeholder="只能输入中文"></el-input>
                    <!-- <el-input articleType="hidden" v-model="addForm.id"></el-input>-->
                </el-form-item>

                <el-form-item label="菜单路径" prop="path">
                    <el-input v-model="addForm.path"></el-input>
                </el-form-item>

                <el-form-item label="菜单重定向" prop="redirect">
                    <el-input v-model="addForm.redirect"></el-input>
                </el-form-item>

                <el-form-item label="菜单所属组件" prop="component">
                    <el-input v-model="addForm.component"></el-input>
                </el-form-item>

                <el-form-item label="父级菜单" prop="parent_id">
                    <el-select  clearable placeholder="请选择" v-model="addForm.parent_id">
                        <el-option
                                v-for="item in options"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>



                <el-form-item label="是否隐藏" prop="hidden">
                    <el-radio-group v-model="addForm.hidden">
                        <el-radio label="y" border>隐藏</el-radio>
                        <el-radio label="n" border>显示</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="最后一级菜单" prop="is_last">
                    <el-radio-group v-model="addForm.is_last">
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
                addForm: {
                    name: '',
                    path: '',
                    redirect: '',
                    parent_id: '',
                    component: '',
                    hidden: '',
                    is_last: ''
                },
                rules: {
                    name:[
                        { required: true, message: '只能输入中文', trigger: 'blur' },
                        { min: 1, max: 12, message: '长度在 1 到 12个字符', trigger: 'blur' },
                        { pattern: /^[\u4E00-\u9FA5]+$/, message: '菜单名只能为中文'}
                    ],
                    path:[
                        { required: true,  trigger: 'blur' },
                        { min: 1, max: 32, message: '长度在 1 到 32个字符', trigger: 'blur' }
                    ],
                    redirect:[
                        { required: true,  trigger: 'blur' },
                        { min: 1, max: 32, message: '长度在 1 到 32个字符', trigger: 'blur' }
                    ],
                    component:[
                        { required: true,  trigger: 'blur' },
                        { min: 1, max: 32, message: '长度在 1 到 32个字符', trigger: 'blur' }
                    ],
                    parent_id:[
                        { required: true, message: '请选择父级菜单', trigger: 'change' }
                    ],
                    hidden:[
                        { required: true, message: '请选择是否隐藏', trigger: 'change' }
                    ],
                    is_last:[
                        { required: true, message: '请选择是否最后一级', trigger: 'change' }
                    ]
                }
            }
        },
        methods: {
            getAjaxPromise(model){
                //console.log(model);
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
