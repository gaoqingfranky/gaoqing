<template>
  <div style="width:100%;margin: auto;">
    <div class="header">职位管理</div>
    <el-row :gutter="20" class="center">
      <el-col :span="11">
        <div class="dd" style="border-bottom: 1px solid #ccc;">职务信息</div>
        <el-tree :data="menudata" node-key="id"  :props="defaultProps"
                 @node-click="handleNodeClick" default-expand-all :expand-on-click-node="false"></el-tree>
      </el-col>
      <el-col :span="13" >
        <div class="dd">对应员工</div>
        <el-collapse accordion >
          <el-collapse-item v-for="item in staffTableData">
            <template slot="title">
              <span style="padding-left: 10px">{{item.userName}}</span>
            </template>
            <div>性别： {{item.userSex}}</div>
            <div>部门： {{item.depName}}</div>
            <div>职务：{{item.postName}}</div>
            <div>手机：{{item.userPhone}}</div>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>
    <div class="main-foot" style="padding: 15px">
      <el-button type="primary" icon="el-icon-plus" @click="addNode">添加职位</el-button>
      <el-button type="success" icon="el-icon-circle-plus" @click="editNode">编辑职位</el-button>
    </div>

    <!--添加职位/修改-->
    <el-dialog :title="title" :visible.sync="postFlag" :width="dialogWidth">
      <el-form ref="addPostForm" :model="addPostForm" :rules="addPostRules">
        <el-form-item label="职位名称:" :label-width="labelWidth" prop="postName">
          <el-input size="medium" v-model="addPostForm.postName"></el-input>
        </el-form-item>
        <el-form-item label="描述:" :label-width="labelWidth" prop="postDesc">
          <el-input size="medium" v-model="addPostForm.postDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: right">
        <el-button type="primary" @click="savePost('addPostForm')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import api from '../utils/api'
    export default {
        name: "post",
      data(){
          return{
            menudata:[],
            defaultProps:{
              children: 'children',
              label: 'label'
            },
            staffTableData:[],
            currentNode:null,
            dialogWidth:'',
            labelWidth:'100px',
            title:'',
            postFlag:false,
            addPostForm:{
              postName:'',
              postDesc:''
            },
            addPostRules:{
              postName: [
                {required: true, message: '请输入职位名称', trigger: 'blur'}
              ]
            },
          }
      },
      created(){
         this.onLoad();
      },
      mounted(){
          this.setDialogWidth();
      },
      methods:{
          onLoad:function () {
            this.getpostlist();
            //获取员工列表
            var userModel={
              "userPostId":"",
              "page":1,
              "pageSize":1000
            };
            this.getUserList(userModel);
          },
        getpostlist:function(){ //职务列表
           var that=this;
          var param={ "page": 1, "pageSize": 1000 };
          var arr=[];
           api.getPostList(param).then(res=>{
             if(res.data.success){
               arr = res.data.data.list;
               var temp;
               if (arr != null && arr != '' && arr.length > 0) {
                 arr.forEach(function (item, index) {
                   item.label = item.postName;
                   //item.value=item.postId;
                   item.childern = []
                 });
                 that.menudata = arr;
               }
             }
           })
        },
        getUserList:function(userModel){ //员工列表
          var that=this;
          api.getStaffList(userModel).then(res=>{
            //console.log(res);
            if(res.data.success){
              // that.totalCount=res.data.data.totalCount;
              // that.totalPage=res.data.data.totalPage;
              if(res.data.data.list.length!=null && res.data.data.list.length>0){
                res.data.data.list.forEach(function (item) {
                  if(item.userSex=='1'){
                    item.userSex='男';
                  }
                  if(item.userSex=='0'){
                    item.userSex='女'
                  }
                })
                that.staffTableData=res.data.data.list;
              }else{
                that.staffTableData=[];
              }

            }else{
              that.$message.error(res.data.message);
              that.staffTableData=[];
            }
          })
        },
        handleNodeClick:function (data) {
          this.currentNode = data;
          var model={
            "userPostId":data.postId,
            "page":1,
            "pageSize":1000
          }
          this.getUserList(model);
        },
        addNode:function () { //添加职务
          this.postFlag=true;
          this.title='添加职位';
          this.addPostForm={
            postName:'',
            postDesc:''
          };
        },
        editNode:function () {//编辑职务
          if(this.currentNode==null){
            this.$message({
              message: '请选择节点',
              type: 'error',
              duration: 1500
            });
          }else{
            this.postFlag=true;
            this.title='编辑职位'
            this.addPostForm=this.currentNode;
          }
        },
        savePost:function(formName){
            var that=this;
          this.$refs[formName].validate((valid) => {
            if (valid) {
              if(this.title=='添加职位'){ //添加
                 api.addPost(this.addPostForm).then(res=>{
                   if(res.data.success){
                     that.$message({
                       message: '添加成功',
                       type: 'success'
                     });
                     setTimeout(function () {
                       that.onLoad();
                       that.postFlag=false;
                     }, 1000);
                   } else {
                     that.$message.error(res.data.message);
                   }
                 })
              }else{ //编辑
                api.updatePost(this.addPostForm).then(res=>{
                  if(res.data.success){
                    that.$message({
                      message: '编辑成功',
                      type: 'success'
                    });
                    setTimeout(function () {
                      that.onLoad();
                      that.postFlag=false;
                    }, 1000);
                  } else {
                    that.$message.error(res.data.message);
                  }
                })
              }
            } else {
              return false;
            }
          });

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
  .el-collapse-item__content div{
    text-align: left;
    padding-left: 25px;
    line-height: 30px;
  }
</style>
