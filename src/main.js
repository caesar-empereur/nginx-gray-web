import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import { getToken } from './util/auth';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;
Vue.use(ElementUI, {size: 'small'});

// const whiteList = ['/login']
//
// router.beforeEach((to, from, next) => {
//     document.title = `${to.meta.title}`;
//     if (getToken()){
//         if (to.path === '/login') {
//             next('/login');
//         } else {
//             next()
//         }
//     } else {
//         if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
//             next()
//         } else {
//             next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
//         }
//     }
// });

new Vue({
  el: '#app',
  router,
  render: h => h(App)
  // components: { App },
  // template: '<App/>'
});
