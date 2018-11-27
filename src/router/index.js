import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import LogInPage from '@/components/layout/LogInPage.vue'
import SearchPage from '@/components/search/SearchPage.vue'
import FormPage from '@/components/forms/FormPage.vue'
import NewProduct from '@/components/forms/NewProduct.vue'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'LogIn',
      component: LogInPage
    },
    {
      path: '/search',
      name: 'SearchPage',
      component: SearchPage
    },
    {
      path: '/forms',
      name: 'FormPage',
      component: FormPage,
    },
    {
      path: '/product/new',
      name: 'NewProduct',
      component: NewProduct,
    }
  
  ],
})
