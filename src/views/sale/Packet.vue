<template>
    <div>
        <commontable @addRow="openDialog" @handleDelete="handleDelete" @reload="reload" @handleEdit="handleEdit"
                     @search="search" @changeCurrent="handleCurrentChange" @changePagesize="handleSizeChange"
                     :ban-fields="banFields" :table-data="tableData" :table-title="tableTitle" :perpages="perpages"
                     :total="total">
		</commontable>
		
		<!--添加和编辑的对话框-->
		<div class="components-container">
		    <el-dialog v-el-drag-dialog @dragDialog="handleDrag" title="添加红包" :visible.sync="dialogTableVisible">
		        <el-form :rules="rules" ref="addForm" :model="addForm" label-position="left" label-width="150px"
		                 style='width: 400px; margin-left:50px;'>

		            <el-form-item :label="name" prop="name">
		                <el-input v-model="addForm.name" ></el-input>
		            </el-form-item>

		            <el-form-item :label="path" prop="path">
		                <el-input v-model="addForm.path"></el-input>
		            </el-form-item>

		            <el-form-item :label="component" prop="component">
		                <el-input v-model="addForm.component" ></el-input>
		            </el-form-item>

		            <el-form-item :label="icon" prop="icon">
		                <el-input v-model="addForm.icon"></el-input>
		            </el-form-item>

		            <el-form-item :label="level" prop="level">
		                <el-input v-model="addForm.level" ></el-input>
		            </el-form-item>

		            <el-form-item :label="comment" prop="comment">
		                <el-input v-model="addForm.comment"></el-input>
		            </el-form-item>


		            
		        </el-form>

		        <div slot="footer" class="dialog-footer">
		            <el-button @click="dialogFormVisible">取消</el-button>
		            <el-button type="primary" @click="confirms">确定</el-button>
		        </div>
		    </el-dialog>
		</div>

    </div>
</template>

<script>
    import Commontable from '@/components/Commontable'
    import { createPacket, sendPacket, packetList } from '@/api/sale'


	export default {
		name: 'packet-demo',
		components: {
			Commontable:Commontable,
		},
	  	data() {
		    return {
				total: 1,
				searchForm: '',
				tableTitle: [],
				tableData: [],
				banFields: [],
				perpages:1,
				dialogTableVisible:false,
				rules: {
                    name: [{required: true, message: '菜单名必须填写', trigger: 'blur'}],
                    path: [{required: true, message: '菜单路径必须填写', trigger: 'blur'}],
                    component: [{required: true, message: '菜单所属组件必须填写', trigger: 'blur'}],
                    level: [{required: true, message: '菜单级别必须填写', trigger: 'blur'}],
                    comment: [{required: true, message: '菜单说明必须填写', trigger: 'blur'}],
                },
                addForm: {},
		    }
	  	},
	  	mounted() {
	    	this.getData()
	  	},
	  	methods: {
	  		openDialog(){
	  			console.log('openDialog');
	  		},
			handleDelete(){

			},
			reload(){

			},
			handleEdit(){

			},
			search(){

			},
			handleCurrentChange(){

			},
			handleSizeChange(){

			},
			getData(){
				packetList().then(response=>{
					this.tableTitle=response.fields;
					this.tableData=response.data;
					this.total=response.total;
				}).catch(error=>{

				})
			}
	  	}

	}
</script>

<style>
</style>