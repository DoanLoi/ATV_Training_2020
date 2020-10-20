<template>
  <div class="vue-tempalte">
    <!-- Navigation -->
    <nav class="navbar shadow bg-white rounded justify-content-between flex-nowrap flex-row fixed-top navCustom">
      <div class="container">
        <ul class="nav navbar-nav flex-row float-right">
          <li class="nav-item">
            <router-link class="nav-link pr-3" to="/login">Sign in</router-link>
          </li>
          <li class="nav-item">
            <router-link class="btn btn-outline-primary" to="/">Home</router-link>
          </li>
            <li class="nav-item">
            <a class="btn btn-outline-primary" @click='logout()' >Logout</a>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Main -->
    <div class="App">
      <div class="vertical-center">
        <div class="inner-block">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapActions} from 'vuex'
export default {
  data(){
    return{

    }
    
  },
  methods: {
      ...mapActions([
        'logout'
      ])
    }

}
</script>
<style scoped>
.navCustom{
  background: white;
}
</style>