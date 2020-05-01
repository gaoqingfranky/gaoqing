<template>
  <div style="width:100%;margin: auto;">
    <div class="header">组织结构</div>
    <el-row :gutter="20" class="center">
       <el-col :span="11">
         <div class="dd" >部门信息</div>
         <el-tree :data="menudata" node-key="id" :render-content="renderContent" :props="defaultProps"
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
      <el-button type="success" size="small" @click="addNode">添加部门</el-button>
      <!--<el-button type="primary" icon="el-icon-share">企业二维码</el-button>-->
      <el-button type="primary" size="small" @click="editNode">编辑部门</el-button>
      <el-button type="danger"  size="small" @click="removeNode">删除部门</el-button>
      <el-button type="warning" size="small" @click="addStaff">添加员工</el-button>
    </div>
    <!--添加修改节点-->
    <el-dialog :title="nodetitle" :visible.sync="nodeFlag" :width="dialogWidth">
      <input v-model="addFlag" hidden></input>
      <el-form ref="aeNodeForm" :model="aeNodeForm" :rules="aeNodeRules">
        <el-row v-if="addFlag==0">
          <el-col>
            <el-form-item label="上级部门:" :label-width="labelWidth">
              <el-input size="medium" v-model="aeNodeForm.uperUnit" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="部门名称:" :label-width="labelWidth" prop="deptName">
              <el-input size="medium" v-model="aeNodeForm.deptName" placeholder="请输入部门名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="部门描述:" :label-width="labelWidth" prop="deptmail">
              <el-input v-model="aeNodeForm.deptmail" type="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: right">
        <el-button type="primary" @click="saveNode('aeNodeForm')">确定</el-button>
        <el-button @click="nodeFlag = false">取 消</el-button>
      </div>
    </el-dialog>
    <!--添加员工-->
    <el-dialog title="添加员工" :visible.sync="staffFlag" :width="dialogWidth" >
      <el-form ref="addStaffForm" :model="addStaffForm" :rules="addStaffRules">
        <el-form-item label="手机号码:" :label-width="labelWidth" prop="userPhone">
          <el-input size="medium" v-model="addStaffForm.userPhone"></el-input>
        </el-form-item>
        <el-form-item label="姓名:" :label-width="labelWidth" prop="userName">
          <el-input size="medium" v-model="addStaffForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="性别:" :label-width="labelWidth" prop="userSex">
          <el-radio-group v-model="addStaffForm.userSex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="密码:" :label-width="labelWidth" prop="userPassword">
          <el-input size="medium" v-model="addStaffForm.userPassword" show-password></el-input>
        </el-form-item>
        <el-form-item label="部门:" :label-width="labelWidth" prop="userDeptName">
          <el-input size="medium" v-model="addStaffForm.userDeptName" @focus="selectUnit"></el-input>
        </el-form-item>
        <el-form-item label="职务:" :label-width="labelWidth" prop="userPostId">
          <el-select v-model="addStaffForm.userPostId" placeholder="请选择职务">
            <el-option
              v-for="item in postOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Email:" :label-width="labelWidth" prop="userEmail">
          <el-input size="medium" v-model="addStaffForm.userEmail"></el-input>
        </el-form-item>
        <el-form-item label="固定电话:" :label-width="labelWidth" prop="userfixPhone">
          <el-input size="medium" v-model="addStaffForm.userfixPhone"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: right">
        <el-button type="primary" @click="submitStaff('addStaffForm')">保存</el-button>
        <el-button @click="staffFlag = false">取 消</el-button>
      </div>
    </el-dialog>
    <deptdialog :isShowDialog="showDeptFlag"  @on-result-change = "changeShowDept" @selectNode="changeNode"></deptdialog>
  </div>

</template>

