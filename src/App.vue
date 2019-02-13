<template>
  <v-app dark>
    <!--
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-toolbar>
    -->
    <SideBar avatar="https://i.redd.it/spo5q1n66gg11.jpg"/>
    <NavBar/>
    <v-content>
      <!--<HelloWorld/>-->
      <step1/>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import step from "./components/step";
import step1 from "./components/step1";

export default {
  name: "App",
  components: {
    HelloWorld,
    NavBar,
    SideBar,
    step,
    step1
  },
  data() {
    return {
      //
    };
  }
};
</script>
