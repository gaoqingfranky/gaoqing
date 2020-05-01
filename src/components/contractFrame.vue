<template>
  <div class="w-content" style="width:98%;margin: auto;">
    <div class="header">{{tabName}}</div>
    <el-form ref="addContractForm" :model="addContractForm" :rules="addContractRules">
      <el-row>
        <el-col :span="21" :offset="1">
          <el-form-item label="合同名称:" :label-width="labelWidth" prop="contractName">
            <el-input size="medium" v-model="addContractForm.contractName" placeholder="请输入合同名称">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="21" :offset="1">
          <el-form-item label="合同简称:" :label-width="labelWidth" prop="contractArreName">
            <el-input size="medium" v-model="addContractForm.contractMinName" placeholder="请输入合同简称">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16" :offset="1">
          <el-form-item label="合同编号:" :label-width="labelWidth" prop="contractNo">
            <el-input size="medium" v-model="addContractForm.contractNo" placeholder="请输入合同编号">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="21" :offset="1">
          <el-form-item label="合同类型:" :label-width="labelWidth" prop="contractType">

            <el-select v-model="addContractForm.contractType" placeholder="请选择合同类型">
              <el-option v-for="item in contractType" :key="item.value" :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span='21' :offset="1">
          <el-form-item label="收/付:" :label-width="labelWidth" prop="contractsf">
            <el-select v-model="addContractForm.contractPayType">
              <el-option v-for="item in sfOptions" :key="item.value" :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="21" :offset="1">
          <el-form-item label="项目名称:" :label-width="labelWidth" prop="programName">
            <el-input size="medium" @focus="showProjectDialog" v-model="addContractForm.projectName"
                      placeholder="请输入项目名称">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="21" :offset="1">
          <el-form-item label="甲方单位:" :label-width="labelWidth" prop="company">
            <el-input size="medium" v-model="addContractForm.contractFirstName" placeholder="请输入单位名称">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="21" :offset="1">
          <el-form-item label="甲方代表:" :label-width="labelWidth" prop="ower">
            <el-input size="medium" v-model="addContractForm.contractFirstUserName" placeholder="请输入">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="21" :offset="1">
          <el-form-item label="乙方单位:" :label-width="labelWidth" prop="bcompany">
            <el-input size="medium" v-model="addContractForm.contractSecondName" placeholder="请输入单位名称">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="21" :offset="1">
          <el-form-item label="乙方代表:" :label-width="labelWidth" prop="bower">
            <el-input size="medium" v-model="addContractForm.contractSecondUserName" placeholder="请输入">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="21" :offset="1">
          <el-form-item label="签订总额:" :label-width="labelWidth" prop="acount">
            <el-input size="medium" v-model="addContractForm.contractMoney" placeholder="请输入">
              <template slot="append">
                <span>元</span>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="21" :offset="1">
          <el-form-item label="签订日期:" :label-width="labelWidth" prop="cdate">
            <el-date-picker type="date" placeholder="请选择" v-model="addContractForm.contractSignTime"
                            format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="21" :offset="1">
          <el-form-item label="备注:" :label-width="labelWidth" prop="remark">
            <el-input type="textarea" size="medium" v-model="addContractForm.contractRemark"
                      placeholder="请输入">

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
            <el-button v-if="lookflag" type="primary" @click="save()">保存</el-button>
            <el-button type="primary" plain @click="cancel">取消</el-button>
          </el-form-item>

        </el-col>
      </el-row>
    </el-form>
    <projectDialog :isShowProjectDialog="projectDialog.projectDialogFlag" @on-result-change="changeShowProject"
                    @selectNode="changeProjectNode"></projectDialog>
  </div>


</template>

