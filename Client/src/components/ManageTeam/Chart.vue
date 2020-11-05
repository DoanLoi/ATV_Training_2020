<script>
import Vue from 'vue'
import VueChartJs from 'vue-chartjs'
import { mapState } from 'vuex'
export default Vue.component('lineChart', {
  extends: VueChartJs.Line,
  props:['data'],
  mounted () {
    let labels=this.data.map(v=>{
      return v.month
    })
    let salaries=this.data.map(v=>{
      return v.salaryaday
    })
    this.renderChart({
      labels:labels,
      datasets: [
        {
          label: 'Trợ cấp',
          backgroundColor: '#f87979',
          data: salaries
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
  
})

</script>