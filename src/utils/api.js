/**
 * 引入单独的方法
 * import { GETMETHOD, POSTMETHOD } from './http'
 */
/**
 * 整体引入
 * import req from './http'
 */
/**
 * api请求封装
 */
import req from './http'
import URL from './path'
export default {
  //登录
  getLoginData(params) {
    return req.post( URL.loginAddress, params)
  },
  //用户信息
  getUserinfo(){
    return req.post(URL.userAddress,null);
  },
  //创建企业
  createCompany(param){
    return req.post(URL.addCompanyAddres,param);
  },
  //企业信息
  getCompanyInfo(){
    return req.post(URL.companyInfoAddress,null);
  },
  //更新企业信息
  updateCompanyInfo(params){
    return req.post(URL.updateCompanyInfoAddress,params);
  },
  //获取组织结构数据
  getOrganiztion(){
    return req.post(URL.sysConfigAddress,null);
  },
  //获取员工列表数据
  getStaffList(params){
    return req.post(URL.userListAddress,params);
  },
  removeNode(params){
    return req.post(URL.removeNodeAddress,params);
  },
  //添加子节点
  addNode(params){
    return req.post(URL.addNodeAddress,params);
  },
  //编辑子节点
  editNode(params){
    return req.post(URL.editNodeAddress,params);
  },
  //职务列表
  getPostList(params){
    return req.post(URL.postListAddress,params);
  },
  //添加员工
  addStaff(params){
    return req.post(URL.addStaffAddress,params);
  },
  //添加职位
  addPost(params){
    return req.post(URL.addpostAddress,params);
  },
  //编辑职位
  updatePost(params){
    return req.post(URL.updataPostAddress,params);
  },
  //项目列表
  getProjectList(params){
    return req.post(URL.projectListAddress,params);
  },
  //项目更新
  updateProject(params){
    return req.post(URL.updateProjectAddress,params);
  },
  //添加项目
  addProject(params){
    return req.post(URL.addProjectAddress,params);
  },
  //合同列表
  getContractList(params){
    return req.post(URL.contractListAddress,params);
  },
  //新增合同
  addContract(params){
    return req.post(URL.addContractAddress,params);
  },
  //合同详情
  getContractInfo(params){
    return req.post(URL.contractInfoAddress,params);
  },
  //编辑合同
  updateContract(params){
    return req.post(URL.updateContractAddress,params);
  },
  //变更签证列表
  getVisaList(params){
    return req.post(URL.visaChangeListAddress,params);
  },
  //添加变更签证
  addVisaChange(params){
    return req.post(URL.addVisaChange,params);
  },
  //编辑变更签证
  updateVisaChange(params){
    return req.post(URL.updateVisaChangeAddress,params);
  },
  //变更签证详情
  getVisaChangeInfo(params){
    return req.post(URL.visaChangeInfoAddress,params);
  },
  //获取计划列表
  getPlanList(params){
    return req.post(URL.planListAddress,params);
  },
  //获取计划详情
  getPlanInfo(params){
    return req.post(URL.planDetailsAddress,params);
  },
  //获取进度计划列表
  getProgressList(params){
    return req.post(URL.progressListAddress,params);
  },
  //修改计划
  updatePlan(params){
    return req.post(URL.updatePlanAddress,params);
  },
  //修改进度
  updateProgress(params){
    return req.post(URL.updateProgressAddress,params);
  },
  //进度填报详情
  getProgressApplyInfo(params){
    return req.post(URL.progressApplyInfoAddress,params);
  },
  //项目进度详情
  getPlanModelInfo(params){
    return req.post(URL.planModelAddress,params);
  },
  //添加进度填报
  addProgressApply(params){
    return req.post(URL.applyProgressAddress,params);
  },
  //进度填报记录列表
  getProcessApplyList(params){
    return req.post(URL.progressApplyListAddress,params);
  },
  //项目进度添加填报
  addProcess(params){
    return req.post(URL.addProcessAddress,params);
  },
  //项目进度添加填报
  addPlan(params){
    return req.post(URL.addPlanAddress,params);
  },
  //踩盘任务列表
  getTreadTaskList(params){
    return req.post(URL.treadTaskListAddress,params);
  },
  //删除踩盘任务
  removeTreadTask(params){
    return req.post(URL.removeTreadTaskAddress,params);
  },
  //编辑踩盘任务
  updateTreadTask(params){
    return req.post(URL.updateTreadTaskAddress,params);
  },
  //踩盘任务详情保存
  saveTreadTask(params){
    return req.post(URL.saveTreadTaskAddress,params);
  },
  //查看踩盘任务详情
  checkTreadTaskinfo(params){
    return req.post(URL.checkTreadTaskinforess,params);
  },
  //添加踩盘任务
  addTreadTask(params){
    return req.post(URL.addTreadTaskAddress,params);
  },
  //获取项目劳工
  getWorkerListById(params){
    return req.post(URL.workerListAddress,params);
  },
  //添加项目劳工
  addWorker(params){
    return req.post(URL.addWorkerAddress,params);
  },
  //修改项目劳工
  updateWorkerInfo(params){
    return req.post(URL.updateWorkinfoAddress,params);
  },
  //工种列表
  getWorkTypeInfo(params){
    return req.post(URL.baseWorkTypeAddress,params);
  },
}
