import Vue from "vue"
import Vuex from 'vuex'
import {slider} from "./module/slider"
import {auth} from "./module/auth"
import {user} from "./module/user"
import { createStore } from "vuex-extensions";
Vue.use(Vuex);
export const store = createStore(Vuex.Store,{
    modules: {
      slider: slider,
      auth:auth,
      user:user
      
    }
  })