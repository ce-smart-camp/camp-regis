import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import firebase from "./core/firebase";

Vue.config.productionTip = false;

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
