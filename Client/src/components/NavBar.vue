
<template>
 
      <vs-navbar class="header" text-white square center-collapsed v-model="active" style="padding-left:-15px !important">
        <template #left >
           <a href="/" class="logo" :style="{width:width+'px'}">
        <img class="logo" src="../assets/logo.png" alt="" />
      </a>
       <div class='menu'  @click="changeShowSlider()">
        <i class='bx bx-menu bx-md' style="vertical-align: middle;color:white"></i>
        <span class="menu__title">Manage Intern</span>
    </div>
  

        </template>

     

        <template #right>
         <ul class="header__nav">
         <li class="search">
           <div class="search__input">
            <vs-input icon-after style="vertical-align: middle; line-height:60px !important" danger v-model="value3"  placeholder="Search here" >
            <template #icon>
          <i class='bx bx-search '></i>
        </template>
        </vs-input>
           </div>
     
         <i class='bx bx-search search__icon'></i>
      </li>
      <li class="user">
        <img src="../assets/avater.jpg" />
        <span>Doan Loi</span>
      </li>
      <li class="logout" @click="logout()">
          <span>Logout</span>
           <i class='bx bx-exit'></i>
      
      </li>

     
    </ul>
         
        </template>
      </vs-navbar>


</template>
<script>
import {mapState,mapActions} from "vuex"
export default {
  data: () => ({
    active: "guide",
    width:280
  }),
  computed: {
     ...mapState({
      activeSlider:state=>state.slider.activeSlider,
      token:state=>state.auth.token
    }),
  
  },
  methods: {
    ...mapActions('auth',{
      logout:'logout'
    }),
   changeShowSlider(){
      if(this.activeSlider){
       this.width=60;
     }
     else this.width=280
     this.$store.dispatch('slider/changeShowSlider', null, {root:true});
    
   }
  },
  mounted(){
  }
};
</script>
<style scoped>
.header {
  height: 60px;
  margin-left: -15px !important;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to right, #ff9b44 0%, #fc6075 100%);
}
.header__left {
  float: left;
  text-align: center;
}
.logo {
  line-height: 60px;
  display: inline-block;
  margin-top:-8px;
}
.logo img {
  width: 40px;
  height: 40px;
  vertical-align: middle;
}
.menu{
    
    line-height: 60px;
    margin-top:-18px;
}
.menu__title{
  margin-left: 20px;
  color: white;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-size: 25px;
}
.header__nav {
  float: right;
  display: flex;
  list-style: none;
}
ul {
  margin-top: 0;
}
.user {
  line-height: 60px;
  margin-right: 50px;
  display: inline-block;
  color: white;
}
.logout{
    line-height: 60px;
  margin-right: 50px;
  display: inline-block;
  color: white;
  cursor: pointer;
}
.user img {
  width: 30px;
  height: 30px;
  border-radius: 100px;
  vertical-align: middle;
}
.search{
line-height: 60px;
display: flex;
justify-content: center;
align-items: center;
margin-right: 20px;
}
.search__icon{
  display: none;
}
@media screen and (max-width: 1024px) {
    .menu__title{
      display: none;
    }
    .search__input{
      display: none;
    }
    .search__icon{
      display: block;
    }
}
</style>