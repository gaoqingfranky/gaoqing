<template>
  <div id="mainApp" class="wrapper">
    <!-- Navbar -->
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
      <!-- Left navbar links -->
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" data-widget="pushmenu" href="#"><i class="fas fa-bars"></i></a>
        </li>
        <li class="nav-item d-none d-sm-inline-block">
          <a href="#" class="nav-link"> 安城智慧建筑系统</a>
        </li>
        <!--<li class="nav-item d-none d-sm-inline-block">-->
        <!--<a href="#" class="nav-link">Contact</a>-->
        <!--</li>-->
      </ul>
      <!-- SEARCH FORM -->
      <!--<form class="form-inline ml-3">-->
      <!--<div class="input-group input-group-sm">-->
      <!--<input class="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search">-->
      <!--<div class="input-group-append">-->
      <!--<button class="btn btn-navbar" type="submit">-->
      <!--<i class="fas fa-search"></i>-->
      <!--</button>-->
      <!--</div>-->
      <!--</div>-->
      <!--</form>-->

      <!-- Right navbar links -->
      <ul class="navbar-nav ml-auto">
        <!-- Notifications Dropdown Menu -->
        <li class="nav-item dropdown user user-menu ">
          <a class="nav-link" data-toggle="dropdown" href="#" style="padding:0">
            <div class="user-panel mt-1 pb-1 mb-1 d-flex">
              <div class="image">
                <img v-bind:src="userPic" class="img-circle elevation-2" alt="User Image"/>
              </div>
              <div class="info">
                <a href="#" class="d-block">{{userinfo.userName}}</a>
              </div>
            </div>
          </a>
          <ul class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <li class="user-header">
              <img v-bind:src="userPic" class="img-circle" alt="User Image"/>
            </li>
            <li class="user-footer">
              <div class="fa-pull-left">
                <a href="javascript:void(0)" class="btn btn-default btn-flat"
                >个人设置</a>
              </div>
              <div class="fa-pull-right">
                <a href="javascript:void(0)" @click="logout" class="btn btn-default btn-flat">退
                  出</a>
              </div>
            </li>
          </ul>
        </li>
        <!--<li class="nav-item">-->
        <!--<a class="nav-link" data-widget="control-sidebar" data-slide="true" href="#"><i-->
        <!--class="fas fa-th-large"></i></a>-->
        <!--</li>-->
      </ul>
    </nav>
    <!-- /.navbar -->

    <!-- Main Sidebar Container -->
    <aside class="main-sidebar sidebar-dark-primary elevation-4">

      <!-- Sidebar -->
      <div class="sidebar">
        <!-- Sidebar user panel (optional) -->
        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
          <div class="image">
            <img :src="userPic" class="img-circle elevation-2" alt="User Image">
          </div>
          <div class="info">
            <a href="#" class="d-block">{{userinfo.userName}}</a>
          </div>
        </div>

        <!-- Sidebar Menu -->
        <nav class="mt-2">
          <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <li class="nav-item">
              <router-link to="/deskTable" class="nav-link">
                <i class="nav-icon fas fa-th"></i>
                <p>
                  项目工作台
                </p>
              </router-link>
            </li>
            <li class="nav-item has-treeview">
              <a href="#" class="nav-link">
                <i class="nav-icon fas fa-desktop"></i>
                <p>
                  系统设置
                  <i class="fas fa-angle-left right"></i>
                </p>
              </a>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <router-link to="/companySetting" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>
                      企业设置
                    </p>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/organize" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>
                      组织结构
                    </p>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/post" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>
                      职位管理
                    </p>
                  </router-link>
                </li>
              </ul>
            </li>
            <li class="nav-item has-treeview">
              <a href="#" class="nav-link">
                <i class="nav-icon fas fa-bars"></i>
                <p>
                  项目看板
                  <i class="right fas fa-angle-left"></i>
                </p>
              </a>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <router-link to="/addProject" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>
                      新增项目
                    </p>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/projectManage" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>
                      项目管控平台
                    </p>
                  </router-link>
                </li>
              </ul>
            </li>
            <li class="nav-item has-treeview">
              <a href="#" class="nav-link">
                <i class="nav-icon fas fa-edit"></i>
                <p>
                  合同管理
                  <i class="fas fa-angle-left right"></i>
                </p>
              </a>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <router-link to="/addContract" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>
                      新增合同
                    </p>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/contractManage" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>
                      合同列表
                    </p>
                  </router-link>
                </li>
              </ul>
            </li>
            <li class="nav-item has-treeview">
              <a href="#" class="nav-link">
                <i class="nav-icon fas fa-envelope-open"></i>
                <p>
                  变更签证
                  <i class="fas fa-angle-left right"></i>
                </p>
              </a>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <router-link to="/addVisaChange" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>
                      新增变更签证
                    </p>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/visaChangeManage" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>
                      变更签证管理
                    </p>
                  </router-link>
                </li>
              </ul>
            </li>
            <li class="nav-item has-treeview">
              <a href="#" class="nav-link">
                <i class="nav-icon fas fa-chart-line"></i>
                <p>
                  进度管理
                  <i class="fas fa-angle-left right"></i>
                </p>
              </a>
              <ul class="nav nav-treeview">
                <li class="nav-item" >
                  <router-link to="/addPlan" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>
                      新增计划
                    </p>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/planManage" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>
                      计划管理
                    </p>
                  </router-link>
                </li>
              </ul>
            </li>
            <li class="nav-item has-treeview">
              <a href="#" class="nav-link">
                <i class="nav-icon fas fa fa-envelope"></i>
                <p>
                  投拓管理
                  <i class="fas fa-angle-left right"></i>
                </p>
              </a>
              <ul class="nav nav-treeview">
                <li class="nav-item" >
                  <router-link to="/addTreadTask" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>
                      添加踩盘
                    </p>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/treadTaskManage" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>
                      踩盘任务
                    </p>
                  </router-link>
                </li>
              </ul>
            </li>
            <li class="nav-item has-treeview">
              <a href="#" class="nav-link">
                <i class="nav-icon fas fa fa-user"></i>
                <p>
                  劳工管理
                  <i class="fas fa-angle-left right"></i>
                </p>
              </a>
              <ul class="nav nav-treeview">
                <li class="nav-item" >
                  <router-link to="/workerAdd" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>
                      添加劳工
                    </p>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/workerManage" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>
                      劳工列表
                    </p>
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        <!-- /.sidebar-menu -->
      </div>
      <!-- /.sidebar -->
    </aside>

    <div class="content-wrapper">
      <router-view></router-view>
    </div>
    <aside class="control-sidebar control-sidebar-dark">
      <!-- Control sidebar content goes here -->
      <div class="p-3">
        <h5>Title</h5>
        <p>Sidebar content</p>
      </div>
    </aside>

    <!-- Main Footer -->
    <footer class="main-footer">
      <!-- To the right -->
      <div class="float-right d-none d-sm-inline">
        版本号1.0.0
      </div>
      <!-- Default to the left -->
      <div style="text-align: center">安城智镜智慧建筑管理系统</div>
    </footer>

    <el-dialog title="创建企业" :visible.sync="createCompanyFlag" :width="dialogWidth" :show-close="false">
      <el-form :model="companyModel" ref="companyModel" label-width="120px" :rules="companyRules">
        <el-row :gutter="10">
          <el-col>
            <el-form-item label="企业名称:" prop="companyName">
              <el-input v-model="companyModel.companyName"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="企业简称:" prop="companyMinName">
              <el-input v-model="companyModel.companyMinName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: right">
        <el-button type="primary" @click="createCompany('companyModel')">立即创建</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {GETTOKEN} from '../utils/token'
  import api from '../utils/api'
  import local from '../utils/local'

  export default {
    name: "mainApp",
    data() {
      return {
        token: '',
        userinfo: {},
        userPic: '',
        createCompanyFlag: false,
        companyModel: {
          companyName: '',
          companyMinName: ''
        },
        companyRules: {
          companyName:[
            {required: true, message: '请输入企业名称', trigger: 'blur'},
            { min: 1, max: 30, message: '字数限制30字符', trigger: 'blur' }
          ],
          companyMinName:[
            {required: false, message: '', trigger: 'blur'},
            { min: 1, max: 30, message: '字数限制30字符', trigger: 'blur' }
          ]
        },
        dialogWidth: '0'
      }
    },
    created() {

      this.onLoad();
    },
    mounted(){
    },
    methods: {
      onLoad: function () {
        this.token = GETTOKEN();
        if(this.token==null || this.token=='' || this.token==undefined){
          window.location.href='login';
        }else {
          this.getUserinfo();
          this.setDialogWidth();
        }
      },
      getUserinfo: function () {
        var that = this;
        that.userPic = require('../../static/images/user2-160x160.jpg');

        // api.getUserinfo().then(res => {
        //   //console.log(res);
        //   if (res.data.success) {
        //     that.userinfo = res.data.data;
        //     if (res.data.data.userLogo != null && res.data.data.userLogo != '') {
        //       that.userPic = require(res.data.data.userLogo);
        //     } else {
        //       that.userPic = require('../../static/images/user2-160x160.jpg');
        //     }
        //     if (res.data.data.userCompanyId == null || res.data.data.userCompanyId == '') {
        //       that.createCompanyFlag=true;
        //     } else {
        //       local.set('companyName',res.data.data.companyName)
        //     }
        //
        //   }
        // })
      },
      createCompany: function (formName) {
        var that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            api.createCompany(this.companyModel).then(res => {
              if (res.data.success) {
                that.$message({
                  message: res.data.message,
                  type: 'success'
                });
                that.onLoad();
              }else{
                that.$message.error(res.data.message);
              }
            })
          } else {
            return false;
          }
        });
      },
      logout:function(){
        this.$router.replace('/login');
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
  .nav-sidebar .nav-treeview{
    padding:10px
  }
</style>
