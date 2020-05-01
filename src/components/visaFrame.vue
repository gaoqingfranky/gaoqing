<template>
  <div class="w-content" style="width:100%;height: auto">
    <div class="header" >{{tabName}}</div>
    <el-form ref="addVisaForm" :model="addVisaForm" :rules="addVisaRules">
      <el-row>
        <el-col :span="21" :offset="1">
          <el-form-item label="项目名称:" :label-width="labelWidth" prop="programName">
            <el-input size="medium" @focus="showProjectDialog" v-model="addVisaForm.projectName"
                      placeholder="请输入项目名称">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="21" :offset="1">
          <el-form-item label="合同:" :label-width="labelWidth" prop="contract">
            <el-select v-model="addVisaForm.contractId">
              <el-option v-for="item in contractOptions" :key="item.value" :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="21" :offset="1">
          <el-form-item label="变更名称:" :label-width="labelWidth" prop="name">
            <el-input size="medium" v-model="addVisaForm.visaChangeName" placeholder="请输入变更名称">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="21" :offset="1">
          <el-form-item label="变更编号:" :label-width="labelWidth" prop="code">
            <el-input size="medium" v-model="addVisaForm.visaChangeNo" placeholder="请输入变更编号">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="21" :offset="1">
          <el-form-item label="变更内容:" :label-width="labelWidth" prop="detail">
            <el-input size="medium" v-model="addVisaForm.visaChangeContent" type="textarea">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="21" :offset="1">
          <el-form-item label="变更类型:" :label-width="labelWidth" prop="type">
            <el-select v-model="addVisaForm.visachangeType">
              <el-option v-for="item in typeOptions" :key="item.value" :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="21" :offset="1">
          <el-form-item label="变更日期:" :label-width="labelWidth" prop="date">
            <el-date-picker type="date" placeholder="请选择变更日期" v-model="addVisaForm.visachangeTime"
                            format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="21" :offset="1">
          <el-form-item label="变更金额:" :label-width="labelWidth" prop="acount">
            <el-input size="medium" v-model="addVisaForm.visachangeMoney" placeholder="请输入变更金额">
              <template slot="append">
                <span>元</span>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="21" :offset="1">
          <el-form-item label="金额加减" :label-width="labelWidth" prop="addOrdel">
            <el-radio v-model="addVisaForm.visachangePayType" label='0'>追加</el-radio>
            <el-radio v-model="addVisaForm.visachangePayType" label='1'>追减</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="21" :offset="1">
          <el-form-item label="工程开始日期:" :label-width="labelWidth" prop="startdate">
            <el-date-picker type="date" placeholder="请选择开始日期" v-model="addVisaForm.startTime"
                            format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    <el-row>
        <el-col :span="21" :offset="1">
          <el-form-item label="工程结束日期:" :label-width="labelWidth" prop="enddate">
            <el-date-picker type="date" placeholder="请选择结束日期" v-model="addVisaForm.endTime"
                            format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="21" :offset="1">
          <el-form-item label="变更发起单位:" :label-width="labelWidth" prop="dept">
            <el-input size="medium" @focus="getDept" v-model="addVisaForm.visachangeOpenDepName"
                      placeholder="请选择单位">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="21" :offset="1">
          <el-form-item label="备注:" :label-width="labelWidth" prop="remark">
            <el-input size="medium" v-model="addVisaForm.visachangeRemark" type="textarea">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="21" :offset="1">
          <el-form-item label="上传附件:" :label-width="labelWidth" prop="other">
            <el-upload class="upload-demo" :action="otherUpload_url" :headers="uploadheaders"
                       :on-remove="handleRemove" :before-remove="beforeRemove"
                       :on-success="onsuccess" multiple
                       :limit="10" :on-exceed="handleExceed" :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="21" :offset="1">
          <el-form-item :label-width="labelWidth" prop="idCard">
            <el-button v-if="lookflag" type="primary" @click="save()">保存</el-button>
            <el-button type="success" plain @click="callback">返 回</el-button>
          </el-form-item>

        </el-col>
      </el-row>
    </el-form>
    <deptDialog :isShowDialog="findDeptFlag" @on-result-change="changeShowDept" @selectNode="changeNode"></deptDialog>
    <projectDialog :isShowProjectDialog="projectDialog.projectDialogFlag" @on-result-change="changeShowProject"
                    @selectNode="changeProjectNode"></projectDialog>
  </div>

</template>

