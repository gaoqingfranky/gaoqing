<template>
  <div style="width:100%;margin: auto;">
    <div class="header">添加进度</div>
    <el-form :model="addPlanModel" ref="addPlanModel" :rules="addPlanRules">
      <el-row>
        <el-col :span="21" :offset="1">
          <el-form-item label="项目名称:" :label-width="labelWidth" prop="projectName">
            <el-input v-model="addPlanModel.projectName" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="21" :offset="1">
          <el-form-item label="工作名称:" :label-width="labelWidth" prop="workPlanName">
            <el-input v-model="addPlanModel.workPlanName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="21" :offset="1">
          <el-form-item label="里程碑标记:" :label-width="labelWidth" prop="milepostFlag">
            <el-select v-model="addPlanModel.milepostFlag" placeholder="请选择">
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
      <el-row>
        <el-col :span="21" :offset="1">
          <el-form-item label="前置任务:" :label-width="labelWidth" prop="fastPlans">
            <el-input v-model="addPlanModel.fastPlans"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="21" :offset="1">
          <el-form-item label="工期:" :label-width="labelWidth" prop="workPlanDay">
            <el-input v-model="addPlanModel.workPlanDay">
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
                            v-model="addPlanModel.startTime"
                            format="yyyy-MM-dd"
                            style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="21" :offset="1">
          <el-form-item label="工作量:" :label-width="labelWidth" prop="workLoad">
            <el-input v-model="addPlanModel.workLoad"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="21" :offset="1">
          <el-form-item label="工作量单位:" :label-width="labelWidth" prop="workLoadUnit">
            <el-select v-model="addPlanModel.workLoadUnit" placeholder="请选择">
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
    <div slot="footer" class="dialog-footer" style="text-align: center;padding-bottom: 20px">
      <el-button type="primary" @click="save('addPlanModel')">保存</el-button>
      <el-button @click="cancel">返回</el-button>
    </div>
  </div>
</template>

