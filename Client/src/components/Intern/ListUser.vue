<template>
  <div class="calendar">
    <div class="calendar__title">Danh sách nhân viên</div>
    <button class="submit-button" @click="activeModal = !activeModal">
      Thêm nhân viên
    </button>
    <div
      style="
        text-align: start;
        font-size: 20px;
        color: #878a87;
        margin-bottom: 40px;
      "
    >
      List / User
    </div>
    <div class="calendar__content">
      <vs-row>
        <vs-col lg="3" sm="6" xs="12">
          <input class="edit-input" placeholder="Họ tên" v-model="filterName" />
        </vs-col>
        <vs-col lg="3" sm="6" xs="12">
          <select class="edit-input" style="height: 47px" v-model="filterRole">
            <option value=''>Lọc theo cấp</option>
            <option value="Admin">Admin</option>
            <option value="Leader">Leader</option>
            <option value="Intern">Intern</option>
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
            <!-- <th style="width: 100px">ID</th> -->
            <th style="width: 250px">Họ và tên</th>
            <th style="width: 300px">Ngày vào công ty</th>
            <th style="width: 300px">Tên tài khoản</th>
            <th style="width: 150px">Type</th>
            <th style="width: 150px">Role</th>
            <th style="width: 150px">Actions</th>
          </tr>
        </thead>
        <tbody style="padding-top: 20px">
          <tr v-for="user in filterUser()" :key="user.id">
            <!-- <th>{{ user.id }}</th> -->
            <th><router-link :to='"/viewinfor/"+user.id' style="text-decoration:none">{{ user.name }}</router-link></th>
            <th>{{ convertTime(user.start) }}</th>
            <th>{{ user.username }}</th>
            <th>{{ user.type }}</th>
            <th>{{ user.role }}</th>
            <th>
             
              <i @click='deleteUser(user.id)' style="font-size: 25px; color: red" class="bx bx-x-circle"></i>
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
        <input
          type="text"
          placeholder="Họ và tên"
          class="edit-input"
          v-model="name"
        />
        <input
          type="text"
          placeholder="Tên tài khoản"
          class="edit-input"
          v-model="username"
        />
        <div style="display: flex; margin-left: 80px; align-item: center">
          <span style="margin-top: 10px; font-size: 13px; margin-right: 30px"
            >Start</span
          >
          <vs-input type="date" v-model="start" style="width: 300px" />
        </div>
        <select
          class="edit-input"
          style="width: 75%; height: 45px"
          v-model="role"
        >
          <option value="Admin">Admin</option>
          <option value="Leader">Leader</option>

          <option value="Intern">Intern</option>
        </select>

        <input
          type="text"
          placeholder="Lĩnh vực"
          class="edit-input"
          v-model="type"
        />
        <br />

        <button class="update-button" @click="onAddUser()">Thêm</button>
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
      name: "",
      username: "",
      start: "",
      type: "",
      role: "Admin",
      filterName:'',
      filterRole:''
    };
  },
  computed: {
    ...mapState({
      listUser: (state) => state.admin.listUser,
    }),
  },
  methods: {
    ...mapActions("admin", {
      addUser: "addUser",
      getListUser: "getListUser",
      deleteUser:"deleteUser"
    }),
    async onAddUser() {
      if (
        this.name == "" ||
        this.username == "" ||
        this.start == "" ||
        this.type == "" ||
        this.role == ""
      ) {
        toastr.error("Bạn phải điền đầy đủ thông tin", "ERROR");
      } else {
        let res = await this.addUser({
          name: this.name,
          username: this.username,
          start: this.start,
          type: this.type,
          role: this.role,
        });
        if (res == true) {
          toastr.success("Thêm thành công", "DONE");
          this.activeModal = false;
        }
      }
    },
    filterUser(){
      if(this.filterName=='' && this.filterRole=='') return this.listUser
      let filterResult=this.listUser.filter(user=>{
        return (user.name.includes(this.filterName) && user.role.includes(this.filterRole))
      })
      return filterResult;
    }
  },
  created() {
    this.getListUser();
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
a {
  color: #2c87f0;
}
a:visited {
  color: #2c87f0;
}
a:hover, a:active, a:focus {
  color:#c33;
}
</style>
