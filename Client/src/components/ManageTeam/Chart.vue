<script>
import Vue from 'vue'
import VueChartJs from 'vue-chartjs'
export default Vue.component('lineChart', {
  extends: VueChartJs.Line,
  mounted () {
    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Trợ cấp',
          backgroundColor: '#f87979',
          data: [2300000, 1000000, 1900000, 2000000, 1600000, 1900000, 2000000]
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
  
})

</script>