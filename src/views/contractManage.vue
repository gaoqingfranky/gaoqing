<template>
  <div class="w-content" style="width:98%;margin: auto;">
    <div class="header">合同管理</div>
    <el-row class="center">
      <el-col :span="24">
        <el-collapse accordion>
          <el-collapse-item v-for="item in contractList">
            <template slot="title">
              <span style="padding-left: 10px">{{item.contractName}}</span>
            </template>
            <div><span class="leftcell">合同类型：</span> <span class="rightcell">{{item.contractTypeName}}</span></div>
            <div><span class="leftcell">项目名称：</span> <span class="rightcell">{{item.projectName}}</span></div>
            <div><span class="leftcell">甲方单位：</span> <span class="rightcell">{{item.contractFirstName}}</span></div>
            <div><span class="leftcell">乙方单位：</span> <span class="rightcell">{{item.contractSecondName}}</span></div>
            <div><span class="leftcell">收付类型：</span> <span class="rightcell">{{item.contractPayTypeName}}</span></div>
            <div><span class="leftcell">签订时间：</span> <span class="rightcell">{{item.contractSignTime}}</span></div>
            <div style="height: 65px;padding-left: 50px;border:none">
              <el-button type="primary" plain @click="check(item,0)">详情</el-button>
              <el-button type="warning" plain @click="check(item,1)">编辑</el-button>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import api from '../utils/api'
    export default {
        name: "contractManage",
      data(){
          return{
            contractList:[],
            searchData: {
              page: 1,
              pageSize: 1000,
              totalcount:0,
              contractPayType: '-1',
              contractType: '-1',
              projectId: ''
            },
          }
      },
      created(){
          this.onLoad();
      },
      methods:{
          onLoad:function () {
             var that=this;
             api.getContractList(this.searchData).then(res=>{
               if(res.data.success){
                 res.data.data.list.forEach(function (item, index) {
                   if (item.contractPayType == '0') {
                     item.contractPayTypeName = '收';
                   }
                   if (item.contractPayType == '1') {
                     item.contractPayTypeName = '付';
                   }
                   if (item.contractType == '0') {
                     item.contractTypeName = '总包合同';
                   }
                   if (item.contractType == '1') {
                     item.contractTypeName = '劳务承包合同';
                   }
                   if (item.contractType == '2') {
                     item.contractTypeName = '其他收款合同';
                   }
                   if (item.contractType == '101') {
                     item.contractTypeName = '专业分包合同';
                   }
                   if (item.contractType == '102') {
                     item.contractTypeName = '劳务分包合同';
                   }
                   if (item.contractType == '103') {
                     item.contractTypeName = '采购合同';
                   }
                   if (item.contractType == '104') {
                     item.contractTypeName = '租赁合同';
                   }
                   if (item.contractType == '105') {
                     item.contractTypeName = '其他付款合同';
                   }
                   item.contractSignTime = item.contractSignTime.split('T')[0];
                 });
                 that.contractList = res.data.data.list;
                 that.searchData.totalcount=res.data.data.totalCount;
               }
             })
          },
         check:function (row,type) { //详情/编辑
           this.$router.replace({
             path:'/editContract',
             name:'editContract',
             params:{
               type:type,
               contractId:row.contractId
             }
           })
         },
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
