<template>
    <el-dialog title="选择部门" :visible.sync="showDialog" :width="dialogWidth">
        <el-tree :data="deptData" node-key="id" :render-content="renderContent"
                 :props="defaultProps" @node-click="handleNodeClick" default-expand-all></el-tree>
        <div slot="footer" class="dialog-footer" style="text-align: right">
            <el-button type="primary" @click="submitDept">确定</el-button>
            <el-button @click="showDialog = false">取 消</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import api from '../utils/api'
    export default {
        name: "DeptDialog",
        props:{
            isShowDialog:{
                type:Boolean,
                default:false
            },
            parentMsgObject:{
                type:Object
            }
        },
        data(){
            return{
                deptData:[],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                showDialog:this.isShowDialog,
                currentNode:null,
                dialogWidth:''
            }
        },
        created:function () {
            this.onLoad();
        },
        methods:{
            onLoad:function () {
               // this.token=util.cookies.get('token');
                this.getDeptList();
                this.setDialogWidth();
            },
            renderContent: function (h, {node, data, store}) {
              var createElement = arguments[0];
              var level = arguments[1].node.level;
              if (level == 1 ) {
                return createElement('span', [
                  createElement('i', {attrs: {class: data.icon}}),
                  createElement('span', "     "),
                  createElement('span', arguments[1].node.label)
                ]);
              } else {
                return createElement('span', [
                  createElement('i', {attrs: {class: 'el-icon-s-platform'}}),
                  createElement('span', "     "),
                  createElement('span', arguments[1].node.label)
                ]);
              }
            },
            handleNodeClick:function(val){
                this.currentNode=val;
            },
            getDeptList:function(){ //部门列表
                var arr = [];
                var that = this;
                api.getOrganiztion().then(res=>{
                    //公司结构
                    if (res.data.success) {
                        //console.log(res);
                      arr = res.data.data;
                      var temp;
                      if (arr != null && arr != '' && arr.length > 0) {
                        arr.forEach(function (item, index) {
                          if (item.text == '董事长室' && index != 0) {
                            temp = arr[0];
                            arr[0] = arr[index];
                            arr[index] = temp;
                          }
                          if (item.text == '总经理室' && index != 1) {
                            temp = arr[1];
                            arr[1] = arr[index];
                            arr[index] = temp;
                          }

                        });
                        arr.forEach(function (item) {
                          if(item.text == '董事长室' || item.text == '总经理室'){
                            item.icon='el-icon-s-custom';
                          }else{
                            item.icon = 'el-icon-s-platform';
                          }
                        })
                            that.deptData = arr;

                        }
                    }
                })
            },
            submitDept: function () {
                if (this.currentNode == null) {
                    this.$message({
                        message: '请选择部门',
                        type: 'error',
                        duration: 1500
                    });
                }else{
                    //var callbackName=this.parentMsgObject.callback;
                    this.$emit("selectNode",this.currentNode);
                    this.showDialog=false;
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
        },
        watch: {
            isShowDialog(val) {
                this.showDialog = val;//②监听外部对props属性result的变更，并同步到组件内的data属性myResult中
            },
            showDialog(val){
                this.$emit("on-result-change",val);//③组件内对myResult变更后向外部发送事件通知
            },

        },

    }
</script>

<style scoped>

</style>