<script>
  import api from '../utils/api'
  import local from '../utils/local'
  import projectDialog from './projectDialog'

  export default {
    name: "contractFrame",
    components: {projectDialog},
    props: {
      parentMsgObject: {
        type: Object
      }
    },
    data() {
      return {
        token:'',
        parentObj: this.parentMsgObject,
        tabName: '',
        addContractForm: {
          contractName: '',
          contractMinName: '',
          contractNo: '',
          contractType: '',
          contractPayType: 0,
          projectId: '',
          projectName: '',
          contractFirstName: '',
          contractFirstUserName: '',
          contractSecondName: '',
          contractSecondUserName: '',
          contractMoney: '',
          contractSignTime: '',
          contractRemark: '',
          contractFiles: ''
        },
        addContractRules: {},
        labelWidth: '120px',
        fileList: [],
        otherUpload_url: process.env.VUE_APP_BASE_API + '/Upload/ContractFileUpload',
        uploadheaders: {  //上传图片headers
          'Authorization': this.token
        },
        projectDialog: {
          menudata2: [],
          selectId: '',
          selectName: '',
          projectDialogFlag: false
        },
        sfOptions: [
          {
            label: '收',
            value: 0
          },
          {
            label: '付',
            value: 1
          }
        ],
        contractType: [
          {
            value: 0,
            label: '总包合同'
          },
          {
            value: 1,
            label: '劳务承包合同'
          },
          {
            value: 2,
            label: '其他收款合同'
          },
          {
            value: 101,
            label: '专业分包合同'
          },
          {
            value: 102,
            label: '劳务分包合同'
          },
          {
            value: 103,
            label: '采购合同'
          },
          {
            value: 104,
            label: '租赁合同'
          },
          {
            value: 105,
            label: '其他付款合同'
          }
        ],
        urlData: {
          contractId: ''
        },
        lookflag: true

      }
    },
    created: function () {
      // var type= this.GetQueryString('type');
      // var contractId=this.GetQueryString('contractId');
      var type = this.parentObj.type;
      var contractId = this.parentObj.contractId;
      this.urlData.contractId = contractId;
      this.token = local.get('USERTOKEN');
      if (type == 0) {
        this.lookflag = false; //没有按钮
        this.tabName = '合同详情';
        //查看的
        this.getContractInfo();
      }
      else if (type == 1) {
        //编辑的
       // this.postUrl = '/ContractAPI/UpdateContract';
        this.tabName = '编辑合同';
        this.getContractInfo();
      } else {
        this.tabName = '新增合同';
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
      showProjectDialog() {
        this.projectDialog.projectDialogFlag = true;
        // var that=this;
        // service.post('/ProjectAPI/GetProjectListPage', {
        //     page: 1,
        //     pageSize: 1000
        // }).then(res=>{
        //     if (res.success) {
        //         res.data.list.forEach(function (item, index) {
        //             item.label = item.projectName,
        //                 item.children = []
        //         });
        //         that.projectDialog.menudata2 = res.data.list;
        //         that.projectDialog.projectDialogFlag = true;
        //
        //     }
        // })
      },
      // ProjectDialogSelect(node) {
      //
      //     this.addContractForm.projectId = node.projectId;
      //     this.addContractForm.projectName = node.projectName;
      //     this.projectDialog.projectDialogFlag = false;
      //
      // },
      saveUnit() {

      },
      onLoad: function () {

      },
      save: function () {
        if (this.addContractForm.contractName == '') {
          alert('名称不能为空');
          return;
        }
        if (this.addContractForm.projectId == '') {
          alert('项目不能为空');
          return;
        }
        var that = this;
        if(this.tabName=='新增合同') { //添加
          api.addContract(this.addContractForm).then(res => {
            if (res.data.success) {
              that.$message.success('增加成功');
            }
          })
        }else{ //编辑
          api.updateContract(this.addContractForm).then(res => {
            if (res.data.success) {
              that.$message.success('编辑成功');
            }
          })
        }
      },
      cancel: function () {
        //window.history.go(-1);
        this.$router.replace('/contractManage');
      },
      handleRemove(file, fileList) {

        this.filestoString(1, fileList);
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

        this.filestoString(0, fileList);

      },
      filestoString(type, fileList) {
        var fileString = '';
        fileList.forEach(function (item, index) {
          if (type == 1) {
            fileString += item.name + '-' + item.url + ','
          }
          else {
            fileString += item.name + '-' + item.response.data + ','
          }

        })
        //去掉最后一个逗号
        var str = fileString;
        str = (str.substring(str.length - 1) == ',') ? str.substring(0, str.length - 1) : str;
        this.addContractForm.contractFiles = str;
      },
      getContractInfo() {
        var that = this;
        api.getContractInfo({contractId: this.urlData.contractId}).then(res => {
          if (res.data.success) {
            that.addContractForm = res.data.data;
            if (res.data.data.contractFiles != '') {
              var dbfiles = new Array();
              var alllist = res.data.data.contractFiles.split(',');
              alllist.forEach(function (item, index) {
                var name = item.split('-')[0];
                var url = item.split('-')[1];
                dbfiles.push({
                  name: name,
                  url: url
                });
              })
              that.fileList = dbfiles;
            }
          }
        })
      },
      changeShowProject: function (val) {
        this.projectDialog.projectDialogFlag = val;
      },
      changeProjectNode: function (val) {
        // this.addProgramForm.projectConstructionUnit=val.text;
        this.addContractForm.projectId = val.projectId;
        this.addContractForm.projectName = val.projectName;
        this.projectDialog.projectDialogFlag = false;
      },
    }
  }
</script>

<style scoped>

</style>
