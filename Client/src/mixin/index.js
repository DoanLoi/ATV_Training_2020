import Vue from 'vue'
import moment from 'moment'
Vue.mixin({
    methods: {
        bufferToBase64(cv){
            return  'data:application/pdf;base64,'+Buffer.from(cv).toString("base64");
        },
        convertTime(time) {
            return moment(time).format("DD/MM/YYYY");
        },
    }
  })
  