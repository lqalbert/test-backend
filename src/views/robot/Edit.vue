<template>
    <div>
        <myDialog title="修改机器人列表" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-form :model="editForm" ref="editForm" :rules="rules" :label-width="labelWidth" :label-position="labelPosition">
                <el-form-item label="直播间房间号" prop="room_number">
                    <el-input v-model="editForm.room_number"  disabled></el-input>
                    
                </el-form-item>
                
                <el-form-item label="机器人列表" prop="robots">
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
                      v-if="inputVisible"
                      v-model="inputValue"
                      ref="saveTagInput"
                      size="small"
                      @keyup.enter.native="handleInputConfirm"
                      @blur="handleInputConfirm"
                    >
                    </el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
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

            },
            rules: {
                robots: [
                    { required: true, message: '必须填写', trigger: 'blur' },
                    // {min: 1, max: 3, message: '最多999'},
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
        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
              this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
              this.editForm.robots.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
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