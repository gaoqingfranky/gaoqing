<template>
  <div style="width:100%;margin: auto;">
    <div class="header">踩盘详情</div>
    <el-card class="box-card">
      <el-col :span="24">
        <el-form label-width="150px" :model="dialogFormModel">

          <el-form-item label="小区名称">
            <el-col :span="23">
              <el-input v-model="dialogFormModel.villageName" :disabled="disabledvalue"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="开发单位">
            <el-col :span="23">
              <el-input v-model="dialogFormModel.developmentUnit" :disabled="disabledvalue">
              </el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="工程单位">
            <el-col :span="23">
              <el-input v-model="dialogFormModel.engineeringUnit" :disabled="disabledvalue">
              </el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="景观设计">
            <el-col :span="23">
              <el-input v-model="dialogFormModel.landScapeDesign" :disabled="disabledvalue">
              </el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="基地面积">
            <el-col :span="23">
              <el-input v-model="dialogFormModel.baseArea" :disabled="disabledvalue"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="绿化率">
            <el-col :span="23">
              <el-input v-model="dialogFormModel.greeninGrate" :disabled="disabledvalue"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="容积率">
            <el-col :span="23">
              <el-input v-model="dialogFormModel.volumeRatio" :disabled="disabledvalue"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="建蔽率">
            <el-col :span="23">
              <el-input v-model="dialogFormModel.siteCoverage" :disabled="disabledvalue"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="使用类别">
            <el-col :span="23">
              <el-input v-model="dialogFormModel.useCategories" :disabled="disabledvalue"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="销售总面积">
            <el-col :span="23">
              <el-input v-model="dialogFormModel.totalSalesArea" :disabled="disabledvalue"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="总户数">
            <el-col :span="23">
              <el-input v-model="dialogFormModel.totalHouseholds" :disabled="disabledvalue">
              </el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="车位数">
            <el-col :span="23">
              <el-input v-model="dialogFormModel.numberCars" :disabled="disabledvalue"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="规划面积">
            <el-col :span="23">
              <el-input v-model="dialogFormModel.plannedArea" :disabled="disabledvalue"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="平均单价">
            <el-col :span="23">
              <el-input v-model="dialogFormModel.averageUnitPrice" :disabled="disabledvalue">
              </el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="商品单价">
            <el-col :span="23">
              <el-input v-model="dialogFormModel.itemPricing" :disabled="disabledvalue"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="车位售价">
            <el-col :span="23">
              <el-input v-model="dialogFormModel.parkingSpacePrice" :disabled="disabledvalue">
              </el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="总销金额">
            <el-col :span="23">
              <el-input v-model="dialogFormModel.totalSalesAmount" :disabled="disabledvalue">
              </el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="社区管理">
            <el-col :span="23">
              <el-input v-model="dialogFormModel.communityManagement" :disabled="disabledvalue">
              </el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="公摊">
            <el-col :span="23">
              <el-input v-model="dialogFormModel.publicBooth" :disabled="disabledvalue"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="产品规划">
            <el-col :span="23">
              <el-input v-model="dialogFormModel.productPlanning" :disabled="disabledvalue">
              </el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="景观图片">
            <el-col :span="23">
              <!-- <el-input v-model="dialogFormModel.landscapePictures" :disabled="disabledvalue"></el-input> -->
              <el-upload :headers=UploadHearder :action="uploadUrl" :file-list="landscapePicturesPic.fileList" list-type="picture-card"
                         :on-preview="landscapePictures_handlePictureCardPreview"
                         :on-remove="landscapePictures_handleRemove"
                         :on-success="landscapePictures_handleSuccess">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="landscapePicturesPic.dialogVisible" size="tiny">
                <img width="100%" :src="landscapePicturesPic.dialogImageUrl" alt="">
              </el-dialog>

            </el-col>
          </el-form-item>
          <el-form-item label="基地位置图片">
            <el-col :span="23">
              <el-input v-model="dialogFormModel.baseLocationPicture" :disabled="disabledvalue">
              </el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="现况照片">
            <el-col :span="23">
              <!-- <el-input v-model="dialogFormModel.statusPicture" :disabled="disabledvalue"></el-input> -->
              <el-upload :headers=UploadHearder :action="uploadUrl" :file-list="statusPicture.fileList" list-type="picture-card"
                         :on-preview="statusPicture_handlePictureCardPreview"
                         :on-remove="statusPicture_handleRemove" :on-success="statusPicture_handleSuccess">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="statusPicture.dialogVisible" size="tiny">
                <img width="100%" :src="statusPicture.dialogImageUrl" alt="">
              </el-dialog>
            </el-col>
          </el-form-item>
          <el-form-item label="售楼处照片">
            <el-col :span="23">
              <!-- <el-input v-model="dialogFormModel.salesOfficePhotos" :disabled="disabledvalue">
              </el-input> -->
              <el-upload :headers=UploadHearder :action="uploadUrl" :file-list="salesOfficePhotos.fileList" list-type="picture-card"
                         :on-preview="salesOfficePhotos_handlePictureCardPreview"
                         :on-remove="salesOfficePhotos_handleRemove"
                         :on-success="salesOfficePhotos_handleSuccess">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="salesOfficePhotos.dialogVisible" size="tiny">
                <img width="100%" :src="salesOfficePhotos.dialogImageUrl" alt="">
              </el-dialog>
            </el-col>
          </el-form-item>
          <el-form-item label="备注">
            <el-col :span="23">
              <el-input v-model="dialogFormModel.remark" :disabled="disabledvalue"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" v-if="showbtn"   v-on:click="savebaseInfo">保 存</el-button>
            <el-button  v-on:click="saveback">返回</el-button>
          </el-form-item>
        </el-form>
      </el-col>

    </el-card>
  </div>
