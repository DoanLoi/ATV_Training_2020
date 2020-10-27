<template>
  <div class="center grid profile">
    <div class="profile__title">Thông tin cá nhân</div>
  
      
         <div class="change-password">
          <label class="update-avatar" @click="activeModalPassword=true">Đổi mật khẩu</label>
        </div>
      
        <div class="upload-cv">
          <label class="update-avatar" @click="activeModalCV=true" for="upload-cv">Upload CV</label>
        </div>

    <div class="profile__infor">
      <div class="profile__infor__wraper">
        <vs-row vs-w="12">
          <div class="profile__edit" @click="openModalEdit()">
            <i style="margin-top: 16px; font-size: 20px" class="bx bx-edit"></i>
          </div>
          <vs-col style="display: flex" w="12">
            <span class="profile__avatar">
              <img
                src="https://i.pinimg.com/280x280_RS/7b/f4/9c/7bf49cc8e519bcea2fdd87b00df971aa.jpg"
              />
            </span>
            <vs-row>
              <vs-col lg="5" sm="12" class="profile__basic">
                <ul class="profile__infor__company">
                  <!-- <li>{{user}}</li> -->
                  <li><h2 style="text-align: start">{{user.name}}</h2></li>
                  <li><h5>Intern: {{user.type}}</h5></li>
                  <li><h5>Employee ID : {{user.id}}</h5></li>
                  <li><h5>Date of Join : {{user.dateofjoin}}</h5></li>
                </ul>
              </vs-col>
              <vs-col
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                lg="7"
                sm="12"
              >
                <ul class="profile__detail">
                  <li>
                    <div class="title">Số điện thoại:</div>
                    <div class="text">{{user.phone}}</div>
                  </li>
                  <li>
                    <div class="title">Email:</div>
                    <div class="text">{{user.email}}</div>
                  </li>
                  <li>
                    <div class="title">Địa chỉ:</div>
                    <div class="text">{{user.address}}</div>
                  </li>
                  <li>
                    <div class="title">Giới tính:</div>
                    <div class="text">{{user.gender}}</div>
                  </li>
                </ul>
              </vs-col>
            </vs-row>
          </vs-col>
        </vs-row>
      </div>
    </div>
    <vs-row style="margin-top: 30px">
      <vs-col lg="6" sm="12" class="profile__education">
        <div class="profile__box">
          <div class="card-body">
            <div class="education__edit" @click="activeModalEducation = true">
              <i
                style="margin-top: 5px; margin-left: 5px; font-size: 20px"
                class="bx bx-plus"
              ></i>
            </div>
            <div class="card__title">Education Informations</div>

            <ul class="experience-box">
              <li style="display: flex" v-for="education in educations" :key='education.id'>
                  <div style="width: 95%">
                     <div class="circle"></div>
                <div class="experience__name">{{education.school}}</div>
                <div style="color: rgb(158, 158, 158); margin-bottom: 5px">
                  {{education.class}}
                </div>
                <div style="color: rgb(189, 189, 189); font-size: 12px;margin-bottom:10px">
                  {{education.start}}-{{education.finish}}
                </div>
                </div>
                <div
                  @click="delEducation(education.id)"
                >
                  <i
                    style="margin-top: 5px; margin-left: 5px; font-size: 20px;color:red"
                    class="bx bx-trash-alt"
                  ></i>
                </div>
              </li>
             
            </ul>
          </div>
        </div>
      </vs-col>
      <vs-col lg="6" sm="12">
        <div class="profile__box">
          <div class="card-body">
            <div class="education__edit" @click="activeModalEducation = true">
              <i
                style="margin-top: 5px; margin-left: 5px; font-size: 20px"
                class="bx bx-plus"
              ></i>
            </div>
            <div class="card__title">Experiences</div>

            <ul class="experience-box">
              <div class="circle"></div>
              <li>
                <div class="experience__name">React</div>
                <div style="color: rgb(158, 158, 158); margin-bottom: 5px">
                  12A1
                </div>
                <div style="color: rgb(189, 189, 189); font-size: 12px;margin-bottom:10px">
                  2014-2017
                </div>
              </li>
              <li>
                <div class="circle"></div>
                <div class="experience__name">NodeJS</div>
                <div style="color: rgb(158, 158, 158); margin-bottom: 5px">
                  Khoa KHMT
                </div>
                <div style="color: rgb(189, 189, 189); font-size: 12px">
                  2017-?
                </div>
              </li>
            </ul>
          </div>
        </div>
      </vs-col>
    </vs-row>
    <vs-dialog overflow-hidden v-model="activeModal">
      <template #header>
        <h4>Sửa thông tin cá nhân</h4>
      </template>

      <div class="edit-form">
        <span class="profile__avatar">
          <img
            src="https://i.pinimg.com/280x280_RS/7b/f4/9c/7bf49cc8e519bcea2fdd87b00df971aa.jpg"
            style="margin-bottom: 10px"
          />
        </span>
        <div style="margin-bottom: 20px; margin-top: 20px">
          <label class="update-avatar" for="upload-photo">Update ảnh</label>
          <input type="file" name="photo" id="upload-photo" />
        </div>

        <input type="text" placeholder="Họ và tên" class="edit-input" v-model="name" />
        <input type="text" placeholder="Số điện thoại" class="edit-input" v-model="phone"   />
        <input type="text" placeholder="Email" class="edit-input" v-model="email"  />
        <input type="text" placeholder="Địa chỉ" class="edit-input" v-model="address"  />
        <br />
        <select class="edit-input" style="width: 83%" v-model="gender">
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>

          <option value="Giới tính khác">Giới tính khác</option>
        </select> 
        <br />
        <button class="update-button" @click="[updateUser({id:user.id,name,phone,email,address,gender}),activeModal=false]">Cập nhật</button>
      </div>
    </vs-dialog>
    <vs-dialog overflow-hidden v-model="activeModalEducation">
      <template #header>
        <h4>Thêm quá trình học tập</h4>
      </template>

      <div class="edit-form">
        <input type="text" placeholder="Trường" class="edit-input" v-model="school"/>
        <input type="text" placeholder="Lớp/Ngành/Khoa" class="edit-input"  v-model="nameClass" />
        <div style="display:flex">
             <input v-model="start" type="text" placeholder="Thời gian bắt đầu" class="edit-input" 
             style="width:35%;margin-right:15px;margin-left:30px" />
              <input v-model="finish"  type="text" placeholder="Thời gian kết thúc" class="edit-input" style="width:35%" />
        </div>
       

        <br />

        <button @click="[addEducation({school,class:nameClass,start,finish}),activeModalEducation=false]" class="update-button">Thêm</button>
      </div>
    </vs-dialog>
     <vs-dialog overflow-hidden v-model="activeModalPassword">
      <template #header>
        <h4>Đổi mật khẩu</h4>
      </template>

      <div class="edit-form">
        <input type="password" placeholder="Mật khẩu cũ" class="edit-input" v-model="curPassword"/>
        <input type="password" placeholder="Mật khẩu mới" class="edit-input"  v-model="newPassword" />
        <input type="password" placeholder="Xác nhận mật khẩu mới" class="edit-input"  v-model="confirmPassword" />
      
       

        <br />

        <button @click="onUpdatePassword()" class="update-button">Lưu</button>
      </div>
    </vs-dialog>
    <vs-dialog overflow-hidden v-model="activeModalCV">
      <template #header>
        <h4>Upload CV</h4>
      </template>

      <div class="edit-form">
        <input type="file" style="margin-top:30px;margin-bottom:30px"/>
    

        <br />

        <button class="update-button">Thêm</button>
      </div>
    </vs-dialog>
  
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import toastr from 'toastr'
import ViewCV from "./ViewCV"
export default {
  name: "infor-profile",
  components: {
    'view-cv':ViewCV
  },
  data() {
    return {
      activeModal: false,
      activeModalEducation: false,
      activeModalCV:false,
      activeViewCV:true,
      activeModalPassword: false,
      name:'',
      phone:'',
      email:'',
      address:'',
      gender:'',
      school:'',
      nameClass:'',
      start:'',
      finish:'',
      curPassword:'',
      newPassword:'',
      confirmPassword:''

    };
  },
  methods:{
    ...mapActions('user',{
      updateUser:'updateUser',
      addEducation:'addEducation',
      delEducation:'delEducation',
      updatePassword:'updatePassword'
    }),
    openModalEdit(){
      this.name=this.user.name;
      this.phone=this.user.phone;
      this.email=this.user.email;
      this.address=this.user.address;
      this.gender=this.user.gender;
      this.activeModal = true;
    },
    async onUpdatePassword(){
      if(this.newPassword =='' || this.confirmPassword=='' || this.curPassword==''){
         toastr.error("Bạn phải điền đầy đủ thông tin",'Error');
      }
      else if(this.newPassword !== this.confirmPassword){
         toastr.error("Mật khẩu mới không trùng khớp",'Error');
      }
      else{
        let res=await this.updatePassword({curPassword:this.curPassword,newPassword:this.newPassword});
        if(res){
            toastr.success("Thay đổi mật khẩu thành công",'Done');
            this.activeModalPassword=false;
            this.curPassword='';
            this.newPassword='';
            this.confirmPassword='';
        }
      }
    }
  },
  computed: {
    ...mapState({
        user:state=>state.user.user,
        educations:state=>state.user.education,
    })
  },
 
};
</script>
<style scoped>
.profile{
  position: relative;
}
.profile__title {
  text-align: start;
  font-size: 27px;
  font-weight: bold !important;
 
}
.upload-cv{
  position: absolute;
  top: 5px;
  right: 0px;
}
.change-password{
  position: absolute;
  top: 5px;
  right: 120px;
}
.view-cv{
  position: fixed;
  z-index: 10000;
  top:0px;
  left: 0;
  right: 0;
  bottom: 0;
  background: #909190;
  display: flex;
  justify-content: center;
  opacity: 0.9;


}
.profile__edit {
  position: absolute;
  right: 0px;
  top: 0px;
  width: 50px;
  height: 50px;
  border-radius: 100px;
  background: #ddd;
  z-index: 1;
}
.profile__infor {
  margin-top: 50px;
  border: 1px solid #ededed;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2);
   background: #fff;
     border-radius: 10px;
}
.profile__infor__wraper {
  padding: 20px;
}
.profile__avatar {
  width: 200px;
  height: 100px;
}
.profile__avatar img {
  width: 180px;
  height: 180px;
  border-radius: 100px;
}
.profile__basic {
  border-right: 2px dashed gray;
}
.profile__infor__company {
  list-style: none;
}
.profile__infor__company h5 {
  color: gray;
  text-align: start;
}
.profile__detail li {
  display: flex;
  margin-bottom: 20px;
}
.profile__detail .title {
  font-weight: bold !important;
  width: 35%;
  text-align: start;
}
.profile__education {
  
  padding-right: 15px;
}

