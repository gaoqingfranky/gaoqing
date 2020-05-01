<template>
  <div class="diagbody" style="width:100%;height: auto;overflow: hidden;overflow-y: auto">
    <div class="header">{{tabName}}</div>
    <el-form :model="addform" :rules="addrules" ref="addform">
      <el-row>
        <el-col :span="22" :offset="1">
          <el-form-item label="项目:" :label-width="labelWidth" prop="projectName">
            <el-input v-model="addform.projectName" placeholder="请选择项目" @focus="selectProject"
                      :disabled="projectFlag"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1">
          <el-form-item label="身份证号:" :label-width="labelWidth" prop="idCard">
            <el-input size="medium" v-model="addform.idCard">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1">
          <el-form-item label="姓名:" :label-width="labelWidth" prop="userName">
            <el-input v-model="addform.userName" size="medium" auto-complete="off">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1">
          <el-form-item label="身份证地址:" :label-width="labelWidth" prop="idCardAddress">
            <el-input v-model="addform.idCardAddress" size="medium" auto-complete="off">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1">
          <el-form-item label="性别:" :label-width="labelWidth" prop="sexIndex">
            <el-radio v-model="addform.sexIndex" label="0">男</el-radio>
            <el-radio v-model="addform.sexIndex" label="1">女</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1">
          <el-form-item label="手机号:" :label-width="labelWidth" prop="mobilePhone">
            <el-input v-model="addform.mobilePhone" size="medium" auto-complete="off">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1">
          <el-form-item label="证件有效期:" :label-width="labelWidth" required prop="idCardbeginTime">
            <el-date-picker type="date" placeholder="请选择开始日期"
                            v-model="addform.idCardbeginTime"
                            format="yyyy-MM-dd"
                            style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1">
          <el-form-item label="证件有效期:" :label-width="labelWidth" required prop="idCardEndTime">
            <el-date-picker type="date" placeholder="请选择截止日期"
                            v-model="addform.idCardEndTime"
                            format="yyyy-MM-dd"
                            style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1">
          <el-form-item label="民族:" :label-width="labelWidth" prop="nation">
            <el-input size="medium" v-model="addform.nation">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1">
          <el-form-item label="文化程度:" :label-width="labelWidth" prop="eduLevel">
            <el-select placeholder="请选择" size="medium" v-model="addform.eduLevel">
              <el-option
                v-for="item in edulevelOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1">
          <el-form-item label="签发机关:" :label-width="labelWidth" prop="signingIssueOrganization">
            <el-input v-model="addform.signingIssueOrganization" size="medium"
                      auto-complete="off">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1">
          <el-form-item label="出生日期:" :label-width="labelWidth" prop="birthDay">
            <!--<el-col>-->
            <el-form-item prop="birthDay">
              <el-date-picker type="date" placeholder="请选择"
                              v-model="addform.birthDay"
                              format="yyyy-MM-dd"
                              style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1">
          <el-form-item label="健康状况:" :label-width="labelWidth" prop="healthStatus">
            <el-select placeholder="请选择" size="medium" v-model="addform.healthStatus">
              <el-option
                v-for="item in healthOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1">
          <el-form-item label="政治面貌:" :label-width="labelWidth" prop="politicalOutlook">
            <el-select placeholder="请选择" size="medium" v-model="addform.politicalOutlook">
              <el-option
                v-for="item in politicalOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1">
          <el-form-item label="常住地址:" :label-width="labelWidth" prop="permanentAddress">
            <el-input size="medium" v-model="addform.permanentAddress">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1">
          <el-form-item label="银行卡号:" :label-width="labelWidth" prop="bankNumber">
            <el-input v-model="addform.bankNumber" size="medium" auto-complete="off">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1">
          <el-form-item label="开户行:" :label-width="labelWidth">
            <el-select v-model="addform.bankTypeName"
                       filterable
                       placeholder="请选择"
                       :loading="loading">
              <el-option
                v-for="item in banksOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1">
          <el-form-item label="开户行地址:" :label-width="labelWidth">
            <el-input v-model="addform.openBankAddress" size="medium" auto-complete="off">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1">
          <el-form-item label="岗位:" :label-width="labelWidth" prop="jobName">
            <el-select v-model="addform.jobName" placeholder="请选择">
              <el-option
                v-for="item in jobOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1">
          <el-form-item label="人员类型:" :label-width="labelWidth" prop="contractWorkerType">
            <el-select v-model="addform.contractWorkerType" placeholder="请选择">
              <el-option
                v-for="item in workTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1">
          <el-form-item label="是否需要签到:" :label-width="labelWidth">
            <el-radio v-model="addform.sigin" label="1">需要</el-radio>
            <el-radio v-model="addform.sigin" label="0">不需要</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1">
          <el-form-item label="专业:" :label-width="labelWidth">
            <el-input size="medium" v-model="addform.major">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1">
          <el-form-item label="职称:" :label-width="labelWidth" prop="positionalTitles">
            <el-select v-model="addform.positionalTitles" placeholder="请选择">
              <el-option
                v-for="item in positionTitleOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1">
          <el-form-item label="证书号:" :label-width="labelWidth">
            <el-input v-model="addform.certificateNumber" size="medium" auto-complete="off">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1">
          <el-form-item label="班组:" :label-width="labelWidth" prop="teamId">
            <el-select v-model="addform.teamId" placeholder="请选择">
              <el-option
                v-for="item in teamOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1">
          <el-form-item label="从事工种:" :label-width="labelWidth" prop="workTypeName">
            <input v-model="addform.workTypeName" hidden></input>
            <el-button type="text" size="medium" @click="openTypeDialog">
              {{addform.workTypeName}}
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1">
          <el-form-item label="工资待遇:" :label-width="labelWidth" prop="salary">
            <el-input v-model="addform.salary" size="medium" auto-complete="off">
              <template slot="append">元/工日</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1">
          <el-form-item label="工作时间:" :label-width="labelWidth" prop="workTime">
            <el-input v-model="addform.workTime" size="medium" auto-complete="off">
              <template slot="append">小时/天</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1">
          <el-form-item label="合同开始时间:" :label-width="labelWidth" required prop="contractStartTime">
            <el-date-picker type="date" placeholder="请选择"
                            v-model="addform.contractStartTime"
                            format="yyyy-MM-dd"
                            style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1">
          <el-form-item label="合同截止时间:" :label-width="labelWidth" required prop="contractEndTime">
            <el-date-picker type="date" placeholder="请选择"
                            v-model="addform.contractEndTime"
                            format="yyyy-MM-dd"
                            style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1">
          <el-form-item label="合同期限类型:" :label-width="labelWidth">
            <el-select v-model="addform.contractTimeType" placeholder="请选择">
              <el-option
                v-for="item in contractTimeTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1">
          <el-form-item label="劳务合同编号:" :label-width="labelWidth">
            <el-input size="medium" v-model="addform.laborContractNumber">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1">
          <el-form-item label="劳务合同附件:" :label-width="labelWidth">
            <input hidden v-model="addform.laborContractAppendix"/>
            <el-upload
              :action="otherUpload_url"
              :headers="uploadheaders"
              :on-remove="handleContractRemove"
              :before-remove="beforeRemove"
              :before-upload="beforeUpload"
              :on-success="handleContractSuccess"
              multiple
              :limit="3"
              :file-list="contractFileList"
              :on-preview="handlePreview"
              :on-exceed="handleExceed">
              <el-button type="default">上传</el-button>
              <!--<div slot="tip" class="el-upload__tip">请上传(pdf,jpg,png格式文件)</div>-->
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1">
          <el-form-item label="安全教育附件:" :label-width="labelWidth">
            <input v-model="addform.safetyEducationAnnex" hidden/>
            <el-upload
              :action="otherUpload_url"
              :headers="uploadheaders"
              :on-remove="handleSafeRemove"
              :before-remove="beforeRemove"
              :before-upload="beforeUpload"
              :on-success="handleSafeSuccess"
              multiple
              :file-list="safeEduFileList"
              :on-preview="handlePreview"
              :limit="3"
              :on-exceed="handleExceed">
              <el-button type="default">上传</el-button>
              <!--<div slot="tip" class="el-upload__tip">请上传(pdf,jpg,png格式文件)</div>-->
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1">
          <el-form-item label="资质相关:" :label-width="labelWidth">
            <input hidden v-model="addform.qualifications"/>
            <el-upload
              :action="otherUpload_url"
              :headers="uploadheaders"
              :on-remove="handleQualifRemove"
              :before-remove="beforeRemove"
              :before-upload="beforeUpload"
              :on-success="handleQualifSuccess"
              multiple
              :file-list="qualifeFileList"
              :on-preview="handlePreview">
              <el-button type="default">上传</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1">
          <el-form-item label="身份证正面照:" :label-width="labelWidth">
            <input hidden v-model="addform.frontPhotoIDCard"/>
            <el-upload
              class="avatar-uploader"
              :action="idnoUpload_url"
              :headers="uploadheaders"
              :show-file-list="false"
              :on-success="handleFrontIdCardSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="addform.frontPhotoIDCard" :src="addform.frontPhotoIDCard"
                   class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1">
          <el-form-item label="身份证反面照:" :label-width="labelWidth">
            <input hidden v-model="addform.counterPhotoIDCard"/>
            <el-upload
              class="avatar-uploader"
              :action="idnoUpload_url"
              :headers="uploadheaders"
              :show-file-list="false"
              :on-success="handleBackIdCardSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="addform.counterPhotoIDCard" :src="addform.counterPhotoIDCard"
                   class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1">
          <el-form-item label="人脸识别照片:" :label-width="labelWidth">
            <input hidden v-model="addform.faceRecognitionPhotos"/>
            <el-upload
              class="avatar-uploader"
              :action="idnoUpload_url"
              :headers="uploadheaders"
              :show-file-list="false"
              :on-success="handleFaceAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="addform.faceRecognitionPhotos" :src="addform.faceRecognitionPhotos"
                   class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1">
          <el-form-item label="银行卡照片:" :label-width="labelWidth">
            <input hidden v-model="addform.bankCardPhotos"/>
            <el-upload
              class="avatar-uploader"
              :action="bankUpload_url"
              :headers="uploadheaders"
              :show-file-list="false"
              :on-success="handleBankAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="addform.bankCardPhotos" :src="addform.bankCardPhotos" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1">
          <el-form-item label="是否在岗:" :label-width="labelWidth">
            <el-radio v-model="addform.contractWorkerStatus" label="1">在岗</el-radio>
            <el-radio v-model="addform.contractWorkerStatus" label="0">离岗</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1">
          <el-form-item label="入职时间:" :label-width="labelWidth" prop="entryTime">
            <el-date-picker type="date" placeholder="请选择"
                            v-model="addform.entryTime"
                            format="yyyy-MM-dd"
                            style="width: 100%;">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1">
          <el-form-item label="入场承诺书/证明:" :label-width="labelWidth">
            <input v-model="addform.admissionLetter" hidden></input>
            <el-upload
              :action="otherUpload_url"
              :headers="uploadheaders"
              :on-remove="handleAdmissRemove"
              :before-remove="beforeRemove"
              :before-upload="beforeUpload"
              :on-success="handleAdmissSuccess"
              multiple
              :limit="3"
              :file-list="admissFileList"
              :on-exceed="handleExceed"
              :on-preview="handlePreview">
              <el-button type="default">上传</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1">
          <el-form-item label="工商保险附件:" :label-width="labelWidth">
            <input v-model="addform.industrialCommercialInsuranceAnnex" hidden></input>
            <el-upload
              :action="otherUpload_url"
              :headers="uploadheaders"
              :on-remove="handleAnnexRemove"
              :before-remove="beforeRemove"
              :before-upload="beforeUpload"
              :on-success="handleAnnexSuccess"
              multiple
              :limit="3"
              :file-list="indusFileList"
              :on-exceed="handleExceed"
              :on-preview="handlePreview">
              <el-button type="default">上传</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1">
          <el-form-item label="离职时间:" :label-width="labelWidth">
            <el-date-picker type="date" placeholder="请选择"
                            v-model="addform.departureTime"
                            format="yyyy-MM-dd"
                            style="width: 100%;">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1">
          <el-form-item label="退场确认书/证明:" :label-width="labelWidth">
            <input v-model="addform.exitPromises" hidden></input>
            <el-upload
              :action="otherUpload_url"
              :headers="uploadheaders"
              :on-remove="handleExitRemove"
              :before-remove="beforeRemove"
              :before-upload="beforeUpload"
              :on-success="handleExitSuccess"
              multiple
              :limit="3"
              :file-list="exitFileList"
              :on-exceed="handleExceed"
              :on-preview="handlePreview">
              <el-button type="default">上传</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1">
          <el-form-item label="工资结算证明:" :label-width="labelWidth">
            <input v-model="addform.certificateWageSettlement" hidden></input>
            <el-upload
              :action="otherUpload_url"
              :headers="uploadheaders"
              :on-remove="handleSalaryRemove"
              :before-remove="beforeRemove"
              :before-upload="beforeUpload"
              :on-success="handleSalarySuccess"
              multiple
              :limit="3"
              :file-list="wageFileList"
              :on-exceed="handleExceed"
              :on-preview="handlePreview">
              <el-button type="default">上传</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer" style="padding:20px;text-align: center">
      <el-button type="primary" @click="submitaddForm('addform')">确 定</el-button>
      <el-button @click="closeDialog">返回</el-button>
    </div>
    <el-dialog title="选择工种" :visible.sync="workerTypedialogVisible" :width="dialogWidth">
      <div style="width:100%;height: 400px;background-color:#EBEFF4;padding: 15px;overflow: hidden;overflow-y: scroll">
        <div style="width:100%">
            <el-row :gutter="20">
              <el-col :span="16">
                <el-input v-model="inputworktype" placeholder="请输入工种/岗位名称"></el-input>
              </el-col>
              <el-col :span="8">
                <el-button type="primary" @click="searchWorkType">查询</el-button>
              </el-col>
            </el-row>
            <el-checkbox-group v-model="workTypeList">
              <el-button v-for="(item,index) in workTypeList" :key="index" style="margin-top: 20px"
                         @click="changeworkType(item)">{{item.typeOfWorkName}}
              </el-button>
            </el-checkbox-group>
          </div>
        </div>
    </el-dialog>
    <projectDialog :isShowProjectDialog="projectDialogFlag" @on-result-change="changeShowProject"
                    @selectNode="changeProjectNode"></projectDialog>
  </div>


