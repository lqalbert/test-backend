<template>
    <div>
        <myDialog title="excel文件上传" :name="name" :width="width" :height="height">
            <el-form :model="addForm" ref="addForm" :rules="rules" :label-width="labelWidth" :label-position="labelPosition">

                <el-form-item label="excel文件" prop="excel_url">
                    <el-upload
                            ref="upload"
                            name="avatar"
                            :data="liveDir"
                            :auto-upload="false"
                            :show-file-list="true"
                            :action="url"
                            accept=".csv,.xls,.xlsx"
                            :headers='myHeader'
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                            :on-success="handleAvatarSuccess"
                            :on-error="uploadError"
                            :before-upload="beforeAvatarUpload"
                            :on-change="changefileList">
                        <el-button size="small" type="info">选择文件</el-button>
                        <div slot="tip" class="el-upload__tip">一次只能上传一个excel格式的文件</div>
                    </el-upload>
                    <br>
                    <el-row>
                        <el-col :span="12">
                            <el-button size="small" type="primary" @click="beforeFormSubmit()">点击上传</el-button>
                        </el-col>
                        <el-col :span="12">
                            <el-button size="small" type="primary" @click="importAccount()">批量导入</el-button>
                        </el-col>
                    </el-row>
                    <br>
                    <el-row>
                        <el-col :span="12">
                            <div v-show="matchButton">
                                <hr>
                                <span>本次共导入数据{{ sum }}条</span>
                            </div>
                        </el-col>
                    </el-row>
                </el-form-item>

            </el-form>
            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleDialogClose">取 消</el-button>
                <el-button type="primary" @click="handleDialogClose">关 闭</el-button>
            </div>
        </myDialog>
    </div>
</template>

<script>
    /* eslint-disable no-mixed-spaces-and-tabs */

    import DialogForm from '../../mix/DialogForm'
    import { getToken } from '../../utils/auth'
    import APP_CONST from '../../config/index'
    import { mapActions,mapGetters } from 'vuex';

    export default {
        name: 'addList',
        mixins: [DialogForm],

        data() {
            return {
                dialogThis: this,
                labelPosition: 'right',
                labelWidth: '120px',
                matchButton:false,
                addForm: {

                },
                url: APP_CONST.UPLOAD_BASE_URL,
                rules: {

                },
                imgURL: '',
                excel_url: '',
                liveDir: {
                    base: 'live'
                },
                myHeader: {
                    'Authorization': 'Bearer ' + getToken()
                },
                fileList: [],
                submit_state: '1',
                sum: 0,
                uploadImg: ''
            }
        },
        methods: {
            getAjaxPromise(model) {
                return this.ajaxProxy.create(model)
            },
            handleAvatarSuccess(response, file) {
                console.log(response);
                if(response.code == 201){
                    this.$message.error('文件上传出错了');
                    this.handleClose();
                }else{
                    //this.matchButton = true;
                    this.$message.success('文件上传成功');
                    return this.excel_url =  response.data.url;
                }

            },
            beforeAvatarUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 2
                if (!isLt2M) {
                    this.$message.error('上传文件大小不能超过 2MB!')
                }
                return isLt2M
            },
            handlePictureCardPreview(file) {
                console.log(file)
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            uploadError(err, file, fileList) {
                this.$message.error('上传出错：' + err.msg)
            },
            changefileList(file, fileList) {
                console.log(fileList);
                if(fileList.length>1){
                    fileList.splice(0,1);
                }
            },
            beforeFormSubmit() {
                this.$refs.upload.submit()
            },
            handleDialogClose(){
                this.handleClose();
                this.excel_url='';
                this.dataTableReload++
            },
            importAccount(){
                if(this.excel_url){
                    window.open(APP_CONST.BASE_URL + '/admin/sockpuppet-import?filePath='+ this.excel_url +'&cid='+this.$store.getters.company_id+'&pid='+this.$route.query.pid)
                }else{
                    return this.$message.error('请先上传excel文件')
                }

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
        max-width: 150px;
        max-height: 100px;
        display: block;
    }
    .pull-right {
        float:right
    }
</style>
