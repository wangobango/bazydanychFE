import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import LogInPage from '@/components/layout/LogInPage.vue'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [{
    path: '/',
    name: 'LogIn',
    component: LogInPage
  }],
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }
})
