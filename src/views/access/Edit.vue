<template>
    <div>
        <myDialog title="角色授权" :name="name" :width="width" :height="height" @before-open="onOpen">

            <el-form :model="editForm" ref="editForm" :label-width="labelWidth" :label-position="labelPosition">
                <!--<el-form-item label="角色名字" prop="role_name">
                    <el-input v-model="editForm.role_name" disabled></el-input>
                </el-form-item>-->
                <el-form-item label="所属学院" prop="cid" v-if="showCollege">
                    <el-select  clearable placeholder="请选择" v-model="editForm.cid">
                        <el-option
                                v-for="item in colleges"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item prop="access">
                    <el-tree
                        ref="tree"
                        :data="data2"
                        show-checkbox
                        node-key="access_point"
                        :default-expanded-keys="[]"
                        :default-checked-keys="editForm.access_point"
                        :props="defaultProps">
                    </el-tree>
                </el-form-item>
            </el-form>
            <div slot="dialog-foot" class="dialog-footer">
                <el-button  @click="handleClose">取消</el-button>
                <submit-button @click="beforeFormSubmit('editForm')"
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
        name: 'editList',
        mixins: [DialogForm],
        props: {
            colleges: {
                type: Array,
                default: []
            },
            showCollege: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                dialogThis: this,
                labelPosition: 'right',
                labelWidth: '120px',
                editForm: {
                    id:'',
                    cid:'',
                    role_id:'',
                    access_point:[],
                    main_menu:[]
                },
                model:'',
                data2: [{
                    id: 1,
                    access_point:'dashboard',
                    label: '首页面板',
                    disabled: true,
                    children:[{
                        id:40,
                        access_point:'home',
                        label:'首页面板',
                        disabled: true
                    }]
                }, {
                    id: 2,
                    label: '系统管理',
                    access_point:'system',
                    children: [{
                        id: 3,
                        access_point:'role',
                        label: '角色列表'
                    }, {
                        id: 4,
                        access_point:'user',
                        label: '用户列表'
                    },
                        {
                            id: 42,
                            access_point:'sockpuppet',
                            label: '马甲列表'
                        },{
                        id: 5,
                            access_point:'access',
                        label: '授权列表'
                    }]
                }, {
                    id: 6,
                    access_point:'room',
                    label: '直播间管理',
                    children: [{
                        id: 7,
                        access_point:'livelist',
                        label: '直播间列表'
                    }, {
                        id: 8,
                        access_point:'chatmsg',
                        label: '直播互动'
                    },{
                        id: 9,
                        access_point:'word',
                        label: '敏感词汇管理'
                    }]
                },{
                    id: 10,
                    access_point:'website',
                    label: '网站管理',
                    children: [{
                        id: 11,
                        access_point:'level',
                        label: '会员等级'
                    }, {
                        id: 12,
                        access_point:'ad',
                        label: '广告设置',
                        children:[{
                            id:13,
                            access_point:'homead',
                            label:'首页广告'
                        },{
                            id:14,
                            access_point:'livead',
                            label:'直播间广告'
                        }]
                    },{
                        id: 15,
                        access_point:'teacher',
                        label: '名师简介'
                    },{
                        id: 16,
                        access_point:'course',
                        label: '课程简介'
                    },{
                        id: 17,
                        access_point:'article',
                        label: '文章管理',
                        children:[{
                            id:18,
                            access_point:'type',
                            label:'文章类别'
                        },{
                            id:19,
                            access_point:'articlelist',
                            label:'文章列表'
                        }]
                    },{
                        id: 20,
                        access_point:'school',
                        label: '学校概况',
                        children:[{
                            id:21,
                            access_point:'introduction',
                            label:'学校简介'
                        },{
                            id:22,
                            access_point:'develop_history',
                            label:'发展历程'
                        }]
                    },{
                        id: 23,
                        access_point:'announcement',
                        label: '重要通告'
                    },{
                        id: 24,
                        access_point:'curriculum',
                        label: '课程表管理'
                    },{
                        id: 25,
                        access_point:'answer',
                        label: '咨询问答'
                    }]
                },{
                    id: 26,
                    access_point:'sale',
                    label: '营销工具',
                    children: [{
                        id: 27,
                        access_point:'set',
                        label: '营销设置'
                    }, {
                        id: 28,
                        access_point:'prize',
                        label: '抽奖',
                        children:[{
                            id:29,
                            access_point:'lottery_draws',
                            label:'奖励列表'
                        },{
                            id:30,
                            access_point:'lottery_history',
                            label:'历史记录'
                        }]
                    },{
                        id: 31,
                        access_point:'packet',
                        label: '红包管理',
                        children:[{
                            id:32,
                            access_point:'packetlist',
                            label:'红包列表'
                        },{
                            id:33,
                            access_point:'userpacket',
                            label:'用户红包'
                        }]
                    },{
                        id: 34,
                        access_point:'activity',
                        label: '活动管理'
                    }]
                },
                    {
                        id:35,
                        access_point:'violation',
                        label:'违规处罚',
                        children:[{
                            id:41,
                            access_point:'vio',
                            label:'违规处罚',
                        }]
                    },
                    {
                    id: 36,
                    access_point:'data',
                    label: '数据统计',
                    children: [{
                        id: 37,
                        access_point:'current',
                        label: '实时在线用户'
                    }, {
                        id: 38,
                        access_point:'register',
                        label: '新增用户统计'
                    },{
                        id: 39,
                        access_point:'loginhistory',
                        label: '用户登录历史'
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            }
        },
        methods: {
            getAjaxPromise(model){
                return this.ajaxProxy.update(model.id, model);
            },
            onOpen(param) {
                this.model = param.params.model
            },

            beforeFormSubmit(){
                let checkedkey = this.$refs.tree.getCheckedKeys()
                let halfcheckedkey = this.$refs.tree.getHalfCheckedKeys()
                //let arr = checkedkey.concat(halfcheckedkey);
                this.editForm.access_point=checkedkey;
                this.editForm.main_menu=halfcheckedkey;
                this.formSubmit('editForm')
            }
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
