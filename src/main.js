import Vue from "vue";
import "./plugins/vuetify";

import App from "./App.vue";

import "./core/auth";

import bus from "./core/bus";

Vue.config.productionTip = false;

if (location.hostname !== "localhost" && location.hostname !== "127.0.0.1")
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(registration => {
          console.log("SW registered: ", registration);
        })
        .catch(registrationError => {
          console.log("SW registration failed: ", registrationError);
        });
    });
  }

window.addEventListener("offline", function() {
  bus.$emit(
    "dialog.on",
    "ขออภัยน้องๆด้วย เนื่องจากเว็บของพี่ๆอยาจจะยังไม่พร้อมสำหรับการทำงานโดยไม่มีอินเตอร์เน็ต จึงทำให้เว็บอาจทำงานไม่ถูกต้อง"
  );
});

new Vue({
  render: h => h(App)
}).$mount("#app");
