<template>
  <div class="calendar">
    <div class="calendar__title">Quản lý Team</div>
    <button class="submit-button" @click="activeModal = !activeModal">
      Thêm Intern
    </button>
    <div class="profile__infor">
      <div class="profile__infor__wraper">
        <vs-row vs-w="12">
          <vs-col style="display: flex" w="12">
            <span class="profile__avatar">
              <img
                :src="bufferToBase64(user.avatar)"
              />
            </span>
            <vs-row>
              <vs-col lg="5" sm="12" class="profile__basic">
                <ul class="profile__infor__company">
                  <li>
                    <h2 style="text-align: start">Leader: {{ user.name }}</h2>
                  </li>
                  <li>
                    <h5>Lĩnh vực: {{ user.type }}</h5>
                  </li>
                  <li>
                    <h5>Employee ID : {{ user.id }}</h5>
                  </li>
                  <li><h5>Date of Join : {{convertTime(user.start)}}</h5></li>
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
                    <div class="text">{{ user.phone}}</div>
                  </li>
                  <li>
                    <div class="title">Email:</div>
                    <div class="text">{{ user.email }}</div>
                  </li>
                  <li>
                    <div class="title">Địa chỉ:</div>
                    <div class="text">{{ user.address }}</div>
                  </li>
                  <li>
                    <div class="title">Giới tính:</div>
                    <div class="text">{{ user.gender }}</div>
                  </li>
                </ul>
              </vs-col>
            </vs-row>
          </vs-col>
        </vs-row>
      </div>
    </div>
    <div class="calendar__title" style="font-size: 20px">
      Danh sách Intern Of Team
    </div>
    <div class="calendar__content">
      <vs-row>
        <vs-col lg="3" sm="6" xs="12">
          <input class="edit-input" placeholder="Họ tên" />
        </vs-col>
        <vs-col lg="3" sm="6" xs="12">
          <select class="edit-input" style="height: 47px">
            <option value="1">Admin</option>
            <option value="2">Leader</option>
            <option value="3">Intern</option>
          </select>
        </vs-col>
        <vs-col lg="3" sm="6" xs="12">
          <select class="edit-input" style="height: 47px">
            <option value="1">Nam</option>
            <option value="2">Nữ</option>
          </select>
        </vs-col>
        <vs-col lg="3" sm="6" xs="12">
          <button class="search-button">Tìm kiếm</button>
        </vs-col>
      </vs-row>
      <table style="margin-top: 20px; margin-left: 20px" class="table-calendar">
        <thead>
          <tr>
            <th style="width: 150px">ID</th>
            <th style="width: 200px">Họ và tên</th>
            <th style="width: 300px">Ngày vào team</th>
            <th style="width: 300px">Tên tài khoản</th>
            <th style="width: 150px">Lĩnh vực</th>
            <th style="width: 150px">Actions</th>
          </tr>
        </thead>
        <tbody style="padding-top: 20px">
          <tr v-for="intern in listIntern" :key="intern.internid">
            <th>{{intern.internid}}</th>
            <th><router-link :to='"/viewinfor/"+intern.internid' style="text-decoration:none">{{intern.name}}</router-link></th>
            <th>{{convertTime(intern.start)}}</th>
            <th>{{intern.username}}</th>
            <th>{{intern.type}}</th>
            <th>
              <i @click="delInternFromTeam(intern.internid)"  style="font-size: 25px; color: red" class="bx bx-x-circle"></i>
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
            <li v-for="user in resultSearchUser" :key='user.id' @click="[keyword=user.name,internToAdd=user.id]">
              <img
                :src="bufferToBase64(user.avatar)"
              />
              <span style="margin-left:20px">{{user.name}}</span>
            </li>
          </ul>
          <div v-else style="height:50px;margin-top:20px">Không tìm thấy</div>
        </div>
        <!-- <input type="text" placeholder="Lĩnh vực" class="edit-input" /> -->

        <br />

        <button class="update-button" @click="onAddIntern()">Thêm</button>
      </div>
    </vs-dialog>
  </div>
</template>

<script>
import moment from "moment";
import toastr from "toastr";
import { mapActions, mapState } from "vuex";
import mixin from "../../mixin"
export default {
  name: "view-calendar",
  data() {
    return {
      activeModal: false,
      typeEmployee: "Admin",
      showResult: "none",
      keyword: "",
      isLoading:true,
      internToAdd:''
    };
  },
  computed: {
    ...mapState({
      listIntern: (state) => state.leader.listIntern,
      user: (state) => state.user.user,
      resultSearchUser:state =>state.leader.resultSearchUser,
      teamid:state=>state.leader.teamID
    }),
  },
  methods: {
    ...mapActions("leader", {
      getInternsOfTeam: "getInternsOfTeam",
      searchUser:'searchUser',
      addInternToTeam:'addInternToTeam',
      delInternFromTeam:'delInternFromTeam'
    }),
   async onSearch(){
      this.showResult = 'block';
      this.internToAdd='';
      if(this.keyword=="") {
           this.showResult = 'none';
           return;
      }
      await this.searchUser({keyword:this.keyword});
      this.isLoading=false;

    },
    onBlurSearch() {
      this.showResult = "none";
      // this.keyword = "";
    },
    async onAddIntern(){
       if(this.internToAdd ==''){
          toastr.error("Hãy chọn người bạn muốn thêm vào nhóm", "ERROR");
          return;
       }
        let res = await this.addInternToTeam({newIntern:this.internToAdd,teamid:this.teamid});
        if (res == true) {
          toastr.success("Thêm thành công", "DONE")
          this.activeModal = false
          this.keyword=''
        }
    },
  },
  created() {
    this.getInternsOfTeam();
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
.profile__infor {
  margin-top: 50px;
  border: 1px solid #ededed;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2);
  background: #fff;
  border-radius: 10px;
  margin-bottom: 40px;
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
  position: absolute;
  z-index: 1;
  top: 0px;
  right: 10px;
  background: #ff9b44;
  color: white;
  border: none;
  width: 120px;
  height: 40px;
  font-size: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}
.submit-button:hover {
  transform: scale(1.2);
  transition-duration: 0.9s;
}
.search-button {
  margin-top: 20px;
  background: rgb(85, 206, 99);
  width: 70%;
  height: 47px;
  border: none;
  border-radius: 5px;
  color: white;
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
.table-calendar {
  border-spacing: 0px;
}
.table-calendar thead tr {
  box-shadow: 0 0 3px #e5e5e5;
  height: 45px;
}
.table-calendar tbody tr {
  box-shadow: 0 0 3px #e5e5e5;
  height: 60px;
  color: #8b8b8c;
  font-weight: 500;
}
.table-calendar tbody tr th {
  border: none;
}
.table-calendar tbody tr:nth-child(2n) {
  background-color: #ebedeb;
}
.submit-button {
  position: absolute;
  z-index: 1;
  top: 0px;
  right: 10px;
  background: #ff9b44;
  color: white;
  border: none;
  width: 120px;
  height: 40px;
  font-size: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
}
.submit-button:hover {
  transform: scale(1.2);
  transition-duration: 0.9s;
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
.result-search {
  background: #ebedeb;
  border-radius: 10px;
  position: absolute;
  width: 300px;
  top: 80px;
  left: 50px;
  z-index: 2;
}
.result-search img {
  width: 30px;
  height: 30px;
  border-radius: 100px;
}
.result-search ul {
  list-style: none;
}
.result-search li {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
}
.result-search li:hover{
  background:#cff5cb;
  cursor: pointer;
}
</style>
