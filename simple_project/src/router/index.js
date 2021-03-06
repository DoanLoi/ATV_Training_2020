import Vue from 'vue'
import Router from 'vue-router'
import Home from "../components/Home"
import Login from "../components/Login"
import {store} from '../store/store'

Vue.use(Router);
  

let router= new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
   
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    }
  ]
})

export default router;