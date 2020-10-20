<template>
  <div class="login">
          <vs-row vs-w="12">
          <vs-col style="display: flex;  height: 100%;"  lg="6" xs='0'>
            <div class="login-background">

            </div>
          </vs-col>
          <vs-col lg='6' xs='12' class="form">
            <div class="form">
<div class="form__login">
              <div class="form__title">Đăng nhập</div>
              <input type="text" class='input_email' placeholder="Email" v-model="email" >
              <input type="password" class='input_email' placeholder="Password"  v-model="password">
              <div class='forget-password'>Forgot Password?</div>
              <button  @click="signIn({email:email,password:password})"  class='submit' placeholder="Password" >Đăng nhập</button>
              <div style="color:gray">_____Hoặc_____  </div>
              <button    class='submit' style="background:#08a332" placeholder="Password" >Tạo tài khoản mới</button>
            </div>
            </div>
            
          </vs-col>

    </vs-row>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name:'login',
  data(){
    return{
      email:'',
      password:''
    }
  },
  methods: {
    ...mapActions('auth',{
      signIn:'signIn'
    })
   
  }
}
</script>
<style scoped>


.login{
  width:100%;
  
}
.login-background{
  width: 100%;
  height: 100vh;
  background-image: url('https://1.bp.blogspot.com/-VZ3Kx9j0Yb4/UUUgzSXkw3I/AAAAAAAACQY/h9PlNw_wWu4/s1600/hinh-nen-thien-nhien-dep+(1).jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.form{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    height: 90vh;
}
.form__login{
  width: 80%;

  text-align: center;
}
.form__title{
  font-size: 30px;
  margin-bottom: 30px;
}
.input_email{
  display: block;
    width: 100%;
    background: transparent;
    font-family: Montserrat-Regular;
    font-size: 18px;
    color: #555555;
    line-height: 1.2;
    padding: 10px;
    height: 50px;
    border: 1px solid #ddd;
    border-radius: 15px;
    margin-bottom: 20px;
}
.forget-password{
  color: gray;
  text-align: end;
  width: 100%;
  
}
.submit{
  /* margin-left: 10px ; */
      height: 50px;
    border: 1px solid #ddd;
    border-radius: 15px;
    margin-bottom: 20px;
    width: 104%;
    margin-top: 20px;
    background: #6675df;
    color:#fff;
}

</style>