import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import User from '../components/users/User.vue'
import Right from '../components/power/Right.vue'
import Roles from '../components/power/Roles.vue'
import Cate from '../components/goods/Cate.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/users', component: User },
        { path: '/rights', component: Right },
        { path: '/roles', component: Roles },
        { path: '/categories', component: Cate }
      ]
    }
  ]
})
// 为路由添加导航守卫
router.beforeEach((to, from, next) => {
  // 如果用户访问登录页 放行
  if (to.path === '/login') return next()
  // 从 sessionstorage 中获取 token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
