<template>
  <div class="calendar">
    <div class="calendar__title">Quản lý trợ cấp Intern</div>
    <button class="submit-button" @click="activeModal=!activeModal">Thêm trợ cấp</button>
     <div
      style="
        text-align: start;
        font-size: 20px;
        color: #878a87;
        margin-bottom: 40px;
      "
    >
      Danh sách trợ cấp
    </div>
    <div class="calendar__content">
      <vs-row>
        <vs-col lg='3' sm='6' xs='12'>
            <input class="edit-input" placeholder="Họ tên">
        </vs-col>
           <vs-col lg='3' sm='6' xs='12'>
            <select class="edit-input"  style="height:47px">
              <option value="1">Admin</option>
              <option value="2">Leader</option>
              <option value="3">Intern</option>
            </select>
        </vs-col>
               <vs-col lg='3' sm='6' xs='12'>
             <select class="edit-input"  style="height:47px">
              <option value="1">Nam</option>
               <option value="2">Nữ</option>
            </select>
        </vs-col>
                  <vs-col lg='3' sm='6' xs='12'>
           <button  class="search-button">Tìm kiếm</button>
        </vs-col>
        
      </vs-row>
      <table style="margin-top:20px;margin-left:20px;" class='table-calendar'>
        <thead>
          <tr>
            <th style="width:100px">ID</th>
            <th style="width:200px">Họ và tên</th>
            <th style="width:200px">Leader</th>
            <th style="width:300px">Ngày cập nhật trợ cấp</th>
            <th style="width:250px">Trợ cấp / buổi (VNĐ)</th>
            <th style="width:150px">Actions</th>
            <th style="width:150px">Lịch sử trợ cấp</th>
           
          </tr>
        </thead>
        <tbody style="padding-top:20px">
            <tr v-for="salary in listSalary" :key='salary.internid'>
                <th>{{salary.internid}}</th>
                <th>{{salary.name}}</th>
                 <th>{{salary.leader?salary.leader:'Chưa vào nhóm'}}</th>
                <th>{{convertTime(salary.start)}}</th>
                <th>{{salary.salaryaday}}</th>
                <th>
                           <!-- <i
                    style="font-size: 25px;color:#559aed"
                    class="bx bx-edit"
                  ></i> -->
                     <i
                     @click="delSalaryOfTeam(salary.internid)"
                    style="font-size: 25px;color:red"
                    class="bx bx-x-circle"
                  ></i>
               
                </th>
                <th>
                  <div style="color:#2d8ee3;text-decoration:none; cursor: pointer;" @click="toHistorySalary(salary.name,salary.internid)">Xem</div>
                </th>

            </tr>
         
        </tbody>
      </table>
    </div>
         <vs-dialog overflow-hidden v-model="activeModal" >
      <template #header>
        <h4>Thêm Intern</h4>
      </template>

      <div class="edit-form" @click="onBlurSearch()">
        <input
          type="text"
          placeholder="Search by name or account"
          class="edit-input"
          @keyup="onSearch()"
          v-model="keyword"
        />
        <div class="result-search" :style="{ display: showResult }">
          <div v-if='isLoading' style="height:50px;margin-top:20px">Đang tìm ...</div>
          <ul style="margin-left:-40px" v-else-if="resultSearchUser.length > 0">
            <li v-for="user in resultSearchUser" :key='user.id' @click="[keyword=user.name,internToAdd=user]">
              <img
                :src="bufferToBase64(user.avatar)"
              />
              <span style="margin-left:20px">{{user.name}}</span>
            </li>
          </ul>
          <div v-else style="height:50px;margin-top:20px">Không tìm thấy</div>
        </div>
        <input type="text" placeholder="Trợ cấp / buổi (VNĐ)" class="edit-input" v-model="salary" />

        <br />

        <button class="update-button" @click="onAddSalary()">Thêm</button>
      </div>
    </vs-dialog>
   
  </div>
</template>

