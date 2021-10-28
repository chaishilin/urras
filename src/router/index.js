import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
export const constantRouterMap = [
  //����Ĭ�ϵ�·����Ĭ����ʾ��½ҳ��
  {path:'/',component:()=>import('@/views/login')}
]
export default new VueRouter({
  scrollBehavior:()=>({y:0}),
  routes: constantRouterMap
})
