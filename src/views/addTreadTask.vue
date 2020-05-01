<template>
  <div style="width:100%;margin: auto;">
    <div class="header">添加踩盘</div>
    <el-form label-width="120px" ref="dialogFormModel" :model="dialogFormModel" :rules="dialogModelRules">
      <el-form-item label="任务名称" prop="inverstmentName">
        <el-input v-model="dialogFormModel.inverstmentName" placeholder="请输入任务名称"></el-input>
      </el-form-item>
      <el-form-item label="选择项目" prop="projectName">
        <el-input v-model="dialogFormModel.projectName" placeholder="请选择项目" @focus="selectProject">
          <el-button slot="append" icon="el-icon-search" @click="selectProject"></el-button>
        </el-input>
        <el-input v-model="dialogFormModel.projectId" style="display:none"></el-input>
      </el-form-item>
      <el-form-item label="开始日期" prop="beginTime">
        <el-date-picker v-model="dialogFormModel.beginTime" value-format="yyyy-MM-dd hh:mm:ss"
                        type="date" placeholder="选择开始日期" >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束日期" prop="endTime">
        <el-date-picker v-model="dialogFormModel.endTime" value-format="yyyy-MM-dd hh:mm:ss"
                        type="date" placeholder="选择结束日期" >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="选择小区">
        <el-input v-model="dialogFormModel.villageName" placeholder="请输入小区名称"></el-input>
      </el-form-item>

      <el-form-item label="踩盘人员" prop="userName">
        <el-input v-model="dialogFormModel.userName" @focus="showSelectUser">
          <el-button slot="append" icon="el-icon-search" @click="showSelectUser"></el-button>
        </el-input>
        <!--<el-input v-model="dialogFormModel.userId" style="display:none"></el-input>-->
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="dialogFormModel.taskRemark" ></el-input>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" @click="save('dialogFormModel')">保存</el-button>
      </el-form-item>
    </el-form>
    <projectDialog :isShowProjectDialog="projectFlag"  @on-result-change = "changeShowProject" @selectNode="changeProjectNode"></projectDialog>
    <staffDialog :isShowStaff="staffFlag" :parentObj="pobj" @on-result-change = "changeShowStaff" @selectStaffMore="changeStaffNode"></staffDialog>
  </div>
</template>

<script>
   import projectDialog from '../components/projectDialog'
   import staffDialog from '../components/staffDialog'
   import api from '../utils/api'
    export default {
        name: "addTreadTask",
        components:{projectDialog,staffDialog},
        data(){
          return{
            dialogFormModel:{
              inverstmentName:'',
              projectName:'',
              projectId:'',
              startTime:'',
              endTime:'',
              userName:'',
              userId:[]
            },
            dialogModelRules: {
              inverstmentName:[
                {required: true, message: '请输入任务名称',trigger: 'blur'},
              ],
              projectName: [
                {required: true, message: '请选择项目'},
              ],
              startTime: [
                {required: true, message: '请选择开始时间',trigger: 'blur'},
              ],
              endTime: [
                {required: true, message: '请选择结束时间',trigger: 'blur'},
              ],
              userName:[
                {required: true, message: '请选择踩盘人员'},
              ]
            },
            projectFlag:false,
            pobj:{
              isShowSingle:false,
              mulArr:[]
            },
            staffFlag:false,
          }
        },
      created(){

      },
      methods:{
        selectProject:function () {
          this.projectFlag=true;
        },
        showSelectUser:function () {
          this.staffFlag=true;
        },
        save:function (formName) {
          var that=this;
          this.$refs[formName].validate((valid) => {
            if (valid) {
              var model={
                "inverstmentName":this.dialogFormModel.inverstmentName,//任务名称
                "villageName":this.dialogFormModel.villageName,//小区名称
                "inverstMentId":this.dialogFormModel.projectId, //项目名ID
                "userId":this.dialogFormModel.userId, //踩盘用户ID
                "beginTime":this.dialogFormModel.beginTime,//开始时间
                "endTime":this.dialogFormModel.endTime,//结束时间
                "taskRemark":this.dialogFormModel.taskRemark //备注
              }
              // console.log(model);
              api.addTreadTask(model).then(res=>{
                if(res.data.success){
                  that.$message.success({
                    message:res.data.data,
                    onClose: s => {
                      that.$router.replace("/treadTaskManage");
                    }
                  })
                }
              })
            } else {

              return false;
            }
          })
        },
        changeShowProject:function (val) {
          this.projectFlag=val
        },
        changeProjectNode:function (val) {
          this.dialogFormModel.projectName=val.projectName;
          this.dialogFormModel.projectId=val.projectId;
        },
        changeShowStaff:function (val) {
          this.staffFlag=val;
        },
        changeStaffNode:function (val) {
          var namestr='';
          var idArr=[];
          val.forEach(function (item) {
            namestr+=item.userName+',';
            idArr.push(item.userId);
          });

          this.dialogFormModel.userName=namestr.substring(0,namestr.length-1);
          this.dialogFormModel.userId=idArr;
        }
      }
    }
</script>

<style scoped>
    .el-form .el-form-item{
      padding-right: 15px;
    }
</style>