<script>
import moment from "moment";
import { mapActions, mapState } from 'vuex';
import toastr from "toastr";
import mixin from '../../mixin'
export default {
  name: "view-calendar",
  data() {
    return {
      activeModal: false,
      typeEmployee: "Admin",
      showResult: "none",
      keyword: "",
      isLoading:true,
      salary:'',
      internToAdd:'',
    }
  },
  computed :{
    ...mapState({
      listSalary:state=>state.admin.listSalary,
      user: (state) => state.user.user,
      resultSearchUser:state =>state.admin.resultSearchUser
    })
  },
  methods: {
    ...mapActions('admin',{
      getSalaries:'getSalaries',
      searchInternToAddSalary:'searchInternToAddSalary',
      addSalaryForIntern:'addSalaryForIntern',
      delSalaryOfTeam:'delSalaryOfTeam'
    }),
    
      async onSearch(){
      this.showResult = 'block'
      this.internToAdd='';
      if(this.keyword=="") {
           this.showResult = 'none';
           return;
      }
      await this.searchInternToAddSalary({keyword:this.keyword});
      this.isLoading=false;

    },
    onBlurSearch() {
      this.showResult = "none";
      // this.keyword = "";
    },
    async onAddSalary(){
       if(this.internToAdd ==''){
          toastr.error("Hãy chọn người bạn muốn thêm vào  trợ cấp", "ERROR");
          return;
       }
        else if(this.salary ==''){
          toastr.error("Hãy thêm trợ cấp / buổi", "ERROR");
          return;
        }
        let res = await this.addSalaryForIntern({internid:this.internToAdd.id,salary:this.salary});
        if (res == true) {
          toastr.success("Thêm thành công", "DONE")
          this.activeModal = false
          this.keyword='',
          this.salary='',
          this.internToAdd=''
        }
        else{
           toastr.error("Thêm thất bại", "ERROR")
        }
    },
    toHistorySalary(name,id){
      this.$router.push({ name:'HistorySalary', params: { name,id }})
    }
  },
  created(){
    this.getSalaries()
  }

   
};
</script>
<style scoped>
.calendar {
    position: relative;
   
}
.calendar__title {
  text-align: start;
  font-size: 27px;
  font-weight: bold !important;
  margin-bottom: 10px;
}
.profile__infor {
  margin-top: 50px;
  border: 1px solid #ededed;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2);
  background: #fff;
  border-radius: 10px;
  margin-bottom:40px;
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
@media screen and (max-width: 910px) {
  .profile__basic {
    border-bottom: 2px dashed gray;
    border-right: none;
  }
  .profile__education {
    padding-right: 0px;
  }
}

.calendar__content {
  border: 1px solid #ededed;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  background: #fff;
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
.submit-button:hover{
    transform: scale(1.2);
    transition-duration: .9s;

}
.search-button{
  margin-top:20px;
  background:rgb(85, 206, 99);
  width:70%;
  height:47px;
  border: none;
  border-radius: 5px;
  color: white;;
}
.edit-input {
  width: 70%;
  height: 25px;
  margin-bottom: 10px;
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  position: relative;

}
.table-calendar{
  border-spacing: 0px ;
}
.table-calendar thead tr{
  
    box-shadow: 0 0 3px #e5e5e5;
    height: 45px;
}
.table-calendar tbody tr{
  
    box-shadow: 0 0 3px #e5e5e5;
    height: 60px;
    color: #8b8b8c;
    font-weight: 500;
}
.table-calendar tbody tr th{
  
   border: none;
}
.table-calendar tbody tr:nth-child(2n){
  background-color:#ebedeb;
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
  font-size: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
}
.submit-button:hover{
    transform: scale(1.2);
    transition-duration: .9s;

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
.result-search{
    background: #ebedeb;
    border-radius: 10px;
    position:absolute;
    width: 300px;
    top:80px;
    left:50px;
    z-index: 2;

}
.result-search img{
    width: 30px;
    height: 30px;
    border-radius: 100px;
    margin-right: 10px;
}
.result-search ul{
    list-style: none;
}
.result-search li{
    display: flex;
    align-items: center;
    justify-content: flex-start ;
    margin-bottom: 10px;
}
</style>
