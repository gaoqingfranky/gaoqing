<template>
    <el-dialog title="人员选择" :visible.sync="showStaff" :width="dialogWidth">
        <el-table :data="staffList"
                  tooltip-effect="dark"
                  highlight-current-row
                  @current-change="handleCurrentChange"
                  v-if="showSingle"
                  :border="false"
                  style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="姓名">
                  <span>{{ props.row.userName }}</span>
                </el-form-item>
                <el-form-item label="性别">
                  <span>{{ props.row.userSex }}</span>
                </el-form-item>
                <el-form-item label="公司">
                  <span>{{ props.row.companyName }}</span>
                </el-form-item>
                <el-form-item label="部门">
                  <span>{{ props.row.depName }}</span>
                </el-form-item>
                <el-form-item label="职位">
                  <span>{{ props.row.postName }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
            <el-table-column
                    prop="userName"
                    label="姓名"
                    >
            </el-table-column>
            <el-table-column
                    prop="postName"
                    label="职务"
                    show-overflow-tooltip>
            </el-table-column>
        </el-table>
        <el-table :data="staffList"
                  tooltip-effect="dark"
                  :border="false"
                  ref="multipleTable"
                  @selection-change="handleSelectionChange"
                  v-else
                  style="width: 100%">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="姓名">
                  <span>{{ props.row.userName }}</span>
                </el-form-item>
                <el-form-item label="性别">
                  <span>{{ props.row.userSex }}</span>
                </el-form-item>
                <el-form-item label="公司">
                  <span>{{ props.row.companyName }}</span>
                </el-form-item>
                <el-form-item label="部门">
                  <span>{{ props.row.depName }}</span>
                </el-form-item>
                <el-form-item label="职位">
                  <span>{{ props.row.postName }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
            <el-table-column
                    prop="userName"
                    label="姓名"
                     >
            </el-table-column>
            <el-table-column
                    prop="postName"
                    label="职务"
                    show-overflow-tooltip>
            </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer" style="text-align: right">
            <el-button type="primary" @click="mulsubmit">确定</el-button>
            <el-button @click="showStaff = false">取 消</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import api from '../utils/api'
    export default {
        name: "staffDialog",
        props:{
            isShowStaff:{
                type:Boolean,
                default:false
            },
            parentObj:{
                type:Object
            }
        },
        data(){
            return{
                showStaff:this.isShowStaff,
                showSingle:this.parentObj.isShowSingle,
                staffList:[],
                currentRow:null,
                dialogWidth:'',
                multipleSelection:this.parentObj.mulArr
            }
        },
        created:function(){
            this.onLoad();
        },
        mounted(){
          this.setDialogWidth();
        },
        methods:{
            onLoad:function(){
                this.getUserList();
            },
            getUserList:function(){ //员工列表
                var that=this;
                var userModel={
                    "userPhone":"",
                    "userName":"",
                    "userAccount":"",
                    "userDepId":"",
                    "userPostId":"",
                    "page":1,
                    "pageSize":1000
                };
                var arr=[];
                api.getStaffList(userModel).then(res=>{
                    //console.log(res);
                    if(res.data.success){
                        if(res.data.data.list.length!=null && res.data.data.list.length>0){
                            res.data.data.list.forEach(function (item) {
                                if(item.userSex=='1'){
                                    item.userSex='男';
                                }
                                if(item.userSex=='0'){
                                    item.userSex='女'
                                }
                            })
                            arr=res.data.data.list;
                            that.staffList=arr;
                        }

                    }else{
                        that.$message.error(res.data.message);
                    }
                })
            },
            handleCurrentChange:function(val){
                this.currentRow = val;
            },
            mulsubmit:function(){
                if(this.showSingle){ //单选
                    if(this.currentRow==null){
                        this.$message.error('请在表格中选择！');
                    }else{
                        this.$emit("selectStaffNode",this.currentRow);
                        this.showStaff=false;
                    }
                }else{ //多选
                    if(this.multipleSelection.length==0){
                        this.$message.error('请在表格中选择！');
                    }else{
                        this.$emit("selectStaffMore",this.multipleSelection);
                        this.showStaff=false;
                        // this.addProgramForm.projectAdminUserName=this.currentRow.userName;
                        // this.addProgramForm.projectAdminUserId=this.currentRow.userId;
                        // this.findPersonFlag = false;
                    }
                }

            },
          handleSelectionChange:function (val) {
              this.multipleSelection = val;
          },
          setDialogWidth() {
            //console.log(document.body.clientWidth)
            var val = document.body.clientWidth
            const def = 800 // 默认宽度
            if (val < def) {
              this.dialogWidth = '100%'
            } else {
              this.dialogWidth = def + 'px'
            }
          }
        },
        watch:{
            isShowStaff(val) {
                this.showStaff = val;//②监听外部对props属性result的变更，并同步到组件内的data属性myResult中
            },
            showStaff(val){
                this.$emit("on-result-change",val);//③组件内对myResult变更后向外部发送事件通知
            },
        }
    }
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 120px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }

</style>
