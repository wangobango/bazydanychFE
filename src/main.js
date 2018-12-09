// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import vuex from 'vuex'
import {store} from './components/store.js'
import VueResource from 'vue-resource';
import VueSidebarMenu from 'vue-sidebar-menu';
import Notifications from 'vue-notification'
import BootstrapVue from 'bootstrap-vue'
 
Vue.use(vuex);
Vue.use(Notifications);
Vue.use(VueResource);
Vue.use(VueSidebarMenu);
Vue.use(BootstrapVue);
Vue.config.productionTip = false


new Vue({
  el: '#app',
  router,
  store,
  components: { App},
  template: '<App/>'
})
