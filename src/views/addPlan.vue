<template>
  <div style="width:100%;margin: auto;">
    <div class="header">新增计划</div>
    <el-row>
      <el-col :span="21" :offset="1">
                        <span style="color:#808080;font-size: 12px;line-height: 50px">
                            如果没有项目，请点击这里<a href="javascript:void(0);" @click="createProject" style="color:red"> 创建项目</a>
                        </span>
      </el-col>
    </el-row>
    <el-form ref="addPlanForm" :model="addPlanForm" :rules="addPlanRules">
      <el-row>
        <el-col :span="24">
          <el-form-item label="选择项目:" :label-width="labelWidth" prop="projectName">
            <el-input v-model="addPlanForm.projectName" @focus="getProject">
              <template slot="append">
                <el-button type="primary" icon="el-icon-caret-bottom" @click="getProject">
                </el-button>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" >
          <el-form-item label="合同工期:" :label-width="labelWidth" prop="startTime">
            <el-date-picker type="date" placeholder="请选择开始日期" v-model="addPlanForm.startTime"
                            format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" >
          <el-form-item label="合同工期:" :label-width="labelWidth" prop="startTime">
            <el-date-picker type="date" placeholder="请选择结束日期" v-model="addPlanForm.endTime"
                            format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" >
          <el-form-item label="工期去除周末:" :label-width="labelWidth" prop="weeksFlag">
            <el-select v-model="addPlanForm.weeksFlag">
              <el-option v-for="item in weekOptions" :key="item.value" :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" >
          <el-form-item label="计划说明:" :label-width="labelWidth" prop="processRemark">
            <el-input v-model="addPlanForm.processRemark" type="textarea"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" >
          <el-form-item label="上传附件:" :label-width="labelWidth" prop="processFiles">
            <input hidden v-model="addPlanForm.processFiles"/>

            <el-upload :action="otherUpload_url" :headers="uploadheaders" :on-remove="handleRemove"
                       :before-remove="beforeRemove" :before-upload="beforeUpload" :on-success="handleSuccess"
                       multiple :limit="10" :file-list="otherFileList" :on-preview="handlePreview"
                       :on-exceed="handleExceed">
              <el-button type="default">上传</el-button>
              <!--<div slot="tip" class="el-upload__tip">请上传(pdf,jpg,png格式文件)</div>-->
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" >
          <el-form-item label="上传项目计划(mpp格式):" :label-width="labelWidth" prop="processFiles">
            <input hidden v-model="addPlanForm.planprojectName"/>

            <el-upload :action="fileUpload_url"
                       :on-success="handleSuccess2">
              <el-button type="default">上传</el-button>
              <!--<div slot="tip" class="el-upload__tip">请上传(pdf,jpg,png格式文件)</div>-->
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" >
          <el-form-item :label-width="labelWidth">
            <el-button type="primary" @click="saveplan('addPlanForm')">保存</el-button>
            <!--<el-button type="success" plain @click="cancel">取消</el-button>-->
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <projectDialog :isShowProjectDialog="projectFlag"  @on-result-change = "changeShowProject" @selectNode="changeNode"></projectDialog>
  </div>
</template>

