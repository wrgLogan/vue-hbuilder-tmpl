import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import Async from './assets/js/async.js'
import $ from 'jquery';
import pageSwitcher from './plugins/page-switcher.js'
import './assets/css/transition.css'

Vue.use(VueCarbon);

var vm = new Vue({
  router: router,
  render: h => h(App),
  data: {
    animation: ''
  }
}).$mount('#app');

Vue.use(pageSwitcher, { router: router, vm: vm });
