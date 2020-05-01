<template>
  <div class="login-page">
  <div class="login-box">
    <div class="login-logo">
       登录
    </div>
    <!-- /.login-logo -->
    <div class="card">
      <div class="card-body login-card-body">
        <p class="login-box-msg">请输入用户信息</p>
        <div>
          <div class="input-group mb-3">
            <input type="text" v-model="user.userPhone" class="form-control" placeholder="手机号码">
            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-mobile"></span>
              </div>
            </div>
          </div>
          <div class="input-group mb-3">
            <input type="password" v-model="user.userPassword" class="form-control" placeholder="密码">
            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-lock"></span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="icheck-primary">
                <input type="checkbox" id="remember" :checked="is_check" @click="check">
                <label for="remember">
                   记住我
                </label>
              </div>
            </div>
            <!-- /.col -->
            <div class="col-12">
              <button  class="btn btn-primary btn-block" @click="login">登录</button>
            </div>
            <!-- /.col -->
          </div>
        </div>

        <div class="social-auth-links text-center mb-3">

        </div>
        <!-- /.social-auth-links -->

        <!--<p class="mb-0  fa-pull-right"  >-->
          <!--<router-link to="/">注册新用户</router-link>-->
        <!--</p>-->
      </div>
      <!-- /.login-card-body -->
    </div>
  </div>

  </div>

</template>

<script>
  import api from '../utils/api';
  import local from '../utils/local'
    export default {
        name: "loginVue",
      data(){
          return{
            user:{
              userPhone:'',
              userPassword:''
            },
            is_check:false
          }
      },
      created(){
         var userinfo=local.get('userinfo');
        if(userinfo!=null && userinfo!=undefined && userinfo!=''){
           this.user=JSON.parse(userinfo);
           this.is_check=true;
        }
      },
      methods:{
          login:function () {
            var that=this;
             if(this.user.userPhone!='' && this.user.userPassword!=''){
               // api.getLoginData(this.user).then(res=>{
               //   //console.log(res);
               //   if(res.data.success){
               //     local.set('USERTOKEN',res.data.data);
               //     if(that.is_check){
               //       local.set('userinfo',JSON.stringify(that.user))
               //     }else{
               //       local.set('userinfo',null);
               //     }
               local.set('userinfo',JSON.stringify(that.user));
               window.location.href='deskTable';
               //     // that.$router.replace('/');
               //     // that.$emit('load.lte.treeview');
               //   }else{
               //     that.$message.error(res.data.message);
               //
               //   }
               // })

             }else{
                if(this.user.userPhone==''){
                  that.$message.error('请输入手机号码');
                }else if(this.user.userPassword==''){
                  that.$message.error('请输入密码');
                }
             }
          },
        check:function () {
           this.is_check=!this.is_check;
           //console.log(this.is_check)

        }

      }
    }
</script>

<style scoped>

</style>
