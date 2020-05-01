<template>
  <div style="width:100%;margin: auto;">
    <div class="header">项目管理</div>
    <el-row class="center">
      <el-col :span="24">
        <el-collapse accordion>
          <el-collapse-item v-for="item in projectList">
            <template slot="title">
              <span style="padding-left: 10px">{{item.projectName}}</span>
            </template>
            <div><span class="leftcell">项目编号：</span> <span class="rightcell">{{item.projectNo}}</span></div>
            <div><span class="leftcell">项目负责人：</span> <span class="rightcell">{{item.projectAdminUserName}}</span></div>
            <div><span class="leftcell">项目状态：</span> <span class="rightcell">{{statusList[parseInt(item.projectStatus)]}}</span></div>
            <div><span class="leftcell">开工日期：</span> <span class="rightcell">{{item.projectStartTime}}</span></div>
            <div><span class="leftcell">竣工日期：</span> <span class="rightcell">{{item.projectEndTime}}</span></div>
            <div><span class="leftcell">所属公司：</span> <span class="rightcell">{{item.projectOwnerCompany}}</span></div>
            <div><span class="leftcell">所属单位：</span> <span class="rightcell">{{item.projectConstructionUnit}}</span>
            </div>
            <div><span class="leftcell">项目创建人：</span> <span class="rightcell">{{item.createUserName}}</span></div>
            <div style="height: 65px;padding-left: 50px;border:none">
              <el-button type="primary" plain @click="check(item)">详情</el-button>
              <el-button type="warning" plain @click="edit(item)">编辑</el-button>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>
    <el-dialog :title="title" :visible.sync="detailProjectFlag" top="15" :width="dialogWidth" >
      <input v-model="diaFlag" hidden/>
      <el-form ref="detailProgramForm" :model="detailProgramForm" :rules="editProgramRules">
        <el-row>
          <el-col :span="21" :offset="1">
            <el-form-item label="项目名称:" :label-width="labelWidth" prop="projectName">
              <el-input size="medium" v-model="detailProgramForm.projectName">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21" :offset="1">
            <el-form-item label="项目简称:" :label-width="labelWidth" prop="editProgramForm">
              <el-input v-model="detailProgramForm.projectMinName" size="medium">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21" :offset="1">
            <el-form-item label="项目编号:" :label-width="labelWidth" prop="projectNo">
              <el-input size="medium" v-model="detailProgramForm.projectNo">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21" :offset="1">
            <el-form-item label="备案号:" :label-width="labelWidth" prop="projectRecordNo">
              <el-input v-model="detailProgramForm.projectRecordNo" size="medium" auto-complete="off">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21" :offset="1">
            <el-form-item label="施工合同编号:" :label-width="labelWidth" prop="projectContractNumber">
              <el-input size="medium" v-model="detailProgramForm.projectContractNumber">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21" :offset="1">
            <el-form-item label="施工许可证号:" :label-width="labelWidth" prop="projectConstructionPermitNo">
              <el-input v-model="detailProgramForm.projectConstructionPermitNo" size="medium"
                        auto-complete="off">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21" :offset="1">
            <el-form-item label="项目性质:" :label-width="labelWidth" prop="projectNature">
              <el-select v-model="detailProgramForm.projectNature" placeholder="请选择项目性质">
                <el-option
                  v-for="item in natureOptions"
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
            <el-form-item label="项目状态:" :label-width="labelWidth" prop="projectStatus">
              <el-select v-model="detailProgramForm.projectStatus" placeholder="请选择项目性质">
                <el-option
                  v-for="item in statusOptions"
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
            <el-form-item label="开工日期:" :label-width="labelWidth" prop="projectStartTime">
              <el-date-picker type="date" placeholder="请选择"
                              v-model="detailProgramForm.projectStartTime"
                              format="yyyy-MM-dd"
                              style="width: 100%;">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21" :offset="1">
            <el-form-item label="竣工日期:" :label-width="labelWidth" prop="projectEndTime">
              <el-date-picker type="date" placeholder="请选择"
                              v-model="detailProgramForm.projectEndTime"
                              format="yyyy-MM-dd"
                              style="width: 100%;">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21" :offset="1">
            <el-form-item label="项目造价(万元):" :label-width="labelWidth" prop="projectMadeMoney">
              <el-input size="medium" v-model="detailProgramForm.projectMadeMoney">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21" :offset="1">
            <el-form-item label="项目面积(㎡):" :label-width="labelWidth" prop="projectAreas">
              <el-input size="medium" v-model="detailProgramForm.projectAreas">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21" :offset="1">
            <el-form-item label="项目长度(m):" :label-width="labelWidth" prop="projectLength">
              <el-input v-model="detailProgramForm.projectLength" size="medium" auto-complete="off">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21" :offset="1">
            <el-form-item label="项目负责人:" :label-width="labelWidth" prop="projectAdminUserName">
              <el-input size="medium" v-model="detailProgramForm.projectAdminUserName">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21" :offset="1">
            <el-form-item label="施工单位:" :label-width="labelWidth" prop="projectConstructionUnit">
              <el-input size="medium" v-model="detailProgramForm.projectConstructionUnit">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21" :offset="1">
            <el-form-item label="所属公司:" :label-width="labelWidth" prop="projectOwnerCompany">
              <el-input size="medium" v-model="detailProgramForm.projectOwnerCompany">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21" :offset="1">
            <el-form-item label="甲方:" :label-width="labelWidth" prop="projectFirstParty">
              <el-input size="medium" v-model="detailProgramForm.projectFirstParty">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21" :offset="1">
            <el-form-item label="项目所属区域:" :label-width="labelWidth" prop="area">
              <VDistpicker v-model="detailProgramForm.area" :province="detailProgramForm.projectProvince" :city="detailProgramForm.projectCity" :area="detailProgramForm.projectCounty" @selected="selectpicker">
              </VDistpicker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21" :offset="1">
            <el-form-item label="具体地点:" :label-width="labelWidth" prop="projectDetailAddress">
              <el-input size="medium" v-model="detailProgramForm.projectDetailAddress">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21" :offset="1">
            <el-form-item label="备注:" :label-width="labelWidth" prop="projectRemark">
              <el-input type="textarea" v-model="detailProgramForm.projectRemark">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: right">
        <el-button v-if="diaFlag==1" type="primary" @click="saveProject('detailProgramForm')">确定</el-button>
        <el-button @click="detailProjectFlag=false">返 回</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import api from '../utils/api'
  import VDistpicker from 'v-distpicker'
  export default {
    name: "projectManage",
    components:{VDistpicker},
    data() {
      return {
        projectList: [],
        statusList: ['工程筹备', '勘察设计', '待勘察', '未开工', '在建', '验收', '竣工', '终止', '已停工'],
        natureList: ['新建', '扩建', '改建', '复建', '迁建', '拆建', '其他'],
        dialogWidth: '',
        natureOptions: [
          {
            value: '0',
            label: '新建'
          },
          {
            value: '1',
            label: '扩建'
          },
          {
            value: '2',
            label: '改建'
          },
          {
            value: '3',
            label: '复建'
          },
          {
            value: '4',
            label: '迁建'
          },
          {
            value: '5',
            label: '拆建'
          },
          {
            value: '6',
            label: '其他'
          },
        ],
        statusOptions: [
          {
            value: '0',
            label: '工程筹备'
          },
          {
            value: '1',
            label: '勘察设计'
          },
          {
            value: '2',
            label: '待勘察'
          },
          {
            value: '3',
            label: '未开工'
          },
          {
            value: '4',
            label: '在建'
          },
          {
            value: '5',
            label: '验收'
          },
          {
            value: '6',
            label: '竣工'
          },
          {
            value: '7',
            label: '终止'
          },
        ],
        editProgramRules: {
          projectName: [
            {required: true, message: '请输入项目名称', trigger: 'blur'},
          ],
          projectMinName: [
            {required: true, message: '请输入项目简称', trigger: 'blur'},
          ],
          projectAdminUserName: [
            {required: true, message: '请选择项目负责人',},
          ],
          projectConstructionUnit: [
            {required: true, message: '请选择施工单位',},
          ],
          projectMadeMoney: [
            {required: true, message: '请输入项目造价', trigger: 'blur'},
          ],
          projectStartTime: [
            {required: true, message: '请选择开工日期', trigger: 'blur'},
          ],
          projectEndTime: [
            {required: true, message: '请选择竣工日期', trigger: 'blur'},
          ],
          projectStatus: [
            {required: true, message: '请选择项目状态', trigger: 'blur'},
          ],
          projectNature: [
            {required: true, message: '请选择项目性质', trigger: 'blur'},
          ],
        },
        labelWidth: '120px',
        detailProgramForm: {},
        detailProjectFlag: false,
        diaFlag: 0, //0 详情，1，修改
        title: '',

      }
    },
    created() {
      this.onLoad();
    },
    mounted() {
      this.setDialogWidth();
    },
    methods: {
      onLoad: function () {
        this.getProjectList();
      },
      getProjectList: function () {
        var model = {
          "page": 1,
          "pageSize": 1000
        };
        var that = this;
        api.getProjectList(model).then(res => {
          if (res.data.success) {
            var arr = res.data.data.list;
            if (arr != null && arr.length > 0) {
              arr.forEach(function (item) {
                item.projectStartTime = item.projectStartTime.split('T')[0];
                item.projectEndTime = item.projectEndTime.split('T')[0];
               // item.projectStatus = that.statusList[parseInt(item.projectStatus)];
                item.projectStatus =item.projectStatus+'' ;
                item.projectNature=''+item.projectNature;
                // if (item.projectNature != null && item.projectNature != "") {
                //   item.projectNature = that.natureList[parseInt(item.projectNature)];
                // }
              });
              that.projectList = arr;
            } else {
              that.projectList = [];
            }
          } else {
            that.projectList = [];
            that.$message.error(res.data.message);
          }
        })
      },
      check: function (val) {
        this.detailProjectFlag = true;
        this.diaFlag = 0;
        this.title = "项目详情";
       // val.area = val.projectProvince + '' + val.projectCity + '' + val.projectCounty;
        this.detailProgramForm = val;
        //console.log(val);
      },
      edit: function (val) {
        //console.log(val);
        this.detailProjectFlag = true;
        this.diaFlag = 1;
        this.title = "编辑项目";
        this.detailProgramForm = val;
      },
      selectpicker:function(data){
        this.detailProgramForm.projectProvince = data.province.value;
        this.detailProgramForm.projectCity = data.city.value;
        this.detailProgramForm.projectCounty=data.area.value;
      },
      saveProject:function(formName){
        var that = this;
        //console.log(this.detailProgramForm)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //console.log(model);
            api.updateProject(this.detailProgramForm).then(res=>{
              // console.log(res);
              if (res.data.success) {
                that.$message.success({
                  message: res.data.message,
                  onClose: s => {
                    that.detailProjectFlag = false;
                    that.onLoad();
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

  .el-button {
    margin-top: 15px;
  }
</style>
