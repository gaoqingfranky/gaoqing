//封装axios
import axios from 'axios'
import {GETTOKEN} from './token'    //引入获取token的方法
//const reqUrl = 'http://devsrv.anmirrors.com:8008'
//默认请求地址
//axios.defaults.baseURL = reqUrl;
const instance = axios.create({
  timeout: 30000,      //开始创建axios的请求时间
  baseURL: process.env.VUE_APP_BASE_API   //这个默认的url可以不去写
});
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.common["x-requested-with"] = 'XMLHttpRequest';
//请求拦截
instance.interceptors.request.use(    //开始对请求进行拦截
  config => {
    if (GETTOKEN()) {    //判断是否存在token，如果存在我们将其在头部进行发送
      config.headers = {   //headers的值
        //'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': GETTOKEN()
      };
    }
    //我们将参数返回出来
    return config
  }, error => {
    Promise.reject(error)   //如果错误，我们则使用Promise异步方法将error输出
  }
);
//响应拦截
instance.interceptors.response.use(
  (response) => {    //response的拦截
    if (response.data.code == -999) { //数据过期，重新登录
      window.location.href='../';
    }else {
      return response
    }
  }, (error) => {
    return Promise.reject(error)  //将错误信息返回给前端页面
  }
);
export default instance   //导出所有axios的定义


