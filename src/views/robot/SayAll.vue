<template>
    <div>
        <myDialog title="批量发言" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-form :model="editForm" ref="editForm" :rules="rules" :label-width="labelWidth" :label-position="labelPosition">
                <el-form-item label="直播间房间号" prop="room_number">
                    <el-input v-model="editForm.room_number"  disabled></el-input>
                </el-form-item>
            
    
                <el-form-item label="发言用户" prop="robot_name">
                    <el-tag
                        :key="tag"
                        v-for="tag in editForm.robots"
                        closable
                        :disable-transitions="false"
                        @close="handleClose1(tag)">
                        {{tag}}
                    </el-tag>
                    <el-input
                        class="input-new-tag"
                        v-if="inputVisible1"
                        v-model="inputValue1"
                        ref="saveTagInput1"
                        size="small"
                        @keyup.enter.native="handleInputConfirm1"
                        @blur="handleInputConfirm1"
                    >
                    </el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput1">+ New Tag</el-button>
                </el-form-item>
                
                <el-form-item label="发言内容" prop="say_msgs">
                    <el-tag
                        :key="tag"
                        v-for="tag in editForm.say_msgs"
                        closable
                        :disable-transitions="false"
                        @close="handleClose2(tag)">
                        {{tag}}
                    </el-tag>
                    <el-input
                        class="input-new-tag"
                        v-if="inputVisible2"
                        v-model="inputValue2"
                        ref="saveTagInput2"
                        size="small"
                        @keyup.enter.native="handleInputConfirm2"
                        @blur="handleInputConfirm2"
                    >
                    </el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput2">+ New Tag</el-button>
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
                say_msgs:[]
            },
            rules: {
                // robot_name: [
                //     { required: true, message: '必须填写', trigger: 'blur' },
                // ],
                // say_msg: [
                //     { required: true, message: '必须填写', trigger: 'blur' },
                // ]

            },
            inputVisible1: false,
            inputValue1: '',
            inputVisible2: false,
            inputValue2: ''
        }
    },
    methods: {
        onOpen(param) {
            this.editForm = param.params.model
            this.editForm.say_msgs=[];
        },
        getAjaxPromise(model) {
            model['type']='sayall';
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
        /*可编辑标签*/
        handleClose1(tag) {
            this.editForm.robots.splice(this.editForm.robots.indexOf(tag), 1);
        },
        showInput1() {
            this.inputVisible1 = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput1.$refs.input.focus();
            });
        },
        handleInputConfirm1() {
            let inputValue1 = this.inputValue1;
            if (inputValue1) {
                this.editForm.robots.push(inputValue1);
            }
            this.inputVisible1 = false;
            this.inputValue1 = '';
        },

        handleClose2(tag) {
            this.editForm.say_msgs.splice(this.editForm.say_msgs.indexOf(tag), 1);
        },
        showInput2() {
            this.inputVisible2 = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput2.$refs.input.focus();
            });
        },
        handleInputConfirm2() {
            let inputValue2 = this.inputValue2;
            if (inputValue2) {
                this.editForm.say_msgs.push(inputValue2);
            }
            this.inputVisible2 = false;
            this.inputValue2 = '';
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