<script>
  import projectDialog from '../components/projectDialog'
  import local from '../utils/local'
  import api from '../utils/api'
  export default {
    name: "addPlan",
    components:{projectDialog},
    data(){
      return{
        token: '',
        labelWidth: '140px',
        addPlanForm: {
          "projectId": "",
          "projectName": '',
          "startTime": "", //开始时间
          "endTime": "", //结束日期
          "weeksFlag": 0, //工期包括周末  0：未包含,1：包含
          "processRemark": "", //计划说明
          "processFiles": "", //附件，按逗号隔开
          "planprojectName":"" //项目计划附件的名称
        },
        addPlanRules: {
          projectName: [
            { required: true, message: '请选择项目', },
          ],
          startTime: [
            { required: true, message: '请选择项目开始日期', trigger: 'blur' },
          ],
          endTime: [
            { required: true, message: '请选择项目结束日期', trigger: 'blur' },
          ],
          weeksFlag: [
            { required: true, message: '请选择工期是否包含周末', trigger: 'blur' },
          ],
        },
        otherUpload_url: process.env.VUE_APP_BASE_API+'/Upload/ProjectPlanFileUpload',
        fileUpload_url:'http://netserver.anmirrors.com/upload.ashx?type=UploadMpp',
        uploadheaders: {},
        otherFileList: [],
        projectData: [],
        currentRow: null,
        projectFlag: false,
        statusList: ['工程筹备', '勘察设计', '待勘察', '未开工', '在建', '验收', '竣工', '终止', '已停工'],
        weekOptions: [
          {
            label: '未包含',
            value: 0
          },
          {
            label: '包含',
            value: 1
          },
        ],
      }
    },
    created: function () {
      this.onLoad();
    },
    methods: {
      onLoad: function () {
        this.token=local.get('USERTOKEN');
        this.uploadheaders = {  //上传图片headers
          'Authorization': this.token
        };
      },
      handleRemove: function (file, filelist) { //删除成功后调用
        if (filelist.length > 1) {
          var str = '';
          filelist.forEach(function (item) {
            str += item.url + ',';
          });
          this.addPlanForm.processFiles = str;
        } else if (filelist.length == 1) {
          this.addPlanForm.processFiles = filelist[0].url;
        } else {
          this.addPlanForm.processFiles = '';
        }
        this.otherFileList = filelist;
      },
      beforeRemove: function (file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`);
      },
      beforeUpload: function (file) { //上传前设置
        var isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传文件大小不能超过 2MB!');
        }
        return isLt2M;
      },
      handleSuccess: function (res, file, fileList) { //上传成功调用
        //console.log(res);
        if (res.success) {
          this.$message.success('文件上传成功');
          if (this.addPlanForm.processFiles=='' ||this.addPlanForm.processFiles==null) {
            this.addPlanForm.processFiles = file.response.data;
          } else {
            this.addPlanForm.processFiles += ',' + file.response.data;
          }
          var model = {
            'name': file.name,
            'url': file.response.data
          };
          this.otherFileList.push(model);
        } else {
          this.$message.error('文件上传失败');
        }
        // console.log(this.addPlanModel);
        // console.log(this.otherFileList);
      },
      handlePreview: function (file) {//打开上传的文件
        if (file.status == 'success') {
          window.open(file.url);
        }
      },
      handleExceed: function (file, fileList) { //上传文件超出设置个数
        this.$message.warning(`当前限制选择只能上传 10 个文件!`);
      },
      saveplan: function (formName) {
        var that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var model = {
              "projectId": this.addPlanForm.projectId,
              "startTime": this.addPlanForm.startTime,
              "endTime": this.addPlanForm.endTime,
              "weeksFlag": this.addPlanForm.weeksFlag,
              "processRemark": this.addPlanForm.processRemark,
              "processFiles": this.addPlanForm.processFiles,
              "planprojectName":this.addPlanForm.planprojectName
            }
            //console.log(model);
            api.addPlan(model).then(res=>{
              if (res.data.success) {
                that.$message.success({
                  message: res.data.message,
                  onClose: s => {
                    this.$router.replace("/processManage");
                    that.$refs['addPlanForm'].resetFields();
                  }
                });
              } else {
                that.$message.error(res.data.message);
              }
            })
          } else {
            return false;
          }
        });
      },
      handleSuccess2: function (response, file, fileList) {
        // console.log(response);
        if(response.Code==1){
          this.addPlanForm.planprojectName=response.msg;
        }
      },
      getProject: function () { //获取项目列表
        this.projectFlag = true;
        // this.getProjectList();
      },
      createProject: function () {
        this.$router.replace('/addProject')
      },
      handleSelectChange: function (val) {
        this.currentRow = val;
      },

      changeShowProject:function (val) {
        this.projectFlag=val;
      },
      changeNode:function (val) {
        // this.addProgramForm.projectConstructionUnit=val.text;
        this.addPlanForm.projectName = val.projectName;
        this.addPlanForm.projectId = val.projectId;
        this.projectFlag = false;
      },
    }
  }
</script>

<style scoped>
  .el-row{
    padding-left: 15px;
    padding-right: 15px;
  }
</style>
