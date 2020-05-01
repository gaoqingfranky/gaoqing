<template>
  <div style="width:100%;margin: auto;">
    <div class="header">新增项目</div>
        <el-form ref="addProgramForm" :model="addProgramForm" label-width="120px" :rules="addProgramRules">
          <el-row>
            <el-col :span="21" :offset="1">
              <el-form-item label="项目名称:" :label-width="labelWidth" prop="projectName">
                <el-input size="medium" v-model="addProgramForm.projectName" placeholder="请输入项目名称">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="21" :offset="1">
              <el-form-item label="项目简称:" :label-width="labelWidth" prop="projectMinName">
                <el-input v-model="addProgramForm.projectMinName" size="medium" placeholder="请输入项目简称">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="21" :offset="1">
              <el-form-item label="项目编号:" :label-width="labelWidth" prop="projectNo">
                <el-input size="medium" v-model="addProgramForm.projectNo" >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="21" :offset="1">
              <el-form-item label="备案号:" :label-width="labelWidth" prop="projectRecordNo">
                <el-input v-model="addProgramForm.projectRecordNo" size="medium" auto-complete="off">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="21" :offset="1">
              <el-form-item label="施工合同编号:" :label-width="labelWidth" prop="projectContractNumber">
                <el-input size="medium" v-model="addProgramForm.projectContractNumber">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="21" :offset="1">
              <el-form-item label="施工许可证号:" :label-width="labelWidth" prop="projectConstructionPermitNo">
                <el-input v-model="addProgramForm.projectConstructionPermitNo" size="medium" auto-complete="off">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="21" :offset="1">
              <el-form-item label="项目性质:" :label-width="labelWidth" prop="projectNature">
                <el-select v-model="addProgramForm.projectNature" placeholder="请选择项目性质">
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
                <el-select v-model="addProgramForm.projectStatus" placeholder="请选择项目性质">
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
                                v-model="addProgramForm.projectStartTime"
                                format="yyyy-MM-dd"
                                style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="21" :offset="1">
              <el-form-item label="竣工日期:" :label-width="labelWidth" prop="projectEndTime">
                <el-date-picker type="date" placeholder="请选择"
                                v-model="addProgramForm.projectEndTime"
                                format="yyyy-MM-dd"
                                style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="21" :offset="1">
              <el-form-item label="项目造价(万元):" :label-width="labelWidth" prop="projectMadeMoney">
                <el-input size="medium" v-model="addProgramForm.projectMadeMoney">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="21" :offset="1">
              <el-form-item label="项目面积(㎡):" :label-width="labelWidth" prop="projectAreas">
                <el-input size="medium" v-model="addProgramForm.projectAreas">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="21" :offset="1">
              <el-form-item label="项目长度(m):" :label-width="labelWidth" prop="projectLength">
                <el-input v-model="addProgramForm.projectLength" size="medium" auto-complete="off">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="21" :offset="1">
              <el-form-item label="项目负责人:" :label-width="labelWidth" prop="projectAdminUserName">
                <el-input size="medium" v-model="addProgramForm.projectAdminUserName" @focus="getperson">
                  <template slot="append">
                    <el-button type="primary" icon="el-icon-user-solid" @click="getperson"></el-button>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="21" :offset="1">
              <el-form-item label="施工单位:" :label-width="labelWidth" prop="projectConstructionUnit">
                <el-input size="medium" v-model="addProgramForm.projectConstructionUnit" @focus="getDept">
                  <template slot="append">
                    <el-button type="primary" icon="el-icon-caret-bottom" @click="getDept"></el-button>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="21" :offset="1">
              <el-form-item label="所属公司:" :label-width="labelWidth" prop="projectOwnerCompany">
                <el-select v-model="addProgramForm.projectOwnerCompany" placeholder="请选择公司">
                  <el-option
                    v-for="item in companyOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <!--<el-input size="medium" v-model="addProgramForm.projectOwnerCompany">-->
                <!--</el-input>-->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="21" :offset="1">
              <el-form-item label="甲方:" :label-width="labelWidth" prop="projectFirstParty">
                <el-input size="medium" v-model="addProgramForm.projectFirstParty">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="21" :offset="1">
              <el-form-item label="项目所属区域:" :label-width="labelWidth" prop="area">
                <VDistpicker v-model="addProgramForm.area" :province="addProgramForm.projectProvince" :city="addProgramForm.projectCity" :area="addProgramForm.projectCounty" @selected="selectpicker"></VDistpicker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="21" :offset="1">
              <el-form-item label="具体地点:" :label-width="labelWidth" prop="projectDetailAddress">
                <el-input size="medium" v-model="addProgramForm.projectDetailAddress">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="21" :offset="1">
              <el-form-item label="备注:" :label-width="labelWidth" prop="projectRemark">
                <el-input type="textarea" v-model="addProgramForm.projectRemark">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="21" :offset="1">
              <el-form-item :label-width="labelWidth" prop="idCard">
                <el-button type="primary" @click="save('addProgramForm')">保存</el-button>
                <el-button  @click="cancel">取消</el-button>
              </el-form-item>

            </el-col>
          </el-row>
        </el-form>
    <deptdialog :isShowDialog="findDeptFlag"  @on-result-change = "changeShowDept" @selectNode="changeNode"></deptdialog>
    <staffdialog :isShowStaff="findPersonFlag" :parentObj="pobj" @on-result-change = "changeShowStaff" @selectStaffNode="changeStaff" ></staffdialog>
      </div>
