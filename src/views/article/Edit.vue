<template>
    <div>
        <myDialog title="编辑文章" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-form :model="editForm" ref="editForm" :rules="rules" :label-width="labelWidth" :label-position="labelPosition">
                <el-form-item label="标题" prop="title">
                    <el-input class="name-input" size="small" v-model="editForm.title" ></el-input>
                </el-form-item>

                <el-form-item label="来源" prop="from">
                    <el-input class="name-input" size="small" v-model="editForm.from" ></el-input>
                </el-form-item>

                <el-form-item label="作者" prop="author">
                    <el-input class="name-input" size="small" v-model="editForm.author" ></el-input>
                </el-form-item>

                <el-form-item label="日期" prop="create_time" >
                    <el-date-picker
                            v-model="editForm.create_time"
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
                    <el-input type="textarea" size="small"  v-model="editForm.abstract"></el-input>
                </el-form-item>
                <!--<el-form-item label="内容" prop="content">
                    <el-input type="textarea" size="small" v-model="editForm.content"></el-input>
                </el-form-item>-->

                <el-form-item label="内容" prop="content">
                    <div class='tinymce'>
                        <editor id='tinymce' v-model='editForm.content' :init='init'></editor>
                    </div>
                </el-form-item>

                <el-form-item label="文章类型" prop="type_id">
                    <el-select  clearable v-model="editForm.type_id">
                        <el-option
                                v-for="item in options"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="是否发布" prop="publish">
                    <el-radio-group v-model="editForm.publish">
                        <el-radio label="y" border>是</el-radio>
                        <el-radio label="n" border>否</el-radio>
                    </el-radio-group>
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
    /* eslint-disable indent,no-mixed-spaces-and-tabs */
    import { getToken } from '../../utils/auth'
    import DialogForm from '../../mix/DialogForm'
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
        name: 'editList',
        mixins: [DialogForm,tinymce],
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
                myHeader: {
                    'Authorization': 'Bearer ' + getToken()
                },
                liveDir: {
                    base: 'live'
                },
                actionUrl: APP_CONST.UPLOAD_BASE_URL,
                url: APP_CONST.BASE_URL,
                editForm: {
                    id: '',
                    title: '',
                    author: '',
                    from: '',
                    create_time: '',
                    abstract: '',
                    content: '',
                    publish: '',
                    article_img:'',
                    type_id:''
                },
                rules: {

                },
                model: '',
                fileList: [],
                imgURL: '',
                submit_stat: '',
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now() ;
                    }
                },
            }
        },
        methods: {
            onOpen(param) {
                this.model = param.params.model
            },
            getAjaxPromise(model) {
                return this.ajaxProxy.update(model.id, model)
            },
            timeChange(v){
                let newTime = v.toISOString().substring(0,10)+ ' '+v.toTimeString().substring(0,9);
                this.editForm.create_time=newTime;
            },
            handleAvatarSuccess(res, file) {
                const vmthis = this
                if (res.code === 200) {
                    vmthis.editForm.article_img = res.data.url
                    this.formSubmit('editForm')
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
                this.submit_state = -1
                this.$refs['submit-button'].$emit('reset')
            },
            changefileList(file, fileList) {
                this.fileList = fileList
                this.imgURL = URL.createObjectURL(file.raw)
            },
            handleRemove(file, fileList) {},
            beforeFormSubmit(name) {
                this.submitUpload()
                this.reals(name)
            },
            submitUpload() {
                if (this.fileList.length === 0) {
                    this.submit_stat = 2
                } else {
                    this.submit_stat = 1
                    this.$refs.upload.submit()
                }
                // this.$refs.upload.submit()
            },
            reals(name) {
                const vmthis = this
                if (vmthis.d) {
                    clearTimeout(vmthis.d)
                }
                if (vmthis.submit_stat === -1 || vmthis.submit_stat === 1) {
                    return
                }
                vmthis.d = setTimeout(function() {
                    if (vmthis.submit_stat === 2) {
                        vmthis.formSubmit(name)
                    } else {
                        vmthis.reals(name)
                    }
                }, 2000)
            }
        },
        watch: {
            model: function(val, oldVal) {
                for (const key in this.editForm) {
                    if (this.editForm.hasOwnProperty(key)) {
                        this.editForm[key] = val[key]
                    }
                }
                this.imgURL = this.url + this.editForm.article_img
            }
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
        max-width: 100%;
        min-height: 60px;
        max-height: 200px;
        display: block;
    }
</style>