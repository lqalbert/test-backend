<template>
    <div>
        <myDialog title="添加文章" :name="name" :width="width" :height="height">
            <el-form :model="addForm" ref="addForm" :rules="rules" :label-width="labelWidth" :label-position="labelPosition">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="addForm.title"></el-input>
                    <!-- <el-input articleType="hidden" v-model="addForm.id"></el-input>-->
                </el-form-item>

                <el-form-item label="来源" prop="from">
                    <el-input v-model="addForm.from"></el-input>
                </el-form-item>

                <el-form-item label="作者" prop="author">
                    <el-input v-model="addForm.author"></el-input>
                </el-form-item>

                <el-form-item label="日期" prop="create_time" >
                    <el-date-picker
                            v-model="addForm.create_time"
                            type="datetime"
                            placeholder="选择日期"
                            :picker-options="pickerOptions"
                            :editable="false"
                            @change="timeChange">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="封面图" prop="article_img">
                    <el-upload
                            ref="upload"
                            name="avatar"
                            :data="liveDir"
                            :auto-upload="false"
                            class="avatar-uploader"
                            :show-file-list="false"
                            :action='actionUrl'
                            accept="image/gif, image/jpeg,image/jpg,image/png"
                            :headers='myHeader'
                            :on-preview="handlePictureCardPreview"
                            :on-success="handleAvatarSuccess"
                            :on-error="uploadError"
                            :before-upload="beforeAvatarUpload"
                            :on-change="changefileList">
                        <img v-if="imgURL" :src="imgURL" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>

                <el-form-item label="摘要" prop="abstract">
                    <el-input type="textarea" v-model="addForm.abstract"></el-input>
                </el-form-item>

                <el-form-item label="文章类型" prop="type_id">
                    <el-select  clearable placeholder="请选择" v-model="addForm.type_id">
                        <el-option
                                v-for="item in options"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="内容" prop="content">
                    <div class='tinymce'>
                        <editor id='tinymce' v-model='addForm.content' :init='init'></editor>
                    </div>
                </el-form-item>

                <el-form-item label="是否发布" prop="publish">
                    <el-radio-group v-model="addForm.publish">
                        <el-radio label="y" border>是</el-radio>
                        <el-radio label="n" border>否</el-radio>
                    </el-radio-group>
                </el-form-item>

            </el-form>
            <div slot="dialog-foot" class="dialog-footer">
                <el-button  @click="handleClose">取消</el-button>
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
    import { getToken } from '../../utils/auth'
    import APP_CONST from '../../config/index'
    import tinymce from 'tinymce/tinymce'
    import 'tinymce/themes/modern/theme'
    import 'tinymce/skins/lightgray/skin.min.css'
    import 'tinymce/skins/lightgray/content.min.css'
    import Editor from '@tinymce/tinymce-vue'
    import 'tinymce/plugins/image'
    import 'tinymce/plugins/link'
    import 'tinymce/plugins/code'
    import 'tinymce/plugins/table'
    import 'tinymce/plugins/lists'
    import 'tinymce/plugins/contextmenu'
    import 'tinymce/plugins/wordcount'
    import 'tinymce/plugins/colorpicker'
    import 'tinymce/plugins/textcolor'
    export default {
        name: 'addList',
        mixins: [DialogForm, tinymce],
        components:{ Editor },
        props:{
                options:{
                    type:Array,
                    default:[]
                }
            },

        data() {
            return {
                init: {
                    skin_url: '/static/tinymce/skins/lightgray',
                    height: 300,
                    plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu',
                    toolbar:
                        'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
                    branding: false
                },


                dialogThis: this,
                labelPosition: 'right',
                labelWidth: '120px',
                addForm: {
                    title: '',
                    create_time: '',
                    from: '',
                    author: '',
                    abstract: '',
                    content: '',
                    article_img: '',
                    type_id: '',
                    publish:'n'
                },
                rules: {

                },
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now() ;
                    }
                },
                imgURL: '',
                liveDir: {
                    base: 'live'
                },
                myHeader: {
                    'Authorization': 'Bearer ' + getToken()
                },
                actionUrl: APP_CONST.UPLOAD_BASE_URL
            }
        },
        methods: {
            getAjaxPromise(model){
                //console.log(model);
                return this.ajaxProxy.create(model);
            },
            timeChange(v){
                let newTime = v.toISOString().substring(0,10)+ ' '+v.toTimeString().substring(0,9);
                this.addForm.create_time=newTime;
            },
            handleAvatarSuccess(res, file) {
                const vmthis = this
                if (res.code === 200) {
                    vmthis.addForm.article_img = res.data.url
                    this.formSubmit('addForm')
                } else {
                    this.$message.error(res.data.msg)
                }
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg'
                const isLt2M = file.size / 1024 / 1024 < 2
                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!')
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!')
                }
                return isJPG && isLt2M
            },
            handlePictureCardPreview(file) {
                this.url = ''
                // this.editForm.img_url = file
            },
            uploadError(err, file, fileList) {
                this.$message.error('上传出错：' + err.msg)
            },
            changefileList(file, fileList) {
                this.fileList = fileList
                this.imgURL = URL.createObjectURL(file.raw)
            },
            handleRemove(file, fileList) {},
            beforeFormSubmit(name) {
                if (this.fileList.length === 0) {
                    this.$message.error('未上传新图片')
                    return
                } else {
                    this.$refs['addForm'].validate((valid) => {
                        if (valid) {
                            this.submitUpload()
                        } else {
                            this.$emit('submit-final', name)
                            console.log('error submit!!')
                            return false
                        }
                    })
                }
            },
            submitUpload() {
                this.$refs.upload.submit()
            }
        },


        mounted () {
            tinymce.init({})
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
        max-width: 150px;
        max-height: 100px;
        display: block;
    }
    .pull-right {
        float:right
    }

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "src/styles/mixin.scss";
    .createPost-container {
        position: relative;
        .createPost-main-container {
            padding: 40px 45px 20px 50px;
            .postInfo-container {
                position: relative;
                @include clearfix;
                margin-bottom: 10px;
                .postInfo-container-item {
                    float: left;
                }
            }
            .editor-container {
                min-height: 500px;
                margin: 0 0 30px;
                .editor-upload-btn-container {
                    text-align: right;
                    margin-right: 10px;
                    .editor-upload-btn {
                        display: inline-block;
                    }
                }
            }
        }
        .word-counter {
            width: 40px;
            position: absolute;
            right: -10px;
            top: 0px;
        }
    }
</style>
