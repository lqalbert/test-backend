<template>
    <div>
        <myDialog title="添加" :name="name" :width="width" :height="height" >
            <el-form :model="addForm" ref="addForm" :rules="rules" :label-width="labelWidth" :label-position="labelPosition">

                <el-form-item label="用户昵称" prop="nickname">
                    <el-autocomplete
                            class="inline-input"
                            v-model="addForm.nickname"
                            :fetch-suggestions="querySearch"
                            placeholder="请输入内容"
                            @select="handleSelect"
                    ></el-autocomplete>
                </el-form-item>

                <el-form-item label="直播间房号" prop="room_id">
                    <el-select  clearable placeholder="请选择" v-model="addForm.room_id">
                        <el-option
                                v-for="item in roomType"
                                :key="item.id"
                                :label="item.room_number"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="处罚原因" prop="cause_id">
                    <el-select  clearable placeholder="请选择" v-model="addForm.cause_id">
                        <el-option
                                v-for="item in causeType"
                                :key="item.id"
                                :label="item.item"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="处罚方式" prop="punishment_id">
                    <el-select  clearable placeholder="请选择" v-model="addForm.punishment_id">
                        <el-option
                                v-for="item in punishmentType"
                                :key="item.id"
                                :label="item.item"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="处罚时长" prop="period_id">
                    <el-select  clearable placeholder="请选择" v-model="addForm.period_id">
                        <el-option
                                v-for="item in periodType"
                                :key="item.id"
                                :label="item.item"
                                :value="item.period">
                        </el-option>
                    </el-select>
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
        props:{
            causeType:{
                    type:Array,
                    default:[]
                },
            punishmentType:{
                    type:Array,
                    default:[]
                },
            periodType:{
                    type:Array,
                    default:[]
                },
            roomType:{
                    type:Array,
                    default:[]
                },
            users:{
                    type:Array,
                    default:[]
                }
            },

        data() {
            return {
                dialogThis: this,
                labelPosition: 'right',
                labelWidth: '120px',
                addForm: {
                    nickname: '',
                    room_id:'',
                    cause_id: '',
                    punishment_id: '',
                    period_id: ''
                },
                rules: {

                },

            }
        },
        methods: {
            getAjaxPromise(model){
                return this.ajaxProxy.create(model);
            },
            querySearch(queryString, cb) {
                let users = this.users;
                let results = queryString ? users.filter(this.createFilter(queryString)) : users;
                cb(results);
            },
            createFilter(queryString) {
                return (user) => {
                    return (user.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelect(item) {
                console.log(item);
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