</template>

<script>
  import VDistpicker from 'v-distpicker'
  import deptdialog from '../components/DeptDialog'
  import staffdialog from '../components/staffDialog'
  import api from '../utils/api'
  export default {
        name: "addProject",
      components:{VDistpicker,deptdialog,staffdialog},
      data(){
          return{
            addProgramForm:{
              projectName:'',
              projectMinName:'',
              projectNo:'',
              projectRecordNo:'',
              projectContractNumber:'',
              projectConstructionPermitNo:'',
              projectNature:'',
              projectStatus:'',
              projectStartTime:'',
              projectEndTime:'',
              projectMadeMoney:'',
              projectAreas:'',
              projectLength:'',
              projectAdminUserId:'',
              projectAdminUserName:'',
              projectConstructionUnit:'',
              projectOwnerCompany:'',
              projectFirstParty:'',
              projectDetailAddress:'',
              projectRemark:'',
              area:'',
              projectProvince:'',
              projectCity:'',
              projectCounty:''
            },
            addProgramRules: {
              projectName: [
                {required: true, message: '请输入项目名称', trigger: 'blur'},
              ],
              projectMinName: [
                {required: true, message: '请输入项目简称', trigger: 'blur'},
              ],
              projectAdminUserName: [
                {required: true, message: '请选择项目负责人'},
              ],
              projectConstructionUnit: [
                {required: true, message: '请选择施工单位'},
              ],
              projectMadeMoney:[
                {required: true, message: '请输入项目造价', trigger: 'blur'},
              ],
              projectStartTime:[
                {required: true, message: '请选择开工日期', trigger: 'blur'},
              ],
              projectEndTime:[
                {required: true, message: '请选择竣工日期', trigger: 'blur'},
              ],
              projectStatus:[
                {required: true, message: '请选择项目状态', trigger: 'blur'},
              ],
              projectNature:[
                {required: true, message: '请选择项目性质', trigger: 'blur'},
              ],
            },
            labelWidth:'120px',
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
            companyOptions:[],
            findDeptFlag:false,
            findPersonFlag:false,
            pobj:{
              isShowSingle:true,
              mulArr:null
            }
          }
      },
      created(){
         this.onLoad();
      },
      mounted(){

      },
      methods:{
          onLoad:function () {

          },
        getperson:function(){
          this.findPersonFlag=true;
        },
        getDept:function(){
          this.findDeptFlag=true;
        },
        selectpicker:function(val){
          //console.log(val);
        },
        save:function (formName) {
          var that=this;
          console.log(this.addProgramForm);
          // this.$refs[formName].validate((valid) => {
          //   if (valid) {
          //     api.addProject(this.addProgramForm).then(res=>{
          //       // console.log(res);
          //       if(res.data.success){
          //         that.$message.success({
          //           message: res.data.message,
          //           onClose: s => {
          //             that.$refs[formName].resetFields();
          //             that.$router.replace('/projectManage')
          //           }
          //         });
          //       }else{
          //         that.$message.error(res.data.message);
          //       }
          //     })
          //   } else {
          //     return false;
          //   }
          // })
        },
        cancel:function () {
          this.$confirm('确认取消创建新项目吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$refs['addProgramForm'].resetFields();
            this.$router.replace('/projectManage')
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });
        },
        changeShowDept:function (val) {
          this.findDeptFlag=val;
        },
        changeNode:function (val) {
          this.addProgramForm.projectConstructionUnit=val.text;
          this.findDeptFlag=false;
        },
        changeShowStaff:function (val) {
          this.findPersonFlag=val;
        },
        changeStaff:function (val) {
          this.addProgramForm.projectAdminUserName=val.userName;
          this.addProgramForm.projectAdminUserId=val.userId;
          this.findPersonFlag = false;
        }
      }
    }
</script>

<style scoped>

</style>
