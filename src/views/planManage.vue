<template>
  <div style="width:100%;margin: auto;">
    <div class="header">计划管理</div>
    <el-row>
      <el-col :span="21" :offset="1" style="text-align: right">
             <span style="color:#808080;font-size: 12px;line-height: 50px">
               如果没有项目，请点击这里<a href="javascript:void(0);" @click="createProject" style="color:red"> 创建项目</a>
             </span>
      </el-col>
    </el-row>
    <el-form ref="progressPlanForm" :model="progressPlanForm" :rules="progressPlanRules">
      <el-row>
        <el-col :span="21" :offset="1">
          <el-form-item label="选择项目:" :label-width="labelWidth" prop="projectName">
            <el-input v-model="progressPlanForm.projectName" @focus="getProject">
              <template slot="append">
                <el-button type="primary" icon="el-icon-caret-bottom" @click="getProject"></el-button>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <div v-if="planFlag"  style="width:100%;height: auto;background-color: #FAFAFA"  >
      <div v-for="item in planList" style="cursor: pointer;width:98%;margin: auto;height:150px;padding-top:10px;background-color: white" @click="handleDetail(item)" >
        <table style="width:100%;font-size: 14px" >
          <tr>
            <td rowspan="4" style="width:150px;text-align: right">
              <el-progress type="circle" :percentage="item.totalProcess"></el-progress>
            </td>
            <td style="padding-left: 20px;margin-top:-10px;text-align: left">{{item.projectName}}</td>
          </tr>
          <tr>
            <td style="padding-left: 20px;margin-top:-10px;text-align: left">计划开始时间：{{item.startTime}}</td>
          </tr>
          <tr>
            <td style="padding-left: 20px;margin-top:-10px;text-align: left">计划结束时间：{{item.endTime}}</td>
          </tr>
          <tr>
            <td style="padding-left: 20px;margin-top:-10px;text-align: left">最新填报日期：{{item.createTime}}</td>
          </tr>
        </table>
      </div>
    </div>
    <projectDialog :isShowProjectDialog="projectFlag"  @on-result-change = "changeShowProject" @selectNode="changeNode"></projectDialog>
  </div>
</template>

<script>
  import projectDialog from '../components/projectDialog'
  import api from '../utils/api'
  import local from '../utils/local'
  export default {
    name: "planManage",
    components:{projectDialog},
    data(){
      return{
        token: '',
        labelWidth:'120px',
        progressPlanForm:{
          projectId:'',
          projectName:'',
        },
        progressPlanRules:{
          projectName:[
            {required: true, message: '请选择项目', },
          ]
        },
        statusOptions:[
          {
            label:'全部',
            value:'0'
          },
          {
            label:'已发布',
            value:'1'
          },
          {
            label:'草稿',
            value:'2'
          },
        ],
        projectFlag:false,
        statusList: ['工程筹备', '勘察设计', '待勘察', '未开工', '在建', '验收', '竣工', '终止', '已停工'],
        projectData: [],
        currentRow:null,
        planLIst:[],
        planFlag:false,
        fullscreenLoading:false
      }
    },
    created(){},
    methods:{
      search:function () {
        this.fullscreenLoading=true;
        var that=this;
        this.$refs['progressPlanForm'].validate((valid) => {
          if (valid) {
            var model={
              "projectId":this.progressPlanForm.projectId,
              "page":1,
              "pageSize":10000
            };
            api.getPlanList(model).then(res=>{
              //console.log(res);
              if (res.data.success) {
                var arr=res.data.data.list;
                if(arr.length==0){
                  that.planFlag=false;
                  that.$message({
                    message: '暂无任何数据',
                    type: 'warning',
                  });
                }else{
                  that.$message({
                    message: res.data.message,
                    type: 'success',
                  });
                  // console.log(that.planList);
                  arr.forEach(function (item) {
                    item.startTime=item.startTime.split('T')[0];
                    item.endTime=item.endTime.split('T')[0];
                    item.createTime=item.createTime.split('T')[0];
                    if(item.totalProcess!=null && item.totalProcess!='' && item.totalProcess!=0){
                      var a=parseFloat(item.totalProcess)*100;
                      item.totalProcess=Math.round(a*100)/100;
                      // console.log( item.totalProcess);
                    }else{
                      item.totalProcess=0;
                    }
                  })

                  that.planFlag=true;
                }
                that.planList=arr;
                that.fullscreenLoading=false;
                // setTimeout(function () {
                //     parent.refreshTab();
                // }, 1000);
              } else {
                that.$message.error(res.data.message);
              }
            })
          } else {
            return false;
          }
        });
      },
      createProject: function () {
        this.$router.replace('/addProject')
      },
      handleSelectChange: function (val) {
        this.currentRow = val;
      },
      getProject: function () { //获取项目列表
        this.projectFlag = true;
      },
      handleDetail:function (val) {
        //console.log(val);
        val.projectName=this.progressPlanForm.projectName;
        //console.log(val);
        var data=JSON.stringify(val);
        // localStorage.setItem('data',data);
        local.set('data',data);
        this.$router.replace('/planDetails')
      },
      changeShowProject:function (val) {
        this.projectFlag=val;
      },
      changeNode:function (val) {
        // this.addProgramForm.projectConstructionUnit=val.text;
        this.progressPlanForm.projectName = val.projectName;
        this.progressPlanForm.projectId = val.projectId;
        this.projectFlag = false;
        this.selectProject=true;
        this.search();
      },
    }
  }
</script>

<style scoped>

</style>
