<template>
  <div id="app">
    <img src="./assets/logo.png" width="100" height="100"> 
    <div class='todo'>
      <todo-header />
      <todo-body />
    </div>
  </div>
</template>

<script>
import TodoHeader from "./components/TodoHeader"
import TodoBody from "./components/TodoBody"
export default {
  name: 'App',
  components:{
    TodoHeader,
    TodoBody
  },
}
</script>

<style>
body{
  margin: 0px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #34e89e, #0f3443);
  padding: 0px;
  /* display: flex;
  justify-content: center;
  align-items: center; */
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
