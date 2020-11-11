<template>
  <div class="calendar">
    <div class="calendar__title">Đăng kí thời gian</div>
    <div>
      <button class="submit-button" style="right:320px" @click='onViewTimeDraft()'>Xem nháp</button>
      <button class="submit-button" style="right:160px" @click='onSaveTimeDraft(user.id,events)'>Lưu nháp</button>
      <button class="submit-button" style="background:cornflowerblue"  @click='onSaveTimeWork(user.id,events)'>Gửi</button>
    </div>
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
import { mapActions, mapState } from 'vuex';
import toastr from "toastr";
export default {
  name: "calendar",
  data() {
    return {
      time: "Sáng",
      day: "",
      events:this.timeWork,
      activeModal: false,
      config: {
        locale: "vn",
        allDayDefault: true,
        showNonCurrentDates: false,
        defaultView: 'month',
        header:{
          right:'',
          left:''
        },
        eventRender: function (event, element) {
          //   console.log(event);
        },
      },
    };
  },
  computed: {
    ...mapState({
        user: (state) => state.user.user,
        timeWork:(state)=> state.user.timeWork,
        timeDraft:(state)=> state.user.timeDraft
    }),
  },
  methods: {
    ...mapActions('user',{
      saveTimeDraft:'saveTimeDraft',
      getTimeDraft:'getTimeDraft',
      getTimeWork:'getTimeWork',
      saveTimeWork:'saveTimeWork'
    }),
    eventSelected(event) {
      const day = event.start._d;
      const events = this.events.filter(
        (e) => day.getTime() !== moment(e.start).valueOf()
      );
      this.events = events;
    },
    dayClick(day) {
      const events = this.events.filter(
        (event) => day._d.getTime() !== moment(event.start).valueOf()
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
          start: this.day
         
        });
        this.time = "Sáng";
        this.day = "";
      }
    },
    onViewTimeDraft(){
      this.events=this.timeDraft
    },
    async onSaveTimeDraft(id,timeline){
      if(this.events.length ===0){
        toastr.error('ERROR','Hãy chọn ngày nên công ty của bạn')
        return
      }
      await this.saveTimeDraft({id,timeline})
    },
    async onSaveTimeWork(id,timeline){
      const loading=this.$vs.loading({
        type:'square',
        text:'Đang xử lý...'
      })
      if(this.events.length ===0){
        toastr.error('ERROR','Hãy chọn ngày nên công ty của bạn')
        return
      }
      this.saveTimeWork({id,timeline}).then(v=>{
           loading.close()
      })
    }
},
  created(){
    this.getTimeDraft()
    this.getTimeWork().then(v=>{
      this.events=this.timeWork
    })
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
