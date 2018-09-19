<template>
    <div>
        <myDialog title="添加马甲" :name="name" :width="width" :height="height">
            <el-form :model="addForm" ref="addForm" :rules="rules" :label-width="labelWidth" :label-position="labelPosition">
                <el-form-item label="马甲名称" prop="sockpuppet_name">
                    <el-input v-model="addForm.sockpuppet_name"></el-input>
                </el-form-item>

                <el-form-item label="马甲等级"  prop="level_id">
                    <el-radio-group v-model="addForm.level_id">
                        <el-radio label="1" border>普通</el-radio>
                        <el-radio label="2" border>中级</el-radio>
                        <el-radio label="3" border>高级</el-radio>
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
        /*props:{
            id:{
                type:string,
                default:''
            }
        },*/
        props:['id'],
        data() {
            return {
                dialogThis: this,
                labelPosition: 'right',
                labelWidth: '120px',
                addForm: {
                    sockpuppet_name: '',
                    level_id: '',
                    pid: this.id
                },
                rules: {}
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
