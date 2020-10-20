<template>
    <div class="hidden">
      <vs-sidebar
        absolute
        :reduce='!activeSlider'
        background='#34444c'
        v-model="active"
        textWhite
        square
        open
        >
        <template #logo>
          <!-- ...img logo -->
        </template>
        <vs-sidebar-item id="home">
          <template #icon>
            <router-link to='/' >
            <i style="color:white" class='bx bx-user'></i>
            </router-link>
          </template>
          <router-link to='/' style="color:white;text-decoration:none">Thông tin cá nhân</router-link>
          
        
          
        </vs-sidebar-item>
        <vs-sidebar-item id="market">
          <template #icon>
              <router-link to='/calendar' style="color:white;text-decoration:none">
            <i class='bx bx-grid-alt'></i>
              </router-link>
          </template>
         <router-link to='/calendar' style="color:white;text-decoration:none">Đăng kí lịch</router-link>
        </vs-sidebar-item>


        <vs-sidebar-item id="Music">
          <template #icon>
               <router-link to='/viewcalendar' style="color:white;text-decoration:none">
            <i class='bx bxs-calendar-heart'></i>
               </router-link>
          </template>
            <router-link to='/viewcalendar' style="color:white;text-decoration:none">Xem lịch đăng kí</router-link>
        </vs-sidebar-item>
           <vs-sidebar-item id="ListUser" v-if="user.role ==='Admin'">
          <template #icon>
               <router-link to='/listuser' style="color:white;text-decoration:none">
            <i class='bx bx-list-plus'></i>
               </router-link>
          </template>
            <router-link to='/listuser' 
            style="color:white;text-decoration:none">Danh sách nhân viên</router-link>
        </vs-sidebar-item>
              <vs-sidebar-item id="ListUserOfTeam">
          <template #icon>
               <router-link to='/listuserofteam' style="color:white;text-decoration:none">
            <i class='bx bx-group'></i>
               </router-link>
          </template>
            <router-link to='/listuserofteam' style="color:white;text-decoration:none">Danh sách nhóm</router-link>
        </vs-sidebar-item>
                <vs-sidebar-item id="ManageSalary">
          <template #icon>
               <router-link to='/salary' style="color:white;text-decoration:none">
            <i class='bx bx-dollar-circle'></i>
               </router-link>
          </template>
            <router-link to='/salary' style="color:white;text-decoration:none">Quản lý trợ cấp của nhóm</router-link>
        </vs-sidebar-item>
       
        <vs-sidebar-item id="chat">
          <template #icon>
            <i class='bx bx-chat' ></i>
          </template>
          Chat
        </vs-sidebar-item>
        <!-- <template #footer>
          <vs-row justify="space-between">
            <vs-avatar badge-color="danger" badge-position="top-right">
              <i class='bx bx-bell' ></i>

              <template #badge>
                28
              </template>
            </vs-avatar>

            <vs-avatar>
              <img src="/avatars/avatar-5.png" alt="">
            </vs-avatar>
          </vs-row>
        </template> -->
      </vs-sidebar>
    </div>
</template>
<script>
import {mapState} from "vuex"
export default {
  name: 'sliderbar',
  data () {
    return {
     active: 'home',
    }
  
  },
   computed: {
    ...mapState({
      activeSlider:state=>state.slider.activeSlider,
      user:state=>state.user.user
    })
   }

}
</script>
<style scoped>

  
</style>