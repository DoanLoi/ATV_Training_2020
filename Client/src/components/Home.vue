<template>
  <div style="width: 100%">
    <nav-bar />

    <div class="sliderbar">
      <slider-bar />
    </div>
    <div class="content" :style="{ marginLeft: marginLeft + 'px' }">
      <router-view />
    </div>
  </div>
</template>
<script>
import SliderBar from "./SilderBar";
import NavBar from "./NavBar";
import { mapActions, mapState } from "vuex";
export default {
  name: "home",
  data() {
    return {};
  },
  components: {
    SliderBar,
    NavBar,
  },
  methods: {
    ...mapActions("user", {
      getUser: "getUser",
    }),
  },
  computed: {
    ...mapState({
      activeSlider: (state) => state.slider.activeSlider,
      marginLeft: (state) => state.slider.marginLeft,
      token: (state) => state.auth.token,
    }),
  },
  created() {
    this.getUser();
  }
};
</script>
<style scoped>
.sliderbar {
  bottom: 0;
  left: 0;
  margin-top: 0;
  position: absolute;
  top: 58px;
  transition: all 0.2s ease-in-out 0s;
  width: 350px;
  z-index: 1001;
  height: 111%;
}
.content {
  padding: 25px;
  margin-top: 60px;
  background: #f7f7f7;
}
</style>