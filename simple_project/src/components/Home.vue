<template>
  <div class="home">
    <div class="todo">
      <todo-header />
      <todo-body />
    </div>
  </div>
</template>
<script>
import TodoHeader from "./TodoHeader"
import TodoBody from "./TodoBody"
export default {
  name: 'App',
  components:{
    TodoHeader,
    TodoBody
  },
}
</script>
<style scoped>
.home{
  /* width: 100vw;
  height: 100vh; */
  background: linear-gradient(to right, #34e89e, #0f3443);
  padding: 0px;
}
.todo{
  width: 60vw;
  height: 80vh;
  background: #ffffff;
  box-shadow: red;
  margin: 0 auto;
  box-shadow: 0 20px 40px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);

}
</style>