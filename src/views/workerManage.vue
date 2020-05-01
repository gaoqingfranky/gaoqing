<template>
  <div style="width:100%;margin: auto;">
    <div class="header">劳工管理</div>
    <el-row :gutter="20" class="center">
      <el-col :span="10">
        <div class="dd" >项目列表</div>
        <el-table
          ref="singleTable"
          :data="projectList"
          highlight-current-row
          :show-header="false"
          @current-change="handleCurrentChange"
          style="width: 100%;text-align: center">
          <el-table-column
            prop="projectName"
            >
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="14" >
        <div class="dd">对应劳工</div>
        <el-collapse accordion >
          <el-collapse-item  v-for="item in workerTableData">
            <template slot="title">
              <span style="padding-left: 10px">{{item.userName}}</span>
            </template>
            <!--<div><span class="leftcell">劳工编号：</span><span class="rightcell"> {{item.contractWorkerId}}</span></div>-->
            <div><span class="leftcell">手机号码： </span><span class="rightcell">{{item.mobilePhone}}</span></div>
            <div><span class="leftcell">从事工种：</span><span class="rightcell">{{item.workTypeName}}</span></div>
            <div><span class="leftcell">上岗日期：</span><span class="rightcell">{{item.entryTime}}</span></div>
            <div><span class="leftcell">身份证号：</span><span class="rightcell">{{item.idCard}}</span></div>
            <div><span class="leftcell">工资待遇：</span><span class="rightcell">{{item.salary}} <span>(元/工日)</span></span></div>
            <div><span class="leftcell">工作时间：</span><span class="rightcell">{{item.workTime}}<span>(小时/天)</span></span></div>
            <div><span class="leftcell">银行卡号：</span><span class="rightcell">{{item.bankNumber}}</span></div>
            <div><span class="leftcell">更新时间：</span><span class="rightcell">{{item.updateTime}}</span></div>
            <div style="height: 65px;padding-left: 50px;border:none">
              <el-button type="primary" plain @click="check(item)">修改</el-button>
              <!--<el-button type="warning" plain @click="check(item,1)">编辑</el-button>-->
            </div>
          </el-collapse-item>
        </el-collapse>

        <!--<div v-else style="width:100%;height: 60px;line-height: 60px;background-color: white;text-align: center">暂无数据</div>-->
      </el-col>
    </el-row>
  </div>
</template>

<script>
   import api from '../utils/api'
    export default {
        name: "workerManage",
        data(){
          return{
            projectList:[],
            workerTableData:[],
            searchModel:{
              "projectId": '', //项目ID
              'projectName':'',
              "userName": '', //名称
              "mobilePhone": '', //手机号码
              "contractWorkerStatus": -1, //状态，-1：全部，    1：在岗，0：离岗
              "page": 1,
              "pageSize": 10000
            },
          }
        },
      created(){
          this.onLoad();
      },
      methods:{
          onLoad:function () {
             var that=this;
            var model = {
              "page": 1,
              "pageSize": 10000
            };
             api.getProjectList(model).then(res=>{
                if(res.data.success){
                  that.projectList=res.data.data.list
                }
             })
          },
        handleCurrentChange:function (row) {
            //console.log(row);
          //this.workertableData = [];
         this.searchModel.projectId=row.projectId;
          this.searchModel.projectName=row.projectName;
         var that=this;
         api.getWorkerListById(this.searchModel).then(res=>{
           //console.log(res);
           if(res.data.success){
             if (res.data.data.list != '' && res.data.data.list != null && res.data.data.list.length > 0) {
               res.data.data.list.forEach(function (item) {
                 if (item.entryTime != '' && item.entryTime != null) {
                   item.entryTime = item.entryTime.split('T')[0];
                   item.updateTime = item.updateTime.split('T')[0];
                 }
                 item.sexIndex += '';
                 item.sigin += '';
                 item.contractWorkerStatus += '';
               })
             }
               that.workerTableData = res.data.data.list;
               // that.pageCount=res.data.pageCount;
           }else{
             that.workertableData = [];
             //that.$message.warning('暂无数据')
           }
         })
        },
        check:function (row) {
            row.projectName=this.searchModel.projectName;
          this.$router.replace({
            path:'/workerUpdate',
            name:'workerUpdate',
            params:{
              row:JSON.stringify(row)
            }
          })
        }
      }
    }
</script>

<style scoped>
  .center{
    text-align: center;
  }
  .dd{
    width:100%;
    height: 40px;
    line-height: 40px;
    background-color: white;
    border-bottom: 1px solid #ccc;
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
    text-align: left;
  }

  .rightcell {
    width: 100%;
    text-align: left;
    padding-left: 30px;
    overflow: hidden;
    overflow-x: auto;
  }

  .el-button {
    margin-top: 15px;
  }
</style>
