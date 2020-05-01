<template>
  <div style="width:100%;margin: auto;">
    <div class="header">进度填报</div>
    <el-form ref="addContractForm" :model="addContractForm" :rules="addContractRules">
      <el-row>
        <el-col :span="21" :offset="1">
          <el-form-item label="填报标题:" :label-width="labelWidth" prop="processFillInName">
            <el-input size="medium" v-model="addContractForm.processFillInName" placeholder="">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="showflag">
        <el-col :span="21" :offset="1">
          <el-form-item label="计划开始时间:" :label-width="labelWidth" prop="processFillInName">
            <el-input :disabled="true" size="medium" v-model="addContractForm.startTime" placeholder="">
            </el-input>

          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="21" :offset="1">
          <el-form-item label="实际开始时间:" :label-width="labelWidth" prop="cdate">
            <el-date-picker type="date" placeholder="请选择" v-model="addContractForm.processFillInStartTime"
                            format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="showflag">
        <el-col :span="16" :offset="1">
          <el-form-item label="剩余工作量:" :label-width="labelWidth" prop="contractNo">
            <el-input :disabled="true" size="medium" v-model="addContractForm.processonSurplus" placeholder="">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16" :offset="1">
          <el-form-item label="本次填报工作量:" :label-width="labelWidth" prop="contractNo">
            <el-input size="medium" v-model="addContractForm.workLoadFillIn" placeholder="">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="showflag">
        <el-col :span="16" :offset="1">
          <el-form-item label="累计完成量:" :label-width="labelWidth" prop="contractNo">
            <el-input :disabled="true" size="medium" v-model="addContractForm.processonCumulative" placeholder="">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="showflag">
        <el-col :span="16" :offset="1">
          <el-form-item label="完成度:" :label-width="labelWidth" prop="contractNo">
            <el-input :disabled="true" size="medium" v-model="addContractForm.processonCompletionDegree" placeholder="">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16" :offset="1">
          <el-form-item label="备注:" :label-width="labelWidth" prop="contractNo">
            <el-input size="medium" v-model="addContractForm.processFillInRemark" placeholder="">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="21" :offset="1">
          <el-form-item label="上传附件:" :label-width="labelWidth" prop="other">
            <el-upload class="upload-demo" :action="otherUpload_url" :headers="uploadheaders"
                       :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove"
                       :on-success="onsuccess" multiple :limit="10" :on-exceed="handleExceed"
                       :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="21" :offset="1">
          <el-form-item :label-width="labelWidth" prop="idCard">
            <el-button  v-if="lookflag" type="primary" @click="save()">保存</el-button>
            <el-button type="primary" plain @click="cancel">返回</el-button>
          </el-form-item>

        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import local from '../utils/local'
  import api from '../utils/api'
    export default {
        name: "progressApply",
        data(){
          return{
            token: '',
            addContractForm: {
              processonPlanId:'',
              processFillInName:'',
              processFillInStartTime:'',
              workLoadFillIn:0,
              processFillInFinished:false,
              processFillInRemark:'',
              processFillInFiles:''
            },
            addContractRules: {},
            labelWidth: '120px',
            fileList: [],
            otherUpload_url: process.env.VUE_APP_BASE_API + '/Upload/ProcessonFillInFileUpload',
            uploadheaders: {},
            projectDialog: {
              menudata2: [],
              selectId: '',
              selectName: '',
              projectDialogFlag: false
            },
            urlData:{
              processFillInId:'',
              processonPlanId:''
            },
            lookflag:true,
            showflag:false
          }
      },
      created: function () {
        this.token=local.get('USERTOKEN');
        this.uploadheaders={
          'Authorization': this.token
        }
        var type=this.$route.params.type;
        this.urlData.processFillInId=this.$route.params.processFillInId;
        this.urlData.processonPlanId=this.$route.params.processonPlanId;
        //查看的
        if(type==0){
          this.lookflag=false; //没有按钮
          this.getContractInfo();  //获取填报的数据
        }
        else{
          //获取计划详情的数据
          //增加的
          this.showflag=true;
          this.getProcessonPlanModel();
        }
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

        },
        save: function () {
          var that=this;
            api.addProgressApply(this.addContractForm).then(res => {
              if (res.data.success) {
                // alert('增加成功');
                that.$message.success('增加成功');
                that.$router.replace('/planDetails');
              }else{
                that.$message.error(res.data.message);
              }
            })

        },
        cancel: function () {
          //  window.history.go(-1);
          this.$router.replace('/planDetails')
        },
        handleRemove(file, fileList) {

          this.filestoString(1,fileList);
        },
        handlePreview(file) {

        },
        handleExceed(files, fileList) {
          this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
          return this.$confirm(`确定移除 ${file.name}？`);
        },
        onsuccess(response, file, fileList) {

          this.filestoString(0,fileList);

        },
        filestoString(type,fileList) {
          var fileString = '';
          fileList.forEach(function (item, index) {
            if(type==1){
              fileString +=item.name+'-'+item.url + ','
            }
            else{
              fileString +=item.name+'-'+item.response.data + ','
            }

          })
          //去掉最后一个逗号
          var str = fileString;
          str = (str.substring(str.length - 1) == ',') ? str.substring(0, str.length - 1) : str;
          this.addContractForm.processFillInFiles = str;
        },
        getContractInfo(){
          var that=this;
          api.getProgressApplyInfo({processFillInId:this.urlData.processFillInId}).then(res=>{
            if (res.data.success) {
              that.addContractForm=res.data.data;
             //console.log(res.data.data.processFillInFiles);
              if(res.data.data.processFillInFiles!='' && res.data.data.processFillInFiles!=null){
                var dbfiles=[];
                var alllist=[];
                if(res.data.data.processFillInFiles.indexOf(',')!=-1) {
                  alllist = res.data.data.processFillInFiles.split(',');
                }else{
                  alllist.push(res.data.data.processFillInFiles);
                }
                  alllist.forEach(function (item, index) {
                    var name = item.split('-')[0];
                    var url = item.split('-')[1];
                    dbfiles.push({
                      name: name,
                      url: url
                    });
                  })
                }
                that.fileList = dbfiles;
              }
          })
        },
        getProcessonPlanModel(){
          var that=this;
          api.getPlanModelInfo({processonPlanId:this.urlData.processonPlanId}).then(res=>{
            if (res.data.success) {
              that.addContractForm=res.data.data;
            }
          })
        }
      }
    }
</script>

<style scoped>

</style>
