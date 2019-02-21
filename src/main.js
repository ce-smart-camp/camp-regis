import Vue from "vue";
import "./plugins/vuetify";

import App from "./App.vue";

import "./core/auth";
import "./core/timing";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