</template>

<script>
 import api from '../utils/api'
 import local from '../utils/local'
  import projectDialog from './projectDialog'
  export default {
    name: "workerFrame",
    components: {projectDialog},
    props: {
      frameType: {
        type: Object
      }
    },
    data() {
      return {
        labelWidth:'120px',
        openFlag: this.frameType.type,
        rowForm: this.frameType.rowForm,
        tabName: '',
        projectFlag: false,
        projectDialogFlag: false,
        addform: {
          projectId: '',
          projectName: '',
          idCard: '',
          userName: '',
          idCardAddress: '',
          sexIndex: '0',
          mobilePhone: '',
          idCardbeginTime: '',
          idCardEndTime: '',
          nation: '',
          eduLevel: '',
          signingIssueOrganization: '',
          birthDay: '',
          healthStatus: '',
          politicalOutlook: '',
          permanentAddress: '',
          bankNumber: '',
          bankTypeName: '',
          openBankAddress: '',
          jobName: '',
          contractWorkerType: '',
          sigin: '0',
          major: '',
          positionalTitles: '',
          certificateNumber: '',
          teamId: '',
          workTypeName: '普工',
          salary: '',
          workTime: '',
          contractStartTime: '',
          contractEndTime: '',
          contractTimeType: '',
          laborContractNumber: '',
          laborContractAppendix: '',
          safetyEducationAnnex: '',
          qualifications: '',
          frontPhotoIDCard: '',
          counterPhotoIDCard: '',
          faceRecognitionPhotos: '',
          bankCardPhotos: '',
          entryTime: '',
          admissionLetter: '',
          industrialCommercialInsuranceAnnex: '',
          departureTime: '',
          contractWorkerStatus: '1', //1在岗，0 离岗
          exitPromises: '',
          certificateWageSettlement: ''
        },
        addrules: {
          projectName: [
            {required: true, message: '请选择项目', trigger: 'change'}
          ],
          userName: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ],
          idCard: [
            {required: true, message: '请输入身份证号码', trigger: 'blur'}
          ],
          idCardAddress: [
            {required: true, message: '请输入身份证地址', trigger: 'blur'}
          ],
          sexIndex: [
            {required: true, message: '请选择性别', trigger: 'blur'}
          ],
          mobilePhone: [
            {required: true, message: '请选择手机号码', trigger: 'blur'}
          ],
          nation: [
            {required: true, message: '请输入民族', trigger: 'blur'}
          ],
          eduLevel: [
            {required: true, message: '请选择文化程度', trigger: 'change'}
          ],
          signingIssueOrganization: [
            {required: true, message: '请输入签发机关', trigger: 'blur'}
          ],
          birthDay: [
            {required: true, message: '请选择出生日期', trigger: 'blur'}
          ],
          healthStatus: [
            {required: true, message: '请选择健康状况', trigger: 'change'}
          ],
          politicalOutlook: [
            {required: true, message: '请选择政治面貌', trigger: 'change'}
          ],
          jobName: [
            {required: true, message: '请选择岗位', trigger: 'change'}
          ],
          salary: [
            {required: true, message: '请输入工资待遇', trigger: 'blur'}
          ],
          workTime: [
            {required: true, message: '请输入工作时间', trigger: 'blur'}
          ],
          contractStartTime: [
            {required: true, message: '请选择合同起始时间', trigger: 'blur'}
          ],
          contractEndTime: [
            {required: true, message: '请选择合同结束时间', trigger: 'blur'}
          ],
          entryTime: [
            {required: true, message: '请选择入职时间', trigger: 'blur'}
          ]
        },
        customTypeList: [],
        contractFileList: [],
        safeEduFileList: [],
        qualifeFileList: [],
        admissFileList: [],
        indusFileList: [],
        exitFileList: [],
        wageFileList: [],
        edulevelOptions: [
          {
            value: '高中毕业及以下',
            label: '高中毕业及以下'
          },
          {
            value: '专科',
            label: '专科'
          },
          {
            value: '本科',
            label: '本科'
          },
          {
            value: '硕士',
            label: '硕士'
          },
          {
            value: '博士',
            label: '博士'
          },
          {
            value: '其他',
            label: '其他'
          },
        ],
        healthOptions: [
          {
            value: '健康',
            label: '健康'
          },
          {
            value: '亚健康',
            label: '亚健康'
          },
          {
            value: '病体',
            label: '病体'
          },
          {
            value: '一级残疾',
            label: '一级残疾'
          },
          {
            value: '二级残疾',
            label: '二级残疾'
          },
          {
            value: '三级残疾',
            label: '三级残疾'
          },
          {
            value: '四级残疾',
            label: '四级残疾'
          },
          {
            value: '其他',
            label: '其他'
          },
        ],
        politicalOptions: [
          {
            value: '中共党员',
            label: '中共党员'
          },
          {
            value: '中共预备党员',
            label: '中共预备党员'
          },
          {
            value: '共青团员',
            label: '共青团员'
          },
          {
            value: '民革党员',
            label: '民革党员'
          },
          {
            value: '民盟盟员',
            label: '民盟盟员'
          },
          {
            value: '民建会员',
            label: '民建会员'
          },
          {
            value: '民进会员',
            label: '民进会员'
          },
          {
            value: '农工党党员',
            label: '农工党党员'
          },
          {
            value: '致公党党员',
            label: '致公党党员'
          },
          {
            value: '九三学社社员',
            label: '九三学社社员'
          },
          {
            value: '台盟盟员',
            label: '台盟盟员'
          },
          {
            value: '无党派民主人士',
            label: '无党派民主人士'
          },
          {
            value: '群众',
            label: '群众'
          },
        ],
        banksOptions: [
          {
            value: '银联商务（收单）',
            label: '银联商务（收单）'
          },
          {
            value: '中国邮政储蓄银行（收单）',
            label: '中国邮政储蓄银行（收单）'
          },
          {
            value: '中国工商银行',
            label: '中国工商银行'
          },
          {
            value: '中国农业银行',
            label: '中国农业银行'
          },
          {
            value: '中国银行',
            label: '中国银行'
          },
          {
            value: '中国建设银行',
            label: '中国建设银行'
          },
          {
            value: '国家开发银行',
            label: '国家开发银行'
          },
          {
            value: '中国进出口银行',
            label: '中国进出口银行'
          },
          {
            value: '中国农业发展银行',
            label: '中国农业发展银行'
          },
          {
            value: '交通银行',
            label: '交通银行'
          },
          {
            value: '中信银行',
            label: '中信银行'
          },
          {
            value: '中国光大银行',
            label: '中国光大银行'
          },
          {
            value: '华夏银行',
            label: '华夏银行'
          },
          {
            value: '中国民生银行',
            label: '中国民生银行'
          },
          {
            value: '广东发展银行',
            label: '广东发展银行'
          },
          {
            value: '深圳发展银行',
            label: '深圳发展银行'
          },
          {
            value: '招商银行',
            label: '招商银行'
          },
          {
            value: '兴业银行',
            label: '兴业银行'
          },
          {
            value: '上海浦东发展银行',
            label: '上海浦东发展银行'
          },
          {
            value: '上海银联商务/东莞商业银行',
            label: '上海银联商务/东莞商业银行'
          },
          {
            value: '城市商业银行',
            label: '城市商业银行'
          },
          {
            value: '农村商业银行（江苏）',
            label: '农村商业银行（江苏）'
          },
          {
            value: '恒丰银行',
            label: '恒丰银行'
          },
          {
            value: '农村合作银行',
            label: '农村合作银行'
          },
          {
            value: '渤海银行股份有限公司',
            label: '渤海银行股份有限公司'
          },
          {
            value: '徽商银行股份有限公司',
            label: '徽商银行股份有限公司'
          },
          {
            value: '镇银行有限责任公司',
            label: '镇银行有限责任公司'
          },
          {
            value: '城市信用社',
            label: '城市信用社'
          },
          {
            value: '农村信用社（含北京农村商业银行）、东莞农信',
            label: '农村信用社（含北京农村商业银行）、东莞农信'
          },
          {
            value: '中国邮政储蓄银行（代收付）',
            label: '中国邮政储蓄银行（代收付）'
          },
          {
            value: '汇丰银行',
            label: '汇丰银行'
          },
          {
            value: '东亚银行',
            label: '东亚银行'
          },
          {
            value: '南洋商业银行',
            label: '南洋商业银行'
          },
          {
            value: '恒生银行(中国)有限公司',
            label: '恒生银行(中国)有限公司'
          },
          {
            value: '中国银行（香港）有限公司',
            label: '中国银行（香港）有限公司'
          },
          {
            value: '集友银行有限公司',
            label: '集友银行有限公司'
          },
          {
            value: '创兴银行有限公司',
            label: '创兴银行有限公司'
          },
          {
            value: '永亨银行（中国）有限公司',
            label: '永亨银行（中国）有限公司'
          },
          {
            value: '永隆银行',
            label: '永隆银行'
          },
          {
            value: '花旗银行（中国）有限公司',
            label: '花旗银行（中国）有限公司'
          },
          {
            value: '美国银行有限公司',
            label: '美国银行有限公司'
          },
          {
            value: '摩根大通银行(中国)有限公司',
            label: '摩根大通银行(中国)有限公司'
          },
          {
            value: '三菱东京日联银行(中国）有限公司',
            label: '三菱东京日联银行(中国）有限公司'
          },
          {
            value: '日本三井住友银行股份有限公司',
            label: '日本三井住友银行股份有限公司'
          },
          {
            value: '瑞穗实业银行（中国）有限公司',
            label: '瑞穗实业银行（中国）有限公司'
          },
          {
            value: '日本山口银行股份有限公司',
            label: '日本山口银行股份有限公司'
          },
          {
            value: '韩国外换银行股份有限公司',
            label: '韩国外换银行股份有限公司'
          },
          {
            value: '友利银行(中国)有限公司',
            label: '友利银行(中国)有限公司'
          },
          {
            value: '韩国产业银行',
            label: '韩国产业银行'
          },
          {
            value: '新韩银行(中国)有限公司',
            label: '新韩银行(中国)有限公司'
          },
          {
            value: '韩国中小企业银行有限公司',
            label: '韩国中小企业银行有限公司'
          },
          {
            value: '韩亚银行（中国）有限公司',
            label: '韩亚银行（中国）有限公司'
          },
          {
            value: '华侨银行（中国）有限公司',
            label: '华侨银行（中国）有限公司'
          },
          {
            value: '大华银行（中国）有限公司',
            label: '大华银行（中国）有限公司'
          },
          {
            value: '星展银行（中国）有限公司',
            label: '星展银行（中国）有限公司'
          },
          {
            value: '泰国盘谷银行(大众有限公司)',
            label: '泰国盘谷银行(大众有限公司)'
          },
          {
            value: '奥地利中央合作银行股份有限公司',
            label: '奥地利中央合作银行股份有限公司'
          },
          {
            value: '比利时联合银行股份有限公司',
            label: '比利时联合银行股份有限公司'
          },
          {
            value: '比利时富通银行有限公司',
            label: '比利时富通银行有限公司'
          },
          {
            value: '荷兰银行',
            label: '荷兰银行'
          },
          {
            value: '荷兰安智银行股份有限公司',
            label: '荷兰安智银行股份有限公司'
          },
          {
            value: '渣打银行',
            label: '渣打银行'
          },
          {
            value: '英国苏格兰皇家银行公众有限公司',
            label: '英国苏格兰皇家银行公众有限公司'
          },
          {
            value: '法国兴业银行（中国)有限公司',
            label: '法国兴业银行（中国)有限公司'
          }, {
            value: '法国东方汇理银行股份有限公司',
            label: '法国东方汇理银行股份有限公司'
          },
          {
            value: '法国外贸银行股份有限公司',
            label: '法国外贸银行股份有限公司'
          },
          {
            value: '德国德累斯登银行股份公司',
            label: '德国德累斯登银行股份公司'
          },
          {
            value: '德意志银行（中国）有限公',
            label: '德意志银行（中国）有限公'
          },
          {
            value: '德国商业银行股份有限公司',
            label: '德国商业银行股份有限公司'
          },
          {
            value: '德国西德银行股份有限公司',
            label: '德国西德银行股份有限公司'
          },
          {
            value: '德国巴伐利亚州银行',
            label: '德国巴伐利亚州银行'
          },
          {
            value: '德国北德意志州银行',
            label: '德国北德意志州银行'
          },
          {
            value: '意大利联合圣保罗银行股份有限公司',
            label: '意大利联合圣保罗银行股份有限公司'
          },
          {
            value: '瑞士信贷银行股份有限公司',
            label: '瑞士信贷银行股份有限公司'
          },
          {
            value: '瑞士银行',
            label: '瑞士银行'
          },
          {
            value: '加拿大丰业银行有限公司',
            label: '加拿大丰业银行有限公司'
          },
          {
            value: '加拿大蒙特利尔银行有限公司',
            label: '加拿大蒙特利尔银行有限公司'
          },
          {
            value: '澳大利亚和新西兰银行集团有限公司',
            label: '澳大利亚和新西兰银行集团有限公司'
          },
          {
            value: '摩根士丹利国际银行（中国）有限公',
            label: '摩根士丹利国际银行（中国）有限公'
          },
          {
            value: '联合银行(中国)有限公司',
            label: '联合银行(中国)有限公司'
          },
          {
            value: '荷兰合作银行有限公司',
            label: '荷兰合作银行有限公司'
          },
          {
            value: '厦门国际银行',
            label: '厦门国际银行'
          },
          {
            value: '法国巴黎银行（中国）有限公司',
            label: '法国巴黎银行（中国）有限公司'
          },
          {
            value: '华商银行',
            label: '华商银行'
          },
          {
            value: '华一银行',
            label: '华一银行'
          },
          {
            value: '广东农村信用合作社（收单）',
            label: '广东农村信用合作社（收单）'
          },
          {
            value: '(澳门地区)银行',
            label: '(澳门地区)银行'
          },
          {
            value: '(香港地区)银行',
            label: '(香港地区)银行'
          },
        ],
        jobOptions: [
          {
            value: '其他人员',
            label: '其他人员'
          },
          {
            value: '项目管理人员',
            label: '项目管理人员'
          },
          {
            value: '特殊作业人员',
            label: '特殊作业人员'
          },
          {
            value: '一般作业人员',
            label: '一般作业人员'
          },
        ],
        workTypeOptions: [
          {
            value: '劳务工人',
            label: '劳务工人'
          },
          {
            value: '建设单位管理人员',
            label: '建设单位管理人员'
          },
          {
            value: '监理单位管理人员',
            label: '监理单位管理人员'
          },
          {
            value: '施工单位管理人员',
            label: '施工单位管理人员'
          },
          {
            value: '其他参建单位管理人员',
            label: '其他参建单位管理人员'
          },
        ],
        positionTitleOptions: [
          {
            value: '高级工程师',
            label: '高级工程师'
          },
          {
            value: '助理工程师',
            label: '助理工程师'
          },
          {
            value: '会计师',
            label: '会计师'
          },
          {
            value: '讲师',
            label: '讲师'
          },
          {
            value: '工程师',
            label: '工程师'
          },
          {
            value: '经济师',
            label: '经济师'
          },
          {
            value: '技术员',
            label: '技术员'
          },
        ],
        contractTimeTypeOptions: [
          {
            value: '固定期限合同',
            label: '固定期限合同'
          },
          {
            value: '是以完成一定工作为期限的合同',
            label: '是以完成一定工作为期限的合同'
          },
        ],
        teamOptions: [],
        loading: false,
        workerTypedialogVisible: false,
        updateWorkinfo_url: '/LaborManagerAPI/UpdateContractWorker',
        idnoUpload_url: process.env.VUE_APP_BASE_API + '/Upload/IDCarPic',
        bankUpload_url: process.env.VUE_APP_BASE_API + '/Upload/bankCardPic',
        otherUpload_url: process.env.VUE_APP_BASE_API + '/Upload/OtherFile',
        formSubmit_url: '/LaborManagerAPI/AddContractWorker',
        basetype_url: '/LaborManagerAPI/GetBaseWorkType',
        uploadheaders: {  //上传图片headers
          'Authorization': local.get('USERTOKEN')
        },
        inputworktype: '',
        workTypeList: [],
        allworkType: [],
        customType: '',
        dialogWidth:''
      }
    },
    created: function () {
      this.onLoad();
    },
    mounted(){
      this.setDialogWidth()
    },
    methods: {
      onLoad: function () {
        var that = this;
        if (this.openFlag == '0') { //增加劳工
          this.tabName = '添加劳工';
          this.projectFlag = false;
        } else {
          this.tabName = "编辑劳工";
          this.projectFlag = true;
          this.addform = this.rowForm;
          var row = this.rowForm;
          // console.log(this.rowForm);
          var carr = [];
          if (!this.isNull(row.laborContractAppendix)) { //劳动合同
            var karr = [];
            karr = row.laborContractAppendix.split(',');
            //console.log(karr);
            if (karr != '' && karr != null && karr.length > 0) {
              karr.forEach(function (item) {
                if (!that.isNull(item)) {
                  var pmodel = {
                    'name': item.substring(item.indexOf('_') + 1, item.length),
                    'url': item
                  };
                  carr.push(pmodel);
                }
              })
            } else {
              var model = {
                'name': row.laborContractAppendix.split('_')[1],
                'url': row.laborContractAppendix
              };
              carr.push(model);
            }
          }
          this.contractFileList = carr;
          var safearr = [];
          if (!this.isNull(row.safetyEducationAnnex)) { //安全教育
            var skarr = [];
            skarr = row.safetyEducationAnnex.split(',');
            //console.log(karr);
            if (skarr != '' && skarr != null && skarr.length > 0) {
              skarr.forEach(function (item) {
                if (!that.isNull(item)) {
                  var pmodel = {
                    'name': item.substring(item.indexOf('_') + 1, item.length),
                    'url': item
                  };
                  safearr.push(pmodel);
                }
              })
            } else {
              var model = {
                'name': row.safetyEducationAnnex.split('_')[1],
                'url': row.safetyEducationAnnex
              };
              safearr.push(model);
            }
          }
          this.safeEduFileList = safearr;
          var qarr = [];
          if (!this.isNull(row.qualifications)) { //资质相关
            var qkarr = [];
            qkarr = row.qualifications.split(',');
            //console.log(karr);
            if (qkarr != '' && qkarr != null && qkarr.length > 0) {
              qkarr.forEach(function (item) {
                if (!that.isNull(item)) {
                  var pmodel = {
                    'name': item.substring(item.indexOf('_') + 1, item.length),
                    'url': item
                  };
                  qarr.push(pmodel);
                }
              })
            } else {
              var model = {
                'name': row.qualifications.split('_')[1],
                'url': row.qualifications
              };
              qarr.push(model);
            }
          }
          this.qualifeFileList = qarr;
          var alarr = [];
          if (!this.isNull(row.admissionLetter)) { //入场证明
            var akarr = [];
            akarr = row.admissionLetter.split(',');
            //console.log(karr);
            if (akarr != '' && akarr != null && akarr.length > 0) {
              akarr.forEach(function (item) {
                if (!that.isNull(item)) {
                  var pmodel = {
                    'name': item.substring(item.indexOf('_') + 1, item.length),
                    'url': item
                  };
                  alarr.push(pmodel);
                }
              })
            } else {
              var model = {
                'name': row.admissionLetter.split('_')[1],
                'url': row.admissionLetter
              };
              alarr.push(model);
            }
          }
          this.admissFileList = alarr;
          var iarr = [];
          if (!this.isNull(row.industrialCommercialInsuranceAnnex)) { //工商保险
            var ikarr = [];
            ikarr = row.industrialCommercialInsuranceAnnex.split(',');
            //console.log(karr);
            if (ikarr != '' && ikarr != null && ikarr.length > 0) {
              ikarr.forEach(function (item) {
                if (!that.isNull(item)) {
                  var pmodel = {
                    'name': item.substring(item.indexOf('_') + 1, item.length),
                    'url': item
                  };
                  iarr.push(pmodel);
                }
              })
            } else {
              var model = {
                'name': row.industrialCommercialInsuranceAnnex.split('_')[1],
                'url': row.industrialCommercialInsuranceAnnex
              };
              iarr.push(model);
            }
          }
          this.indusFileList = iarr;
          var earr = [];
          if (!this.isNull(row.exitPromises)) { //退场证明
            var ekarr = [];
            ekarr = row.exitPromises.split(',');
            //console.log(karr);
            if (ekarr != '' && ekarr != null && ekarr.length > 0) {
              ekarr.forEach(function (item) {
                if (!that.isNull(item)) {
                  var pmodel = {
                    'name': item.substring(item.indexOf('_') + 1, item.length),
                    'url': item
                  };
                  earr.push(pmodel);
                }
              })
            } else {
              var model = {
                'name': row.exitPromises.split('_')[1],
                'url': row.exitPromises
              };
              earr.push(model);
            }
          }
          this.exitFileList = earr;
          var warr = [];
          if (!this.isNull(row.certificateWageSettlement)) { //工资结算
            var wkarr = [];
            wkarr = row.certificateWageSettlement.split(',');
            //console.log(karr);
            if (wkarr != '' && wkarr != null && wkarr.length > 0) {
              wkarr.forEach(function (item) {
                if (!that.isNull(item)) {
                  var pmodel = {
                    'name': item.substring(item.indexOf('_') + 1, item.length),
                    'url': item
                  };
                  warr.push(pmodel);
                }
              })
            } else {
              var model = {
                'name': row.certificateWageSettlement.split('_')[1],
                'url': row.certificateWageSettlement
              };
              warr.push(model);
            }
          }
          this.wageFileList = warr;
        }
      },
      submitaddForm: function (formName) {
        //console.log(this.addform);
        var that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //console.log(that.addform);
            if (this.openFlag == '0') { //增加劳工
              api.addWorker(that.addform).then(res => {
                //console.log(res);
                if (res.data.success) {
                  //console.log(res.data.data);
                  this.$message.success({
                    message: "添加成功",
                    onClose: s => {
                      this.$router.replace("/workerManage");
                    }
                  });

                }
              })
            }
            if (this.openFlag == '1') { //修改劳工
              //console.log(this.addform)
              api.updateWorkerInfo(this.addform).then(res => {
                if (res.data.success) {
                  //console.log(res.data.data);
                  that.$message.success({
                    message: "修改成功",
                    onClose: s => {
                      that.$router.replace({
                        path: '/workerManage',
                        name: 'workerManage',
                        params: {
                          projectId: that.addform.projectId,
                          projectName: that.addform.projectName
                        }
                      });
                    }
                  });

                }
              })
            }

          } else {
            //console.log('error submit!!');
            //console.log(that.form.unitType);
            return false;
          }
        })

      },
      removeArray: function (_arr, _obj) {
        let length = _arr.length;
        for (let i = 0; i < length; i++) {
          if (_arr[i] === _obj) {
            if (i === 0) {
              _arr.shift(); //删除并返回数组的第一个元素
              return _arr;
            }
            else if (i === length - 1) {
              _arr.pop();  //删除并返回数组的最后一个元素
              return _arr;
            }
            else {
              _arr.splice(i, 1); //删除下标为i的元素
              return _arr;
            }
          }
        }
      },
      isNull: function (val) {
        if (val == undefined || val == null || val == "" || val.replace(/(^s*)|(s*$)/g, "").length == 0)
          return true;
        return false;
      }
      ,
      closeDialog: function () {
        this.$router.replace('/workerManage')
      }
      ,
      handlePreview(file) {
        //console.log(file);
        if (file.status == 'success') {
          window.open(file.url);
        }
      }
      ,
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择只能上传 3 个文件!`);
      }
      ,
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
      ,
      beforeUpload(file) {
        // console.log(file.type);
        var pictype = false;
        if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'application/pdf') {
          pictype = true;
        }
        var isLt2M = file.size / 1024 / 1024 < 2;

        if (!pictype) {
          this.$message.error('上传图片只能是 JPG,PNG或者PDF 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return pictype && isLt2M;
      }
      ,
      handleContractRemove(file, filelist) {//劳动合同删除后调用
        if (filelist.length > 1) {
          var that = this;
          var str = '';
          filelist.forEach(function (item) {
            str += item.url + ',';
          });
          that.addform.laborContractAppendix = str;
        } else if (filelist.length == 1) {
          this.addform.laborContractAppendix = filelist[0].url;
        } else {
          this.addform.laborContractAppendix = '';
        }
        this.contractFileList = filelist;
        // console.log(filelist);
        // console.log( this.addform.laborContractAppendix);
      }
      ,
      handleContractSuccess: function (res, file, filelist) { //劳动合同上传成功调用
        if (res.success) {
          this.$message.success('文件上传成功');
          if (this.isNull(this.addform.laborContractAppendix)) {
            this.addform.laborContractAppendix = file.response.data;
          } else {
            this.addform.laborContractAppendix += ',' + file.response.data;
          }
          var model = {
            'name': file.name,
            'url': file.response.data
          };
          this.contractFileList.push(model);
        }
      }
      ,
      handleSafeRemove(file, filelist) {//安全教育删除后调用
        if (filelist.length > 1) {
          var that = this;
          var str = '';
          filelist.forEach(function (item) {
            str += item.url + ',';
          });
          that.addform.safetyEducationAnnex = str;
        } else if (filelist.length == 1) {
          this.addform.safetyEducationAnnex = filelist[0].url;
        } else {
          this.addform.safetyEducationAnnex = '';
        }
        this.safeEduFileList = filelist;
      }
      ,
      handleSafeSuccess: function (res, file, filelist) { //安全教育上传成功调用
        if (res.success) {
          this.$message.success('文件上传成功');
          if (this.isNull(this.addform.safetyEducationAnnex)) {
            this.addform.safetyEducationAnnex = file.response.data;
          } else {
            this.addform.safetyEducationAnnex += ',' + file.response.data;
          }
          var model = {
            'name': file.name,
            'url': file.response.data
          };
          this.safeEduFileList.push(model);
        }
      }
      ,
      handleQualifRemove(file, filelist) {//资质相关删除后调用
        if (filelist.length > 1) {
          var that = this;
          var str = '';
          filelist.forEach(function (item) {
            str += item.url + ',';
          });
          that.addform.qualifications = str;
        } else if (filelist.length == 1) {
          this.addform.qualifications = filelist[0].url;
        } else {
          this.addform.qualifications = '';
        }
        this.qualifeFileList = filelist;
      }
      ,
      handleQualifSuccess: function (res, file, filelist) { //资质相关上传成功调用
        if (res.success) {
          this.$message.success('文件上传成功');
          if (this.isNull(this.addform.qualifications)) {
            this.addform.qualifications = file.response.data;
          } else {
            this.addform.qualifications += ',' + file.response.data;
          }
          var model = {
            'name': file.name,
            'url': file.response.data
          };
          this.qualifeFileList.push(model);
        }
      }
      ,
      handleAdmissRemove(file, filelist) {//入场证明删除后调用
        if (filelist.length > 1) {
          var that = this;
          var str = '';
          filelist.forEach(function (item) {
            str += item.url + ',';
          });
          that.addform.admissionLetter = str;
        } else if (filelist.length == 1) {
          this.addform.admissionLetter = filelist[0].url;
        } else {
          this.addform.admissionLetter = '';
        }
        this.admissFileList = filelist;
      }
      ,
      handleAdmissSuccess: function (res, file, filelist) { //入场证明上传成功调用
        if (res.success) {
          this.$message.success('文件上传成功');
          if (this.isNull(this.addform.admissionLetter)) {
            this.addform.admissionLetter = file.response.data;
          } else {
            this.addform.admissionLetter += ',' + file.response.data;
          }
          var model = {
            'name': file.name,
            'url': file.response.data
          };
          this.admissFileList.push(model);
        }
      }
      ,
      handleAnnexRemove(file, filelist) {//工商保险删除后调用
        if (filelist.length > 1) {
          var that = this;
          var str = '';
          filelist.forEach(function (item) {
            str += item.url + ',';
          });
          that.addform.industrialCommercialInsuranceAnnex = str;
        } else if (filelist.length == 1) {
          this.addform.industrialCommercialInsuranceAnnex = filelist[0].url;
        } else {
          this.addform.industrialCommercialInsuranceAnnex = '';
        }
        this.indusFileList = filelist;
      }
      ,
      handleAnnexSuccess: function (res, file, filelist) { //工商保险上传成功调用
        if (res.success) {
          this.$message.success('文件上传成功');
          if (this.isNull(this.addform.industrialCommercialInsuranceAnnex)) {
            this.addform.industrialCommercialInsuranceAnnex = file.response.data;
          } else {
            this.addform.industrialCommercialInsuranceAnnex += ',' + file.response.data;
          }
          var model = {
            'name': file.name,
            'url': file.response.data
          };
          this.indusFileList.push(model);
        }

      }
      ,
      handleExitRemove(file, filelist) {//退场删除后调用
        if (filelist.length > 1) {
          var that = this;
          var str = '';
          filelist.forEach(function (item) {
            str += item.url + ',';
          });
          that.addform.exitPromises = str;
        } else if (filelist.length == 1) {
          this.addform.exitPromises = filelist[0].url;
        } else {
          this.addform.exitPromises = '';
        }
        this.exitFileList = filelist;
      }
      ,
      handleExitSuccess: function (res, file, filelist) { //退场证明上传成功调用
        if (res.success) {
          this.$message.success('文件上传成功');
          if (this.isNull(this.addform.exitPromises)) {
            this.addform.exitPromises = file.response.data;
          } else {
            this.addform.exitPromises += ',' + file.response.data;
          }
          var model = {
            'name': file.name,
            'url': file.response.data
          };
          this.exitFileList.push(model);
        }
      }
      ,
      handleSalaryRemove(file, filelist) {//工资结算删除后调用wageFileList
        if (filelist.length > 1) {
          var that = this;
          var str = '';
          filelist.forEach(function (item) {
            str += item.url + ',';
          });
          that.addform.exitPromises = str;
        } else if (filelist.length == 1) {
          this.addform.certificateWageSettlement = filelist[0].url;
        } else {
          this.addform.certificateWageSettlement = '';
        }
        this.wageFileList = filelist;
        //console.log(this.addform.certificateWageSettlement);
      }
      ,
      handleSalarySuccess: function (res, file, filelist) { //工资结算证明上传成功
        if (res.success) {
          this.$message.success('文件上传成功');
          if (this.isNull(this.addform.certificateWageSettlement)) {
            this.addform.certificateWageSettlement = file.response.data;
          } else {
            this.addform.certificateWageSettlement += ',' + file.response.data;
          }
          var model = {
            'name': file.name,
            'url': file.response.data
          };
          this.wageFileList.push(model);
        }
        //console.log(this.addform.certificateWageSettlement);
      }
      ,
      handleFrontIdCardSuccess: function (res, file) {//身份证正面照上传成功回调
        if (res.success) {
          this.addform.frontPhotoIDCard = res.data;
          this.$message.success('图片上传成功');
        }
      }
      ,
      handleBackIdCardSuccess: function (res, file) {//身份证反面照上传成功回调
        if (res.success) {
          this.addform.counterPhotoIDCard = res.data;
          this.$message.success('图片上传成功');
        }
      }
      ,
      handleFaceAvatarSuccess: function (res, file) {//人脸识别照上传成功回调
        if (res.success) {
          this.addform.faceRecognitionPhotos = res.data;
          this.$message.success('图片上传成功');
        }
      }
      ,
      handleBankAvatarSuccess: function (res, file) {//银行卡照上传成功回调
        if (res.success) {
          this.addform.bankCardPhotos = res.data;
          this.$message.success('图片上传成功');
        }
      }
      ,
      beforeAvatarUpload(file) { //身份证，人脸识别，银行卡上传前过滤
        var pictype = false;
        if (file.type === 'image/jpeg' || file.type === 'image/png') {
          pictype = true;
        }
        var isLt2M = file.size / 1024 / 1024 < 2;

        if (!pictype) {
          this.$message.error('上传图片只能是 JPG或者PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return pictype && isLt2M;
      }
      ,
      openTypeDialog: function () { //工种dialog及数据
        this.workerTypedialogVisible = true;
        var that = this;
        api.getWorkTypeInfo(null).then(res => {
          if (res.data.success) {
            //console.log(res.data.data)
            that.allworkType = res.data.data;
            that.workTypeList = that.allworkType;

          }
        })
      }
      ,
      searchWorkType: function () { //查询工种
        if (this.inputworktype == '' || this.inputworktype == null) {
          this.workTypeList = this.allworkType;
        } else {
          var arr = [];
          if (this.workTypeList != null && this.workTypeList != '' && this.workTypeList.length > 0) {
            var that = this;
            this.workTypeList.forEach(function (item) {
              if (item.typeOfWorkName.indexOf(that.inputworktype) != -1) {
                arr.push(item);
              }
            });
          }
          this.workTypeList = arr;
        }
      }
      ,
      closeTag: function (item) {//删除自定义工种
        this.removeArray(this.customTypeList, item);
      }
      ,
      changeworkType: function (item) { //点击切换工种
        this.workerTypedialogVisible = false;
        this.addform.workTypeName = item.typeOfWorkName;
      }
      ,
      addCustomType: function () {//添加自定义工种
        var warr = [];
        if (this.customType == '' || this.customType == null) {
          this.$message.warning('请输入自定义工种名称');
        } else {
          var typearr = this.customType.split(',');
          if (typearr.length > 0) {
            typearr.forEach(function (item) {
              var newwroktype = {};
              newwroktype.typeOfWorkName = item;
              warr.push(newwroktype);
            })
          } else {
            var nobj = {};
            nobj.typeOfWorkName = this.customType;
            warr.push(nobj);
          }
        }
        var that = this;
        if (this.customTypeList.length == 0) {
          this.customTypeList = warr;
        } else {
          if (warr != '' && warr != null && warr.length > 0) {
            warr.forEach(function (item2) {
              if (JSON.stringify(that.customTypeList).indexOf(JSON.stringify(item2)) == -1) {
                that.customTypeList.push(item2);
              }
            })
          }
        }
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
      ,
      selectProject: function () {
        this.projectDialogFlag = true;
      }
      ,
      changeShowProject: function (val) {
        this.projectDialogFlag = val;
      }
      ,
      changeProjectNode: function (val) {
        this.addform.projectId = val.projectId;
        this.addform.projectName = val.projectName;
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px dashed #ccc;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
