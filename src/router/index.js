import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import mainIndex from '@/views/mainIndex.vue'
import login from '@/views/login.vue'
import deskTable from '@/views/deskTable.vue'
import companySetting from '@/views/companySetting.vue'
import organize from '@/views/organize.vue'
import post from '@/views/post.vue'
import addProject from '@/views/addProject.vue'
import projectManage from '@/views/projectManage.vue'
import contractManage from '@/views/contractManage.vue'
import addContract from '@/views/addContract.vue'
import editContract from '@/views/editContract.vue'
import visaChangeManage from '@/views/visaChangeManage.vue'
import addVisaChange from '@/views/addVisaChange.vue'
import editVisaChange from '@/views/editVisaChange.vue'
import addPlan from '@/views/addPlan.vue'
import planManage from '@/views/planManage.vue'
import planDetails from '@/views/planDetails.vue'
import progressApply from '@/views/progressApply.vue'
import progressHistory from '@/views/progressHistory.vue'
import addProcess from '@/views/addProcess.vue'
import treadTaskManage from '@/views/treadTaskManage.vue'
import treadTaskDetail from '@/views/treadTaskDetail.vue'
import addTreadTask from '@/views/addTreadTask.vue'
import workerManage from '@/views/workerManage.vue'
import workerAdd from '@/views/workerAdd.vue'
import workerUpdate from '@/views/workerUpdate.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path:'/',
    name:'mainIndex',
    component:mainIndex,
    children:[
      {
        path:'/deskTable',
        name:'deskTable',
        component:deskTable
      },
      {
        path:'/companySetting',
        name:'companySetting',
        component:companySetting
      },
      {
        path:'/organize',
        name:'organize',
        component:organize
      },
      {
        path:'/post',
        name:'post',
        component:post
      },
      {
        path:'/addProject',
        name:'addProject',
        component:addProject
      },
      {
        path:'/projectManage',
        name:'projectManage',
        component:projectManage
      },
      {
        path:'/contractManage',
        name:'contractManage',
        component:contractManage
      },
      {
        path:'/addContract',
        name:'addContract',
        component:addContract
      },
      {
        path:'/editContract',
        name:'editContract',
        component:editContract
      },
      {
        path:'/addVisaChange',
        name:'addVisaChange',
        component:addVisaChange
      },
      {
        path:'/visaChangeManage',
        name:'visaChangeManage',
        component:visaChangeManage
      },
      {
        path:'/editVisaChange',
        name:'editVisaChange',
        component:editVisaChange
      },
      {
        path:'/addPlan',
        name:'addPlan',
        component:addPlan
      },
      {
        path:'/planManage',
        name:'planManage',
        component:planManage
      },
      {
        path:'/planDetails',
        name:'planDetails',
        component:planDetails
      },
      {
        path:'/progressApply',
        name:'progressApply',
        component:progressApply
      },
      {
        path:'/progressHistory',
        name:'progressHistory',
        component:progressHistory
      },
      {
        path:'/addProcess',
        name:'addProcess',
        component:addProcess
      },
      {
        path:'/treadTaskManage',
        name:'treadTaskManage',
        component:treadTaskManage
      },
      {
        path:'/treadTaskDetail',
        name:'treadTaskDetail',
        component:treadTaskDetail
      },
      {
        path:'/addTreadTask',
        name:'addTreadTask',
        component:addTreadTask
      },
      {
        path:'/workerManage',
        name:'workerManage',
        component:workerManage
      },
      {
        path:'/workerAdd',
        name:'workerAdd',
        component:workerAdd
      },
      {
        path:'/workerUpdate',
        name:'workerUpdate',
        component:workerUpdate
      },
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }

]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
