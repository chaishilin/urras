import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
export const constantRouterMap = [
  { path: '/', component: () => import('@/views/login') },
  { path: '/userInfo', component: () => import('@/views/userInfo') }

  
]
export default new VueRouter({
  scrollBehavior:()=>({y:0}),
  routes: constantRouterMap
})
