<template>
    <div>
        <myDialog title="用户发言" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-form :model="editForm" ref="editForm" :rules="rules" :label-width="labelWidth" :label-position="labelPosition">
                <el-form-item label="直播间房间号" prop="room_number">
                    <el-input v-model="editForm.room_number"  disabled></el-input>
                    
                </el-form-item>
                

                <el-form-item label="发言用户" prop="robot_name">
                    <el-select v-model="editForm.robot_name" placeholder="请选择">
                        <el-option
                          v-for="(item, index) of editForm.robots"
                          :key="item"
                          :label="item"
                          :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                
                <el-form-item label="发言内容" prop="say_msg">
                    <el-input v-model="editForm.say_msg" ></el-input>
                    
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
                room_number:'',
                robots:[],
                robot_name:'',
                say_msg:''
            },
            rules: {
                robot_name: [
                    { required: true, message: '必须填写', trigger: 'blur' },
                ],
                say_msg: [
                    { required: true, message: '必须填写', trigger: 'blur' },
                ]

            },
            roomList:[],
            inputVisible: false,
            inputValue: ''
        }
    },
    methods: {
        onOpen(param) {
            this.editForm = param.params.model
        },
        getAjaxPromise(model) {
            model['type']='say';
            return this.ajaxProxy.update(model.id, model)
        },
        submitUpload() {            
            this.$refs.editForm.submit()
        },
        beforeFormSubmit(name) {
            this.formSubmit(name)
        },
        alertShow(msg) {
            this.$message({
                message: msg,
                type: 'success'
            })
        },
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