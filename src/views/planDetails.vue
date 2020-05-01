<template>
  <div style="width:100%;margin: auto;">
    <div class="header">计划详情</div>
    <section class="content-header">
      <el-col :span="5">
        <div style="width:80px;height:40px;text-align: center;border:1px solid #ddd;background-color: #8C9DFE;font-size: 16px;line-height: 40px;color:white;margin-top: -10px">
          工期进度
        </div>
      </el-col>
      <el-col :span="16" :offset="3" style="text-align: right;">
        <el-button type="text" @click="handleProgress"> 添加进度</el-button>
        <el-button type="text" @click="comBack">返回</el-button>
      </el-col>
    </section>
    <div style="width:100%;height: 5px;margin-top: 20px"></div>
    <div style="width:100%;margin: auto;margin-top: 20px;height: 100px;clear:both">
      <table style="width:60%;height:100px;float:left;display: block;font-size: 12px;margin-left: 10px">
        <tr>
          <td rowspan="3" style="width:80px;text-align: right;">
            <img src="../../static/images/project-default.jpg" style="height:80px;width:80px;margin-right: 10px"/>
          </td>
          <td style="font-size: 14px;font-weight: bolder;line-height: 30px">
            {{currentPlanModel.projectName}}
          </td>
        </tr>
        <tr>
          <td style="padding-top:-10px ">计划开始时间:{{currentPlanModel.startTime}}</td>
        </tr>
        <tr>
          <td style="padding-top:-10px ">计划结束时间:{{currentPlanModel.endTime}}</td>
        </tr>
      </table>
      <div style="width:30%;height:80px;float:right;text-align: right;margin-right: 20px">
        <table style="width:100%;height: 100%;text-align: right;">
          <tr>
            <td>
              <el-progress type="circle" :percentage="currentPlanModel.totalProcess"
                           :width="80"></el-progress>
            </td>
          </tr>
          <tr>
            <td>
              <el-button type="primary" size="mini" @click="editPlan">编辑计划</el-button>
            </td>
          </tr>
        </table>

      </div>
    </div>
    <div style="width:100%;height: 20px;background-color: #F8F8F8;margin-top: 10px;margin-bottom: 10px"></div>
    <el-row class="center">
      <el-col :span="24">
        <el-collapse accordion>
          <el-collapse-item v-for="item in tableData">
            <template slot="title">
              <span style="padding-left: 10px">{{item.workPlanName}}</span>
            </template>
            <div>
              <span class="leftcell" >序号：</span>
              <span class="rightcell">{{item.planNo}}</span>
            </div>
            <div>
              <span class="leftcell">计划工期：</span>
              <span class="rightcell">{{item.workPlanDay}}</span>
            </div>
            <div>
              <span class="leftcell">起止日期：</span>
              <span class="rightcell">{{item.startEndTime}}</span>
            </div>
            <div>
              <span class="leftcell">前置工作：</span>
              <span class="rightcell">
                <!--{{item.fastring}}-->
                  <input v-if="item.fastInString && item.fastInString.length>0" autosize type="textarea" :value="item.fastring"></input>
              </span>
            </div>
            <div style="height: 30px;padding-left: 50px;border:none">
              <el-button type="text" plain @click="edit(item)">编辑</el-button>
              <el-button type="text" plain @click="creatPress(item)">进度填报</el-button>
              <el-button type="text" plain @click="handleRow(item)">填报记录</el-button>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>
    <el-dialog title="编辑计划" :visible.sync="editPlanFlag" :width="dialogWidth">
      <el-form :model="currentPlanModel" ref="currentPlanModel" :rules="currentPlanRules">
        <el-row>
          <el-col :span="21" :offset="1">
            <el-form-item label="项目名称:" :label-width="labelWidth" prop="projectName">
              <el-input v-model="currentPlanModel.projectName" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21" :offset="1">
            <el-form-item label="工作开始时间:" :label-width="labelWidth" prop="startTime">
              <el-date-picker type="date" placeholder="请选择日期"
                              v-model="currentPlanModel.startTime"
                              format="yyyy-MM-dd"
                              value-format="yyyy-MM-dd"
                              style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21" :offset="1">
            <el-form-item label="工作结束时间:" :label-width="labelWidth" prop="endTime">
              <el-date-picker type="date" placeholder="请选择日期"
                              v-model="currentPlanModel.endTime"
                              format="yyyy-MM-dd"
                              value-format="yyyy-MM-dd"
                              style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21" :offset="1">
            <el-form-item label="工期包含周末:" :label-width="labelWidth" prop="weeksFlag">
              <el-select v-model="currentPlanModel.weeksFlag" placeholder="请选择">
                <el-option
                  v-for="item in weekOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21" :offset="1">
            <el-form-item label="填报说明:" :label-width="labelWidth" prop="processRemark">
              <el-input v-model="currentPlanModel.processRemark" type="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21" :offset="1">
            <el-form-item label="上传附件:" :label-width="labelWidth" prop="processFiles">
              <input hidden v-model="currentPlanModel.processFiles"/>

              <el-upload
                :action="uploadPlan_url"
                :headers="uploadheaders"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :before-upload="beforeUpload"
                :on-success="handleSuccess"
                multiple
                :limit="10"
                :file-list="otherFileList"
                :on-preview="handlePreview"
                :on-exceed="handleExceed">
                <el-button type="default">上传</el-button>
                <!--<div slot="tip" class="el-upload__tip">请上传(pdf,jpg,png格式文件)</div>-->
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button type="primary" @click="savePlan('currentPlanModel')">保存</el-button>
        <el-button @click="editPlanFlag=false">返回</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="edTitle" :visible.sync="editProgressFlag" :show-close="false" :width="dialogWidth" >
      <input v-model="detailFlag" hidden/>
      <el-form :model="progressDetailModel" ref="progressDetailModel" :rules="progressDetailRules">
        <el-row>
          <el-col :span="21" :offset="1">
            <el-form-item label="项目名称:" :label-width="labelWidth" prop="projectName">
              <el-input v-model="progressDetailModel.projectName" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21" :offset="1">
            <el-form-item label="工作名称:" :label-width="labelWidth" prop="workPlanName">
              <el-input v-model="progressDetailModel.workPlanName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21" :offset="1">
            <el-form-item label="里程碑标记:" :label-width="labelWidth" prop="milepostFlag">
              <el-select v-model="progressDetailModel.milepostFlag" placeholder="请选择">
                <el-option
                  v-for="item in mileOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!--<el-row>-->
          <!--<el-col :span="21" :offset="1">-->
            <!--<el-form-item label="前置任务:" :label-width="labelWidth" prop="fastPlans">-->
              <!--<el-input v-model="progressDetailModel.fastPlans"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
        <!--</el-row>-->
        <el-row>
          <el-col :span="21" :offset="1">
            <el-form-item label="工期:" :label-width="labelWidth" prop="workPlanDay">
              <el-input v-model="progressDetailModel.workPlanDay">
                <template slot="append">
                  <span>天</span>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21" :offset="1">
            <el-form-item label="开始时间:" :label-width="labelWidth" prop="startTime">
              <el-date-picker type="date" placeholder="请选择日期"
                              v-model="progressDetailModel.startTime"
                              format="yyyy-MM-dd"
                              style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21" :offset="1">
            <el-form-item label="工作量:" :label-width="labelWidth" prop="workLoad">
              <el-input v-model="progressDetailModel.workLoad"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21" :offset="1">
            <el-form-item label="工作量单位:" :label-width="labelWidth" prop="workLoadUnit">
              <el-select v-model="progressDetailModel.workLoadUnit" placeholder="请选择">
                <el-option
                  v-for="item in workLoadUnitOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button v-if="detailFlag" type="primary" @click="saveProgress('progressDetailModel')">保存
        </el-button>
        <el-button @click="cancelback">返回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import local from '../utils/local'
  import api from '../utils/api'
    export default {
        name: "planDetails",
      data(){
          return{
            token:'',
            currentPlanModel: {},
            otherFileList:[],
            tableData:[],
            searchData: {
              page: 1,
              pageSize: 1000,
              totalcount: 0
            },
            editPlanFlag:false,
            currentPlanModel:{},
            currentPlanRules:{},
            uploadheaders:{},
            uploadPlan_url:process.env.VUE_APP_BASE_API + '/Upload/ProjectPlanFileUpload',
            otherFileList:[],
            dialogWidth:'',
            weekOptions:[
              {
                label: '未包含',
                value: 0
              },
              {
                label: '包含',
                value: 1
              },
            ],
            labelWidth:'120px',
            editProgressFlag:false,
            detailFlag:false,
            edTitle:'',
            progressDetailModel: {},
            progressDetailRules: {},
            mileOptions: [
              {
                label: '否',
                value: '0'
              },
              {
                label: '是',
                value: '1'
              },
            ],
            workLoadUnitOptions: [
              {
                label: '吨',
                value: '吨'
              },
              {
                label: '千克',
                value: '千克'
              },
              {
                label: '米',
                value: '米'
              },
              {
                label: '平方米',
                value: '平方米'
              },
              {
                label: '立方米',
                value: '立方米'
              },
              {
                label: '根',
                value: '根'
              },
              {
                label: '孔',
                value: '孔'
              },
              {
                label: '座',
                value: '座'
              },
              {
                label: '个',
                value: '个'
              }, {
                label: '榀',
                value: '榀'
              }, {
                label: '套',
                value: '套'
              }, {
                label: '块',
                value: '块'
              }, {
                label: '段',
                value: '段'
              }, {
                label: '间',
                value: '间'
              }, {
                label: '副',
                value: '副'
              }, {
                label: '天',
                value: '天'
              }, {
                label: '公里',
                value: '公里'
              }, {
                label: '次',
                value: '次'
              }, {
                label: '辆',
                value: '辆'
              }
            ],
          }
      },
      created(){
        this.onLoad();
      },
      mounted(){
          this.setDialogWidth()
      },
      methods:{
        onLoad:function () {
          this.token = local.get('USERTOKEN');
          this.uploadheaders = {  //上传图片headers
            'Authorization': this.token
          };
          var jsonData = JSON.parse(local.get('data'));
          this.processonId = jsonData.processonId;
          this.projectName = jsonData.projectName;
          this.getPlanDetails();
          this.getProgressList();
        },
        getPlanDetails: function () { //获取计划详情
          var model = {
            'processonId': this.processonId
          };
          var that = this;
          api.getPlanInfo(model).then(res => {
            //console.log(res);
            if (res.data.success) {
              var json = res.data.data;
              that.currentPlanModel = json;
              that.currentPlanModel.projectName = that.projectName;
              var a = parseFloat(that.currentPlanModel.totalProcess) * 100;
              that.currentPlanModel.totalProcess = Math.round(a * 100) / 100;
              that.currentPlanModel.startTime = that.currentPlanModel.startTime.split('T')[0];
              that.currentPlanModel.endTime = that.currentPlanModel.endTime.split('T')[0];
              var krr = [];
              if (json.processFiles != '' && json.processFiles != null) {
                var arr = json.processFiles.split(',');
                if (arr != '' && arr != null && arr.length > 0) {
                  arr.forEach(function (item) {
                    if (!isNull(item)) {
                      var pmodel = {
                        'name': item.substring(item.indexOf('_') + 1, item.length),
                        'url': item
                      };
                      krr.push(pmodel);
                    }
                  })
                } else {
                  var model = {
                    'name': json.processFiles.split('_')[1],
                    'url': json.processFiles
                  };
                  krr.push(model);
                }
              }
              that.otherFileList = krr;
            }
          })
        },
        getProgressList: function () {//获取进度列表
          var that = this;
          var model = {
            "processonId": this.processonId,
            "page": this.searchData.page,
            "pageSize": this.searchData.pageSize
          };
          api.getProgressList(model).then(res => {
            //console.log(res);
            if (res.data.success) {
              // that.tableData=res.data.data.list;
              var arr = res.data.data.list;
              if (arr.length > 0) {
                //  arr.reverse();
                arr.forEach(function (item, index) {
                  item.fastring='';
                  item.planNo = index + 1;
                  if (item.milepostFlag == '0') {
                    item.milepostFlagName = '否';
                  } else {
                    item.milepostFlagName = '是';
                  }
                  var date = item.startTime.split('T')[0];
                  item.startEndTime = date + "至" + that.getNextDate(date, item.workPlanDay);
                  if (item.processonCompletionDegree != null && item.processonCompletionDegree != '') {
                    var a = item.processonCompletionDegree;
                    item.processonCompletionDegree = Math.round(a * 10000) / 100 + '%';
                  };
                  if(item.fastInString!="" && item.fastInString!=null && item.fastInString.length>0){
                     item.fastInString.forEach(function (it) {
                        item.fastring+=it;
                     })
                  }
                })
              }
              that.tableData = arr;
              that.searchData.totalcount = res.data.data.totalCount;
            }
          })
        },
        getNextDate: function (date, day) {
          var dd = new Date(date);
          dd.setDate(dd.getDate() + day);
          var y = dd.getFullYear();
          var m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
          var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
          return y + "-" + m + "-" + d;
        },
        editPlan:function () {
          this.editPlanFlag = true;
        },
        handleProgress:function () {
          var model = JSON.stringify(this.currentPlanModel);
          this.$router.push({
            path:'/addProcess',
            name:'addProcess',
            params:{
              model:model
            }
          })
        },
        comBack:function () {
          this.$router.replace('/planManage');
        },
        cancelback:function(){
          this.editProgressFlag = false;
          this.$refs['progressDetailModel'].resetFields();
        },
        saveProgress:function(formName){
          var that = this;
          this.$refs[formName].validate((valid) => {
            if (valid) {
              var model = {
                "processonPlanId": this.progressDetailModel.processonPlanId,  //项目详情ID
                "milepostFlag": this.progressDetailModel.milepostFlag, //里程碑
                "workPlanName": this.progressDetailModel.workPlanName, //工作名称
                "fastPlans": this.progressDetailModel.fastPlans, //默认为Null 前置工作
                "workPlanDay": this.progressDetailModel.workPlanDay, //工期
                "startTime": this.progressDetailModel.startTime,  //开始时间
                "workLoad": this.progressDetailModel.workLoad, //工作量
                "workLoadUnit": this.progressDetailModel.workLoadUnit //工作量单位
              }
              api.updateProgress(model).then(res => {
                //console.log(res);
                if (res.data.success) {
                  that.$message({
                    message: res.data.message,
                    type: 'success',
                    onClose: s => {
                      that.editProgressFlag=false;
                      that.onLoad()
                    }
                  });
                }
              })
            } else {
              return false;
            }
          });
        },
        edit:function (row) {
          this.editProgressFlag = true;
          this.detailFlag = true;
          this.edTitle = '进度修改';
          row.fastPlans = null;
          row.startTime = row.startTime.split('T')[0];
          this.progressDetailModel = row;
          this.progressDetailModel.milepostFlag = row.milepostFlag + '';
          this.progressDetailModel.projectName = this.currentPlanModel.projectName;
        },
        creatPress:function (row) {
          this.$router.push({
            path:'/progressApply',
            name:'progressApply',
            params:{
              processonPlanId:row.processonPlanId
            }
          })
        },
        handleRow:function (row) {
          this.$router.push({
            path:'/progressHistory',
            name:'progressHistory',
            params:{
              processonPlanId:row.processonPlanId
            }
          })
        },
        savePlan:function (formName) {
          var that = this;
          this.$refs[formName].validate((valid) => {
            if (valid) {
              var model = {
                "processonId": this.currentPlanModel.processonId,
                "projectId": this.currentPlanModel.projectId, //项目ID
                "startTime": this.currentPlanModel.startTime, //开始时间
                "endTime": this.currentPlanModel.endTime, //结束日期
                "weeksFlag": this.currentPlanModel.weeksFlag, //工期包括周末  0：未包含,1：包含
                "processRemark": this.currentPlanModel.processRemark, //计划说明
                "processFiles": this.currentPlanModel.processFiles //附件，按逗号隔开
              };
              api.updatePlan(model).then(res => {
                //console.log(res);
                if (res.data.success) {
                  this.$message.success({
                    message: res.data.message,
                    onClose: s => {
                      that.onLoad();
                      that.editPlanFlag=false;
                    }
                  });
                }
              })
            } else {
              return false;
            }
          });
        },
        handleRemove: function (file, filelist) { //删除成功后调用
          if (filelist.length > 1) {
            var str = '';
            filelist.forEach(function (item) {
              str += item.url + ',';
            });
            this.addPlanForm.processFiles = str;
          } else if (filelist.length == 1) {
            this.currentPlanModel.processFiles = filelist[0].url;
          } else {
            this.currentPlanModel.processFiles = '';
          }
          this.otherFileList = filelist;
        },
        beforeRemove: function (file, fileList) {
          return this.$confirm(`确定移除 ${ file.name }？`);
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
            if (this.currentPlanModel.processFiles==null || this.currentPlanModel.processFiles=='' || this.currentPlanModel.processFiles==undefined) {
              this.currentPlanModel.processFiles = file.response.data;
            } else {
              this.currentPlanModel.processFiles += ',' + file.response.data;
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
 input{
   height: auto;
   width:100%;
   text-align: left;
   border: none;
 }
</style>
