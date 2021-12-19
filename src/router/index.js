import Vue from 'vue'
import VueRouter from 'vue-router'
const includPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return includPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)
export const constantRouterMap = [
  { path: '/', component: () => import('@/views/login') },
  { path: '/userInfo', component: () => import('@/views/userInfo') },
  { path: '/programListPage', component: () => import('@/views/programListPage') },
  { path: '/programTemplateListPage', component: () => import('@/views/programTemplateListPage') },
  { path: '/doProgramPage', component: () => import('@/views/doProgramPage') },
  { path: '/programTemplateDetail', component: () => import('@/views/programTemplate/programTemplateDetail') },
  { path: '/programList', component: () => import('@/components/programList') },
  { path: '/programItem', component: () => import('@/components/programItem') },
  { path: '/labelBar', component: () => import('@/components/labelBar') },
  { path: '/register', component: () => import('@/views/register') },
  { path: '/resetPassword', component: () => import('@/views/resetPassword') },

  { path: '/appHeader', component: () => import('@/components/appHeader') }


]
export default new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
