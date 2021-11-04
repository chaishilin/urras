import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
export const constantRouterMap = [
  { path: '/', component: () => import('@/views/login') },
  { path: '/userInfo', component: () => import('@/views/userInfo') },
  { path: '/doProgram', component: () => import('@/components/doProgram') },
  { path: '/programList', component: () => import('@/components/programList') },
  { path: '/programItem', component: () => import('@/components/programItem') },
  { path: '/labelBar', component: () => import('@/components/labelBar') }


  
]
export default new VueRouter({
  scrollBehavior:()=>({y:0}),
  routes: constantRouterMap
})
