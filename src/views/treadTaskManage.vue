<template>
  <div style="width:100%;margin: auto;">
    <div class="header">踩盘任务管理</div>
    <el-row class="center">
      <el-col :span="24">
        <el-collapse accordion>
          <el-collapse-item v-for="item in tableData">
            <template slot="title">
              <span style="padding-left: 10px">{{item.villageName}}</span>
            </template>
            <div><span class="leftcell">小区名称：</span> <span class="rightcell">{{item.villageName}}</span></div>
            <div><span class="leftcell">开始时间：</span> <span class="rightcell">{{item.beginTime}}</span></div>
            <div><span class="leftcell">结束时间：</span> <span class="rightcell">{{item.endTime}}</span></div>
            <div><span class="leftcell">踩盘人员：</span> <span class="rightcell">{{item.userName}}</span></div>
            <div><span class="leftcell">状态：</span> <span class="rightcell">{{item.taskStatusName}}</span></div>
            <div><span class="leftcell">备注：</span> <span class="rightcell">{{item.taskRemark}}</span></div>
            <div style="height: 65px;padding-left: 50px;border:none">
              <el-button type="primary" plain @click="handleClick(item,0)">详情</el-button>
              <el-button type="warning" plain @click="handleClick(item,1)">编辑</el-button>
              <el-button type="danger" plain @click="handleClick(item,3)">删除</el-button>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>
    <projectDialog :isShowProjectDialog="projectFlag"  @on-result-change = "changeShowProject" @selectNode="changeProjectNode"></projectDialog>
    <staffDialog :isShowStaff="staffFlag" :parentObj="pobj" @on-result-change = "changeShowStaff" @selectStaffMore="changeStaffNode"></staffDialog>
    <!--弹窗-->
    <el-dialog :title="dialogModel.title"  style="margin-top:-50px;"
               :visible.sync="dialogModel.dialogTableVisible" :width="dialogWidth">
      <el-form label-width="120px" :model="dialogFormModel" ref="dialogFormModel" :rules="dialogFormRules">
        <el-form-item label="任务名称" prop="inverstmentName">
          <el-input v-model="dialogFormModel.inverstmentName"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" prop="beginTime">
          <el-date-picker v-model="dialogFormModel.beginTime" value-format="yyyy-MM-dd hh:mm:ss"
                          type="date" placeholder="请选择开始日期" >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker v-model="dialogFormModel.endTime" value-format="yyyy-MM-dd hh:mm:ss"
                          type="date" placeholder="请选择结束日期" >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="小区" prop="villageName">
          <el-input v-model="dialogFormModel.villageName"></el-input>
        </el-form-item>
        <el-form-item label="踩盘人员" prop="userName">
          <el-input v-model="dialogFormModel.userName" @focus="showSelectUser">
            <el-button slot="append" icon="el-icon-search" v-on:click="showSelectUser"></el-button>
          </el-input>
          <!--<el-input v-model="dialogFormModel.userId" style="display:none"></el-input>-->
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="dialogFormModel.taskRemark" :disabled="dialogModel.disabled"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="updateTask('dialogFormModel')">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import projectDialog from '../components/projectDialog'
  import staffDialog from '../components/staffDialog'
  import api from '../utils/api'
    export default {
        name: "treadTaskManage",
      components:{projectDialog,staffDialog},
      data(){
          return{
            dialogModel: {
              dialogTableVisible: false,
              title: '踩盘任务编辑',
              disabled: false,
            },
            dialogWidth:'',
            dialogFormModel:{},
            dialogFormRules:{
              inverstmentName:[
                {required: true, message: '请输入任务名称',trigger: 'blur'},
              ],
              projectName: [
                {required: true, message: '请选择项目',trigger: 'blur'},
              ],
              beginTime: [
                {required: true, message: '请选择开始时间',trigger: 'blur'},
              ],
              endTime: [
                {required: true, message: '请选择结束时间',trigger: 'blur'},
              ],
              userName:[
                {required: true, message: '请选择踩盘人员',trigger: 'blur'},
              ]
            },
            searchModel:{
              inverstmentName: '',
              inverstMentId:'',
              taskStatus: '-1',
              page: 1,
              pageSize: 10,
              pageCount: 0,
              totalCount: 0
            },
            tableData:[],
            options:[
              {
                value: '-1',
                label: '全部'
              },
              {
                value: '0',
                label: '进行中'
              }, {
                value: '1',
                label: '已完成'
              }
            ],
            projectFlag:false,
            loading: true,
            staffFlag:false,
            pobj:{
              isShowSingle:false,
              mulArr:[]
            }
          }
      },
      created(){
        this.onLoad()
      },
      mounted(){
         this.setDialogWidth()
      },
      methods:{
        onLoad:function(){
          this.search();
        },
        selectProject:function () {
          this.projectFlag=true;
        },
        handleCurrentChange:function (page) {
          this.searchModel.page = page;
          this.search();
        },
        handleSizeChange:function (val) {
          this.searchModel.pageSize = val;
          //this.search();
        },
        handleClick:function (row,type) {
          var that=this;
          if (type == 0 ) { //查看详情
            this.$router.replace({
              path:'/treadTaskDetail',
              name:'treadTaskDetail',
              params:{
                type:type,
                inverstmentTaskId:row.inverstmentTaskId
              }
            })
          }
          if(type==1){ //编辑
            this.dialogModel.dialogTableVisible=true;
            // var arr=[new Date(row.beginTime),new Date(row.endTime)];
            this.dialogFormModel=row;
            //console.log(row);
            // this.dialogFormModel.taskTime=arr;
          }
          if (type == 3) {//删除
            this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              api.removeTreadTask({ inverstmentTaskId: row.inverstmentTaskId }).then(function (res) {
                if (res.data.code == 0) {
                  that.$message({
                    message: '删除成功',
                    type: 'success',
                    duration: 1500,
                    onClose: function () {
                      that.search();
                    }
                  });
                }
                else {
                  that.$message.error(res.data.message);
                }
              })
            })
          }
        },
        search:function () {
         // this.loading = true;
          var that=this;
          api.getTreadTaskList(this.searchModel).then(res=>{
            //console.log(res)
            if(res.data.success){
              that.searchModel.totalCount = res.data.data.totalCount;
              that.searchModel.pageCount = res.data.data.totalPage;
              //列表
              var tableArray = new Array();
              res.data.data.list.forEach(function (item) {
                tableArray.push({
                  beginTime: item.beginTime.split('T')[0],
                  createTime: item.createTime,
                  endTime: item.endTime.split('T')[0],
                  inverstMentId: item.inverstMentId,
                  inverstmentTaskId: item.inverstmentTaskId,
                  realEndTime: item.realEndTime,
                  taskRemark: item.taskRemark,
                  taskStatus: item.taskStatus,
                  taskStatusName: item.taskStatusName,
                  userId: item.userId,
                  userName: item.userName,
                  villageName: item.villageName,
                  inverstmentName:item.inverstmentName,
                })
              })
              that.tableData = tableArray;
              //that.loading = false;
            }
          })
        },
        changeShowProject:function (val) {
          this.projectFlag=val;
        },
        changeProjectNode:function (val) {
          this.searchModel.inverstMentId=val.projectId;
          this.searchModel.inverstmentName=val.projectName;
        },
        selectChange:function (val) {
          this.searchModel.taskStatus=val;
        },
        changeShowStaff:function (val) {
          this.staffFlag=val;
        },
        showSelectUser:function(){
          this.staffFlag=true;
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
        },
        updateTask:function (formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              var model={
                "inverstmentName":this.dialogFormModel.inverstmentName,//任务名称
                "villageName":this.dialogFormModel.villageName,//小区名称
                "inverstMentId":this.dialogFormModel.inverstMentId, //项目名ID
                "userId":this.dialogFormModel.userId, //踩盘用户ID
                "beginTime":this.dialogFormModel.beginTime,//开始时间
                "endTime":this.dialogFormModel.endTime,//结束时间
                "taskRemark":this.dialogFormModel.taskRemark, //备注
                "inverstmentTaskId":this.dialogFormModel.inverstmentTaskId //任务id
              }
              var that=this;
              // console.log(model);
              api.updateTreadTask(model).then(res=>{
                if(res.data.success){
                  that.$message.success({
                    message:res.data.data,
                    onClose: s => {
                      that.dialogModel.dialogTableVisible=false;
                      //that.$router.replace("/treadTask");
                      that.onLoad()
                    }
                  })
                }
              })
            } else {
              return false;
            }
          })
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
      }
    }
</script>

<style scoped>
  .center {
    text-align: center;
  }

  .el-collapse-item__content div {
    text-align: left;
    padding-left: 25px;
    height: 40px;
    line-height: 40px;
    width: 98%;
    margin: 0 auto;
    border-bottom: 1px solid #f2f2f2;
    display: flex;
    flex-direction: row;
    justify-content: start;
  }

  .leftcell {
    width: 120px;
    text-align: right;
  }

  .rightcell {
    width: 100%;
    text-align: left;
    padding-left: 30px;
  }

  .el-button {
    margin-top: 15px;
  }
</style>
