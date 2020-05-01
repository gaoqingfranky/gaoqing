/**
 * url地址的封装
 */
export default {
  loginAddress: '/API/Login',  //登录
  userAddress: '/UserAPI/GetUserInfo',//用户信息
  addCompanyAddress: '/CompanyAPI/AddCompany',//创建企业
  companyInfoAddress: '/CompanyAPI/GetCompanyInfo',//企业信息
  updateCompanyInfoAddress: '/CompanyAPI/UpdateCompanyInfo',//更新企业信息
  sysConfigAddress: '/Organization/GetOrgnizationData',//组织结构
  userListAddress: '/UserAPI/GetUserListPage',//员工列表
  addNodeAddress: '/Organization/AddOrganizationNode',//添加子节点
  editNodeAddress: '/Organization/AddOrganizationNode',//编辑节点
  removeNodeAddress: '/Organization/DelOrganizationNode',//删除节点
  addStaffAddress:"/UserAPI/AddUser",//添加员工
  postListAddress:'/PostAPI/GetPostList',//职务列表
  addpostAddress:'/PostAPI/AddPost',//添加职位
  updataPostAddress:'/PostAPI/UpdatePost',//编辑职位
  projectListAddress:'/ProjectAPI/GetProjectListPage',//项目列表
  updateProjectAddress:'/ProjectAPI/UpdateProject',//修改项目
  addProjectAddress:'/ProjectAPI/AddProject',//增加项目
  contractListAddress:'/ContractAPI/GetContractListPage',//合同列表
  addContractAddress: '/ContractAPI/AddContract',//新增合同
  contractInfoAddress:'/ContractAPI/GetContractInfo',//合同详情
  updateContractAddress:'/ContractAPI/UpdateContract',//编辑合同
  visaChangeListAddress:'/ViasChangeAPI/GetVisaChangeListPage',//变更签证列表
  addVisaChange:'/ViasChangeAPI/AddVisaChange',//添加变更签证
  updateVisaChangeAddress:'/ViasChangeAPI/UpdateVisaChange',//编辑变更签证
  visaChangeInfoAddress:'/ViasChangeAPI/GetVisaChangeInfo',//变更签证详情
  planListAddress:'/Processon/GetProcessListPage',//计划列表
  planDetailsAddress:'/Processon/GetProcessInfo',//计划详情
  progressListAddress:'/Processon/GetProcessonPlanPage',//进度计划列表
  updatePlanAddress:'/Processon/UpdateProcesson',//修改计划
  updateProgressAddress:'/Processon/UpdatePlan',//修改进度
  progressApplyInfoAddress:'/Processon/GetProcessFillInInfo',//进度填报详情
  planModelAddress:'/Processon/GetProcessonPlanModel',//项目计划详情
  applyProgressAddress:'/Processon/AddProcessFillIn',//添加进度填报
  progressApplyListAddress:'/Processon/GetProcessonPlanFillInPage',//进度填报记录列表
  addProcessAddress:'/Processon/AddProcessonPlanInfo',//项目进度添加填报
  addPlanAddress:'/Processon/AddProcessPlan',//新增计划
  treadTaskListAddress:'/InverstmentProject/GetPageInverstmentTaskAllocationModel',//踩盘任务列表
  removeTreadTaskAddress:'/InverstmentProject/DelInverstmentTask',//删除踩盘任务
  updateTreadTaskAddress:'/InverstmentProject/UpdateInverstmentTask',//编辑踩盘
  saveTreadTaskAddress:'/InverstmentProject/UpdateTaskBaseInfoModel',//踩盘详情保存
  checkTreadTaskinforess:'/InverstmentProject/GetInverstmentTaskInfoModel',//查看踩盘详情
  addTreadTaskAddress:'/InverstmentProject/AddInverstmentTask',//添加踩盘
  workerListAddress: '/LaborManagerAPI/PageContractWorkers', //项目劳工
  addWorkerAddress:'/LaborManagerAPI/AddContractWorker',//添加劳工
  updateWorkinfoAddress: '/LaborManagerAPI/UpdateContractWorker',//修改劳工
  baseWorkTypeAddress:'/LaborManagerAPI/GetBaseWorkType',//工种列表
}