<script>
  import api from '../utils/api'
  import local from '../utils/local'
  import deptDialog from './DeptDialog';
  import projectDialog from './projectDialog'

  export default {
    name: "visaDialog",
    components: {deptDialog, projectDialog},
    props: {
      parentMsgObject: {
        type: Object
      }
    },
    data() {
      return {
        pobj: this.parentMsgObject,
        type: '',
        tabName: '',
        token: '',
        labelWidth: '120px',
        addVisaForm: {
          projectName: '', //项目名称
          projectId: '', //项目ID
          contractId: '', //合同ID
          contractName: '', //合同名称
          visaChangeName: '', //变更名称
          visaChangeNo: '',//变更编号
          visaChangeContent: '',//变更内容
          visachangeTime: '',//变更时间
          visachangeMoney: '',//变更金额
          visachangeType: 0, //变更类型
          visachangePayType: '0', //变更支付类型
          startTime: '',//开始时间
          endTime: '',//结束时间
          visachangeOpenDepId: '',//变更发起单位
          visachangeOpenDepName: '',//变更发起单位名称
          visachangeRemark: '',//变更备注
          visachangeFiles: '',
          visachangeConfirm: 1
        },
        fileList: [],
        addVisaRules: {},
        contractOptions: [],
        programOptions: [],
        typeOptions: [
          {
            value: 0,
            label: '设计变更'
          },
          {
            value: 1,
            label: '法令变更'
          },
          {
            value: 2,
            label: '工程变更'
          },
          {
            value: 3,
            label: '工程洽商'
          },
          {
            value: 4,
            label: '其他'
          }
        ],
        ynOptions: [],
        otherFileList: [],
        otherUpload_url: process.env.VUE_APP_BASE_API + '/Upload/ViasChangeFileUpload',
        uploadheaders: {  //上传图片headers
          'Authorization': this.token
        },
        projectDialog: {
          menudata2: [],
          selectId: '',
          selectName: '',
          projectDialogFlag: false
        },
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        findDeptFlag: false,
        deptData: [],
        currentNode: null,
        urlData: {
          visachangeId: ''
        },
        lookflag: true
      }
    },
    created: function () {
      var type = this.pobj.type;
      var visachangeId = this.pobj.visaChangeId;
      this.urlData.visaChangeId = visachangeId;
      this.token = local.get('USERTOKEN');
      if (type == 0) {
        this.lookflag = false; //没有按钮
        this.tabName = '变更签证详情';
        //查看的
        this.onLoad();

      }
      else if (type == 1) {
        //编辑的
        this.tabName = '编辑变更签证';
        this.onLoad();
      } else {
        this.tabName = '新增变更签证';
      }
    },
    methods: {
      onLoad: function () {
        var nowid = this.urlData.visaChangeId;
        var that = this;
        api.getVisaChangeInfo({
          page: 1,
          pageSize: 1000,
          visaChangeId: nowid
        }).then(res => {
          if (res.data.success) {
            that.contractOptions.push({
              value: res.data.data.contractId,
              label: res.data.data.contractName
            });
            res.data.data.visachangePayType = res.data.data.visachangePayType + '';
            that.addVisaForm = res.data.data;
            if (res.data.data.visachangeFiles != '') {
              var dbfiles = new Array();

              var alllist = res.data.data.visachangeFiles.split(',');
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
      GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
          return unescape(r[2]);
        }
        return null;
      },
      showProjectDialog() { //选择项目弹窗
        this.projectDialog.projectDialogFlag = true;

      },
      getDept: function () { //获取部门
        this.findDeptFlag = true;
        //this.getDeptList();//获取部门
      },

      GetContractByProject() {  //获取合同列表
        var that = this;
        api.getContractList({
          page: 1,
          pageSize: 1000,
          projectId: this.addVisaForm.projectId,
          contractType: -1,
          contractPayType: -1
        }).then(res => {
          if (res.data.success) {
            var tempOption = new Array();
            res.data.data.list.forEach(function (item, index) {
              tempOption.push({
                label: item.contractName,
                value: item.contractId
              })
            });
            that.contractOptions = tempOption;
          }
        })
      },
      handleContractRemove: function () {

      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`);
      },
      handleRemove(file, fileList) {

        this.filestoString(1, fileList);
      },
      onsuccess(response, file, fileList) {

        this.filestoString(0, fileList);

      },
      handleExceed: function () {

      },
      save: function () {

        if (this.addVisaForm.visaChangeName == '') {
          alert('名称不能为空');
          return;
        }
        if (this.addVisaForm.projectId == '') {
          alert('项目不能为空');
          return;
        }
        if (this.addVisaForm.contractId == '') {
          alert('合同不能为空');
          return;
        }
        var that = this;
        if(this.tabName=='新增变更签证') {//添加
          api.addVisaChange(this.addVisaForm).then(res => {
            if (res.data.success) {
              that.$message.success({
                message: '添加成功',
                onClose: s => {
                  that.$router.replace('/visaChangeManage')
                }
              })
            }
          })
        }else { //编辑
          api.updateVisaChange(this.addVisaForm).then(res => {
            if (res.data.success) {
              that.$message.success({
                message: '编辑成功',
                onClose: s => {
                  that.$router.replace('/visaChangeManage')
                }
              })
            }
          })
        }
      },
      callback() {
        this.$router.replace('/visaChangeManage');
      },
      cancel: function () {

      },
      renderContent: function (h, {node, data, store}) {
        var createElement = arguments[0];
        return createElement('span', [
          createElement('i', {attrs: {class: data.icon}}),
          createElement('span', "     "),
          createElement('span', arguments[1].node.label)
        ]);
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
        this.addVisaForm.visachangeFiles = str;
      },
      handleNodeClick: function (val) {
        this.currentNode = val;
      },
      changeShowDept: function (val) {
        this.findDeptFlag = val;
      },
      changeNode: function (val) {
        // this.addProgramForm.projectConstructionUnit=val.text;
        this.addVisaForm.visachangeOpenDepName = val.text;
        this.addVisaForm.visachangeOpenDepId = val.organizationId;
        this.findDeptFlag = false;
      },
      changeShowProject: function (val) {
        this.projectDialog.projectDialogFlag = val;
      },
      changeProjectNode: function (val) {
        // this.addProgramForm.projectConstructionUnit=val.text;
        this.addVisaForm.projectId = val.projectId;
        this.addVisaForm.projectName = val.projectName;
        this.projectDialog.projectDialogFlag = false;
        //获取项目底下的所有合同
        this.GetContractByProject();
      },
    },
    watch: {
      isShowVisaDialog(val) {
        this.isShowVisa = val;//②监听外部对props属性result的变更，并同步到组件内的data属性myResult中
      },
      isShowVisa(val) {
        this.$emit("on-result-change", val);//③组件内对myResult变更后向外部发送事件通知
      },

    },
  }
</script>

<style scoped>

</style>