.profile__box {
  border: 1px solid #ededed;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  text-align: start;
  padding-right: 15px;
  margin-top: 20px;
  background: #fff;
}
.card__title {
  text-align: start;
  font-size: 20px;
  margin: 10px;
  font-weight: bold;
}
.experience-box {
  margin-left: 30px;
  list-style: none;
  border-left: 2px solid #ddd;
  font-family: CircularStd, sans-serif;
}
.experience__name {
  font-size: 15px;
  margin-bottom: 5px;
  font-weight: bold;
  color: rgb(97, 97, 97);
}
.circle {
  height: 10px;
  width: 10px;
  background: #ddd;
  border-radius: 100px;
  position: absolute;
  left: 27px;
}

.edit-form {
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  border: 1px solid #ededed;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2);
  background: #f2f5f3;
}
.edit-input {
  width: 80%;
  margin-bottom: 10px;
  margin-top: 20px;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 10px;
}
.update-button {
  background: #0ca836;
  color: white;
  border: 1px solid #0ca836;
  width: 120px;
  height: 40px;
  font-size: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}
.update-avatar {
  cursor: pointer;
  width: 100px;
  height: 30px;
  text-align: center;
  background: cornflowerblue;
  margin-top: 10px;
  padding: 10px;
  color: #fff;
  border-radius: 10px;
}

#upload-photo {
  opacity: 0;
  position: absolute;
  z-index: -10;
}
.education__edit {
  position: absolute;
  top: 28px;
  right: 25px;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  background-color: #ddd;
}
.education__delete {
  position: absolute;
  top: 100px;
  right: 45px;
}
.submit-button {
    position:absolute;
    z-index: 1;
    top: 0px;
 right: 10px;
  background: #ff9b44;
  color: white;;
  border: none;
  width: 120px;
  height: 40px;
  font-size: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}
@media screen and (max-width: 910px) {
  .profile__basic {
    border-bottom: 2px dashed gray;
    border-right: none;
  }
  .profile__education {
    padding-right: 0px;
  }
}
</style>