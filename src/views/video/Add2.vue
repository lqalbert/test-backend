<template>
    <div>
        <myDialog title="添加密码" :name="name" :width="width" :height="height" @before-open="onOpen">
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
                
                <el-form-item label="计时类型" prop="time_type">
                    <el-select v-model="addForm.time_type" placeholder="请选择" @change="selectChange">
                        <el-option
                          v-for="item in timeTypeList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                          >
                        </el-option>
                    </el-select>
                </el-form-item>
                              
                <el-form-item label="时长" prop="time_long" v-show="time_long_show">
                    <el-input size="small"  placeholder="自激活之日起计算，单位为小时" v-model="addForm.time_long" ></el-input>
                </el-form-item>
                <el-form-item label="有效日期" prop="start_end_time" >
                    <el-date-picker
                      v-model="addForm.start_end_time"
                      type="daterange"
                      align="right"
                      unlink-panels
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :picker-options="pickerOptions2">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="密码编号" prop="pwd_num">
                    <el-input size="small" placeholder="包括数字或字母的六位字符串，若为空则随机生成" v-model="addForm.pwd_num" ></el-input>
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
                time_type:1,
                time_long:'',
                start_end_time:'',
                pwd_num:'',
            },
            time_long_show:true,
            start_end_time_show:false,
            rules: {
                room_number: [
                    { required: true, message: '房间号必填', trigger: 'blur' },
                    // { max: 50, message: '最长50个字符', trigger: 'blur' }
                ],
                time_long: [
                    { required: false, message: '房间号必填', trigger: 'blur' },
                    // { max: 50, message: '最长50个字符', trigger: 'blur' }
                    {pattern: /^([1-9][0-9]*)$/, message: '正整数'} 
                ],
                start_end_time:[
                    { required: true, message: '日期必填', trigger: 'blur' },
                ],
                pwd_num: [
                    // { required: false, message: '房间号必填', trigger: 'blur' },
                    {max: 6, message: '包含数字字符串的六位字符串'},
                    {pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{6,20})$/, message: '包含数字字符串的六位字符串'} 
                ],
            },
            roomList:[
                // {room_number:'S00008'},
                // {room_number:'S00009'},
                // {room_number:'S00010'},
                // {room_number:'S00032'},
            ],
            timeTypeList:[
                {label:'固定时长',value:1},
                {label:'固定日期',value:2},
            ],
            pickerOptions2: {
                shortcuts: [
                    {
                        text: '最近一周',
                        onClick(picker) {
                          const end = new Date();
                          const start = new Date();
                          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                          picker.$emit('pick', [start, end]);
                        }
                    }, 
                    {
                        text: '最近一个月',
                        onClick(picker) {
                          const end = new Date();
                          const start = new Date();
                          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                          picker.$emit('pick', [start, end]);
                        }
                    }, 
                    {
                    text: '最近三个月',
                        onClick(picker) {
                          const end = new Date();
                          const start = new Date();
                          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                          picker.$emit('pick', [start, end]);
                        }
                    }
                ]
            }    
        }
    },
    methods: {
        getAjaxPromise(model) {
          return this.ajaxProxy.create(model)
        },
        handleAvatarSuccess(res, file) {
            const vmthis = this
            if (res.code === 200) {
                vmthis.addForm.img_url = res.data.url
                this.formSubmit('addForm')
            } else {
                this.$message.error(res.data.msg)
            }
        },
        selectChange(value){
            if(value==1){
                this.time_long_show=true;
                this.start_end_time_show=false;
            }else if(value==2){
                this.time_long_show=false;
                this.start_end_time_show=true;
            }
            // console.log(value)
        },
        submitUpload() {
            this.$refs.upload.submit()
        },
        beforeFormSubmit(name){
            this.formSubmit(name)
        },
        onOpen(model){
            this.roomList=model.params.roomList;
            this.addForm.user_id=this.$store.getters.user_id
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
</style>