import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import Async from './assets/js/async.js'
import $ from 'jquery';
window.$ = $;
require('./assets/css/stage.css');

window.Async = Async;

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app');
