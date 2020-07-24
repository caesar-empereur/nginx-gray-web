import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  routes: [
      {
          path: '/',
          redirect: '/dashboard'
      },
      {
          path: '/',
          name: 'home',
          component: () => import('@/components/Home'),
          children: [
              {
                  path: '/dashboard',
                  component: () => import('@/components/List'),
                  meta: { title: '系统首页' }
              }
          ]
      }
  ]
});
