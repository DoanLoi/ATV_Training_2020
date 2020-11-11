import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Profile from '../components/Profile/InforProfile.vue'
import Login from "../components/SignIn/Login"
import Home from "../components/Home"
import Calendar from "../components/Calendar/Calendar"
import ViewCalendar from "../components/Calendar/ViewCalendar"
import ListUser from "../components/Intern/ListUser"
import ListUserOfTeam from "../components/ManageTeam/ManageTeam"
import ManageSalaryOfTeam from "../components/ManageTeam/ManageSalary"
import ManageSalary from "../components/Intern/MangeSalary"
import HistorySalary from "../components/ManageTeam/HistorySalary"
import ViewInfor from "../components/Profile/ViewInfor"
import {store} from "../store"

Vue.use(Router);
const router= new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children:[
        {path:'',name:'Profile',component:Profile},
        {path:'/calendar',name:'Calendar',component:Calendar},
        {path:'/viewcalendar',name:'ViewCalendar',component:ViewCalendar},
        {path:'/listuser',name:'ListUser',component:ListUser},
        {path:'/listuserofteam',name:'ListUserOfTeam',component:ListUserOfTeam},
        {path:'/salary',name:'ManageSalaryOfTeam',component:ManageSalaryOfTeam},
        {path:'/listsalary',name:'ManageSalary',component:ManageSalary},
        {path:'/historysalary/:id/:name',name:'HistorySalary',component:HistorySalary},
        {path:'/viewinfor/:id',name:'ViewInfor',component:ViewInfor}
      ],
    },{
      path:'/login',
      name:'Login',
      component:Login
    
    },
    { path: '*', redirect: '/' }
  ]
})
router.beforeEach((to, from, next) => {
  if (!localStorage.getItem("token") && to.path !== "/login") {
    return next("/login");
  }
  else if( localStorage.getItem("token") && to.path ==='/login') 
  return next(from.path);
  next();
});

export default router;