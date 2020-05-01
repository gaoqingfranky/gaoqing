<template>
    <el-dialog title="项目列表" :visible.sync="projectFlag" :width="dialogWidth">
        <el-row>
            <el-col :span="21" :offset="1">
                <el-table :data="projectData"
                          tooltip-effect="dark"
                          highlight-current-row
                          style="width: 100%"
                          @current-change="handleSelectChange">
                  <el-table-column type="expand">
                    <template slot-scope="props">
                      <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="项目编号">
                          <span>{{ props.row.projectNo }}</span>
                        </el-form-item>
                        <el-form-item label="项目状态">
                          <span>{{ props.row.projectStatus }}</span>
                        </el-form-item>
                        <el-form-item label="开工日期">
                          <span>{{ props.row.projectStartTime }}</span>
                        </el-form-item>
                        <el-form-item label="竣工日期">
                          <span>{{ props.row.projectEndTime }}</span>
                        </el-form-item>
                        <el-form-item label="所属公司">
                          <span>{{ props.row.projectOwnerCompany }}</span>
                        </el-form-item>
                        <el-form-item label="所属单位">
                          <span>{{ props.row.projectConstructionUnit }}</span>
                        </el-form-item>
                        <el-form-item label="项目创建人">
                          <span>{{ props.row.createUserName }}</span>
                        </el-form-item>
                      </el-form>
                    </template>
                  </el-table-column>
                  <el-table-column label="项目名称" prop="projectName" >
                  </el-table-column>
                    <el-table-column prop="projectAdminUserName" label="项目负责人" >
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer" style="text-align: center">
            <el-button type="primary" @click="selectProject">确定</el-button>
            <el-button @click="projectFlag = false">取 消</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import api from '../utils/api'
    export default {
        name: "projectDialog",
        props:{
            isShowProjectDialog:{
                type:Boolean,
                default:false
            }
        },
        data(){
            return{
                projectData:[],
                projectFlag:false,
                // projectList_url: util.common.projectListAddress,
                currentRow:null,
                statusList: ['工程筹备', '勘察设计', '待勘察', '未开工', '在建', '验收', '竣工', '终止', '已停工'],
                dialogWidth:''
            }
        },
        created:function () {
            this.onLoad();
        },
      mounted(){
          this.setDialogWidth()
      },
        methods:{
            onLoad:function(){
                this.getProjectList();
            },
            handleSelectChange: function (val) {
                this.currentRow = val;
            },
            selectProject:function () {
                if (this.currentRow == null) {
                    this.$message.error('请在表格中选择项目！');
                } else {
                    //console.log(this.currentRow);
                    // this.addPlanForm.projectName = this.currentRow.projectName;
                    // this.addPlanForm.projectId = this.currentRow.projectId;
                    this.$emit("selectNode",this.currentRow);
                    this.projectFlag = false;
                }
            },
            getProjectList: function () { //获取项目列表
                var model = {
                    "page": 1,
                    "pageSize": 10000
                };
                var that = this;
                api.getProjectList(model).then(res=>{
                    // console.log(res);
                    if (res.data.success) {
                        var arr = res.data.data.list;
                        if (arr != null && arr.length > 0) {
                            arr.forEach(function (item) {
                                item.projectStartTime = item.projectStartTime.split('T')[0];
                                item.projectEndTime = item.projectEndTime.split('T')[0];
                                item.projectStatus = that.statusList[parseInt(item.projectStatus)];
                            });
                            that.projectData = arr;
                        } else {
                            that.projectData = [];
                        }
                    } else {
                        that.projectData = [];
                        that.$message.error(res.message);
                    }
                })
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
        },
        watch: {
            isShowProjectDialog(val) {
                this.projectFlag = val;//②监听外部对props属性result的变更，并同步到组件内的data属性myResult中
            },
            projectFlag(val){
                this.$emit("on-result-change",val);//③组件内对myResult变更后向外部发送事件通知
            },

        },

    }
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 120px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }
</style>
