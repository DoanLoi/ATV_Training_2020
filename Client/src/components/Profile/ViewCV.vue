<template>
    <div style="height:1000px">
        <pdf
            style="width:400px;height:200px;"
            src="../../static/Doan-Van-Loi-TopCV.vn-141020.172208.pdf"
        ></pdf>
    </div>
</template>
 
<script>
 
import pdf from 'vue-pdf'
 
export default {
    name:'ViewCV',
    components: {
        pdf
    },
    data() {
        return {
            currentPage: 1,
            pageCount: 1,
        }
    }
}
 
</script>