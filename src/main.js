import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import "./core/firebase";

Vue.config.productionTip = false;

import "./core/auth";

new Vue({
  render: h => h(App)
}).$mount("#app");
