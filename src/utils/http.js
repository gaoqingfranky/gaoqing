/**
 * post以及get方法的封装
 */
import request from './request'
/**
 * 单独导出方法
 */
// export function get(url,param){
//     return new Promise((resolve, reject)=>{
//         request({
//             url:url,
//             method:'GET',
//             params:param
//         }).then((res) => {
//             resolve(res)
//         }).catch((error) => {
//             reject(error)
//         })
//     })
// }
// export function post(url, param) {
//     return new Promise((resolve, reject) => {
//         request({
//             url:url,
//             method:'POST',
//             params:param
//         }).then((res)=> {
//             resolve(res)
//         }).then((error)=> {
//             reject(error)
//         })
//     })
// }
/**
 * 整体导出
 */
export default {
  get(url, param) {
    return new Promise((resolve, reject) => {
      // request({
      //   url:url,
      //   method:'GET',
      //   params:param
      // }).then((res) => {
      //   resolve(res)
      // }).catch((error) => {
      //   reject(error)
      // })
      request.get(url, {params: param}).then(res => {
        resolve(res)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  post(url, param) {
    return new Promise((resolve, reject) => {
      // request({
      //   url: url,
      //   method: 'POST',
      //   params: param
      // }).then((res) => {
      //   resolve(res)
      // }).then((error) => {
      //   reject(error)
      // })
      request.post(url, param).then(res => {
        resolve(res)
      }).catch((error) => {
        reject(error)
      })
    })
  }
}
