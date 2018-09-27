<template>
    <div>
        <myDialog title="添加通告" :name="name" :width="width" :height="height">
            <el-form :model="addForm" ref="addForm" :rules="rules" :label-width="labelWidth" :label-position="labelPosition">
                <el-form-item label="内容" prop="content">
                    <el-input type="textarea" v-model="addForm.content"></el-input>
                </el-form-item>

                <el-form-item label="公告日期" prop="announcement_time" >
                    <el-date-picker
                            v-model="addForm.announcement_time"
                            type="datetime"
                            placeholder="选择日期"
                            :picker-options="pickerOptions"
                            :editable="false"
                            @change="timeChange">
                    </el-date-picker>
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
                    content: '',
                    announcement_time:''
                },
                rules: {

                },
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now();
                    }
                },
            }
        },
        methods: {
            getAjaxPromise(model){
                return this.ajaxProxy.create(model);
            },
            timeChange(v){
                let newTime = v.toISOString().substring(0,10)+ ' '+v.toTimeString().substring(0,9);
                this.addForm.announcement_time=newTime;
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
