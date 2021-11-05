import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
export const constantRouterMap = [
  { path: '/', component: () => import('@/views/login') },
  { path: '/userInfo', component: () => import('@/views/userInfo') },
  { path: '/programListPage', component: () => import('@/views/programListPage') },
  { path: '/doProgramPage', component: () => import('@/views/doProgramPage') },
  { path: '/programList', component: () => import('@/components/programList') },
  { path: '/programItem', component: () => import('@/components/programItem') },
  { path: '/labelBar', component: () => import('@/components/labelBar') },
  { path: '/register', component: () => import('@/views/register') },
  { path: '/resetPassword', component:() => import('@/views/resetPassword')},

{ path: '/appHeader', component: () => import('@/components/appHeader') }


]
export default new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
