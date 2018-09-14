<template>
    <div>
        <myDialog title="添加房间列表" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-form :model="addForm" ref="addForm" :rules="rules" :label-width="labelWidth" :label-position="labelPosition">
                <el-form-item label="直播间房间号" prop="room_number">
                    <el-select v-model="addForm.room_number" placeholder="请选择">
                        <el-option
                          v-for="item in roomList"
                          :key="item.room_number"
                          :label="item.room_number"
                          :value="item.room_number">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="机器人列表" prop="robots">
                    <el-tag
                      :key="tag"
                      v-for="tag in addForm.robots"
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
                <submit-button @click="beforeFormSubmit('addForm')"
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
import APP_CONST from '../../config/index'
import { getToken } from '../../utils/auth'
export default {
    name: 'addList',
    mixins: [DialogForm],
    data() {
        return {
            dialogThis: this,
            labelPosition: 'right',
            labelWidth: '120px',
            addForm: {
                room_number:'',
                robots:[],
            },
            rules: {
                room_number: [
                    { required: true, message: '房间号必填', trigger: 'blur' },
                    // { max: 50, message: '最长50个字符', trigger: 'blur' }
                ],
            },
            roomList:[],
            // dynamicTags: ['标签一', '标签二', '标签三'],
            inputVisible: false,
            inputValue: ''
        }
    },
    methods: {
        getAjaxPromise(model) {
          return this.ajaxProxy.create(model)
        },
       
        submitUpload() {            
            this.$refs.addForm.submit()
        },
        beforeFormSubmit(name){
            this.formSubmit(name)
        },
        onOpen(model){
            this.roomList=model.params.roomList;
        },
        /*可编辑标签*/
        handleClose1(tag) {
            this.addForm.robots.splice(this.addForm.robots.indexOf(tag), 1);
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
              this.addForm.robots.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        }
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

    .el-tag + .el-tag {
        margin-left: 10px;
    }
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
    .el-tag {
        margin-left: 10px;
    }
</style>