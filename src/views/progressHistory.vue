<template>
  <div style="width:100%;margin: auto;">
    <div class="header">填报记录</div>
    <el-row>
      <el-col :span="21" :offset="1">
        <el-button type="text"  @click="callback">返回</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-collapse accordion>
          <el-collapse-item v-for="item in tableData">
            <template slot="title">
              <span style="padding-left: 10px">{{item.processFillInName}}</span>
            </template>
            <div><span class="leftcell">填报工作量：</span> <span class="rightcell">{{item.workLoadFillIn}}</span></div>
            <div><span class="leftcell">填报说明：</span> <span class="rightcell">{{item.processFillInRemark}}</span></div>
            <div><span class="leftcell">填报日期：</span> <span class="rightcell">{{item.createTime}}</span></div>
            <div style="height: 50px;padding-left: 50px;border:none">
              <el-button type="text" plain @click="handleClick(item,0)">详情</el-button>
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
        name: "progressHistory",
      data(){
        return{
          token:'',
          VisaListForm: {
            contractId: ''
          },
          VisaListRules: {},
          labelWidth: '100px',
          programOptions: [],
          contractOptions: [],
          searchData: {
            page: 1,
            pageSize: 10,
            totalcount: 0,
            processonPlanId: '' //项目计划ID
          },
          tableData: []
        }
      },
      created: function () {
        this.onLoad();
      },
      methods: {
        GetQueryString(name) {
          var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
          var r = window.location.search.substr(1).match(reg);
          if (r != null) {
            return unescape(r[2]);
          }
          return null;
        },
        onLoad: function () {
          var that=this;
          this.searchData.processonPlanId=this.$route.params.processonPlanId;
          api.getProcessApplyList(this.searchData).then(res=>{
            //console.log(res);
            if (res.data.success) {
              that.tableData = res.data.data.list;
              that.searchData.totalcount = res.data.data.totalCount;
            };
          })
        },
        handleClick(model, type) {
          this.$router.push({
            path:'/progressApply',
            name:'progressApply',
            params:{
              type:type,
              processFillInId:model.processFillInId
            }
          })
          // window.location.href = 'addProcessFillIn.html?type=' + type + '&processFillInId=' + model.processFillInId;
        },
        handleCurrentChange(page) { //页面跳转
          this.searchData.page = page;
          this.onLoad();
        },
        callback(){
          this.$router.replace('/planDetails');
          // window.history.go(-1);
        }
      }
    }
</script>

<style scoped>
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

</style>
