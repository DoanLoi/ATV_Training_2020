<template>
  <div class="calendar">
    <div class="calendar__title">Quản lý trợ cấp của team</div>
    <button class="submit-button" @click="activeModal = !activeModal">
      Thêm trợ cấp
    </button>
    <div class="profile__infor">
      <div class="profile__infor__wraper">
        <vs-row vs-w="12">
          <vs-col style="display: flex" w="12">
            <span class="profile__avatar">
              <img
                src="https://photo-1-baomoi.zadn.vn/w1000_r1/2019_08_30_106_32013005/427117464106a858f117.jpg"
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
                  <li>
                    <h5>Date of Join : {{ convertTime(user.start) }}</h5>
                  </li>
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
                    <div class="text">{{ user.phone }}</div>
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
      Danh sách trợ cấp Intern Of Team
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
            <th style="width: 200px">ID</th>
            <th style="width: 300px">Họ và tên</th>
            <th style="width: 300px">Ngày bắt đầu nhận trợ cấp</th>
            <th style="width: 250px">Trợ cấp / buổi (VNĐ)</th>
            <th style="width: 150px">Lịch sử trợ cấp</th>
            <th style="width: 150px">Actions</th>
          </tr>
        </thead>
        <tbody style="padding-top: 20px">
          <tr v-for="salary in listSalary" :key="salary.internid">
            <th>{{ salary.internid }}</th>
            <th>{{ salary.name }}</th>
            <th>{{ convertTime(salary.start) }}</th>
            <th>{{ salary.salaryaday }}</th>
            <th>
              <div
                style="color: #2d8ee3; text-decoration: none; cursor: pointer"
               
              >
              <router-link :to='"/historysalary/"+salary.internid+"/"+salary.name'>Xem</router-link>
                
              </div>
            </th>
            <th>
              <i style="font-size: 25px; color: #559aed" class="bx bx-edit" @click="editSalary(salary.internid,salary.salaryaday)"></i>
              <i
                @click="delSalaryOfTeam(salary.internid)"
                style="font-size: 25px; color: red"
                class="bx bx-x-circle"
              ></i>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
    <vs-dialog overflow-hidden v-model="activeModal">
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
          <div v-if="isLoading" style="height: 50px; margin-top: 20px">
            Đang tìm ...
          </div>
          <ul
            style="margin-left: -40px"
            v-else-if="resultSearchUser.length > 0"
          >
            <li
              v-for="user in resultSearchUser"
              :key="user.id"
              @click="[(keyword = user.name), (internToAdd = user.internid)]"
            >
              <img
                src="data:image/jpeg;base64,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"
              />
              <span style="margin-left: 20px">{{ user.name }}</span>
            </li>
          </ul>
          <div v-else style="height: 50px; margin-top: 20px">
            Không tìm thấy
          </div>
        </div>
        <input
          type="text"
          placeholder="Trợ cấp / buổi (VNĐ)"
          class="edit-input"
          v-model="salary"
        />

        <br />

        <button class="update-button" @click="onAddSalary()">Thêm</button>
      </div>
    </vs-dialog>
    <vs-dialog overflow-hidden v-model="activeModalEdit">
       <template #header>
        <h4>Sửa trợ cấp</h4>
      </template>
       <div class="edit-form">
         <div style="font-size:15px;text-align: left; padding-left:45px;margin-bottom:-10px">Trợ cấp / buổi (VNĐ)</div>
             <input
          type="text"
          placeholder="Trợ cấp / buổi"
          class="edit-input"
          v-model="salary"
        />
         <button class="update-button" style="margin-top:10px" @click="[editSalaryOfIntern({id,salary}),activeModalEdit=false]">Cập nhật</button>
           </div>
    </vs-dialog>
  </div>
</template>

<script>
import moment from "moment";
import { mapActions, mapState } from "vuex";
import toastr from "toastr";
export default {
  name: "view-calendar",
  data() {
    return {
      activeModal: false,
      typeEmployee: "Admin",
      showResult: "none",
      keyword: "",
      isLoading: true,
      salary: "",
      internToAdd: "",
      activeModalEdit:false,
      id:''
    };
  },
  computed: {
    ...mapState({
      listSalary: (state) => state.leader.listSalary,
      user: (state) => state.user.user,
      resultSearchUser: (state) => state.leader.resultSearchUser,
      teamid: (state) => state.leader.teamID,
    }),
  },
  methods: {
    ...mapActions("leader", {
      getSalariesOfTeam: "getSalariesOfTeam",
      searchInternToAddSalary: "searchInternToAddSalary",
      addSalaryForIntern: "addSalaryForIntern",
      delSalaryOfTeam: "delSalaryOfTeam",
      editSalaryOfIntern:'editSalaryOfIntern'
    }),
    async onSearch() {
      this.showResult = "block";
      this.internToAdd = "";
      if (this.keyword == "") {
        this.showResult = "none";
        return;
      }
      await this.searchInternToAddSalary({ keyword: this.keyword });
      this.isLoading = false;
    },
    onBlurSearch() {
      this.showResult = "none";
      // this.keyword = "";
    },
    convertTime(time) {
      return moment(time).format("DD/MM/YYYY");
    },
    async onAddSalary() {
      if (this.internToAdd == "") {
        toastr.error("Hãy chọn người bạn muốn thêm vào  trợ cấp", "ERROR");
        return;
      } else if (this.salary == "") {
        toastr.error("Hãy thêm trợ cấp / buổi", "ERROR");
        return;
      }
      let res = await this.addSalaryForIntern({
        internid: this.internToAdd,
        salary: this.salary,
        teamid: this.teamid,
      });
      if (res == true) {
        toastr.success("Thêm thành công", "DONE");
        this.activeModal = false;
        (this.keyword = ""), (this.salary = ""), (this.internToAdd = "");
      } else {
        toastr.error("Thêm thất bại", "ERROR");
      }
    },
    toHistorySalary(name, id) {
      this.$router.push({ name: "HistorySalary", params: { name, id } });
    },
    editSalary(id,salary){
      this.activeModalEdit=true
      this.salary=salary
      this.id=id
    },
  },
  created() {
    this.getSalariesOfTeam();
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
  margin-right: 10px;
}
.result-search ul {
  list-style: none;
}
.result-search li {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;
 
}
</style>