</template>

<script>
  import local from '../utils/local'
  import api from '../utils/api'
    export default {
        name: "treadTaskDetail",
      data(){
        return{
          tabName:'',
          UploadHearder: {
            Authorization: local.get('USERTOKEN')
          },
          loading: true,
          dialogModel: {
            dialogTableVisible: false,
            title: '增加'
          },
          uploadUrl: process.env.VUE_APP_BASE_API + '/Upload/UploadInvestmentBaseInfo',
          dialogFormModel: {
            inverstmentTaskInfoId: '', //任务详情ID
            villageName: '', //小区名称
            developmentUnit: '',//开发单位
            inverstmentTaskId: '',//任务ID
            engineeringUnit: '',//工程单位
            landScapeDesign: '',//景观设计
            baseArea: '',//基地面积
            greeninGrate: '',//绿化率
            volumeRatio: '',//容积率
            siteCoverage: '',//建蔽率
            useCategories: '',//使用类别
            totalSalesArea: '',//总销售面积
            totalHouseholds: '',//总户数
            numberCars: '',//车位数
            plannedArea: '',//规划面积
            averageUnitPrice: '',//平均单价
            itemPricing: '',//商品单价
            parkingSpacePrice: '',//车位售价
            totalSalesAmount: '',//总销金额
            communityManagement: '',//社区管理
            publicBooth: '',//公摊
            productPlanning: '',//产品规划
            landscapePictures: [],//景观图片
            baseLocationPicture: '',//基地位置图片
            statusPicture: [],//现况图片
            salesOfficePhotos: [],//售楼处照片
            remark: ''//备注

          },
          sectionTitle: '增加',
          saveflag: 0,
          showbtn: false,
          disabledvalue: false,
          urlDataModel: {
            inverstmentTaskId: '',
            type: 0
          },
          landscapePicturesPic: {
            dialogImageUrl: '',
            dialogVisible: false,
            fileList: []
          },
          statusPicture: {
            dialogImageUrl: '',
            dialogVisible: false,
            fileList: []
          },
          salesOfficePhotos: {
            dialogImageUrl: '',
            dialogVisible: false,
            fileList: []
          }
        }
      },
      methods: {
        GetUrlData: function () {
          this.urlDataModel.inverstmentTaskId = this.$route.params.inverstmentTaskId;
          this.urlDataModel.type = this.$route.params.type;
        },
        savebaseInfo: function () {
          this.dialogFormModel.inverstmentTaskId = this.urlDataModel.inverstmentTaskId;
          //console.log(this.dialogFormModel);
          var that=this;
          api.saveTreadTask(this.dialogFormModel).then(function (respone) {
            if (respone.data.code == 0) {
              //保存成功
              that.$message({
                message: '保存成功',
                type: 'success',
                onClose: function () {

                }
              });
            }
            else {
              //保存失败
              that.$message({
                message: '保存失败',
                type: 'error',
                onClose: function () {

                }
              });
            }
          })
        },
        landscapePictures_handleSuccess(respone, file, fileList) {

          if (respone.code == -999) {
            // window.location.href = '/login.html';
            this.$router.replace('/login')
          }
          else {
            if (this.dialogFormModel.landscapePictures == null) {
              this.dialogFormModel.landscapePictures = [];
            }
            this.dialogFormModel.landscapePictures.push(respone.data);
          }
        },
        landscapePictures_handleRemove(file, fileList) {
          this.dialogFormModel.landscapePictures=[];
          if(fileList.length>0){
            for(var i=0;i<fileList.length;i++){
              this.dialogFormModel.landscapePictures.push(fileList[i].url);
            }
          }
        },
        landscapePictures_handlePictureCardPreview(file) {
          this.landscapePicturesPic.dialogImageUrl = file.url;
          this.landscapePicturesPic.dialogVisible = true;
        },
        statusPicture_handleSuccess(respone, file, fileList) {
          if (respone.code == -999) {
            //window.location.href = '/login.html';
            this.$router.replace('/login')
          }
          else {
            if (this.dialogFormModel.statusPicture == null) {
              this.dialogFormModel.statusPicture = [];
            }
            this.dialogFormModel.statusPicture.push(respone.data);
          }
        },
        statusPicture_handleRemove(file, fileList) {
          this.dialogFormModel.statusPicture=[];
          if(fileList.length>0){
            for(var i=0;i<fileList.length;i++){
              this.dialogFormModel.statusPicture.push(fileList[i].url);
            }
          }
        },
        statusPicture_handlePictureCardPreview(file) {
          this.statusPicture.dialogImageUrl = file.url;
          this.statusPicture.dialogVisible = true;
        },
        salesOfficePhotos_handleSuccess(respone, file, fileList) {
          if (respone.code == -999) {
            //window.location.href = '/login.html';
            this.$router.replace('/login')
          }
          else {
            if (this.dialogFormModel.salesOfficePhotos == null) {
              this.dialogFormModel.salesOfficePhotos = [];
            }
            this.dialogFormModel.salesOfficePhotos.push(respone.data);
          }
        },
        salesOfficePhotos_handleRemove(file, fileList) {
          //console.log(file);
          //console.log(fileList);
          this.dialogFormModel.salesOfficePhotos=[];
          if(fileList.length>0){
            for(var i=0;i<fileList.length;i++){
              this.dialogFormModel.salesOfficePhotos.push(fileList[i].url);
            }
          }
        },
        salesOfficePhotos_handlePictureCardPreview(file) {
          this.salesOfficePhotos.dialogImageUrl = file.url;
          this.salesOfficePhotos.dialogVisible = true;
        },
        saveback:function () {
          this.$router.replace('/treadTaskManage')
        }
      },
      mounted() {
        this.GetUrlData();
        var that=this;
        //console.log(this.urlDataModel.inverstmentTaskId);
        //查看或者编辑
        api.checkTreadTaskinfo({ inverstmentTaskId: this.urlDataModel.inverstmentTaskId }).then(res=> {
          //console.log(res.data);
          if (res.data.data != null) {
            //有数据
            that.dialogFormModel = res.data.data;

            //图片处理
            if(that.dialogFormModel.landscapePictures!=null && that.dialogFormModel.landscapePictures.length>0 ){
              for(var i=0;i<that.dialogFormModel.landscapePictures.length;i++){
                that.landscapePicturesPic.fileList.push({
                  url:that.dialogFormModel.landscapePictures[i]
                })
              }
            }

            //图片处理
            if(that.dialogFormModel.statusPicture!=null && that.dialogFormModel.statusPicture.length>0 ){
              for(var i=0;i<that.dialogFormModel.statusPicture.length;i++){
                that.statusPicture.fileList.push({
                  url:that.dialogFormModel.statusPicture[i]
                })
              }
            }

            //图片处理
            if(that.dialogFormModel.salesOfficePhotos && that.dialogFormModel.salesOfficePhotos.length>0 ){
              for(var i=0;i<that.dialogFormModel.salesOfficePhotos.length;i++){
                that.salesOfficePhotos.fileList.push({
                  url:that.dialogFormModel.salesOfficePhotos[i]
                })
              }
            }

          }
        });
        if (this.urlDataModel.type == 1) {
          //编辑的
          this.showbtn = true;
          this.saveflag = 1;
          this.tabName='踩盘任务更新';
        }
        else {
          this.showbtn = false;
          this.saveflag = 0;
          this.tabName='踩盘任务详情';
        }
      }
    }
</script>

<style scoped>

</style>
