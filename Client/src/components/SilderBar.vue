<template>
  <div class="hidden">
    <vs-sidebar
      absolute
      :reduce="!activeSlider"
      background="#34444c"
      v-model="active"
      textWhite
      square
      open
    >
      <template #logo>
        <!-- ...img logo -->
      </template>
      <vs-sidebar-item to="/" :class="{ active: isActive('Profile') }">
        <template #icon>
          <i style="color: white" class="bx bx-user"></i>
        </template>
        Thông tin cá nhân
      </vs-sidebar-item>
      <vs-sidebar-item
        to="/calendar"
        :class="{ active: isActive('Calendar') }"
        v-if="user.role === 'Intern'"
      >
        <template #icon>
          <i class="bx bx-grid-alt"></i>
        </template>
        Đăng kí lịch
      </vs-sidebar-item>
      <vs-sidebar-item
        to="/viewcalendar"
        :class="{ active: isActive('ViewCalendar') }"
        v-if="user.role === 'Leader'"
      >
        <template #icon>
          <i class="bx bxs-calendar-heart"></i>
        </template>
        Xem lịch đăng kí
      </vs-sidebar-item>
      <vs-sidebar-item
        to="/listuser"
        :class="{ active: isActive('ListUser') }"
        v-if="user.role === 'Admin'"
      >
        <template #icon>
          <i class="bx bx-list-plus"></i>
        </template>
        Danh sách nhân viên
      </vs-sidebar-item>
      <vs-sidebar-item
        :class="{ active: isActive('ListUserOfTeam') }"
        to="/listuserofteam"
        v-if="user.role === 'Leader'"
      >
        <template #icon>
          <i class="bx bx-group"></i>
        </template>
        Danh sách intern
      </vs-sidebar-item>
      <vs-sidebar-item
        to="/salary"
        :class="{ active: isActive('ManageSalaryOfTeam') }"
        v-if="user.role === 'Leader'"
      >
        <template #icon>
          <i class="bx bx-dollar-circle"></i>
        </template>
        Quản lý trợ cấp của nhóm
      </vs-sidebar-item>
      <vs-sidebar-item
        to="/listsalary"
        :class="{ active: isActive('ManageSalary') }"
        v-if="user.role === 'Admin'"
      >
        <template #icon>
          <i class="bx bx-dollar-circle"></i>
        </template>
        Quản lý trợ cấp của intern
      </vs-sidebar-item>
    </vs-sidebar>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "sliderbar",
  data() {
    return {
      active: "home",
      idActive: "loi",
    };
  },
  computed: {
    ...mapState({
      activeSlider: (state) => state.slider.activeSlider,
      user: (state) => state.user.user,
    }),
  },
  methods: {
    isActive(name) {
      console.log(this.$route.name == name, name, this.$route.name);
      return this.$route.name == name;
    },
  },
};
</script>
<style scoped>
</style>