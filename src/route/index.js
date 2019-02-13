import Vue from "vue";
import Router from "vue-router";

import step1 from "@/view/step1";
import step2 from "@/view/step2";

Vue.use(Router);

export default new Router({
  routes: [
    { path: "/", redirect: { name: "step1" } },
    {
      path: "/step1",
      name: "step1",
      component: step1
    },
    {
      path: "/step2",
      name: "step2",
      component: step2
    }
  ]
});
