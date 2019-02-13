import Vue from "vue";
import VueRouter from "vue-router";

import "./plugins/vuetify";
import App from "./App.vue";

Vue.config.productionTip = false;
Vue.use(VueRouter);

import firebase from "./core/firebase";
import "./core/auth";

var app = new Vue({
  render: h => h(App)
}).$mount("#app");

firebase.auth().onAuthStateChanged(user => {
  // console.log("6555266");
  if (user) {
    Vue.set(app.data, "avatar", firebase.auth().currentUser.photoURL);
  }
});
