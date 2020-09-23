<template>
    <div class="header">
        <div class="header__title">Todo - App</div>
        <div class="header__avatar">
            <img src="../assets/avatar.jpg" alt="avatar">
        </div>
    </div>
</template>
<script>
export default {
    name:'header'
}
</script>
<style scoped>
.header{
    height: 15%;
    padding: 20px;
    text-align: start;

  
    
}
.header__title{
    font-size: 30px;
    color:#2e8582;
    float: left;
    width: 90%;
}
.header__avatar{

    float: right;
}
.header__avatar img{

    width: 40px;
    height: 40px;
    border-radius: 20px;
}
</style>