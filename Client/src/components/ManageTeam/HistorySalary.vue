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
      Intern / Đoàn Văn Lợi
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
      <line-chart></line-chart>
    </div>

    <div class="calendar__content" style="margin-top: 30px">
      <div class="title" style="font-size: 20px; margin: 25px">Chi tiết
      </div>
      <table style="margin-top: 20px; margin-left: 20px" class="table-calendar">
        <thead style="background: #f87979; color: white">
          <tr>
            <th style="width: 250px">Time</th>
            <th style="width: 300px">Số buổi</th>
            <th style="width: 400px">Trợ cấp / buổi</th>
            <th style="width: 400px">Tổng trợ cấp   </th>
           
          </tr>
        </thead>
        <tbody style="padding-top: 20px">
          <tr>
            <th>11/2020</th>
            <th>20</th>
            <th>10 000 VND</th>
            <th>200 000 VND</th>
       
          </tr>
         <tr>
            <th>12/2020</th>
            <th>20</th>
            <th>10 000 VND</th>
            <th>200 000 VND </th>
       
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import LineChart from "./Chart";

export default {
  name: "History-Salary",
  components: {
    LineChart,
  },
  data() {
    return {
        year:'2020'
    };
  },
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