<template>
  <div class="w-content" style="width:98%;margin: auto;">
    <div class="header">企业设置</div>
    <el-col :span="22">
      <el-form ref="companyInfoForm" :model="companyInfoForm" label-width="120px" :rules="companyInfoRules">
        <el-form-item label="企业号">
          <span>{{companyInfoForm.companyNo}}</span>
        </el-form-item>
        <el-form-item label="企业logo">
          <el-upload
            class="avatar-uploader"
            :action="uploadLogo_url"
            :headers="uploadheaders"
            :show-file-list="false"
            :on-success="handleSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="companyInfoForm.companyLogoUrl" :src="companyInfoForm.companyLogoUrl"
                 class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="企业名称" prop="companyName">
          <el-input v-model="companyInfoForm.companyName"></el-input>
        </el-form-item>
        <el-form-item label="企业简称" prop="companyMinName">
          <el-input v-model="companyInfoForm.companyMinName"></el-input>
        </el-form-item>
        <el-form-item label="企业电话" prop="companyPhone">
          <el-input v-model="companyInfoForm.companyPhone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save('companyInfoForm')">保存</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>

<script>
  import {GETTOKEN} from '../utils/token'
  import api from '../utils/api'

  export default {
    name: "company",
    data() {
      return {
        token: '',
        companyInfoForm: {
          companyNo: '',
          companyLogoUrl: '',
          companyName: '',
          companyMinName: '',
          companyPhone: ''

        },
        companyInfoRules: {
          companyName: [
            {required: true, message: '请输入企业名称', trigger: 'blur'},
            {min: 1, max: 30, message: '字数限制30字符', trigger: 'blur'}
          ],
          companyMinName: [
            {required: false, message: '', trigger: 'blur'},
            {min: 1, max: 30, message: '字数限制30字符', trigger: 'blur'}
          ],
          companyPhone: [
            {required: true, message: '请输入企业电话', trigger: 'blur'},
            // {required: true, validator: checkPhone, trigger: 'blur' }
          ]
        },
        uploadLogo_url: process.env.VUE_APP_BASE_API + '/Upload/CompanyLogoPic',
        uploadheaders: {},

      }
    },
    created() {
      this.onLoad();
    },
    methods: {
      onLoad: function () {
        this.token = GETTOKEN();
        this.uploadheaders = {
          'Authorization': this.token
        };
        this.getCompanyInfo();
      },
      getCompanyInfo: function () {
        var that = this;
        api.getCompanyInfo().then(res => {
          if (res.data.success) {
            that.companyInfoForm = res.data.data
          }
        })
      },
      beforeAvatarUpload: function () {

      },
      handleSuccess: function (res) {
        if (res.success) {
          this.$message({
            message: res.message,
            type: 'success'
          });
          this.companyInfoForm.companyLogoUrl = res.data;
        } else {
          this.$message.error(res.message);
        }
      },
      save: function (formName) {
        var that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            api.updateCompanyInfo(this.companyInfoForm).then(res => {
              //console.log(res);
              if (res.data.success) {
                that.$message({
                  message: res.data.message,
                  type: 'success'
                });
                that.onLoad();
              } else {
                that.$message.error(res.data.message);
              }
            }, err => {
              console.log(err)
            })
          } else {
            return false;
          }
        });
      }
    }

  }
</script>

<style scoped>

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 128px;
    height: 128px;
    line-height: 128px;
    text-align: center;
    border: 1px dashed #d9d9d9;
  }

  .avatar {
    width: 128px;
    height: 128px;
    display: block;
  }
</style>
