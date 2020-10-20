<template>
    <div class="body">
            <div class="body__input">
                <input type="text" @keyup.enter="addNewWork ({name:name,time:time})" v-model="name" placeholder="Nhập tên công việc mới"  />
                <input type="text" @keyup.enter="addNewWork ({name:name,time:time})" v-model="time" placeholder="Nhập thời gian hoàn thành"  />
                <i class="fa fa-plus" aria-hidden="true" @click="addNewWork({name:name,time:time})"></i>
            </div>
            <div class="body__list">
                <div class='title'>
                    <div style="float:left; width:25%">Name</div>
                    <div  style="float:left; width:50%">Time</div>
                    <div  style="float:right;padding-right:20px ">Action</div>
                </div>
                 <transition-group name="fade"  enter-active-class="animate__animated  animate__fadeInLeft" leave-active-class="animate__animated  animate__fadeOutDown" >
                <todo-work v-for="(work,index) in works" :work='work' :index='index'  :key="work.id"/>
                 </transition-group>
            </div>
            <div class="body__delete">
                <button @click="deleteMany" style=" background: linear-gradient(to right, #ee0979, #ff6a00);">
                    Xóa mục đã chọn
                    <i  class="fa fa-trash" aria-hidden="true"></i>
                </button>
                 <button  @click="getUser()" style="background: linear-gradient(to right, #f85032, #e73827);">
                    Xóa tất cả
                    <i  class="fa fa-trash" aria-hidden="true"></i>
                </button>
            </div>
  
              
           
     
      
    </div>
</template>
<script>
import TodoWork from "./TodoWork"
import toastr from 'toastr'
import {mapActions, mapState} from 'vuex'
export default {
    name:'body',
    data(){
        return {
            name:'',
            time:'',
            
        }
    },
    methods: {
        ...mapActions([
            'addWork',
            'deleteAll',
            'deleteMany',
            'getUser'
        ]),
        addNewWork(newWork){
            if(newWork.name =="" || newWork.time=="") {
                toastr.error('Bạn phải điền đầy đủ thông tin.', 'ERROR')
            }else{
                this.addWork(newWork);
                this.name=''
                this.time=''
            }
        }
    },

    computed: {
        ...mapState([
            'works',
            'token'
        ])
    },
    components:{
        TodoWork
    }
}
</script>
<style  scoped>
@import url("https://use.fontawesome.com/releases/v5.7.0/css/all.css");
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css");
.body__input{
    border: 2px solid #34c7c2;
    border-radius: 10px;
    margin-left: 10%;
    margin-right: 10%;
}

.body__input input{
    height: 40px;
    width: 40%;
    border: none;
    padding-left: 20px;
    font-size: 20px;
   

}
.body__input input:focus{
    outline: none;
}
.body__list{
    margin-top: 30px;
    margin-left: 10%;
    margin-right: 10%;
    height: 40vh;
    overflow-y:scroll;
    scrollbar-width: 0px;
    border: 2px solid #c4e0e5;
   box-shadow: 6px 4px 1px 1px  #c4e0e5;
   
}   
::-webkit-scrollbar {
    display: none;
}
.body__delete{
    border-top: 1px solid #bbbdbc;
    text-align: end;
    margin-left: 10%;
    margin-right: 10%;

}
.body__delete button{
    margin-top:20px;
   
    border: 1px solid red;
    color: white;
    padding: 5px;
    border-radius: 5px;
    margin-right: 20px;
   
}
.title{
   background: linear-gradient(to right, #4ca1af, #c4e0e5);
   height: 30px;
   padding-top:10px;
   color: #283e51;
}
.fade-enter .fade-leave-to{
    opacity: 0;
}
.fade-enter-active .fade-leave-active{
    transition-duration: 3s;
}
button:focus{
    animation: fade .6s 1;
}
@keyframes fade {
  0% {
      opacity: 1;
      transform: scale(1);
  }
  50%{
      opacity: 0.5;
     transform: scale(1.2);
  }
  to {
      opacity: 1;
       transform: scale(1);
  }
}

</style>