<script>
  import local from '../utils/local'
  import api from '../utils/api'
  import deptdialog from '../components/DeptDialog'
    export default {
        name: "organize",
      components:{deptdialog},
      data(){
          return{
            companyName:'',
            menudata: [{
              id: null,
              label: '',
              text: '',
              icon: 'el-icon-s-home',
              parentOrganizationID: null,
              organizationId: null,
              children: [],
            }],
            menudata2: [],
            defaultProps: {
              children: 'children',
              label: 'label'
            },
            currentNode:null,
            staffTableData:[],
            nodeFlag:false,
            addFlag:'',
            nodetitle:'',
            aeNodeForm:{},
            aeNodeRules:{
              deptName: [
                {required: true, message: '请输入部门名称', trigger: 'blur'}
              ]
            },
            dialogWidth:'',
            labelWidth:'120px',
            staffFlag:false,
            addStaffForm:{
              userPhone: '',
              userName: '',
              userSex: 1,
              userPassword: '',
              userDepId: '',
              userDeptName:'',
              userPostId: '',
              userPostName:'',
              userEmail: '',
              userfixPhone: ''
            },
            addStaffRules:{
              userPhone: [
                {required: true, message: '请输入手机号码', trigger: 'blur'}
              ],
              userName: [
                {required: true, message: '请输入员工姓名', trigger: 'blur'}
              ],
              userPassword: [
                {required: true, message: '请输入密码', trigger: 'blur'}
              ],
              userDeptName: [
                {required: true, message: '请选择部门',}
              ]
            },
            postOptions:[],
            unitFlag:false,
            showDeptFlag:false,
          }
      },
      created(){
        this.onLoad();
      },
      mounted(){
        this.setDialogWidth();
      },
      methods:{
          onLoad:function(){
            this.companyName=local.get('companyName');
            this.menudata[0].label=this.companyName;
            this.menudata[0].text=this.companyName;
            this.getorganize();
            //获取员工列表
            var userModel={
              "userPhone":"",
              "userName":"",
              "userAccount":"",
              "userDepId":"",
              "userPostId":"",
              "page":1,
              "pageSize":1000
            };
            this.getUserList(userModel);
            this.getPostList();
          },
        getorganize:function(){
            var that=this;
            var arr=[];
            api.getOrganiztion().then(res=>{
              if(res.data.success){
                arr = res.data.data;
                var temp;
                if (arr != null && arr != '' && arr.length > 0) {
                  arr.forEach(function (item, index) {
                    if (item.text == '董事长室' && index != 0) {
                      temp = arr[0];
                      arr[0] = arr[index];
                      arr[index] = temp;
                    }
                    if (item.text == '总经理室' && index != 1) {
                      temp = arr[1];
                      arr[1] = arr[index];
                      arr[index] = temp;
                    }

                  });
                  arr.forEach(function (item) {
                    if(item.text == '董事长室' || item.text == '总经理室'){
                       item.icon='el-icon-s-custom';
                    }else{
                      item.icon = 'el-icon-s-platform';
                    }
                  })
                  that.menudata[0].children = arr;
                  that.menudata2 = arr;
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
        handleNodeClick(data) { //节点点击事件
          this.currentNode = data;
          var userModel={
            "userPhone":"",
            "userName":"",
            "userAccount":"",
            "userDepId":data.organizationId,
            "userPostId":"",
            "page":1,
            "pageSize":1000
          };
          this.getUserList(userModel);
        },
        renderContent: function (h, {node, data, store}) {
          var createElement = arguments[0];
          var level = arguments[1].node.level;
          if (level == 1 || level==2) {
            return createElement('span', [
              createElement('i', {attrs: {class: data.icon}}),
              createElement('span', "     "),
              createElement('span', arguments[1].node.label)
            ]);
          } else {
            return createElement('span', [
              createElement('i', {attrs: {class: 'el-icon-s-platform'}}),
              createElement('span', "     "),
              createElement('span', arguments[1].node.label)
            ]);
          }

        },
        getPostList:function(){ //职务列表
          var model={
            "page":1,
            "pageSize":10000
          };
          var that=this;
          var arr=[];
          api.getPostList(model).then(res=>{
            if(res.data.success){
              var json=res.data.data.list;
              if(json.length>0){
                json.forEach(function (item) {
                  var postobj={
                    label:item.postName,
                    value:item.postId
                  };
                  arr.push(postobj);
                })
                that.postOptions=arr;
              }
            }
          })
        },
        addNode:function () { //添加部门
          if (this.currentNode == null) {
            this.$message({
              message: '请选择父节点',
              type: 'error',
              duration: 1500
            });
          } else {
            this.nodeFlag = true;
            this.addFlag = 0;
            this.nodetitle = '添加子部门';
            this.aeNodeForm.uperUnit = this.currentNode.text;
            this.aeNodeForm.parentOrganizationID = this.currentNode.organizationId;
          }
        },
        editNode:function () {//编辑部门
          if (this.currentNode == null) {
            this.$message({
              message: '请选择节点',
              type: 'error',
              duration: 1500
            });
          } else {
            if (this.currentNode.text == this.companyName) {
              this.$message({
                message: '公司名称不能编辑',
                type: 'error',
                duration: 1500
              });
            } else {
              this.nodeFlag = true;
              this.addFlag = 1;
              this.nodetitle = '编辑节点';
              this.aeNodeForm.deptName = this.currentNode.text;
              this.aeNodeForm.parentOrganizationID = this.currentNode.parentOrganizationID;
              this.aeNodeForm.organizationId = this.currentNode.organizationId;
              this.aeNodeForm.deptmail = this.currentNode.organizationDesc;
            }
          }
        },
        removeNode:function () {//删除部门
          var that=this;
          if (this.currentNode == null) {
            this.$message({
              message: '请选择节点',
              type: 'error',
              duration: 1500
            });
          } else {
            if (this.currentNode.text == this.companyName) {
              this.$message({
                message: '公司名称不能删除',
                type: 'error',
                duration: 1500
              });
            } else {
              var text = "确认要删除" + "  " + this.currentNode.text + "  " + "这个节点吗?";
              this.$confirm(text, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
              }).then(() => {
                var model = {
                  organizationId: this.currentNode.organizationId
                };
                api.removeNode(model).then(res=>{
                  if (res.data.success) {
                    that.$message({
                      type: 'success',
                      message: '删除成功!',
                      duration: 500
                    });
                    setTimeout(function () {
                      that.onLoad();
                      that.currentNode=null;
                    }, 1000);
                  } else {
                    that.$message({
                      type: 'error',
                      message: '删除失败!',
                      duration: 1000
                    });
                  }
                })
              }).catch(() => {
                that.$message({
                  type: 'info',
                  message: '已取消删除',
                  duration: 1000
                });
              });
            }
          }
        },
        addStaff:function () {//添加员工
          this.staffFlag = true;
        },
        saveNode:function(formName){
          if (this.addFlag == 0) {//添加节点
            var that = this;
            this.$refs[formName].validate((valid) => {
              if (valid) {
                var model = {
                  organizationName: this.aeNodeForm.deptName,
                  parentOrganizationID: this.aeNodeForm.parentOrganizationID,
                  organizationDesc: this.aeNodeForm.deptmail
                };
               api.addNode(model).then(res=>{
                  if (res.data.success) {
                    that.$message({
                      message: '添加成功',
                      type: 'success',
                      duration:500
                    });
                    setTimeout(function () {
                      that.onLoad();
                      that.nodeFlag=false;
                    }, 1000);
                  } else {
                    that.$message.error(res.data.message);
                  }
                })

              } else {
                return false;
              }
            });
          }
          if (this.addFlag == 1) { //编辑节点
            var that = this;
            this.$refs[formName].validate((valid) => {
              if (valid) {
                var model = {
                  organizationName: this.aeNodeForm.deptName,
                  parentOrganizationID: this.aeNodeForm.parentOrganizationID,
                  organizationDesc: this.aeNodeForm.deptmail,
                  organizationId: this.aeNodeForm.organizationId
                };
                api.editNode(model).then(res=>{
                  if (res.data.success) {
                    that.$message({
                      message: '编辑成功',
                      type: 'success'
                    });
                    setTimeout(function () {
                      that.onLoad();
                      that.nodeFlag=false;
                    }, 1000);
                  } else {
                    that.$message.error(res.data.message);
                  }
                })
              } else {
                return false;
              }
            });
          }
        },
        selectUnit:function(){ //选择部门
          this.showDeptFlag=true;
        },
        submitStaff:function(formName){ //添加员工
          var that = this;
          this.$refs[formName].validate((valid) => {
            if (valid) {

              api.addStaff(this.addStaffForm).then(res=>{
                if (res.data.success) {
                  that.$message({
                    message: '添加成功',
                    type: 'success',
                    duration:500
                  });
                  setTimeout(function () {
                    that.staffFlag = false;
                    that.onLoad();
                  }, 1000);
                } else {
                  that.$message.error(res.data.message);
                }
              })
            } else {
              return false;
            }
          });
        },
        changeShowDept:function(val){
            this.showDeptFlag=val;
        },
        changeNode:function(val){
            //console.log(val);
          this.addStaffForm.userDepId=val.organizationId;
          this.addStaffForm.userDeptName=val.organizationName;
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

<style  scoped>
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
