<template>
    <div>
        <myDialog title="添加等级类型" :name="name" :width="width" :height="height">
            <el-form :model="addForm" ref="addForm" :rules="rules" :label-width="labelWidth" :label-position="labelPosition">
                <el-form-item label="名称" prop="name">
                    <el-autocomplete
                        class="inline-input"
                        v-model="addForm.type_name"
                        :fetch-suggestions="querySearch"
                        placeholder="请输入内容"
                        @select="handleSelect"
                    ></el-autocomplete>
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
        props: {
            typeName: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                dialogThis: this,
                labelPosition: 'right',
                labelWidth: '120px',
                addForm: {
                    name: ''
                },
                rules: {

                    name:[
                        { required: true, message: '只能输入中文', trigger: 'blur' },
                        { min: 1, max: 10, message: '长度在 1 到 10个字符', trigger: 'blur' },
                        { pattern: /^[\u4E00-\u9FA5]+$/, message: '只能为中文'}
                    ]
                }
            }
        },
        methods: {
            getAjaxPromise(model){
                return this.ajaxProxy.create(model);
            },
            querySearch(queryString, cb) {
                let typeName = this.typeName;
                let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
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
