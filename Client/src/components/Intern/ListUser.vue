<template>
  <div class="calendar">
    <div class="calendar__title">Danh sách nhân viên</div>
     <button class="submit-button" @click="activeModal=!activeModal">Thêm nhân viên</button>
    <div style="text-align:start;font-size:20px;color:#878a87;margin-bottom: 40px;">List /  User</div>
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
            <th style="width:150px">Họ và tên</th>
            <th style="width:200px">ID</th>
            <th style="width:300px">Ngày vào công ty</th>
            <th style="width:300px">Tên tài khoản</th>
            <th style="width:150px">Type</th>
            <th style="width:150px">Actions</th>
          
          </tr>
        </thead>
        <tbody style="padding-top:20px">
            <tr>
                <th>Đoàn Văn Lợi</th>
                <th>92</th>
                <th>13/09/2020</th>
                <th>LoiDV</th>
                <th>Intern</th>
                <th>
                           <i
                    style="font-size: 25px;color:#559aed"
                    class="bx bx-edit"
                  ></i>
                     <i
                    style="font-size: 25px;color:red"
                    class="bx bx-x-circle"
                  ></i>
               
                </th>

            </tr>
             <tr>
                <th>Phạm Thế Tài</th>
                <th>94</th>
                <th>13/09/2020</th>
                <th>TaiPT</th>
                <th>Intern</th>
                <th>
                           <i
                    style="font-size: 25px;color:#559aed"
                    class="bx bx-edit"
                  ></i>
                     <i
                    style="font-size: 25px;color:red"
                    class="bx bx-x-circle"
                  ></i>
               
                </th>

            </tr>
         
        </tbody>
      </table>
    </div>
      <vs-dialog overflow-hidden v-model="activeModal">
      <template #header>
        <h4>Thêm nhân viên</h4>
      </template>

      <div class="edit-form">
        <input type="text" placeholder="Họ và tên" class="edit-input" />
        <input type="text" placeholder="ID" class="edit-input" />
        <input type="text" placeholder="Tên tài khoản" class="edit-input" />
        <div style="display:flex;margin-left:80px;align-item: center;">
          <span style="margin-top:10px;font-size:13px;margin-right:30px">Start</span>
           <vs-input
        type="date"
        v-model="value7"
       
        style="width:300px;  "
      />
        </div>
          <select class="edit-input" style="width: 75%;height:45px" v-model="typeEmployee"  >
          <option value="Admin">Admin</option>
          <option value="Leader">Leader</option>

          <option value="Intern">Intern</option>
        </select>


       
        
       

        <br />

        <button class="update-button" @click="addDay">Thêm</button>
      </div>
    </vs-dialog>
   
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "view-calendar",
  data() {
    return {
      activeModal:false,
      typeEmployee:'Admin'
    }
  },

   
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
</style>
