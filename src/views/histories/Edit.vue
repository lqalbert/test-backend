<template>
    <div>
        <myDialog title="编辑内容" :name="name" :width="width" :height="height" @before-open="onOpen">

            <el-form :model="editForm" ref="editForm" :rules="rules" :label-width="labelWidth" :label-position="labelPosition">
                <el-form-item label="内容" prop="content">
                    <div class='tinymce'>
                        <editor id='tinymce' v-model='editForm.content' :init='init'></editor>
                    </div>
                </el-form-item>
            </el-form>

            <div slot="dialog-foot" class="dialog-footer">
                <el-button  @click="handleClose">取消</el-button>
                <submit-button @click="formSubmit('editForm')"
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
        mixins: [DialogForm],
        components:{ Editor },
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
                editForm: {
                    id:'',
                    content: ''
                },
                rules: {

                    content:[
                        { required: true,  trigger: 'blur' }
                    ]
                },
                model:''
            }
        },
        methods: {
            getAjaxPromise(model){
                return this.ajaxProxy.update(model.id, model);
            },
            onOpen(param) {
                this.model = param.params.model
                console.log(this.model);
            },
        },
        watch: {
            model: function(val, oldVal) {
                for (const key in this.editForm) {
                    if (this.editForm.hasOwnProperty(key)) {
                        this.editForm[key] = val[key]
                    }
                }
            }
        },

        created(){

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
    .pull-right {
        float:right
    }
</style>
