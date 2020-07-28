import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  routes: [
      {
          path: '/',
          redirect: '/manage'
      },
      {
          path: '/',
          name: 'home',
          component: () => import('@/components/Home'),
          children: [
              {
                  path: '/manage',
                  component: () => import('@/components/List'),
                  meta: { title: '灰度服务管理' }
              },
              {
                  path: '/test',
                  component: () => import('@/components/Test'),
                  meta: { title: '灰度服务测试' }
              }
          ]
      }
  ]
});
