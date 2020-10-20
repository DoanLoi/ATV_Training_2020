// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuesax from 'vuesax'
import FullCalendar from "vue-full-calendar";

import 'vuesax/dist/vuesax.css'
import "fullcalendar/dist/fullcalendar.min.css";

// import 'ant-design-vue/dist/antd.css';
// import Antd from 'ant-design-vue';

import {store} from "./store"
Vue.use(Vuesax, {
  // options here
})

// Vue.use(Antd);
Vue.use(FullCalendar);
Vue.config.productionTip = false

/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
