import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import LogInPage from '@/components/layout/LogInPage.vue'
import SearchPage from '@/components/search/SearchPage.vue'
import FormPage from '@/components/forms/FormPage.vue'
import NewProduct from '@/components/forms/NewProduct.vue'
import DeleteProduct from '@/components/forms/DeleteProduct.vue'
import NewCategory from '@/components/forms/NewCategory.vue'
import DeleteCategory from '@/components/forms/DeleteCategory.vue'
import Basket from '@/components/basket/Basket.vue'
import OrderPage from '@/components/basket/OrderPage.vue'
import DeleteCurrency from '@/components/forms/DeleteCurrency'
import NewCurrency from '@/components/forms/NewCurrency'

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
    },
    {
      path: '/product/delete',
      name: 'DeleteProduct',
      component: DeleteProduct,
    },
    {
      path: '/category/new',
      name: 'NewCategory',
      component: NewCategory
    },
    {
      path: '/category/delete',
      name: 'DeleteCategory',
      component: DeleteCategory
    },
    {
      path: '/basket',
      name: 'Basket',
      component: Basket
    },
    {
      path: '/orders',
      name: 'OrderPage',
      component: OrderPage,
    },
    {
      path:'/currency/new',
      name: 'NewCurrency',
      component: NewCurrency
    },
    {
      path: '/currency/delete',
      name: 'DeleteCurrency',
      component: DeleteCurrency,
    }
  
  ],
})
