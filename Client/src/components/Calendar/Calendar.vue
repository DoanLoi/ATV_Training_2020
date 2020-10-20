<template>
  <div class="calendar">
    <div class="calendar__title">Đăng kí thời gian</div>
    <button class="submit-button">Gửi</button>
    <div class="calendar__content">
      <full-calendar
        style="padding: 20px"
        :config="config"
        :events="events"
        @day-click="dayClick"
        @event-selected="eventSelected"
      />
      
    </div>
    <vs-dialog overflow-hidden v-model="activeModal">
      <template #header>
        <h4>Chọn thời gian</h4>
      </template>

      <div class="edit-form">
        <select class="edit-input" style="width: 83%" v-model="time"  >
          <option value="Sáng">Sáng</option>
          <option value="Chiều">Chiều</option>

          <option value="Cả ngày">Cả ngày</option>
        </select>

        <br />

        <button @click="addDay">Thêm</button>
      </div>
    </vs-dialog>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "calendar",
  data() {
    return {
      time: "Sáng",
      day: "",
      activeModal: false,
      events: [],
      config: {
        defaultView: "month",
        locale: "vn",
        weekend: true,
        eventRender: function (event, element) {
          //   console.log(event);
        },
      },
    };
  },
  methods: {
    eventSelected(event) {
      const day = event.start._d;
      const events = this.events.filter(
        (event) => day.getTime() !== event.start.getTime()
      );
      this.events = events;
    },
    dayClick(day) {
      const events = this.events.filter(
        (event) => day._d.getTime() !== event.start.getTime()
      );
      if (events.length === this.events.length) {
        this.activeModal = true;
        this.day = day._d;
      } else this.events = events;
    },
    addDay() {
      if (this.time != "") {
        this.activeModal = false;
        this.events.push({
          title: this.time,
          allDay: true,
          start: this.day,
        });
        this.time = "Sáng";
        this.day = "";
      }
    },
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
  margin-bottom: 40px;
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
.edit-input {
  width: 80%;
  margin-bottom: 10px;
  margin-top: 20px;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 10px;
}
</style>
