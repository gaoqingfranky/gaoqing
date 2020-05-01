<template>
  <div style="width:100%;margin: auto;">
    <div class="header">变更签证管理</div>
    <el-row class="center">
      <el-col :span="24">
        <el-collapse accordion>
          <el-collapse-item v-for="item in visaList">
            <template slot="title">
              <span style="padding-left: 10px">{{item.visaChangeName}}</span>
            </template>
            <div><span class="leftcell">变更编号：</span> <span class="rightcell">{{item.visaChangeNo}}</span></div>
            <div><span class="leftcell">项目名称：</span> <span class="rightcell">{{item.projectName}}</span></div>
            <div><span class="leftcell">合同名称：</span> <span class="rightcell">{{item.contractName}}</span></div>
            <div><span class="leftcell">变更类型：</span> <span class="rightcell">{{item.visachangeTypeName}}</span></div>
            <div><span class="leftcell">变更金额：</span> <span class="rightcell">{{item.visachangeMoney}}</span></div>
            <div><span class="leftcell">变更日期：</span> <span class="rightcell">{{item.visachangeTime}}</span></div>
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
    name: "visaChangeManage",
    data() {
      return {
        visaList: [],
        searchData: {
          page: 1,
          pageSize: 1000,
          totalcount: 0,
          visachangeType: '-1',
          visachangeConfirm: '-1',
          projectId: '',
          contractId: ''
        },
      }
    },
    created() {
      this.onLoad();
    },
    methods: {
      onLoad: function () {
        var that = this;
        api.getVisaList(this.searchData).then(res => {
          if (res.data.success) {
            res.data.data.list.forEach(function (item, index) {
              if (item.visachangeType == 0) {
                item.visachangeTypeName = '设计变更';
              }
              if (item.visachangeType == 1) {
                item.visachangeTypeName = '法令变更';
              }
              if (item.visachangeType == 2) {
                item.visachangeTypeName = '工程变更';
              }
              if (item.visachangeType == 3) {
                item.visachangeTypeName = '工程洽商';
              }
              if (item.visachangeType == 4) {
                item.visachangeTypeName = '其他';
              }
              item.visachangeTime = item.visachangeTime.split('T')[0];
            })
            that.visaList = res.data.data.list;
            that.searchData.totalcount = res.data.data.totalCount;
          }
          ;
        })
      },
      check: function (row, type) {
        this.$router.replace({
          path:'/editVisaChange',
          name:'editVisaChange',
          params:{
            type:type,
            visaChangeId:row.visaChangeId
          }
        })
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
