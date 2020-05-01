<template>
  <div style="height: 100%;margin-top: 10px">
    <div class="row " style="width:100%;margin:auto;border:1px solid #ddd;background-color: white;clear: both">
      <div class="col-md-6 col-lg-6 col-xs-6" style="width:59%">
        <table style="height:1rem;margin-top: 0.2rem">
          <tr >
            <td rowspan="2" style="text-align: left">
              <img src="../../static/images/bzlogo.png" style="width:2rem;height:2rem;background-color: #808080" alt="logo Image" />
            </td>
            <td><span style="font-size: 0.05rem;font-weight: bolder;line-height: 0.5rem">{{userinfo.userName}} &nbsp;&nbsp;{{timeMsg}}</span></td>

          </tr>
          <tr>
            <td> <span style="font-size: 0.05rem;line-height: 0.5rem;color:#939BA4">只要明确了方向,世界也会为你让路</span></td>
          </tr>
        </table>
      </div>
      <div class="col-md-6 col-lg-6 col-xs-6" style="width: 41%">
        <table style="width:100%;margin-top: 0.2rem;text-align: right">
          <tr>
            <td><span style="font-size: 0.05rem;line-height: 0.3rem;font-weight: bolder">{{nowDate}}</span></td>
          </tr>
          <tr>
            <td><span style="font-size: 0.05rem;line-height: 0.3rem;color:#939BA4">{{nowDate2}}</span></td>
          </tr>
        </table>
      </div>
    </div>
    </div>
</template>
<script>
  import api from '../utils/api'
  import dateTime from '../utils/dateTime'
    export default {
        name: "deskTable",
      data(){
          return{
            userinfo:{},
            timeMsg:'',
            nowDate:'',
            nowDate2:''
          }
      },
      created(){
          this.onLoad();
      },
      methods:{
          onLoad:function () {
            this.timeMsg=dateTime.timeMsg();
            this.nowDate=dateTime.dateMsg();
            this.nowDate2=dateTime.dateMsg2();
            this.getuserinfo()
          },
        getuserinfo:function () {
            var that=this;
          api.getUserinfo().then(res=>{
            if(res.data.success){
              that.userinfo=res.data.data;
            }
          })
        }
      }
    }
</script>
<style scoped>

</style>