<script>
  import api from '../utils/api'
  import local from '../utils/local'
    export default {
        name: "addProcess",
      data(){
        return{
          token: '',
          labelWidth: '120px',
          project:"",
          progressForm: {},
          progressRules: {},
          programOptions: [],
          addFlag: false,
          addPlanModel: {
            "projectName":'',
            "projectId":'',
            "processonId":"",  //项目计划ID
            "milepostFlag":'0', //里程碑标记
            "workPlanName":"", //工作名称
            "fastPlans":null, //前置任务，默认为NULL
            "workPlanDay":1, //工期
            "startTime":"", //开始时间
            "workLoad":0, //工作量
            "workLoadUnit":"" //工作量单位
          },
          addPlanRules: {
            workPlanName:[
              {required: true, message: '请输入工作名称', trigger: 'blur'},
            ],
            startTime: [
              {required: true, message: '请选择工作开始时间', trigger: 'blur'},
            ],
            workPlanDay:[
              {required: true, message: '请输入工期', trigger: 'blur'},
            ],
            milepostFlag:[
              {required: true, message: '请选择里程碑标记', trigger: 'blur'},
            ],
            workLoad:[
              {required: true, message: '请输入工作量', trigger: 'blur'},
            ],
            workLoadUnit:[
              {required: true, message: '请选择工作量单位', trigger: 'blur'},
            ]
          },
          pnameOptions: [],
          otherUpload_url: '',
          uploadheaders: {},
          otherFileList: [],
          projectFlag: false,
          uploadPress_url:process.env.VUE_APP_BASE_API+'/Upload/PlanProgressReportFileUpload',
          statusList: ['工程筹备', '勘察设计', '待勘察', '未开工', '在建', '验收', '竣工', '终止', '已停工'],
          projectDataList: [],
          currentRow: null,
          weekOptions:[
            {
              label:'未包含',
              value:'0'
            },
            {
              label:'包含',
              value:'1'
            },
          ],
          workLoadUnitOptions:[
            {
              label:'吨',
              value:'吨'
            },
            {
              label:'千克',
              value:'千克'
            },
            {
              label:'米',
              value:'米'
            },
            {
              label:'平方米',
              value:'平方米'
            },
            {
              label:'立方米',
              value:'立方米'
            },
            {
              label:'根',
              value:'根'
            },
            {
              label:'孔',
              value:'孔'
            },
            {
              label:'座',
              value:'座'
            },
            {
              label:'个',
              value:'个'
            }, {
              label:'榀',
              value:'榀'
            }, {
              label:'套',
              value:'套'
            }, {
              label:'块',
              value:'块'
            }, {
              label:'段',
              value:'段'
            }, {
              label:'间',
              value:'间'
            },{
              label:'副',
              value:'副'
            },{
              label:'天',
              value:'天'
            },{
              label:'公里',
              value:'公里'
            },{
              label:'次',
              value:'次'
            },{
              label:'辆',
              value:'辆'
            }
          ],
          mileOptions:[
            {
              label:'否',
              value:'0'
            },
            {
              label:'是',
              value:'1'
            },
          ],
          uploadheaders: {}, //上传图片headers
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
          var project=JSON.parse(this.$route.params.model);
          //console.log(project);
          this.addPlanModel.processonId=project.processonId;
          this.addPlanModel.projectId=project.projectId;
          this.addPlanModel.projectName=project.projectName;
          //console.log(project);
        },
        search: function () {

        },
        clear: function () {

        },
        add: function () {
          if (this.progressForm.program==null || this.progressForm.program=='') {
            this.$message.error('请选择项目！');
          } else {
            this.addPlanModel.projectId= this.progressForm.programId;
            this.addPlanModel.projectName= this.progressForm.program;
            this.addFlag = true;
          }
        },
        handleRemove: function (file,filelist) { //删除成功后调用
          if (filelist.length > 1) {
            var str='';
            filelist.forEach(function (item) {
              str += item.url + ',';
            });
            this.addPlanModel.processFiles=str;
          } else if (filelist.length == 1) {
            this.addPlanModel.processFiles = filelist[0].url;
          } else {
            this.addPlanModel.processFiles = '';
          }
          this.otherFileList=filelist;
        },
        beforeRemove: function (file,fileList) {
          return this.$confirm(`确定移除 ${ file.name }？`);
        },
        beforeUpload: function (file) { //上传前设置
          var isLt2M = file.size / 1024 / 1024 < 2;
          if (!isLt2M) {
            this.$message.error('上传文件大小不能超过 2MB!');
          }
          return isLt2M;
        },
        handleSuccess: function (res,file,fileList) { //上传成功调用
          if (res.success) {
            this.$message.success('文件上传成功');
            if(this.addPlanModel.processFiles==null || this.addPlanModel.processFiles==''){
              this.addPlanModel.processFiles =file.response.data;
            }else{
              this.addPlanModel.processFiles +=','+file.response.data;
            }
            var model={
              'name':file.name,
              'url':file.response.data
            };
            this.otherFileList.push(model);
          }
          else{
            this.$message.error('文件上传失败');
          }
          // console.log(this.addPlanModel);
          // console.log(this.otherFileList);
        },
        handlePreview: function (file) {//打开上传的文件
          if(file.status=='success'){
            window.open(file.url);
          }
        },
        handleExceed: function (file,fileList) { //上传文件超出设置个数
          this.$message.warning(`当前限制选择只能上传 10 个文件!`);
        },
        save: function (formName) {
          var that=this;
          this.$refs[formName].validate((valid) => {
            if (valid) {
              var model={
                "projectId":this.addPlanModel.processonId,
                "processonId":this.addPlanModel.processonId,
                "workPlanName":this.addPlanModel.workPlanName,
                "fastPlans":this.addPlanModel.fastPlans,
                "workPlanDay":this.addPlanModel.workPlanDay,
                "startTime":this.addPlanModel.startTime,
                "workLoad":this.addPlanModel.workLoad,
                "workLoadUnit":this.addPlanModel.workLoadUnit,
                "milepostFlag":this.addPlanModel.milepostFlag,
              };
              api.addProcess(model).then(res=>{
                //console.log(res);
                if(res.data.success){
                  this.$message.success({
                    message: res.data.message,
                    onClose: s => {
                      that.$router.replace("/planDetails");
                    }
                  });
                }else{
                  that.$message.error(res.data.message);
                }
              })
            } else {
              return false;
            }
          });
        },
        createProject: function () {
          this.$router.replace('/addProject');
        },
        handleSelectionChange: function (val) {
          this.currentRow = val;
        },
        handleClose:function () {
          this.addFlag = false;
          this.$refs['addPlanModel'].resetFields();
        },
        cancel:function () {
          // this.addFlag = false;
          this.$refs['addPlanModel'].resetFields();
          this.$router.replace('/planDetails');
          // parent.addTabs({
          //     id: '123456',
          //     title: '',
          //     close: false,
          //     url: 'planDetails.html?item='+JSON.stringify(this.project),
          //     urlType: "relative"
          // });

        }
      }
    }
</script>

<style scoped>

</style>
