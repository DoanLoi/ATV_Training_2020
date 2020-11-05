<template>
  <div class="calendar">
    <div class="calendar__title">Quản lý lịch lên công ty</div>
    <div style="text-align:start;font-size:20px;color:#878a87;margin-bottom: 40px;">Team /  Intern 2020</div>
    <div class="calendar__content">
      <vs-row>
        <vs-col lg='3' sm='6' xs='12'>
            <input class="edit-input" placeholder="Họ tên">
        </vs-col>
           <vs-col lg='3' sm='6' xs='12'>
            <select class="edit-input" placeholder="Tháng" style="height:47px">
              <option value="1">Tháng Một</option>
            </select>
        </vs-col>
               <vs-col lg='3' sm='6' xs='12'>
             <select class="edit-input" placeholder="Năm" style="height:47px">
              <option value="1">2020</option>
            </select>
        </vs-col>
                  <vs-col lg='3' sm='6' xs='12'>
           <button  class="search-button">Tìm kiếm</button>
        </vs-col>
        
      </vs-row>
      <table style="margin-top:20px;margin-left:20px;" class='table-calendar'>
        <thead>
          <tr>
            <th style="width:150px">Intern</th>
            <th style="width:32px" v-for="index in (6,dayOfMonth)" :key="index" >{{index}}</th>
          </tr>
        </thead>
        <tbody style="padding-top:20px">
          <tr v-for="(timeOfIntern,index) in timeWorks" :key="timeOfIntern">
            <th  style="width:150px">{{index}}</th>
             <th style="width:32px" v-for="index in dayOfMonth" :key="index" >
               <div v-if="timeOfIntern[index]=='Sáng'">
                  <i
                    style="font-size: 25px;color:#28fa40"
                    class="bx bx-check"></i>
                    <i style="font-size: 25px;color:red" class="bx bx-x"></i>
               </div>
                 <div v-else-if="timeOfIntern[index]=='Chiều'">
                  <i style="font-size: 25px;color:red" class="bx bx-x"></i>
                  <i
                    style="font-size: 25px;color:#28fa40"
                    class="bx bx-check"></i>
               </div>
                 <div v-else-if="timeOfIntern[index]=='Cả ngày'">
                  <i style="font-size: 25px;color:#28fa40" class="bx bx-check"></i>
               </div>
                 <div v-else-if="timeOfIntern[index]==null">
                  <i style="font-size: 25px;color:red" class="bx bx-x"></i>
                  
               </div>
               
            </th>

           </tr>
             <!--    <tr>
            <th  style="width:150px" v-if="user.role =='Admin'">Nguyễn Văn Toàn</th>
             <th style="width:30px" v-for="index in 30" :key="index" >
                  <i
                    style="font-size: 25px;color:#28fa40"
                    class="bx bx-check"
                  ></i>
                   <i v-if="!(index % 7)"
                    style="font-size: 25px;color:red"
                    class="bx bx-x"
                  ></i>
                  
                  
             </th>

          </tr>
                 <tr>
            <th  style="width:150px">Phạm Thế Tài</th>
             <th style="width:30px" v-for="index in 30" :key="index" >
                  <i 
                    style=" font-size: 25px;color:#28fa40"
                    class="bx bx-check"
                  ></i>
                     <i v-if="!(index % 5)"
                    style="font-size: 25px;color:red"
                    class="bx bx-x"
                  ></i>
                  
             </th>

          </tr> -->
          
        </tbody>
      </table>
    </div>
   
  </div>
</template>

<script>
import moment from "moment";
import { mapActions, mapState } from 'vuex';
export default {
  name: "view-calendar",
  data() {
    return {
      dayOfMonth: moment(). daysInMonth()
    };
  },
  computed: {
    ...mapState({
       user:state=>state.user.user,
       timeWorks:state=>state.leader.timeWorks
    })
  },
  methods: {
    ...mapActions('leader',{
      getTimeWorks:'getTimeWorks'
    })
  },
  created(){
   this.getTimeWorks()
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
}
.table-calendar tbody tr th{
  
   border: none;
}
.table-calendar tbody tr:nth-child(2n){
  background-color:#ebedeb;
}
</style>
