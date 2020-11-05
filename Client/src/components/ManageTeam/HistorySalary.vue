<template>
  <div class="wrapper">
    <div class="title">Lịch sử trợ cấp</div>
    <div
      style="
        text-align: start;
        font-size: 20px;
        color: #878a87;
        margin-bottom: 40px;
      "
    >
      Intern / {{name}}
    </div>
    <div style="position:absolute;top:70px;right:70px">
         <select class="edit-input" style="height: 47px" v-model="year">
              <option value="2016">2016</option>
              <option value="2017">2017</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
            </select>
    </div>
    <div class="chart">
      <line-chart v-if="historySalary.length" :data="historySalary"></line-chart>
    </div>
    <div class="calendar__content" style="margin-top: 30px">
      <div class="title" style="font-size: 20px; margin: 25px">Chi tiết
      </div>
      <table style="margin-top: 20px; margin-left: 20px" class="table-calendar">
        <thead style="background: #f87979; color: white">
          <tr>
            <th style="width: 350px">Time</th>
            <th style="width: 400px">Ngày cập nhật</th>
            <th style="width: 400px">Trợ cấp / buổi (VNĐ)</th>
           
          </tr>
        </thead>
        <tbody style="padding-top: 20px">
          <tr v-for="(salary,index) in historySalary" :key="index">
            <th>{{salary.month}}</th>
            <th>{{convertTime(salary.start)}}</th>
            <th>{{salary.salaryaday}}</th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import moment from "moment"
import { mapActions, mapState } from 'vuex';
import LineChart from "./Chart";

export default {
  name: "History-Salary",
  components: {
    LineChart,
  },
  data() {
    return {
        year:'2020',
        name:this.$route.params.name,
        id:this.$route.params.id,
        historySalary:[],

      
    };
  },
  computed: {

  },
  methods: {
    ...mapActions('leader',{
      getHistorySalary:'getHistorySalary'
    }),
    convertTime(time) {
      return moment(time).format("DD/MM/YYYY");
    },
  },
  async created(){
    await this.getHistorySalary({id:this.$route.params.id}).then(data=>{
      this.historySalary=data
    })
  }
};
</script>
<style  scoped>
.title {
  text-align: start;
  font-size: 27px;
  font-weight: bold !important;
  margin-bottom: 10px;
}
.chart {
  border: 1px solid #ededed;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  background: #fff;
  padding: 10px;
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
  width: 200px;
  height: 25px;
  margin-bottom: 10px;
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  position: relative;
  align-items: center;
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
</style>