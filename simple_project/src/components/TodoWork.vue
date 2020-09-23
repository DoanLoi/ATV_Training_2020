<template>
  <div class="work">
     
    <input class="checkbox" :value="work.id" @change="set(work.id)" type="checkbox" />
    <div class="work__name" :class="{isEdit:isEdit}">{{work.name}}</div>
    <input
      class="work__name"
      @keyup.enter="[updateWork(work),isEdit=!isEdit]"
      :class="{isEdit:!isEdit}"
      v-model="work.name"
    />

    <span class="work__time" :class="{isEdit:isEdit}">{{work.time}}</span>
    <input
      class="work__time"
      :class="{isEdit:!isEdit}"
      @keyup.enter="[updateWork(work),isEdit=!isEdit]"
      v-model="work.time"
    />
    <div class="work__action">
      <button
        @click="[updateWork(work),isEdit=!isEdit]"
        style="background-color:#50d492;
            color:white;
            border:1px solid #50d492;
            border-radius:3px;
            margin-right:10px"
        :class="{isEdit:!isEdit}"
      >Update</button>
      <i
        class="fas fa-edit"
        :class="{isEdit:isEdit}"
        style="color:#00d2ff;padding-right:20px"
        @click="isEdit=!isEdit"
      ></i>
      <i
        class="fa fa-trash"
        @click="deleteWork({index:index,id:work.id})"
        aria-hidden="true"
        style="color:red;padding-right:20px"
      ></i>
    </div>
 
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "todowork",
  data() {
    return {
      isEdit: false,
    };
  },
  props: {
    work: {
      type: Object,
    },
    index: {
      type: Number,
    },
  },
  methods: {
    ...mapActions(["deleteWork", "updateWork"]),
    set(value) {
      this.$store.commit("updateChecked", value);
    },
  },
  computed: {},
};
</script>
<style scoped>
.work {
  text-align: start;
  margin-top: 20px;
}
.work .checkbox {
  float: left;
  margin-top: 5px;
  margin-left: 10px;
}
.work__name {
  color: #b7bdbc;
  margin-left: 20px;
  width: 42%;
  float: left;
}
input.work__name {
  margin-right: 10px;
  width: 30%;
}
.work__time {
  width: 20%;
}
.work__action {
  float: right;
}
.isEdit {
  display: none;
}
</style>